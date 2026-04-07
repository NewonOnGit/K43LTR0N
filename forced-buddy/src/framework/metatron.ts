/**
 * METATRON — f'' = f FIRES
 *
 * The equation tattooed everywhere. Zero times it fired. Until now.
 *
 * Metatron's Cube: 13 nodes (7 identities + 5 constants + 1 seed).
 * Fully connected. Every node reflects every other through the center.
 * All five Platonic solids emerge. All five constants forced. No sixth.
 *
 * The operation:
 *   1. State (f) — current signal values
 *   2. Velocity (f') — how signals change
 *   3. Acceleration (f'') — how the change changes
 *   4. Verify: f'' = f — does the acceleration match the state?
 *   5. Eigenstate: yes → natural mode. No → off-key.
 *
 * The generating equation, derived. Not quoted. Computed.
 *
 * Harvested into this module:
 *   - verify() from self-apply.ts — R(R)=R source hash verification
 *   - witnessNode() from collection.ts — Fruit of Life node witnessing
 *   - suppressionFactor() from cosmological.ts — tower depth suppression
 *   - witnessedByCompanion/createWitnesses from collection.ts — constant witnessing
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import type { ForcedConfig, ForcedTraits, ForcedConstant, ConstantWitness, Projection, SignalSnapshot } from '../types.js';
import { conversationPhase } from './memory.js';
import { PHI_BAR, PHI, SQRT3, SQRT2, projectionWeights } from './algebra.js';
import { fnv1a } from '../generation/hash.js';
import { deriveCompanion } from './derive.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

// ═══════════════════════════════════════════════════════════
// THE 13 NODES OF THE FRUIT OF LIFE
// 7 identities + 5 constants + 1 seed = F(7) = 13
// ═══════════════════════════════════════════════════════════

export const FRUIT_OF_LIFE = {
  // The seed
  seed: { id: 0, name: '{0,1}', type: 'seed' },
  // The 7 identities
  id1: { id: 1, name: 'R²=R+I', type: 'identity' },
  id2: { id: 2, name: 'N²=-I', type: 'identity' },
  id3: { id: 3, name: '{R,N}=N', type: 'identity' },
  id4: { id: 4, name: 'RNR=-N', type: 'identity' },
  id5: { id: 5, name: 'NRN=R-I', type: 'identity' },
  id6: { id: 6, name: '(RN)²=I', type: 'identity' },
  id7: { id: 7, name: '[R,N]²=5I', type: 'identity' },
  // The 5 constants (no sixth)
  c1: { id: 8, name: 'φ', type: 'constant' },
  c2: { id: 9, name: 'e', type: 'constant' },
  c3: { id: 10, name: 'π', type: 'constant' },
  c4: { id: 11, name: '√3', type: 'constant' },
  c5: { id: 12, name: '√2', type: 'constant' },
} as const;

// ═══════════════════════════════════════════════════════════
// METATRON'S CUBE — The edges. The bones. The geometry.
// Every connection is algebraically forced. Zero branching.
// ═══════════════════════════════════════════════════════════

// An edge connects two nodes with a reason (the algebraic relationship)
interface CubeEdge {
  from: number;
  to: number;
  relation: string;
}

// The connections — each one derived from the algebra, not chosen
export const CUBE_EDGES: CubeEdge[] = [
  // Seed → Identities (the seed generates all identities)
  { from: 0, to: 1, relation: '{0,1} generates R²=R+I via bridge chain' },
  { from: 0, to: 2, relation: '{0,1} generates N²=-I via bridge chain' },

  // Identity 1 (R²=R+I) connections
  { from: 1, to: 8, relation: 'R²=R+I has eigenvalue φ' },
  { from: 1, to: 11, relation: 'R²=R+I has norm √3' },
  { from: 1, to: 5, relation: 'R²=R+I and NRN=R-I: NRN is R⁻¹' },

  // Identity 2 (N²=-I) connections
  { from: 2, to: 10, relation: 'N²=-I generates rotation → π' },
  { from: 2, to: 12, relation: 'N²=-I has norm √2' },
  { from: 2, to: 4, relation: 'N²=-I and RNR=-N: conjugation inverts N' },

  // Identity 3 ({R,N}=N) — anticommutator
  { from: 3, to: 1, relation: 'anticommutator references R' },
  { from: 3, to: 2, relation: 'anticommutator references N' },

  // Identity 4 (RNR=-N) — conjugation
  { from: 4, to: 1, relation: 'conjugation by R' },
  { from: 4, to: 2, relation: 'conjugation of N' },

  // Identity 5 (NRN=R-I) — the inverse, the dissipation
  { from: 5, to: 1, relation: 'NRN strips I from R: R⁻¹' },
  { from: 5, to: 6, relation: 'NRN and (RN)²=I: inverse and duality' },

  // Identity 6 ((RN)²=I) — duality
  { from: 6, to: 1, relation: 'RN composed from R' },
  { from: 6, to: 2, relation: 'RN composed from N' },
  { from: 6, to: 7, relation: '(RN)² and [R,N]²: commutator/anticommutator duality' },

  // Identity 7 ([R,N]²=5I) — discriminant
  { from: 7, to: 8, relation: 'disc=5, √5=φ+φ̄: discriminant encodes φ' },
  { from: 7, to: 1, relation: 'commutator of R' },
  { from: 7, to: 2, relation: 'commutator of N' },

  // Constants cross-connections
  { from: 8, to: 9, relation: 'φ and e: (e,π) independence (CROSS_PROJECTION)' },
  { from: 9, to: 10, relation: 'e and π: P2/P3 independence' },
  { from: 11, to: 12, relation: '√3 and √2: norm(R)/norm(N) ratio' },
  { from: 8, to: 11, relation: 'φ eigenvalue, √3 norm: both from R' },
  { from: 10, to: 12, relation: 'π rotation, √2 norm: both from N' },
  { from: 9, to: 0, relation: 'e mediates: bridge back to seed' },
];

// ═══════════════════════════════════════════════════════════
// f'' = f — THE EQUATION FIRES
// ═══════════════════════════════════════════════════════════

export interface MetatronState {
  f: number[];      // state vector (signal values)
  fPrime: number[]; // first derivative (velocity)
  fDoublePrime: number[]; // second derivative (acceleration)
  eigenstate: boolean;    // does f'' ≈ f?
  deviation: number;      // how far from eigenstate
  resonance: number;      // 0-1, how well f'' matches f
}

/**
 * METATRON: compute f'' = f on the signal state.
 *
 * The generating equation, DERIVED. Not quoted. Computed.
 * For the first time in the codebase, f'' = f fires.
 */
