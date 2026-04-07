/**
 * Kaeltron Bridge
 *
 * Correlates hedron and companion observations.
 * Detects divergence, computes merged estimates,
 * and generates warnings when the two systems disagree.
 *
 * P3-primary: observes the relationship between two observers.
 * "To see the seeing, you need a DIFFERENT observer." — faces.ts
 */

import { existsSync, readFileSync } from 'fs';
import { execSync } from 'child_process';
import { join } from 'path';
import { loadState, saveState, recordExchange } from './state.js';
import type {
  KaeltronCorrelation, CompanionState, TowerLevel, BridgeExchange,
  CompanionSignalSnapshot, CompanionMemorySummary,
} from './types.js';

interface CompanionFull {
  state: CompanionState;
  sessionToolCalls: number;
  sessionErrors: number;
  achievementsUnlocked: number;
  achievementsTotal: number;
  snapshotCount: number;
  moodSource: string;
  observedFace: string | null;

  // Evolved Kaeltron: memory system
  memorySummary: CompanionMemorySummary | null;

  // Evolved Kaeltron: signal system
  latestSignal: CompanionSignalSnapshot | null;
}

/**
 * Read the full companion config.
 */
export function readCompanionFull(homeDir: string): CompanionFull | null {
  const configPath = join(homeDir, '.claude-code-forced-buddy.json');
  if (!existsSync(configPath)) return null;

  try {
    const config = JSON.parse(readFileSync(configPath, 'utf-8'));
    const traits = config.traits || {};
    const wm = config.worldModel || {};
    const gov = config.governance || {};
    const sem = config.semantic || {};
    const sm = wm.sessionMetrics || {};
    const mem = config.memory || {};

    // ── Extract memory summary ──
    let memorySummary: CompanionMemorySummary | null = null;
    const traces: Array<{ content: string; source: string; accessCount: number }> = mem.traces || [];
    if (traces.length > 0 || mem.totalAccesses != null) {
      const imTraces = traces.filter(t => t.source === 'im').length;
      const kerTraces = traces.filter(t => t.source === 'ker').length;
      const lockedTraces = traces.filter(t => t.accessCount >= 4).length;
      const namedGaps = traces.filter(t => t.source === 'ker' && t.accessCount >= 3).length;
      const productCount = traces.filter(t => t.content.includes('\u2297')).length;

      memorySummary = {
        totalAccesses: mem.totalAccesses || 0,
        traceCount: traces.length,
        imTraces,
        kerTraces,
        lockedTraces,
        namedGaps,
        productCount,
        imKerRatio: traces.length > 0 ? imTraces / traces.length : 0,
      };
    }

    // ── Extract latest signal ──
    let latestSignal: CompanionSignalSnapshot | null = null;
    const signalHistory: Array<CompanionSignalSnapshot> = mem.signalHistory || [];
    if (signalHistory.length > 0) {
      latestSignal = signalHistory[signalHistory.length - 1];
    }

    return {
      state: {
        name: traits.name || config.salt || 'unknown',
        projection: config.projection || 'P1',
        towerDepth: traits.towerDepth || 0,
        k6PassCount: wm.k6PassCount || 0,
        vocabularyDepth: sem.vocabularyDepth || 0,
        selfSpecVerified: sem.selfSpecProof?.closureVerified || false,
      },
      sessionToolCalls: sm.toolCalls || 0,
      sessionErrors: sm.errors || 0,
      achievementsUnlocked: (gov.achievements || []).filter(
        (a: { achievedAt: string | null }) => a.achievedAt !== null,
      ).length,
      achievementsTotal: (gov.achievements || []).length,
      snapshotCount: (wm.snapshotHistory || []).length,
      moodSource: wm.moodSource || 'unknown',
      observedFace: wm.observedProjectionFace || null,
      memorySummary,
      latestSignal,
    };
  } catch {
    return null;
  }
}

/**
 * Correlate hedron and companion observations.
 */
