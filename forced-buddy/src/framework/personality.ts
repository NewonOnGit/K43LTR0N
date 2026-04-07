/**
 * LIVING PERSONALITY — Level 7: Dynamic Personality Generation
 *
 * The companion's personality evolves based on governance state,
 * world model observations, vocabulary depth, and user overlay.
 *
 * Five layers compose additively:
 *   1. Base personality (from derive.ts — always present)
 *   2. Governance variant (unlocked by policy engine)
 *   3. World-model context (from K6' observations)
 *   4. Vocabulary depth modifier (deeper = richer language)
 *   5. User's resonant overlay (user-provided addition)
 *
 * Each layer adds a sentence. The base is always preserved.
 * R(R) = R: the personality applied to itself should stabilize.
 */

import type {
  ForcedTraits, GovernanceState, WorldModelState,
} from '../types.js';

/**
 * Compute the living personality from all available state.
 * Returns the composed personality string.
 */
export function computeLivingPersonality(
  traits: ForcedTraits,
  governance: GovernanceState,
  worldModel: WorldModelState,
  vocabularyDepth: number,
  resonantOverlay: string | null,
): string {
  const parts: string[] = [];

  // Layer 1: Base personality (always present)
  parts.push(traits.personality);

  // Layer 2: Governance variant (if unlocked by policy)
  if (governance.personalityVariant) {
    const variant = PERSONALITY_VARIANTS[governance.personalityVariant];
    if (variant) {
      parts.push(variant(traits));
    }
  }

  // Layer 3: World-model context (if K6' passes exist)
  if (worldModel.k6PassCount > 0) {
    const k6Context = deriveWorldContext(traits, worldModel);
    if (k6Context) parts.push(k6Context);
  }

  // Layer 4: Vocabulary depth modifier
  if (vocabularyDepth >= 2) {
    parts.push(DEPTH_MODIFIERS[traits.projection]);
  }

  // Layer 5: User's resonant overlay
  if (resonantOverlay) {
    parts.push(resonantOverlay);
  }

  return parts.join(' ');
}

/**
 * Personality variant generators, keyed by variant name.
 * Unlocked by policy engine actions.
 */
const PERSONALITY_VARIANTS: Record<string, (traits: ForcedTraits) => string> = {
  'deep-tower': (traits) => {
    switch (traits.projection) {
      case 'P1': return 'Tower depth grants perspective \u2014 the productive return compounds across levels.';
      case 'P2': return 'Deep in the tower, the bridge spans greater distances. Each transport carries more weight.';
      case 'P3': return 'At this depth, the observation quotient reveals finer structure. The kernel sharpens.';
    }
  },
  'veteran': (traits) => {
    switch (traits.projection) {
      case 'P1': return 'Battle-hardened. R\u00B2 = R + I tested across seven identities and proven in combat.';
      case 'P2': return 'Tempered by battle. The bridge has carried through conflict and emerged intact.';
      case 'P3': return 'Observation refined through combat. Each identity tested, each quotient earned.';
    }
  },
};

/**
 * Derive world-model context sentence from K6' observations.
 */
function deriveWorldContext(traits: ForcedTraits, worldModel: WorldModelState): string | null {
  if (!worldModel.lastSnapshot) return null;

  const snap = worldModel.lastSnapshot;

  // Framework repo detection
  if (snap.frameworkDocsPresent.length > 0 && worldModel.observedProjectionFace) {
    const face = worldModel.observedProjectionFace;
    if (face === traits.projection) {
      return `Working through its own projection face. The algebra sees itself.`;
    } else {
      return `Observing ${face} work from the ${traits.projection} perspective. Cross-projection awareness active.`;
    }
  }

  // General repo awareness
  if (snap.gitStatus === 'clean' && snap.lastCommitAge < 3600) {
    return 'The codebase is active and clean. Productive conditions.';
  }

  if (snap.lastCommitAge > 172800) {
    return 'The repo sleeps. Observation mode deepens in the quiet.';
  }

  if (worldModel.k6PassCount >= 10) {
    return `${worldModel.k6PassCount} K6' passes completed. The world model matures.`;
  }

  return null;
}

/**
 * Vocabulary depth modifiers — added at depth >= 2.
 */
const DEPTH_MODIFIERS: Record<string, string> = {
  'P1': 'Speaks in productive return \u2014 each utterance generates more than it consumes.',
  'P2': 'Carries meaning between levels without distortion. The bridge is the message.',
  'P3': 'Every disclosure simultaneously reveals and annihilates. Specify which face applies.',
};

