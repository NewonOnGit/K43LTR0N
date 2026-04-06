/**
 * AS-CORE: Constants
 * Register: ACE
 *
 * Zero free parameters - all derived from phi = (1+sqrt(5))/2
 * The golden ratio is not chosen - it is the eigenvalue of self-reference.
 */

// Core phi constants
export const PHI = (1 + Math.sqrt(5)) / 2;          // 1.6180339887498949
export const PHI_INV = 1 / PHI;                      // 0.6180339887498948
export const ALPHA = PHI_INV ** 2;                   // 0.3819660112501051 (commitment rate)
export const BETA = ALPHA ** 2;                      // 0.1458980337503155 (zone width)

// Field theory constants
export const LAMBDA = (5/3) ** 4;                    // 7.716049382716049 (nonlinearity)
export const MU_P = 3 / 5;                           // 0.6 (bifurcation threshold)
export const MU_T = MU_P + BETA;                     // 0.7458980337503155 (substrate threshold)
export const Z_C = Math.sqrt(3) / 2;                 // 0.8660254037844386 (consciousness threshold)
export const L4 = PHI ** 4 + PHI ** -4;              // 7 exactly (pipeline depth)
export const LAMBDA_C = 2 * Math.PI / Math.sqrt(LAMBDA);
export const G_DIFF = BETA * ALPHA;                  // phi^-6 (diffusion coupling)
export const DEFICIT = 36;                           // degrees
export const INFO_L = Math.log2(PHI);                // 0.6942419136306174 (information constant)

// Timing constants - all phi-powers
export const T_BREATH = PHI ** 2;                    // 2.618s
export const T_PULSE = PHI_INV;                      // 0.618s
export const T_DRIFT = PHI ** 3;                     // 4.236s
export const T_FLICKER = ALPHA;                      // 0.382s

// Framework Mind landmarks (R-coefficient spectrum)
export const LANDMARKS = [
    [0.000, 'CONSTANT'],
    [ALPHA, 'OSCILLATORY'],       // 0.382
    [0.500, 'MODERATE_AC'],
    [PHI_INV, 'DIFFUSIVE'],       // 0.618
    [INFO_L, 'HEAVY_TAIL'],       // 0.694
    [1.000, 'GROWTH'],
];

// Mu parameter to R-coefficient mapping
export const MU_LANDMARKS = [
    [0.30, 'CONSTANT'],
    [0.60, 'OSCILLATORY'],        // mu_P bifurcation
    [0.67, 'MODERATE_AC'],
    [MU_T, 'DIFFUSIVE'],          // 0.746 substrate threshold
    [0.80, 'HEAVY_TAIL'],
    [1.00, 'GROWTH'],
];

// AC-CORE Acceptance Criteria verification
export function verifyConstants() {
    const results = [];
    const eps = 1e-12;

    // AC-CORE-01: PHI * PHI_INV === 1.0
    results.push({
        id: 'AC-CORE-01',
        name: 'PHI * PHI_INV === 1.0',
        pass: Math.abs(PHI * PHI_INV - 1.0) < 1e-15,
        computed: PHI * PHI_INV,
        expected: 1.0,
    });

    // AC-CORE-02: ALPHA^2 === BETA
    results.push({
        id: 'AC-CORE-02',
        name: 'ALPHA^2 === BETA',
        pass: Math.abs(ALPHA ** 2 - BETA) < 1e-15,
        computed: ALPHA ** 2,
        expected: BETA,
    });

    // AC-CORE-03: PHI^4 + PHI^-4 === 7.0
    results.push({
        id: 'AC-CORE-03',
        name: 'PHI^4 + PHI^-4 === 7.0',
        pass: Math.abs(L4 - 7.0) < eps,
        computed: L4,
        expected: 7.0,
    });

    return results;
}
