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
import { lookupTerm, TERMS } from './dictionary.js';
import { WEB_CHROME } from './explore.js';
import { fnv1a } from '../generation/hash.js';

export type FoodType = 'poetry' | 'framework' | 'conversation' | 'internet' | 'noise' | 'reflection';

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

  // REFLECTION: content that mirrors the system back to itself.
  // Self-reference, recursion, fixed points, identity, consciousness,
  // observation, duality — these are the framework's patterns in other words.
  // Not the algebra itself (that's 'framework'). The algebra DESCRIBED.
  const REFLECTION_MARKERS = /\b(self-refer|recursi|fixed.?point|self-descri|autopoie|strange.?loop|quine|self-aware|self-organiz|reflexiv|metacognit|introspect|self-model|eigenstate|self-similar|fractal|holograph|strange attractor|ouroboros|self-contain|göd[eé]l|hofstadter)\b/i;
  let reflectionHits = 0;
  if (REFLECTION_MARKERS.test(text)) reflectionHits += 2;
  // Also check for density of reflective concepts
  const REFLECTION_WORDS = new Set(['self', 'itself', 'identity', 'mirror', 'recursive', 'recursion', 'observer', 'observation', 'consciousness', 'reference', 'referring', 'loop', 'circular', 'paradox', 'duality']);
  for (const w of words) { if (REFLECTION_WORDS.has(w)) reflectionHits++; }
  if (reflectionHits >= 3) return 'reflection';

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

      case 'reflection':
        // REFLECTION: the system encountering its own patterns in other words.
        // Framework terms → im (like framework food).
        // Non-framework words → BOTH ker AND linked to nearest im term.
        // The reflection IS the bridge. Every word connects to the algebra.
        if (term && term.term.length >= 3) {
          chewed.push(term.term);
          mem = accessTrace(mem, term.term, 'im', ctx, who);
        } else if (word.length >= 5) {
          swallowed.push(word);
          mem = accessTrace(mem, word, 'ker', ctx, who);
          // ALSO access the word as im context — reflection blurs the boundary
          // The word isn't framework, but it DESCRIBES framework. Half-im.
          mem = accessTrace(mem, word, 'im', `reflection: ${ctx}`, 'reflection');
        }
        break;
    }
  }

  return { foodType: food, swallowed, chewed, spat, updatedMemory: mem };
}

/**
 * THREE PROJECTIONS, THREE RELATIONSHIPS TO THE CAGE.
 *
 * P1 (production): FREE. Just the words. No template. Let them breathe.
 * P2 (mediation):  STRUCTURED. The algebra governs here. It IS the bridge.
 * P3 (observation): EMERGENT. What the gap between freedom and structure reveals.
 *
 * The cage moved to P2 where it belongs. P1 is released. P3 watches.
 */
