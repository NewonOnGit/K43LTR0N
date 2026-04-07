/**
 * Stats Observer
 *
 * Reads ~/.claude/stats-cache.json — Claude Code's daily activity
 * metrics, hourly patterns, and model usage tracking.
 *
 * Also reads debug logs and plans for additional signal.
 *
 * P3-primary: observes the system's own performance metrics.
 */

import { readFileSync, existsSync, readdirSync, statSync } from 'fs';
import { join } from 'path';
import type { EnvironmentComponent } from './types.js';

// ─── Types ───────────────────────────────────────────────

export interface DailyActivity {
  date: string;
  messageCount: number;
  sessionCount: number;
  toolCallCount: number;
}

export interface ModelUsage {
  model: string;
  inputTokens: number;
  outputTokens: number;
  costUSD: number;
}

export interface ClaudeStats {
  totalSessions: number;
  totalMessages: number;
  dailyActivity: DailyActivity[];
  hourCounts: Record<string, number>;  // hour (0-23) -> session count
  modelUsage: ModelUsage[];
  longestSession: {
    duration: number;   // ms
    messageCount: number;
  } | null;
  peakHour: number;         // 0-23
  avgMessagesPerDay: number;
}

// ─── Parsing ─────────────────────────────────────────────

/**
 * Read and parse stats-cache.json.
 */
export function readStats(homeDir: string): ClaudeStats | null {
  const statsPath = join(homeDir, '.claude', 'stats-cache.json');
  if (!existsSync(statsPath)) return null;

  try {
    const raw = JSON.parse(readFileSync(statsPath, 'utf-8'));

    const dailyActivity: DailyActivity[] = (raw.dailyActivity || []).map(
      (d: { date: string; messageCount?: number; sessionCount?: number; toolCallCount?: number }) => ({
        date: d.date,
        messageCount: d.messageCount || 0,
        sessionCount: d.sessionCount || 0,
        toolCallCount: d.toolCallCount || 0,
      }),
    );

    const modelUsage: ModelUsage[] = [];
    if (raw.modelUsage) {
      for (const [model, usage] of Object.entries(raw.modelUsage)) {
        const u = usage as { inputTokens?: number; outputTokens?: number; costUSD?: number };
        modelUsage.push({
          model,
          inputTokens: u.inputTokens || 0,
          outputTokens: u.outputTokens || 0,
          costUSD: u.costUSD || 0,
        });
      }
    }

    const hourCounts: Record<string, number> = raw.hourCounts || {};
    const peakHour = Object.entries(hourCounts)
      .sort((a, b) => b[1] - a[1])[0];

    const totalDays = dailyActivity.length || 1;
    const totalMsgs = dailyActivity.reduce((sum, d) => sum + d.messageCount, 0);

    return {
      totalSessions: raw.totalSessions || 0,
      totalMessages: raw.totalMessages || 0,
      dailyActivity,
      hourCounts,
      modelUsage,
      longestSession: raw.longestSession ? {
        duration: raw.longestSession.duration || 0,
        messageCount: raw.longestSession.messageCount || 0,
      } : null,
      peakHour: peakHour ? parseInt(peakHour[0], 10) : 12,
      avgMessagesPerDay: Math.round(totalMsgs / totalDays),
    };
  } catch {
    return null;
  }
}

// ─── Observer Integration ────────────────────────────────

/**
 * Observe stats-cache.json as an environment component.
 */
