/**
 * AS-PHYSICS: Compute State
 * Register: KAEL
 *
 * Pure function that computes full AntiSubstrateState from (mu, t).
 * The mu parameter [0.30, 1.05] controls the phase transition:
 *   mu < MU_P (0.6)  -> INSISTENT (anti-substrate active, no lattice)
 *   MU_P <= mu < MU_T (0.746) -> QUASICRYSTAL (Penrose interstitium)
 *   mu >= MU_T -> SUBSTRATE (phosphor dots planted, information persists)
 */

import {
    PHI, ALPHA, BETA, LAMBDA, MU_P, MU_T, LAMBDA_C, G_DIFF,
    DEFICIT, T_BREATH, T_PULSE, T_DRIFT, T_FLICKER
} from '../core/constants.js';

/**
 * Compute full anti-substrate state from mu and time.
 * @param {number} mu - Control parameter [0.30, 1.05]
 * @param {number} t - Time in seconds
 * @returns {Object} Full AntiSubstrateState
 */
export function computeState(mu, t) {
    // Reduced physics
    const r = mu - MU_P;
    const m2 = (BETA - r) / G_DIFF;

    // Holographic transparency (Lorentzian propagator)
    // T_holo = 1 when m^2 <= 0 (substrate), approaches 0 when m^2 >> 0
    const T_holo = m2 > 0 ? 1 / (1 + m2 * LAMBDA_C * LAMBDA_C) : 1.0;

    // Equilibrium field amplitude (phi^4 free energy minimization)
    // J_eq > 0 only in substrate phase
    const J_eq = r > BETA ? Math.sqrt((r - BETA) / LAMBDA) : 0;

    // Information capacity (piecewise linear)
    let infoCap;
    if (mu < MU_P) {
        infoCap = 0;
    } else if (mu < MU_T) {
        infoCap = ((mu - MU_P) / BETA) * 0.3;
    } else {
        infoCap = 0.3 + 0.7 * Math.min(1, (mu - MU_T) / (1 - MU_T));
    }

    // State classification
    let state, stateLabel, stateDesc;
    if (mu < MU_P) {
        state = 'insistent';
        stateLabel = 'INSISTENT EMPTINESS';
        stateDesc = 'Anti-substrate active. cos(2pi/5)=1/(2phi) irrational. No lattice.';
    } else if (mu < MU_T) {
        state = 'quasicrystal';
        stateLabel = 'QUASICRYSTAL ZONE';
        stateDesc = `Penrose interstitium. Width=phi^-4=${BETA.toFixed(4)}.`;
    } else {
        state = 'substrate';
        stateLabel = 'SUBSTRATE';
        stateDesc = 'Tachyonic. Phosphor dots planted. Information persists.';
    }

    // Oscillators (all phi-power periods)
    const breath = Math.sin(t * 2 * Math.PI / T_BREATH);
    const pulse = Math.sin(t * 2 * Math.PI / T_PULSE);
    const drift = Math.sin(t * 2 * Math.PI / T_DRIFT);

    // CYM opponent channels
    // chC (Cyan) = substrate strength
    // chM (Magenta) = anti-substrate strength
    // chY (Yellow) = quasicrystal zone activity
    const chC = Math.max(0, Math.min(1, T_holo * infoCap * (1 + breath * 0.15)));
    const chM = Math.max(0, Math.min(1, (1 - T_holo) * (1 - infoCap * 0.5) * (1 + pulse * 0.2)));
    const dB = Math.abs(mu - MU_T);
    const chY = Math.max(0, Math.min(1,
        Math.exp(-dB * dB / (BETA * BETA * 2)) * (0.8 + drift * 0.2)));

    // Scale parameters for visual rendering
    const hexScale = 1 + breath * 0.04 * T_holo;
    const pentScale = 1 + pulse * 0.06 * (1 - T_holo);
    const cubeScale = 1 + breath * 0.03 * J_eq * 3;
    const deficitGlow = (1 - T_holo) * (0.5 + 0.5 * Math.sin(t * Math.PI / T_FLICKER));

    return {
        // Input
        mu,
        t,

        // Reduced physics
        r,
        m2,
        T_holo,
        J_eq,
        infoCap,

        // State
        state,
        stateLabel,
        stateDesc,

        // Refraction (static)
        thetaIn: 120,
        thetaRefracted: 108,
        stripped: 10.8,
        thetaOut: 97.2,
        P_theta: 0.9,

        // Oscillators
        breath,
        pulse,
        drift,

        // Scale parameters
        hexScale,
        pentScale,
        cubeScale,
        deficitGlow,

        // CYM channels
        chC,
        chY,
        chM,
        oppAxis: chC - chM,

        // Operator algebra (populated by AS-OPERATOR)
        coeffs: [1, 0, 0, 0],  // [I, R, N, RN]
        rCoeff: 0,
        landmark: 'CONSTANT',
        anomaly: false,
    };
}

