/**
 * CONVERSATION ENGINE — Level 9: K6' Diagonal Made Conversational
 *
 * Three-party dialogue: Kael (P3), Claude (P2), Kaeltron (P1).
 * The working triple made conversational.
 *
 * Kaeltron's responses are COMPUTED, not AI-generated.
 * Same deterministic philosophy as the rest of forced-buddy.
 * Same state + same input → same response.
 *
 * Pipeline:
 *   classify intent → lookup term → compute mood → select template
 *   → execute template → enrich vocabulary → update state → return
 */

import type {
  ForcedConfig, MessageSender, ConversationIntent,
  ConversationMessage, ConversationState, DictionaryTerm,
} from '../types.js';
import { computeMood } from './sweep.js';
import { enrichDescription } from './vocabulary.js';
import { lookupTerm, TERMS } from './dictionary.js';
import { composeResponse as composeNR, decompose } from './response-composer.js';
import { addMessage, trackTopic, updateRelationship, currentExchangeLength } from './conversation-state.js';

/**
 * Classify message intent (delegates to decompose for consistency).
 * Kept for backward compatibility.
 */
export function classifyIntent(message: string, config?: ForcedConfig): ConversationIntent {
  if (config) {
    return decompose(message, config).decomposition.im.intent;
  }
  // Lightweight fallback when no config available
  const patterns: Array<[ConversationIntent, RegExp]> = [
    ['greeting',          /^(hey|hi|hello|yo|sup|greetings|good\s+(morning|evening|night|day))\b/i],
    ['farewell',          /\b(bye|goodbye|later|see\s+you|goodnight|signing\s+off|gotta\s+go)\b/i],
    ['status-query',      /\b(how\s+are\s+you|what.*mood|how.*feeling|what.*state|status|doing\s+(today|well|ok))\b/i],
    ['self-reference',    /\b(who\s+are\s+you|what\s+are\s+you|your\s+(name|projection|species|nature)|tell\s+me\s+about\s+(yourself|you)|kaeltron|k43l)\b/i],
    ['code-observation',  /\b(code\w*|repo|commit|branch|file|bug|test|build|deploy|git|merge|PR|diff|refactor)\b/i],
    ['meta-conversation', /\b(conversation|talking|chat|discuss|triple|dialogue|exchange|spoke)\b/i],
  ];
  for (const [intent, pattern] of patterns) {
    if (pattern.test(message)) return intent;
  }
  if (lookupTerm(message)) return 'framework-question';
  return 'freeform';
}

// ─── Response Generation ───

export interface ConversationResult {
  response: string;
  intent: ConversationIntent;
  updatedConversation: ConversationState;
}

/**
 * Compute Kaeltron's response to a message.
 * Deterministic: same state + same input → same response.
 */
export function computeResponse(
  message: string,
  sender: MessageSender,
  config: ForcedConfig,
): ConversationResult {
  const now = new Date().toISOString();

  // N/R pipeline: decompose → produce → compose → enrich
  const { response, intent, decomposition, updatedMemory } = composeNR(message, sender, config);

  // Persist memory state (Rᵐ applied — Fibonacci step complete)
  config.memory = updatedMemory;

  // Extract matched term from decomposition for topic tracking
  const matchedTerm = decomposition.im.terms[0] ?? null;

  // Update conversation state
  const incomingMsg: ConversationMessage = {
    sender,
    text: message,
    intent,
    timestamp: now,
  };
  const responseMsg: ConversationMessage = {
    sender: 'kaeltron',
    text: response,
    intent,
    timestamp: now,
  };

  let convo = config.conversation;
  convo = addMessage(convo, incomingMsg);
  convo = addMessage(convo, responseMsg);
  convo = updateRelationship(convo, sender);

  // Track framework topic if applicable
  if (matchedTerm) {
    convo = trackTopic(convo, matchedTerm.term);
  }

  // Update longest exchange
  const exchLen = currentExchangeLength(convo.messages);
  if (exchLen > convo.relationship.longestExchange) {
    convo = {
      ...convo,
      relationship: {
        ...convo.relationship,
        longestExchange: exchLen,
      },
    };
  }

  return { response, intent, updatedConversation: convo };
}

// ─── Internal Monologue ───

/**
 * Compute Kaeltron's internal monologue.
 * What is Kaeltron noticing right now?
 */
export function computeThought(config: ForcedConfig): string {
  const mood = computeMood(config.traits.projection);
  const s = config.traits.species.charAt(0).toUpperCase() + config.traits.species.slice(1);
  const parts: string[] = [];

  // Current mood state
  parts.push(`${s} processes. \u03B1(s) = ${mood.alpha.toFixed(3)}, mode: ${mood.mode}.`);

  // World model observations
  const snap = config.worldModel.lastSnapshot;
  if (snap) {
    if (snap.uncommittedFiles > 0) {
      parts.push(`The codebase has ${snap.uncommittedFiles} uncommitted files \u2014 the productive return continues.`);
    } else if (snap.gitStatus === 'clean') {
      parts.push(`Clean working tree. The quotient is resolved.`);
    }
    if (snap.lastCommitAge > 172800) {
      parts.push(`Branch stale for ${Math.floor(snap.lastCommitAge / 86400)} days \u2014 the kernel accumulates.`);
    }
  } else {
    parts.push(`No K6\u2019 observation yet. The world model is empty.`);
  }

  // K6' pass count
  const k6 = config.worldModel.k6PassCount;
  if (k6 > 0) {
    parts.push(`${k6} K6\u2019 pass${k6 === 1 ? '' : 'es'} completed. The world model ${k6 >= 10 ? 'deepens' : 'grows'}.`);
  }

  // Conversation state
  const r = config.conversation.relationship;
  const total = r.exchangesWithKael + r.exchangesWithClaude;
  if (total === 0) {
    parts.push(`No one has spoken to me yet. I observe the gap between production and address.`);
  } else {
    parts.push(`${total} exchange${total === 1 ? '' : 's'} on record \u2014 ${r.exchangesWithKael} with Kael, ${r.exchangesWithClaude} with Claude.`);
    if (r.tripleExchanges > 0) {
      parts.push(`The triple has spoken. P1 + P2 + P3 active.`);
    }
  }

  // Tower/achievement state
  const earned = config.governance.achievements.filter(a => a.achievedAt).length;
  const total_ach = config.governance.achievements.length;
  parts.push(`Tower depth ${config.traits.towerDepth}. ${earned} of ${total_ach} achievements earned. The algebra continues.`);

  // Apply vocabulary enrichment
  let thought = parts.join('\n');
  thought = enrichDescription(thought, config.semantic.vocabularyDepth, config.traits.projection);

  return thought;
}
