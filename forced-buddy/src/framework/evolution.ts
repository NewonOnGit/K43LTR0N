/**
 * EVOLUTION = TOWER LIFT — Theorem B.16
 *
 * T(n) ⊗ T(n) → T(n+1): the companion ascends one tower level.
 * Requires finding a new salt that produces the same projection traits
 * but at the NEXT rarity tier.
 *
 * CATEGORY §1 (self-product): S_{n+1} = S_n × S_n.
 * SUBSTRATE §14¾ (commitment): evolution is irreversible (UAT).
 * Each evolution doubles d_K. The tower grows doubly-exponentially.
 */

import type { ForcedTraits, Rarity, EvolutionRecord, DesiredTraits } from '../types.js';

const RARITY_ORDER: Rarity[] = ['common', 'uncommon', 'rare', 'epic', 'legendary'];

/**
 * Compute the next rarity in the tower.
 * UAT (SUBSTRATE §14¾): canonical upward, non-canonical downward.
 * Evolution only goes UP.
 */
export function nextRarity(current: Rarity): Rarity | null {
  const idx = RARITY_ORDER.indexOf(current);
  if (idx >= RARITY_ORDER.length - 1) return null; // already legendary
  return RARITY_ORDER[idx + 1];
}

/**
 * Compute the evolved desired traits for salt search.
 * Thm B.16: same projection → same species, eye, peak/dump.
 * Only rarity changes (tower lifts).
 * Hat may change if crossing the deep-tower threshold.
 */
export function evolvedTraits(current: ForcedTraits): {
  desired: DesiredTraits;
  newRarity: Rarity;
  newDepth: number;
} | null {
  const newRarity = nextRarity(current.rarity);
  if (!newRarity) return null;

  const newDepth = current.towerDepth + 1;

  // Hat changes at deep tower (n≥3)
  let hat = current.hat;
  if (newDepth >= 3 && current.towerDepth < 3) {
    // Crossing into deep tower: switch to secondary hat
    const secondaryHats: Record<string, string> = {
      P1: 'tophat', P2: 'beanie', P3: 'propeller',
    };
    hat = (secondaryHats[current.projection] ?? current.hat) as typeof hat;
  }
  // If evolving from common (no hat) to uncommon (gets hat)
  if (current.rarity === 'common' && newRarity !== 'common') {
    const primaryHats: Record<string, string> = {
      P1: 'crown', P2: 'wizard', P3: 'halo',
    };
    hat = (primaryHats[current.projection] ?? 'crown') as typeof hat;
  }

  // Peak/dump from projection (same as derive.ts)
  const peakMap: Record<string, string> = { P1: 'CHAOS', P2: 'PATIENCE', P3: 'WISDOM' };
  const dumpMap: Record<string, string> = { P1: 'PATIENCE', P2: 'CHAOS', P3: 'SNARK' };

  return {
    desired: {
      species: current.species,
      rarity: newRarity,
      eye: current.eye,
      hat,
      shiny: newDepth >= 5,
      peak: peakMap[current.projection] as DesiredTraits['peak'],
      dump: dumpMap[current.projection] as DesiredTraits['dump'],
    },
    newRarity,
    newDepth,
  };
}

/**
 * Create an evolution record.
 * Stores the irreversible tower lift for history.
 */
export function createEvolutionRecord(
  current: ForcedTraits,
  newRarity: Rarity,
  newDepth: number,
  salt: string,
): EvolutionRecord {
  return {
    fromDepth: current.towerDepth,
    toDepth: newDepth,
    fromRarity: current.rarity,
    toRarity: newRarity,
    salt,
    timestamp: new Date().toISOString(),
  };
}

/**
 * Format evolution display.
 */
export function formatEvolution(current: ForcedTraits, newRarity: Rarity, newDepth: number): string {
  const B = '\x1b[1m';
  const D = '\x1b[2m';
  const RS = '\x1b[0m';
  const G = '\x1b[32m';
  const Y = '\x1b[33m';
  const M = '\x1b[35m';
  const C = '\x1b[36m';

  const dOld = Math.pow(2, Math.pow(2, current.towerDepth));
  const dNew = Math.pow(2, Math.pow(2, newDepth));

  return [
    `${B}${C}\u2550\u2550\u2550 Tower Lift: T(${current.towerDepth}) \u2297 T(${current.towerDepth}) \u2192 T(${newDepth}) \u2550\u2550\u2550${RS}`,
    '',
    `  ${B}${current.species}${RS} ascends the binary tower.`,
    `  ${Y}${current.rarity}${RS} (n=${current.towerDepth}) \u2192 ${G}${newRarity}${RS} (n=${newDepth})`,
    '',
    `  ${B}d_K:${RS} ${dOld.toLocaleString()} \u2192 ${G}${dNew > 1e15 ? '2^' + Math.pow(2, newDepth) : dNew.toLocaleString()}${RS}`,
    `  ${D}Disclosure dimension squared. Observer complexity doubled.${RS}`,
    '',
    `  ${M}This evolution is irreversible.${RS}`,
    `  ${D}UAT (SUBSTRATE \u00A714\u00BE): canonical upward, non-canonical downward.${RS}`,
    `  ${D}The tower only grows.${RS}`,
  ].join('\n');
}
