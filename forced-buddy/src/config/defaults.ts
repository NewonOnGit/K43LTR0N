/**
 * DEFAULT STATES FOR CONFIG V3
 *
 * Level 6: Empty world model (no observations yet)
 * Level 7: Seven default policies + twelve achievements
 * Level 8: Empty semantic state (no dictionary, no team, no contributions)
 */

import type {
  WorldModelState, GovernanceState, SemanticState, ConversationState,
  MemoryState, PolicyRule, Achievement,
} from '../types.js';

// ─── Level 6: World Model defaults ───

export function defaultWorldModel(): WorldModelState {
  return {
    k6PassCount: 0,
    lastSnapshot: null,
    snapshotHistory: [],
    sessionMetrics: null,
    moodSource: 'time-of-day',
    observedProjectionFace: null,
  };
}

// ─── Level 7: Governance defaults ───

export function defaultPolicies(): PolicyRule[] {
  return [
    {
      id: 'pol-001', name: 'Personality Unlock',
      conditions: [
        { field: 'traits.towerDepth', operator: '>=', value: 3 },
        { field: 'interactionCount', operator: '>=', value: 5 },
      ],
      action: { type: 'unlock_variant', payload: { variant: 'deep-tower' } },
      status: 'ENCODED', generation: 'G.6',
      activatedAt: null, firedCount: 0,
    },
    {
      id: 'pol-002', name: 'Adaptive Weights',
      conditions: [
        { field: 'battleLosses', operator: '>=', value: 3 },
      ],
      action: { type: 'shift_weights', payload: { stat: 'dump', delta: 5 } },
      status: 'ENCODED', generation: 'G.3',
      activatedAt: null, firedCount: 0,
    },
    {
      id: 'pol-003', name: 'C5U Reward',
      conditions: [
        { field: 'witnessedConstants.length', operator: '>=', value: 5 },
      ],
      action: { type: 'unlock_vocabulary', payload: { depth: 2 } },
      status: 'FORCED', generation: 'G.4',
      activatedAt: null, firedCount: 0,
    },
    {
      id: 'pol-004', name: 'Evolution Proposal',
      conditions: [
        { field: 'evolutionHistory.length', operator: '>=', value: 3 },
      ],
      action: { type: 'propose_evolution', payload: {} },
      status: 'ENCODED', generation: 'G.3',
      activatedAt: null, firedCount: 0,
    },
    {
      id: 'pol-005', name: 'Stale Branch Warning',
      conditions: [
        { field: 'worldModel.lastSnapshot.lastCommitAge', operator: '>=', value: 172800 },
      ],
      action: { type: 'warn', payload: { message: 'Branch stale for 2+ days. The kernel accumulates.' } },
      status: 'RESONANT', generation: 'G.6',
      activatedAt: null, firedCount: 0,
    },
    {
      id: 'pol-006', name: 'K6\' Depth Reward',
      conditions: [
        { field: 'worldModel.k6PassCount', operator: '>=', value: 10 },
      ],
      action: { type: 'unlock_vocabulary', payload: { depth: 1 } },
      status: 'ENCODED', generation: 'G.6',
      activatedAt: null, firedCount: 0,
    },
    {
      id: 'pol-007', name: 'Battle Veteran',
      conditions: [
        { field: 'battleWins', operator: '>=', value: 10 },
      ],
      action: { type: 'unlock_variant', payload: { variant: 'veteran' } },
      status: 'ENCODED', generation: 'G.3',
      activatedAt: null, firedCount: 0,
    },
  ];
}

