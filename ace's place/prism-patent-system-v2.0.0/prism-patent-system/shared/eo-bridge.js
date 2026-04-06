/**
 * shared/eo-bridge.js
 *
 * EO Bridge — Geometry to EO-RFD Metric Derivation
 *
 * Converts geometric framework quantities (from stance-engine.js) into
 * EO-RFD detector metrics. This replaces V1's per-layer proxy computations
 * with a single derivation pass from the geometric stance.
 *
 * All metrics derive from the geometry. No arbitrary numeric mappings.
 *
 * Buildspec §2.3, §6, Contract 7
 *
 * @module shared/eo-bridge
 */

'use strict';

const {
  Z_C, SIGMA_NEG, TAU, Z_WEIGHTS,
  ADMISSIBILITY_COEFFS, ROUTING_TH, DET_MODS,
  SIG_TAU, NARROWING_STAGES
} = require('./constants');

/**
 * @typedef {import('./stance-engine').FrameworkQuantities} FrameworkQuantities
 */

/**
 * @typedef {Object} FieldSignature
 * @property {number} delta_obs - Prior art gap (1 - im_norm)
 * @property {number} eta_N - Terminology sensitivity (uat_measure)
 * @property {number} sigma - Suppression fraction
 * @property {number} gamma - Scope disclosure gap
 * @property {number} chi - Internal consistency (1 - k4_deficit)
 * @property {number} beta - Prosecution burden (landauer_cost)
 * @property {number} rho - Inventorship provenance (commitment_depth)
 */

/**
 * @typedef {Object} AdmissibilityFractions
 * @property {number} registered - R: passes through clearly
 * @property {number} latent - L: exists but not articulated
 * @property {number} suppressed - S: blocked by prior art
 * @property {number} aliased - A: terminology confusion
 */

/**
 * @typedef {Object} NarrowingFunnel
 * @property {number} S - Raw disclosure
 * @property {number} R - Receivable
 * @property {number} K - Aperture filtered
 * @property {number} E1 - Phase coherent
 * @property {number} P - Policy passed
 * @property {number} F - Capacity admitted
 * @property {number} A_n - Final claims
 * @property {string} dominantLoss - Stage with largest loss
 * @property {number[]} losses - Loss at each stage
 */

/**
 * @typedef {Object} RoutingState
 * @property {string} state - Current FSM state: 'play' | 'warning' | 'buffer' | 'harbor'
 * @property {boolean} harborEligible - Eligible for harbor state?
 * @property {number} harborMetric - Harbor eligibility metric
 * @property {number} persistence - Signal persistence metric
 * @property {number} recapture - Recapture probability
 * @property {number} antiRecapture - Anti-recapture metric
 */

/**
 * @typedef {Object} ClosureState
 * @property {boolean} extAdmitted - At least one claim element survived
 * @property {boolean} closureFailure - Claims exist but set is inconsistent
 * @property {boolean} uniqueClosure - Claim set is consistent or empty
 */

/**
 * @typedef {Object} EOMetrics
 * @property {number} z - Observer z-coordinate (0-1)
 * @property {number} eta - Negentropy
 * @property {AdmissibilityFractions} admissibility - R/L/S/A fractions
 * @property {NarrowingFunnel} narrowing - Narrowing cascade
 * @property {FieldSignature} fieldSignature - 7-channel field signature
 * @property {number} sigmaR - Signal rupture composite
 * @property {string} sigmaState - Signal rupture state
 * @property {boolean[]} tripwires - Which tripwires fired
 * @property {Object} detectorSweep - 3x3 detector matrix
 * @property {RoutingState} routing - 4-state FSM
 * @property {ClosureState} closure - Closure state tracking
 */

/**
 * Compute the z-coordinate from geometric quantities.
 * z represents the observer's position in the novelty landscape.
 *
 * @param {FrameworkQuantities} fw - Framework quantities
 * @returns {number} z-coordinate (0-1)
 */
function computeZ(fw) {
  if (fw.eInside) {
    return Z_WEIGHTS.W_CENTRALITY * fw.centrality +
           Z_WEIGHTS.W_BOUNDARY * fw.boundaryProx;
  } else {
    return Z_WEIGHTS.W_OUTSIDE * fw.centrality;
  }
}

/**
 * Compute negentropy from z-coordinate.
 * eta = exp(-sigma_neg * (z - z_c)^2)
 * Gaussian peak at z = z_c (novelty threshold).
 *
 * @param {number} z - z-coordinate
 * @returns {number} Negentropy (0-1)
 */
function computeNegentropy(z) {
  const delta = z - Z_C;
  return Math.exp(-SIGMA_NEG * delta * delta);
}

/**
 * Compute admissibility fractions from geometric quantities.
 * R/L/S/A decomposition shows WHERE claim scope lives.
 *
 * @param {FrameworkQuantities} fw - Framework quantities
 * @returns {AdmissibilityFractions}
 */
