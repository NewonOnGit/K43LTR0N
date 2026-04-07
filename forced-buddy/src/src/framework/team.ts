/**
 * MULTI-COMPANION COORDINATION — Level 8: Semantic
 *
 * Three companions (one per projection) form a working triple.
 * The team's central collapse determines which projection dominates.
 *
 * CROSS_PROJECTION §5: central collapse I²∘TDL∘LoMI = Dist.
 * SEMANTICS §2, SEM-1: three meta-primitives exhaust the vocabulary.
 *   Observer Act (P3), Productive Act (P1), Mediating Act (P2).
 */

import type { ForcedConfig, ForcedTraits, TeamState, TeamMember, Projection } from '../types.js';
import { deriveCompanion } from './derive.js';
import { computeInteraction } from './interaction.js';
import { fnv1a } from '../generation/hash.js';

/**
 * Team formation event — returned by teamFormationEvent() for conversation tracking.
 */
export interface TeamFormationEvent {
  /** True when a team was freshly formed. The CLI can record this as a conversation event. */
  formed: boolean;
  /** ISO timestamp of formation. */
  formedAt: string;
  /** Human-readable summary for conversation event recording. */
  eventSummary: string;
}

/**
 * Form a working triple from three salts (one per projection).
 * If fewer than three profiles exist, missing ones are derived on the fly.
 */
export function formTeam(
  config: ForcedConfig,
  userId: string,
): TeamState {
  const members: TeamMember[] = [];

  for (const proj of ['P1', 'P2', 'P3'] as Projection[]) {
    // Look for an existing profile at this projection
    const profile = Object.values(config.profiles).find(p => p.projection === proj);

    if (profile) {
      members.push({
        projection: proj,
        salt: profile.salt,
        species: profile.traits.species,
        towerDepth: profile.traits.towerDepth,
      });
    } else {
      // Derive on the fly
      const traits = deriveCompanion(proj, userId);
      members.push({
        projection: proj,
        salt: `derived-${proj}`,
        species: traits.species,
        towerDepth: traits.towerDepth,
      });
    }
  }

  const centralCollapse = computeCentralCollapse(members);
  const syndicateHash = fnv1a(members.map(m => m.salt).join(':'));

  return { members, syndicateHash, centralCollapse };
}

/**
 * Generate a formation event from a TeamState for conversation tracking.
 * Call after formTeam() to get an event the CLI can record.
 * Team formation is trackable — the working triple entering existence is a conversation event.
 */
export function teamFormationEvent(team: TeamState): TeamFormationEvent {
  const speciesList = team.members.map(m => `${m.projection}:${m.species}`).join(', ');
  return {
    formed: true,
    formedAt: new Date().toISOString(),
    eventSummary: `Working triple formed (${speciesList}). Central collapse: ${team.centralCollapse}.`,
  };
}

/**
 * Compute the team's central collapse — which projection dominates.
 *
 * Highest tower depth wins. Ties broken by P1 > P2 > P3
 * (from folding containments: P1 contains P2's image, etc.)
 */
export function computeCentralCollapse(members: TeamMember[]): Projection {
  const sorted = [...members].sort((a, b) => {
    if (b.towerDepth !== a.towerDepth) return b.towerDepth - a.towerDepth;
    const order: Record<string, number> = { P1: 0, P2: 1, P3: 2 };
    return order[a.projection] - order[b.projection];
  });
  return sorted[0].projection;
}

/**
 * Compute team personality from three meta-primitives.
 *
 * SEMANTICS §2: Three structural acts:
 *   Observer Act (P3 member) — what the team sees
 *   Productive Act (P1 member) — what the team generates
 *   Mediating Act (P2 member) — how the team transports
 *
 * The central collapse determines which meta-primitive dominates.
 */
export function computeTeamPersonality(members: TeamMember[], centralCollapse: Projection): string {
  const p1 = members.find(m => m.projection === 'P1');
  const p2 = members.find(m => m.projection === 'P2');
  const p3 = members.find(m => m.projection === 'P3');

  const productiveAct = p1 ? `${p1.species} produces (R\u00B2 = R + I at depth ${p1.towerDepth})` : 'production absent';
  const mediatingAct = p2 ? `${p2.species} bridges (exponential transport at depth ${p2.towerDepth})` : 'mediation absent';
  const observerAct = p3 ? `${p3.species} observes (im/ker at depth ${p3.towerDepth})` : 'observation absent';

  const dominantPhrase = centralCollapse === 'P1' ? 'production dominates — the team generates'
    : centralCollapse === 'P2' ? 'mediation dominates — the team transports'
    : 'observation dominates — the team decomposes';

  return `A working triple: ${productiveAct}, ${mediatingAct}, ${observerAct}. Central collapse: ${dominantPhrase}.`;
}

/**
 * Format team for display.
 */
export function formatTeam(team: TeamState, userId: string): string {
  const B = '\x1b[1m';
  const D = '\x1b[2m';
  const RS = '\x1b[0m';
  const G = '\x1b[32m';
  const Y = '\x1b[33m';
  const C = '\x1b[36m';
  const M = '\x1b[35m';

  const personality = computeTeamPersonality(team.members, team.centralCollapse!);

  const lines = [
    `${B}${C}\u2550\u2550\u2550 Working Triple \u2550\u2550\u2550${RS}`,
    '',
  ];

  for (const m of team.members) {
    const projColor = m.projection === 'P1' ? Y : m.projection === 'P2' ? C : M;
    const derived = m.salt.startsWith('derived-') ? ` ${D}(derived)${RS}` : '';
    lines.push(`  ${projColor}${m.projection}${RS} ${B}${m.species}${RS} (n=${m.towerDepth})${derived}`);
  }

  lines.push('');
  lines.push(`  ${B}Central collapse:${RS} ${G}${team.centralCollapse}${RS}`);
  lines.push(`  ${B}Syndicate hash:${RS} ${D}0x${(team.syndicateHash ?? 0).toString(16).padStart(8, '0')}${RS}`);
  lines.push('');
  lines.push(`  ${personality}`);

  return lines.join('\n');
}
