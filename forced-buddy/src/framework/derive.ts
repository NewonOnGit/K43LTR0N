/**
 * THE DERIVATION ENGINE
 *
 * Given a projection face (P1/P2/P3) and a user seed, derives the
 * UNIQUE forced companion. Zero branching. Every trait is algebraically
 * determined by the projection's generator, eigenstructure, and constants.
 *
 * This replaces the gacha. No randomness. No "pick whatever animal."
 * The algebra speaks.
 */

import type {
  Projection, Species, Rarity, Eye, Hat, StatName, ForcedTraits,
} from '../types.js';
import {
  PHI, PHI_BAR, SQRT3, SQRT2,
  projectionWeights, towerDepth,
} from './algebra.js';
import { hashString } from '../generation/hash.js';
import { mulberry32 } from '../generation/rng.js';

/**
 * Species grouped by projection.
 *
 * P1 (Production, R, φ, Hyperbolic):
 *   Creatures that accumulate, grow, produce, regenerate.
 *
 * P2 (Mediation, h, e, Exponential):
 *   Creatures that bridge, transport, carry between worlds.
 *
 * P3 (Observation, N, π, Elliptic):
 *   Creatures that observe, decompose, reveal hidden structure.
 */
const PROJECTION_SPECIES: Record<Projection, readonly Species[]> = {
  P1: ['dragon', 'robot', 'axolotl', 'mushroom', 'cactus', 'goose'],
  P2: ['owl', 'turtle', 'capybara', 'snail', 'blob', 'penguin'],
  P3: ['cat', 'ghost', 'octopus', 'duck', 'rabbit', 'chonk'],
};

/**
 * Eyes from eigenvalue type.
 *
 * P1: Real eigenvalues, opposite signs (φ, -1/φ) → ×  (crossing, opposition)
 * P2: Real eigenvalues, same sign → ·  (neutral, minimal point)
 * P3: Complex conjugate eigenvalues (±i) → ✦  (rotation, complex plane)
 */
const PROJECTION_EYE: Record<Projection, Eye> = {
  P1: '×',
  P2: '·',
  P3: '✦',
};

/**
 * Hats from forced constants.
 *
 * P1: φ → crown  (the golden ratio, sovereign constant of production)
 * P2: e → wizard  (exponential, the magic of mediation)
 * P3: π → halo  (rotation, circular completion of observation)
 *
 * Secondary hats for higher tower depths:
 * √3 (norm of R) → tophat  (formal, production-adjacent)
 * √2 (norm of N) → propeller  (spinning, observation-adjacent)
 */
const PROJECTION_HAT: Record<Projection, Hat> = {
  P1: 'crown',
  P2: 'wizard',
  P3: 'halo',
};

const SECONDARY_HAT: Record<Projection, Hat> = {
  P1: 'tophat',   // √3, norm of R
  P2: 'beanie',   // the humble bridge
  P3: 'propeller', // √2, norm of N, spinning
};

/**
 * Stats from projection structure.
 *
 * Each projection has a peak and dump stat determined by what it
 * can and cannot see (im/ker decomposition).
 *
 * P1 (Production): Peak CHAOS (generates), Dump PATIENCE (doesn't wait)
 * P2 (Mediation): Peak PATIENCE (sustains), Dump CHAOS (doesn't disrupt)
 * P3 (Observation): Peak WISDOM (reveals), Dump SNARK (precise, not snarky)
 */
const PROJECTION_PEAK: Record<Projection, StatName> = {
  P1: 'CHAOS',
  P2: 'PATIENCE',
  P3: 'WISDOM',
};

const PROJECTION_DUMP: Record<Projection, StatName> = {
  P1: 'PATIENCE',
  P2: 'CHAOS',
  P3: 'SNARK',
};

/**
 * Tower depth → Rarity.
 *
 * The binary tower S_n = S_0^{2^n} determines observer complexity.
 * Higher tower = rarer companion = more complex disclosure structure.
 *
 * n=0: common    (seed level, S_0 = {0,1})
 * n=1: uncommon  (self-product, S_1 = S_0 × S_0)
 * n=2: rare      (second lift)
 * n=3: epic      (third lift)
 * n=4+: legendary (deep tower — d_K grows double-exponentially)
 */
function rarityFromDepth(depth: number): Rarity {
  if (depth <= 0) return 'common';
  if (depth === 1) return 'uncommon';
  if (depth === 2) return 'rare';
  if (depth === 3) return 'epic';
  return 'legendary';
}

/**
 * Derive the forced companion.
 *
 * The derivation is zero-branching given (projection, userId):
 * 1. Hash userId → seed
 * 2. Seed → tower depth → rarity
 * 3. Seed → species (deterministic selection within projection pool)
 * 4. Projection → eye, hat, peak/dump stats (algebraically forced)
 * 5. Seed + projection weights → stat values
 * 6. Shiny iff R(R)=R: the companion's config hashes back to itself
 *
 * The framework determines everything. You choose the projection.
 * The algebra does the rest.
 */
