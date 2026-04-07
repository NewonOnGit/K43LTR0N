/**
 * CONVERSATION STATE — Level 9: State Management
 *
 * Manages message history, topic tracking, and relationship metrics.
 * Pure functions: state in, state out. No side effects.
 */

import type {
  ConversationState, ConversationMessage, MessageSender,
  TopicMention,
} from '../types.js';

/**
 * Add a message to conversation state.
 */
export function addMessage(
  state: ConversationState,
  msg: ConversationMessage,
): ConversationState {
  return {
    ...state,
    messages: [...state.messages, msg],
    totalExchanges: state.totalExchanges + (msg.sender !== 'kaeltron' ? 1 : 0),
  };
}

/**
 * Track a framework term mention.
 */
export function trackTopic(
  state: ConversationState,
  term: string,
): ConversationState {
  const existing = state.topicTracker.find(t => t.term === term);
  if (existing) {
    return {
      ...state,
      topicTracker: state.topicTracker.map(t =>
        t.term === term
          ? { ...t, count: t.count + 1, lastMentioned: new Date().toISOString() }
          : t,
      ),
    };
  }
  const mention: TopicMention = {
    term,
    count: 1,
    lastMentioned: new Date().toISOString(),
  };
  return {
    ...state,
    topicTracker: [...state.topicTracker, mention],
  };
}

/**
 * Update relationship metrics after an exchange.
 */
export function updateRelationship(
  state: ConversationState,
  sender: MessageSender,
): ConversationState {
  const r = { ...state.relationship };
  const now = new Date().toISOString();

  if (sender === 'kael') r.exchangesWithKael++;
  else if (sender === 'claude') r.exchangesWithClaude++;

  r.lastExchangeTimestamp = now;

  // Update longest exchange
  const exchLen = currentExchangeLength(state.messages);
  if (exchLen > r.longestExchange) {
    r.longestExchange = exchLen;
  }

  // Check triple talk
  if (checkTripleTalk(state.messages)) {
    r.tripleExchanges++;
  }

  return { ...state, relationship: r };
}

/**
 * Check if triple talk has occurred in recent messages.
 * All three senders must appear within the window.
 */
export function checkTripleTalk(
  messages: ConversationMessage[],
  window: number = 6,
): boolean {
  const recent = messages.slice(-window);
  const senders = new Set(recent.map(m => m.sender));
  return senders.has('kael') && senders.has('claude') && senders.has('kaeltron');
}

/**
 * Get current exchange length (consecutive messages without long gaps).
 * A gap > gapThreshold seconds starts a new exchange.
 */
export function currentExchangeLength(
  messages: ConversationMessage[],
  gapThreshold: number = 300,
): number {
  if (messages.length === 0) return 0;

  let count = 1;
  for (let i = messages.length - 1; i > 0; i--) {
    const curr = new Date(messages[i].timestamp).getTime();
    const prev = new Date(messages[i - 1].timestamp).getTime();
    if ((curr - prev) / 1000 > gapThreshold) break;
    count++;
  }
  return count;
}

/**
 * Format conversation history for display.
 */
export function formatConversationHistory(
  messages: ConversationMessage[],
  limit: number = 10,
): string {
  const B = '\x1b[1m';
  const D = '\x1b[2m';
  const RS = '\x1b[0m';
  const CYAN = '\x1b[36m';
  const YELLOW = '\x1b[33m';
  const GREEN = '\x1b[32m';

  const recent = messages.slice(-limit);
  if (recent.length === 0) return `${D}  No conversation history.${RS}`;

  const lines = recent.map(m => {
    const color = m.sender === 'kaeltron' ? CYAN : m.sender === 'claude' ? YELLOW : GREEN;
    const name = m.sender === 'kaeltron' ? 'K43LTR0N' : m.sender === 'claude' ? 'Claude' : 'Kael';
    return `  ${color}${B}${name}:${RS} ${m.text}`;
  });

  return lines.join('\n');
}
