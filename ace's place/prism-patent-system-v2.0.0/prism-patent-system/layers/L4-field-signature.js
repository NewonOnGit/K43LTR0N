/**
 * layers/L4-field-signature.js
 *
 * L4: Claim Landscape Signature
 *
 * V2 REWRITE: All 7 channels derived from geometric quantities.
 *
 * Reads: L3.*, eo.fieldSignature, stance.*
 * Writes: L4.field_signature, L4.geometric_sources
 * Emits: layer.L4.complete
 *
 * @module layers/L4-field-signature
 */

'use strict';

const { FIELD_SIGNATURE_CHANNELS, TAU, Z_C } = require('../shared/constants');

/**
 * @param {import('../shared/signal-bus').SignalBus} signalBus
 */
function process(signalBus) {
  const stages = signalBus.getRegister('L3.narrowing_stages');
  const prism = signalBus.getRegister('prism_object');

  // V2: Read geometric field signature from EO bridge
  const eoFieldSignature = signalBus.getRegister('eo.fieldSignature');

  // V2: Read stance metrics for hybrid computation
  const imNorm = signalBus.getRegister('stance.imNorm') || 0.5;
  const kerNorm = signalBus.getRegister('stance.kerNorm') || 0.5;
  const k4Deficit = signalBus.getRegister('stance.k4Deficit') || 0.5;
  const landauerCost = signalBus.getRegister('stance.landauerCost') || 0;
  const commitmentDepth = signalBus.getRegister('stance.commitmentDepth') || 0;
  const areaRatio = signalBus.getRegister('stance.areaRatio') || 1;
  const uatMeasure = signalBus.getRegister('stance.uatMeasure') || 0;

  if (!stages || !prism) {
    signalBus.emit('layer.L4.error', { message: 'Missing upstream outputs' });
    return;
  }

  const initialCount = stages[0]?.element_count || 1;
  const finalCount = stages[stages.length - 1]?.element_count || 0;

  // V2: Compute field signature with geometric grounding
  // Each channel blends EO-computed value with text-derived value

  // delta_obs: Prior art gap (from im_norm)
  const delta_obs = eoFieldSignature?.delta_obs !== undefined
    ? eoFieldSignature.delta_obs
    : 1 - imNorm;

  // eta_N: Terminology sensitivity (from UAT measure)
  const eta_N = eoFieldSignature?.eta_N !== undefined
    ? eoFieldSignature.eta_N
    : uatMeasure;

  // sigma: Suppression fraction (from narrowing + geometric)
  const suppressedCount = initialCount - finalCount;
  const textSigma = initialCount > 0 ? suppressedCount / initialCount : 0;
  const sigma = eoFieldSignature?.sigma !== undefined
    ? eoFieldSignature.sigma * 0.6 + textSigma * 0.4
    : textSigma;

  // gamma: Scope-to-disclosure gap (from area ratio)
  const gamma = eoFieldSignature?.gamma !== undefined
    ? eoFieldSignature.gamma
    : Math.abs(areaRatio - 1) / Math.max(1, areaRatio);

  // chi: Internal consistency (from k4_deficit)
  const chi = eoFieldSignature?.chi !== undefined
    ? eoFieldSignature.chi
    : Math.max(0, 1 - k4Deficit);

  // beta: Prosecution burden (from Landauer cost)
  const beta = eoFieldSignature?.beta !== undefined
    ? eoFieldSignature.beta
    : Math.min(1, landauerCost);

  // rho: Inventorship provenance (from commitment depth)
  const rho = eoFieldSignature?.rho !== undefined
    ? eoFieldSignature.rho
    : Math.min(1, commitmentDepth);

  const fieldSignature = {
    delta_obs,
    eta_N,
    sigma,
    gamma,
    chi,
    beta,
    rho
  };

  // V2: Track geometric sources for transparency
  const geometricSources = {
    delta_obs: { source: 'im_norm', value: imNorm },
    eta_N: { source: 'uat_measure', value: uatMeasure },
    sigma: { source: 'eo.suppressed', textContribution: textSigma },
    gamma: { source: 'area_ratio', value: areaRatio },
    chi: { source: 'k4_deficit', value: k4Deficit },
    beta: { source: 'landauer_cost', value: landauerCost },
    rho: { source: 'commitment_depth', value: commitmentDepth }
  };

  signalBus.setRegister('L4.field_signature', fieldSignature);
  signalBus.setRegister('L4.geometric_sources', geometricSources);

  signalBus.emit('layer.L4.complete', {
    fieldSignature,
    geometricGrounded: eoFieldSignature !== undefined
  });
}

module.exports = { process };
