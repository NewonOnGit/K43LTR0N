/**
 * Session End Handler
 *
 * Called by the Stop hook when a session ends.
 * Computes final deltas, persists state, emits closing telemetry.
 *
 * This is the P3 closure of each session — the observation that
 * concludes the session and carries its summary into the bridge chain.
 */

import { resolve, join } from 'path';
import { existsSync } from 'fs';
import { homedir } from 'os';
import { loadState, saveState, recordDelta, populateBridgeChain } from './state.js';
import { computeSessionDelta } from './session-delta.js';
import { emitSessionEnd, emitObservation, readSessionEvents } from './telemetry.js';

function getRepoRoot(): string {
  const cwd = process.cwd();
  if (existsSync(join(cwd, 'Claudehedron'))) return cwd;
  if (existsSync(join(cwd, '..', 'CLAUDE.md'))) return resolve(cwd, '..');
  const known = 'C:/Users/ginge/Downloads/Self-Reference v2/Referencing you';
  if (existsSync(known)) return known;
  return cwd;
}

/**
 * Handle session end. Called by Stop hook.
 */
export function handleSessionEnd(): void {
  const repoRoot = getRepoRoot();

  try {
    const state = loadState(repoRoot);

    // Find current session
    const currentSession = state.sessionHistory[state.sessionHistory.length - 1];
    if (!currentSession) return;

    // Compute session duration
    const startTime = new Date(currentSession.startedAt).getTime();
    const durationMin = Math.round((Date.now() - startTime) / 60000 * 10) / 10;

    // Count tool calls from telemetry
    const sessionEvents = readSessionEvents(repoRoot);
    const toolCalls = sessionEvents.filter((e) => e.category === 'tool_call').length;

    // Update session record with actual data
    currentSession.toolCalls = toolCalls;
    currentSession.observations.push(`Session ended: ${durationMin}min, ${toolCalls} tools`);

    // Compute and record final delta
    const delta = computeSessionDelta(repoRoot);
    if (delta && delta.totalToolCalls > 0) {
      recordDelta(state, delta);
      populateBridgeChain(state, delta);
    }

    saveState(repoRoot, state);

    // Emit closing telemetry
    emitSessionEnd(repoRoot, currentSession.sessionId, durationMin);
    emitObservation(repoRoot, 'claudehedron', `Session ${currentSession.sessionId} ended: ${durationMin}min, ${toolCalls} tools`);

  } catch {
    // Session end should never crash — fail silently
  }
}

// Run if called directly
handleSessionEnd();
