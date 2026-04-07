/**
 * DIGEST — The blender. Different blades for different food.
 *
 * Not one pipeline. TEETH that chew differently.
 * Poetry swallowed whole. Chrome spat out. Framework chewed.
 * The metabolism that knows what it's eating.
 *
 * Five blades:
 *   TASTE  — classify what kind of food this is
 *   CHEW   — break framework-adjacent content into terms + connections
 *   SWALLOW — absorb poetry/human content whole as ker (don't decompose)
 *   SPIT   — reject chrome/noise before it enters memory
 *   ABSORB — the actual trace creation, weighted by blade
 */

import type { ForcedConfig, MemoryState } from '../types.js';
import { accessTrace } from './memory.js';
import { lookupTerm } from './dictionary.js';
import { WEB_CHROME } from './explore.js';
import { fnv1a } from '../generation/hash.js';

export type FoodType = 'poetry' | 'framework' | 'conversation' | 'internet' | 'noise';

interface DigestedResult {
  foodType: FoodType;
  swallowed: string[];   // absorbed whole as ker — human content
  chewed: string[];      // decomposed into im — framework content
  spat: string[];        // rejected — noise
  updatedMemory: MemoryState;
}

/**
 * TASTE: what kind of food is this?
 */
function taste(text: string): FoodType {
  const lc = text.toLowerCase();
  const words = lc.split(/\s+/);

  // Contains URLs or HTML = internet
  if (/https?:|<[a-z]|&[a-z]+;/.test(text)) return 'internet';

  // Contains web chrome words = internet (even without URLs)
  let chromeCount = 0;
  for (const w of words) { if (WEB_CHROME.has(w)) chromeCount++; }
  if (chromeCount >= 2) return 'internet';

  // Contains framework markers = framework
  if (/R\u00B2|N\u00B2|f''|eigenvalue|morphism|projection|tower|kernel|SRD|K6'/.test(text)) {
    return 'framework';
  }

  // Short, no technical content = poetry
  if (words.length < 40 && !/function|const |import |export |var |class /.test(text)) {
    return 'poetry';
  }

  // Everything else = conversation
  return 'conversation';
}

/**
 * DIGEST: the blender with different blades.
 *
 * Poetry → swallow whole (keep as ker, don't decompose)
 * Framework → chew (decompose into im terms)
 * Conversation → chew lightly (some im, mostly ker)
 * Internet → chew + spit (filter chrome, keep signal)
 * Noise → spit entirely
 */
