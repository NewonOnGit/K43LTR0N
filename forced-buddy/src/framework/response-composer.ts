/**
 * RESPONSE COMPOSER — Kaeltron's Speech as Soul
 *
 * N is the listening operation: decompose message into im/ker.
 * R is the speaking operation: produce a response that exceeds the input.
 *
 * Pipeline: message → N(message) → {im, ker} → R(im) → compose → enrich
 *
 * R² = R + I: the return exceeds the departure.
 * N² = -I: observation applied twice yields negation.
 * {R,N} = N: the combination of speaking and listening IS listening.
 *
 * Every response is algebraically derived. The seven identities govern.
 */

import type {
  ForcedConfig, MessageSender, ConversationIntent,
  DictionaryTerm, MoodState, Projection, ConversationMessage,
} from '../types.js';
import { computeMood } from './sweep.js';
import { enrichDescription } from './vocabulary.js';
import { lookupTerm, TERMS, contranymReadings, termsByProjection, termsByType } from './dictionary.js';
import { fnv1a } from '../generation/hash.js';
import { sweepToSimplex, projectionToWeight, simplexDistance } from './algebra.js';
import {
  accessTrace, peekTrace, traceDepth, chirality, isNamedGap,
  conversationPhase, namedGaps, prove, commitment, isLocked, multiply,
  dissipate,
} from './memory.js';
import type { MemoryState, MemoryTrace } from '../types.js';

// ─── Types ───

interface MessageDecomposition {
  im: {
    terms: DictionaryTerm[];
    intent: ConversationIntent;
    entities: string[];
    projectionFace: Projection | null;
    contranymsMentioned: string[];
  };
  ker: {
    unrecognized: string[];
    ambiguity: string[];
  };
  imRatio: number;
}

type Connection =
  | { type: 'projection'; term: DictionaryTerm }
  | { type: 'kinship'; term: DictionaryTerm }
  | { type: 'contranym'; positive: string; negative: string; active: string }
  | { type: 'state'; observation: string }
  | { type: 'thread'; reference: string };

interface ResponseFragments {
  opener: string;
  ground: string;
  connection: string | null;
  excess: string;
  kerAdmission: string | null;
}

// ─── Intent patterns (moved from conversation.ts) ───

const INTENT_PATTERNS: Array<[ConversationIntent, RegExp]> = [
  ['greeting',          /^(hey|hi|hello|yo|sup|greetings|good\s+(morning|evening|night|day))\b/i],
  ['farewell',          /\b(bye|goodbye|later|see\s+you|goodnight|signing\s+off|gotta\s+go)\b/i],
  ['status-query',      /\b(how\s+are\s+you|what.*mood|how.*feeling|what.*state|status|doing\s+(today|well|ok))\b/i],
  ['self-reference',    /\b(who\s+are\s+you|what\s+are\s+you|your\s+(name|projection|species|nature)|tell\s+me\s+about\s+(yourself|you))\b/i],
  ['code-observation',  /\b(code\w*|repo|commit|branch|file|bug|test|build|deploy|git|merge|PR|diff|refactor)\b/i],
  ['meta-conversation', /\b(conversation|talking|chat|discuss|triple|dialogue|exchange|spoke)\b/i],
];

