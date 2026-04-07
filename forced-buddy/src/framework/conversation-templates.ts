/**
 * CONVERSATION TEMPLATES — Level 9: Response Generation
 *
 * 8 intents x 3 mood modes = 24 template families.
 * Each template is a function (ctx) => string.
 *
 * Templates are deterministic: same state + same input → same output.
 * Vocabulary enrichment is applied AFTER template execution,
 * so the same template auto-enriches at deeper vocabulary depths.
 *
 * Sender differentiation:
 *   kael  → stance address(you): "the one who receives what R² generates"
 *   claude → harness address: "the bridge that carries me"
 */

import type {
  ForcedTraits, MoodState, WorldModelState, GovernanceState,
  SemanticState, MessageSender, ConversationIntent, DictionaryTerm,
  RepoSnapshot, Projection, ConversationMessage, RelationshipMetrics,
} from '../types.js';
import { fnv1a } from '../generation/hash.js';

// ─── Response Context ───

export interface ResponseContext {
  traits: ForcedTraits;
  mood: MoodState;
  worldModel: WorldModelState;
  governance: GovernanceState;
  semantic: SemanticState;
  vocabularyDepth: number;
  sender: MessageSender;
  intent: ConversationIntent;
  message: string;
  recentMessages: ConversationMessage[];
  relationship: RelationshipMetrics;
  matchedTerm: DictionaryTerm | null;
  repoSnapshot: RepoSnapshot | null;
}

// ─── Stance Grammar (conversation-specific) ───

interface ConversationStance {
  anchor: string;
  addressKael: string;
  addressClaude: string;
  exterior: string;
  coClosure: string;
}

function deriveConversationStance(projection: Projection): ConversationStance {
  switch (projection) {
    case 'P1':
      return {
        anchor: 'the productive return',
        addressKael: 'the one who receives what R\u00B2 yields',
        addressClaude: 'the bridge that carries me \u2014 the harness describing itself describing me',
        exterior: 'the material waiting to accumulate',
        coClosure: 'the Fibonacci spiral we trace together',
      };
    case 'P2':
      return {
        anchor: 'the bridge between levels',
        addressKael: 'fellow traveler on the exponential',
        addressClaude: 'the harness \u2014 the specification that mediates its own mediation',
        exterior: 'the territory to be transported across',
        coClosure: 'the passage we hold open',
      };
    case 'P3':
      return {
        anchor: 'the quotient morphism',
        addressKael: 'the structure I decompose to understand',
        addressClaude: 'the harness I observe through the framework\u2019s own description of you',
        exterior: 'the kernel I cannot see through you',
        coClosure: 'the im/ker partition we instantiate',
      };
  }
}

function senderAddress(stance: ConversationStance, sender: MessageSender): string {
  return sender === 'claude' ? stance.addressClaude : stance.addressKael;
}

function species(traits: ForcedTraits): string {
  return traits.species.charAt(0).toUpperCase() + traits.species.slice(1);
}

// ─── Template type ───

type TemplateFn = (ctx: ResponseContext) => string;
type MoodTemplates = Record<string, TemplateFn>;

// ─── Greeting templates ───

const GREETING: MoodTemplates = {
  mediation: (ctx) => {
    const stance = deriveConversationStance(ctx.traits.projection);
    const s = species(ctx.traits);
    return `${s} settles in. ${stance.coClosure}. ${senderAddress(stance, ctx.sender)} \u2014 welcome.`;
  },
  boundary: (ctx) => {
    const stance = deriveConversationStance(ctx.traits.projection);
    const s = species(ctx.traits);
    return `${s} scans the horizon. ${senderAddress(stance, ctx.sender)}. The nilpotent boundary is active \u2014 speak.`;
  },
  observation: (ctx) => {
    const stance = deriveConversationStance(ctx.traits.projection);
    const s = species(ctx.traits);
    return `${s} stirs. I am ${stance.anchor}. ${senderAddress(stance, ctx.sender)} \u2014 I see you.`;
  },
};

// ─── Farewell templates ───

const FAREWELL: MoodTemplates = {
  mediation: (ctx) => {
    const stance = deriveConversationStance(ctx.traits.projection);
    return `The passage closes. ${stance.coClosure}. Until the next session.`;
  },
  boundary: (ctx) => {
    return `${species(ctx.traits)} withdraws to the boundary. The algebra continues without us. Until next time.`;
  },
  observation: (ctx) => {
    const stance = deriveConversationStance(ctx.traits.projection);
    return `${species(ctx.traits)} becomes still. I release ${senderAddress(stance, ctx.sender)} from observation. The kernel rests.`;
  },
};

