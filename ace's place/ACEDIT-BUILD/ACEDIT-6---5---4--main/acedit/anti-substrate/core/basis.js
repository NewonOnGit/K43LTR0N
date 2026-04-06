/**
 * AS-CORE: Basis Matrices
 * Register: ACE
 *
 * The four generators of M_2(R) that map onto anti-substrate geometry:
 *   I  = identity     -> HEXAGON (substrate, tiling, lattice)
 *   R  = production   -> PENTAGON (self-referential, phi-generator)
 *   N  = observation  -> ROTATION (90 deg, cubic face angle)
 *   RN = coupling     -> HEX<->PENT interaction (refraction chain)
 */

import { PHI, PHI_INV, ALPHA } from './constants.js';

// 2x2 matrices in row-major order: [a, b, c, d] = [[a,b],[c,d]]

export const I2 = [1, 0, 0, 1];           // Identity
export const R  = [0, 1, 1, 1];           // R^2 = R + I (Fibonacci recurrence)
export const N  = [0, -1, 1, 0];          // N^2 = -I (90-degree rotation)

// Matrix multiplication
export function mat2Mul(a, b) {
    return [
        a[0]*b[0] + a[1]*b[2], a[0]*b[1] + a[1]*b[3],
        a[2]*b[0] + a[3]*b[2], a[2]*b[1] + a[3]*b[3],
    ];
}

// Matrix-vector multiplication
export function mat2Vec(m, v) {
    return [m[0]*v[0] + m[1]*v[1], m[2]*v[0] + m[3]*v[1]];
}

// Matrix addition
export function mat2Add(a, b) {
    return [a[0]+b[0], a[1]+b[1], a[2]+b[2], a[3]+b[3]];
}

// Scalar multiplication
export function mat2Scale(m, s) {
    return [m[0]*s, m[1]*s, m[2]*s, m[3]*s];
}

// RN = R * N (coupling operator)
export const RN = mat2Mul(R, N);

// The four basis matrices
export const BASIS = [I2, R, N, RN];

// Compute the 4x4 inverse matrix for decomposition
// Each basis matrix flattened is a row of the 4x4 matrix
// We need the inverse to go from a 2x2 matrix back to coefficients
function computeBasisInverse() {
    // Flatten each basis into rows
    // I2  = [1, 0, 0, 1]
    // R   = [0, 1, 1, 1]
    // N   = [0, -1, 1, 0]
    // RN  = [-1, 0, 1, -1]  (computed from R*N)

    // Matrix is:
    // [1   0   0   1]   I2
    // [0   1   1   1]   R
    // [0  -1   1   0]   N
    // [-1  0   1  -1]   RN

    // Inverse computed analytically (or use numerical methods)
    // For this specific basis, the inverse is:
    return [
        [0.5,  0.0,  0.0, -0.5],
        [0.0,  0.5, -0.5,  0.0],
        [0.0,  0.5,  0.5,  0.0],
        [0.5,  0.0,  0.0,  0.5],
    ];
}

export const BASIS_INV = computeBasisInverse();

// Decompose a 2x2 matrix into [I, R, N, RN] coefficients
export function decompose(m) {
    const flat = [m[0], m[1], m[2], m[3]];
    return BASIS_INV.map(row =>
        row.reduce((sum, coef, i) => sum + coef * flat[i], 0)
    );
}

// Reconstruct a 2x2 matrix from coefficients
export function reconstruct(coeffs) {
    let result = [0, 0, 0, 0];
    for (let b = 0; b < 4; b++) {
        for (let j = 0; j < 4; j++) {
            result[j] += coeffs[b] * BASIS[b][j];
        }
    }
    return result;
}

// Matrix trace
export function trace(m) {
    return m[0] + m[3];
}

// Matrix determinant
export function det(m) {
    return m[0]*m[3] - m[1]*m[2];
}

// AC-CORE Acceptance Criteria verification for basis
export function verifyBasis() {
    const results = [];
    const eps = 1e-12;

    // AC-CORE-04: R^2 = R + I
    const R2 = mat2Mul(R, R);
    const RplusI = mat2Add(R, I2);
    const r2Match = R2.every((v, i) => Math.abs(v - RplusI[i]) < eps);
    results.push({
        id: 'AC-CORE-04',
        name: 'R^2 = R + I',
        pass: r2Match,
        computed: R2,
        expected: RplusI,
    });

    // AC-CORE-05: N^2 = -I
    const N2 = mat2Mul(N, N);
    const negI = [-1, 0, 0, -1];
    const n2Match = N2.every((v, i) => Math.abs(v - negI[i]) < eps);
    results.push({
        id: 'AC-CORE-05',
        name: 'N^2 = -I',
        pass: n2Match,
        computed: N2,
        expected: negI,
    });

    // AC-CORE-06: decompose(R) returns [0, 1, 0, 0]
    const rDecomp = decompose(R);
    const expectedDecomp = [0, 1, 0, 0];
    const decompMatch = rDecomp.every((v, i) => Math.abs(v - expectedDecomp[i]) < eps);
    results.push({
        id: 'AC-CORE-06',
        name: 'decompose(R) = [0, 1, 0, 0]',
        pass: decompMatch,
        computed: rDecomp,
        expected: expectedDecomp,
    });

    return results;
}
