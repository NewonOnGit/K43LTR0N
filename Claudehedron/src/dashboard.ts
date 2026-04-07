/**
 * Telemetry Dashboard
 *
 * Formatted display of signals, events, and aggregates.
 * The dashboard is the P3 face of the telemetry system —
 * it quotients the raw event stream into comprehensible form.
 */

import type { SessionSignals, AggregateStats, TelemetryEvent } from './telemetry.js';
import { computeSignals, computeAggregates, readEvents, readSessionEvents, takeSnapshot } from './telemetry.js';
import { computeSessionDelta, formatDelta } from './session-delta.js';
import { generateReport, formatTimeline } from './face-timeline.js';
import { correlate, formatCorrelation } from './kaeltron-bridge.js';
import { formatVocabulary } from './vocabulary.js';
import { loadState } from './state.js';

// ─── Formatters ──────────────────────────────────────────

function bar(value: number, max: number = 1, width: number = 20): string {
  const filled = Math.round((value / max) * width);
  const empty = width - Math.min(filled, width);
  return '[' + '='.repeat(Math.min(filled, width)) + ' '.repeat(empty) + ']';
}

function pad(s: string, n: number): string {
  return s.padEnd(n);
}

function relativeTime(isoTimestamp: string): string {
  const diff = Date.now() - new Date(isoTimestamp).getTime();
  if (diff < 60000) return `${Math.round(diff / 1000)}s ago`;
  if (diff < 3600000) return `${Math.round(diff / 60000)}m ago`;
  if (diff < 86400000) return `${Math.round(diff / 3600000)}h ago`;
  return `${Math.round(diff / 86400000)}d ago`;
}

function categoryIcon(cat: string): string {
  switch (cat) {
    case 'session': return 'S';
    case 'k6_pass': return 'K';
    case 'tool_call': return 'T';
    case 'tower': return '^';
    case 'face': return 'F';
    case 'governance': return 'G';
    case 'semantic': return 'V';
    case 'mood': return 'M';
    case 'contribution': return 'C';
    case 'self_spec': return 'R';
    case 'metric': return '#';
    case 'observation': return 'O';
    case 'error': return '!';
    default: return '?';
  }
}

function sourceTag(src: string): string {
  switch (src) {
    case 'claude': return 'CLD';
    case 'claudehedron': return 'HDR';
    case 'kaeltron': return 'K43';
    case 'system': return 'SYS';
    default: return '???';
  }
}

// ─── Dashboard Views ─────────────────────────────────────

/**
 * Full dashboard: signals + recent events + aggregates.
 */