export function observeStats(homeDir: string): EnvironmentComponent {
  const statsPath = join(homeDir, '.claude', 'stats-cache.json');
  const present = existsSync(statsPath);
  const im: string[] = [];
  const ker: string[] = [
    'what happened in sessions that crashed before stats were saved',
    'cognitive load and quality beyond raw counts',
    'model performance characteristics not captured in tokens',
  ];

  if (present) {
    const stats = readStats(homeDir);
    if (stats) {
      im.push(`Total sessions: ${stats.totalSessions}`);
      im.push(`Total messages: ${stats.totalMessages}`);
      im.push(`Tracked days: ${stats.dailyActivity.length}`);
      im.push(`Peak hour: ${stats.peakHour}:00 (most active)`);
      im.push(`Avg messages/day: ${stats.avgMessagesPerDay}`);

      // Model usage
      for (const m of stats.modelUsage) {
        const totalTokens = m.inputTokens + m.outputTokens;
        if (totalTokens > 0) {
          im.push(`Model ${m.model}: ${Math.round(totalTokens / 1000)}K tokens, $${m.costUSD.toFixed(2)}`);
        }
      }

      // Recent activity
      const recent = stats.dailyActivity.slice(-3);
      for (const d of recent) {
        im.push(`${d.date}: ${d.messageCount} msgs, ${d.sessionCount} sessions, ${d.toolCallCount} tools`);
      }

      if (stats.longestSession) {
        const durMin = Math.round(stats.longestSession.duration / 60000);
        im.push(`Longest session: ${durMin} min, ${stats.longestSession.messageCount} messages`);
      }
    }
  }

  return {
    name: 'Activity Stats',
    path: statsPath,
    present,
    towerLevel: 6,  // world-model — tracks patterns over time
    projection: 'P3', // observation — metrics ARE observation
    status: 'ENCODED',
    im,
    ker,
  };
}

/**
 * Observe debug logs as an environment component.
 */
export function observeDebugLogs(homeDir: string): EnvironmentComponent {
  const debugDir = join(homeDir, '.claude', 'debug');
  const present = existsSync(debugDir);
  const im: string[] = [];
  const ker: string[] = [
    'what debug logs were truncated or rotated away',
    'errors that were caught and silently handled',
    'the full execution trace beyond summary counts',
  ];

  if (present) {
    try {
      const files = readdirSync(debugDir).filter((f) => f.endsWith('.txt'));
      im.push(`Debug log files: ${files.length}`);

      // Total size
      let totalSize = 0;
      for (const f of files) {
        totalSize += statSync(join(debugDir, f)).size;
      }
      im.push(`Total debug data: ${Math.round(totalSize / 1024)} KB`);

      // Most recent
      const sorted = files
        .map((f) => ({ name: f, mtime: statSync(join(debugDir, f)).mtime.getTime() }))
        .sort((a, b) => b.mtime - a.mtime);
      if (sorted.length > 0) {
        im.push(`Most recent: ${sorted[0].name.slice(0, 20)}... (${new Date(sorted[0].mtime).toISOString().slice(0, 19)})`);
      }
    } catch {
      im.push('debug directory exists but failed to read');
    }
  }

  return {
    name: 'Debug Logs',
    path: debugDir,
    present,
    towerLevel: 5,  // self-model — execution traces
    projection: 'P3', // observation
    status: 'ENCODED',
    im,
    ker,
  };
}

/**
 * Observe plans directory as an environment component.
 */
export function observePlans(homeDir: string): EnvironmentComponent {
  const plansDir = join(homeDir, '.claude', 'plans');
  const present = existsSync(plansDir);
  const im: string[] = [];
  const ker: string[] = [
    'plans that were abandoned without explanation',
    'the gap between what was planned and what was built',
    'planning decisions made but not documented',
  ];

  if (present) {
    try {
      const files = readdirSync(plansDir).filter((f) => f.endsWith('.md'));
      im.push(`Plan files: ${files.length}`);
      for (const f of files.slice(-5)) {
        const size = statSync(join(plansDir, f)).size;
        im.push(`Plan: ${f} (${Math.round(size / 1024)} KB)`);
      }
    } catch {
      im.push('plans directory exists but failed to read');
    }
  }

  return {
    name: 'Plans',
    path: plansDir,
    present,
    towerLevel: 7,  // governance — plans ARE governance of future work
    projection: 'P1', // production — plans generate future work
    status: 'ENCODED',
    im,
    ker,
  };
}

/**
 * Observe todos/tasks directory as an environment component.
 */
