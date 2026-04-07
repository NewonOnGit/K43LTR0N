/**
 * Session Delta Engine
 *
 * Fixes the "toolCalls: 0" gap by mining the telemetry JSONL.
 * Computes real differences between sessions: tool distribution,
 * face changes, tower progression, im/ker evolution.
 *
 * P2-primary: mediates between sessions (bridges time).
 */

import { readEvents } from './telemetry.js';
import { loadState, saveState } from './state.js';
import type {
  SessionDelta, TelemetryEvent, Projection, TowerLevel, HedronState,
} from './types.js';

interface SessionBoundary {
  sessionId: string;
  startMs: number;
  endMs: number;
}

/**
 * Find session boundaries from session.start events in the telemetry stream.
 */
export function findSessionBoundaries(events: TelemetryEvent[]): SessionBoundary[] {
  const starts = events
    .filter((e) => e.event === 'session.start')
    .map((e) => ({ sessionId: e.data.sessionId as string, startMs: e.epochMs }));

  if (starts.length === 0) return [];

  const boundaries: SessionBoundary[] = [];
  for (let i = 0; i < starts.length; i++) {
    const endMs = i < starts.length - 1 ? starts[i + 1].startMs : Date.now();
    boundaries.push({ ...starts[i], endMs });
  }
  return boundaries;
}

/**
 * Extract tool call counts from events within a time window.
 */
export function extractSessionToolCalls(
  events: TelemetryEvent[],
  startMs: number,
  endMs: number,
): { byName: Record<string, number>; byProjection: Record<Projection, number>; total: number } {
  const byName: Record<string, number> = {};
  const byProjection: Record<Projection, number> = { P1: 0, P2: 0, P3: 0 };
  let total = 0;

  for (const e of events) {
    if (e.epochMs < startMs || e.epochMs >= endMs) continue;
    if (e.category !== 'tool_call') continue;

    const name = (e.data.toolName as string) || 'unknown';
    byName[name] = (byName[name] || 0) + 1;
    if (e.projection) {
      byProjection[e.projection] = (byProjection[e.projection] || 0) + 1;
    }
    total++;
  }

  return { byName, byProjection, total };
}

/**
 * Extract face strengths from the last k6_pass event in a window.
 */
function extractFaceStrengths(
  events: TelemetryEvent[],
  startMs: number,
  endMs: number,
): { P1: number; P2: number; P3: number; imCount: number; kerCount: number; tower: TowerLevel } | null {
  const k6Events = events.filter(
    (e) => e.epochMs >= startMs && e.epochMs < endMs && e.event === 'k6.pass',
  );
  const last = k6Events[k6Events.length - 1];
  if (!last) return null;

  const fs = last.data.faceStrengths as { P1: number; P2: number; P3: number } | undefined;
  return {
    P1: fs?.P1 || 0,
    P2: fs?.P2 || 0,
    P3: fs?.P3 || 0,
    imCount: (last.data.imCount as number) || 0,
    kerCount: (last.data.kerCount as number) || 0,
    tower: (last.data.towerLevel as TowerLevel) || 5,
  };
}

/**
 * Compute the delta between the current session and the previous one.
 */
export function computeSessionDelta(repoRoot: string, sessionIndex?: number): SessionDelta | null {
  const events = readEvents(repoRoot);
  const boundaries = findSessionBoundaries(events);

  if (boundaries.length === 0) return null;

  const idx = sessionIndex !== undefined ? sessionIndex : boundaries.length - 1;
  const current = boundaries[idx];
  const previous = idx > 0 ? boundaries[idx - 1] : null;

  if (!current) return null;

  // Tool calls for current session
  const tools = extractSessionToolCalls(events, current.startMs, current.endMs);

  // Face strengths
  const currentFaces = extractFaceStrengths(events, current.startMs, current.endMs);
  const previousFaces = previous
    ? extractFaceStrengths(events, previous.startMs, previous.endMs)
    : null;

  const faceDeltas: SessionDelta['faceDeltas'] = (['P1', 'P2', 'P3'] as Projection[]).map((p) => ({
    projection: p,
    strengthDelta: (currentFaces?.[p] || 0) - (previousFaces?.[p] || 0),
    imCountDelta: 0, // computed from global im, not per-face
    kerCountDelta: 0,
  }));

  const towerBefore = previousFaces?.tower || 5 as TowerLevel;
  const towerAfter = currentFaces?.tower || 5 as TowerLevel;

  return {
    sessionId: current.sessionId,
    previousSessionId: previous?.sessionId || null,
    timestamp: new Date().toISOString(),
    faceDeltas,
    toolCallsByName: tools.byName,
    toolCallsByProjection: tools.byProjection,
    totalToolCalls: tools.total,
    towerLevelBefore: towerBefore,
    towerLevelAfter: towerAfter,
    imDimensionDelta: (currentFaces?.imCount || 0) - (previousFaces?.imCount || 0),
    kerDimensionDelta: (currentFaces?.kerCount || 0) - (previousFaces?.kerCount || 0),
    newObservations: [],
  };
}