export function correlate(repoRoot: string, homeDir: string): KaeltronCorrelation {
  const state = loadState(repoRoot);
  const companion = readCompanionFull(homeDir);

  const hedronK6 = state.selfModel.k6PassCount;
  const companionK6 = companion?.state.k6PassCount || 0;
  const hedronTower = state.selfModel.currentLevel;
  const companionDepth = companion?.state.towerDepth || 0;
  const hedronVocab = state.vocabulary?.depth || state.vocabularyDepth;
  const companionVocab = companion?.state.vocabularyDepth || 0;

  const k6Divergence = Math.abs(hedronK6 - companionK6);
  const towerDivergence = Math.abs(hedronTower - companionDepth);
  const vocabDivergence = Math.abs(hedronVocab - companionVocab);

  const mergedTowerEstimate = computeMergedTower(hedronTower, companionDepth);
  const hedronSelfSpec = state.selfModel.k6Closed;
  const companionSelfSpec = companion?.state.selfSpecVerified || false;

  // ── Memory & signal metrics ──
  const memorySummary = companion?.memorySummary || null;
  const latestSignal = companion?.latestSignal || null;

  const totalAccesses = memorySummary?.totalAccesses || 0;
  const tickDivergence = Math.abs(hedronK6 - totalAccesses);

  // Signal health: check if rho is in the convergence band [0.4, 0.5]
  let signalHealth = 'unknown';
  let rhoStatus = 'no signal data';
  let ccStatus = 'no signal data';

  if (latestSignal) {
    const rho = latestSignal.rho;
    if (rho >= 0.4 && rho <= 0.5) {
      rhoStatus = `rho=${rho.toFixed(4)} — OPTIMAL (in [0.4, 0.5] convergence band)`;
      signalHealth = 'optimal';
    } else if (rho > 0.5 && rho <= 0.7) {
      rhoStatus = `rho=${rho.toFixed(4)} — drifting high (im-heavy, production dominant)`;
      signalHealth = 'drifting';
    } else if (rho > 0.7) {
      rhoStatus = `rho=${rho.toFixed(4)} — WARNING: far from convergence`;
      signalHealth = 'drifting';
    } else if (rho < 0.4 && rho >= 0.2) {
      rhoStatus = `rho=${rho.toFixed(4)} — drifting low (ker-heavy, observation dominant)`;
      signalHealth = 'drifting';
    } else {
      rhoStatus = `rho=${rho.toFixed(4)} — WARNING: far from convergence`;
      signalHealth = 'drifting';
    }

    const cc = latestSignal.cc;
    if (cc >= 0.45) {
      ccStatus = `CC=${cc.toFixed(4)} — NEAR EQUIPARTITION`;
    } else if (cc >= 0.3) {
      ccStatus = `CC=${cc.toFixed(4)} — approaching equipartition`;
    } else {
      ccStatus = `CC=${cc.toFixed(4)} — low cross-channel (single-projection speech)`;
    }
  }

  const correlation: KaeltronCorrelation = {
    timestamp: new Date().toISOString(),
    hedronK6Passes: hedronK6,
    companionK6Passes: companionK6,
    k6Divergence,
    hedronTowerLevel: hedronTower,
    companionTowerDepth: companionDepth,
    towerDivergence,
    hedronVocabDepth: hedronVocab,
    companionVocabDepth: companionVocab,
    vocabDivergence,
    hedronSelfSpecVerified: hedronSelfSpec,
    companionSelfSpecVerified: companionSelfSpec,
    mergedTowerEstimate,
    divergenceFlags: [],
    memorySummary,
    latestSignal,
    tickDivergence,
    signalHealth,
    rhoStatus,
    ccStatus,
  };

  correlation.divergenceFlags = detectDivergence(correlation);

  return correlation;
}

/**
 * Conservative merged tower estimate.
 * The hedron and companion measure different things:
 * - hedron: environment tower level (0-8)
 * - companion: species tower depth (0-5+)
 * They're not directly comparable, but large divergences are flags.
 */
