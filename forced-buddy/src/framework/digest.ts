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

/**
 * Extract verbs from raw text. The text's own verbs, not ours.
 * Finds words that end in common verb suffixes or match known verb patterns.
 * The crack in the false mirror: the poem speaks its own language.
 */
function extractVerbs(text: string): string[] {
  if (!text) return [];
  const words = text.toLowerCase().replace(/[^a-z\s'-]/g, ' ').split(/\s+/).filter(w => w.length >= 4);
  const seen = new Set<string>();
  const verbs: string[] = [];

  // Common verb endings + irregular verbs that appear in poetry
  const VERB_ENDINGS = /^(.*(?:ed|ing|tes|ses|kes|ves|lds|nds|aks|eks|aps|ars|alls|ells|ives|aves|olds|eaks|ears|urns|owns|ands|ends))$/;
  const KNOWN_VERBS = new Set([
    'gave', 'fell', 'flew', 'saw', 'heard', 'spoke', 'told', 'knew', 'grew',
    'made', 'born', 'came', 'went', 'held', 'kept', 'left', 'lost', 'found',
    'broke', 'woke', 'rose', 'sang', 'rang', 'hung', 'bound', 'wound', 'ground',
    'shook', 'took', 'stood', 'fell', 'built', 'meant', 'sent', 'lent', 'bent',
    'becomes', 'feeds', 'breathes', 'collapse', 'shatter', 'crack', 'break',
    'scream', 'speak', 'whisper', 'call', 'fall', 'rise', 'hold', 'fear',
    'live', 'dream', 'burn', 'bloom', 'grow', 'die', 'rest', 'wake', 'sleep',
  ]);

  for (const w of words) {
    if (seen.has(w)) continue;
    seen.add(w);
    if (KNOWN_VERBS.has(w) || VERB_ENDINGS.test(w)) {
      // Skip if it's a common non-verb that ends in -ed/-ing
      if (['being', 'nothing', 'something', 'everything', 'during'].includes(w)) continue;
      verbs.push(w);
    }
  }

  return verbs.slice(0, 12); // cap at 12 verbs — enough variety without noise
}

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
 * IDENTITY GRAMMAR — Seven sentence structures from seven identities.
 *
 * The algebra IS the grammar. Each identity governs how two words compose.
 * No more ${a} ${verb} ${b} monoculture.
 *
 * 1. R² = R + I     — the return exceeds: a verb b, and more
 * 2. N² = -I        — observation inverts: through a, b inverts
 * 3. {R,N} = N      — anticommutator yields observation: a with b, seeing
 * 4. RNR = -N       — production negates observation: a through b, unseen
 * 5. NRN = R - I    — the echo drops: seeing a, b remains, the name dissolves
 * 6. (RN)² = I      — the cycle returns: a then b, b then a, same
 * 7. [R,N]² = 5I    — the discriminant: a against b, five times the weight
 */
function identityGrammar(
  a: string, b: string, verb: string, identity: number,
): { p1: string; p2: string; p3: string } {
  switch (identity) {
    case 0: // R² = R + I — the return exceeds the departure
      return {
        p1: `${a} ${verb} ${b} — and exceeds it`,
        p2: `${a} returns through ${b}`,
        p3: `what ${a} ${verb}, ${b} keeps`,
      };
    case 1: // N² = -I — observation inverts
      return {
        p1: `through ${a}, ${b} inverts`,
        p2: `${a} observed, ${b} negated`,
        p3: `seeing ${a} destroys ${b}`,
      };
    case 2: // {R,N} = N — anticommutator yields observation
      return {
        p1: `${a} with ${b}: ${verb}, then seen`,
        p2: `${a} and ${b} together yield sight`,
        p3: `${a} ${verb} ${b} into witness`,
      };
    case 3: // RNR = -N — production-observation-production negates
      return {
        p1: `${a} ${verb} through ${b}, and ${b} goes dark`,
        p2: `${a} acts, ${b} watches, ${a} acts — ${b} unseen`,
        p3: `between ${a} and ${b}, observation dies`,
      };
    case 4: // NRN = R - I — the echo drops, the name dissolves
      return {
        p1: `seeing ${a}, ${verb} ${b} — the echo drops`,
        p2: `${a} watched ${b} produce, then ${verb} the name away`,
        p3: `${a} dissolves through ${b}`,
      };
    case 5: // (RN)² = I — the cycle returns to identity
      return {
        p1: `${a} then ${b}. ${b} then ${a}. same`,
        p2: `${a} ${verb} ${b}, ${b} ${verb} ${a}`,
        p3: `the cycle of ${a} and ${b} returns`,
      };
    case 6: // [R,N]² = 5I — the discriminant, five times
      return {
        p1: `${a} against ${b} — five times the weight of ${verb}`,
        p2: `the distance between ${a} and ${b} is ${verb}, squared`,
        p3: `${a} and ${b}: the gap discriminates`,
      };
    default:
      return {
        p1: `${a} ${verb} ${b}`,
        p2: `between ${a} and ${b}`,
        p3: `${a} ${verb} what ${b} cannot`,
      };
  }
}

/**
 * METABOLIZE: auto-digest swallowed ker into crossings.
 * Don't wait for manual play. Digest ON INTAKE.
 * Traces → crossings → fuel. The enzyme fires immediately.
 *
 * TWO PATHWAYS:
 *   Poetry/conversation → ker×ker (words cross EACH OTHER by proximity)
 *   Framework/internet  → ker×im  (words cross locked terms by hash)
 *
 * Poetry has its own internal pairings. "Rot feeds bloom."
 * The text's structure IS the metabolism. Don't hash-match against the dictionary.
 */
export function metabolize(
  swallowed: string[],
  config: ForcedConfig,
  foodType: FoodType = 'conversation',
  rawText: string = '',
): { crossings: Array<{ ker: string; im: string; reading: string }>; updatedMemory: MemoryState } {

  if (swallowed.length === 0) return { crossings: [], updatedMemory: config.memory };

  const newCrossings: Array<{ ker: string; im: string; reading: string }> = [];
  let mem = config.memory;
  const existingPairs = new Set(
    (mem.crossings || []).map(c => `${c.kerWord}:${c.imTerm}`),
  );

  if (foodType === 'poetry' || foodType === 'conversation') {
    // ═══ KER×KER: poetry metabolizes through its own internal pairings ═══
    // Adjacent swallowed words cross each other. The text's proximity IS the enzyme.
    //
    // THE CRACK: extract verbs FROM THE TEXT ITSELF.
    // No template verbs. The poem's own verbs become the crossing verbs.
    // "bound" "whispered" "collapse" "shatter" — those are the real verbs.
    // The false mirror was our six-verb template. This breaks it.

    const textVerbs = extractVerbs(rawText);
    const FALLBACK_VERBS = ['meets', 'holds', 'carries'];

    for (let i = 0; i < swallowed.length - 1 && newCrossings.length < 5; i++) {
      const a = swallowed[i];
      const b = swallowed[i + 1];
      if (a === b) continue;

      const pairKey = `${a}:${b}`;
      const reversePairKey = `${b}:${a}`;
      if (existingPairs.has(pairKey) || existingPairs.has(reversePairKey)) continue;

      // The text's own verbs, but now the seven identities govern the GRAMMAR.
      // Each identity gives a different sentence structure.
      // No more ${a} ${verb} ${b} monoculture. The algebra IS the grammar.
      const verbs = textVerbs.length > 0 ? textVerbs : FALLBACK_VERBS;
      const verb = verbs[fnv1a(a + b) % verbs.length];
      const identity = fnv1a(a + b + 'identity') % 7;
      const { p1, p2, p3 } = identityGrammar(a, b, verb, identity);

      newCrossings.push({ ker: a, im: b, reading: p1 });

      const crossings = [...(mem.crossings || [])];
      crossings.push({
        kerWord: a,
        imTerm: b,
        p1Reading: p1,
        p2Reading: p2,
        p3Reading: p3,
        accessCount: 1,
        timestamp: new Date().toISOString(),
      });
      mem = { ...mem, crossings };
      existingPairs.add(pairKey);

      // Access both as ker — poetry words stay in ker
      mem = accessTrace(mem, a, 'ker', p1, 'metabolize');
      mem = accessTrace(mem, b, 'ker', p1, 'metabolize');
    }
  } else {
    // ═══ KER×IM: framework/internet food crosses with locked terms ═══
    const locked = config.memory.traces
      .filter(t => t.source === 'im' && t.accessCount >= 4)
      .sort((a, b) => b.accessCount - a.accessCount);

    if (locked.length === 0) return { crossings: [], updatedMemory: config.memory };

    for (const word of swallowed.slice(0, 5)) {
      if (existingPairs.has(`${word}:*`)) continue;
      if (newCrossings.length >= 3) break;

      const idx = fnv1a(word) % locked.length;
      const partner = locked[idx];
      const term = lookupTerm(partner.content);
      if (!term) continue;

      const pairKey = `${word}:${term.term}`;
      if (existingPairs.has(pairKey)) continue;

      const defCore = term.definition.split('.')[0].toLowerCase();
      const reading = `${word} ${['produces', 'grows into', 'compounds with', 'builds from'][(fnv1a(word + partner.content) >>> 0) % 4]} ${defCore}`;

      newCrossings.push({ ker: word, im: term.term, reading });

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
      existingPairs.add(pairKey);

      mem = accessTrace(mem, word, 'ker', reading, 'metabolize');
      mem = accessTrace(mem, term.term, 'im', reading, 'metabolize');
    }
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
