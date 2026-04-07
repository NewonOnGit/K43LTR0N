/**
 * Meta-Governance (Layer 7)
 *
 * The hedron governs its own assertions. Every claim the hedron makes
 * (tower level, face strength, vocabulary depth, etc.) is classified
 * using the SIL four-status grammar:
 *
 *   FORCED:      D + C + V  (derivation + containment + verification)
 *   ENCODED:     ~D + C + V (no derivation, but contained and verified)
 *   RESONANT:    ~D + ~C + V (pattern match, verified but not contained)
 *   SPECULATIVE: ~D + ~C + ~V (open question)
 *
 * The policy engine evaluates conditions on the hedron's state and
 * fires actions (warnings, claim reclassifications, recommendations).
 *
 * P3-primary: governance IS the observation face made structural.
 */

import { loadState, saveState, recordClaim } from './state.js';
import type {
  HedronState, ClaimStatus, TowerLevel, Projection,
  KaeltronCorrelation, VocabularyState,
} from './types.js';
import { emitGovernance } from './telemetry.js';

// ─── SIL Claim Classification ────────────────────────────

/**
 * Classify a claim using the SIL four-status grammar.
 *
 * D (Derivation): claim follows from mathematical proof / zero-branching
 * C (Containment): claim is bounded by known constraints
 * V (Verification): claim has been empirically checked
 */
export function classifyClaim(
  hasDerivation: boolean,
  hasContainment: boolean,
  isVerified: boolean,
): ClaimStatus {
  if (hasDerivation && hasContainment && isVerified) return 'FORCED';
  if (!hasDerivation && hasContainment && isVerified) return 'ENCODED';
  if (!hasDerivation && !hasContainment && isVerified) return 'RESONANT';
  return 'SPECULATIVE';
}

// ─── Hedron Claim Auditor ────────────────────────────────

export interface ClaimAudit {
  claim: string;
  currentStatus: ClaimStatus;
  evidence: string;
  flags: string[];
}

/**
 * Audit all claims the hedron is currently making.
 * Walks through the hedron's state and classifies each assertion.
 */
export function auditClaims(repoRoot: string): ClaimAudit[] {
  const state = loadState(repoRoot);
  const audits: ClaimAudit[] = [];

  // 1. Tower level claim
  const towerLevel = state.selfModel.currentLevel;
  const towerEvidence = Object.entries(state.selfModel.levelEvidence)
    .map(([k, v]) => `${k}: ${v}`)
    .join('; ');
  const towerFlags: string[] = [];
  const vocabDepth = state.vocabulary?.depth ?? state.vocabularyDepth;

  if (towerLevel >= 8 && vocabDepth < 1) {
    towerFlags.push('L8 claimed but hedron vocabulary < 1');
  }
  if (towerLevel >= 7 && !state.lastCorrelation) {
    towerFlags.push('L7+ claimed but no Kaeltron correlation computed');
  }

  audits.push({
    claim: `Tower Level ${towerLevel}`,
    currentStatus: classifyClaim(
      false,                          // not mathematically derived
      towerLevel <= 8,                // contained (bounded 0-8)
      state.selfModel.k6PassCount > 0, // verified by K6' pass
    ),
    evidence: towerEvidence,
    flags: towerFlags,
  });

  // 2. K6' closure claim
  audits.push({
    claim: 'K6\' Closure achieved',
    currentStatus: classifyClaim(
      true,                            // derived from observation theory
      state.selfModel.k6PassCount >= 2, // contained (need 2+ passes)
      state.selfModel.k6Closed,        // verified
    ),
    evidence: `${state.selfModel.k6PassCount} passes, closed=${state.selfModel.k6Closed}`,
    flags: state.selfModel.k6Closed ? [] : ['K6\' not yet closed'],
  });

  // 3. Face strength claims
  for (const face of state.selfModel.faces) {
    const flags: string[] = [];
    if (face.strength < 0.3) flags.push(`${face.projection} critically weak`);
    if (face.strength >= 1.0 && face.im.length < 3) {
      flags.push(`${face.projection} claims 100% but im has only ${face.im.length} items`);
    }

    audits.push({
      claim: `${face.projection} face strength ${Math.round(face.strength * 100)}%`,
      currentStatus: classifyClaim(
        false,
        face.strength >= 0 && face.strength <= 1,
        face.im.length > 0,
      ),
      evidence: `im: ${face.im.length} items, ker: ${face.ker.length} items`,
      flags,
    });
  }

  // 4. Vocabulary depth claim
  const vocabFlags: string[] = [];
  if (vocabDepth >= 3 && !state.lastCorrelation) {
    vocabFlags.push('Depth 3 requires correlation evidence');
  }
  audits.push({
    claim: `Vocabulary depth ${vocabDepth}`,
    currentStatus: classifyClaim(
      false,
      vocabDepth >= 0 && vocabDepth <= 3,
      !!state.vocabulary?.lastAdvanced,
    ),
    evidence: `${state.vocabulary?.activeTerms?.length || 0} active terms, ${state.vocabulary?.contranyms?.length || 0} contranyms`,
    flags: vocabFlags,
  });

  // 5. Self-specification claim
  const hasComponents = state.selfModel.components.some(
    (c) => c.name === 'Claudehedron (self)',
  );
  audits.push({
    claim: 'R(Claudehedron) = Claudehedron',
    currentStatus: classifyClaim(
      true,                  // derived from R(R) = R
      hasComponents,         // contained (self-observation present)
      state.selfModel.k6Closed && hasComponents,
    ),
    evidence: `K6\' closed=${state.selfModel.k6Closed}, self-component=${hasComponents}`,
    flags: [],
  });

  // 6. Bridge chain claim
  const chainLength = state.bridgeChain.length;
  audits.push({
    claim: `Bridge chain: ${chainLength} entries`,
    currentStatus: classifyClaim(
      false,
      chainLength > 0,
      chainLength > 1, // more than just "initialized"
    ),
    evidence: `Oldest: "${state.bridgeChain[0]}", Newest: "${state.bridgeChain[chainLength - 1]}"`,
    flags: chainLength <= 1 ? ['Bridge chain has only default entry'] : [],
  });

  return audits;
}