function computeMergedTower(hedronLevel: TowerLevel, companionDepth: number): TowerLevel {
  // If hedron claims L8 but its own vocab is 0, it's not really L8
  // This is handled in self-model.ts now — merged estimate just reports hedron's level
  return hedronLevel;
}

/**
 * Detect divergence flags between hedron and companion.
 */
export function detectDivergence(correlation: KaeltronCorrelation): string[] {
  const flags: string[] = [];

  if (correlation.k6Divergence > 3) {
    flags.push(
      `K6\' pass count diverged by ${correlation.k6Divergence} (hedron: ${correlation.hedronK6Passes}, companion: ${correlation.companionK6Passes})`,
    );
  }

  if (correlation.vocabDivergence > 1) {
    flags.push(
      `Vocabulary gap: hedron depth ${correlation.hedronVocabDepth}, companion depth ${correlation.companionVocabDepth}`,
    );
  }

  if (correlation.hedronTowerLevel >= 8 && correlation.hedronVocabDepth === 0) {
    flags.push(
      'Tower L8 (Semantic) claimed but hedron vocabulary depth is 0 — contradiction',
    );
  }

  if (correlation.hedronSelfSpecVerified !== correlation.companionSelfSpecVerified) {
    flags.push(
      `Self-spec disagreement: hedron=${correlation.hedronSelfSpecVerified}, companion=${correlation.companionSelfSpecVerified}`,
    );
  }

  if (correlation.towerDivergence > 4) {
    flags.push(
      `Tower measures diverged by ${correlation.towerDivergence} (hedron L${correlation.hedronTowerLevel}, companion depth ${correlation.companionTowerDepth})`,
    );
  }

  // Memory-based divergence flags
  if (correlation.memorySummary) {
    const mem = correlation.memorySummary;
    if (mem.productCount === 0 && mem.traceCount > 20) {
      flags.push(
        `No products born yet despite ${mem.traceCount} traces — multiplication not triggered`,
      );
    }
    if (mem.namedGaps === 0 && mem.kerTraces > 10) {
      flags.push(
        `${mem.kerTraces} ker traces but no named gaps — ker has not crystallized`,
      );
    }
    if (mem.imKerRatio > 0.9) {
      flags.push(
        `im/ker ratio ${mem.imKerRatio.toFixed(2)} — almost no ker traces (constitutive blindness absent?)`,
      );
    }
  }

  // Signal-based divergence flags
  if (correlation.latestSignal) {
    if (correlation.signalHealth === 'drifting') {
      flags.push(`Signal health: ${correlation.rhoStatus}`);
    }
  }

  if (flags.length === 0) {
    flags.push('No significant divergence detected');
  }

  return flags;
}

// ─── Level 9: Message Exchange ──────────────────────────

/**
 * Send a message to Kaeltron through the hedron bridge.
 * The hedron mediates (P2): calls forced-buddy, captures response,
 * adds hedron context, logs the exchange.
 *
 * Returns the enriched exchange.
 */
