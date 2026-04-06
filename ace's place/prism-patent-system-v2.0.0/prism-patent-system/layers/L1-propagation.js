/**
 * layers/L1-propagation.js
 *
 * L1: Claim Propagation
 *
 * V2 UPDATE: Path intersection with Q edges drives propagation.
 * Compression ratio from geometric stance determines intensity decay.
 *
 * Reads: L0.*, stance.*, signal.*, prism_object
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

  // V2: Read geometric stance metrics
  const compression = signalBus.getRegister('stance.compression') || 1;
  const deflection = signalBus.getRegister('stance.deflection') || 0;
  const imNorm = signalBus.getRegister('stance.imNorm') || 0.5;
  const kerNorm = signalBus.getRegister('stance.kerNorm') || 0.5;

  // V1 compat
  const initialPhase = signalBus.getRegister('signal.phase') || 0;
  const initialIntensity = signalBus.getRegister('signal.intensity') || 1;

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

    // V2: Intensity decay based on geometric compression
    // Higher compression = more intensity loss through the observer
    let intensity = initialIntensity;
    let phase = initialPhase;
    let reflections = 0;

    // Simulate propagation through each prior art zone
    for (const zone of (zones || [])) {
      // Check for textual overlap with prior art (V1 behavior preserved)
      const overlap = zone.references.some(ref =>
        claim.toLowerCase().includes(ref.toLowerCase().split(/\s+/)[0])
      );

      if (overlap) {
        // V2: Decay rate modulated by compression ratio
        const effectiveDecay = DECAY_RATE * (1 + (compression - 1) * 0.1);
        intensity *= effectiveDecay;
        phase += Math.PI * TAU;
        reflections++;
      }
    }

    // V2: Additional intensity modulation from im/ker ratio
    // Higher im_norm = more signal passes through
    intensity *= (0.5 + imNorm * 0.5);

    // V2: Phase shift from deflection angle
    phase += deflection * 0.5;

    // Claim survives if intensity remains above threshold
    const survived = intensity > 0;
    const noveltyScore = Math.min(1, intensity / Math.max(0.01, initialIntensity));

    propagatedClaims.push({
      index: i,
      text: claim,
      intensity,
      phase,
      reflections,
      noveltyScore,
      survived,
      // V2 additions
      compressionFactor: compression,
      imContribution: imNorm,
      kerContribution: kerNorm
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
      : 0,
    compressionApplied: compression
  });
}

module.exports = { process };