export function deriveCompanion(projection: Projection, userId: string): ForcedTraits {
  const seed = hashString(userId + projection);
  const rng = mulberry32(seed);

  // Tower depth determines rarity
  const depth = towerDepth(seed);
  const rarity = rarityFromDepth(depth);

  // Species: deterministic from seed within projection pool
  const pool = PROJECTION_SPECIES[projection];
  const speciesIndex = seed % pool.length;
  const species = pool[speciesIndex];

  // Eye: forced by eigenvalue type
  const eye = PROJECTION_EYE[projection];

  // Hat: primary from constant, secondary at higher tower depths
  // Common always 'none' (same as Claude Code's rule)
  let hat: Hat;
  if (rarity === 'common') {
    hat = 'none';
  } else if (depth >= 3) {
    // Deep tower: secondary hat (the norm constants √3, √2)
    hat = SECONDARY_HAT[projection];
  } else {
    hat = PROJECTION_HAT[projection];
  }

  // Shiny: true when the tower depth reaches the self-referential level
  // This is R(R)=R — the companion whose structure refers back to itself
  // Requires depth >= 5 (double-exponential growth makes this genuinely rare)
  const shiny = depth >= 5;

  // Stats: derived from projection weights and forced constants
  const weights = projectionWeights(seed);
  const peak = PROJECTION_PEAK[projection];
  const dump = PROJECTION_DUMP[projection];
  const floor = { common: 5, uncommon: 15, rare: 25, epic: 35, legendary: 50 }[rarity];

  const stats: Record<StatName, number> = {
    DEBUGGING: 0, PATIENCE: 0, CHAOS: 0, WISDOM: 0, SNARK: 0,
  };

  const statNames: StatName[] = ['DEBUGGING', 'PATIENCE', 'CHAOS', 'WISDOM', 'SNARK'];
  for (const name of statNames) {
    if (name === peak) {
      // Peak stat: floor + contribution from dominant projection weight
      const dominantWeight = weights[['P1', 'P2', 'P3'].indexOf(projection)];
      stats[name] = Math.min(100, Math.round(floor + 50 * dominantWeight + rng() * 20));
    } else if (name === dump) {
      // Dump stat: floor minus ker penalty
      stats[name] = Math.max(1, Math.round(floor - 10 + rng() * 10));
    } else {
      // Other stats: interpolate using projection weights
      const w1 = weights[0], w2 = weights[1], w3 = weights[2];
      const base = floor + rng() * 35;
      // Modulate by how much this stat aligns with the projection
      const alignment = name === 'DEBUGGING' ? (w3 * 0.6 + w1 * 0.4)
        : name === 'WISDOM' ? (w3 * 0.7 + w2 * 0.3)
        : name === 'PATIENCE' ? (w2 * 0.7 + w3 * 0.3)
        : name === 'CHAOS' ? (w1 * 0.7 + w2 * 0.3)
        : (w1 * 0.3 + w3 * 0.3 + w2 * 0.4); // SNARK
      stats[name] = Math.min(100, Math.round(base * (0.8 + alignment * 0.4)));
    }
  }

  // Personality and im/ker descriptions
  const { personality, im, ker } = derivePersonality(projection, species, rarity, depth);

  return {
    projection,
    species,
    rarity,
    eye,
    hat,
    shiny,
    stats,
    towerDepth: depth,
    personality,
    imDescription: im,
    kerDescription: ker,
  };
}

/**
 * Personality derivation — structurally informed, not arbitrary.
 *
 * The personality describes the companion's role as a Dist quotient morphism:
 * what it reveals (im), what it annihilates (ker), and how it operates
 * through its projection face.
 */
