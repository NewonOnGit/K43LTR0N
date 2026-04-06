/**
 * layers/L5-signal-rupture.js
 *
 * L5: Patentability Integrity Assessment
 *
 * V2 UPDATE: Geometric tripwire thresholds from SIG_TAU constants.
 *
 * Reads: L4.field_signature, eo.sigmaR, eo.tripwires
 * Writes: L5.integrity_score, L5.tripwire_states
 * Emits: layer.L5.complete
 *
 * @module layers/L5-signal-rupture
 */

'use strict';

const { TRIPWIRES, SIG_TAU, TAU } = require('../shared/constants');

/**
 * @param {import('../shared/signal-bus').SignalBus} signalBus
 */
function process(signalBus) {
  const fieldSignature = signalBus.getRegister('L4.field_signature');

  // V2: Read EO-computed signal rupture
  const eoSigmaR = signalBus.getRegister('eo.sigmaR');
  const eoTripwires = signalBus.getRegister('eo.tripwires');
  const eoSigmaState = signalBus.getRegister('eo.sigmaState');

  if (!fieldSignature) {
    signalBus.emit('layer.L5.error', { message: 'Missing L4 field_signature' });
    return;
  }

  // Load existing tripwire states (latch behavior)
  const existingTripwires = signalBus.hasRegister('L5.tripwire_states')
    ? signalBus.getRegister('L5.tripwire_states')
    : {};

  const tripwireStates = {};
  const tripwireNames = ['PRIOR_ART_KNOCKOUT', 'OBVIOUSNESS_FINDING', 'ELIGIBILITY_REJECT', 'ENABLEMENT_FAILURE'];

  for (let i = 0; i < tripwireNames.length; i++) {
    const name = tripwireNames[i];
    const config = TRIPWIRES[name];
    const channelValue = fieldSignature[config.channel];
    let triggered = false;

    if (config.direction === 'below') {
      triggered = channelValue < config.threshold;
    } else if (config.direction === 'above') {
      triggered = channelValue > config.threshold;
    }

    // V2: Also check EO-computed tripwires
    const eoTriggered = eoTripwires?.[i] || false;
    triggered = triggered || eoTriggered;

    // Latch behavior
    const wasTriggered = existingTripwires[name]?.triggered || false;
    const latched = triggered || wasTriggered;

    tripwireStates[name] = {
      triggered: latched,
      channelValue,
      threshold: config.threshold,
      direction: config.direction,
      channel: config.channel,
      newlyTriggered: triggered && !wasTriggered,
      eoTriggered
    };
  }

  // Composite integrity score
  const weights = {
    delta_obs: 1.0,
    eta_N: TAU,
    sigma: -1.0,
    gamma: -TAU,
    chi: 1.0,
    beta: -TAU * TAU,
    rho: TAU * TAU
  };

  let weightedSum = 0;
  let totalWeight = 0;
  for (const [channel, weight] of Object.entries(weights)) {
    const value = fieldSignature[channel] || 0;
    if (weight < 0) {
      weightedSum += Math.abs(weight) * (1 - value);
    } else {
      weightedSum += weight * value;
    }
    totalWeight += Math.abs(weight);
  }

  const computedIntegrity = totalWeight > 0 ? weightedSum / totalWeight : 0;

  // V2: Blend with EO-computed sigma_R
  const integrityScore = eoSigmaR !== undefined
    ? (1 - eoSigmaR) * 0.6 + computedIntegrity * 0.4
    : computedIntegrity;

  signalBus.setRegister('L5.integrity_score', integrityScore);
  signalBus.setRegister('L5.tripwire_states', tripwireStates);

  // V2: Store sigma state
  const triggeredCount = Object.values(tripwireStates).filter(t => t.triggered).length;
  let sigmaState = eoSigmaState || 'nominal';
  if (triggeredCount >= 3) sigmaState = 'critical';
  else if (triggeredCount >= 2) sigmaState = 'elevated';
  else if (triggeredCount >= 1) sigmaState = 'warning';

  signalBus.setRegister('L5.sigma_state', sigmaState);

  signalBus.emit('layer.L5.complete', {
    integrityScore,
    triggeredTripwires: triggeredCount,
    tripwireStates,
    sigmaState,
    eoBlended: eoSigmaR !== undefined
  });
}

module.exports = { process };