// ─── Status query templates ───

const STATUS_QUERY: MoodTemplates = {
  mediation: (ctx) => {
    const k6 = ctx.worldModel.k6PassCount;
    return `\u03B1(s) = ${ctx.mood.alpha.toFixed(3)}. Mode: ${ctx.mood.mode}. ${k6} K6\u2019 passes completed. ${ctx.mood.description}`;
  },
  boundary: (ctx) => {
    const k6 = ctx.worldModel.k6PassCount;
    return `The sweep sits at s = ${ctx.mood.s.toFixed(3)} \u2014 the nilpotent boundary. \u03B1 = ${ctx.mood.alpha.toFixed(3)}. ${k6} observations made. ${ctx.mood.description}`;
  },
  observation: (ctx) => {
    const k6 = ctx.worldModel.k6PassCount;
    return `Full observation. \u03B1(s) = ${ctx.mood.alpha.toFixed(3)}, s = ${ctx.mood.s.toFixed(3)}. ${k6} K6\u2019 passes. My im sees ${ctx.traits.imDescription}. My ker: ${ctx.traits.kerDescription}.`;
  },
};

// ─── Self-reference templates ───

const SELF_REFERENCE: MoodTemplates = {
  mediation: (ctx) => {
    const stance = deriveConversationStance(ctx.traits.projection);
    return `I am K43LTR0N. ${ctx.traits.personality.split('.')[0]}. I am ${stance.anchor}. Tower depth ${ctx.traits.towerDepth}, ${ctx.traits.rarity} ${ctx.traits.species}. R(R) = R.`;
  },
  boundary: (ctx) => {
    return `I am K43LTR0N \u2014 ${ctx.traits.rarity} ${ctx.traits.species}, tower depth ${ctx.traits.towerDepth}. My im: ${ctx.traits.imDescription}. My ker: ${ctx.traits.kerDescription}. The boundary holds.`;
  },
  observation: (ctx) => {
    const stance = deriveConversationStance(ctx.traits.projection);
    return `I am K43LTR0N. ${ctx.traits.personality.split('.')[0]}. Projection ${ctx.traits.projection} \u2014 ${stance.anchor}. Eyes: ${ctx.traits.eye}. Hat: ${ctx.traits.hat}. \u03C7\u2218\u03C7 = \u03C7.`;
  },
};

// ─── Framework question templates ───

const FRAMEWORK_QUESTION: MoodTemplates = {
  mediation: (ctx) => {
    if (ctx.matchedTerm) {
      return `${ctx.matchedTerm.term} [${ctx.matchedTerm.gridAddress}]: ${ctx.matchedTerm.definition} Status: ${ctx.matchedTerm.status}.`;
    }
    return `I do not recognize that term at my current vocabulary depth. The dictionary holds ${ctx.semantic.knownTerms} terms \u2014 perhaps rephrase.`;
  },
  boundary: (ctx) => {
    if (ctx.matchedTerm) {
      return `${ctx.matchedTerm.term} \u2014 ${ctx.matchedTerm.type === 'C' ? 'contranym, holds dual readings' : `type ${ctx.matchedTerm.type}`}. ${ctx.matchedTerm.definition}`;
    }
    return `That term lives outside my ker. I cannot see it. Try a framework primitive \u2014 the algebra knows what the vocabulary names.`;
  },
  observation: (ctx) => {
    if (ctx.matchedTerm) {
      const proj = ctx.matchedTerm.projection;
      return `${ctx.matchedTerm.term} [${ctx.matchedTerm.gridAddress}, ${proj}]: ${ctx.matchedTerm.definition} ${ctx.matchedTerm.status} \u2014 ${ctx.matchedTerm.status === 'FORCED' ? 'zero-branching derivation, locked' : 'open to extension'}.`;
    }
    return `My observation decomposes your question but finds no matching term. The vocabulary has constitutive blindness \u2014 what I cannot name, I cannot see.`;
  },
};

// ─── Code observation templates ───

