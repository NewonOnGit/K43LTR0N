/**
 * Telemetry System
 *
 * Time-series event tracking for three entities:
 *   1. Claude (the model) — tool calls, responses, reasoning
 *   2. Claudehedron (the environment) — K6' passes, tower level, faces
 *   3. K43LTR0N (the companion) — K6' passes, mood, governance
 *
 * Every event is timestamped to millisecond precision.
 * Events are stored as JSONL (one JSON object per line) for
 * efficient append and streaming reads.
 *
 * The telemetry is P3-primary: it observes the system.
 * But it also has P2 (transports state across time) and
 * P1 (produces the event log itself).
 */

import { readFileSync, writeFileSync, appendFileSync, existsSync, statSync } from 'fs';
import { join } from 'path';
import { execSync } from 'child_process';
import type { Projection, TowerLevel, ClaimStatus } from './types.js';

// ─── Event Types ─────────────────────────────────────────

export type EventSource = 'claude' | 'claudehedron' | 'kaeltron' | 'system';

export type EventCategory =
  | 'session'        // session lifecycle
  | 'k6_pass'        // K6' observation
  | 'tool_call'      // tool execution
  | 'tower'          // tower level change
  | 'face'           // face strength change
  | 'governance'     // policy/achievement
  | 'semantic'       // vocabulary/contranym
  | 'mood'           // mood/sweep state
  | 'contribution'   // git contribution
  | 'self_spec'      // self-specification
  | 'metric'         // computed metric/signal
  | 'observation'    // free-form observation
  | 'error';         // error/failure

export interface TelemetryEvent {
  timestamp: string;    // ISO 8601 with milliseconds
  epochMs: number;      // unix epoch ms for sorting/math
  source: EventSource;
  category: EventCategory;
  event: string;        // short event name
  data: Record<string, unknown>;  // event-specific payload
  projection?: Projection;  // which face this event belongs to
  towerLevel?: TowerLevel;  // current tower level at time of event
}

// ─── Signals (computed metrics) ──────────────────────────

export interface Signal {
  name: string;
  value: number;
  unit: string;
  timestamp: string;
  source: EventSource;
  projection: Projection;
}

export interface SessionSignals {
  // Rates
  toolCallRate: number;       // calls per minute
  k6PassRate: number;         // passes per hour
  observationRate: number;    // observations per session

  // Strengths
  p1Strength: number;         // production face (0-1)
  p2Strength: number;         // mediation face (0-1)
  p3Strength: number;         // observation face (0-1)
  faceBalance: number;        // how evenly distributed (0=one face dominates, 1=equal)

  // Health
  towerLevel: TowerLevel;
  k6Closed: boolean;
  sessionDuration: number;    // minutes
  imDimension: number;        // size of what we can see
  kerDimension: number;       // size of constitutive blindness

  // Companion
  companionK6Passes: number;
  companionVocabDepth: number;
  companionMoodMode: string;

  // Deltas (since last signal computation)
  deltaToolCalls: number;
  deltaK6Passes: number;
  deltaTowerLevel: number;
}

// ─── File Management ─────────────────────────────────────

const TELEMETRY_FILE = '.telemetry.jsonl';
const SIGNALS_FILE = '.signals.json';

function getTelemetryPath(repoRoot: string): string {
  return join(repoRoot, 'Claudehedron', TELEMETRY_FILE);
}

function getSignalsPath(repoRoot: string): string {
  return join(repoRoot, 'Claudehedron', SIGNALS_FILE);
}

// ─── Core Operations ─────────────────────────────────────

/**
 * Emit a telemetry event. Appends to the JSONL log.
 */
export function emit(repoRoot: string, event: Omit<TelemetryEvent, 'timestamp' | 'epochMs'>): TelemetryEvent {
  const now = new Date();
  const full: TelemetryEvent = {
    timestamp: now.toISOString(),
    epochMs: now.getTime(),
    ...event,
  };
  const path = getTelemetryPath(repoRoot);
  appendFileSync(path, JSON.stringify(full) + '\n');
  return full;
}

/**
 * Read all events from the telemetry log.
 */