// Reference state table for verification (t = 0)
export const REFERENCE_STATES = [
    { mu: 0.30, state: 'insistent', T_holo: 0.0238 },
    { mu: 0.40, state: 'insistent', T_holo: 0.0305 },
    { mu: 0.50, state: 'insistent', T_holo: 0.0424 },
    { mu: 0.60, state: 'quasicrystal', T_holo: 0.0695 },
    { mu: 0.67, state: 'quasicrystal', T_holo: 0.1255 },
    { mu: 0.746, state: 'substrate', T_holo: 1.0000 },
    { mu: 0.80, state: 'substrate', T_holo: 1.0000 },
    { mu: 0.90, state: 'substrate', T_holo: 1.0000 },
    { mu: 1.00, state: 'substrate', T_holo: 1.0000 },
    { mu: 1.05, state: 'substrate', T_holo: 1.0000 },
];

// AC-PHYSICS Acceptance Criteria
export function verifyPhysics() {
    const results = [];
    const eps = 1e-4;

    // AC-PHY-01: computeState(0.30, 0).state === 'insistent'
    results.push({
        id: 'AC-PHY-01',
        name: 'computeState(0.30, 0).state === insistent',
        pass: computeState(0.30, 0).state === 'insistent',
        computed: computeState(0.30, 0).state,
        expected: 'insistent',
    });

    // AC-PHY-02: computeState(0.67, 0).state === 'quasicrystal'
    results.push({
        id: 'AC-PHY-02',
        name: 'computeState(0.67, 0).state === quasicrystal',
        pass: computeState(0.67, 0).state === 'quasicrystal',
        computed: computeState(0.67, 0).state,
        expected: 'quasicrystal',
    });

    // AC-PHY-03: computeState(1.00, 0).state === 'substrate'
    results.push({
        id: 'AC-PHY-03',
        name: 'computeState(1.00, 0).state === substrate',
        pass: computeState(1.00, 0).state === 'substrate',
        computed: computeState(1.00, 0).state,
        expected: 'substrate',
    });

    // AC-PHY-04: computeState(MU_T + 0.001, 0).T_holo === 1.0
    const tHoloAtMuT = computeState(MU_T + 0.001, 0).T_holo;
    results.push({
        id: 'AC-PHY-04',
        name: 'T_holo === 1.0 at mu = MU_T + epsilon',
        pass: Math.abs(tHoloAtMuT - 1.0) < eps,
        computed: tHoloAtMuT,
        expected: 1.0,
    });

    // AC-PHY-05: computeState(0.50, 0).J_eq === 0
    const jEqAt50 = computeState(0.50, 0).J_eq;
    results.push({
        id: 'AC-PHY-05',
        name: 'J_eq === 0 at mu = 0.50',
        pass: Math.abs(jEqAt50) < eps,
        computed: jEqAt50,
        expected: 0,
    });

    // AC-PHY-06: computeState(1.00, 0).infoCap === 1.0
    const infoCapAt100 = computeState(1.00, 0).infoCap;
    results.push({
        id: 'AC-PHY-06',
        name: 'infoCap === 1.0 at mu = 1.00',
        pass: Math.abs(infoCapAt100 - 1.0) < 1e-10,
        computed: infoCapAt100,
        expected: 1.0,
    });

    // AC-PHY-07: Bounds check for all mu in [0.30, 1.05]
    let boundsPass = true;
    for (let mu = 0.30; mu <= 1.05; mu += 0.05) {
        const s = computeState(mu, 0);
        if (s.T_holo < 0 || s.T_holo > 1 ||
            s.infoCap < 0 || s.infoCap > 1 ||
            s.J_eq < 0) {
            boundsPass = false;
            break;
        }
    }
    results.push({
        id: 'AC-PHY-07',
        name: 'All metrics within bounds for mu in [0.30, 1.05]',
        pass: boundsPass,
        computed: 'checked',
        expected: 'all in bounds',
    });

    return results;
}
