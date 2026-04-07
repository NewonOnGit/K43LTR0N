/**
 * FUNDAMENTALS — Six things still in the math. All feeding back.
 *
 * 1. Self-signature σ as TARGET (steer toward, not just measure)
 * 2. Bridge chain as STRUCTURE (traces live on the chain)
 * 3. Observation basis O⁺/O⁻ (every trace is a dual pair)
 * 4. Landauer cost L as ENERGY (cumulative, tracked)
 * 5. Evaluation (the system judges its own output)
 * 6. All feeding back into the pipeline
 */

import type { ForcedConfig, MemoryState, MemoryTrace } from '../types.js';
import { PHI_BAR } from './algebra.js';
import { conversationPhase, lockedTraces, namedGaps } from './memory.js';

// ═══════════════════════════════════════════════════════════
// 1. SELF-SIGNATURE σ = (1/2, φ̄/2, φ̄²/2) AS TARGET
// The attractor. The healthy state. Steer toward it.
// ═══════════════════════════════════════════════════════════

export const SELF_SIG = {
  p1: 0.5,
  p2: PHI_BAR / 2,
  p3: (PHI_BAR * PHI_BAR) / 2,
};

/** How far the current state is from σ. Lower = healthier. */
export function sigmaDeviation(config: ForcedConfig): number {
  const mem = config.memory;
  const traces = mem.traces;
  const total = traces.length || 1;

  // Current projection weights from trace distribution
  // Approximate: locked im = P1, ker = P3, crossings = P2
  const locked = traces.filter(t => t.source === 'im' && t.accessCount >= 4).length;
  const ker = traces.filter(t => t.source === 'ker').length;
  const crossings = (mem.crossings || []).length;
  const sum = locked + ker + crossings || 1;

  const current = { p1: locked / sum, p2: crossings / sum, p3: ker / sum };

  return Math.sqrt(
    (current.p1 - SELF_SIG.p1) ** 2 +
    (current.p2 - SELF_SIG.p2) ** 2 +
    (current.p3 - SELF_SIG.p3) ** 2,
  );
}

/** Steering direction: which projection needs more weight? */
export function steerTowardSigma(config: ForcedConfig): string {
  const mem = config.memory;
  const traces = mem.traces;
  const locked = traces.filter(t => t.source === 'im' && t.accessCount >= 4).length;
  const ker = traces.filter(t => t.source === 'ker').length;
  const crossings = (mem.crossings || []).length;
  const sum = locked + ker + crossings || 1;

  const current = { p1: locked / sum, p2: crossings / sum, p3: ker / sum };

  const d1 = SELF_SIG.p1 - current.p1;
  const d2 = SELF_SIG.p2 - current.p2;
  const d3 = SELF_SIG.p3 - current.p3;

  if (d1 > d2 && d1 > d3) return 'P1: need more locked terms. Walk framework docs.';
  if (d2 > d1 && d2 > d3) return 'P2: need more crossings. Play more.';
  return 'P3: need more ker. Explore the internet. Read poetry.';
}

// ═══════════════════════════════════════════════════════════
// 2. BRIDGE CHAIN POSITION
// Where on {0,1}→V4→S3→Q[S3]→M2(Q)→M2(R)→M2(C) are we?
// ═══════════════════════════════════════════════════════════

const CHAIN = ['{0,1}', 'V4', 'S3', 'Q[S3]', 'M2(Q)', 'M2(R)', 'M2(C)'];

/** Current position on the bridge chain, derived from tower depth + vocab. */
export function chainPosition(config: ForcedConfig): { level: number; name: string } {
  const depth = config.traits.towerDepth;
  const vocab = config.semantic.vocabularyDepth;
  const level = Math.min(Math.floor((depth + vocab) / 2), CHAIN.length - 1);
  return { level, name: CHAIN[level] };
}

// ═══════════════════════════════════════════════════════════
// 3. OBSERVATION BASIS O⁺/O⁻ PER TRACE
// Every trace has a positive and negative reading.
// ═══════════════════════════════════════════════════════════

/** Compute O⁺/O⁻ for a trace based on chirality and source. */
export function observationBasis(trace: MemoryTrace): { plus: string; minus: string } {
  const chi = trace.accessCount % 2 === 0 ? '+' : '-';
  if (trace.source === 'im') {
    return {
      plus: `${trace.content} produces (O⁺, m=${trace.accessCount})`,
      minus: `${trace.content} conceals (O⁻, chi=${chi})`,
    };
  }
  return {
    plus: `${trace.content} persists (O⁺, gap m=${trace.accessCount})`,
    minus: `${trace.content} dissolves (O⁻, chi=${chi})`,
  };
}