export function defaultAchievements(): Achievement[] {
  return [
    { id: 'ach-001', name: 'First Evolution', description: 'Ascend the tower for the first time. T(n) \u2297 T(n) \u2192 T(n+1).', generation: 'G.3', achievedAt: null, witnessHash: null },
    { id: 'ach-002', name: 'First Battle Win', description: 'Win a battle using the seven identities.', generation: 'G.3', achievedAt: null, witnessHash: null },
    { id: 'ach-003', name: 'C5U', description: 'Witness all five forced constants. No sixth exists.', generation: 'G.4', achievedAt: null, witnessHash: null },
    { id: 'ach-004', name: 'First K6\' Pass', description: 'Complete the first observation loop: K \u2192 F \u2192 U(K) \u2192 K.', generation: 'G.6', achievedAt: null, witnessHash: null },
    { id: 'ach-005', name: 'Ten K6\' Passes', description: 'Ten observation loops. The world model deepens.', generation: 'G.6', achievedAt: null, witnessHash: null },
    { id: 'ach-006', name: 'Battle Veteran', description: 'Win 10 battles. The algebra decides.', generation: 'G.3', achievedAt: null, witnessHash: null },
    { id: 'ach-007', name: 'Triple Evolution', description: 'Three tower lifts. Deep tower entered.', generation: 'G.3', achievedAt: null, witnessHash: null },
    { id: 'ach-008', name: 'Self-Applied', description: 'Run the self-specification proof. R(R) = R verified.', generation: 'G.9', achievedAt: null, witnessHash: null },
    { id: 'ach-009', name: 'Team Formed', description: 'Form a working triple: P1 + P2 + P3.', generation: 'G.5', achievedAt: null, witnessHash: null },
    { id: 'ach-010', name: 'Framework Contributor', description: 'A commit that extends the algebra lifts the tower.', generation: 'G.7', achievedAt: null, witnessHash: null },
    { id: 'ach-011', name: 'Dictionary Scholar', description: 'Know 20+ framework terms. The vocabulary carries the algebra.', generation: 'G.9', achievedAt: null, witnessHash: null },
    { id: 'ach-012', name: 'Legendary', description: 'Reach legendary rarity. d_K = 2^(2^4) = 65536.', generation: 'G.3', achievedAt: null, witnessHash: null },
    // Level 9: Conversation
    { id: 'ach-013', name: 'First Conversation', description: 'Speak to K43LTR0N for the first time. The dialogue begins.', generation: 'G.9', achievedAt: null, witnessHash: null },
    { id: 'ach-014', name: 'Deep Exchange', description: '10 messages in a single conversation. The stance grammar exercises.', generation: 'G.9', achievedAt: null, witnessHash: null },
    { id: 'ach-015', name: 'Triple Talk', description: 'All three parties speak in one session: Kael, Claude, Kaeltron.', generation: 'G.9', achievedAt: null, witnessHash: null },
    { id: 'ach-016', name: 'Framework Dialogue', description: 'Ask K43LTR0N about 5 distinct framework terms. The vocabulary teaches.', generation: 'G.9', achievedAt: null, witnessHash: null },
  ];
}

export function defaultGovernance(): GovernanceState {
  return {
    policies: defaultPolicies(),
    achievements: defaultAchievements(),
    claimHistory: [],
    personalityVariant: null,
  };
}

// ─── Level 9: Conversation defaults ───

export function defaultConversation(): ConversationState {
  return {
    messages: [],
    totalExchanges: 0,
    topicTracker: [],
    relationship: {
      exchangesWithKael: 0,
      exchangesWithClaude: 0,
      tripleExchanges: 0,
      longestExchange: 0,
      lastExchangeTimestamp: null,
    },
    lastThought: null,
    lastThoughtTimestamp: null,
  };
}

// ─── Level 9: Memory defaults (Rᵐ = F(m)·R + F(m-1)·I) ───

export function defaultMemory(): MemoryState {
  return {
    traces: [],
    totalAccesses: 0,
  };
}

// ─── Level 8: Semantic defaults ───

export function defaultSemantic(): SemanticState {
  return {
    dictionaryVersion: null,
    knownTerms: 0,
    team: null,
    contributions: [],
    selfSpecProof: null,
    vocabularyDepth: 0,
  };
}