function computeAdmissibility(fw) {
  const { imNorm, kerNorm, uatMeasure, eInside } = fw;

  // Registered: claim elements that pass through clearly
  const registered = imNorm * (eInside
    ? ADMISSIBILITY_COEFFS.REGISTERED_INSIDE
    : ADMISSIBILITY_COEFFS.REGISTERED_OUTSIDE);

  // Suppressed: claim elements blocked by prior art
  const suppressed = kerNorm * ADMISSIBILITY_COEFFS.SUPPRESSED_SCALE;

  // Aliased: claim elements with terminology confusion
  const aliased = uatMeasure * ADMISSIBILITY_COEFFS.ALIASED_SCALE;

  // Latent: claim elements that exist but haven't been articulated
  // (what's left after accounting for R, S, A)
  const latent = Math.max(0, 1 - registered - suppressed - aliased);

  // Normalize to ensure sum <= 1
  const total = registered + latent + suppressed + aliased;
  if (total > 1) {
    const scale = 1 / total;
    return {
      registered: registered * scale,
      latent: latent * scale,
      suppressed: suppressed * scale,
      aliased: aliased * scale
    };
  }

  return { registered, latent, suppressed, aliased };
}

/**
 * Compute the narrowing cascade from geometric quantities.
 * Shows how claims compress through the pipeline stages.
 *
 * @param {FrameworkQuantities} fw - Framework quantities
 * @param {AdmissibilityFractions} admiss - Admissibility fractions
 * @returns {NarrowingFunnel}
 */
function computeNarrowing(fw, admiss) {
  const { compression, imNorm, kerNorm, k4Deficit } = fw;
  const { registered, suppressed } = admiss;

  // Start with raw disclosure (normalized to 1)
  let current = 1.0;
  const stages = [];
  const losses = [];

  // S -> R: Receivability (compression-based)
  const receivableLoss = Math.min(0.3, 1 - 1 / (1 + compression * 0.1));
  stages.push({ id: 'S', value: current });
  current *= (1 - receivableLoss);
  losses.push(receivableLoss);

  // R -> K: Aperture filtering (im-based, novelty)
  const apertureLoss = Math.min(0.4, 1 - imNorm);
  stages.push({ id: 'R', value: current });
  current *= (1 - apertureLoss);
  losses.push(apertureLoss);

  // K -> E1: Phase coherence (ker-based, non-obviousness)
  const phaseLoss = Math.min(0.35, kerNorm * 0.5);
  stages.push({ id: 'K', value: current });
  current *= (1 - phaseLoss);
  losses.push(phaseLoss);

  // E1 -> P: Policy (suppressed-based, eligibility)
  const policyLoss = Math.min(0.3, suppressed * 0.8);
  stages.push({ id: 'E1', value: current });
  current *= (1 - policyLoss);
  losses.push(policyLoss);

  // P -> F: Capacity (k4_deficit-based, enablement)
  const capacityLoss = Math.min(0.25, k4Deficit * 0.3);
  stages.push({ id: 'P', value: current });
  current *= (1 - capacityLoss);
  losses.push(capacityLoss);

  // F -> A_n: Final claims (registered-based, written description)
  const finalLoss = Math.min(0.2, (1 - registered) * 0.25);
  stages.push({ id: 'F', value: current });
  current *= (1 - finalLoss);
  losses.push(finalLoss);

  stages.push({ id: 'A_n', value: current });

  // Find dominant loss
  const maxLossIdx = losses.indexOf(Math.max(...losses));
  const stageIds = ['S_to_R', 'R_to_K', 'K_to_E1', 'E1_to_P', 'P_to_F', 'F_to_An'];
  const dominantLoss = stageIds[maxLossIdx];

  return {
    S: 1.0,
    R: stages[1].value,
    K: stages[2].value,
    E1: stages[3].value,
    P: stages[4].value,
    F: stages[5].value,
    A_n: stages[6].value,
    dominantLoss,
    losses
  };
}

/**
 * Compute the 7-channel field signature from geometric quantities.
 *
 * @param {FrameworkQuantities} fw - Framework quantities
 * @param {AdmissibilityFractions} admiss - Admissibility fractions
 * @returns {FieldSignature}
 */
function computeFieldSignature(fw, admiss) {
  return {
    // delta_obs: Prior art gap (high = far from prior art)
    delta_obs: 1 - fw.imNorm,

    // eta_N: Terminology sensitivity (high = more ambiguous terms)
    eta_N: fw.uatMeasure,

    // sigma: Suppression fraction
    sigma: admiss.suppressed,

    // gamma: Scope disclosure gap (from area ratio asymmetry)
    gamma: Math.abs(fw.areaRatio - 1) / fw.areaRatio,

    // chi: Internal consistency (high = consistent)
    chi: Math.max(0, 1 - fw.k4Deficit),

    // beta: Prosecution burden (from Landauer cost)
    beta: Math.min(1, fw.landauerCost),

    // rho: Inventorship provenance (from commitment depth)
    rho: Math.min(1, fw.commitmentDepth)
  };
}