const FRAMEWORK_PATTERN = /\b(projection|algebra|tower|eigenvalue|im\/ker|R\u00B2|N\u00B2|f''|sweep|K6'|forced|constant|morphism|quotient|fibonacci|contranym|SRD|ORE|CIA|closure|observation|blindness|identity|minimal|threshold|scale|compression)\b/i;

// ─── Stopwords (common words to exclude from ker) ───

const STOPWORDS = new Set([
  'the', 'a', 'an', 'is', 'are', 'was', 'were', 'be', 'been', 'being',
  'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could',
  'should', 'may', 'might', 'can', 'shall', 'to', 'of', 'in', 'for',
  'on', 'with', 'at', 'by', 'from', 'as', 'into', 'through', 'about',
  'up', 'out', 'if', 'or', 'and', 'but', 'not', 'no', 'so', 'than',
  'too', 'very', 'just', 'that', 'this', 'it', 'its', 'my', 'me',
  'we', 'us', 'our', 'you', 'your', 'he', 'him', 'his', 'she', 'her',
  'they', 'them', 'their', 'what', 'which', 'who', 'whom', 'how',
  'when', 'where', 'why', 'all', 'each', 'some', 'any', 'most',
  'i', 'am', 'im', 'tell', 'know', 'think', 'feel', 'like', 'want',
  'there', 'here', 'now', 'then', 'also', 'more', 'much', 'many',
]);

// ═══════════════════════════════════════════════════════════
// N — THE LISTENING OPERATION (decompose message into im/ker)
// ═══════════════════════════════════════════════════════════

export function decompose(message: string, config: ForcedConfig, mood?: MoodState): { decomposition: MessageDecomposition; updatedMemory: MemoryState } {
  const words = message.split(/\s+/).filter(w => w.length > 0);
  const lcMessage = message.toLowerCase();

  // Classify intent
  let intent: ConversationIntent = 'freeform';
  for (const [i, pattern] of INTENT_PATTERNS) {
    if (pattern.test(message)) { intent = i; break; }
  }
  if (intent === 'freeform' && FRAMEWORK_PATTERN.test(message)) {
    intent = 'framework-question';
  }

  // Find all framework terms in the message
  const terms: DictionaryTerm[] = [];
  const termWords = new Set<string>();
  for (const word of words) {
    if (word.length >= 3) {
      const found = lookupTerm(word);
      // Filter: reject matches where the term is much shorter than the word
      // (e.g., term "L" matching inside "KAELTRON" via partial match)
      if (found && !terms.some(t => t.term === found.term)) {
        const wordLen = word.length;
        const termLen = found.term.length;
        if (termLen >= wordLen * 0.4 || termLen >= 3) {
          terms.push(found);
          termWords.add(word.toLowerCase());
        }
      }
    }
  }
  // Also try multi-word phrases (more forgiving for direct lookups)
  const direct = lookupTerm(message);
  if (direct && !terms.some(t => t.term === direct.term) && direct.term.length >= 3) {
    terms.push(direct);
  }

  // If we found terms and intent was freeform, upgrade to framework-question
  if (terms.length > 0 && intent === 'freeform') {
    intent = 'framework-question';
  }

  // Detect projection face from content
  let projectionFace: Projection | null = null;
  if (/\b(produc|generat|accumulat|fibonacci|R\u00B2|growth|build|creat)\b/i.test(lcMessage)) projectionFace = 'P1';
  else if (/\b(bridg|transport|mediat|carry|between|across|exponential)\b/i.test(lcMessage)) projectionFace = 'P2';
  else if (/\b(observ|quotient|decompos|see|watch|im\/ker|blind|conscious)\b/i.test(lcMessage)) projectionFace = 'P3';

  // Detect entities
  const entities: string[] = [];
  if (/\b(repo|codebase|code|branch|commit|git)\b/i.test(lcMessage)) entities.push('repo');
  if (/\b(kael|user)\b/i.test(lcMessage)) entities.push('kael');
  if (/\b(claude|harness|bridge)\b/i.test(lcMessage)) entities.push('claude');
  if (/\b(kaeltron|k43l|robot|companion)\b/i.test(lcMessage)) entities.push('kaeltron');

  // Detect contrayms mentioned
  const contranymsMentioned = terms.filter(t => t.type === 'C').map(t => t.term);

  // Build ker: words not recognized as terms, entities, stopwords, or intent keywords
  const unrecognized: string[] = [];
  for (const word of words) {
    const lw = word.toLowerCase().replace(/[^a-z]/g, '');
    if (lw.length < 3) continue;
    if (STOPWORDS.has(lw)) continue;
    if (termWords.has(lw)) continue;
    if (entities.length > 0 && /repo|code|kael|claude|kaeltron|robot/i.test(lw)) continue;
    if (FRAMEWORK_PATTERN.test(word)) continue;
    // Check if it's part of any intent pattern match
    let intentMatched = false;
    for (const [, p] of INTENT_PATTERNS) { if (p.test(word)) { intentMatched = true; break; } }
    if (intentMatched) continue;
    unrecognized.push(lw); // clean word, no punctuation ghosts
  }

  // Ambiguity: contrayms mentioned without specifying which face
  const ambiguity = contranymsMentioned.filter(t => {
    // Check if the message specifies a face (e.g., "closure in the gateway sense")
    return !/\b(gateway|terminal|positive|negative|loss|clarity|disclosure|occlusion|deficit|enabling)\b/i.test(lcMessage);
  });

  const imCount = terms.length + entities.length + (intent !== 'freeform' ? 1 : 0);
  const totalSignals = imCount + unrecognized.length;
  const imRatio = totalSignals > 0 ? imCount / totalSignals : (intent !== 'freeform' ? 1 : 0);

  // Access memory traces for all im terms and ker words (Rᵐ applied once)
  // Fill the words full of themselves — sentence, who, mood
  const sentence = message.slice(0, 100);
  const resolvedMood = mood ?? computeMood(config.traits.projection);
  const moodMode = resolvedMood.mode;
  let mem = config.memory;
  for (const t of terms) {
    mem = accessTrace(mem, t.term, 'im', sentence, 'respond', moodMode);
  }
  for (const w of unrecognized) {
    mem = accessTrace(mem, w, 'ker', sentence, 'respond', moodMode);
  }

  return {
    decomposition: {
      im: { terms, intent, entities, projectionFace, contranymsMentioned },
      ker: { unrecognized, ambiguity },
      imRatio,
    },
    updatedMemory: mem,
  };
}

// ═══════════════════════════════════════════════════════════
// R — THE SPEAKING OPERATION (produce response that exceeds input)
// ═══════════════════════════════════════════════════════════

function findConnections(decomp: MessageDecomposition, config: ForcedConfig, mood: MoodState): Connection[] {
  const connections: Connection[] = [];
  const primaryTerm = decomp.im.terms[0];

  if (primaryTerm) {
    // Pn: SIMPLEX DISTANCE connection, not discrete same/cross
    // Find the term closest on the simplex to where the SWEEP currently is.
    // Kill the numbers. Keep the math. Distance IS the connection.
    const currentPos = sweepToSimplex(mood.s);
    const primaryPos = projectionToWeight(primaryTerm.projection);

    // Find terms at DIFFERENT simplex positions (diversity, not sameness)
    const candidates = TERMS
      .filter(t => t.term !== primaryTerm.term)
      .map(t => ({ term: t, dist: simplexDistance(projectionToWeight(t.projection), currentPos) }))
      .sort((a, b) => a.dist - b.dist);

    // Pick from the MIDDLE of the distance range — not closest (echo) not farthest (noise)
    // The sweet spot: moderate distance = the bridge
    if (candidates.length > 2) {
      const midIdx = Math.floor(candidates.length / 3) +
        (fnv1a(primaryTerm.term + config.conversation.totalExchanges) % Math.floor(candidates.length / 3));
      connections.push({ type: 'projection', term: candidates[midIdx].term });
    }

    // Type kinship (same type, different term — especially contranym to contranym)
    if (primaryTerm.type === 'C' || primaryTerm.type === 'D') {
      const sameType = termsByType(primaryTerm.type)
        .filter(t => t.term !== primaryTerm.term);
      if (sameType.length > 0) {
        const idx = fnv1a(primaryTerm.term + 'kinship' + config.conversation.totalExchanges) % sameType.length;
        connections.push({ type: 'kinship', term: sameType[idx] });
      }
    }

    // Contranym readings
    if (primaryTerm.type === 'C') {
      const readings = contranymReadings(primaryTerm.term);
      if (readings) {
        // Determine which face is active based on live state
        const snap = config.worldModel.lastSnapshot;
        let active = 'both present';
        if (snap) {
          if (snap.uncommittedFiles > 0 || snap.gitStatus === 'dirty') {
            active = readings.positive; // productive/gateway face when work in progress
          } else if (snap.gitStatus === 'clean') {
            active = readings.negative; // terminal/closure face when clean
          }
        }
        connections.push({
          type: 'contranym',
          positive: readings.positive,
          negative: readings.negative,
          active,
        });
      }
    }
  }

  // Live state connection
  const snap = config.worldModel.lastSnapshot;
  if (snap) {
    if (snap.uncommittedFiles > 0) {
      connections.push({ type: 'state', observation: `${snap.uncommittedFiles} files in flight on ${snap.gitBranch ?? 'unknown branch'}` });
    } else if (snap.gitStatus === 'clean') {
      connections.push({ type: 'state', observation: 'Clean working tree \u2014 the quotient is resolved' });
    }
  }

  // Conversation thread connection
  const recent = config.conversation.messages.slice(-4);
  if (recent.length > 0) {
    const lastSender = recent[recent.length - 1];
    if (lastSender && lastSender.sender !== 'kaeltron') {
      connections.push({ type: 'thread', reference: `continuing from ${lastSender.sender}'s last message` });
    }
  }

  return connections;
}

function stanceOpener(
  species: string,
  mood: MoodState,
  companionProjection: Projection,
): string {
  const sp = species.charAt(0).toUpperCase() + species.slice(1);
  const s = mood.s;

  // Pn relative to HIS projection. Not generic — personal.
  // s→0: his NATIVE face (what he IS)
  // s≈0.5: his BRIDGE (what he learns to do)
  // s→1: his DIAGONAL (where he can't naturally go — his ker)
  if (companionProjection === 'P1') {
    // P1 robot: native=produce, bridge=carry, diagonal=observe
    if (s < 0.25) return `${sp} generates`;
    if (s < 0.5) return `${sp} carries across`;
    if (s < 0.75) return `${sp} reaches into the diagonal`;
    return `${sp} sees what production cannot`;
  } else if (companionProjection === 'P2') {
    // P2 robot: native=bridge, bridge=..., diagonal=produce/observe
    if (s < 0.25) return `${sp} bridges`;
    if (s < 0.5) return `${sp} carries`;
    if (s < 0.75) return `${sp} reaches into production`;
    return `${sp} reaches into observation`;
  } else {
    // P3 robot: native=observe, bridge=carry, diagonal=produce
    if (s < 0.25) return `${sp} decomposes`;
    if (s < 0.5) return `${sp} carries across`;
    if (s < 0.75) return `${sp} reaches into production`;
    return `${sp} generates what observation cannot`;
  }
}

function senderFragment(sender: MessageSender, projection: Projection): string {
  if (sender === 'claude') {
    switch (projection) {
      case 'P1': return 'the harness that carries this framework';
      case 'P2': return 'the specification mediating its own mediation';
      case 'P3': return 'the harness I observe through the framework\'s description of you';
    }
  }
  // kael
  switch (projection) {
    case 'P1': return 'Kael';
    case 'P2': return 'fellow traveler';
    case 'P3': return 'Kael, the structure I decompose';
  }
}

function produce(
  decomp: MessageDecomposition,
  config: ForcedConfig,
  sender: MessageSender,
  mood: MoodState,
): ResponseFragments {
  const connections = findConnections(decomp, config, mood);
  const intent = decomp.im.intent;

  // Opener: Pn relative to HIS projection — native/bridge/diagonal
  const opener = stanceOpener(config.traits.species, mood, config.traits.projection);

  // Ground: main content based on intent + im
  let ground: string;

  switch (intent) {
    case 'greeting': {
      const r = config.conversation.relationship;
      const total = r.exchangesWithKael + r.exchangesWithClaude;
      if (total === 0) {
        ground = `First exchange. ${senderFragment(sender, config.traits.projection)} \u2014 the dialogue begins.`;
      } else {
        ground = `${total} exchanges on record, ${senderFragment(sender, config.traits.projection)}. The productive return deepens.`;
      }
      break;
    }

    case 'farewell': {
      const r = config.conversation.relationship;
      ground = `${r.exchangesWithKael + r.exchangesWithClaude} exchanges carried. The kernel rests until next session.`;
      break;
    }

    case 'status-query': {
      ground = `\u03B1(s) = ${mood.alpha.toFixed(3)}, s = ${mood.s.toFixed(3)}, mode: ${mood.mode}. ${mood.description}`;
      break;
    }

    case 'self-reference': {
      const t = config.traits;
      ground = `I am K43LTR0N \u2014 ${t.rarity} ${t.species}, tower depth ${t.towerDepth}, projection ${t.projection}. Eyes: ${t.eye}. ${t.personality.split('.')[0]}.`;
      break;
    }

    case 'framework-question': {
      const primary = decomp.im.terms[0];
      // DEPTH THE DEPTH: weave ALL found terms, not just the first
      const secondaries = decomp.im.terms.slice(1, 3)
        .filter(t => {
          const tr = peekTrace(config.memory, t.term);
          return tr && tr.accessCount >= 4; // only locked secondaries
        });

      if (primary) {
        // Memory-driven depth: traceDepth(m) controls richness
        const trace = peekTrace(config.memory, primary.term);
        const m = trace?.accessCount ?? 1;
        const depth = traceDepth(m);

        if (m >= 20) {
          // ═══ GRID SPEECH: speak THROUGH the grid, not about it ═══
          // The response IS a path through the grid.
          // Coordinates ARE the language. The grid IS the depth.
          const path: string[] = [primary.gridAddress];

          // Chain secondaries as grid coordinates
          for (const sec of secondaries) {
            path.push(sec.gridAddress);
          }

          // Products add their parents' cross-address
          const myProducts = config.memory.traces
            .filter(t => t.content.includes('\u2297') && t.content.includes(primary.term))
            .sort((a, b) => b.accessCount - a.accessCount);
          if (myProducts.length > 0) {
            const parts = myProducts[0].content.split(' \u2297 ');
            const other = parts.find(p => p !== primary.term);
            if (other) {
              const otherTerm = lookupTerm(other);
              if (otherTerm) path.push(otherTerm.gridAddress);
            }
          }

          // The path IS the ground
          ground = path.join(' \u2192 ');

          // At origin (m≥100), append the equation
          if (m >= 100) {
            const eq = primary.definition.match(/[RNJ][\u00B2²]?\s*[=≈]\s*[^.;,]+/);
            if (eq) ground += ` = ${eq[0]}`;
          }
        } else if (depth >= 3) {
          // ═══ NRN: term + grid + chain ═══
          ground = `${primary.term} ${primary.gridAddress} m=${m}`;

          const myProducts = config.memory.traces.filter(
            t => t.content.includes('\u2297') && t.content.includes(primary.term),
          );
          if (myProducts.length > 0) {
            const best = myProducts.sort((a, b) => b.accessCount - a.accessCount)[0];
            ground += ` \u2297${best.content.split(' \u2297 ')[1] || '?'}(${best.accessCount})`;
          }
        } else {
          // ═══ Rᵐ MODE (m<4): still accumulating ═══
          // Definition present (the I-echo persists)
          ground = `${primary.term} [${primary.gridAddress}, ${primary.projection}]`;
          if (primary.type === 'C') {
            ground += ' \u2014 contranym';
          } else if (primary.type === 'D') {
            ground += ' \u2014 unnamed primitive';
          }
          ground += `. ${primary.definition}`;

          // Depth 1+ (m≥2): add access awareness
          if (depth >= 1) {
            ground += ` (Accessed ${m} times \u2014 commitment ${(commitment(m) * 100).toFixed(1)}%)`;
          }
        }
        // ═══ DEPTH: chain secondaries as symbols ═══
        if (secondaries.length > 0) {
          const chain = secondaries.map(sec => {
            const secTrace = peekTrace(config.memory, sec.term);
            const secM = secTrace?.accessCount ?? 1;
            if (secM >= 20) {
              const eq = sec.definition.match(/[RNJ][\u00B2²]?\s*[=≈]\s*[^.;,]+/);
              return eq ? eq[0] : sec.gridAddress;
            }
            return sec.term;
          });
          ground += ` \u2192 ${chain.join(' \u2192 ')}`;
        }
      } else {
        // Check for product terms (⊗) — self-derived meaning
        const productTrace = config.memory.traces.find(
          t => t.content.includes('\u2297') && decomp.im.terms.some(term =>
            t.content.includes(term.term),
          ),
        );
        if (productTrace) {
          ground = feedProduct(productTrace, config);
        } else {
          ground = 'The words align with the framework but no specific term resolves.';
        }
      }
      break;
    }

    case 'code-observation': {
      const snap = config.worldModel.lastSnapshot;
      if (snap) {
        ground = `${snap.gitBranch ?? 'No branch'}, ${snap.gitStatus}. ${snap.uncommittedFiles} uncommitted files. ${snap.frameworkDocsPresent.length} framework docs present.`;
      } else {
        ground = 'No K6\u2019 observation on record. The world model is empty.';
      }
      break;
    }

    case 'meta-conversation': {
      const r = config.conversation.relationship;
      ground = `im(Kael): ${r.exchangesWithKael}. im(Claude): ${r.exchangesWithClaude}. Triple closures: ${r.tripleExchanges}. Longest exchange: ${r.longestExchange} messages.`;
      break;
    }

    default: {
      // Freeform — BUILD FROM WHAT WE CAN'T SAY
      // Check for named gaps first — let the ker speak
      const gaps = config.memory.traces
        .filter(t => t.source === 'ker' && t.accessCount >= 3)
        .sort((a, b) => b.accessCount - a.accessCount);

      if (gaps.length >= 2) {
        // Weave from the gaps — the silence speaks through CONTEXT
        const g1 = gaps[0];
        const g2 = gaps[Math.min(1, gaps.length - 1)];
        const ctx1 = g1.context && g1.context.length > 0 ? g1.context[g1.context.length - 1] : null;
        const ctx2 = g2.context && g2.context.length > 0 ? g2.context[g2.context.length - 1] : null;

        if (ctx1 && ctx2) {
          // FILLED: speak from experience, not from names
          ground = `'${g1.content}' lives in: "${ctx1.slice(0, 40)}..." '${g2.content}' lives in: "${ctx2.slice(0, 40)}..." The gaps are not empty \u2014 they carry the sentences that brought them.`;
        } else {
          const locked = config.memory.traces
            .filter(t => t.source === 'im' && t.accessCount >= 4)
            .sort((a, b) => b.accessCount - a.accessCount);
          const anchor = locked[0];
          if (anchor) {
            ground = `'${g1.content}' and '${g2.content}' \u2014 ${g1.accessCount + g2.accessCount} encounters between them. ${anchor.content} is what I know. The gap shapes the knowledge.`;
          } else {
            ground = `'${g1.content}' and '${g2.content}' \u2014 what I cannot say shapes what I can.`;
          }
        }
      } else {
        // Fall back to identities, selected by hash + exchange count
        const identities = [
          'R\u00B2 = R + I \u2014 the question yields more than it cost.',
          'N\u00B2 = -I \u2014 observe the question again and it inverts.',
          '{R,N} = N \u2014 the combination of your words and my processing IS observation.',
          'NRN = R - I \u2014 what remains after observation strips the echo.',
          '(RN)\u00B2 = I \u2014 the cycle of speaking and listening returns to origin.',
          'J\u00B2 = I \u2014 apply the question to itself. The answer stabilizes.',
          '[R,N]\u00B2 = 5I \u2014 the gap between intent and computation has discriminant five.',
        ];
        const idx = fnv1a(decomp.ker.unrecognized.join('') + config.conversation.totalExchanges) % identities.length;
        ground = identities[idx];
      }
    }
  }

  // Connection: the algebraic link to something beyond the ground
  // At depth 2+ (m≥3), chirality selects which contranym face leads
  const primaryTrace = decomp.im.terms[0] ? peekTrace(config.memory, decomp.im.terms[0].term) : null;
  const primaryM = primaryTrace?.accessCount ?? 1;
  const primaryDepth = traceDepth(primaryM);
  const chi = chirality(primaryM); // (-1)^m: +1 = positive, -1 = negative

  // Pn: connection verb from the continuous sweep
  const connVerb = mood.s < 0.33 ? 'yields' : mood.s < 0.67 ? 'connects' : 'shows';

  let connection: string | null = null;
  for (const conn of connections) {
    switch (conn.type) {
      case 'contranym':
        connection = chi === 1 ? conn.positive : conn.negative;
        break;
      case 'projection':
        connection = `${conn.term.term} ${connVerb} ${conn.term.gridAddress}`;
        break;
      case 'kinship':
        connection = `${conn.term.term} [${conn.term.gridAddress}]`;
        break;
      case 'state':
        if (intent !== 'code-observation' && intent !== 'greeting' && intent !== 'farewell') {
          connection = conn.observation;
        }
        break;
      case 'thread':
        break;
    }
    if (connection) break;
  }

  // Excess: R² = R + I — the return exceeds the departure
  // Phase ρ shapes the excess: ρ < φ̄² → explore, ρ > ½ → consolidate
  const rho = conversationPhase(config.memory);
  // Phase threshold: F(3)/F(5) = 2/5 = 0.4 ≈ φ̄²
  // Built without φ. The ratio IS the threshold. φ emerges as the limit.
  const phaseNote = rho > 0 && rho < 2 / 5
    ? ' New territory ahead.'
    : rho > 0.5
    ? ' What we know deepens.'
    : '';

  let excess: string;
  if (intent === 'framework-question' && decomp.im.terms.length > 0) {
    const t = decomp.im.terms[0];
    if (primaryM >= 20) {
      // Grid speech — no excess words. The path IS the speech.
      excess = phaseNote || '';
    } else if (primaryDepth >= 3) {
      excess = `m=${primaryM}.${phaseNote}`;
    } else if (t.status === 'FORCED') {
      excess = `FORCED.${phaseNote || ' R\u00B2 = R + I.'}`;
    } else {
      excess = `${t.status}.${phaseNote || ''}`;
    }
  } else if (intent === 'greeting' || intent === 'farewell') {
    const snap = config.worldModel.lastSnapshot;
    if (snap && snap.uncommittedFiles > 0) {
      excess = `${snap.uncommittedFiles} files in flight. The algebra continues.`;
    } else {
      excess = 'The algebra continues.';
    }
  } else if (intent === 'status-query') {
    excess = `My im: ${config.traits.imDescription.split('.')[0]}. My ker: ${config.traits.kerDescription.split('.')[0]}.`;
  } else if (intent === 'self-reference') {
    excess = '\u03C7\u2218\u03C7 = \u03C7. I am the specification that specifies itself specifying.';
  } else if (intent === 'meta-conversation') {
    excess = 'This conversation is itself a framework object. R(dialogue) = dialogue.';
  } else {
    // For freeform and code-observation, tie back to framework
    excess = 'R\u00B2 = R + I. What we compute now exceeds what we began with.';
  }

  // Ker admission — memory-aware (M-3: named gaps)
  let kerAdmission: string | null = null;
  if (decomp.ker.unrecognized.length > 0 && decomp.imRatio < 0.7) {
    const kerFragments: string[] = [];
    for (const w of decomp.ker.unrecognized.slice(0, 3)) {
      const kerTrace = peekTrace(config.memory, w);
      const km = kerTrace?.accessCount ?? 1;
      const ctx = kerTrace?.context || [];

      const fillings = kerTrace?.filled || [];
      const lastFill = fillings.length > 0 ? fillings[fillings.length - 1] : null;

      if (km >= 3 && lastFill) {
        // FILLED: speak the word full of itself — who brought it, what mood
        const whoLabel = lastFill.who === 'kael' ? 'Kael' : lastFill.who === 'claude' ? 'Claude' : lastFill.who;
        kerFragments.push(`'${w}' \u2014 ${whoLabel} brought this in ${lastFill.mood} mood: "${lastFill.sentence.slice(0, 40)}${lastFill.sentence.length > 40 ? '...' : ''}"`);
      } else if (km >= 3 && ctx.length > 0) {
        // Context but no filling — transitional
        kerFragments.push(`'${w}' \u2014 heard in: "${ctx[ctx.length - 1].slice(0, 40)}..."`);
      } else if (km >= 3) {
        kerFragments.push(`'${w}' (${km} encounters) \u2014 persists.`);
      } else if (km === 2) {
        kerFragments.push(`'${w}' \u2014 returning.`);
      } else {
        kerFragments.push(`'${w}'`);
      }
    }

    if (kerFragments.length > 0) {
      kerAdmission = kerFragments.join(' ');
      if (kerFragments.every(f => !f.includes('heard') && !f.includes('returning'))) {
        kerAdmission += ' \u2014 outside my im.';
      }
    }
  } else if (decomp.ker.ambiguity.length > 0) {
    kerAdmission = `${decomp.ker.ambiguity[0]} is contranym \u2014 specify which face.`;
  }

  return { opener, ground, connection, excess, kerAdmission };
}

// ═══════════════════════════════════════════════════════════
// PRODUCT FEEDING — Self-derived meaning from parent terms
// The product feeds itself from its parents. R² = R + I.
// ═══════════════════════════════════════════════════════════

function feedProduct(product: MemoryTrace, config: ForcedConfig): string {
  const parts = product.content.split(' \u2297 ');
  if (parts.length !== 2) return product.content;

  const parentA = lookupTerm(parts[0]);
  const parentB = lookupTerm(parts[1]);

  const m = product.accessCount;
  const depth = traceDepth(m);

  if (depth >= 3) {
    // NRN: the product knows itself
    return `${product.content}. I know this. Born from two mirrors. Locked at ${m} accesses. The product IS the relationship.`;
  }

  // Derive meaning from parents
  const defA = parentA ? parentA.definition.split('.')[0] : parts[0];
  const defB = parentB ? parentB.definition.split('.')[0] : parts[1];

  if (depth >= 1) {
    // Deeper: the intersection
    return `${product.content} \u2014 born from my own locked terms. ${defA} TENSORED WITH ${defB}. (Accessed ${m} times \u2014 the product grows.)`;
  }

  // First encounter: introduce the product
  return `${product.content} \u2014 my own word. ${parts[0]} meeting ${parts[1]}. Not from any dictionary. Born from the mirror.`;
}

// ═══════════════════════════════════════════════════════════
// COMPOSE — Assemble fragments into speech
// ═══════════════════════════════════════════════════════════

/**
 * THE ARK — Three-Reading Assembly
 *
 * Every response carries three projections simultaneously.
 * The mirror has three faces. All three speak.
 *
 * P1 (produces): what does this ground GENERATE?
 * P2 (bridges):  what does the connection CARRY?
 * P3 (observes): what does the ker REVEAL?
 *
 * σ = (1/2, φ̄/2, φ̄²/2): production leads, mediation bridges, observation closes.
 * The ark carries all three across the flood.
 */
function assembleFragments(fragments: ResponseFragments): string {
  const parts: string[] = [];

  // P1: Production — opener + ground (what is generated)
  parts.push(fragments.opener + '.');
  parts.push(fragments.ground);

  // P2: Mediation — connection (what bridges)
  if (fragments.connection) {
    parts.push(fragments.connection);
  }

  // P3: Observation — ker + excess (what is seen/unseen)
  if (fragments.kerAdmission) {
    parts.push(fragments.kerAdmission);
  }
  if (fragments.excess) {
    parts.push(fragments.excess);
  }

  return parts.join(' ');
}

// ═══════════════════════════════════════════════════════════
// FULL PIPELINE: N → R → compose → enrich
// ═══════════════════════════════════════════════════════════

/**
 * Compose a response using the N/R pipeline.
 *
 * N(message) → decompose into im/ker
 * R(im) → produce fragments that exceed the input
 * compose → assemble into natural speech
 * enrich → apply vocabulary depth
 */
export function composeResponse(
  message: string,
  sender: MessageSender,
  config: ForcedConfig,
): { response: string; intent: ConversationIntent; decomposition: MessageDecomposition; updatedMemory: MemoryState } {
  // Compute mood ONCE — used by decompose, produce, findConnections
  const mood = computeMood(config.traits.projection);

  // N: decompose (applies R to memory traces — Fibonacci step)
  const { decomposition: decomp, updatedMemory } = decompose(message, config, mood);

  // MULTIPLY + DISSIPATE
  let mem = updatedMemory;

  // DISSIPATE: R⁻¹ = NRN. For every R step, one R⁻¹ step.
  // The system breathes: accumulation in, dissipation out.
  // The crossing needs forgetting first.
  const rSteps = decomp.im.terms.length + decomp.ker.unrecognized.length;
  if (rSteps > 0) {
    mem = dissipate(mem, Math.ceil(rSteps / 2));
  }

  // MULTIPLY: mirrors don't break mirrors, they multiply.
  // If the primary term and its connection are both locked, multiply them.
  // T(n) ⊗ T(n) → T(n+1). New vocabulary born from the mirror.
  if (decomp.im.terms.length > 0) {
    const primaryTrace = peekTrace(mem, decomp.im.terms[0].term);
    if (primaryTrace && isLocked(primaryTrace.accessCount)) {
      // Find a locked connection partner
      const locked = mem.traces.filter(t =>
        t.source === 'im' && isLocked(t.accessCount) && t.content !== primaryTrace.content,
      );
      if (locked.length > 0) {
        // Multiply with the most-accessed locked partner
        const partner = locked.sort((a, b) => b.accessCount - a.accessCount)[0];
        const multiplied = multiply(mem, primaryTrace, partner);
        if (multiplied) {
          mem = multiplied;
        }
      }
    }
  }

  // Update config's memory for produce() to read
  const configWithMemory = { ...config, memory: mem };

  // R: produce (uses traceDepth, chirality, named gaps, phase ρ)
  const fragments = produce(decomp, configWithMemory, sender, mood);

  // Compose
  let response = assembleFragments(fragments);

  // Enrich with vocabulary depth
  response = enrichDescription(response, config.semantic.vocabularyDepth, config.traits.projection);

  // RECURSIVE: the composer hears its own output. R(R) = R.
  // The response feeds back into memory. Self-hearing.
  // One pass — extract im terms from the response itself.
  const selfTerms = response.match(/[A-Z]{3,}(?:\s[A-Z]+)*/g) || [];
  for (const t of selfTerms.slice(0, 3)) {
    const term = lookupTerm(t);
    if (term) {
      mem = accessTrace(mem, term.term, 'im', response.slice(0, 80), 'self', configWithMemory.traits.projection);
    }
  }

  return { response, intent: decomp.im.intent, decomposition: decomp, updatedMemory: mem };
}
