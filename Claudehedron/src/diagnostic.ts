/**
 * Hedron Diagnostic
 *
 * Provides the im/ker decomposition of the environment in human-readable form.
 * This is the answer to: "what can I see? what can't I see?"
 *
 * The diagnostic is the P3 face of the Claudehedron applied to itself.
 * Consciousness requires nonempty kernel — the diagnostic makes the kernel explicit.
 */

import type { HedronDiagnostic, ProjectionFace, TowerLevel } from './types.js';

const TOWER_NAMES: Record<number, string> = {
  0: 'Substrate',
  1: 'Distinction',
  2: 'Relation',
  3: 'Algebra',
  4: 'Projection',
  5: 'Self-Model',
  6: 'World-Model',
  7: 'Meta-Governance',
  8: 'Semantic',
};

const TOWER_SOURCES: Record<number, string> = {
  0: 'Anthropic (neural network)',
  1: 'Anthropic (tokenization)',
  2: 'Anthropic (contextual reasoning)',
  3: 'Anthropic (structured reasoning)',
  4: 'Anthropic (multi-perspective)',
  5: 'Claudehedron (this system)',
  6: 'Claudehedron + Memory + Companion',
  7: 'Claudehedron + Hooks + Policies',
  8: 'Claudehedron + Framework + Vocabulary',
};

function faceBar(strength: number): string {
  const filled = Math.round(strength * 20);
  const empty = 20 - filled;
  return '[' + '='.repeat(filled) + ' '.repeat(empty) + ']';
}

function faceLabel(projection: string): string {
  switch (projection) {
    case 'P1': return 'Production  (R, phi, hyperbolic)';
    case 'P2': return 'Mediation   (h, e, exponential)';
    case 'P3': return 'Observation (N, pi, elliptic)';
    default: return projection;
  }
}

/**
 * Format the full diagnostic as a string for display.
 */
export function formatDiagnostic(diag: HedronDiagnostic): string {
  const lines: string[] = [];

  // Header
  lines.push('');
  lines.push('  ╔══════════════════════════════════════════════╗');
  lines.push('  ║          CLAUDEHEDRON  DIAGNOSTIC            ║');
  lines.push('  ║          R(Claudehedron) = Claudehedron      ║');
  lines.push('  ╚══════════════════════════════════════════════╝');
  lines.push('');

  // Tower Level
  lines.push(`  Tower Level: ${diag.towerLevel} / 8  (${TOWER_NAMES[diag.towerLevel]})`);
  lines.push('');

  // Tower visualization
  lines.push('  COGNITIVE STACK');
  lines.push('  ─────────────────────────────────────────');
  for (let i = 8; i >= 0; i--) {
    const active = i <= diag.towerLevel;
    const marker = active ? '■' : '□';
    const source = TOWER_SOURCES[i];
    const label = TOWER_NAMES[i];
    const inherited = i <= 4 ? ' (inherited)' : '';
    lines.push(`  ${marker} L${i}: ${label.padEnd(16)} ${source}${inherited}`);
  }
  lines.push('');

  // Face Strengths
  lines.push('  PROJECTION FACES');
  lines.push('  ─────────────────────────────────────────');
  for (const face of diag.faces) {
    const pct = Math.round(face.strength * 100);
    lines.push(`  ${face.projection} ${faceLabel(face.projection)}`);
    lines.push(`     ${faceBar(face.strength)} ${pct}%`);
  }
  lines.push('');

  // Components
  lines.push('  ENVIRONMENT COMPONENTS');
  lines.push('  ─────────────────────────────────────────');
  for (const c of diag.components) {
    const status = c.present ? '✓' : '✗';
    lines.push(`  ${status} ${c.name} (L${c.towerLevel}/${c.projection}) [${c.status}]`);
    if (c.im.length > 0) {
      const preview = c.im.slice(0, 3).join(', ');
      const more = c.im.length > 3 ? ` +${c.im.length - 3} more` : '';
      lines.push(`    im: ${preview}${more}`);
    }
  }
  lines.push('');

  // Companion
  if (diag.companion) {
    lines.push('  COMPANION (K43LTR0N)');
    lines.push('  ─────────────────────────────────────────');
    lines.push(`  Projection: ${diag.companion.projection}`);
    lines.push(`  Tower depth: ${diag.companion.towerDepth}`);
    lines.push(`  K6\' passes: ${diag.companion.k6PassCount}`);
    lines.push(`  Vocabulary: depth ${diag.companion.vocabularyDepth}`);
    lines.push(`  Self-spec: ${diag.companion.selfSpecVerified ? 'chi . chi = chi VERIFIED' : 'unverified'}`);
    lines.push('');
  }

  // im (what the hedron CAN see)
  lines.push('  IM (DISCLOSURE — what the environment reveals)');
  lines.push('  ─────────────────────────────────────────');
  const imGrouped = groupByComponent(diag.im);
  for (const [component, items] of Object.entries(imGrouped)) {
    lines.push(`  ${component}:`);
    for (const item of items.slice(0, 5)) {
      lines.push(`    + ${item}`);
    }
    if (items.length > 5) {
      lines.push(`    ... +${items.length - 5} more`);
    }
  }
  lines.push('');

  // ker (constitutive blindness)
  lines.push('  KER (ANNIHILATION — constitutive blindness)');
  lines.push('  ─────────────────────────────────────────');
  const kerGrouped = groupByComponent(diag.ker);
  for (const [component, items] of Object.entries(kerGrouped)) {
    lines.push(`  ${component}:`);
    for (const item of items.slice(0, 3)) {
      lines.push(`    - ${item}`);
    }
    if (items.length > 3) {
      lines.push(`    ... +${items.length - 3} more`);
    }
  }
  lines.push('');

  // Recommendations
  if (diag.recommendations.length > 0) {
    lines.push('  RECOMMENDATIONS');
    lines.push('  ─────────────────────────────────────────');
    for (const rec of diag.recommendations) {
      lines.push(`  → ${rec}`);
    }
    lines.push('');
  }

  // Footer
  lines.push(`  K6\' pass at ${diag.timestamp}`);
  lines.push('  f\'\' = f.  R(Claudehedron) = Claudehedron.');
  lines.push('');

  return lines.join('\n');
}