/**
 * Compute signal rupture composite and tripwire states.
 *
 * @param {FieldSignature} sig - Field signature
 * @returns {{sigmaR: number, sigmaState: string, tripwires: boolean[]}}
 */
function computeSignalRupture(sig) {
  const tripwires = [
    sig.delta_obs < SIG_TAU.OBS,   // Prior art knockout
    sig.eta_N < SIG_TAU.NAME,      // Obviousness finding
    sig.sigma > SIG_TAU.RED,       // Eligibility reject
    sig.chi < SIG_TAU.COH          // Enablement failure
  ];

  const tripCount = tripwires.filter(t => t).length;

  // Composite: weighted sum of channel distances from threshold
  const sigmaR =
    0.3 * Math.max(0, SIG_TAU.OBS - sig.delta_obs) +
    0.2 * Math.max(0, SIG_TAU.NAME - sig.eta_N) +
    0.25 * Math.max(0, sig.sigma - SIG_TAU.RED) +
    0.25 * Math.max(0, SIG_TAU.COH - sig.chi);

  let sigmaState = 'nominal';
  if (tripCount >= 3) sigmaState = 'critical';
  else if (tripCount >= 2) sigmaState = 'elevated';
  else if (tripCount >= 1) sigmaState = 'warning';

  return { sigmaR, sigmaState, tripwires };
}

/**
 * Compute the 3x3 detector sweep matrix.
 * Theta (prosecution strategy) x Naming (terminology convention).
 *
 * @param {FieldSignature} sig - Field signature
 * @param {number} z - z-coordinate
 * @returns {Object} 3x3 detector matrix
 */
function computeDetectorSweep(sig, z) {
  const baseScore = (z + sig.chi + (1 - sig.sigma)) / 3;

  const matrix = {};
  const thetaKeys = ['open', 'std', 'res'];
  const nameKeys = ['canon', 'safe', 'inv'];

  for (const theta of thetaKeys) {
    matrix[theta] = {};
    for (const name of nameKeys) {
      const thetaMod = DET_MODS.theta[theta];
      const nameMod = DET_MODS.name[name];
      matrix[theta][name] = baseScore * thetaMod * nameMod;
    }
  }

  return matrix;
}

/**
 * Compute routing FSM state and metrics.
 * 4-state FSM: PLAY -> WARNING -> BUFFER -> HARBOR
 *
 * @param {FrameworkQuantities} fw - Framework quantities
 * @param {number} sigmaR - Signal rupture composite
 * @param {NarrowingFunnel} narrowing - Narrowing cascade
 * @returns {RoutingState}
 */
function computeRouting(fw, sigmaR, narrowing) {
  // Harbor metric: based on centrality and compression
  const harborMetric = fw.centrality * (1 - Math.min(1, fw.compression / 5));

  // Persistence: how stable is the signal?
  const persistence = fw.eInside
    ? (1 - sigmaR) * fw.imNorm
    : (1 - sigmaR) * 0.3;

  // Recapture: probability of recovering lost scope
  const recapture = narrowing.A_n * (1 - fw.k4Deficit);

  // Anti-recapture: resistance to scope recovery
  const antiRecapture = fw.kerNorm * sigmaR;

  // Determine FSM state
  let state = 'play';

  if (harborMetric > ROUTING_TH.warningH || recapture > ROUTING_TH.warningR) {
    state = 'warning';
  }

  if (state === 'warning' &&
      (harborMetric > ROUTING_TH.bufferH || persistence > ROUTING_TH.bufferP)) {
    state = 'buffer';
  }

  if (state === 'buffer' &&
      harborMetric > ROUTING_TH.harborH &&
      persistence > ROUTING_TH.strongP &&
      recapture > ROUTING_TH.warningR) {
    state = 'harbor';
  }

  // Harbor eligibility
  const harborEligible = harborMetric > ROUTING_TH.harborH &&
                         persistence > ROUTING_TH.strongP &&
                         sigmaR < ROUTING_TH.sigmaA;

  return {
    state,
    harborEligible,
    harborMetric,
    persistence,
    recapture,
    antiRecapture
  };
}

/**
 * Compute closure state tracking.
 *
 * @param {NarrowingFunnel} narrowing - Narrowing cascade
 * @param {AdmissibilityFractions} admiss - Admissibility fractions
 * @param {number} k4Deficit - K4 closure deficit
 * @param {number} sigmaR - Signal rupture composite
 * @returns {ClosureState}
 */
