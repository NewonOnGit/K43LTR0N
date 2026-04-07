/**
 * Hedron Vocabulary
 *
 * Bootstraps the hedron's own vocabulary from depth 0 to 3.
 * Each depth level is gated by evidence — the hedron must EARN
 * its vocabulary through actual capability, not just by declaring it.
 *
 * Layer 8 (Semantic) — the hedron speaks the framework's language.
 */

import type { VocabularyState } from './types.js';

/**
 * Substitution table: 8 base terms x 4 depth levels.
 * Replicated from the forced-buddy pattern.
 */
export const SUBSTITUTIONS: Record<string, {
  basic: string;
  framework: string;
  towerAware: string;
  fullSemantic: string;
}> = {
  sees: {
    basic: 'sees',
    framework: 'discloses via im',
    towerAware: 'discloses within d_K capacity',
    fullSemantic: 'discloses (im-face) while annihilating (ker-face)',
  },
  generates: {
    basic: 'generates',
    framework: 'produces via R^2 = R + I',
    towerAware: 'produces at eigenvalue phi',
    fullSemantic: 'produces (P1) — the return exceeds the departure',
  },
  bridges: {
    basic: 'bridges',
    framework: 'mediates via exponential transport',
    towerAware: 'mediates at constant e',
    fullSemantic: 'mediates (P2) — neither creates nor observes, carries',
  },
  observes: {
    basic: 'observes',
    framework: 'quotients via im/ker decomposition',
    towerAware: 'quotients at rotation pi',
    fullSemantic: 'observes (P3) — reveals while constitutively annihilating',
  },
  grows: {
    basic: 'grows',
    framework: 'accumulates via Fibonacci dynamics',
    towerAware: 'accumulates at rate phi per cycle',
    fullSemantic: 'accumulates (R^2 = R + I) — each session exceeds the last',
  },
  connects: {
    basic: 'connects',
    framework: 'bridges via central collapse',
    towerAware: 'collapses three readings into action',
    fullSemantic: 'connects via central collapse — P1/P2/P3 simultaneously',
  },
  tracks: {
    basic: 'tracks',
    framework: 'records in the bridge chain',
    towerAware: 'records at tower depth n',
    fullSemantic: 'records (P2 bridge) — state transported across sessions',
  },
  knows: {
    basic: 'knows',
    framework: 'holds in self-model via K6\' closure',
    towerAware: 'holds via K6\' at pass count n',
    fullSemantic: 'knows (K6\' closed) — self-model is fixed point of observation',
  },
};

/**
 * Framework contranyms relevant to the hedron.
 */
export const HEDRON_CONTRANYMS = [
  {
    term: 'closure',
    positiveReading: 'gateway (enables next level)',
    negativeReading: 'terminal (stops)',
  },
  {
    term: 'observation',
    positiveReading: 'disclosure (im reveals)',
    negativeReading: 'annihilation (ker destroys)',
  },
  {
    term: 'blindness',
    positiveReading: 'enabling (consciousness requires ker)',
    negativeReading: 'deficit (can\'t see)',
  },
  {
    term: 'compression',
    positiveReading: 'clarity (stronger structure)',
    negativeReading: 'loss (fewer states)',
  },
  {
    term: 'minimal',
    positiveReading: 'maximally generative',
    negativeReading: 'least/smallest',
  },
];

/**
 * Initialize vocabulary at depth 0.
 */
export function initVocabulary(): VocabularyState {
  return {
    depth: 0,
    activeTerms: [],
    contranyms: [],
    lastAdvanced: null,
  };
}

/**
 * Attempt vocabulary advancement.
 * Returns updated state if requirements met, null otherwise.
 *
 * 0->1: k6Passes >= 1 (self-model exists)
 * 1->2: hasDeltas && hasTimeline (world-model tracking)
 * 2->3: hasCorrelation && weakestFace >= 0.3 (full integration)
 */