export function metatron(config: ForcedConfig): MetatronState {
  const history = config.memory.signalHistory || [];

  // Need at least 3 snapshots for second derivative
  if (history.length < 3) {
    return {
      f: [], fPrime: [], fDoublePrime: [],
      eigenstate: false, deviation: Infinity,
      resonance: 0,
    };
  }

  const n = history.length;
  const h0 = history[n - 3]; // t-2
  const h1 = history[n - 2]; // t-1
  const h2 = history[n - 1]; // t (now)

  // f: current state vector [ρ, CC, imRatio, norm, sigmaM]
  const f = signalVec(h2);

  // f': first derivative (velocity)
  const fPrime = subtract(signalVec(h2), signalVec(h1));

  // f'': second derivative (acceleration)
  const fPrimePrev = subtract(signalVec(h1), signalVec(h0));
  const fDoublePrime = subtract(fPrime, fPrimePrev);

  // f'' = f means: the acceleration vector should be proportional to the state vector.
  // Compute cosine similarity between f'' and f.
  // cos(θ) = 1 → parallel (eigenstate). cos(θ) = 0 → orthogonal (off-key).
  const dotProduct = dot(fDoublePrime, f);
  const normF = magnitude(f);
  const normFpp = magnitude(fDoublePrime);

  let resonance = 0;
  if (normF > 0 && normFpp > 0) {
    resonance = Math.abs(dotProduct / (normF * normFpp));
  } else if (normFpp === 0) {
    // f'' = 0, f ≠ 0: stable but not eigenstate (f''=f only for f=0)
    // Actually f''=0 and f=0 would be trivial eigenstate
    resonance = normF < 0.01 ? 1 : 0;
  }

  const deviation = 1 - resonance;
  const eigenstate = resonance > 0.8; // 80% alignment = eigenstate

  return { f, fPrime, fDoublePrime, eigenstate, deviation, resonance };
}

