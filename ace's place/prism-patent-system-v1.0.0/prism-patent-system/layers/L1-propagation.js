/**
 * layers/L1-propagation.js
 * 
 * L1: Claim Propagation
 * 
 * Propagates each claim element through the L0 landscape.
 * Models boundary reflections (prior art encounters), intensity decay
 * (claim strength degradation), and phase accumulation (framing shifts).
 * 
 * Reads: L0.*, signal.*, prism_object
 * Writes: L1.propagated_claims, L1.intensity_map, L1.phase_map
 * Emits: layer.L1.complete
 * 
 * @module layers/L1-propagation
 */

'use strict';

const { DECAY_RATE, Z_C, TAU } = require('../shared/constants');

/**
 * @param {import('../shared/signal-bus').SignalBus} signalBus
 */
function process(signalBus) {
  const prism = signalBus.getRegister('prism_object');
  const substrate = signalBus.getRegister('L0.substrate');
  const zones = signalBus.getRegister('L0.zones');
  const position = signalBus.getRegister('signal.position');
  const direction = signalBus.getRegister('signal.direction');
  const initialPhase = signalBus.getRegister('signal.phase');
  const initialIntensity = signalBus.getRegister('signal.intensity');

  if (!prism || !substrate) {
    signalBus.emit('layer.L1.error', { message: 'Missing L0 outputs or prism_object' });
    return;
  }

  const claims = prism.emergent_claims || [];
  const propagatedClaims = [];
  const intensityMap = {};
  const phaseMap = {};

  for (let i = 0; i < claims.length; i++) {
    const claim = claims[i];

    // Each claim propagates from initial position through zones
    let intensity = initialIntensity;
    let phase = initialPhase;
    let reflections = 0;

    // Simulate propagation through each prior art zone
    for (const zone of (zones || [])) {
      // Boundary reflection: intensity decays by DECAY_RATE at each encounter
      const overlap = zone.references.some(ref =>
        claim.toLowerCase().includes(ref.toLowerCase().split(/\s+/)[0])
      );

      if (overlap) {
        intensity *= DECAY_RATE;
        phase += Math.PI * TAU;
        reflections++;
      }
    }

    // Claim survives if intensity remains above the novelty threshold fraction
    const survived = intensity > 0;
    const noveltyScore = Math.min(1, intensity / Math.max(0.01, initialIntensity));

    propagatedClaims.push({
      index: i,
      text: claim,
      intensity,
      phase,
      reflections,
      noveltyScore,
      survived
    });

    intensityMap[`claim_${i}`] = intensity;
    phaseMap[`claim_${i}`] = phase;
  }

  signalBus.setRegister('L1.propagated_claims', propagatedClaims);
  signalBus.setRegister('L1.intensity_map', intensityMap);
  signalBus.setRegister('L1.phase_map', phaseMap);

  signalBus.emit('layer.L1.complete', {
    claimCount: propagatedClaims.length,
    survivedCount: propagatedClaims.filter(c => c.survived).length,
    avgIntensity: propagatedClaims.length > 0
      ? propagatedClaims.reduce((s, c) => s + c.intensity, 0) / propagatedClaims.length
      : 0
  });
}

module.exports = { process };
