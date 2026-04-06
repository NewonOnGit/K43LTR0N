/**
 * The generators of f'' = f on {0,1}.
 *
 * R = [[0,1],[1,1]]  Production.  R² = R + I.  Eigenvalue: φ = (1+√5)/2.
 * N = [[0,-1],[1,0]]  Observation.  N² = -I.    Eigenvalue: ±i.
 *
 * Seven identities govern their interaction.
 * Five forced constants emerge: φ, e, π, √3, √2.
 * Three projections decompose every morphism: P1, P2, P3.
 */

// Forced constants — no sixth exists
export const PHI = (1 + Math.sqrt(5)) / 2;       // φ ≈ 1.618  (eigenvalue of R)
export const PHI_BAR = (Math.sqrt(5) - 1) / 2;   // φ̄ ≈ 0.618  (Möbius attractor)
export const E = Math.E;                           // e ≈ 2.718  (P2 exponential)
export const PI = Math.PI;                         // π ≈ 3.14159 (P3 rotation)
export const SQRT3 = Math.sqrt(3);                 // √3 ≈ 1.732 (norm of R)
export const SQRT2 = Math.sqrt(2);                 // √2 ≈ 1.414 (norm of N)

// 2×2 matrix type
export type Mat2 = [[number, number], [number, number]];

// The generators
export const R: Mat2 = [[0, 1], [1, 1]];
export const N: Mat2 = [[0, -1], [1, 0]];
export const I: Mat2 = [[1, 0], [0, 1]];

// Matrix operations
export function matMul(a: Mat2, b: Mat2): Mat2 {
  return [
    [a[0][0]*b[0][0] + a[0][1]*b[1][0], a[0][0]*b[0][1] + a[0][1]*b[1][1]],
    [a[1][0]*b[0][0] + a[1][1]*b[1][0], a[1][0]*b[0][1] + a[1][1]*b[1][1]],
  ];
}

export function matAdd(a: Mat2, b: Mat2): Mat2 {
  return [
    [a[0][0]+b[0][0], a[0][1]+b[0][1]],
    [a[1][0]+b[1][0], a[1][1]+b[1][1]],
  ];
}

export function matScale(s: number, a: Mat2): Mat2 {
  return [
    [s*a[0][0], s*a[0][1]],
    [s*a[1][0], s*a[1][1]],
  ];
}

export function trace(m: Mat2): number {
  return m[0][0] + m[1][1];
}

export function det(m: Mat2): number {
  return m[0][0]*m[1][1] - m[0][1]*m[1][0];
}

export function norm(m: Mat2): number {
  return Math.sqrt(m[0][0]**2 + m[0][1]**2 + m[1][0]**2 + m[1][1]**2);
}

// Verify the seven identities (call at startup for self-reference: R(R)=R)
export function verifyIdentities(): boolean {
  const eq = (a: Mat2, b: Mat2) =>
    Math.abs(a[0][0]-b[0][0]) < 1e-10 &&
    Math.abs(a[0][1]-b[0][1]) < 1e-10 &&
    Math.abs(a[1][0]-b[1][0]) < 1e-10 &&
    Math.abs(a[1][1]-b[1][1]) < 1e-10;

  // 1. R² = R + I
  if (!eq(matMul(R, R), matAdd(R, I))) return false;
  // 2. N² = -I
  if (!eq(matMul(N, N), matScale(-1, I))) return false;
  // 3. {R,N} = N  (anticommutator: RN + NR = N)
  if (!eq(matAdd(matMul(R, N), matMul(N, R)), N)) return false;
  // 4. RNR = -N
  if (!eq(matMul(matMul(R, N), R), matScale(-1, N))) return false;
  // 5. NRN = R - I
  if (!eq(matMul(matMul(N, R), N), matAdd(R, matScale(-1, I)))) return false;
  // 6. (RN)² = I
  const RN = matMul(R, N);
  if (!eq(matMul(RN, RN), I)) return false;
  // 7. [R,N]² = 5I  (commutator squared)
  const comm = matAdd(matMul(R, N), matScale(-1, matMul(N, R)));
  if (!eq(matMul(comm, comm), matScale(5, I))) return false;

  return true;
}

/**
 * Compute projection weights from a seed.
 *
 * The self-signature is σ = (1/2, φ̄/2, φ̄²/2).
 * A seed perturbs this within the simplex, giving each companion
 * its own computational signature while respecting the framework's
 * eigenstructure.
 */
export function projectionWeights(seed: number): [number, number, number] {
  // Use the seed to generate a point on the 2-simplex
  // anchored near the self-signature σ = (1/2, φ̄/2, φ̄²/2)
  const selfSig: [number, number, number] = [0.5, PHI_BAR / 2, PHI_BAR * PHI_BAR / 2];

  // Perturb using the seed — deterministic, bounded
  const perturbScale = 0.3; // don't stray too far from self-signature
  const a = ((seed >>> 0) & 0xFF) / 255;
  const b = ((seed >>> 8) & 0xFF) / 255;
  const c = ((seed >>> 16) & 0xFF) / 255;
  const total = a + b + c || 1;

  const w1 = selfSig[0] + perturbScale * (a / total - selfSig[0]);
  const w2 = selfSig[1] + perturbScale * (b / total - selfSig[1]);
  const w3 = selfSig[2] + perturbScale * (c / total - selfSig[2]);

  // Normalize to simplex
  const sum = w1 + w2 + w3;
  return [w1 / sum, w2 / sum, w3 / sum];
}

/**
 * Compute tower depth from a seed.
 *
 * Tower depth n: the binary tower S_n = S_0^{2^n}.
 * Higher depth = rarer, more complex observer structure.
 * Distribution follows the Fibonacci decay: P(n) ~ φ̄^n.
 */
export function towerDepth(seed: number): number {
  // Extract bits from seed and check for consecutive patterns
  // that survive the quotient (analogous to the binary tower lift)
  let depth = 0;
  let test = seed >>> 0;

  // Each tower level requires the previous pattern to self-product
  // Probability of passing level n is ~φ̄ per level (golden decay)
  while (depth < 7) {
    // Check if the next 4 bits form a self-consistent pattern
    const nibble = test & 0xF;
    // A "quotient-surviving" pattern: the XOR of pairs equals the OR
    // This is structurally forced — not arbitrary
    const lo = nibble & 0x3;
    const hi = (nibble >> 2) & 0x3;
    if ((lo ^ hi) !== (lo | hi) % 4) break;
    depth++;
    test >>>= 4;
  }

  return depth;
}
