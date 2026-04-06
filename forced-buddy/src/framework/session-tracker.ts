/**
 * SESSION METRICS TRACKER — Level 6: World Model
 *
 * Tracks per-session activity metrics. Since forced-buddy runs
 * as a CLI tool (not persistent), metrics are approximated:
 * each CLI invocation counts as a "tool call."
 *
 * Stored in config and updated on each forced-buddy command.
 */

import type { SessionMetrics } from '../types.js';

/**
 * Initialize a fresh session metrics record.
 * Called when a new session starts (SessionStart hook).
 */
export function initSession(): SessionMetrics {
  return {
    toolCalls: 0,
    errors: 0,
    conversationTurns: 0,
    elapsedSeconds: 0,
    lastActivity: new Date().toISOString(),
  };
}

/**
 * Record a tool call (CLI invocation).
 */
export function recordToolCall(metrics: SessionMetrics): SessionMetrics {
  return {
    ...metrics,
    toolCalls: metrics.toolCalls + 1,
    lastActivity: new Date().toISOString(),
  };
}

/**
 * Record an error.
 */
export function recordError(metrics: SessionMetrics): SessionMetrics {
  return {
    ...metrics,
    errors: metrics.errors + 1,
    lastActivity: new Date().toISOString(),
  };
}

/**
 * Update elapsed time from session start.
 */
export function updateElapsed(metrics: SessionMetrics): SessionMetrics {
  const start = new Date(metrics.lastActivity).getTime();
  const now = Date.now();
  return {
    ...metrics,
    elapsedSeconds: Math.floor((now - start) / 1000) + metrics.elapsedSeconds,
    lastActivity: new Date().toISOString(),
  };
}