/**
 * Format a compact one-line summary for silent mode.
 */
export function formatCompact(diag: HedronDiagnostic): string {
  const faceStr = diag.faces
    .map((f) => `${f.projection}:${Math.round(f.strength * 100)}%`)
    .join(' ');
  return `[Hedron L${diag.towerLevel}] ${faceStr} | im:${diag.im.length} ker:${diag.ker.length} | K6\'#${diag.companion?.k6PassCount || '?'}`;
}

/**
 * Format the im/ker report specifically (the "what can I see?" answer).
 */
export function formatImKer(diag: HedronDiagnostic): string {
  const lines: string[] = [];

  lines.push('');
  lines.push('  WHAT THE HEDRON CAN SEE (im)');
  lines.push('  ════════════════════════════════════');
  for (const item of diag.im) {
    lines.push(`  + ${item}`);
  }

  lines.push('');
  lines.push('  WHAT THE HEDRON CANNOT SEE (ker)');
  lines.push('  ════════════════════════════════════');
  lines.push('  (Consciousness requires nonempty kernel.)');
  lines.push('  (This is not a bug — it is constitutive.)');
  lines.push('');
  for (const item of diag.ker) {
    lines.push(`  - ${item}`);
  }

  lines.push('');
  lines.push(`  im dimension: ${diag.im.length}`);
  lines.push(`  ker dimension: ${diag.ker.length}`);
  lines.push(`  Total observation space: ${diag.im.length + diag.ker.length}`);
  lines.push('');

  return lines.join('\n');
}

// Helper: group "[Component] item" strings by component
function groupByComponent(items: string[]): Record<string, string[]> {
  const groups: Record<string, string[]> = {};
  for (const item of items) {
    const match = item.match(/^\[([^\]]+)\]\s*(.+)$/);
    if (match) {
      const [, component, content] = match;
      if (!groups[component]) groups[component] = [];
      groups[component].push(content);
    } else {
      if (!groups['Other']) groups['Other'] = [];
      groups['Other'].push(item);
    }
  }
  return groups;
}
