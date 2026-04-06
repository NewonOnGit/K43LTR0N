/**
 * layers/L5-signal-rupture.js
 * 
 * L5: Patentability Integrity Assessment
 * 
 * Composite metric Σ_R from L4 channels. Four Schmitt-triggered tripwires
 * that latch permanently once triggered — require explicit claim amendment to clear.
 * 
 * Tripwires:
 *   1. Prior art knockout    (δ_obs < threshold)
 *   2. Obviousness finding   (η_N < threshold)
 *   3. Eligibility rejection (σ > threshold)
 *   4. Enablement failure    (χ < threshold)
 * 
 * Reads: L4.field_signature
 * Writes: L5.integrity_score, L5.tripwire_states
 * Emits: layer.L5.complete
 * 
 * @module layers/L5-signal-rupture
 */

'use strict';

const { TRIPWIRES, TAU } = require('../shared/constants');

/**
 * @param {import('../shared/signal-bus').SignalBus} signalBus
 */
function process(signalBus) {
  const fieldSignature = signalBus.getRegister('L4.field_signature');

  if (!fieldSignature) {
    signalBus.emit('layer.L5.error', { message: 'Missing L4 field_signature' });
    return;
  }

  // Load existing tripwire states (may have been set by a previous pass)
  // Tripwires LATCH: once triggered, they stay triggered until explicit clear
  const existingTripwires = signalBus.hasRegister('L5.tripwire_states')
    ? signalBus.getRegister('L5.tripwire_states')
    : {};

  const tripwireStates = {};

  for (const [name, config] of Object.entries(TRIPWIRES)) {
    const channelValue = fieldSignature[config.channel];
    let triggered = false;

    if (config.direction === 'below') {
      triggered = channelValue < config.threshold;
    } else if (config.direction === 'above') {
      triggered = channelValue > config.threshold;
    }

    // Latch behavior: once triggered, stays triggered
    // Can only be cleared by explicit amendment (setRegister with cleared state)
    const wasTriggered = existingTripwires[name] ? existingTripwires[name].triggered : false;
    const latched = triggered || wasTriggered;

    tripwireStates[name] = {
      triggered: latched,
      channelValue,
      threshold: config.threshold,
      direction: config.direction,
      channel: config.channel,
      newlyTriggered: triggered && !wasTriggered
    };
  }

  // Composite integrity score Σ_R: weighted sum of field signature channels
  // Higher = better patentability
  const weights = {
    delta_obs: 1.0,       // Prior art gap is most critical
    eta_N: TAU,           // Terminology sensitivity
    sigma: -1.0,          // Suppression is negative (lower sigma = better)
    gamma: -TAU,          // Scope gap is negative
    chi: 1.0,             // Consistency is positive
    beta: -TAU * TAU,     // Prosecution burden is negative
    rho: TAU * TAU        // Provenance has moderate weight
  };

  let weightedSum = 0;
  let totalWeight = 0;
  for (const [channel, weight] of Object.entries(weights)) {
    const value = fieldSignature[channel] || 0;
    // For negative-weighted channels, invert the contribution
    if (weight < 0) {
      weightedSum += Math.abs(weight) * (1 - value);
    } else {
      weightedSum += weight * value;
    }
    totalWeight += Math.abs(weight);
  }

  const integrityScore = totalWeight > 0 ? weightedSum / totalWeight : 0;

  signalBus.setRegister('L5.integrity_score', integrityScore);
  signalBus.setRegister('L5.tripwire_states', tripwireStates);

  const triggeredCount = Object.values(tripwireStates).filter(t => t.triggered).length;

  signalBus.emit('layer.L5.complete', {
    integrityScore,
    triggeredTripwires: triggeredCount,
    tripwireStates
  });
}

module.exports = { process };