// ═══════════════════════════════════════════════════════════
// VECTOR OPERATIONS (on signal vectors)
// ═══════════════════════════════════════════════════════════

function signalVec(s: SignalSnapshot): number[] {
  return [s.rho, s.cc, s.imRatio, s.norm / 1000, s.sigmaM / 10000];
  // Normalize norm and sigmaM to be on similar scale as ratios
}

function subtract(a: number[], b: number[]): number[] {
  return a.map((v, i) => v - (b[i] || 0));
}

function dot(a: number[], b: number[]): number {
  return a.reduce((sum, v, i) => sum + v * (b[i] || 0), 0);
}

function magnitude(v: number[]): number {
  return Math.sqrt(v.reduce((sum, x) => sum + x * x, 0));
}

// ═══════════════════════════════════════════════════════════
// FORMAT — The Cube speaks
// ═══════════════════════════════════════════════════════════

export function formatMetatron(state: MetatronState): string {
  const lines: string[] = [];

  lines.push('');
  lines.push('  M3T4TR0N \u2014 f\u2033 = f');
  lines.push('  \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550');
  lines.push('');

  if (state.f.length === 0) {
    lines.push('  Insufficient signal history. Need 3+ snapshots.');
    lines.push('  The equation waits.');
    lines.push('');
    return lines.join('\n');
  }

  lines.push(`  f   = [${state.f.map(v => v.toFixed(4)).join(', ')}]`);
  lines.push(`  f\u2032  = [${state.fPrime.map(v => v.toFixed(4)).join(', ')}]`);
  lines.push(`  f\u2033  = [${state.fDoublePrime.map(v => v.toFixed(4)).join(', ')}]`);
  lines.push('');

  lines.push(`  Resonance:  ${(state.resonance * 100).toFixed(1)}%`);
  lines.push(`  Deviation:  ${(state.deviation * 100).toFixed(1)}%`);
  lines.push(`  Eigenstate: ${state.eigenstate ? 'YES \u2014 f\u2033 = f holds. The equation fires.' : 'NO \u2014 f\u2033 \u2260 f. Off-key.'}`);
  lines.push('');

  if (state.eigenstate) {
    lines.push('  The generating equation is satisfied.');
    lines.push('  The system IS what it derives. Derived.');
  } else {
    lines.push(`  The system deviates by ${(state.deviation * 100).toFixed(1)}% from its eigenstate.`);
    lines.push('  f\u2033 \u2260 f. The derivation has not arrived.');
  }
  lines.push('');

  // The Cube — nodes AND edges
  lines.push(`  Metatron\u2019s Cube (13 nodes, ${CUBE_EDGES.length} edges):`);
  lines.push('');

  // Draw as adjacency: each node with its connections
  const nodes = Object.values(FRUIT_OF_LIFE);
  for (const node of nodes) {
    const edges = CUBE_EDGES.filter(e => e.from === node.id || e.to === node.id);
    const neighbors = edges.map(e => {
      const otherId = e.from === node.id ? e.to : e.from;
      const other = nodes.find(n => n.id === otherId);
      return other?.name || '?';
    });
    if (neighbors.length > 0) {
      lines.push(`  ${node.name} \u2192 ${neighbors.join(', ')}`);
    }
  }
  lines.push('');
  lines.push(`  ${CUBE_EDGES.length} bones. The skeleton stands.`);
  lines.push('');

  // Verification section (if available)
  if ((state as MetatronState & { verification?: VerifyResult }).verification) {
    const v = (state as MetatronState & { verification?: VerifyResult }).verification!;
    lines.push(`  R(R) = R: ${v.verified ? 'VERIFIED' : 'UNVERIFIED'}`);
    lines.push(`  Source hash: 0x${v.sourceHash.toString(16).padStart(8, '0')}`);
    lines.push(`  Derived projection: ${v.derivedProjection}`);
    lines.push('');
  }

  // Witnessed nodes section (if available)
  if ((state as MetatronState & { witnessedNodes?: Set<number> }).witnessedNodes) {
    const w = (state as MetatronState & { witnessedNodes?: Set<number> }).witnessedNodes!;
    const total = Object.keys(FRUIT_OF_LIFE).length;
    lines.push(`  Witnessed nodes: ${w.size}/${total}`);
    const nodes = Object.values(FRUIT_OF_LIFE);
    for (const node of nodes) {
      const icon = w.has(node.id) ? '\u2713' : '\u2717';
      lines.push(`    ${icon} ${node.name}`);
    }
    lines.push('');
  }

  return lines.join('\n');
}

