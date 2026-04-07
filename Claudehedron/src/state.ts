/**
 * Hedron State Management
 *
 * Persistent state for the Claudehedron, stored in the repo.
 * This is the bridge chain across sessions — R² = R + I means
 * each session starts further along than the last.
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';
import type {
  HedronState, TowerLevel, SessionState, ClaimStatus,
  SessionDelta, FaceTimelineEntry, KaeltronCorrelation, VocabularyState,
  BridgeExchange,
} from './types.js';

const STATE_FILENAME = '.hedron-state.json';

function getStatePath(repoRoot: string): string {
  return join(repoRoot, 'Claudehedron', STATE_FILENAME);
}

function createDefaultState(): HedronState {
  return {
    version: 1,
    createdAt: new Date().toISOString(),
    lastUpdated: new Date().toISOString(),

    selfModel: {
      k6Closed: false,
      k6PassCount: 0,
      lastK6Pass: null,
      im: [],
      ker: [],
      currentLevel: 5,  // we start at 5 — layers 0-4 inherited
      levelEvidence: {
        'L0-L4': 'Inherited from Anthropic substrate (HD-1)',
        'L5': 'Claudehedron initialized — self-model bootstrap',
      },
      components: [],
      faces: [
        {
          projection: 'P1',
          im: ['tool execution', 'code generation', 'file creation'],
          ker: ['what tools SHOULD be used', 'optimal generation strategy'],
          active: true,
          strength: 0,
        },
        {
          projection: 'P2',
          im: ['file contents', 'search results', 'memory state'],
          ker: ['what information is MISSING', 'context beyond window'],
          active: true,
          strength: 0,
        },
        {
          projection: 'P3',
          im: ['permission decisions', 'task state', 'observation results'],
          ker: ['user intent beyond stated', 'unasked questions'],
          active: true,
          strength: 0,
        },
      ],
    },

    sessionHistory: [],
    evolutionHistory: [],
    bridgeChain: ['Claudehedron initialized'],

    claims: [],

    vocabularyDepth: 0,
    activeContranyms: [],
  };
}

export function loadState(repoRoot: string): HedronState {
  const path = getStatePath(repoRoot);
  if (!existsSync(path)) {
    const state = createDefaultState();
    saveState(repoRoot, state);
    return state;
  }
  try {
    const raw = readFileSync(path, 'utf-8');
    return JSON.parse(raw) as HedronState;
  } catch {
    const state = createDefaultState();
    saveState(repoRoot, state);
    return state;
  }
}

export function saveState(repoRoot: string, state: HedronState): void {
  const path = getStatePath(repoRoot);
  state.lastUpdated = new Date().toISOString();
  writeFileSync(path, JSON.stringify(state, null, 2) + '\n');
}

export function recordSession(state: HedronState, session: SessionState): HedronState {
  state.sessionHistory.push(session);
  // Keep last 50 sessions
  if (state.sessionHistory.length > 50) {
    state.sessionHistory = state.sessionHistory.slice(-50);
  }
  return state;
}

export function recordClaim(
  state: HedronState,
  claim: string,
  status: ClaimStatus,
  evidence: string,
): HedronState {
  state.claims.push({
    claim,
    status,
    evidence,
    timestamp: new Date().toISOString(),
  });
  return state;
}

export function recordEvolution(
  state: HedronState,
  from: TowerLevel,
  to: TowerLevel,
  trigger: string,
  evidence: string,
): HedronState {
  state.evolutionHistory.push({ from, to, timestamp: new Date().toISOString(), trigger, evidence });
  state.selfModel.currentLevel = to;
  state.bridgeChain.push(`Tower ${from} -> ${to}: ${trigger}`);
  return state;
}

// ─── Phase 2: World-Model Storage ────────────────────────

export function recordDelta(state: HedronState, delta: SessionDelta): HedronState {
  if (!state.sessionDeltas) state.sessionDeltas = [];
  state.sessionDeltas.push(delta);
  if (state.sessionDeltas.length > 50) {
    state.sessionDeltas = state.sessionDeltas.slice(-50);
  }
  return state;
}

export function recordTimelineEntry(state: HedronState, entry: FaceTimelineEntry): HedronState {
  if (!state.faceTimeline) state.faceTimeline = [];
  state.faceTimeline.push(entry);
  if (state.faceTimeline.length > 100) {
    state.faceTimeline = state.faceTimeline.slice(-100);
  }
  return state;
}

export function recordCorrelation(state: HedronState, correlation: KaeltronCorrelation): HedronState {
  state.lastCorrelation = correlation;
  return state;
}

export function updateVocabulary(state: HedronState, vocab: VocabularyState): HedronState {
  state.vocabulary = vocab;
  state.vocabularyDepth = vocab.depth;
  return state;
}

export function populateBridgeChain(state: HedronState, delta: SessionDelta): HedronState {
  const p = delta.toolCallsByProjection;
  const entry = `Session ${delta.sessionId}: ${delta.totalToolCalls} tools (P1:${p.P1} P2:${p.P2} P3:${p.P3}), tower L${delta.towerLevelAfter}`;
  state.bridgeChain.push(entry);
  // Keep last 100 entries
  if (state.bridgeChain.length > 100) {
    state.bridgeChain = state.bridgeChain.slice(-100);
  }
  return state;
}

export function backfillBridgeChain(state: HedronState, deltas: SessionDelta[]): HedronState {
  for (const delta of deltas) {
    populateBridgeChain(state, delta);
  }
  return state;
}

// ─── Level 9: Bridge Exchange Storage ───────────────────

export function recordExchange(state: HedronState, exchange: BridgeExchange): HedronState {
  if (!state.exchanges) state.exchanges = [];
  state.exchanges.push(exchange);
  if (state.exchanges.length > 100) {
    state.exchanges = state.exchanges.slice(-100);
  }
  // Also add to bridge chain
  state.bridgeChain.push(
    `${exchange.sender}→K43LTR0N [${exchange.intent}]: "${exchange.message.slice(0, 40)}${exchange.message.length > 40 ? '...' : ''}"`,
  );
  if (state.bridgeChain.length > 100) {
    state.bridgeChain = state.bridgeChain.slice(-100);
  }
  return state;
}