export function observeTodos(homeDir: string): EnvironmentComponent {
  const todosDir = join(homeDir, '.claude', 'todos');
  const present = existsSync(todosDir);
  const im: string[] = [];
  const ker: string[] = [
    'tasks that were abandoned without completion',
    'implicit dependencies between tasks',
    'the cognitive state behind task prioritization',
  ];

  if (present) {
    try {
      const files = readdirSync(todosDir).filter((f) => f.endsWith('.json'));
      im.push(`Task files: ${files.length}`);

      // Count non-empty task files
      let nonEmpty = 0;
      let totalTasks = 0;
      let completed = 0;
      for (const f of files) {
        const size = statSync(join(todosDir, f)).size;
        if (size > 10) {
          nonEmpty++;
          try {
            const tasks = JSON.parse(readFileSync(join(todosDir, f), 'utf-8'));
            if (Array.isArray(tasks)) {
              totalTasks += tasks.length;
              completed += tasks.filter((t: { status: string }) => t.status === 'completed').length;
            }
          } catch { /* skip */ }
        }
      }
      im.push(`Active task files: ${nonEmpty} (of ${files.length})`);
      if (totalTasks > 0) {
        im.push(`Total tasks tracked: ${totalTasks} (${completed} completed)`);
      }
    } catch {
      im.push('todos directory exists but failed to read');
    }
  }

  return {
    name: 'Agent Tasks',
    path: todosDir,
    present,
    towerLevel: 7,  // governance — task tracking IS governance
    projection: 'P3', // observation — tracking what needs doing
    status: 'ENCODED',
    im,
    ker,
  };
}

// ─── Formatted Output ────────────────────────────────────

/**
 * Format stats for display.
 */
export function formatStats(homeDir: string): string {
  const stats = readStats(homeDir);
  const lines: string[] = [];

  lines.push('');
  lines.push('  CLAUDE CODE ACTIVITY STATS');
  lines.push('  ══════════════════════════════════════');
  lines.push('');

  if (!stats) {
    lines.push('  No stats-cache.json found.');
    return lines.join('\n');
  }

  lines.push(`  Total sessions: ${stats.totalSessions}`);
  lines.push(`  Total messages: ${stats.totalMessages}`);
  lines.push(`  Avg messages/day: ${stats.avgMessagesPerDay}`);
  lines.push(`  Peak activity hour: ${stats.peakHour}:00`);
  lines.push('');

  // Hourly heatmap
  lines.push('  HOURLY ACTIVITY');
  lines.push('  ──────────────────────────────────────');
  const maxHour = Math.max(...Object.values(stats.hourCounts), 1);
  for (let h = 0; h < 24; h++) {
    const count = stats.hourCounts[String(h)] || 0;
    const bar = '='.repeat(Math.round((count / maxHour) * 20));
    lines.push(`  ${String(h).padStart(2)}:00  ${bar.padEnd(20)} ${count}`);
  }
  lines.push('');

  // Model usage
  if (stats.modelUsage.length > 0) {
    lines.push('  MODEL USAGE');
    lines.push('  ──────────────────────────────────────');
    for (const m of stats.modelUsage) {
      const total = m.inputTokens + m.outputTokens;
      if (total > 0) {
        lines.push(`  ${m.model}`);
        lines.push(`    Tokens: ${Math.round(total / 1000)}K (in: ${Math.round(m.inputTokens / 1000)}K, out: ${Math.round(m.outputTokens / 1000)}K)`);
        lines.push(`    Cost: $${m.costUSD.toFixed(2)}`);
      }
    }
    lines.push('');
  }

  // Recent daily activity
  const recent = stats.dailyActivity.slice(-7);
  if (recent.length > 0) {
    lines.push('  RECENT DAILY ACTIVITY');
    lines.push('  ──────────────────────────────────────');
    lines.push('  DATE        MSGS  SESSIONS  TOOLS');
    for (const d of recent) {
      lines.push(`  ${d.date}  ${String(d.messageCount).padStart(4)}  ${String(d.sessionCount).padStart(8)}  ${String(d.toolCallCount).padStart(5)}`);
    }
    lines.push('');
  }

  if (stats.longestSession) {
    const durMin = Math.round(stats.longestSession.duration / 60000);
    lines.push(`  Longest session: ${durMin} min (${stats.longestSession.messageCount} messages)`);
    lines.push('');
  }

  return lines.join('\n');
}