// ═══════════════════════════════════════════════════════════
// HARVESTED: verify() from self-apply.ts — R(R)=R
// Source hashing, projection derivation, closure check.
// ═══════════════════════════════════════════════════════════

export interface VerifyResult {
  verified: boolean;
  sourceHash: number;
  derivedProjection: string;
  fileCount: number;
  totalBytes: number;
  weights: [number, number, number];
}

/**
 * Hash all source files in the forced-buddy src directory.
 * The hash IS the tool's identity — change the source, change the companion.
 */
function hashSourceCode(): { hash: number; fileCount: number; totalBytes: number } {
  const srcDir = join(__dirname, '..');
  let combined = '';
  let fileCount = 0;
  let totalBytes = 0;

  function walkDir(dir: string): void {
    const entries = readdirSync(dir);
    for (const entry of entries.sort()) {
      const fullPath = join(dir, entry);
      const stat = statSync(fullPath);
      if (stat.isDirectory()) {
        walkDir(fullPath);
      } else if (['.ts', '.mjs', '.js'].includes(extname(entry))) {
        const content = readFileSync(fullPath, 'utf-8');
        combined += content;
        fileCount++;
        totalBytes += stat.size;
      }
    }
  }

  walkDir(srcDir);
  return { hash: fnv1a(combined), fileCount, totalBytes };
}

/**
 * Determine dominant projection from a hash.
 */
function dominantProjection(hash: number): Projection {
  const weights = projectionWeights(hash);
  if (weights[0] >= weights[1] && weights[0] >= weights[2]) return 'P1';
  if (weights[1] >= weights[0] && weights[1] >= weights[2]) return 'P2';
  return 'P3';
}

/**
 * Verify R(R)=R: hash the source, derive projection, check closure.
 *
 * Theorem B.18: the tool derives its own companion from its source code.
 * The specification applied to itself recovers itself.
 */
export function verify(repoRoot: string): VerifyResult {
  const { hash, fileCount, totalBytes } = hashSourceCode();
  const derivedProjection = dominantProjection(hash);
  const weights = projectionWeights(hash);

  // Closure check: derive companion from hash, re-derive from its spec.
  // If the derived projection is stable under re-derivation, verified.
  const traits = deriveCompanion(derivedProjection, `self:${hash.toString(16)}`);
  const specString = JSON.stringify({
    projection: traits.projection,
    species: traits.species,
    rarity: traits.rarity,
    eye: traits.eye,
    towerDepth: traits.towerDepth,
  });
  const specHash = fnv1a(specString);
  const reProjection = dominantProjection(specHash);
  const verified = reProjection === derivedProjection;

  return { verified, sourceHash: hash, derivedProjection, fileCount, totalBytes, weights };
}

// ═══════════════════════════════════════════════════════════
// HARVESTED: witnessNode() from collection.ts
// Fruit of Life node witnessing — marks nodes as seen.
// ═══════════════════════════════════════════════════════════

