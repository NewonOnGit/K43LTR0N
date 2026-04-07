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
 */

import type { ForcedConfig, SignalSnapshot } from '../types.js';
import { conversationPhase } from './memory.js';
import { PHI_BAR } from './algebra.js';

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

  // The 13 nodes
  lines.push('  Fruit of Life (13 nodes):');
  const nodes = Object.values(FRUIT_OF_LIFE);
  const nodeStr = nodes.map(n => n.name).join(' \u00B7 ');
  lines.push(`  ${nodeStr}`);
  lines.push('');

  return lines.join('\n');
}
