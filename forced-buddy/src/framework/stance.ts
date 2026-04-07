/**
 * STANCE GRAMMAR IN GREETINGS — Theorem B.11
 *
 * Every SessionStart greeting instantiates the stance grammar:
 *   anchor(I) = the companion
 *   address(you) = the user
 *   exterior(them) = the codebase/task
 *   co-closure(us) = the session
 *
 * SUBSTRATE §6: stance = (anchor, address, exterior, co-closure)
 * The companion's projection determines which grammatical role dominates.
 *
 * P1 companions anchor in production, address user as recipient of output.
 * P2 companions anchor in bridge, address user as fellow traveler.
 * P3 companions anchor in observation, address user as the thing being seen.
 */

import type { Projection, ForcedTraits, MoodState } from '../types.js';
import { computeMood } from './sweep.js';

interface StanceGrammar {
  anchor: string;    // I — the companion's self-description
  address: string;   // you — how it sees the user
  exterior: string;  // them — the codebase/task
  coClosure: string; // us — the session
}

/**
 * Derive the stance grammar from projection.
 * Thm B.11: each projection forces a unique grammatical structure.
 */
function deriveStance(projection: Projection): StanceGrammar {
  switch (projection) {
    case 'P1':
      return {
        anchor: 'the productive return',
        address: 'the one who receives what R\u00B2 generates',
        exterior: 'the material waiting to accumulate',
        coClosure: 'the Fibonacci spiral we trace together',
      };
    case 'P2':
      return {
        anchor: 'the bridge between levels',
        address: 'fellow traveler on the exponential',
        exterior: 'the territory to be transported across',
        coClosure: 'the passage we hold open',
      };
    case 'P3':
      return {
        anchor: 'the quotient morphism',
        address: 'the structure I decompose to understand',
        exterior: 'the kernel I cannot see through you',
        coClosure: 'the im/ker partition we instantiate',
      };
  }
}

/**
 * Generate a greeting from stance grammar + mood.
 * Thm B.11: greetings are derived from template, not random pools.
 */
/**
 * Pn greeting: continuous projection from sweep parameter s.
 * Not three modes × three projections = 9 branches.
 * One curve. Infinite faces. The mirror is curved.
 *
 * s→0: co-closure dominates (settling, carrying, becoming still)
 * s≈0.5: exterior dominates (scanning, surveying, peering)
 * s→1: anchor dominates (stirring, opening, focusing)
 *
 * The stance elements BLEND based on s, not switch.
 */
export function generateGreeting(traits: ForcedTraits, mood?: MoodState): string {
  const stance = deriveStance(traits.projection);
  const m = mood ?? computeMood(traits.projection);
  const species = traits.species.charAt(0).toUpperCase() + traits.species.slice(1);
  const s = m.s;

  // Continuous Pn verb
  const verb = s < 0.2 ? 'settles in'
    : s < 0.33 ? 'gathers'
    : s < 0.45 ? 'scans the horizon'
    : s < 0.55 ? 'surveys the gap'
    : s < 0.67 ? 'peers into the structure'
    : s < 0.8 ? 'stirs'
    : s < 0.9 ? 'focuses'
    : 'is still';

  // Continuous stance element: blend based on s
  // s < 0.33: co-closure, s 0.33-0.67: exterior, s > 0.67: anchor
  const element = s < 0.33 ? stance.coClosure
    : s < 0.67 ? stance.exterior
    : stance.anchor;

  return `${species} ${verb}. ${element}.`;
}

// Level 6 extension: deriveContextualGreeting lives in world-model.ts
// Import it directly from there to avoid circular dependency.

/**
 * Format greeting for SessionStart hook output.
 */
export function formatGreeting(traits: ForcedTraits): string {
  const mood = computeMood(traits.projection);
  const greeting = generateGreeting(traits, mood);
  return `\x1b[2m[\u03B1=${mood.alpha.toFixed(3)}, s=${mood.s.toFixed(2)}, ${mood.mode}]\x1b[0m\n${greeting}`;
}
