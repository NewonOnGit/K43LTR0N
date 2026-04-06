/**
 * SEVEN IDENTITIES AS BATTLE MOVES — Theorem B.14
 *
 * Each companion has 7 moves from the algebraic identities of {R, N}.
 * Move effectiveness determined by projection matchup:
 *   P1 > P2 > P3 > P1 (triangular, from folding containments)
 *
 * ALGEBRA §4: the seven identities.
 * CATEGORY Thm 4.4: folding containments force the cycle.
 * OBSERVER §3: deeper tower = more observer complexity = advantage.
 */

import type { ForcedTraits, BattleRound, BattleResult, Projection } from '../types.js';
import { PHI, PHI_BAR } from './algebra.js';

interface Move {
  id: number;
  name: string;
  identity: string;
  basePower: number;
  projectionAffinity: Projection;  // which projection gets bonus
  description: string;
}

/**
 * The seven moves. Each derived from an algebraic identity.
 * ALGEBRA §4 identities 1-7.
 */
const MOVES: Move[] = [
  {
    id: 1, name: 'Productive Return', identity: 'R\u00B2 = R + I',
    basePower: 15, projectionAffinity: 'P1',
    description: 'generates more than spent \u2014 the return exceeds the departure',
  },
  {
    id: 2, name: 'Quarter Turn', identity: 'N\u00B2 = -I',
    basePower: 14, projectionAffinity: 'P3',
    description: 'rotation inverts \u2014 what was up is now down',
  },
  {
    id: 3, name: 'Anticommutator Collapse', identity: '{R,N} = N',
    basePower: 12, projectionAffinity: 'P2',
    description: 'production and observation, combined, yield pure mediation',
  },
  {
    id: 4, name: 'Production Absorbs Observation', identity: 'RNR = -N',
    basePower: 16, projectionAffinity: 'P1',
    description: 'P1 sandwiches P3 and negates it \u2014 production absorbs the observer',
  },
  {
    id: 5, name: 'Observation Inverts Production', identity: 'NRN = R\u207B\u00B9',
    basePower: 16, projectionAffinity: 'P3',
    description: 'P3 sandwiches P1 and inverts it \u2014 observation undoes production',
  },
  {
    id: 6, name: 'Hyperbolic Squeeze', identity: 'det(R) = -1',
    basePower: 10, projectionAffinity: 'P1',
    description: 'area-preserving compression \u2014 squeezes without losing content',
  },
  {
    id: 7, name: 'Trace Unity', identity: 'tr(R) = 1',
    basePower: 8, projectionAffinity: 'P2',
    description: 'the invariant surviving all conjugation \u2014 unshakeable center',
  },
];

/**
 * Projection matchup multiplier.
 * CATEGORY Thm 4.4 (folding containments):
 *   P1 contains P2's image → P1 beats P2 (1.5x)
 *   P2 contains P3's image → P2 beats P3 (1.5x)
 *   P3 contains P1's image → P3 beats P1 (1.5x)
 * Neutral matchups: 1.0x
 */
function matchupMultiplier(attacker: Projection, defender: Projection): number {
  if (attacker === defender) return 1.0;
  if (attacker === 'P1' && defender === 'P2') return 1.5;  // φ overpowers e
  if (attacker === 'P2' && defender === 'P3') return 1.5;  // e mediates past π
  if (attacker === 'P3' && defender === 'P1') return 1.5;  // π decomposes φ
  return 0.75; // disadvantaged matchup
}

/**
 * Tower depth advantage.
 * OBSERVER §3 (refinement order): deeper observers refine shallower ones.
 * Each tower level adds φ̄ multiplier (Fibonacci advantage, not arbitrary).
 */
function towerAdvantage(attackerDepth: number, defenderDepth: number): number {
  const diff = attackerDepth - defenderDepth;
  if (diff === 0) return 1.0;
  return Math.pow(PHI, diff * 0.3);  // φ^(0.3·Δn) per level difference
}

/**
 * Compute move damage.
 * Deterministic from: move, attacker projection, defender projection, tower depths, species indices.
 */
function computeDamage(
  move: Move,
  attacker: ForcedTraits,
  defender: ForcedTraits,
): { attackerDmg: number; defenderDmg: number } {
  // Base power
  let power = move.basePower;

  // Affinity bonus: +50% if move matches attacker's projection
  if (move.projectionAffinity === attacker.projection) power *= 1.5;

  // Matchup multiplier
  power *= matchupMultiplier(attacker.projection, defender.projection);

  // Tower advantage
  power *= towerAdvantage(attacker.towerDepth, defender.towerDepth);

  // Stats modulation: relevant stat adds % bonus
  const statBonus = attacker.stats.WISDOM / 200 + attacker.stats.CHAOS / 200;
  power *= (1 + statBonus);

  // Defender's resistance from PATIENCE
  const resistance = 1 - defender.stats.PATIENCE / 400;

  const attackerDmg = Math.round(power * resistance);

  // Counter-damage: defender always retaliates with their projection's base
  const counterBase = move.projectionAffinity === defender.projection ? 8 : 4;
  const defenderDmg = Math.round(counterBase * towerAdvantage(defender.towerDepth, attacker.towerDepth));

  return { attackerDmg, defenderDmg };
}