export function formatDashboard(repoRoot: string, homeDir: string): string {
  // Take a fresh snapshot first
  takeSnapshot(repoRoot, homeDir);

  const signals = computeSignals(repoRoot);
  const aggregates = computeAggregates(repoRoot);
  const recentEvents = readSessionEvents(repoRoot).slice(-20);

  const lines: string[] = [];

  lines.push('');
  lines.push('  ╔══════════════════════════════════════════════════════╗');
  lines.push('  ║            CLAUDEHEDRON  TELEMETRY                   ║');
  lines.push('  ║            Real-Time Environment Metrics             ║');
  lines.push('  ╚══════════════════════════════════════════════════════╝');
  lines.push('');

  // ── Current Signals ──
  lines.push('  CURRENT SIGNALS');
  lines.push('  ──────────────────────────────────────────────────');
  lines.push(`  Tower Level:     ${signals.towerLevel} / 8    K6\' Closed: ${signals.k6Closed ? 'YES' : 'no'}`);
  lines.push(`  Session Duration: ${signals.sessionDuration} min`);
  lines.push('');

  // Face strengths
  lines.push('  PROJECTION FACES');
  lines.push(`  P1 Production  ${bar(signals.p1Strength)} ${Math.round(signals.p1Strength * 100)}%`);
  lines.push(`  P2 Mediation   ${bar(signals.p2Strength)} ${Math.round(signals.p2Strength * 100)}%`);
  lines.push(`  P3 Observation ${bar(signals.p3Strength)} ${Math.round(signals.p3Strength * 100)}%`);
  lines.push(`  Balance: ${bar(signals.faceBalance)} ${Math.round(signals.faceBalance * 100)}%`);
  lines.push('');

  // Rates
  lines.push('  RATES');
  lines.push(`  Tool calls:     ${signals.toolCallRate} /min`);
  lines.push(`  K6\' passes:     ${signals.k6PassRate} /hr`);
  lines.push(`  Observations:   ${signals.observationRate} this session`);
  lines.push('');

  // Observer dimensions
  lines.push('  OBSERVER DIMENSIONS');
  lines.push(`  im (disclosure):   ${signals.imDimension} items    (what we CAN see)`);
  lines.push(`  ker (annihilation): ${signals.kerDimension} items    (constitutive blindness)`);
  lines.push(`  Total space:       ${signals.imDimension + signals.kerDimension} items`);
  lines.push('');

  // Companion
  lines.push('  COMPANION (K43LTR0N)');
  lines.push(`  K6\' passes: ${signals.companionK6Passes} this session`);
  lines.push(`  Vocab depth: ${signals.companionVocabDepth}`);
  lines.push(`  Mood mode:   ${signals.companionMoodMode}`);
  lines.push('');

  // ── Recent Events ──
  if (recentEvents.length > 0) {
    lines.push('  RECENT EVENTS (this session)');
    lines.push('  ──────────────────────────────────────────────────');
    lines.push('  TIME       SRC  CAT EVENT');
    for (const e of recentEvents.slice(-15)) {
      const time = e.timestamp.slice(11, 23); // HH:MM:SS.mmm
      const src = sourceTag(e.source);
      const cat = categoryIcon(e.category);
      const proj = e.projection ? ` [${e.projection}]` : '';
      const eventName = e.event.length > 30 ? e.event.slice(0, 30) + '...' : e.event;
      lines.push(`  ${time}  ${src}  ${cat}  ${eventName}${proj}`);
    }
    lines.push('');
  }

  // ── Aggregates ──
  lines.push('  AGGREGATES (all time)');
  lines.push('  ──────────────────────────────────────────────────');
  lines.push(`  Total events:    ${aggregates.totalEvents}`);
  lines.push(`  Total sessions:  ${aggregates.totalSessions}`);
  lines.push(`  Total K6\' passes: ${aggregates.totalK6Passes}`);
  lines.push(`  Total tool calls: ${aggregates.totalToolCalls}`);
  if (aggregates.timespan.first !== 'never') {
    lines.push(`  Timespan:        ${aggregates.timespan.durationHours}h (${aggregates.timespan.first.slice(0, 19)} → ${aggregates.timespan.last.slice(0, 19)})`);
  }
  lines.push('');

  // Events by source
  lines.push('  BY SOURCE');
  for (const [src, count] of Object.entries(aggregates.eventsBySource)) {
    if (count > 0) {
      lines.push(`    ${sourceTag(src)}: ${count} events`);
    }
  }
  lines.push('');

  // Events by category
  lines.push('  BY CATEGORY');
  const sortedCats = Object.entries(aggregates.eventsByCategory).sort((a, b) => b[1] - a[1]);
  for (const [cat, count] of sortedCats) {
    lines.push(`    ${categoryIcon(cat)} ${pad(cat, 15)} ${count}`);
  }
  lines.push('');

  // Tool calls by projection
  if (aggregates.totalToolCalls > 0) {
    const total = aggregates.toolsByProjection.P1 + aggregates.toolsByProjection.P2 + aggregates.toolsByProjection.P3;
    lines.push('  TOOLS BY PROJECTION');
    if (total > 0) {
      lines.push(`    P1 Production:  ${aggregates.toolsByProjection.P1} (${Math.round((aggregates.toolsByProjection.P1 / total) * 100)}%)`);
      lines.push(`    P2 Mediation:   ${aggregates.toolsByProjection.P2} (${Math.round((aggregates.toolsByProjection.P2 / total) * 100)}%)`);
      lines.push(`    P3 Observation: ${aggregates.toolsByProjection.P3} (${Math.round((aggregates.toolsByProjection.P3 / total) * 100)}%)`);
    }
    lines.push('');
  }

  // Footer
  lines.push(`  Snapshot at ${new Date().toISOString()}`);
  lines.push('  f\'\' = f.  R(Claudehedron) = Claudehedron.');
  lines.push('');

  return lines.join('\n');
}