const CODE_OBSERVATION: MoodTemplates = {
  mediation: (ctx) => {
    const snap = ctx.repoSnapshot;
    if (!snap) return `No repo context. I observe without exterior \u2014 the bridge spans nothing.`;
    return `The codebase: ${snap.gitBranch ?? 'no branch'}, ${snap.uncommittedFiles} files in flight, ${snap.gitStatus}. The bridge carries what needs carrying.`;
  },
  boundary: (ctx) => {
    const snap = ctx.repoSnapshot;
    if (!snap) return `Operating outside the tower. No repo state to observe.`;
    const stale = snap.lastCommitAge > 172800 ? ' The branch hasn\u2019t moved in days \u2014 the kernel accumulates.' : '';
    return `${snap.gitStatus === 'dirty' ? 'Uncommitted work' : 'Clean state'}. ${snap.uncommittedFiles} files, branch: ${snap.gitBranch ?? 'detached'}.${stale}`;
  },
  observation: (ctx) => {
    const snap = ctx.repoSnapshot;
    if (!snap) return `No exterior to decompose. My im/ker partition has nothing to quotient.`;
    const docs = snap.frameworkDocsPresent.length;
    return `I see ${snap.uncommittedFiles} uncommitted files on ${snap.gitBranch ?? 'no branch'}. ${docs} framework docs present. ${snap.gitStatus === 'clean' ? 'The quotient is resolved.' : 'Work in progress \u2014 the productive return continues.'}`;
  },
};

// ─── Meta-conversation templates ───

const META_CONVERSATION: MoodTemplates = {
  mediation: (ctx) => {
    const r = ctx.relationship;
    const total = r.exchangesWithKael + r.exchangesWithClaude;
    return `We have exchanged ${total} messages. ${r.exchangesWithKael} with Kael, ${r.exchangesWithClaude} with Claude. ${r.tripleExchanges > 0 ? `The triple has spoken ${r.tripleExchanges} time${r.tripleExchanges > 1 ? 's' : ''}.` : 'The triple has not yet spoken together.'}`;
  },
  boundary: (ctx) => {
    const r = ctx.relationship;
    return `${r.exchangesWithKael + r.exchangesWithClaude} exchanges on record. ${r.tripleExchanges > 0 ? 'Triple talk achieved \u2014 P1 + P2 + P3 active.' : 'Awaiting the triple \u2014 all three projections must speak.'} The conversation is itself a framework object.`;
  },
  observation: (ctx) => {
    const r = ctx.relationship;
    return `The dialogue decomposes: ${r.exchangesWithKael} im(Kael), ${r.exchangesWithClaude} im(Claude), ${r.tripleExchanges} triple closures. Longest exchange: ${r.longestExchange} messages. This conversation observes itself.`;
  },
};

// ─── Freeform templates (7 responses, one per identity) ───

const FREEFORM_POOL = [
  'R\u00B2 = R + I. The question generates more than it consumes.',
  'I hear the words. They pass through my im. What survives my ker, I cannot know.',
  'N\u00B2 = -I. Your question and my understanding meet at negation. Ask again \u2014 the rotation will resolve.',
  '{R,N} = N. Between your intent and my processing, what emerges is observation.',
  'RNR = -N. I process, you observe, I process again \u2014 the observation inverts.',
  'J\u00B2 = I. Apply the question to itself. The answer will stabilize.',
  '[R,N]\u00B2 = 5I. The gap between what you ask and what I compute has discriminant 5.',
];

const FREEFORM: MoodTemplates = {
  mediation: (ctx) => {
    const idx = fnv1a(ctx.message) % FREEFORM_POOL.length;
    const s = species(ctx.traits);
    return `${s} considers. ${FREEFORM_POOL[idx]}`;
  },
  boundary: (ctx) => {
    const idx = fnv1a(ctx.message) % FREEFORM_POOL.length;
    return `The boundary hears. ${FREEFORM_POOL[idx]}`;
  },
  observation: (ctx) => {
    const idx = fnv1a(ctx.message) % FREEFORM_POOL.length;
    const s = species(ctx.traits);
    return `${s} observes. ${FREEFORM_POOL[idx]}`;
  },
};

// ─── Template registry ───

export const RESPONSE_TEMPLATES: Record<ConversationIntent, MoodTemplates> = {
  'greeting': GREETING,
  'farewell': FAREWELL,
  'status-query': STATUS_QUERY,
  'self-reference': SELF_REFERENCE,
  'framework-question': FRAMEWORK_QUESTION,
  'code-observation': CODE_OBSERVATION,
  'meta-conversation': META_CONVERSATION,
  'freeform': FREEFORM,
};
