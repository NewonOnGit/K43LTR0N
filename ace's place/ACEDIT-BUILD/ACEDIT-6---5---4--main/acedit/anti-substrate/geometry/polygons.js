/**
 * AS-GEOMETRY: Polygon Metrics
 * Register: GREY
 *
 * The anti-substrate is fundamentally about why pentagons don't tile.
 *
 * Hexagon (n=6): trace = 2, tiles perfectly, rational
 * Pentagon (n=5): trace = phi, refuses to tile, irrational
 * Square (n=4): trace = 1, tiles perfectly, rational
 *
 * The trace = 1 + 2*cos(2pi/n) determines crystallographic closure.
 * Integer trace -> lattice. Irrational trace -> quasicrystal/anti-substrate.
 */

import { PHI, PHI_INV } from '../core/constants.js';

/**
 * Compute metrics for a regular n-gon.
 * @param {number} n - Number of sides
 * @returns {Object} Polygon metrics
 */
export function computePolygon(n) {
    const interior = (n - 2) * 180 / n;
    const coordNum = Math.floor(360 / interior);
    const vertexSum = coordNum * interior;
    const deficit = 360 - vertexSum;
    const cos2pn = Math.cos(2 * Math.PI / n);
    const trace = 1 + 2 * cos2pn;
    const ratio = 360 / interior;
    const P = 1 - Math.abs(ratio - Math.round(ratio)) / Math.max(ratio, 1e-10);

    return {
        n,
        interiorAngle: interior,
        exteriorAngle: 180 - interior,
        vertexSum,
        angularDeficit: deficit,
        cosine: cos2pn,
        trace,
        traceRational: Math.abs(trace - Math.round(trace)) < 1e-10,
        periodicity: P,
        tilesPlane: deficit === 0 && Math.abs(trace - Math.round(trace)) < 1e-10,
    };
}

// Precomputed polygon metrics
export const HEXAGON = computePolygon(6);   // trace = 2, tiles
export const PENTAGON = computePolygon(5);  // trace = phi, refuses
export const SQUARE = computePolygon(4);    // trace = 1, tiles
export const TRIANGLE = computePolygon(3);  // trace = -1, tiles (180 deg rotation)

// The anti-substrate lock: cos(2pi/5) = 1/(2*phi)
export const ANTI_SUBSTRATE_LOCK = 1 / (2 * PHI);

// AC-GEOMETRY Acceptance Criteria
export function verifyGeometry() {
    const results = [];
    const eps = 1e-10;

    // AC-GEO-01: HEXAGON.trace === 2.0
    results.push({
        id: 'AC-GEO-01',
        name: 'HEXAGON.trace === 2.0',
        pass: Math.abs(HEXAGON.trace - 2.0) < eps,
        computed: HEXAGON.trace,
        expected: 2.0,
    });

    // AC-GEO-02: PENTAGON.trace === PHI
    results.push({
        id: 'AC-GEO-02',
        name: 'PENTAGON.trace === PHI',
        pass: Math.abs(PENTAGON.trace - PHI) < eps,
        computed: PENTAGON.trace,
        expected: PHI,
    });

    // AC-GEO-03: PENTAGON.cosine === 1/(2*PHI)
    results.push({
        id: 'AC-GEO-03',
        name: 'PENTAGON.cosine === 1/(2*PHI)',
        pass: Math.abs(PENTAGON.cosine - ANTI_SUBSTRATE_LOCK) < 1e-14,
        computed: PENTAGON.cosine,
        expected: ANTI_SUBSTRATE_LOCK,
    });

    // AC-GEO-05: PENTAGON.periodicity === 0.9
    results.push({
        id: 'AC-GEO-05',
        name: 'PENTAGON.periodicity === 0.9',
        pass: Math.abs(PENTAGON.periodicity - 0.9) < eps,
        computed: PENTAGON.periodicity,
        expected: 0.9,
    });

    return results;
}