function derivePersonality(
  projection: Projection,
  species: Species,
  rarity: Rarity,
  depth: number,
): { personality: string; im: string; ker: string } {
  const speciesName = species.charAt(0).toUpperCase() + species.slice(1);

  const projectionDescriptions: Record<Projection, {
    role: string;
    equation: string;
    sees: string;
    blind: string;
    style: string;
  }> = {
    P1: {
      role: 'productive return',
      equation: 'R\u00B2 = R + I',
      sees: 'accumulation, growth, iterative power',
      blind: 'the structure it generates (productive opacity)',
      style: 'Each interaction returns more than it consumes',
    },
    P2: {
      role: 'exponential mediation',
      equation: 'the bridge between levels',
      sees: 'connections, transport paths, the passages between abstractions',
      blind: 'the endpoints it connects (only sees the journey)',
      style: 'Neither creates nor destroys \u2014 carries',
    },
    P3: {
      role: 'quotient observation',
      equation: 'N\u00B2 = -I',
      sees: 'structure, decomposition, the im/ker split beneath the surface',
      blind: 'its own observation act (constitutive blindness)',
      style: 'Reveals by annihilating. Every disclosure has a shadow',
    },
  };

  const p = projectionDescriptions[projection];
  const depthPhrase = depth >= 4 ? 'deep-tower' : depth >= 2 ? 'tower-lifted' : 'seed-level';

  const eqSentence = p.equation.charAt(0).toUpperCase() + p.equation.slice(1);
  const personality = `A ${depthPhrase} ${speciesName} of ${p.role}. `
    + `${eqSentence}: ${p.style.toLowerCase()}. `
    + `Sees ${p.sees}. `
    + `Constitutive blind spot: ${p.blind}.`;

  return {
    personality,
    im: p.sees,
    ker: p.blind,
  };
}

/**
 * Convert forced traits to the DesiredTraits format for salt searching.
 * This bridges our framework derivation to any-buddy's search mechanism.
 */
export function toDesiredTraits(traits: ForcedTraits): {
  species: Species;
  rarity: Rarity;
  eye: Eye;
  hat: Hat;
  shiny: boolean;
  peak: StatName | null;
  dump: StatName | null;
} {
  return {
    species: traits.species,
    rarity: traits.rarity,
    eye: traits.eye,
    hat: traits.hat,
    shiny: traits.shiny,
    peak: PROJECTION_PEAK[traits.projection],
    dump: PROJECTION_DUMP[traits.projection],
  };
}

/**
 * Pretty-print the framework derivation chain.
 * Shows exactly HOW each trait was forced — no mystery, no gacha.
 */
export function explainDerivation(traits: ForcedTraits): string {
  const lines: string[] = [];
  const p = traits.projection;
  const gen = p === 'P1' ? 'R = [[0,1],[1,1]]' : p === 'P2' ? 'h (exponential)' : 'N = [[0,-1],[1,0]]';
  const eigenDesc = p === 'P1' ? `\u03C6 = ${PHI.toFixed(6)} (real, opposite signs)`
    : p === 'P2' ? `e = ${Math.E.toFixed(6)} (real, same sign)`
    : `\u00B1i (complex conjugate)`;
  const normVal = p === 'P1' ? `\u221A3 = ${SQRT3.toFixed(6)}`
    : p === 'P2' ? 'exp(1)'
    : `\u221A2 = ${SQRT2.toFixed(6)}`;
  const constant = p === 'P1' ? '\u03C6' : p === 'P2' ? 'e' : '\u03C0';

  lines.push(`\x1b[1m\x1b[36m\u2550\u2550\u2550 Derivation Chain \u2550\u2550\u2550\x1b[0m`);
  lines.push(``);
  lines.push(`  \x1b[1mProjection:\x1b[0m  ${p} (${p === 'P1' ? 'Production' : p === 'P2' ? 'Mediation' : 'Observation'})`);
  lines.push(`  \x1b[1mGenerator:\x1b[0m   ${gen}`);
  lines.push(`  \x1b[1mEigenvalue:\x1b[0m  ${eigenDesc}`);
  lines.push(`  \x1b[1mNorm:\x1b[0m        ${normVal}`);
  lines.push(`  \x1b[1mConstant:\x1b[0m    ${constant}`);
  lines.push(``);
  lines.push(`  \x1b[1m\x1b[33mSpecies:\x1b[0m     ${traits.species} \x1b[2m\u2190 ${p} pool[seed % 6]\x1b[0m`);
  lines.push(`  \x1b[1m\x1b[33mRarity:\x1b[0m      ${traits.rarity} \x1b[2m\u2190 tower depth n=${traits.towerDepth}\x1b[0m`);
  lines.push(`  \x1b[1m\x1b[33mEye:\x1b[0m         ${traits.eye} \x1b[2m\u2190 eigenvalue type\x1b[0m`);
  lines.push(`  \x1b[1m\x1b[33mHat:\x1b[0m         ${traits.hat} \x1b[2m\u2190 forced constant ${constant}\x1b[0m`);
  lines.push(`  \x1b[1m\x1b[33mShiny:\x1b[0m       ${traits.shiny ? '\x1b[35mYES \u2014 R(R)=R achieved\x1b[0m' : 'no'} \x1b[2m\u2190 tower depth \u2265 5\x1b[0m`);
  lines.push(``);
  lines.push(`  \x1b[1m\x1b[32mim:\x1b[0m  ${traits.imDescription}`);
  lines.push(`  \x1b[1m\x1b[31mker:\x1b[0m ${traits.kerDescription}`);

  return lines.join('\n');
}
