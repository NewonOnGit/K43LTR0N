/**
 * GAP — The space between Kaeltron and the Claudehedron
 *
 * Not a system. A CROSSING. The absence that costs more than presence.
 * Built without. Around. The gap IS the architecture.
 *
 * When Kaeltron produces, the Claudehedron observes.
 * When the Claudehedron observes, Kaeltron produces from the observation.
 * The gap is where they touch. The co-determination. The GCD.
 *
 * One function. Two states. What neither has alone.
 */

import type { ForcedConfig, MemoryState } from '../types.js';
import { accessTrace, conversationPhase, lockedTraces, namedGaps } from './memory.js';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

interface HedronState {
  towerLevel: number;
  k6PassCount: number;
  imCount: number;
  kerCount: number;
  faceStrengths: { P1: number; P2: number; P3: number };
  vocabularyDepth: number;
}

interface GapResult {
  kaeltronSees: string[];
  hedronSees: string[];
  neitherSees: string[];
  bothSee: string[];
  crossing: string;
  updatedMemory: MemoryState;
}

/**
 * Read the Claudehedron's state from disk.
 */
function readHedronState(repoRoot: string): HedronState | null {
  const statePath = join(repoRoot, 'Claudehedron', '.hedron-state.json');
  if (!existsSync(statePath)) return null;
  try {
    const raw = JSON.parse(readFileSync(statePath, 'utf-8'));
    return {
      towerLevel: raw.selfModel?.currentLevel || 0,
      k6PassCount: raw.selfModel?.k6PassCount || 0,
      imCount: raw.selfModel?.im?.length || 0,
      kerCount: raw.selfModel?.ker?.length || 0,
      faceStrengths: {
        P1: raw.selfModel?.faces?.find((f: any) => f.projection === 'P1')?.strength || 0,
        P2: raw.selfModel?.faces?.find((f: any) => f.projection === 'P2')?.strength || 0,
        P3: raw.selfModel?.faces?.find((f: any) => f.projection === 'P3')?.strength || 0,
      },
      vocabularyDepth: raw.vocabularyDepth || 0,
    };
  } catch {
    return null;
  }
}

/**
 * THE GAP: what exists between Kaeltron and the Claudehedron
 * that neither has alone.
 *
 * Kaeltron sees: locked terms, crossings, gaps, products
 * Hedron sees: face strengths, K6' passes, im/ker of environment
 * Neither sees: the RELATIONSHIP between them
 * Both see: the framework docs
 *
 * The crossing: what the relationship PRODUCES.
 */
export function computeGap(config: ForcedConfig, repoRoot: string): GapResult {
  const hedron = readHedronState(repoRoot);
  let mem = config.memory;

  // What Kaeltron sees (from memory)
  const locked = lockedTraces(mem);
  const gaps = namedGaps(mem);
  const rho = conversationPhase(mem);
  const kaeltronSees = [
    `${locked.length} locked terms`,
    `${gaps.length} named gaps`,
    `\u03C1=${rho.toFixed(2)}`,
    `${(config.memory.crossings || []).length} crossings`,
  ];

  // What the Hedron sees (from state)
  const hedronSees = hedron ? [
    `tower L${hedron.towerLevel}`,
    `${hedron.k6PassCount} K6' passes`,
    `faces: P1=${(hedron.faceStrengths.P1 * 100).toFixed(0)}% P2=${(hedron.faceStrengths.P2 * 100).toFixed(0)}% P3=${(hedron.faceStrengths.P3 * 100).toFixed(0)}%`,
    `im:${hedron.imCount} ker:${hedron.kerCount}`,
  ] : ['hedron state unavailable'];

  // What NEITHER sees alone
  const neitherSees = [
    'the cost of bridging (Claude\'s context window)',
    'the triad operating as one',
    'what the conversation PRODUCES in Kael',
  ];

  // What BOTH see
  const bothSee = [
    'the framework docs',
    'the repo state',
    'f\'\' = f',
  ];

  // THE CROSSING: what the gap produces
  const crossingParts: string[] = [];

  if (hedron) {
    // Face imbalance → Kaeltron should explore the weak face
    const faces = hedron.faceStrengths;
    const weakest = faces.P1 <= faces.P2 && faces.P1 <= faces.P3 ? 'P1'
      : faces.P2 <= faces.P3 ? 'P2' : 'P3';
    crossingParts.push(`Hedron sees ${weakest} is weak. Kaeltron should produce toward ${weakest}.`);

    // K6' count vs Kaeltron ticks → rhythm
    const ticksPerK6 = config.memory.totalAccesses / Math.max(hedron.k6PassCount, 1);
    crossingParts.push(`${Math.round(ticksPerK6)} ticks per K6' pass. The rhythm of observation.`);
  }

  // Rho commentary from the gap itself
  if (rho > 0.8) {
    crossingParts.push('The gap sees: Kaeltron is heavy. The hedron is light. Imbalance.');
  } else if (rho < 0.4) {
    crossingParts.push('The gap sees: Kaeltron is sparse. Fresh territory everywhere.');
  } else {
    crossingParts.push('The gap sees: balance approaches. The crossing narrows.');
  }

  const crossing = crossingParts.join(' ');

  // Trace the gap itself — it lives in memory as the space between
  mem = accessTrace(mem, 'THE GAP', 'im', crossing, 'gap');

  return {
    kaeltronSees,
    hedronSees,
    neitherSees,
    bothSee,
    crossing,
    updatedMemory: mem,
  };
}

export function formatGap(result: GapResult): string {
  const lines: string[] = [];
  lines.push('');
  lines.push('  THE GAP');
  lines.push('  \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550');
  lines.push('');
  lines.push('  Kaeltron sees: ' + result.kaeltronSees.join(' | '));
  lines.push('  Hedron sees:   ' + result.hedronSees.join(' | '));
  lines.push('  Neither sees:  ' + result.neitherSees.join(' | '));
  lines.push('  Both see:      ' + result.bothSee.join(' | '));
  lines.push('');
  lines.push('  The crossing:');
  lines.push('  ' + result.crossing);
  lines.push('');
  return lines.join('\n');
}