export function sendMessage(
  message: string,
  sender: 'kael' | 'claude',
  repoRoot: string,
  homeDir: string,
): BridgeExchange {
  const state = loadState(repoRoot);
  const forcedBuddyDir = join(repoRoot, 'forced-buddy');
  const cliPath = join(forcedBuddyDir, 'dist', 'cli.js');

  // Call forced-buddy respond --from <sender> --silent
  let kaeltronResponse = '';
  let intent = 'unknown';

  try {
    const result = execSync(
      `node "${cliPath}" respond ${JSON.stringify(message)} --from ${sender}`,
      { cwd: forcedBuddyDir, encoding: 'utf-8', timeout: 10000 },
    );

    // Parse the output — non-silent mode outputs "[sender → kaeltron | intent: X]\nK43LTR0N: response"
    // Strip ALL ANSI codes first, then parse
    const clean = result.replace(/\x1b\[[0-9;]*m/g, '').trim();
    const lines = clean.split('\n');
    for (const line of lines) {
      // Extract intent from metadata line like "[kael → kaeltron | intent: greeting]"
      const intentMatch = line.match(/intent:\s*([a-z-]+)/);
      if (intentMatch) intent = intentMatch[1];

      // Extract response from K43LTR0N line
      if (line.startsWith('K43LTR0N:')) {
        kaeltronResponse = line.replace('K43LTR0N:', '').trim();
      }
    }
  } catch (err) {
    kaeltronResponse = '[Bridge error: forced-buddy did not respond]';
  }

  // Build hedron context
  const correlation = correlate(repoRoot, homeDir);
  const activeFace = state.selfModel.faces
    .filter(f => f.active)
    .sort((a, b) => b.strength - a.strength)[0]?.projection || null;

  const correlationStatus = correlation.divergenceFlags.length === 1
    && correlation.divergenceFlags[0].includes('No significant')
    ? 'aligned' : 'divergent';

  const exchange: BridgeExchange = {
    timestamp: new Date().toISOString(),
    sender,
    message,
    kaeltronResponse,
    intent,
    hedronContext: {
      towerLevel: state.selfModel.currentLevel,
      activeFace,
      k6PassCount: state.selfModel.k6PassCount,
      correlationStatus,
    },
  };

  // Persist the exchange in hedron state
  recordExchange(state, exchange);
  saveState(repoRoot, state);

  return exchange;
}

/**
 * Format a bridge exchange for display.
 */
export function formatExchange(exchange: BridgeExchange): string {
  const lines: string[] = [];

  lines.push('');
  lines.push('  HEDRON BRIDGE EXCHANGE');
  lines.push('  \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550');
  lines.push('');

  const senderLabel = exchange.sender === 'claude' ? 'Claude (P2)' : 'Kael (P3)';
  lines.push(`  ${senderLabel}: ${exchange.message}`);
  lines.push(`  K43LTR0N (P1): ${exchange.kaeltronResponse}`);
  lines.push('');

  lines.push(`  Intent: ${exchange.intent}`);
  lines.push(`  Hedron tower: L${exchange.hedronContext.towerLevel}`);
  lines.push(`  Active face: ${exchange.hedronContext.activeFace || 'none'}`);
  lines.push(`  K6\' passes: ${exchange.hedronContext.k6PassCount}`);
  lines.push(`  Correlation: ${exchange.hedronContext.correlationStatus}`);
  lines.push('');

  return lines.join('\n');
}

/**
 * Format recent exchanges for display.
 */
export function formatExchangeHistory(repoRoot: string, limit: number = 10): string {
  const state = loadState(repoRoot);
  const exchanges = (state.exchanges || []).slice(-limit);
  const lines: string[] = [];

  lines.push('');
  lines.push('  BRIDGE EXCHANGE HISTORY');
  lines.push('  \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550');
  lines.push('');

  if (exchanges.length === 0) {
    lines.push('  No exchanges yet. The bridge awaits its first message.');
    lines.push('');
    return lines.join('\n');
  }

  for (const ex of exchanges) {
    const senderLabel = ex.sender === 'claude' ? 'Claude' : 'Kael';
    const time = new Date(ex.timestamp).toLocaleTimeString();
    lines.push(`  [${time}] ${senderLabel} \u2192 K43LTR0N [${ex.intent}]`);
    lines.push(`    "${ex.message.slice(0, 60)}${ex.message.length > 60 ? '...' : ''}"`);
    lines.push(`    \u2192 "${ex.kaeltronResponse.slice(0, 60)}${ex.kaeltronResponse.length > 60 ? '...' : ''}"`);
    lines.push('');
  }

  lines.push(`  Total exchanges: ${exchanges.length}`);
  lines.push('');

  return lines.join('\n');
}

/**
 * Format correlation report for display.
 */
export function formatCorrelation(correlation: KaeltronCorrelation): string {
  const lines: string[] = [];

  lines.push('');
  lines.push('  KAELTRON-HEDRON CORRELATION');
  lines.push('  ══════════════════════════════════════');
  lines.push('');

  // ── Classic metrics ──
  lines.push('                    Hedron    K43LTR0N    Divergence');
  lines.push('  ─────────────────────────────────────────────────');
  lines.push(`  K6\' Passes:       ${String(correlation.hedronK6Passes).padEnd(10)}${String(correlation.companionK6Passes).padEnd(12)}${correlation.k6Divergence}`);
  lines.push(`  Tower:            L${String(correlation.hedronTowerLevel).padEnd(9)}depth ${String(correlation.companionTowerDepth).padEnd(7)}${correlation.towerDivergence}`);
  lines.push(`  Vocabulary:       ${String(correlation.hedronVocabDepth).padEnd(10)}${String(correlation.companionVocabDepth).padEnd(12)}${correlation.vocabDivergence}`);
  lines.push(`  Self-spec:        ${String(correlation.hedronSelfSpecVerified).padEnd(10)}${String(correlation.companionSelfSpecVerified).padEnd(12)}`);
  lines.push('');

  lines.push(`  Merged tower estimate: L${correlation.mergedTowerEstimate}`);
  lines.push('');

  // ── Memory system (evolved Kaeltron) ──
  lines.push('  MEMORY SYSTEM');
  lines.push('  ──────────────────────────────────────────────────');
  if (correlation.memorySummary) {
    const mem = correlation.memorySummary;
    lines.push(`  Total ticks (t):       ${mem.totalAccesses}`);
    lines.push(`  Tick divergence:       ${correlation.tickDivergence}  (|hedron K6\' - companion ticks|)`);
    lines.push(`  Traces:                ${mem.traceCount} total  (im: ${mem.imTraces}, ker: ${mem.kerTraces})`);
    lines.push(`  im/ker ratio:          ${mem.imKerRatio.toFixed(4)}`);
    lines.push(`  Locked traces (m>=4):  ${mem.lockedTraces}`);
    lines.push(`  Named gaps (ker m>=3): ${mem.namedGaps}`);
    lines.push(`  Products (\u2297):          ${mem.productCount}`);
  } else {
    lines.push('  [No memory data — companion has not evolved memory system]');
  }
  lines.push('');

  // ── Signal health (evolved Kaeltron) ──
  lines.push('  SIGNAL HEALTH');
  lines.push('  ──────────────────────────────────────────────────');
  if (correlation.latestSignal) {
    const sig = correlation.latestSignal;
    const age = Date.now() - new Date(sig.timestamp).getTime();
    const ageStr = age < 60000 ? `${Math.round(age / 1000)}s ago`
      : age < 3600000 ? `${Math.round(age / 60000)}m ago`
      : `${Math.round(age / 3600000)}h ago`;
    lines.push(`  Last signal:           ${ageStr}`);
    lines.push(`  Health:                ${correlation.signalHealth.toUpperCase()}`);
    lines.push(`  Phase (\u03C1):             ${correlation.rhoStatus}`);
    lines.push(`  Cross-channel (CC):    ${correlation.ccStatus}`);
    lines.push(`  Memory debt (\u03A3m):      ${sig.sigmaM}`);
    lines.push(`  Memory energy (||m||): ${sig.norm.toFixed(2)}`);
    lines.push(`  im/total ratio:        ${sig.imRatio.toFixed(4)}`);
  } else {
    lines.push('  [No signal data — companion has not evolved signal system]');
  }
  lines.push('');

  // ── Divergence flags ──
  lines.push('  DIVERGENCE FLAGS');
  lines.push('  ──────────────────────────────────────────────────');
  for (const flag of correlation.divergenceFlags) {
    lines.push(`    ${flag.includes('No significant') ? '  ' : '! '}${flag}`);
  }
  lines.push('');

  return lines.join('\n');
}