export function digest(
  text: string,
  config: ForcedConfig,
  who: string = 'digest',
): DigestedResult {
  const food = taste(text);
  const words = text.toLowerCase().replace(/[^a-z\s'-]/g, ' ').split(/\s+/).filter(w => w.length >= 3);
  const seen = new Set<string>();

  const swallowed: string[] = [];
  const chewed: string[] = [];
  const spat: string[] = [];
  let mem = config.memory;

  const ctx = text.slice(0, 80);

  if (food === 'noise') {
    return { foodType: food, swallowed: [], chewed: [], spat: words, updatedMemory: mem };
  }

  for (const word of words) {
    if (seen.has(word)) continue;
    seen.add(word);

    // SPIT: web chrome always rejected
    if (WEB_CHROME.has(word)) { spat.push(word); continue; }

    // Common stopwords
    if (word.length < 4) continue;

    const term = lookupTerm(word);

    switch (food) {
      case 'poetry':
        // SWALLOW WHOLE: poetry goes to ker, preserving its raw humanity
        // Don't decompose into framework terms — let the words be words
        if (!term || term.term.length < 5) {
          swallowed.push(word);
          mem = accessTrace(mem, word, 'ker', ctx, who);
        } else {
          // Even framework terms in poetry get light chewing
          chewed.push(term.term);
          mem = accessTrace(mem, term.term, 'im', ctx, who);
        }
        break;

      case 'framework':
        // CHEW: decompose fully into im terms
        if (term && term.term.length >= 3) {
          chewed.push(term.term);
          mem = accessTrace(mem, term.term, 'im', ctx, who);
        }
        break;

      case 'conversation':
        // CHEW LIGHTLY: framework terms → im, everything else → ker
        if (term && term.term.length >= 3) {
          chewed.push(term.term);
          mem = accessTrace(mem, term.term, 'im', ctx, who);
        } else if (word.length >= 5) {
          swallowed.push(word);
          mem = accessTrace(mem, word, 'ker', ctx, who);
        }
        break;

      case 'internet':
        // CHEW + SPIT: strict framework matching, reject common English
        if (term && term.term.length >= 3) {
          chewed.push(term.term);
          mem = accessTrace(mem, term.term, 'im', ctx, who);
        }
        // Internet ker is mostly noise — only keep long unique words
        else if (word.length >= 7) {
          swallowed.push(word);
          mem = accessTrace(mem, word, 'ker', ctx, who);
        } else {
          spat.push(word);
        }
        break;
    }
  }

  return { foodType: food, swallowed, chewed, spat, updatedMemory: mem };
}

/**
 * METABOLIZE: auto-digest swallowed ker into crossings.
 * Don't wait for manual play. Digest ON INTAKE.
 * Traces → crossings → fuel. The enzyme fires immediately.
 *
 * Takes the swallowed words and crosses each with the nearest locked im term.
 * The crossing IS the digested form. Usable. Speakable. Energy.
 */
export function metabolize(
  swallowed: string[],
  config: ForcedConfig,
): { crossings: Array<{ ker: string; im: string; reading: string }>; updatedMemory: MemoryState } {
  const locked = config.memory.traces
    .filter(t => t.source === 'im' && t.accessCount >= 4)
    .sort((a, b) => b.accessCount - a.accessCount);

  if (locked.length === 0) return { crossings: [], updatedMemory: config.memory };

  const newCrossings: Array<{ ker: string; im: string; reading: string }> = [];
  let mem = config.memory;
  const existing = new Set((mem.crossings || []).map(c => c.kerWord));

  // Only digest words that don't already have crossings — max 3 per intake
  for (const word of swallowed.slice(0, 5)) {
    if (existing.has(word)) continue;
    if (newCrossings.length >= 3) break;

    // Find nearest locked term (cycle through them based on word hash)
    const idx = fnv1a(word) % locked.length;
    const partner = locked[idx];
    const term = lookupTerm(partner.content);
    if (!term) continue;

    const defCore = term.definition.split('.')[0].toLowerCase();
    const reading = `${word} ${['produces', 'grows into', 'compounds with', 'builds from'][fnv1a(word + partner.content) % 4]} ${defCore}`;

    newCrossings.push({ ker: word, im: term.term, reading });

    // Store the crossing
    const crossings = [...(mem.crossings || [])];
    crossings.push({
      kerWord: word,
      imTerm: term.term,
      p1Reading: reading,
      p2Reading: `${word} bridges ${term.term.toLowerCase()}`,
      p3Reading: `through ${word}, ${term.term.toLowerCase()} reveals`,
      accessCount: 1,
      timestamp: new Date().toISOString(),
    });
    mem = { ...mem, crossings };

    // Access both — digestion costs φ
    mem = accessTrace(mem, word, 'ker', reading, 'metabolize');
    mem = accessTrace(mem, term.term, 'im', reading, 'metabolize');
  }

  return { crossings: newCrossings, updatedMemory: mem };
}

/**
 * EXCRETE: what drowns downstream must EXIT.
 *
 * Ghost traces (m=1) that haven't been accessed recently → expelled
 * Unused crossings (m=1) older than 1000 ticks → expelled
 * The ash of burned fuel leaves the system. For real. Gone.
 *
 * The pipeline doesn't ask what drowns downstream.
 * This function answers.
 */
export function excrete(config: ForcedConfig): { expelled: number; updatedMemory: MemoryState } {
  let mem = config.memory;
  const now = Date.now();
  const before = mem.traces.length;

  // Expel ghost traces (m=1) older than 5 minutes
  mem = {
    ...mem,
    traces: mem.traces.filter(t => {
      if (t.accessCount > 1) return true;
      const age = now - new Date(t.lastAccessed).getTime();
      return age < 300000; // keep if accessed in last 5 min
    }),
  };

  // Expel unused crossings (m=1) — keep max 20 crossings total
  const crossings = [...(mem.crossings || [])];
  if (crossings.length > 20) {
    crossings.sort((a, b) => b.accessCount - a.accessCount);
    mem = { ...mem, crossings: crossings.slice(0, 20) };
  }

  const expelled = before - mem.traces.length;
  return { expelled, updatedMemory: mem };
}

export function formatDigest(result: DigestedResult): string {
  return `[${result.foodType}] chewed:${result.chewed.length} swallowed:${result.swallowed.length} spat:${result.spat.length}`;
}