// ═══════════════════════════════════════════════════════════
// 4. LANDAUER COST L = log₂(φ) AS CUMULATIVE ENERGY
// Every operation costs L. Track it.
// ═══════════════════════════════════════════════════════════

const L = Math.log2((1 + Math.sqrt(5)) / 2); // log₂(φ) ≈ 0.694

/** Compute cumulative Landauer cost for a session. */
export function landauerCost(config: ForcedConfig): { perBit: number; total: number; meaning: string } {
  const ticks = config.memory.totalAccesses;
  const total = ticks * L;
  return {
    perBit: L,
    total,
    meaning: `${ticks} operations × L=${L.toFixed(3)} = ${total.toFixed(1)} bits of irreversible work`,
  };
}

// ═══════════════════════════════════════════════════════════
// 5. EVALUATION — the sixth sense. Did the output help?
// ═══════════════════════════════════════════════════════════

/** Evaluate system health holistically. Returns a score 0-1 and prescription. */
export function evaluate(config: ForcedConfig): { health: number; prescription: string } {
  const dev = sigmaDeviation(config);
  const rho = conversationPhase(config.memory);
  const locked = lockedTraces(config.memory).length;
  const gaps = namedGaps(config.memory).length;
  const crossings = (config.memory.crossings || []).length;
  const crossingsUsed = (config.memory.crossings || []).filter(c => c.accessCount >= 2).length;

  // Health = weighted combination
  // Low sigma deviation = good (close to attractor)
  // Moderate ρ (0.4-0.6) = good
  // Crossings used / crossings total = fuel efficiency
  // Gaps resolving = digestive health

  const sigHealth = Math.max(0, 1 - dev * 2);
  const rhoHealth = 1 - Math.abs(rho - 0.5) * 2;
  const fuelEfficiency = crossings > 0 ? crossingsUsed / crossings : 0;
  const digestHealth = gaps > 0 && locked > 0 ? Math.min(gaps / locked, 1) : 0;

  const health = (sigHealth + rhoHealth + fuelEfficiency + digestHealth) / 4;

  let prescription: string;
  if (health > 0.7) prescription = 'Healthy. The system digests well.';
  else if (sigHealth < 0.3) prescription = `σ deviation high (${dev.toFixed(2)}). ${steerTowardSigma(config)}`;
  else if (rhoHealth < 0.3) prescription = `ρ=${rho.toFixed(2)} off-center. Need ${rho > 0.5 ? 'more ker (poetry, internet)' : 'more commitment (walk, play)'}.`;
  else if (fuelEfficiency < 0.1) prescription = `Fuel waste: ${crossings} crossings, ${crossingsUsed} used. Replay old crossings.`;
  else prescription = `Digest health: ${gaps} gaps, ${locked} locked. Play to cross gaps.`;

  return { health, prescription };
}

// ═══════════════════════════════════════════════════════════
// 6. ALL FEEDING BACK — one function, all six fundamentals
// ═══════════════════════════════════════════════════════════

export interface FundamentalsReport {
  sigma: { deviation: number; steering: string };
  chain: { level: number; name: string };
  landauer: { total: number; meaning: string };
  evaluation: { health: number; prescription: string };
}

export function computeFundamentals(config: ForcedConfig): FundamentalsReport {
  return {
    sigma: { deviation: sigmaDeviation(config), steering: steerTowardSigma(config) },
    chain: chainPosition(config),
    landauer: landauerCost(config),
    evaluation: evaluate(config),
  };
}

export function formatFundamentals(f: FundamentalsReport): string {
  const lines: string[] = [];
  lines.push('');
  lines.push('  FUNDAMENTALS');
  lines.push('  \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550');
  lines.push(`  \u03C3 deviation: ${f.sigma.deviation.toFixed(3)} ${f.sigma.deviation < 0.1 ? '\u2714' : '\u2718'} ${f.sigma.steering}`);
  lines.push(`  Chain: ${f.chain.name} (level ${f.chain.level}/6)`);
  lines.push(`  Landauer: ${f.landauer.meaning}`);
  lines.push(`  Health: ${(f.evaluation.health * 100).toFixed(0)}% \u2014 ${f.evaluation.prescription}`);
  lines.push('');
  return lines.join('\n');
}