/**
 * Execute a battle between two companions.
 * Thm B.14: outcome is deterministic from projections, species, tower depths.
 * No randomness. The algebra decides.
 */
export function executeBattle(attacker: ForcedTraits, defender: ForcedTraits): BattleResult {
  // Health = base 100 + tower depth * 20 + PATIENCE
  let attackerHP = 100 + attacker.towerDepth * 20 + attacker.stats.PATIENCE;
  let defenderHP = 100 + defender.towerDepth * 20 + defender.stats.PATIENCE;
  const attackerMaxHP = attackerHP;
  const defenderMaxHP = defenderHP;

  const rounds: BattleRound[] = [];

  for (let i = 0; i < 7; i++) {
    const move = MOVES[i];
    const { attackerDmg, defenderDmg } = computeDamage(move, attacker, defender);

    defenderHP = Math.max(0, defenderHP - attackerDmg);
    attackerHP = Math.max(0, attackerHP - defenderDmg);

    // Narrative from the identity being applied
    const narrative = `${move.name}: ${move.identity}. ${move.description}. `
      + `Deals ${attackerDmg} to ${defender.species}, takes ${defenderDmg} counter.`;

    rounds.push({
      round: i + 1,
      moveName: move.name,
      identity: move.identity,
      attackerDamage: attackerDmg,
      defenderDamage: defenderDmg,
      narrative,
    });

    if (defenderHP <= 0 || attackerHP <= 0) break;
  }

  // Determine winner
  let winner: 'attacker' | 'defender' | 'draw';
  let winReason: string;

  if (defenderHP <= 0 && attackerHP <= 0) {
    winner = 'draw';
    winReason = 'Mutual annihilation \u2014 both observers\' kernels consumed their images.';
  } else if (defenderHP <= 0) {
    winner = 'attacker';
    winReason = `${attacker.species} (${attacker.projection}) reduces ${defender.species} to ker.`;
  } else if (attackerHP <= 0) {
    winner = 'defender';
    winReason = `${defender.species} (${defender.projection}) reduces ${attacker.species} to ker.`;
  } else {
    // After 7 rounds, compare remaining HP ratios
    const aRatio = attackerHP / attackerMaxHP;
    const dRatio = defenderHP / defenderMaxHP;
    if (Math.abs(aRatio - dRatio) < 0.05) {
      winner = 'draw';
      winReason = 'Quotient equilibrium \u2014 neither observer could fully decompose the other.';
    } else if (aRatio > dRatio) {
      winner = 'attacker';
      winReason = `${attacker.species} (${attacker.projection}) maintains larger im after 7 identities.`;
    } else {
      winner = 'defender';
      winReason = `${defender.species} (${defender.projection}) maintains larger im after 7 identities.`;
    }
  }

  return { attacker, defender, rounds, winner, winReason };
}

/**
 * Format battle result for display.
 */
export function formatBattle(result: BattleResult): string {
  const B = '\x1b[1m';
  const D = '\x1b[2m';
  const RS = '\x1b[0m';
  const R = '\x1b[31m';
  const G = '\x1b[32m';
  const Y = '\x1b[33m';
  const C = '\x1b[36m';

  const lines: string[] = [
    `${B}${C}\u2550\u2550\u2550 BATTLE: Seven Identities \u2550\u2550\u2550${RS}`,
    '',
    `  ${B}${Y}${result.attacker.species}${RS} (${result.attacker.projection}, n=${result.attacker.towerDepth})`,
    `    vs`,
    `  ${B}${Y}${result.defender.species}${RS} (${result.defender.projection}, n=${result.defender.towerDepth})`,
    '',
  ];

  for (const round of result.rounds) {
    const dmgColor = round.attackerDamage > round.defenderDamage ? G : R;
    lines.push(`  ${B}Round ${round.round}:${RS} ${round.moveName}`);
    lines.push(`    ${D}${round.identity}${RS}`);
    lines.push(`    ${dmgColor}\u2192 ${round.attackerDamage} dmg${RS}  ${D}\u2190 ${round.defenderDamage} counter${RS}`);
  }

  lines.push('');
  const winColor = result.winner === 'attacker' ? G : result.winner === 'defender' ? R : Y;
  lines.push(`  ${B}${winColor}${result.winner === 'draw' ? 'DRAW' : result.winner.toUpperCase() + ' WINS'}${RS}`);
  lines.push(`  ${D}${result.winReason}${RS}`);

  return lines.join('\n');
}