/**
 * Compute deltas for all sessions.
 */
export function computeAllDeltas(repoRoot: string): SessionDelta[] {
  const events = readEvents(repoRoot);
  const boundaries = findSessionBoundaries(events);
  const deltas: SessionDelta[] = [];

  for (let i = 0; i < boundaries.length; i++) {
    const delta = computeSessionDelta(repoRoot, i);
    if (delta) deltas.push(delta);
  }

  return deltas;
}

/**
 * Generate a bridge chain entry from a session delta.
 */
export function deltaToBridgeEntry(delta: SessionDelta): string {
  const p = delta.toolCallsByProjection;
  const pStr = `P1:${p.P1} P2:${p.P2} P3:${p.P3}`;
  return `Session ${delta.sessionId}: ${delta.totalToolCalls} tools (${pStr}), tower L${delta.towerLevelAfter}`;
}

/**
 * Format a session delta for display.
 */
export function formatDelta(delta: SessionDelta): string {
  const lines: string[] = [];

  lines.push('');
  lines.push(`  SESSION DELTA: ${delta.sessionId}`);
  if (delta.previousSessionId) {
    lines.push(`  Compared to: ${delta.previousSessionId}`);
  }
  lines.push('  ──────────────────────────────────────');

  // Tool calls
  lines.push(`  Tool Calls: ${delta.totalToolCalls}`);
  const p = delta.toolCallsByProjection;
  if (delta.totalToolCalls > 0) {
    lines.push(`    P1 Production:  ${p.P1} (${Math.round((p.P1 / delta.totalToolCalls) * 100)}%)`);
    lines.push(`    P2 Mediation:   ${p.P2} (${Math.round((p.P2 / delta.totalToolCalls) * 100)}%)`);
    lines.push(`    P3 Observation: ${p.P3} (${Math.round((p.P3 / delta.totalToolCalls) * 100)}%)`);
  }

  // Top tools
  const sorted = Object.entries(delta.toolCallsByName).sort((a, b) => b[1] - a[1]);
  if (sorted.length > 0) {
    lines.push('  Top tools:');
    for (const [name, count] of sorted.slice(0, 5)) {
      lines.push(`    ${name}: ${count}`);
    }
  }

  // Tower
  if (delta.towerLevelBefore !== delta.towerLevelAfter) {
    lines.push(`  Tower: L${delta.towerLevelBefore} -> L${delta.towerLevelAfter}`);
  } else {
    lines.push(`  Tower: L${delta.towerLevelAfter} (stable)`);
  }

  // Face deltas
  lines.push('  Face Deltas:');
  for (const fd of delta.faceDeltas) {
    const sign = fd.strengthDelta >= 0 ? '+' : '';
    lines.push(`    ${fd.projection}: ${sign}${Math.round(fd.strengthDelta * 100)}%`);
  }

  // im/ker
  const imSign = delta.imDimensionDelta >= 0 ? '+' : '';
  const kerSign = delta.kerDimensionDelta >= 0 ? '+' : '';
  lines.push(`  im: ${imSign}${delta.imDimensionDelta} items`);
  lines.push(`  ker: ${kerSign}${delta.kerDimensionDelta} items`);
  lines.push('');

  return lines.join('\n');
}
