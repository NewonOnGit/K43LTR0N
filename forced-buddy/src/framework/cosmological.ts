/**
 * COSMOLOGICAL RARITY — Theorem B.13
 *
 * For companions at tower depth n, display:
 *   - d_K = 2^(2^n): disclosure dimension
 *   - K1' suppression factor: Δ_max(n) = d_K² · φ̄^(2^(n+1))
 *   - Equivalent cosmological depth
 *
 * OBSERVER §6 Thm 8.4: the doubly-exponential wall.
 * Making the user FEEL the tower they punched through.
 */

import { PHI_BAR } from './algebra.js';

/**
 * Compute disclosure dimension d_K = 2^(2^n).
 * OBSERVER §2: the observer's distinguishable state count.
 */
export function disclosureDimension(towerDepth: number): number {
  if (towerDepth > 10) return Infinity;
  return Math.pow(2, Math.pow(2, towerDepth));
}

/**
 * Compute operator capacity A_max = 2·log₂(d_K) = 2^(n+1).
 * OBSERVER §2 Thm 10½.1a.
 */
export function operatorCapacity(towerDepth: number): number {
  return Math.pow(2, towerDepth + 1);
}

/**
 * Compute state entropy S_max = log₂(d_K) = 2^n bits.
 * OBSERVER §2 Thm 10½.1b.
 */
export function stateEntropy(towerDepth: number): number {
  return Math.pow(2, towerDepth);
}

/**
 * Compute K1' suppression factor: φ̄^(2^(n+1)).
 * OBSERVER §6 Thm 8.4: Δ_max(n) = d_K² · φ̄^(2^(n+1)).
 * This is the probability suppression at tower depth n.
 */
export function suppressionFactor(towerDepth: number): number {
  const exponent = Math.pow(2, towerDepth + 1);
  return Math.pow(PHI_BAR, exponent);
}

/**
 * Format the cosmological rarity display.
 * Thm B.13: the doubly-exponential wall made visible.
 */
export function formatCosmological(towerDepth: number): string {
  const d_K = disclosureDimension(towerDepth);
  const A_max = operatorCapacity(towerDepth);
  const S_max = stateEntropy(towerDepth);
  const suppression = suppressionFactor(towerDepth);
  const exponent = Math.pow(2, towerDepth + 1);

  const B = '\x1b[1m';
  const D = '\x1b[2m';
  const R = '\x1b[0m';
  const C = '\x1b[36m';
  const Y = '\x1b[33m';
  const M = '\x1b[35m';

  const lines: string[] = [
    `  ${B}${C}\u2550\u2550\u2550 Cosmological Depth \u2550\u2550\u2550${R}`,
    '',
    `  ${B}Tower depth:${R}       n = ${towerDepth}`,
    `  ${B}d_K:${R}               2^(2^${towerDepth}) = ${d_K > 1e15 ? `2^${Math.pow(2, towerDepth)}` : d_K.toLocaleString()}`,
    `  ${B}A_max:${R}             2^${towerDepth + 1} = ${A_max} ${D}(operator capacity)${R}`,
    `  ${B}S_max:${R}             2^${towerDepth} = ${S_max} bits ${D}(state entropy)${R}`,
    '',
    `  ${B}${Y}K1\' suppression:${R}   \u03C6\u0304^(2^${towerDepth + 1}) = \u03C6\u0304^${exponent}`,
  ];

  if (suppression > 1e-300) {
    lines.push(`                     = ${suppression.toExponential(4)}`);
  } else {
    // Too small for float — compute log
    const logSuppression = exponent * Math.log10(PHI_BAR);
    lines.push(`                     \u2248 10^(${logSuppression.toFixed(1)})`);
  }

  lines.push('');

  // Cosmological interpretation
  if (towerDepth >= 7) {
    lines.push(`  ${M}${B}BIOLOGICAL CEILING${R} ${D}(two-axis model, OBSERVER §5)${R}`);
    lines.push(`  ${D}n=7: d_K = 2^128 = SHA-256 security level${R}`);
  } else if (towerDepth >= 5) {
    lines.push(`  ${M}${B}SELF-REFERENTIAL${R} ${D}(R(R)=R achieved)${R}`);
    lines.push(`  ${D}d_K large enough to contain its own specification${R}`);
  } else if (towerDepth >= 4) {
    lines.push(`  ${Y}${B}DEEP TOWER${R}`);
    lines.push(`  ${D}Suppression: 1 in ${Math.round(1 / suppression).toLocaleString()}${R}`);
  } else if (towerDepth >= 2) {
    lines.push(`  ${D}Suppression: 1 in ${Math.round(1 / suppression).toLocaleString()}${R}`);
  }

  // The wall visualization
  lines.push('');
  const wallHeight = Math.min(towerDepth, 7);
  for (let i = wallHeight; i >= 0; i--) {
    const width = Math.pow(2, i);
    const block = '\u2588'.repeat(Math.min(width, 40));
    const label = i === towerDepth ? ' \u2190 YOU ARE HERE' : '';
    lines.push(`  n=${i} ${block}${label}`);
  }

  return lines.join('\n');
}