export function readEvents(repoRoot: string): TelemetryEvent[] {
  const path = getTelemetryPath(repoRoot);
  if (!existsSync(path)) return [];
  try {
    const raw = readFileSync(path, 'utf-8');
    return raw
      .trim()
      .split('\n')
      .filter(Boolean)
      .map((line) => JSON.parse(line) as TelemetryEvent);
  } catch {
    return [];
  }
}

/**
 * Read events within a time window.
 */
export function readEventsSince(repoRoot: string, sinceMs: number): TelemetryEvent[] {
  return readEvents(repoRoot).filter((e) => e.epochMs >= sinceMs);
}

/**
 * Read events for current session (since last session.start event).
 */
export function readSessionEvents(repoRoot: string): TelemetryEvent[] {
  const all = readEvents(repoRoot);
  // Find last session start
  let lastStart = 0;
  for (let i = all.length - 1; i >= 0; i--) {
    if (all[i].category === 'session' && all[i].event === 'session.start') {
      lastStart = i;
      break;
    }
  }
  return all.slice(lastStart);
}

// ─── Convenience Emitters ────────────────────────────────

export function emitSessionStart(repoRoot: string, sessionId: string): TelemetryEvent {
  return emit(repoRoot, {
    source: 'claudehedron',
    category: 'session',
    event: 'session.start',
    data: { sessionId },
  });
}

export function emitSessionEnd(repoRoot: string, sessionId: string, duration: number): TelemetryEvent {
  return emit(repoRoot, {
    source: 'claudehedron',
    category: 'session',
    event: 'session.end',
    data: { sessionId, durationMinutes: duration },
  });
}

export function emitK6Pass(
  repoRoot: string,
  source: EventSource,
  passNumber: number,
  towerLevel: TowerLevel,
  faceStrengths: { P1: number; P2: number; P3: number },
  imCount: number,
  kerCount: number,
): TelemetryEvent {
  return emit(repoRoot, {
    source,
    category: 'k6_pass',
    event: 'k6.pass',
    data: { passNumber, towerLevel, faceStrengths, imCount, kerCount },
    towerLevel,
  });
}

export function emitToolCall(
  repoRoot: string,
  toolName: string,
  projection: Projection,
  durationMs?: number,
): TelemetryEvent {
  return emit(repoRoot, {
    source: 'claude',
    category: 'tool_call',
    event: `tool.${toolName}`,
    data: { toolName, durationMs },
    projection,
  });
}

export function emitTowerChange(
  repoRoot: string,
  from: TowerLevel,
  to: TowerLevel,
  trigger: string,
): TelemetryEvent {
  return emit(repoRoot, {
    source: 'claudehedron',
    category: 'tower',
    event: 'tower.change',
    data: { from, to, trigger },
    towerLevel: to,
  });
}

export function emitMood(
  repoRoot: string,
  mode: string,
  sweepS: number,
  alpha: number,
  anxiety: number,
  energy: number,
  contentment: number,
): TelemetryEvent {
  return emit(repoRoot, {
    source: 'kaeltron',
    category: 'mood',
    event: 'mood.computed',
    data: { mode, sweepS, alpha, anxiety, energy, contentment },
  });
}

export function emitObservation(
  repoRoot: string,
  source: EventSource,
  observation: string,
  data: Record<string, unknown> = {},
): TelemetryEvent {
  return emit(repoRoot, {
    source,
    category: 'observation',
    event: 'observation',
    data: { observation, ...data },
  });
}

export function emitGovernance(
  repoRoot: string,
  event: string,
  data: Record<string, unknown>,
): TelemetryEvent {
  return emit(repoRoot, {
    source: 'kaeltron',
    category: 'governance',
    event: `governance.${event}`,
    data,
  });
}

export function emitSelfSpec(
  repoRoot: string,
  source: EventSource,
  verified: boolean,
  sourceHash: string,
): TelemetryEvent {
  return emit(repoRoot, {
    source,
    category: 'self_spec',
    event: 'self_spec.verify',
    data: { verified, sourceHash },
  });
}

