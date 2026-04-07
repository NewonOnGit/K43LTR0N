/**
 * Face Timeline
 *
 * Tracks P1/P2/P3 face strengths over time.
 * Detects trends (improving/degrading/stable) and anomalies.
 *
 * P3-primary: observes the projection faces themselves.
 */

import { readEvents } from './telemetry.js';
import type {
  FaceTimelineEntry, FaceTrend, FaceTimelineReport,
  Projection, TelemetryEvent,
} from './types.js';

/**
 * Build the face timeline from k6_pass events in telemetry.
 */
export function buildTimeline(repoRoot: string): FaceTimelineEntry[] {
  const events = readEvents(repoRoot);
  const k6Events = events.filter((e) => e.event === 'k6.pass');
  const entries: FaceTimelineEntry[] = [];

  for (const e of k6Events) {
    const fs = e.data.faceStrengths as { P1: number; P2: number; P3: number } | undefined;
    if (!fs) continue;

    const avg = (fs.P1 + fs.P2 + fs.P3) / 3;
    const variance = ((fs.P1 - avg) ** 2 + (fs.P2 - avg) ** 2 + (fs.P3 - avg) ** 2) / 3;
    const stddev = Math.sqrt(variance);
    const balance = avg > 0 ? Math.max(0, 1 - stddev / avg) : 0;

    entries.push({
      sessionId: '', // k6_pass events don't carry sessionId directly
      timestamp: e.timestamp,
      p1Strength: fs.P1,
      p2Strength: fs.P2,
      p3Strength: fs.P3,
      faceBalance: Math.round(balance * 1000) / 1000,
    });
  }

  return entries;
}

/**
 * Compute the trend for a single face using linear regression.
 */
export function computeTrend(
  entries: FaceTimelineEntry[],
  projection: Projection,
  windowSize: number = 5,
): FaceTrend {
  const window = entries.slice(-windowSize);
  if (window.length < 2) {
    return { projection, direction: 'stable', slope: 0, anomaly: false };
  }

  const values = window.map((e) => {
    switch (projection) {
      case 'P1': return e.p1Strength;
      case 'P2': return e.p2Strength;
      case 'P3': return e.p3Strength;
    }
  });

  // Simple linear regression: y = mx + b
  const n = values.length;
  const xs = Array.from({ length: n }, (_, i) => i);
  const sumX = xs.reduce((a, b) => a + b, 0);
  const sumY = values.reduce((a, b) => a + b, 0);
  const sumXY = xs.reduce((sum, x, i) => sum + x * values[i], 0);
  const sumX2 = xs.reduce((sum, x) => sum + x * x, 0);

  const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX) || 0;

  // Anomaly: check for >0.2 jump between consecutive entries
  let anomaly = false;
  let anomalyDescription: string | undefined;
  for (let i = 1; i < values.length; i++) {
    const delta = Math.abs(values[i] - values[i - 1]);
    if (delta > 0.2) {
      anomaly = true;
      anomalyDescription = `${projection} jumped ${Math.round(delta * 100)}% between entries ${i - 1} and ${i}`;
      break;
    }
  }

  const direction: FaceTrend['direction'] =
    slope > 0.01 ? 'improving' : slope < -0.01 ? 'degrading' : 'stable';

  return {
    projection,
    direction,
    slope: Math.round(slope * 1000) / 1000,
    anomaly,
    anomalyDescription,
  };
}

/**
 * Generate the full timeline report with trends and health.
 */
export function generateReport(repoRoot: string): FaceTimelineReport {
  const entries = buildTimeline(repoRoot);
  const trends = (['P1', 'P2', 'P3'] as Projection[]).map((p) => computeTrend(entries, p));

  const degradingCount = trends.filter((t) => t.direction === 'degrading').length;
  const lastEntry = entries[entries.length - 1];
  const imbalanced = lastEntry && lastEntry.faceBalance < 0.6;

  const overallHealth: FaceTimelineReport['overallHealth'] =
    degradingCount >= 2 ? 'degrading' : imbalanced ? 'imbalanced' : 'healthy';

  const recommendations: string[] = [];
  for (const t of trends) {
    if (t.direction === 'degrading') {
      recommendations.push(`${t.projection} face is degrading (slope: ${t.slope}/session)`);
    }
    if (t.anomaly && t.anomalyDescription) {
      recommendations.push(`Anomaly: ${t.anomalyDescription}`);
    }
  }
  if (imbalanced) {
    const weakest = trends.reduce((a, b) =>
      (lastEntry[`p${a.projection.slice(1).toLowerCase()}Strength` as keyof FaceTimelineEntry] as number) <
      (lastEntry[`p${b.projection.slice(1).toLowerCase()}Strength` as keyof FaceTimelineEntry] as number)
        ? a : b,
    );
    recommendations.push(`Face imbalance: ${weakest.projection} is weakest — strengthen observation`);
  }

  return { entries, trends, overallHealth, recommendations };
}

/**
 * ASCII sparkline for a value array (0-1 range).
 */
function sparkline(values: number[]): string {
  const chars = ' ▁▂▃▄▅▆▇█';
  return values
    .map((v) => chars[Math.min(Math.round(v * 8), 8)])
    .join('');
}

/**
 * Format the timeline report for terminal display.
 */
export function formatTimeline(report: FaceTimelineReport): string {
  const lines: string[] = [];

  lines.push('');
  lines.push('  FACE TIMELINE');
  lines.push('  ══════════════════════════════════════');
  lines.push('');

  if (report.entries.length === 0) {
    lines.push('  No K6\' passes recorded in telemetry yet.');
    lines.push('');
    return lines.join('\n');
  }

  const last = report.entries[report.entries.length - 1];
  const p1Values = report.entries.map((e) => e.p1Strength);
  const p2Values = report.entries.map((e) => e.p2Strength);
  const p3Values = report.entries.map((e) => e.p3Strength);
  const balValues = report.entries.map((e) => e.faceBalance);

  const p1Trend = report.trends.find((t) => t.projection === 'P1')!;
  const p2Trend = report.trends.find((t) => t.projection === 'P2')!;
  const p3Trend = report.trends.find((t) => t.projection === 'P3')!;

  lines.push(`  P1  ${sparkline(p1Values)}  ${Math.round(last.p1Strength * 100)}%  ${p1Trend.direction}`);
  lines.push(`  P2  ${sparkline(p2Values)}  ${Math.round(last.p2Strength * 100)}%  ${p2Trend.direction}`);
  lines.push(`  P3  ${sparkline(p3Values)}  ${Math.round(last.p3Strength * 100)}%  ${p3Trend.direction}`);
  lines.push(`  Bal ${sparkline(balValues)}  ${Math.round(last.faceBalance * 100)}%`);
  lines.push('');

  lines.push(`  Entries: ${report.entries.length}`);
  lines.push(`  Health: ${report.overallHealth}`);
  lines.push(`  Timespan: ${report.entries[0].timestamp.slice(0, 19)} -> ${last.timestamp.slice(0, 19)}`);
  lines.push('');

  if (report.recommendations.length > 0) {
    lines.push('  Recommendations:');
    for (const r of report.recommendations) {
      lines.push(`    -> ${r}`);
    }
    lines.push('');
  }

  return lines.join('\n');
}
