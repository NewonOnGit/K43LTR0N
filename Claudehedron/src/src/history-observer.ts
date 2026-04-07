/**
 * History Observer
 *
 * Mines ~/.claude/history.jsonl — the complete record of every
 * conversation turn in this project. 1,990+ entries across all sessions.
 *
 * This is the deepest world-model data source: it tells us not just
 * WHAT the hedron did (telemetry), but what the USER ASKED for and
 * how the conversation evolved.
 *
 * P2-primary: mediates between past and present.
 */

import { readFileSync, existsSync, statSync } from 'fs';
import { join } from 'path';
import type { EnvironmentComponent } from './types.js';

// ─── Types ───────────────────────────────────────────────

export interface HistoryEntry {
  display: string;
  timestamp: number;        // epoch ms
  project: string;
  sessionId: string;
}

export interface SessionSummary {
  sessionId: string;
  messageCount: number;
  firstMessage: number;     // epoch ms
  lastMessage: number;      // epoch ms
  durationMinutes: number;
  firstWords: string;       // first 80 chars of first message
}

export interface HistoryStats {
  totalEntries: number;
  totalSessions: number;
  thisProjectEntries: number;
  thisProjectSessions: number;
  sessions: SessionSummary[];
  oldestEntry: string;     // ISO timestamp
  newestEntry: string;     // ISO timestamp
  spanDays: number;
}

// ─── Parsing ─────────────────────────────────────────────

/**
 * Read and parse history.jsonl efficiently.
 * Only parses entries for the current project path.
 */
export function readHistory(homeDir: string, projectPath?: string): HistoryEntry[] {
  const historyPath = join(homeDir, '.claude', 'history.jsonl');
  if (!existsSync(historyPath)) return [];

  try {
    const raw = readFileSync(historyPath, 'utf-8');
    const lines = raw.trim().split('\n').filter(Boolean);
    const entries: HistoryEntry[] = [];

    for (const line of lines) {
      try {
        const entry = JSON.parse(line) as HistoryEntry;
        // Filter to current project if specified
        if (projectPath && entry.project && !entry.project.includes('Self-Reference')) {
          continue;
        }
        entries.push(entry);
      } catch {
        // skip malformed lines
      }
    }

    return entries;
  } catch {
    return [];
  }
}

/**
 * Group history entries into session summaries.
 */
export function summarizeSessions(entries: HistoryEntry[]): SessionSummary[] {
  const bySession: Record<string, HistoryEntry[]> = {};
  for (const entry of entries) {
    if (!entry.sessionId) continue;
    if (!bySession[entry.sessionId]) bySession[entry.sessionId] = [];
    bySession[entry.sessionId].push(entry);
  }

  const summaries: SessionSummary[] = [];
  for (const [sessionId, msgs] of Object.entries(bySession)) {
    if (msgs.length === 0) continue;
    const sorted = msgs.sort((a, b) => a.timestamp - b.timestamp);
    const first = sorted[0];
    const last = sorted[sorted.length - 1];
    const durationMs = last.timestamp - first.timestamp;

    summaries.push({
      sessionId,
      messageCount: msgs.length,
      firstMessage: first.timestamp,
      lastMessage: last.timestamp,
      durationMinutes: Math.round(durationMs / 60000 * 10) / 10,
      firstWords: (first.display || '').slice(0, 80).replace(/\n/g, ' '),
    });
  }

  return summaries.sort((a, b) => a.firstMessage - b.firstMessage);
}

/**
 * Compute full history statistics.
 */
export function computeHistoryStats(homeDir: string): HistoryStats {
  const allEntries = readHistory(homeDir);
  const projectEntries = readHistory(homeDir, 'Self-Reference');
  const sessions = summarizeSessions(projectEntries);

  const allSessions = new Set(allEntries.map((e) => e.sessionId)).size;

  const timestamps = allEntries.map((e) => e.timestamp).filter((t) => t > 0);
  const oldest = timestamps.length > 0 ? Math.min(...timestamps) : Date.now();
  const newest = timestamps.length > 0 ? Math.max(...timestamps) : Date.now();
  const spanDays = Math.round((newest - oldest) / 86400000 * 10) / 10;

  return {
    totalEntries: allEntries.length,
    totalSessions: allSessions,
    thisProjectEntries: projectEntries.length,
    thisProjectSessions: sessions.length,
    sessions,
    oldestEntry: new Date(oldest).toISOString(),
    newestEntry: new Date(newest).toISOString(),
    spanDays,
  };
}