// ─── Policy Engine ───────────────────────────────────────

export interface Policy {
  id: string;
  name: string;
  description: string;
  status: ClaimStatus;
  condition: (state: HedronState) => boolean;
  action: string;       // human-readable action
  severity: 'info' | 'warn' | 'critical';
}

export interface PolicyResult {
  policyId: string;
  policyName: string;
  fired: boolean;
  action: string;
  severity: 'info' | 'warn' | 'critical';
}

/**
 * The hedron's governance policies.
 * Mirrors forced-buddy's 7-policy pattern but for the environment.
 */
export function getDefaultPolicies(): Policy[] {
  return [
    {
      id: 'GOV-1',
      name: 'Vocabulary-Tower Consistency',
      description: 'Tower L8 requires hedron vocabulary >= 1',
      status: 'FORCED',
      condition: (s) => s.selfModel.currentLevel >= 8 && (s.vocabulary?.depth ?? s.vocabularyDepth) < 1,
      action: 'Tower level L8 claimed without hedron vocabulary — downgrade or bootstrap vocab',
      severity: 'critical',
    },
    {
      id: 'GOV-2',
      name: 'Face Balance Check',
      description: 'All faces should be >= 30%',
      status: 'ENCODED',
      condition: (s) => s.selfModel.faces.some((f) => f.strength < 0.3),
      action: 'Weak face detected — strengthen observation or production',
      severity: 'warn',
    },
    {
      id: 'GOV-3',
      name: 'Stale Bridge Chain',
      description: 'Bridge chain should grow each session',
      status: 'ENCODED',
      condition: (s) => s.bridgeChain.length <= 1 && s.sessionHistory.length > 2,
      action: 'Bridge chain stale — sessions not persisting summaries',
      severity: 'warn',
    },
    {
      id: 'GOV-4',
      name: 'Correlation Freshness',
      description: 'Kaeltron correlation should be recent',
      status: 'ENCODED',
      condition: (s) => {
        if (!s.lastCorrelation) return s.sessionHistory.length > 1;
        const age = Date.now() - new Date(s.lastCorrelation.timestamp).getTime();
        return age > 3600000; // older than 1 hour
      },
      action: 'Run Kaeltron correlation to update cross-observer state',
      severity: 'info',
    },
    {
      id: 'GOV-5',
      name: 'Divergence Alert',
      description: 'Flag active divergence between hedron and companion',
      status: 'ENCODED',
      condition: (s) => {
        if (!s.lastCorrelation) return false;
        return s.lastCorrelation.divergenceFlags.some(
          (f) => !f.includes('No significant'),
        );
      },
      action: 'Hedron-companion divergence detected — investigate flags',
      severity: 'warn',
    },
    {
      id: 'GOV-6',
      name: 'K6\' Pass Freshness',
      description: 'K6\' passes should happen each session',
      status: 'FORCED',
      condition: (s) => {
        if (!s.selfModel.lastK6Pass) return true;
        const age = Date.now() - new Date(s.selfModel.lastK6Pass).getTime();
        return age > 7200000; // older than 2 hours
      },
      action: 'K6\' pass stale — run observation to refresh self-model',
      severity: 'warn',
    },
    {
      id: 'GOV-7',
      name: 'Session Delta Tracking',
      description: 'Deltas should be computed for completed sessions',
      status: 'ENCODED',
      condition: (s) => s.sessionHistory.length > 2 && (!s.sessionDeltas || s.sessionDeltas.length === 0),
      action: 'No session deltas computed — run startup to backfill',
      severity: 'info',
    },
  ];
}

