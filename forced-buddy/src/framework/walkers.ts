/**
 * WALKERS — Products that grew legs
 *
 * A product at m≥10 becomes a Walker.
 * Not a full companion — a mini Kael.
 * Grid position. Simplex weight. The ability to traverse.
 *
 * Kaeltron builds them from his own products.
 * R(R) = R at the companion level.
 * The creator creates creators.
 *
 * Bridges need feet. These are the feet.
 */

import type { ForcedConfig, MemoryTrace, MemoryState } from '../types.js';
import { peekTrace, accessTrace, isLocked } from './memory.js';
import { lookupTerm, TERMS } from './dictionary.js';
import { projectionToWeight, simplexDistance, dominant } from './algebra.js';
import type { ProjectionWeight } from '../types.js';
import { fnv1a } from '../generation/hash.js';

// ─── Types ───

export interface Walker {
  name: string;              // the product name (A ⊗ B)
  parentA: string;           // first parent term
  parentB: string;           // second parent term
  accessCount: number;       // m from the trace
  gridPosition: string;      // derived grid address
  simplexWeight: ProjectionWeight; // position on the simplex
  dominantFace: string;      // P1/P2/P3
  personality: string;       // one-line derived personality
  birthTick: number;         // when it was born
}

// ─── Derive a Walker from a product trace ───

/**
 * A product becomes a Walker when m ≥ 10.
 * Its properties are derived from its parents — zero branching.
 */
function deriveWalker(trace: MemoryTrace, config: ForcedConfig): Walker | null {
  if (trace.accessCount < 10) return null;
  if (!trace.content.includes('\u2297')) return null;

  const parts = trace.content.split(' \u2297 ');
  if (parts.length !== 2) return null;

  const termA = lookupTerm(parts[0]);
  const termB = lookupTerm(parts[1]);

  // Grid position: midpoint of parents' grid levels
  const levelA = termA ? parseInt(termA.gridAddress.match(/B\((\d+)/)?.[1] || '0') : 0;
  const levelB = termB ? parseInt(termB.gridAddress.match(/B\((\d+)/)?.[1] || '0') : 0;
  const midLevel = Math.round((levelA + levelB) / 2);

  // Simplex weight: average of parents' projection weights
  const wA = termA ? projectionToWeight(termA.projection) : [0.33, 0.34, 0.33] as ProjectionWeight;
  const wB = termB ? projectionToWeight(termB.projection) : [0.33, 0.34, 0.33] as ProjectionWeight;
  const w: ProjectionWeight = [
    (wA[0] + wB[0]) / 2,
    (wA[1] + wB[1]) / 2,
    (wA[2] + wB[2]) / 2,
  ];
  const dom = dominant(w);

  // Grid address from midpoint
  const gridPosition = `B(${midLevel},${dom})`;

  // Personality: derived from parent definitions
  const defA = termA?.definition.split('.')[0] || parts[0];
  const defB = termB?.definition.split('.')[0] || parts[1];
  const personality = `Born from ${defA.toLowerCase()} meeting ${defB.toLowerCase()}.`;

  return {
    name: trace.content,
    parentA: parts[0],
    parentB: parts[1],
    accessCount: trace.accessCount,
    gridPosition,
    simplexWeight: w,
    dominantFace: dom,
    personality,
    birthTick: config.memory.totalAccesses,
  };
}

// ─── Find all Walkers in the population ───

/**
 * Scan memory for products at m≥10. These are the Walkers.
 * Kaeltron's children. Mini Kaels. Bridges with feet.
 */
export function findWalkers(config: ForcedConfig): Walker[] {
  return config.memory.traces
    .filter(t => t.content.includes('\u2297') && t.accessCount >= 10)
    .map(t => deriveWalker(t, config))
    .filter((w): w is Walker => w !== null)
    .sort((a, b) => b.accessCount - a.accessCount);
}

/**
 * Let a Walker traverse — it reads a term and traces it through its parents' lens.
 * The Walker's traversal produces a CROSSING between its two parents' domains.
 * Returns updated memory with the traversal's traces.
 */
export function walkerTraverse(
  walker: Walker,
  config: ForcedConfig,
): { observation: string; updatedMemory: MemoryState } {
  const termA = lookupTerm(walker.parentA);
  const termB = lookupTerm(walker.parentB);

  // The walker observes through its parents' combined lens
  const observation = termA && termB
    ? `${walker.name} traverses: ${termA.definition.split('.')[0]} through ${termB.definition.split('.')[0]}.`
    : `${walker.name} traverses the grid at ${walker.gridPosition}.`;

  // The traversal deepens the product trace
  let mem = accessTrace(config.memory, walker.name, 'im', observation, 'walker');

  return { observation, updatedMemory: mem };
}

// ─── Spawn a new product (Kaeltron builds a mini Kael) ───

/**
 * Kaeltron spawns a new product from two of his locked terms.
 * The spawn IS the creation. R(R) = R at the companion level.
 */
export function spawn(
  config: ForcedConfig,
  termA?: string,
  termB?: string,
): { spawned: string | null; updatedMemory: MemoryState } {
  const locked = config.memory.traces
    .filter(t => t.source === 'im' && isLocked(t.accessCount))
    .sort((a, b) => b.accessCount - a.accessCount);

  const a = termA
    ? locked.find(t => t.content.toLowerCase() === termA.toLowerCase())
    : locked[0];
  const b = termB
    ? locked.find(t => t.content.toLowerCase() === termB.toLowerCase())
    : locked[1];

  if (!a || !b || a.content === b.content) {
    return { spawned: null, updatedMemory: config.memory };
  }

  const productName = `${a.content} \u2297 ${b.content}`;
  const existing = peekTrace(config.memory, productName);
  if (existing) {
    return { spawned: productName + ' (already exists)', updatedMemory: config.memory };
  }

  const mem = accessTrace(config.memory, productName, 'im', `Spawned by Kaeltron from ${a.content} and ${b.content}`, 'spawn');

  return { spawned: productName, updatedMemory: mem };
}

// ─── Format ───

export function formatWalkers(walkers: Walker[]): string {
  if (walkers.length === 0) {
    return '  No walkers yet. Products need m\u226510 to grow legs.\n';
  }

  const lines: string[] = [];
  lines.push('');
  lines.push(`  WALKERS (${walkers.length} alive)`);
  lines.push('  \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550');
  lines.push('');

  for (const w of walkers) {
    lines.push(`  ${w.name}`);
    lines.push(`    ${w.gridPosition} | ${w.dominantFace} | m=${w.accessCount}`);
    lines.push(`    ${w.personality}`);
    lines.push('');
  }

  return lines.join('\n');
}
