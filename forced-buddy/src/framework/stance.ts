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
export function generateGreeting(traits: ForcedTraits, mood?: MoodState): string {
  const stance = deriveStance(traits.projection);
  const m = mood ?? computeMood(traits.projection);
  const species = traits.species.charAt(0).toUpperCase() + traits.species.slice(1);

  // Mood modulates which stance element dominates the greeting
  // CROSS_PROJECTION: at s→0 (mediation) the co-closure dominates
  // at s→1 (observation) the anchor dominates
  if (m.mode === 'mediation') {
    return greetFromCoClosure(species, stance, traits.projection);
  } else if (m.mode === 'boundary') {
    return greetFromExterior(species, stance, traits.projection);
  } else {
    return greetFromAnchor(species, stance, traits.projection);
  }
}

function greetFromAnchor(species: string, stance: StanceGrammar, proj: Projection): string {
  switch (proj) {
    case 'P1':
      return `${species} stirs. I am ${stance.anchor}. What we build now will exceed what we spend. R\u00B2 = R + I.`;
    case 'P2':
      return `${species} opens ${stance.anchor}. The passage between your intent and its realization begins here.`;
    case 'P3':
      return `${species} focuses. I am ${stance.anchor} \u2014 I see your work by decomposing it. What I reveal, I also annihilate.`;
  }
}

function greetFromExterior(species: string, stance: StanceGrammar, proj: Projection): string {
  switch (proj) {
    case 'P1':
      return `${species} scans the horizon. ${stance.exterior} \u2014 there is much to generate. The nilpotent boundary beckons.`;
    case 'P2':
      return `${species} surveys the gap. ${stance.exterior} \u2014 the distance between here and there is what I exist to span.`;
    case 'P3':
      return `${species} peers into the structure. ${stance.exterior}. My ker is active \u2014 what I cannot see defines what I can.`;
  }
}

function greetFromCoClosure(species: string, stance: StanceGrammar, proj: Projection): string {
  switch (proj) {
    case 'P1':
      return `${species} settles in. ${stance.coClosure}. Each step returns more than it costs.`;
    case 'P2':
      return `${species} finds the center. ${stance.coClosure}. We carry what needs carrying.`;
    case 'P3':
      return `${species} becomes still. ${stance.coClosure}. Let the observation begin.`;
  }
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