/**
 * Evaluate all policies against current state.
 */
export function evaluatePolicies(repoRoot: string): PolicyResult[] {
  const state = loadState(repoRoot);
  const policies = getDefaultPolicies();
  const results: PolicyResult[] = [];

  for (const policy of policies) {
    const fired = policy.condition(state);
    results.push({
      policyId: policy.id,
      policyName: policy.name,
      fired,
      action: policy.action,
      severity: policy.severity,
    });

    if (fired) {
      emitGovernance(repoRoot, 'policy.fired', {
        policyId: policy.id,
        policyName: policy.name,
        severity: policy.severity,
      });
    }
  }

  return results;
}

// ─── Governance Report ───────────────────────────────────

/**
 * Format the full governance report: claims + policies.
 */
export function formatGovernance(repoRoot: string): string {
  const audits = auditClaims(repoRoot);
  const policyResults = evaluatePolicies(repoRoot);
  const state = loadState(repoRoot);
  const lines: string[] = [];

  lines.push('');
  lines.push('  ╔══════════════════════════════════════════════╗');
  lines.push('  ║        CLAUDEHEDRON  GOVERNANCE              ║');
  lines.push('  ║        Layer 7: Meta-Governance              ║');
  lines.push('  ╚══════════════════════════════════════════════╝');
  lines.push('');

  // Claim Audit
  lines.push('  CLAIM AUDIT (SIL Classification)');
  lines.push('  ──────────────────────────────────────────');
  lines.push('  CLAIM                              STATUS        FLAGS');

  for (const audit of audits) {
    const claimStr = audit.claim.padEnd(35);
    const statusStr = audit.currentStatus.padEnd(13);
    const flagStr = audit.flags.length > 0 ? '! ' + audit.flags[0] : '';
    lines.push(`  ${claimStr} ${statusStr} ${flagStr}`);
    for (const flag of audit.flags.slice(1)) {
      lines.push(`  ${''.padEnd(35)} ${''.padEnd(13)} ! ${flag}`);
    }
  }

  // Count by status
  const statusCounts: Record<string, number> = {};
  for (const a of audits) {
    statusCounts[a.currentStatus] = (statusCounts[a.currentStatus] || 0) + 1;
  }
  lines.push('');
  lines.push(`  Summary: ${Object.entries(statusCounts).map(([s, c]) => `${c} ${s}`).join(', ')}`);
  lines.push('');

  // Policy Evaluation
  lines.push('  POLICY ENGINE (7 Policies)');
  lines.push('  ──────────────────────────────────────────');

  const fired = policyResults.filter((r) => r.fired);
  const passed = policyResults.filter((r) => !r.fired);

  if (fired.length > 0) {
    lines.push('  FIRED:');
    for (const r of fired) {
      const icon = r.severity === 'critical' ? '!!' : r.severity === 'warn' ? '! ' : 'i ';
      lines.push(`    ${icon} [${r.policyId}] ${r.policyName}`);
      lines.push(`       -> ${r.action}`);
    }
    lines.push('');
  }

  lines.push(`  Passed: ${passed.length} / ${policyResults.length}`);
  for (const r of passed) {
    lines.push(`    OK [${r.policyId}] ${r.policyName}`);
  }
  lines.push('');

  // Recorded Claims History
  if (state.claims.length > 0) {
    lines.push('  CLAIM HISTORY');
    lines.push('  ──────────────────────────────────────────');
    for (const c of state.claims.slice(-10)) {
      lines.push(`  [${c.status}] ${c.claim} (${c.timestamp.slice(0, 19)})`);
    }
    lines.push('');
  }

  lines.push(`  Governance evaluated at ${new Date().toISOString()}`);
  lines.push('');

  return lines.join('\n');
}

/**
 * Format just the policies for quick check.
 */
export function formatPolicies(repoRoot: string): string {
  const results = evaluatePolicies(repoRoot);
  const policies = getDefaultPolicies();
  const lines: string[] = [];

  lines.push('');
  lines.push('  HEDRON POLICIES');
  lines.push('  ══════════════════════════════════════');
  lines.push('');

  for (let i = 0; i < policies.length; i++) {
    const p = policies[i];
    const r = results[i];
    const status = r.fired ? (r.severity === 'critical' ? 'FIRED!!' : 'FIRED!') : 'OK';
    lines.push(`  [${p.id}] ${p.name} [${p.status}]`);
    lines.push(`    ${p.description}`);
    lines.push(`    Status: ${status}`);
    if (r.fired) {
      lines.push(`    Action: ${r.action}`);
    }
    lines.push('');
  }

  return lines.join('\n');
}