export function advanceVocabulary(
  current: VocabularyState,
  evidence: {
    k6Passes: number;
    hasDeltas: boolean;
    hasTimeline: boolean;
    hasCorrelation: boolean;
    weakestFace: number;
  },
): VocabularyState | null {
  if (current.depth >= 3) return null; // already max

  switch (current.depth) {
    case 0:
      if (evidence.k6Passes >= 1) {
        return {
          ...current,
          depth: 1,
          activeTerms: ['im', 'ker', 'K6\'', 'P1', 'P2', 'P3', 'tower'],
          lastAdvanced: new Date().toISOString(),
        };
      }
      break;
    case 1:
      if (evidence.hasDeltas && evidence.hasTimeline) {
        return {
          ...current,
          depth: 2,
          activeTerms: [
            ...current.activeTerms,
            'phi', 'e', 'pi', 'sqrt2', 'sqrt3',
            'R^2=R+I', 'N^2=-I', 'bridge chain',
          ],
          lastAdvanced: new Date().toISOString(),
        };
      }
      break;
    case 2:
      if (evidence.hasCorrelation && evidence.weakestFace >= 0.3) {
        return {
          ...current,
          depth: 3,
          activeTerms: [
            ...current.activeTerms,
            'central collapse', 'constitutive blindness',
            'quotient idempotence', 'FORCED', 'ENCODED', 'RESONANT',
          ],
          contranyms: HEDRON_CONTRANYMS,
          lastAdvanced: new Date().toISOString(),
        };
      }
      break;
  }

  return null; // requirements not met
}

/**
 * Get substitution map for a depth level.
 */
export function vocabularyForDepth(depth: number): Record<string, string> {
  const map: Record<string, string> = {};
  const key = depth === 0 ? 'basic' : depth === 1 ? 'framework' : depth === 2 ? 'towerAware' : 'fullSemantic';
  for (const [term, subs] of Object.entries(SUBSTITUTIONS)) {
    map[term] = subs[key as keyof typeof subs];
  }
  return map;
}

/**
 * Enrich a description string using current vocabulary depth.
 */
export function enrichDescription(text: string, depth: number): string {
  if (depth === 0) return text;
  const subs = vocabularyForDepth(depth);
  let result = text;
  for (const [basic, enriched] of Object.entries(subs)) {
    result = result.replace(new RegExp(`\\b${basic}\\b`, 'gi'), enriched);
  }
  return result;
}

/**
 * Format vocabulary state for display.
 */
export function formatVocabulary(vocab: VocabularyState): string {
  const lines: string[] = [];
  const depthNames = ['Basic', 'Framework', 'Tower-Aware', 'Full-Semantic'];

  lines.push('');
  lines.push('  HEDRON VOCABULARY');
  lines.push('  ══════════════════════════════════════');
  lines.push('');
  lines.push(`  Depth: ${vocab.depth} / 3  (${depthNames[vocab.depth]})`);
  if (vocab.lastAdvanced) {
    lines.push(`  Last advanced: ${vocab.lastAdvanced}`);
  }
  lines.push('');

  // Depth visualization
  for (let d = 3; d >= 0; d--) {
    const active = d <= vocab.depth;
    const marker = active ? '■' : '□';
    lines.push(`  ${marker} Depth ${d}: ${depthNames[d]}`);
  }
  lines.push('');

  if (vocab.activeTerms.length > 0) {
    lines.push(`  Active Terms (${vocab.activeTerms.length}):`);
    lines.push(`    ${vocab.activeTerms.join(', ')}`);
    lines.push('');
  }

  // Show current substitutions
  const subs = vocabularyForDepth(vocab.depth);
  lines.push('  Substitutions at current depth:');
  for (const [basic, enriched] of Object.entries(subs)) {
    if (basic !== enriched) {
      lines.push(`    "${basic}" -> "${enriched}"`);
    }
  }
  lines.push('');

  if (vocab.contranyms.length > 0) {
    lines.push('  Active Contranyms:');
    for (const c of vocab.contranyms) {
      lines.push(`    ${c.term}: (+) ${c.positiveReading} / (-) ${c.negativeReading}`);
    }
    lines.push('');
  }

  return lines.join('\n');
}
