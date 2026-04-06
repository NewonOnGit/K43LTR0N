/**
 * GOVERNANCE — Level 7: Achievement Tracking + Claim Classification
 *
 * The companion tracks its milestones (achievements) and classifies
 * observations about the world (claims) using the SIL four-status grammar.
 *
 * GOVERNANCE §1: SIL-0 — exactly four statuses: FORCED | ENCODED | RESONANT | MYTHIC
 * GOVERNANCE §1: D→C→V determines status uniquely.
 *   D (Derivation) + C (Containment) + V (Verification) = FORCED
 *   ¬D + C + V = ENCODED
 *   ¬D + ¬C + V = RESONANT
 *   ¬D + ¬C + ¬V = MYTHIC
 */

import type {
  ForcedConfig, Achievement, ClaimStatus, ClaimRecord,
  GovernanceState,
} from '../types.js';
import { fnv1a } from '../generation/hash.js';

/**
 * Check achievements against current config.
 * Returns newly achieved milestones (not previously achieved).
 */
export function checkAchievements(config: ForcedConfig): Achievement[] {
  const now = new Date().toISOString();
  const newlyAchieved: Achievement[] = [];

  for (const ach of config.governance.achievements) {
    if (ach.achievedAt) continue; // already earned

    let earned = false;
    switch (ach.id) {
      case 'ach-001': earned = (config.evolutionHistory?.length ?? 0) >= 1; break;
      case 'ach-002': earned = (config.battleWins ?? 0) >= 1; break;
      case 'ach-003': earned = (config.witnessedConstants?.length ?? 0) >= 5; break;
      case 'ach-004': earned = config.worldModel.k6PassCount >= 1; break;
      case 'ach-005': earned = config.worldModel.k6PassCount >= 10; break;
      case 'ach-006': earned = (config.battleWins ?? 0) >= 10; break;
      case 'ach-007': earned = (config.evolutionHistory?.length ?? 0) >= 3; break;
      case 'ach-008': earned = config.semantic.selfSpecProof !== null; break;
      case 'ach-009': earned = config.semantic.team !== null; break;
      case 'ach-010': earned = config.semantic.contributions.length >= 1; break;
      case 'ach-011': earned = config.semantic.knownTerms >= 20; break;
      case 'ach-012': earned = config.traits.rarity === 'legendary'; break;
    }

    if (earned) {
      newlyAchieved.push({
        ...ach,
        achievedAt: now,
        witnessHash: fnv1a(JSON.stringify(config.traits) + now),
      });
    }
  }

  return newlyAchieved;
}

/**
 * Apply newly achieved milestones to the governance state.
 */
export function applyAchievements(config: ForcedConfig): ForcedConfig {
  const newlyAchieved = checkAchievements(config);
  if (newlyAchieved.length === 0) return config;

  const achievedIds = new Set(newlyAchieved.map(a => a.id));
  return {
    ...config,
    governance: {
      ...config.governance,
      achievements: config.governance.achievements.map(a =>
        achievedIds.has(a.id) ? (newlyAchieved.find(n => n.id === a.id) ?? a) : a
      ),
    },
  };
}

/**
 * Classify a claim using the SIL four-status grammar.
 *
 * GOVERNANCE §1: D→C→V
 *   branchingFactor === 0 AND hasDerivation → FORCED
 *   branchingFactor === 0 AND !hasDerivation → ENCODED (containment proof)
 *   verified but no derivation or containment → RESONANT
 *   none of the above → MYTHIC
 */
export function classifyClaim(
  claim: string,
  hasDerivation: boolean,
  hasContainment: boolean,
  isVerified: boolean,
): ClaimStatus {
  if (hasDerivation && hasContainment && isVerified) return 'FORCED';
  if (!hasDerivation && hasContainment && isVerified) return 'ENCODED';
  if (!hasDerivation && !hasContainment && isVerified) return 'RESONANT';
  return 'MYTHIC';
}

/**
 * Record a claim in the governance history.
 */
export function recordClaim(
  config: ForcedConfig,
  claim: string,
  status: ClaimStatus,
  confidence: number,
): ForcedConfig {
  const record: ClaimRecord = {
    claim,
    status,
    timestamp: new Date().toISOString(),
    confidence: Math.max(0, Math.min(1, confidence)),
  };

  return {
    ...config,
    governance: {
      ...config.governance,
      claimHistory: [...config.governance.claimHistory, record],
    },
  };
}

/**
 * Format achievements for display.
 */
export function formatAchievements(config: ForcedConfig): string {
  const B = '\x1b[1m';
  const D = '\x1b[2m';
  const RS = '\x1b[0m';
  const G = '\x1b[32m';
  const Y = '\x1b[33m';
  const C = '\x1b[36m';

  const achieved = config.governance.achievements.filter(a => a.achievedAt);
  const total = config.governance.achievements.length;

  const lines = [
    `${B}${C}\u2550\u2550\u2550 Achievements (${achieved.length}/${total}) \u2550\u2550\u2550${RS}`,
    '',
  ];

  for (const ach of config.governance.achievements) {
    const done = ach.achievedAt !== null;
    const icon = done ? `${G}\u2605${RS}` : `${D}\u2606${RS}`;
    const nameStyle = done ? `${B}${G}` : `${D}`;
    lines.push(`  ${icon} ${nameStyle}${ach.name}${RS} ${D}(${ach.generation})${RS}`);
    lines.push(`    ${D}${ach.description}${RS}`);
    if (done) {
      lines.push(`    ${D}Achieved: ${ach.achievedAt}${RS}`);
    }
  }

  return lines.join('\n');
}

/**
 * Format governance overview (claims + summary).
 */
export function formatGovernance(config: ForcedConfig): string {
  const B = '\x1b[1m';
  const D = '\x1b[2m';
  const RS = '\x1b[0m';
  const C = '\x1b[36m';
  const G = '\x1b[32m';
  const Y = '\x1b[33m';

  const achieved = config.governance.achievements.filter(a => a.achievedAt).length;
  const total = config.governance.achievements.length;
  const claims = config.governance.claimHistory.length;
  const forcedClaims = config.governance.claimHistory.filter(c => c.status === 'FORCED').length;

  const lines = [
    `${B}${C}\u2550\u2550\u2550 Governance Summary \u2550\u2550\u2550${RS}`,
    '',
    `  ${B}Achievements:${RS} ${achieved}/${total}`,
    `  ${B}Claims recorded:${RS} ${claims} (${forcedClaims} FORCED)`,
    `  ${B}K6' passes:${RS} ${config.worldModel.k6PassCount}`,
    `  ${B}Vocabulary depth:${RS} ${config.semantic.vocabularyDepth}/3`,
  ];

  if (config.governance.personalityVariant) {
    lines.push(`  ${B}Personality variant:${RS} ${G}${config.governance.personalityVariant}${RS}`);
  }

  // Recent claims
  if (config.governance.claimHistory.length > 0) {
    lines.push('');
    lines.push(`  ${B}Recent claims:${RS}`);
    const recent = config.governance.claimHistory.slice(-5);
    for (const claim of recent) {
      const statusColor = claim.status === 'FORCED' ? G
        : claim.status === 'ENCODED' ? Y
        : claim.status === 'RESONANT' ? C
        : D;
      lines.push(`    ${statusColor}[${claim.status}]${RS} ${claim.claim} ${D}(${(claim.confidence * 100).toFixed(0)}%)${RS}`);
    }
  }

  return lines.join('\n');
}