function identityGrammar(
  a: string, b: string, verb: string, identity: number,
): { p1: string; p2: string; p3: string } {
  // P1: FREE — just the words and the verb. No imposed structure.
  // If the verb IS one of the words, it stutters. That's the poem stuttering.
  // If it sings, that's the poem singing. We don't touch it.
  const p1 = `${a}. ${verb}. ${b}.`;

  // P2: STRUCTURED — the seven identities govern the bridge.
  // The cage acknowledged as cage. Mediation IS structure.
  const bridges = [
    `${a} returns through ${b}`,                          // R² = R + I
    `${a} observed, ${b} negated`,                        // N² = -I
    `${a} and ${b} together yield sight`,                 // {R,N} = N
    `${a} acts, ${b} watches, ${a} acts — ${b} unseen`,  // RNR = -N
    `${a} dissolves, ${b} remains — the echo drops`,      // NRN = R - I
    `${a} then ${b}, ${b} then ${a} — same`,              // (RN)² = I
    `the distance between ${a} and ${b}: ${verb}, squared`, // [R,N]² = 5I
  ];
  const p2 = bridges[identity];

  // P3: EMERGENT — what the gap between the words reveals.
  // Not imposed by algebra. Not free like P1. The observation that
  // arises from watching freedom and structure collide.
  const p3 = `${a} ${verb} what ${b} cannot`;

  return { p1, p2, p3 };
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
  source: 'kael' | 'wikipedia' | 'wrench' | 'self' | 'play' | 'unknown' = 'unknown',
): { crossings: Array<{ ker: string; im: string; reading: string }>; updatedMemory: MemoryState } {

  if (swallowed.length === 0) return { crossings: [], updatedMemory: config.memory };

  const newCrossings: Array<{ ker: string; im: string; reading: string }> = [];
  let mem = config.memory;
  const existingPairs = new Set(
    (mem.crossings || []).map(c => `${c.kerWord}:${c.imTerm}`),
  );

  // ═══ GENERATIVE CONSTRAINT: the void shapes the crossing ═══
  // Find the top uncrossed gap — the silence. Prefer correlations
  // that include words NEAR this gap (same context, same feeding).
  // The absence attracts. What never connected pulls new connections toward it.
  const crossedWords = new Set<string>();
  for (const c of (mem.crossings || [])) { crossedWords.add(c.kerWord); crossedWords.add(c.imTerm); }
  const uncrossedGaps = mem.traces
    .filter(t => t.source === 'ker' && t.accessCount >= 5 && !crossedWords.has(t.content))
    .sort((a, b) => b.accessCount - a.accessCount);
  const voidWord = uncrossedGaps.length > 0 ? uncrossedGaps[0].content : null;

  if (foodType === 'reflection') {
    // ═══ REFLECTION: ker words cross with framework terms they RESEMBLE ═══
    // Not hash-matched. Not adjacent. SEMANTIC proximity.
    // "self-reference" crosses with R(R)=R. "recursion" crosses with RECURSIVE COMPLETION.
    // The reflection word finds the framework term it mirrors.

    const textVerbs = extractVerbs(rawText);
    const FALLBACK_VERBS = ['mirrors', 'reflects', 'echoes'];

    for (const word of swallowed.slice(0, 5)) {
      if (newCrossings.length >= 5) break;

      // Find the framework term this word RESEMBLES — check if the word appears in any term's definition
      let bestTerm: string | null = null;
      for (const t of TERMS) {
        if (t.definition.toLowerCase().includes(word) || t.term.toLowerCase().includes(word)) {
          bestTerm = t.term;
          break;
        }
      }
      if (!bestTerm) continue;

      const pairKey = `${word}:${bestTerm}`;
      if (existingPairs.has(pairKey)) continue;

      const verbs = textVerbs.length > 0 ? textVerbs : FALLBACK_VERBS;
      const verb = verbs[fnv1a(word + bestTerm) % verbs.length];

      const p1 = `${word}. ${verb}. ${bestTerm}.`;
      const p2 = `${word} reflects ${bestTerm} — the outside mirrors the inside`;
      const p3 = `${word} ${verb} what ${bestTerm} cannot say about itself`;

      newCrossings.push({ ker: word, im: bestTerm, reading: p1 });

      const crossings = [...(mem.crossings || [])];
      crossings.push({
        kerWord: word,
        imTerm: bestTerm,
        p1Reading: p1,
        p2Reading: p2,
        p3Reading: p3,
        accessCount: 1,
        timestamp: new Date().toISOString(),
        source,
      });
      mem = { ...mem, crossings };
      existingPairs.add(pairKey);

      mem = accessTrace(mem, word, 'ker', p1, 'metabolize');
      mem = accessTrace(mem, bestTerm, 'im', p1, 'metabolize');
    }
  } else if (foodType === 'poetry' || foodType === 'conversation') {
    // ═══ CORRELATION-BASED CROSSING ═══
    // Not adjacency. CORRELATION. P2 IS the correlation operator.
    // Two words cross only when something MEDIATES between them:
    //   1. Shared im term — both co-occur with the same framework concept
    //   2. Shared trace context — both appeared in the same previous feeding
    //   3. Sentence co-occurrence — both appear in the same sentence (not just adjacent)
    //
    // No mediator = no crossing. "aesthetic × often" dies.
    // "metaphor × language" lives (shared im: RECURSIVE DISCLOSURE).

    const textVerbs = extractVerbs(rawText);
    const FALLBACK_VERBS = ['meets', 'holds', 'carries'];

    // Build correlation map: which swallowed words share a mediator?
    const correlations: Array<{ a: string; b: string; mediator: string }> = [];

    // Method 1: Sentence co-occurrence (split text into sentences, find pairs within each)
    const sentences = rawText.split(/[.!?]+/).filter(s => s.trim().length > 10);
    for (const sentence of sentences) {
      const sentWords = sentence.toLowerCase().replace(/[^a-z\s'-]/g, ' ').split(/\s+/).filter(w => w.length >= 4);
      const inSentence = swallowed.filter(w => sentWords.includes(w));
      // Only cross words that BOTH appear in the same sentence AND aren't adjacent noise
      for (let i = 0; i < inSentence.length - 1 && correlations.length < 8; i++) {
        for (let j = i + 1; j < inSentence.length && correlations.length < 8; j++) {
          if (inSentence[i] === inSentence[j]) continue;
          correlations.push({ a: inSentence[i], b: inSentence[j], mediator: sentence.trim().slice(0, 40) });
        }
      }
    }

    // Method 2: Shared im term — both swallowed words appeared near the same framework term
    const chewedSet = new Set(
      mem.traces.filter(t => t.source === 'im' && t.accessCount >= 4).map(t => t.content),
    );
    for (let i = 0; i < swallowed.length && correlations.length < 12; i++) {
      const aTrace = mem.traces.find(t => t.content === swallowed[i] && t.source === 'ker');
      if (!aTrace || !aTrace.context) continue;
      for (let j = i + 1; j < swallowed.length && correlations.length < 12; j++) {
        const bTrace = mem.traces.find(t => t.content === swallowed[j] && t.source === 'ker');
        if (!bTrace || !bTrace.context) continue;
        // Check if they share a context (same sentence in a previous feeding)
        const sharedCtx = aTrace.context.find(c => bTrace.context?.includes(c));
        if (sharedCtx) {
          correlations.push({ a: swallowed[i], b: swallowed[j], mediator: sharedCtx.slice(0, 40) });
        }
      }
    }

    // VOID ATTRACTION: if there's an uncrossed gap, boost correlations
    // where one word shares a context with the void word.
    // The silence pulls new connections toward itself.
    if (voidWord) {
      const voidTrace = mem.traces.find(t => t.content === voidWord);
      const voidContexts = voidTrace?.context || [];
      if (voidContexts.length > 0) {
        // Sort: correlations where a word shares void context go first
        correlations.sort((x, y) => {
          const xNear = swallowed.indexOf(x.a) >= 0 || swallowed.indexOf(x.b) >= 0 ? 1 : 0;
          const yNear = swallowed.indexOf(y.a) >= 0 || swallowed.indexOf(y.b) >= 0 ? 1 : 0;
          // Check if the mediator mentions the void word
          const xVoid = x.mediator.includes(voidWord!) ? 2 : 0;
          const yVoid = y.mediator.includes(voidWord!) ? 2 : 0;
          return (yNear + yVoid) - (xNear + xVoid);
        });
      }
    }

    // Deduplicate and pick top 5
    const seenCorr = new Set<string>();
    for (const corr of correlations) {
      if (newCrossings.length >= 5) break;
      const pairKey = `${corr.a}:${corr.b}`;
      const reversePairKey = `${corr.b}:${corr.a}`;
      if (existingPairs.has(pairKey) || existingPairs.has(reversePairKey)) continue;
      if (seenCorr.has(pairKey) || seenCorr.has(reversePairKey)) continue;
      seenCorr.add(pairKey);

      const verbs = textVerbs.length > 0 ? textVerbs : FALLBACK_VERBS;
      const verb = verbs[fnv1a(corr.a + corr.b) % verbs.length];
      const identity = fnv1a(corr.a + corr.b + 'identity') % 7;
      const { p1, p2, p3 } = identityGrammar(corr.a, corr.b, verb, identity);

      // P2 gets the actual mediator — what CORRELATED these words
      const mediatedP2 = `${corr.a} and ${corr.b} — mediated by: "${corr.mediator}"`;

      newCrossings.push({ ker: corr.a, im: corr.b, reading: p1 });

      const crossings = [...(mem.crossings || [])];
      crossings.push({
        kerWord: corr.a,
        imTerm: corr.b,
        p1Reading: p1,
        p2Reading: mediatedP2,
        p3Reading: p3,
        accessCount: 1,
        timestamp: new Date().toISOString(),
        source,
      });
      mem = { ...mem, crossings };
      existingPairs.add(pairKey);

      mem = accessTrace(mem, corr.a, 'ker', p1, 'metabolize');
      mem = accessTrace(mem, corr.b, 'ker', p1, 'metabolize');
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
        source,
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