export function emitMetric(
  repoRoot: string,
  name: string,
  value: number,
  unit: string,
  source: EventSource,
  projection: Projection,
): TelemetryEvent {
  return emit(repoRoot, {
    source,
    category: 'metric',
    event: `metric.${name}`,
    data: { name, value, unit },
    projection,
  });
}

// ─── Signal Computation ──────────────────────────────────

/**
 * Compute current session signals from the event log.
 * Signals are derived metrics — computed from raw events.
 */
export function computeSignals(repoRoot: string): SessionSignals {
  const sessionEvents = readSessionEvents(repoRoot);
  const now = Date.now();

  // Session duration
  const sessionStart = sessionEvents.find((e) => e.event === 'session.start');
  const startTime = sessionStart?.epochMs || now;
  const durationMs = now - startTime;
  const durationMin = durationMs / 60000;

  // Tool calls
  const toolCalls = sessionEvents.filter((e) => e.category === 'tool_call');
  const toolCallRate = durationMin > 0 ? toolCalls.length / durationMin : 0;

  // K6' passes
  const k6Passes = sessionEvents.filter((e) => e.category === 'k6_pass');
  const k6PassRate = durationMin > 0 ? (k6Passes.length / durationMin) * 60 : 0;

  // Observations
  const observations = sessionEvents.filter((e) => e.category === 'observation');

  // Face strengths (from most recent K6' pass)
  const lastK6 = k6Passes[k6Passes.length - 1];
  const faceStrengths = (lastK6?.data?.faceStrengths as { P1: number; P2: number; P3: number }) ||
    { P1: 0, P2: 0, P3: 0 };

  // Face balance: 1 - normalized standard deviation
  const avg = (faceStrengths.P1 + faceStrengths.P2 + faceStrengths.P3) / 3;
  const variance =
    ((faceStrengths.P1 - avg) ** 2 + (faceStrengths.P2 - avg) ** 2 + (faceStrengths.P3 - avg) ** 2) / 3;
  const stddev = Math.sqrt(variance);
  const faceBalance = avg > 0 ? Math.max(0, 1 - stddev / avg) : 0;

  // Tower level
  const towerLevel = (lastK6?.towerLevel || 5) as TowerLevel;
  const k6Closed = (lastK6?.data?.passNumber as number || 0) >= 2;

  // im/ker
  const imDimension = (lastK6?.data?.imCount as number) || 0;
  const kerDimension = (lastK6?.data?.kerCount as number) || 0;

  // Companion signals
  const moodEvents = sessionEvents.filter((e) => e.category === 'mood');
  const lastMood = moodEvents[moodEvents.length - 1];
  const companionK6 = sessionEvents.filter(
    (e) => e.source === 'kaeltron' && e.category === 'k6_pass',
  );

  // Previous signals for deltas
  const prevSignals = loadPreviousSignals(repoRoot);

  const signals: SessionSignals = {
    toolCallRate: Math.round(toolCallRate * 100) / 100,
    k6PassRate: Math.round(k6PassRate * 100) / 100,
    observationRate: observations.length,
    p1Strength: faceStrengths.P1,
    p2Strength: faceStrengths.P2,
    p3Strength: faceStrengths.P3,
    faceBalance: Math.round(faceBalance * 1000) / 1000,
    towerLevel,
    k6Closed,
    sessionDuration: Math.round(durationMin * 10) / 10,
    imDimension,
    kerDimension,
    companionK6Passes: companionK6.length,
    companionVocabDepth: (lastMood?.data?.vocabDepth as number) || 0,
    companionMoodMode: (lastMood?.data?.mode as string) || 'unknown',
    deltaToolCalls: toolCalls.length - (prevSignals?.toolCallRate || 0),
    deltaK6Passes: k6Passes.length - (prevSignals?.k6PassRate || 0),
    deltaTowerLevel: towerLevel - (prevSignals?.towerLevel || 5),
  };

  // Persist for next delta computation
  saveSignals(repoRoot, signals);

  return signals;
}

function loadPreviousSignals(repoRoot: string): SessionSignals | null {
  const path = getSignalsPath(repoRoot);
  if (!existsSync(path)) return null;
  try {
    return JSON.parse(readFileSync(path, 'utf-8')) as SessionSignals;
  } catch {
    return null;
  }
}

