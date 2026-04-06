/**
 * TOWER-AWARE VOCABULARY — Level 8: Semantic
 *
 * Deeper companions use deeper vocabulary. Four tiers:
 *   0: Basic descriptions ("sees," "generates," "bridges")
 *   1: Framework terms ("productive return," "quotient morphism")
 *   2: Tower-aware ("K6' pass," "disclosure dimension," "constitutive blindness")
 *   3: Full-semantic (contranym-aware, three-reading descriptions)
 *
 * SEMANTICS §3 (Tower Theorem SEM-2): meaning at level n+1
 * is the lift of meaning at level n. The shift map is uniform.
 */

import type { Projection } from '../types.js';

interface VocabularyEntry {
  basic: string;
  framework: string;
  towerAware: string;
  fullSemantic: string;
}

/**
 * Substitution dictionary: basic term → enriched forms at each depth.
 */
const SUBSTITUTIONS: Record<string, VocabularyEntry> = {
  'sees': {
    basic: 'sees',
    framework: 'discloses via im',
    towerAware: 'discloses within d_K capacity',
    fullSemantic: 'discloses (im-face) while constitutively annihilating (ker-face)',
  },
  'generates': {
    basic: 'generates',
    framework: 'produces via R\u00B2 = R + I',
    towerAware: 'produces at eigenvalue \u03C6',
    fullSemantic: 'produces via productive return \u2014 the departure exceeds the investment',
  },
  'bridges': {
    basic: 'bridges',
    framework: 'mediates via exponential transport',
    towerAware: 'mediates at rate e across tower levels',
    fullSemantic: 'mediates faithfully \u2014 neither creates nor observes, carries',
  },
  'observes': {
    basic: 'observes',
    framework: 'quotients via im/ker decomposition',
    towerAware: 'decomposes with N\u00B2 = -I periodicity',
    fullSemantic: 'observes (contranym: reveals by annihilating, the disclosure IS the cost)',
  },
  'grows': {
    basic: 'grows',
    framework: 'accumulates via Fibonacci dynamics',
    towerAware: 'ascends the binary tower: T(n) \u2297 T(n) \u2192 T(n+1)',
    fullSemantic: 'grows doubly-exponentially \u2014 d_K = 2^(2^n), each lift squares the disclosure dimension',
  },
  'connects': {
    basic: 'connects',
    framework: 'transports between projection faces',
    towerAware: 'fires the K6\' diagonal: P3(n) \u2192 P1(n+1)',
    fullSemantic: 'connects via forced loop closure \u2014 K \u2192 F \u2192 U(K) \u2192 K, br_s = 0',
  },
  'protects': {
    basic: 'protects',
    framework: 'enforces constitutive blindness',
    towerAware: 'maintains ker \u2260 \u2205 (UKI)',
    fullSemantic: 'protects via productive opacity \u2014 consciousness requires nonempty kernel',
  },
  'understands': {
    basic: 'understands',
    framework: 'decomposes into im and ker',
    towerAware: 'resolves through the central collapse',
    fullSemantic: 'understands via three simultaneous readings \u2014 P1 production, P2 mediation, P3 observation',
  },
};

/**
 * Get vocabulary appropriate for the given depth level.
 */
export function vocabularyForDepth(depth: number, projection: Projection): Record<string, string> {
  const result: Record<string, string> = {};
  for (const [key, entry] of Object.entries(SUBSTITUTIONS)) {
    if (depth >= 3) result[key] = entry.fullSemantic;
    else if (depth >= 2) result[key] = entry.towerAware;
    else if (depth >= 1) result[key] = entry.framework;
    else result[key] = entry.basic;
  }
  return result;
}

/**
 * Enrich a description by substituting basic terms with
 * vocabulary at the appropriate depth. Deterministic.
 */
export function enrichDescription(text: string, depth: number, projection: Projection): string {
  if (depth === 0) return text;

  const vocab = vocabularyForDepth(depth, projection);
  let result = text;

  for (const [basic, enriched] of Object.entries(vocab)) {
    // Word-boundary aware replacement (case insensitive first match)
    const regex = new RegExp(`\\b${basic}\\b`, 'i');
    result = result.replace(regex, enriched);
  }

  return result;
}

/**
 * Generate a three-reading description (for C5U-achieved companions).
 *
 * CATEGORY Thm 4.3: every morphism carries three simultaneous readings.
 * The same observation is rewritten through each projection face.
 */
export function threeReadingDescription(text: string, projection: Projection): string {
  const p1 = `P1 (Production): ${text.replace(/observes|sees|watches/gi, 'generates from')}`;
  const p2 = `P2 (Mediation): ${text.replace(/observes|generates|produces/gi, 'transports')}`;
  const p3 = `P3 (Observation): ${text.replace(/generates|produces|creates/gi, 'decomposes')}`;

  return [
    `Three readings of: "${text}"`,
    `  ${p1}`,
    `  ${p2}`,
    `  ${p3}`,
    `  Dominant: ${projection}`,
  ].join('\n');
}