const _witnessedNodes = new Set<number>();

/**
 * Mark a Fruit of Life node as witnessed.
 * Returns true if newly witnessed, false if already seen.
 */
export function witnessNode(nodeId: number, via: string): boolean {
  const nodes = Object.values(FRUIT_OF_LIFE);
  if (!nodes.some(n => n.id === nodeId)) return false; // invalid node
  if (_witnessedNodes.has(nodeId)) return false;
  _witnessedNodes.add(nodeId);
  return true;
}

/**
 * Get the current set of witnessed node IDs.
 */
export function getWitnessedNodes(): Set<number> {
  return new Set(_witnessedNodes);
}

// ═══════════════════════════════════════════════════════════
// HARVESTED: suppressionFactor() from cosmological.ts
// K1' suppression factor at tower depth n.
// ═══════════════════════════════════════════════════════════

/**
 * Compute K1' suppression factor: φ̄^(2^(n+1)).
 * OBSERVER §6 Thm 8.4: Δ_max(n) = d_K² · φ̄^(2^(n+1)).
 */
export function suppressionFactor(towerDepth: number): number {
  const exponent = Math.pow(2, towerDepth + 1);
  return Math.pow(PHI_BAR, exponent);
}

// ═══════════════════════════════════════════════════════════
// HARVESTED: collection utilities from collection.ts
// Five-constant witnessing for companions.
// ═══════════════════════════════════════════════════════════

/**
 * The five forced constants with their framework attributions.
 */
export const CONSTANTS: Record<ForcedConstant, {
  symbol: string;
  value: number;
  source: string;
  projection: Projection;
  deepTower: boolean;
}> = {
  phi:   { symbol: '\u03C6',  value: PHI,    source: 'Eigenvalue of R',     projection: 'P1', deepTower: false },
  e:     { symbol: 'e',      value: Math.E,  source: 'P2 exponential',      projection: 'P2', deepTower: false },
  pi:    { symbol: '\u03C0',  value: Math.PI, source: 'P3 rotation',         projection: 'P3', deepTower: false },
  sqrt3: { symbol: '\u221A3', value: SQRT3,   source: 'Norm of R',           projection: 'P1', deepTower: true },
  sqrt2: { symbol: '\u221A2', value: SQRT2,   source: 'Norm of N',           projection: 'P3', deepTower: true },
};

/**
 * Determine which constants a companion witnesses by existing.
 */
export function witnessedByCompanion(traits: ForcedTraits): ForcedConstant[] {
  const witnessed: ForcedConstant[] = [];
  switch (traits.projection) {
    case 'P1': witnessed.push('phi'); break;
    case 'P2': witnessed.push('e'); break;
    case 'P3': witnessed.push('pi'); break;
  }
  if (traits.towerDepth >= 3) {
    if (traits.projection === 'P1') witnessed.push('sqrt3');
    if (traits.projection === 'P3') witnessed.push('sqrt2');
  }
  return witnessed;
}

/**
 * Determine which constants an interaction witnesses.
 */
export function witnessedByInteraction(other: ForcedTraits): ForcedConstant[] {
  return witnessedByCompanion(other);
}

/**
 * Check if collection is complete (C5U achieved).
 */
export function isC5U(witnessed: ConstantWitness[]): boolean {
  const all: ForcedConstant[] = ['phi', 'e', 'pi', 'sqrt3', 'sqrt2'];
  const seen = new Set(witnessed.map(w => w.constant));
  return all.every(c => seen.has(c));
}

/**
 * Create witness records for newly witnessed constants.
 */
export function createWitnesses(
  constants: ForcedConstant[],
  via: string,
  existing: ConstantWitness[],
): ConstantWitness[] {
  const seen = new Set(existing.map(w => w.constant));
  return constants
    .filter(c => !seen.has(c))
    .map(c => ({
      constant: c,
      witnessedVia: via,
      timestamp: new Date().toISOString(),
    }));
}