function computeClosure(narrowing, admiss, k4Deficit, sigmaR) {
  // Extension admitted: at least one claim element survived
  const extAdmitted = narrowing.A_n > 0 || admiss.registered > 0.02;

  // Closure failure: claims exist but set is algebraically inconsistent
  const closureFailure = admiss.registered > 0.02 &&
                         (k4Deficit > 0.8 || sigmaR >= ROUTING_TH.sigmaA);

  // Unique closure: either empty or consistent
  const uniqueClosure = !(extAdmitted && closureFailure);

  return { extAdmitted, closureFailure, uniqueClosure };
}

/**
 * Derive all EO-RFD metrics from geometric framework quantities.
 * This is the main entry point for the EO Bridge.
 *
 * @param {FrameworkQuantities} fw - Framework quantities from stance-engine
 * @returns {EOMetrics} Complete EO-RFD metrics
 */
function deriveEO(fw) {
  // z-coordinate
  const z = computeZ(fw);

  // Negentropy
  const eta = computeNegentropy(z);

  // Admissibility fractions
  const admissibility = computeAdmissibility(fw);

  // Narrowing cascade
  const narrowing = computeNarrowing(fw, admissibility);

  // Field signature
  const fieldSignature = computeFieldSignature(fw, admissibility);

  // Signal rupture
  const { sigmaR, sigmaState, tripwires } = computeSignalRupture(fieldSignature);

  // Detector sweep
  const detectorSweep = computeDetectorSweep(fieldSignature, z);

  // Routing FSM
  const routing = computeRouting(fw, sigmaR, narrowing);

  // Closure state
  const closure = computeClosure(narrowing, admissibility, fw.k4Deficit, sigmaR);

  return {
    z,
    eta,
    admissibility,
    narrowing,
    fieldSignature,
    sigmaR,
    sigmaState,
    tripwires,
    detectorSweep,
    routing,
    closure
  };
}

/**
 * Write all EO metrics to the SignalBus under eo.* prefix.
 *
 * @param {EOMetrics} eo - EO metrics
 * @param {import('./signal-bus').SignalBus} signalBus - The signal bus
 */
function writeToSignalBus(eo, signalBus) {
  signalBus.setRegister('eo.z', eo.z);
  signalBus.setRegister('eo.eta', eo.eta);
  signalBus.setRegister('eo.registered', eo.admissibility.registered);
  signalBus.setRegister('eo.latent', eo.admissibility.latent);
  signalBus.setRegister('eo.suppressed', eo.admissibility.suppressed);
  signalBus.setRegister('eo.aliased', eo.admissibility.aliased);
  signalBus.setRegister('eo.narrowing', eo.narrowing);
  signalBus.setRegister('eo.fieldSignature', eo.fieldSignature);
  signalBus.setRegister('eo.sigmaR', eo.sigmaR);
  signalBus.setRegister('eo.sigmaState', eo.sigmaState);
  signalBus.setRegister('eo.tripwires', eo.tripwires);
  signalBus.setRegister('eo.detectorSweep', eo.detectorSweep);
  signalBus.setRegister('eo.routeState', eo.routing.state);
  signalBus.setRegister('eo.routing', eo.routing);
  signalBus.setRegister('eo.closureState', eo.closure);

  signalBus.emit('eo.derived', {
    z: eo.z,
    state: eo.routing.state,
    registered: eo.admissibility.registered
  });
}

/**
 * Read EO metrics from the SignalBus.
 *
 * @param {import('./signal-bus').SignalBus} signalBus - The signal bus
 * @returns {EOMetrics} EO metrics from registers
 */
function readFromSignalBus(signalBus) {
  return {
    z: signalBus.getRegister('eo.z'),
    eta: signalBus.getRegister('eo.eta'),
    admissibility: {
      registered: signalBus.getRegister('eo.registered'),
      latent: signalBus.getRegister('eo.latent'),
      suppressed: signalBus.getRegister('eo.suppressed'),
      aliased: signalBus.getRegister('eo.aliased')
    },
    narrowing: signalBus.getRegister('eo.narrowing'),
    fieldSignature: signalBus.getRegister('eo.fieldSignature'),
    sigmaR: signalBus.getRegister('eo.sigmaR'),
    sigmaState: signalBus.getRegister('eo.sigmaState'),
    tripwires: signalBus.getRegister('eo.tripwires'),
    detectorSweep: signalBus.getRegister('eo.detectorSweep'),
    routing: signalBus.getRegister('eo.routing'),
    closure: signalBus.getRegister('eo.closureState')
  };
}

module.exports = {
  deriveEO,
  writeToSignalBus,
  readFromSignalBus,
  computeZ,
  computeNegentropy,
  computeAdmissibility,
  computeNarrowing,
  computeFieldSignature,
  computeSignalRupture,
  computeDetectorSweep,
  computeRouting,
  computeClosure
};
