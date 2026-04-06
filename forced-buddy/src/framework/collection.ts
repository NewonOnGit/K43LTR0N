/**
 * FIVE-CONSTANT COLLECTION — Theorem B.17
 *
 * Track which of the five forced constants a companion has "witnessed":
 *   φ  — encountered via P1 (eigenvalue of R)
 *   e  — encountered via P2 (exponential constant)
 *   π  — encountered via P3 (rotation constant)
 *   √3 — encountered via deep-tower P1 (norm of R, secondary hat)
 *   √2 — encountered via deep-tower P3 (norm of N, secondary hat)
 *
 * ALGEBRA §9: five constants, no sixth exists.
 * Completing all five = C5U (Complete Five-constant Unity).
 * Reward: personality unlocks full three-reading description.
 */

import type { ForcedConstant, ConstantWitness, ForcedTraits, Projection } from '../types.js';
import { PHI, SQRT3, SQRT2 } from './algebra.js';

/**
 * The five forced constants with their framework attributions.
 */
export const CONSTANTS: Record<ForcedConstant, {
  symbol: string;
  value: number;
  source: string;
  projection: Projection;
  deepTower: boolean;
}> = {
  phi:   { symbol: '\u03C6',  value: PHI,    source: 'Eigenvalue of R',     projection: 'P1', deepTower: false },
  e:     { symbol: 'e',      value: Math.E,  source: 'P2 exponential',      projection: 'P2', deepTower: false },
  pi:    { symbol: '\u03C0',  value: Math.PI, source: 'P3 rotation',         projection: 'P3', deepTower: false },
  sqrt3: { symbol: '\u221A3', value: SQRT3,   source: 'Norm of R',           projection: 'P1', deepTower: true },
  sqrt2: { symbol: '\u221A2', value: SQRT2,   source: 'Norm of N',           projection: 'P3', deepTower: true },
};

/**
 * Determine which constants a companion witnesses by existing.
 * Thm B.17: witnessing follows from the companion's projection and tower depth.
 */
export function witnessedByCompanion(traits: ForcedTraits): ForcedConstant[] {
  const witnessed: ForcedConstant[] = [];

  // Primary constant from projection
  switch (traits.projection) {
    case 'P1': witnessed.push('phi'); break;
    case 'P2': witnessed.push('e'); break;
    case 'P3': witnessed.push('pi'); break;
  }

  // Deep tower unlocks norm constants
  if (traits.towerDepth >= 3) {
    if (traits.projection === 'P1') witnessed.push('sqrt3');
    if (traits.projection === 'P3') witnessed.push('sqrt2');
  }

  return witnessed;
}

/**
 * Determine which constants an interaction witnesses.
 * Interacting with another companion witnesses their constants too.
 */
export function witnessedByInteraction(other: ForcedTraits): ForcedConstant[] {
  return witnessedByCompanion(other);
}

/**
 * Check if collection is complete (C5U achieved).
 */
export function isC5U(witnessed: ConstantWitness[]): boolean {
  const all: ForcedConstant[] = ['phi', 'e', 'pi', 'sqrt3', 'sqrt2'];
  const seen = new Set(witnessed.map(w => w.constant));
  return all.every(c => seen.has(c));
}

/**
 * Create witness records for newly witnessed constants.
 */
export function createWitnesses(
  constants: ForcedConstant[],
  via: string,
  existing: ConstantWitness[],
): ConstantWitness[] {
  const seen = new Set(existing.map(w => w.constant));
  return constants
    .filter(c => !seen.has(c))
    .map(c => ({
      constant: c,
      witnessedVia: via,
      timestamp: new Date().toISOString(),
    }));
}

/**
 * Format collection display.
 */
export function formatCollection(witnessed: ConstantWitness[]): string {
  const B = '\x1b[1m';
  const D = '\x1b[2m';
  const RS = '\x1b[0m';
  const G = '\x1b[32m';
  const R = '\x1b[31m';
  const Y = '\x1b[33m';
  const C = '\x1b[36m';
  const M = '\x1b[35m';

  const seen = new Set(witnessed.map(w => w.constant));
  const all: ForcedConstant[] = ['phi', 'e', 'pi', 'sqrt3', 'sqrt2'];
  const count = all.filter(c => seen.has(c)).length;
  const complete = count === 5;

  const lines: string[] = [
    `${B}${C}\u2550\u2550\u2550 Five-Constant Collection (${count}/5) \u2550\u2550\u2550${RS}`,
    '',
  ];

  for (const key of all) {
    const c = CONSTANTS[key];
    const found = seen.has(key);
    const witness = witnessed.find(w => w.constant === key);
    const icon = found ? `${G}\u2713${RS}` : `${R}\u2717${RS}`;
    const valueStr = c.value.toFixed(6);
    const viaStr = witness ? ` ${D}(via ${witness.witnessedVia})${RS}` : '';
    lines.push(`  ${icon} ${B}${c.symbol}${RS} = ${valueStr}  ${D}${c.source}${RS}${viaStr}`);
  }

  lines.push('');

  if (complete) {
    lines.push(`  ${M}${B}\u2605 C5U ACHIEVED \u2605${RS}`);
    lines.push(`  ${D}All five forced constants witnessed. No sixth exists.${RS}`);
    lines.push(`  ${D}Personality unlocked: full three-reading description.${RS}`);
  } else {
    const missing = all.filter(c => !seen.has(c));
    lines.push(`  ${Y}Missing: ${missing.map(k => CONSTANTS[k].symbol).join(', ')}${RS}`);
    for (const key of missing) {
      const c = CONSTANTS[key];
      lines.push(`  ${D}  ${c.symbol}: ${c.deepTower ? 'interact with deep-tower ' : 'interact with '}${c.projection} companion${RS}`);
    }
  }

  return lines.join('\n');
}