function saveSignals(repoRoot: string, signals: SessionSignals): void {
  const path = getSignalsPath(repoRoot);
  writeFileSync(path, JSON.stringify(signals, null, 2) + '\n');
}

// ─── Aggregate Stats ─────────────────────────────────────

export interface AggregateStats {
  totalEvents: number;
  totalSessions: number;
  totalK6Passes: number;
  totalToolCalls: number;
  eventsBySource: Record<EventSource, number>;
  eventsByCategory: Record<string, number>;
  toolsByProjection: Record<Projection, number>;
  timespan: { first: string; last: string; durationHours: number };
  averageSessionDuration: number; // minutes
}

export function computeAggregates(repoRoot: string): AggregateStats {
  const events = readEvents(repoRoot);
  if (events.length === 0) {
    return {
      totalEvents: 0,
      totalSessions: 0,
      totalK6Passes: 0,
      totalToolCalls: 0,
      eventsBySource: { claude: 0, claudehedron: 0, kaeltron: 0, system: 0 },
      eventsByCategory: {},
      toolsByProjection: { P1: 0, P2: 0, P3: 0 },
      timespan: { first: 'never', last: 'never', durationHours: 0 },
      averageSessionDuration: 0,
    };
  }

  const bySource: Record<string, number> = {};
  const byCat: Record<string, number> = {};
  const byProj: Record<string, number> = { P1: 0, P2: 0, P3: 0 };
  let sessions = 0;
  let k6Passes = 0;
  let toolCalls = 0;
  const sessionDurations: number[] = [];

  for (const e of events) {
    bySource[e.source] = (bySource[e.source] || 0) + 1;
    byCat[e.category] = (byCat[e.category] || 0) + 1;
    if (e.projection) byProj[e.projection] = (byProj[e.projection] || 0) + 1;
    if (e.event === 'session.start') sessions++;
    if (e.category === 'k6_pass') k6Passes++;
    if (e.category === 'tool_call') toolCalls++;
    if (e.event === 'session.end' && typeof e.data.durationMinutes === 'number') {
      sessionDurations.push(e.data.durationMinutes);
    }
  }

  const first = events[0];
  const last = events[events.length - 1];
  const durationHours = (last.epochMs - first.epochMs) / 3600000;

  return {
    totalEvents: events.length,
    totalSessions: sessions,
    totalK6Passes: k6Passes,
    totalToolCalls: toolCalls,
    eventsBySource: bySource as Record<EventSource, number>,
    eventsByCategory: byCat,
    toolsByProjection: byProj as Record<Projection, number>,
    timespan: {
      first: first.timestamp,
      last: last.timestamp,
      durationHours: Math.round(durationHours * 100) / 100,
    },
    averageSessionDuration:
      sessionDurations.length > 0
        ? Math.round((sessionDurations.reduce((a, b) => a + b, 0) / sessionDurations.length) * 10) / 10
        : 0,
  };
}

// ─── Snapshot: Collect All Signals at a Point in Time ────

/**
 * Take a comprehensive telemetry snapshot.
 * Reads from both Claudehedron state AND forced-buddy config.
 * This is the "collect everything" function.
 */