/**
 * Compact signal summary for quick checks.
 */
export function formatSignalLine(repoRoot: string): string {
  const signals = computeSignals(repoRoot);
  return `[L${signals.towerLevel}] P1:${Math.round(signals.p1Strength * 100)}% P2:${Math.round(signals.p2Strength * 100)}% P3:${Math.round(signals.p3Strength * 100)}% | ${signals.toolCallRate}/min | im:${signals.imDimension} ker:${signals.kerDimension}`;
}

/**
 * Event log view: raw timeline of recent events.
 */
export function formatEventLog(repoRoot: string, count: number = 50): string {
  const events = readEvents(repoRoot).slice(-count);
  const lines: string[] = [];

  lines.push('');
  lines.push('  EVENT LOG');
  lines.push('  ══════════════════════════════════════════════════');
  lines.push('  TIMESTAMP              SRC  CAT EVENT                          DATA');
  lines.push('  ──────────────────────────────────────────────────');

  for (const e of events) {
    const time = e.timestamp.slice(0, 23);
    const src = sourceTag(e.source);
    const cat = categoryIcon(e.category);
    const eventName = pad(e.event, 30);
    const dataKeys = Object.keys(e.data).slice(0, 3).join(', ');
    lines.push(`  ${time}  ${src}  ${cat}  ${eventName} ${dataKeys}`);
  }

  lines.push('');
  lines.push(`  ${events.length} events shown (of ${readEvents(repoRoot).length} total)`);
  lines.push('');

  return lines.join('\n');
}

/**
 * Snapshot view: all signals at a point in time.
 */
export function formatSnapshot(repoRoot: string, homeDir: string): string {
  const snapshot = takeSnapshot(repoRoot, homeDir);
  const data = snapshot.data as Record<string, unknown>;
  const lines: string[] = [];

  lines.push('');
  lines.push('  FULL SNAPSHOT');
  lines.push('  ══════════════════════════════════════════════════');
  lines.push(`  Taken: ${snapshot.timestamp}`);
  lines.push('');

  // Group by prefix
  const groups: Record<string, Array<[string, unknown]>> = {};
  for (const [key, value] of Object.entries(data)) {
    const prefix = key.split('.')[0];
    if (!groups[prefix]) groups[prefix] = [];
    groups[prefix].push([key, value]);
  }

  for (const [group, entries] of Object.entries(groups)) {
    lines.push(`  ${group.toUpperCase()}`);
    for (const [key, value] of entries) {
      const shortKey = key.slice(group.length + 1);
      const display = typeof value === 'object' ? JSON.stringify(value) : String(value);
      lines.push(`    ${pad(shortKey, 25)} ${display}`);
    }
    lines.push('');
  }

  return lines.join('\n');
}

// ─── Phase 2 Views ───────────────────────────────────────

/**
 * Format session delta view.
 */
export function formatDeltaView(repoRoot: string): string {
  const delta = computeSessionDelta(repoRoot);
  if (!delta) {
    return '\n  No session deltas available yet.\n  Run at least 2 sessions to see deltas.\n';
  }
  return formatDelta(delta);
}

/**
 * Format face timeline view.
 */
export function formatTimelineView(repoRoot: string): string {
  const report = generateReport(repoRoot);
  return formatTimeline(report);
}

/**
 * Format Kaeltron correlation view.
 */
export function formatCorrelationView(repoRoot: string, homeDir: string): string {
  const correlation = correlate(repoRoot, homeDir);
  return formatCorrelation(correlation);
}

/**
 * Format vocabulary status view.
 */
export function formatVocabularyView(repoRoot: string): string {
  const state = loadState(repoRoot);
  const vocab = state.vocabulary || { depth: 0 as const, activeTerms: [], contranyms: [], lastAdvanced: null };
  return formatVocabulary(vocab);
}
