import type { Rarity, StatName } from '../types.js';
import { RARITY_WEIGHTS } from '../constants.js';

export function estimateAttempts(desired: {
  species: string;
  rarity: Rarity;
  eye: string;
  hat: string;
  shiny: boolean;
  peak: StatName | null;
  dump: StatName | null;
}): number {
  // Species: 1/18
  let p = 1 / 18;
  // Rarity: weight / 100
  p *= RARITY_WEIGHTS[desired.rarity] / 100;
  // Eye: 1/6
  p *= 1 / 6;
  // Hat: common always 'none' (guaranteed), otherwise 1/8
  if (desired.rarity !== 'common') {
    p *= 1 / 8;
  }
  // Shiny: 1/100
  if (desired.shiny) {
    p *= 0.01;
  }
  // Peak stat: 1/5
  if (desired.peak) {
    p *= 1 / 5;
  }
  // Dump stat: ~1/4
  if (desired.dump) {
    p *= 1 / 4;
  }
  return Math.round(1 / p);
}