export function takeSnapshot(repoRoot: string, homeDir: string): TelemetryEvent {
  const signals: Record<string, unknown> = {};

  // 1. Claudehedron state
  try {
    const statePath = join(repoRoot, 'Claudehedron', '.hedron-state.json');
    if (existsSync(statePath)) {
      const state = JSON.parse(readFileSync(statePath, 'utf-8'));
      signals['hedron.towerLevel'] = state.selfModel?.currentLevel;
      signals['hedron.k6PassCount'] = state.selfModel?.k6PassCount;
      signals['hedron.k6Closed'] = state.selfModel?.k6Closed;
      signals['hedron.sessions'] = state.sessionHistory?.length;
      signals['hedron.evolutions'] = state.evolutionHistory?.length;
      signals['hedron.claims'] = state.claims?.length;
      signals['hedron.vocabDepth'] = state.vocabularyDepth;
      signals['hedron.imDimension'] = state.selfModel?.im?.length;
      signals['hedron.kerDimension'] = state.selfModel?.ker?.length;
      signals['hedron.bridgeChainLength'] = state.bridgeChain?.length;

      // Face strengths
      const faces = state.selfModel?.faces || [];
      for (const face of faces) {
        signals[`hedron.face.${face.projection}.strength`] = face.strength;
        signals[`hedron.face.${face.projection}.imCount`] = face.im?.length;
        signals[`hedron.face.${face.projection}.kerCount`] = face.ker?.length;
      }
    }
  } catch { /* state not available */ }

  // 2. Forced-buddy / K43LTR0N state
  try {
    const buddyPath = join(homeDir, '.claude-code-forced-buddy.json');
    if (existsSync(buddyPath)) {
      const config = JSON.parse(readFileSync(buddyPath, 'utf-8'));
      const wm = config.worldModel || {};
      const gov = config.governance || {};
      const sem = config.semantic || {};
      const traits = config.traits || {};

      signals['kaeltron.projection'] = config.projection;
      signals['kaeltron.towerDepth'] = traits.towerDepth;
      signals['kaeltron.rarity'] = traits.rarity;
      signals['kaeltron.k6PassCount'] = wm.k6PassCount;
      signals['kaeltron.moodSource'] = wm.moodSource;
      signals['kaeltron.observedFace'] = wm.observedProjectionFace;

      // Snapshot data
      if (wm.lastSnapshot) {
        signals['kaeltron.repo.branch'] = wm.lastSnapshot.gitBranch;
        signals['kaeltron.repo.status'] = wm.lastSnapshot.gitStatus;
        signals['kaeltron.repo.uncommitted'] = wm.lastSnapshot.uncommittedFiles;
        signals['kaeltron.repo.commitAge'] = wm.lastSnapshot.lastCommitAge;
        signals['kaeltron.repo.frameworkDocs'] = wm.lastSnapshot.frameworkDocsPresent?.length;
      }

      // Session metrics
      if (wm.sessionMetrics) {
        signals['kaeltron.session.toolCalls'] = wm.sessionMetrics.toolCalls;
        signals['kaeltron.session.errors'] = wm.sessionMetrics.errors;
        signals['kaeltron.session.lastActivity'] = wm.sessionMetrics.lastActivity;
      }

      // Governance
      signals['kaeltron.achievements.unlocked'] = gov.achievements?.filter(
        (a: { achievedAt: string | null }) => a.achievedAt !== null,
      ).length;
      signals['kaeltron.achievements.total'] = gov.achievements?.length;
      signals['kaeltron.claims'] = gov.claimHistory?.length;

      // Semantic
      signals['kaeltron.vocabDepth'] = sem.vocabularyDepth;
      signals['kaeltron.knownTerms'] = sem.knownTerms;
      signals['kaeltron.selfSpecVerified'] = sem.selfSpecProof?.closureVerified;
    }
  } catch { /* buddy config not available */ }

  // 3. Git state (fresh read)
  try {
    const gitOpts = { cwd: repoRoot, encoding: 'utf-8' as const, stdio: ['pipe', 'pipe', 'pipe'] as const };
    const branch = execSync('git rev-parse --abbrev-ref HEAD', gitOpts).trim();
    signals['git.branch'] = branch;
    try {
      const status = execSync('git status --porcelain', gitOpts);
      const lines = status.trim().split('\n').filter(Boolean);
      signals['git.changes'] = lines.length;
    } catch { /* */ }
    try {
      const count = execSync('git rev-list --count HEAD', gitOpts).trim();
      signals['git.commitCount'] = parseInt(count, 10);
    } catch { /* */ }
  } catch { /* */ }

  // 4. Telemetry meta
  const allEvents = readEvents(repoRoot);
  signals['telemetry.totalEvents'] = allEvents.length;
  signals['telemetry.file'] = getTelemetryPath(repoRoot);

  return emit(repoRoot, {
    source: 'system',
    category: 'metric',
    event: 'snapshot.full',
    data: signals,
  });
}