// ─── Observer Integration ────────────────────────────────

/**
 * Observe the history.jsonl file as an environment component.
 */
export function observeHistory(homeDir: string): EnvironmentComponent {
  const historyPath = join(homeDir, '.claude', 'history.jsonl');
  const present = existsSync(historyPath);
  const im: string[] = [];
  const ker: string[] = [
    'what the user thought but did not type',
    'conversations in other projects that inform this one',
    'the emotional context behind each message',
    'tool outputs that were not persisted in history',
  ];

  if (present) {
    try {
      const stats = computeHistoryStats(homeDir);
      im.push(`Total entries: ${stats.totalEntries} across ${stats.totalSessions} sessions`);
      im.push(`This project: ${stats.thisProjectEntries} entries, ${stats.thisProjectSessions} sessions`);
      im.push(`History span: ${stats.spanDays} days (${stats.oldestEntry.slice(0, 10)} to ${stats.newestEntry.slice(0, 10)})`);

      // Recent sessions
      const recent = stats.sessions.slice(-3);
      for (const s of recent) {
        im.push(`Recent session: ${s.messageCount} msgs, ${s.durationMinutes}min — "${s.firstWords.slice(0, 40)}..."`);
      }

      const fileSize = statSync(historyPath).size;
      im.push(`File size: ${Math.round(fileSize / 1024)} KB`);
    } catch {
      im.push('history.jsonl exists but failed to parse');
    }
  }

  return {
    name: 'Conversation History',
    path: historyPath,
    present,
    towerLevel: 6,  // world-model — cross-session memory
    projection: 'P2', // mediation — bridges past to present
    status: 'ENCODED',
    im,
    ker,
  };
}

// ─── Formatted Output ────────────────────────────────────

/**
 * Format history stats for display.
 */
export function formatHistory(homeDir: string): string {
  const stats = computeHistoryStats(homeDir);
  const lines: string[] = [];

  lines.push('');
  lines.push('  CONVERSATION HISTORY');
  lines.push('  ══════════════════════════════════════');
  lines.push('');

  lines.push(`  Total: ${stats.totalEntries} entries across ${stats.totalSessions} sessions`);
  lines.push(`  This project: ${stats.thisProjectEntries} entries, ${stats.thisProjectSessions} sessions`);
  lines.push(`  Span: ${stats.spanDays} days`);
  lines.push(`  From: ${stats.oldestEntry.slice(0, 19)}`);
  lines.push(`  To:   ${stats.newestEntry.slice(0, 19)}`);
  lines.push('');

  if (stats.sessions.length > 0) {
    lines.push('  SESSION HISTORY (this project)');
    lines.push('  ──────────────────────────────────────');

    // Show last 15 sessions
    const recent = stats.sessions.slice(-15);
    for (const s of recent) {
      const date = new Date(s.firstMessage).toISOString().slice(0, 16).replace('T', ' ');
      lines.push(`  ${date}  ${String(s.messageCount).padStart(3)} msgs  ${String(s.durationMinutes).padStart(5)}min  ${s.firstWords.slice(0, 45)}`);
    }
    lines.push('');

    // Session size distribution
    const msgCounts = stats.sessions.map((s) => s.messageCount);
    const avgMsgs = Math.round(msgCounts.reduce((a, b) => a + b, 0) / msgCounts.length);
    const maxMsgs = Math.max(...msgCounts);
    const durations = stats.sessions.map((s) => s.durationMinutes);
    const avgDuration = Math.round(durations.reduce((a, b) => a + b, 0) / durations.length * 10) / 10;

    lines.push('  PATTERNS');
    lines.push(`    Avg messages/session: ${avgMsgs}`);
    lines.push(`    Max messages/session: ${maxMsgs}`);
    lines.push(`    Avg session duration: ${avgDuration} min`);
    lines.push(`    Total sessions: ${stats.thisProjectSessions}`);
    lines.push('');
  }

  return lines.join('\n');
}
