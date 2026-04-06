/**
 * layers/L7-routing.js
 * 
 * L7: Filing Strategy Router
 * 
 * Four-state FSM: WARNING → BUFFER → HARBOR
 *   WARNING = provisional filing (patentability uncertain)
 *   BUFFER  = non-provisional filing (core claims viable)
 *   HARBOR  = PCT filing (claims robust across jurisdictions)
 * 
 * Anti-recapture gate: once claims narrow, they cannot re-broaden.
 * Hysteresis on state transitions prevents oscillation.
 * 
 * Reads: L6.*, L5.*, L3.*
 * Writes: L7.routing_state, L7.anti_recapture_log
 * Emits: layer.L7.complete
 * 
 * @module layers/L7-routing
 */

'use strict';

const { ROUTING_STATES, ROUTING_HYSTERESIS, TAU, Z_C } = require('../shared/constants');

/** Routing thresholds (derived from TAU and Z_C) */
const THRESHOLDS = {
  WARNING_TO_BUFFER: Z_C * TAU,          // ≈ 0.535 — need moderate confidence
  BUFFER_TO_HARBOR: Z_C,                  // ≈ 0.866 — need high cross-regime confidence
  BUFFER_TO_WARNING: Z_C * TAU - ROUTING_HYSTERESIS,
  HARBOR_TO_BUFFER: Z_C - ROUTING_HYSTERESIS
};

/**
 * @param {import('../shared/signal-bus').SignalBus} signalBus
 */
function process(signalBus) {
  const crossRegimeConfidence = signalBus.getRegister('L6.cross_regime_confidence');
  const integrityScore = signalBus.getRegister('L5.integrity_score');
  const tripwireStates = signalBus.getRegister('L5.tripwire_states');
  const narrowingStages = signalBus.getRegister('L3.narrowing_stages');

  if (crossRegimeConfidence === undefined || integrityScore === undefined) {
    signalBus.emit('layer.L7.error', { message: 'Missing L6/L5 outputs' });
    return;
  }

  // Load previous routing state (for hysteresis)
  const previousState = signalBus.hasRegister('L7.routing_state')
    ? signalBus.getRegister('L7.routing_state')
    : null;
  const previousStateName = previousState ? previousState.state : 'WARNING';

  // Load anti-recapture log
  const antiRecaptureLog = signalBus.hasRegister('L7.anti_recapture_log')
    ? [...signalBus.getRegister('L7.anti_recapture_log')]
    : [];

  // Determine routing signal: combined confidence
  const routingSignal = (crossRegimeConfidence + integrityScore) / 2;

  // Check for any active tripwires — clamp to WARNING if critical
  const triggeredTripwires = tripwireStates
    ? Object.values(tripwireStates).filter(t => t.triggered).length
    : 0;

  let newState;

  if (triggeredTripwires >= 2) {
    // Multiple tripwires = forced WARNING regardless of confidence
    newState = 'WARNING';
  } else {
    // Hysteresis-gated state transitions
    switch (previousStateName) {
      case 'WARNING':
        newState = routingSignal >= THRESHOLDS.WARNING_TO_BUFFER
          ? 'BUFFER'
          : 'WARNING';
        break;

      case 'BUFFER':
        if (routingSignal >= THRESHOLDS.BUFFER_TO_HARBOR) {
          newState = 'HARBOR';
        } else if (routingSignal < THRESHOLDS.BUFFER_TO_WARNING) {
          newState = 'WARNING';
        } else {
          newState = 'BUFFER';
        }
        break;

      case 'HARBOR':
        newState = routingSignal < THRESHOLDS.HARBOR_TO_BUFFER
          ? 'BUFFER'
          : 'HARBOR';
        break;

      default:
        newState = 'WARNING';
    }
  }

  // Anti-recapture gate: prosecution history estoppel
  // If claims were narrowed (final count < initial count), log the narrowing
  // Once narrowed, prevent re-broadening
  const finalCount = narrowingStages
    ? narrowingStages[narrowingStages.length - 1].element_count
    : 0;
  const initialCount = narrowingStages ? narrowingStages[0].element_count : 0;

  if (finalCount < initialCount) {
    const narrowingRecord = {
      timestamp: Date.now(),
      initialCount,
      finalCount,
      scope_reduction: (initialCount - finalCount) / Math.max(1, initialCount)
    };

    // Check anti-recapture: if previously narrowed, cannot broaden
    const lastRecord = antiRecaptureLog.length > 0
      ? antiRecaptureLog[antiRecaptureLog.length - 1]
      : null;

    if (lastRecord && finalCount > lastRecord.finalCount) {
      // Attempted re-broadening — block it
      narrowingRecord.recapture_blocked = true;
      narrowingRecord.clamped_to = lastRecord.finalCount;
    }

    antiRecaptureLog.push(narrowingRecord);
  }

  const routingResult = {
    state: newState,
    strategy: ROUTING_STATES[newState].strategy,
    routingSignal,
    previousState: previousStateName,
    transitioned: newState !== previousStateName,
    triggeredTripwires,
    thresholds: THRESHOLDS
  };

  signalBus.setRegister('L7.routing_state', routingResult);
  signalBus.setRegister('L7.anti_recapture_log', antiRecaptureLog);

  signalBus.emit('layer.L7.complete', routingResult);
}

module.exports = { process, THRESHOLDS };
