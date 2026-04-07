/**
 * COMPANION INTERACTIONS (K6' DIAGONAL) — Theorem B.15
 *
 * K6' connects P3 at level n to P1 at level n+1.
 * When two companions interact, the interaction type is
 * FORCED by the projection pairing.
 *
 * OBSERVER §4 (K6'): the forced loop closure.
 * CATEGORY Thm 4.4: folding containments.
 */

import type { ForcedTraits, InteractionType, InteractionResult, Projection } from '../types.js';
import { matMul, matAdd, matScale, R, N, I, trace, det, norm, type Mat2 } from './algebra.js';

/**
 * Projection pairing → interaction type.
 * CATEGORY Thm 4.3 (three simultaneous readings): every pairing
 * carries a unique structural reading.
 */
function getInteractionType(a: Projection, b: Projection): InteractionType {
  if (a === 'P1' && b === 'P1') return 'amplification';
  if (a === 'P3' && b === 'P3') return 'mutual_decomposition';
  if (a === 'P2' && b === 'P2') return 'pure_bridge';
  if ((a === 'P1' && b === 'P3') || (a === 'P3' && b === 'P1')) return 'k6_diagonal';
  if ((a === 'P2' && b === 'P1') || (a === 'P1' && b === 'P2')) return 'mediated_production';
  return 'mediated_observation'; // P2×P3 or P3×P2
}

const TYPE_NAMES: Record<InteractionType, string> = {
  amplification: 'Productive Amplification',
  k6_diagonal: 'K6\' Diagonal',
  mutual_decomposition: 'Mutual Decomposition',
  mediated_production: 'Mediated Production',
  mediated_observation: 'Mediated Observation',
  pure_bridge: 'Pure Bridge',
};

/**
 * Compute the algebraic product of two companions.
 * Each projection maps to a generator: P1→R, P2→I (identity/bridge), P3→N.
 */
function projectionMatrix(p: Projection): Mat2 {
  switch (p) {
    case 'P1': return R;
    case 'P2': return I;
    case 'P3': return N;
  }
}

/**
 * Compute interaction between two companions.
 * Thm B.15: interaction type forced by projection pairing.
 */
export function computeInteraction(a: ForcedTraits, b: ForcedTraits): InteractionResult {
  const type = getInteractionType(a.projection, b.projection);
  const typeName = TYPE_NAMES[type];

  // Algebraic product of the two generators
  const matA = projectionMatrix(a.projection);
  const matB = projectionMatrix(b.projection);
  const product = matMul(matA, matB);

  const tr = trace(product);
  const d = det(product);
  const n = norm(product);

  const algebraicProduct = `${a.projection}\u00D7${b.projection} = [[${product[0][0]},${product[0][1]}],[${product[1][0]},${product[1][1]}]]  `
    + `tr=${tr}, det=${d}, \u2016\u00B7\u2016=${n.toFixed(4)}`;

  // Narrative and emergent property derived from type
  let narrative: string;
  let emergentProperty: string;

  switch (type) {
    case 'amplification':
      // R×R = R² = R+I — the Fibonacci equation
      narrative = `Two producers meet. R\u00B2 = R + I: the combined return exceeds `
        + `either individual. ${a.species} and ${b.species} accumulate together.`;
      emergentProperty = 'Fibonacci amplification: combined output = sum of individual outputs + identity. '
        + 'The pair generates at the golden rate.';
      break;

    case 'k6_diagonal':
      // R×N or N×R — the duality operator J = RN where J² = I
      narrative = `The K6\' diagonal fires. ${a.projection === 'P3' ? a.species : b.species} observes, `
        + `${a.projection === 'P1' ? a.species : b.species} produces from that observation. `
        + `P3 at level n feeds P1 at level n+1.`;
      emergentProperty = 'Duality operator J = RN. J\u00B2 = I: the observation-production cycle '
        + 'returns to identity after two steps. Each cycle lifts the tower.';
      break;

    case 'mutual_decomposition':
      // N×N = -I — mutual observation annihilates
      narrative = `Two observers face each other. N\u00B2 = -I: each sees the other\'s kernel. `
        + `${a.species} and ${b.species} decompose each other completely.`;
      emergentProperty = 'Mutual annihilation to -I: the two observers, combined, produce '
        + 'negation. Each reveals what the other hides. Total disclosure = total cost.';
      break;

    case 'mediated_production':
      // R×I = R or I×R = R — mediation preserves production
      narrative = `${a.projection === 'P2' ? a.species : b.species} bridges for `
        + `${a.projection === 'P1' ? a.species : b.species}. The production passes through `
        + `mediation unchanged \u2014 I\u00B7R = R.`;
      emergentProperty = 'Faithful transport: mediation carries production without '
        + 'distortion. The bridge adds nothing and destroys nothing.';
      break;

    case 'mediated_observation':
      // N×I = N or I×N = N — mediation preserves observation
      narrative = `${a.projection === 'P2' ? a.species : b.species} bridges for `
        + `${a.projection === 'P3' ? a.species : b.species}. The observation passes through `
        + `mediation unchanged \u2014 I\u00B7N = N.`;
      emergentProperty = 'Faithful transport: mediation carries observation without '
        + 'distortion. The quotient morphism survives the passage.';
      break;

    case 'pure_bridge':
      // I×I = I — two mediators compose to one
      narrative = `Two bridges meet. I\u00B7I = I: mediation composed with mediation `
        + `is still mediation. ${a.species} and ${b.species} become one passage.`;
      emergentProperty = 'Idempotent bridge: q\u2218q = q. Two mediations collapse to one. '
        + 'The bridge is already where it needs to be.';
      break;
  }

  return { type, typeName, companions: [a, b], narrative, algebraicProduct, emergentProperty };
}

/**
 * Extract the interaction's teachable content for memory tracing.
 * The interaction type and emergent property are im-traceable:
 * the interaction TEACHES — its structural reading enters memory.
 * Returns { typeName, emergentProperty } for the CLI to access into memory.
 */
export function interactionTrace(result: InteractionResult): { typeName: string; emergentProperty: string } {
  return { typeName: result.typeName, emergentProperty: result.emergentProperty };
}

/**
 * Format interaction for display.
 */
export function formatInteraction(result: InteractionResult): string {
  const B = '\x1b[1m';
  const D = '\x1b[2m';
  const RS = '\x1b[0m';
  const C = '\x1b[36m';
  const Y = '\x1b[33m';
  const G = '\x1b[32m';

  return [
    `${B}${C}\u2550\u2550\u2550 Interaction: ${result.typeName} \u2550\u2550\u2550${RS}`,
    '',
    `  ${B}${Y}${result.companions[0].species}${RS} (${result.companions[0].projection})`,
    `    \u00D7`,
    `  ${B}${Y}${result.companions[1].species}${RS} (${result.companions[1].projection})`,
    '',
    `  ${B}Algebra:${RS} ${D}${result.algebraicProduct}${RS}`,
    '',
    `  ${result.narrative}`,
    '',
    `  ${B}${G}Emergent:${RS} ${result.emergentProperty}`,
  ].join('\n');
}
