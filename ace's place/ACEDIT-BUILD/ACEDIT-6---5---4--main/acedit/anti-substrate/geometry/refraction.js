/**
 * AS-GEOMETRY: Refraction Chain
 * Register: GREY
 *
 * The prismatic refraction chain: 120 -> 108 -> 97.2
 *
 * Hexagonal information (120 deg) passes through the pentagonal anti-substrate
 * and emerges stripped of 10.8 degrees (the periodicity tax).
 *
 * This is the static geometry. The dynamic version (particles surviving or
 * dying based on T_holo) is handled by AS-PARTICLE.
 */

import { DEFICIT } from '../core/constants.js';
import { HEXAGON, PENTAGON } from './polygons.js';

/**
 * Compute the refraction chain: hex -> pent -> output
 * @returns {Object} Refraction chain parameters
 */
export function computeRefraction() {
    const thetaIn = HEXAGON.interiorAngle;       // 120
    const ratio = PENTAGON.interiorAngle / HEXAGON.interiorAngle; // 108/120 = 0.9
    const thetaRefracted = thetaIn * ratio;      // 108
    const P = PENTAGON.periodicity;              // 0.9
    const stripped = DEFICIT * P / 3;            // 36 * 0.9 / 3 = 10.8
    const thetaOut = thetaRefracted - stripped;  // 97.2

    return {
        thetaIn,           // 120 - hexagonal substrate angle
        thetaRefracted,    // 108 - pentagonal angle
        periodicity: P,    // 0.9 - what fraction survives
        stripped,          // 10.8 - degrees lost to anti-substrate
        thetaOut,          // 97.2 - final output angle
        ratio,             // 0.9 - hex-to-pent ratio
    };
}

export const REFRACTION = computeRefraction();

// The refraction chain expressed as angle flow
export const ANGLE_FLOW = [
    { stage: 'INPUT', angle: 120, desc: 'Hexagonal substrate (tiles)' },
    { stage: 'REFRACT', angle: 108, desc: 'Pentagon (refuses to tile)' },
    { stage: 'OUTPUT', angle: 97.2, desc: 'Post-anti-substrate (stripped)' },
];

// AC-GEO-04: REFRACTION.thetaOut === 97.2
export function verifyRefraction() {
    const results = [];
    const eps = 1e-10;

    results.push({
        id: 'AC-GEO-04',
        name: 'REFRACTION.thetaOut === 97.2',
        pass: Math.abs(REFRACTION.thetaOut - 97.2) < eps,
        computed: REFRACTION.thetaOut,
        expected: 97.2,
    });

    return results;
}
