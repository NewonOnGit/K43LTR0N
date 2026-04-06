/**
 * layers/L4-field-signature.js
 * 
 * L4: Claim Landscape Signature
 * 
 * Computes seven channels characterizing the invention's position:
 *   δ_obs — prior art gap
 *   η_N   — terminology sensitivity
 *   σ     — suppression fraction
 *   γ     — scope-to-disclosure gap
 *   χ     — internal consistency
 *   β     — prosecution burden
 *   ρ     — inventorship provenance
 * 
 * Each channel is a float in [0, 1].
 * 
 * Reads: L3.*, L1.*, L0.*, prism_object
 * Writes: L4.field_signature
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
  const propagatedClaims = signalBus.getRegister('L1.propagated_claims');
  const substrate = signalBus.getRegister('L0.substrate');
  const prism = signalBus.getRegister('prism_object');

  if (!stages || !prism) {
    signalBus.emit('layer.L4.error', { message: 'Missing upstream outputs' });
    return;
  }

  const initialCount = stages[0] ? stages[0].element_count : 1;
  const finalCount = stages[stages.length - 1] ? stages[stages.length - 1].element_count : 0;
  const claims = propagatedClaims || [];

  // δ_obs: Prior art gap — fraction of invention NOT covered by prior art
  const priorArtRefs = prism.reflection ? prism.reflection.prior_art_refs.length : 0;
  const tensionCount = prism.tension_points ? prism.tension_points.length : 0;
  const delta_obs = Math.min(1, Math.max(0,
    tensionCount > 0
      ? 1 - (priorArtRefs / (priorArtRefs + tensionCount + 1))
      : TAU
  ));

  // η_N: Terminology sensitivity — how sensitive claims are to wording changes
  // Proxy: variance in claim text lengths (high variance = less stable terminology)
  const lengths = claims.map(c => c.text.split(/\s+/).length);
  const avgLen = lengths.length > 0 ? lengths.reduce((a, b) => a + b, 0) / lengths.length : 0;
  const variance = lengths.length > 1
    ? lengths.reduce((s, l) => s + Math.pow(l - avgLen, 2), 0) / (lengths.length - 1)
    : 0;
  const eta_N = Math.min(1, Math.max(0, 1 - variance / (avgLen * avgLen + 1)));

  // σ: Suppression fraction — fraction of claim elements blocked by prior art
  const suppressedCount = initialCount - finalCount;
  const sigma = initialCount > 0 ? suppressedCount / initialCount : 0;

  // γ: Scope-to-disclosure gap — distance between claimed scope and supported embodiments
  const projElements = prism.projection ? prism.projection.elements.length : 0;
  const artifacts = prism.artifacts ? prism.artifacts.length : 0;
  const gamma = Math.min(1, Math.max(0,
    finalCount > 0
      ? 1 - Math.min(1, (projElements + artifacts) / (finalCount * 2))
      : 1
  ));

  // χ: Internal consistency — coherence across the claim set
  // High consistency = claims don't contradict each other
  // Proxy: claims surviving all stages have consistent admissibility
  const chi = finalCount > 0
    ? Math.min(1, finalCount / Math.max(1, claims.length) + TAU * 0.3)
    : 0;

  // β: Prosecution burden — complexity of arguments needed to overcome rejections
  const lossOps = signalBus.getRegister('L3.loss_operators') || [];
  const totalLoss = lossOps.reduce((s, op) => s + op.lost, 0);
  const beta = Math.min(1, totalLoss / Math.max(1, initialCount));

  // ρ: Inventorship provenance — strength of inventorship attribution
  // Proxy: inventor confirmation + session completeness
  const rho = prism.inventor_confirmation
    ? Math.min(1, TAU + (prism.session_transcript ? prism.session_transcript.length / 5000 : 0) * TAU)
    : 0.2;

  const fieldSignature = {
    delta_obs,
    eta_N,
    sigma,
    gamma,
    chi,
    beta,
    rho
  };

  signalBus.setRegister('L4.field_signature', fieldSignature);

  signalBus.emit('layer.L4.complete', { fieldSignature });
}

module.exports = { process };
