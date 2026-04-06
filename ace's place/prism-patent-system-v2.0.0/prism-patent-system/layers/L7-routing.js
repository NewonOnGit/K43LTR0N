/**
 * layers/L7-routing.js
 *
 * L7: Filing Strategy Router
 *
 * V2 REWRITE: 4-state FSM (PLAY -> WARNING -> BUFFER -> HARBOR)
 * with geometric hysteresis from ROUTING_TH constants.
 *
 * Reads: L6.*, L5.*, eo.routing
 * Writes: L7.routing_state, L7.anti_recapture_log
 * Emits: layer.L7.complete
 *
 * @module layers/L7-routing
 */

'use strict';

const { ROUTING_STATES, ROUTING_TH, ROUTING_HYSTERESIS, TAU, Z_C } = require('../shared/constants');

/**
 * @param {import('../shared/signal-bus').SignalBus} signalBus
 */
function process(signalBus) {
  const crossRegimeConfidence = signalBus.getRegister('L6.cross_regime_confidence');
  const integrityScore = signalBus.getRegister('L5.integrity_score');
  const tripwireStates = signalBus.getRegister('L5.tripwire_states');
  const narrowingStages = signalBus.getRegister('L3.narrowing_stages');

  // V2: Read EO routing state
  const eoRouting = signalBus.getRegister('eo.routing');
  const eoRouteState = signalBus.getRegister('eo.routeState');

  if (crossRegimeConfidence === undefined || integrityScore === undefined) {
    signalBus.emit('layer.L7.error', { message: 'Missing L6/L5 outputs' });
    return;
  }

  // Load previous routing state (for hysteresis)
  const previousState = signalBus.hasRegister('L7.routing_state')
    ? signalBus.getRegister('L7.routing_state')
    : null;
  const previousStateName = previousState ? previousState.state : 'PLAY';

  // Load anti-recapture log
  const antiRecaptureLog = signalBus.hasRegister('L7.anti_recapture_log')
    ? [...signalBus.getRegister('L7.anti_recapture_log')]
    : [];

  // V2: Compute routing metrics from geometric stance
  const harborMetric = eoRouting?.harborMetric || (crossRegimeConfidence + integrityScore) / 2;
  const persistence = eoRouting?.persistence || integrityScore * 0.8;
  const recapture = eoRouting?.recapture || 0.5;
  const antiRecapture = eoRouting?.antiRecapture || 0.3;

  // Check tripwire count
  const triggeredTripwires = tripwireStates
    ? Object.values(tripwireStates).filter(t => t.triggered).length
    : 0;

  let newState;

  // V2: 4-state FSM with geometric thresholds
  if (triggeredTripwires >= 3) {
    // Critical tripwires = forced WARNING
    newState = 'WARNING';
  } else if (triggeredTripwires >= 2 && previousStateName !== 'PLAY') {
    // Multiple tripwires prevent advancement, but don't regress from PLAY
    newState = 'WARNING';
  } else {
    // Hysteresis-gated state transitions
    switch (previousStateName) {
      case 'PLAY':
        // V2 NEW: PLAY is the initial exploratory state
        if (harborMetric > ROUTING_TH.warningH || recapture > ROUTING_TH.warningR) {
          newState = 'WARNING';
        } else {
          newState = 'PLAY';
        }
        break;

      case 'WARNING':
        if (harborMetric > ROUTING_TH.bufferH || persistence > ROUTING_TH.bufferP) {
          newState = 'BUFFER';
        } else if (harborMetric < ROUTING_TH.warningH - ROUTING_HYSTERESIS && triggeredTripwires === 0) {
          newState = 'PLAY';
        } else {
          newState = 'WARNING';
        }
        break;

      case 'BUFFER':
        if (harborMetric > ROUTING_TH.harborH &&
            persistence > ROUTING_TH.strongP &&
            recapture > ROUTING_TH.warningR) {
          newState = 'HARBOR';
        } else if (harborMetric < ROUTING_TH.bufferH - ROUTING_HYSTERESIS) {
          newState = 'WARNING';
        } else {
          newState = 'BUFFER';
        }
        break;

      case 'HARBOR':
        if (harborMetric < ROUTING_TH.harborH - ROUTING_HYSTERESIS ||
            persistence < ROUTING_TH.bufferP) {
          newState = 'BUFFER';
        } else {
          newState = 'HARBOR';
        }
        break;

      default:
        newState = 'PLAY';
    }
  }

  // V2: Cross-check with EO routing if available
  if (eoRouteState && eoRouteState !== newState.toLowerCase()) {
    // EO and computed states differ - use geometric (EO) as tiebreaker for advancement
    const stateOrder = { play: 0, warning: 1, buffer: 2, harbor: 3 };
    const eoOrder = stateOrder[eoRouteState] || 0;
    const computedOrder = stateOrder[newState.toLowerCase()] || 0;

    // Allow EO to pull state forward but not backward
    if (eoOrder > computedOrder) {
      newState = eoRouteState.toUpperCase();
    }
  }

  // Anti-recapture gate
  const finalCount = narrowingStages
    ? narrowingStages[narrowingStages.length - 1].element_count
    : 0;
  const initialCount = narrowingStages ? narrowingStages[0].element_count : 0;

  if (finalCount < initialCount) {
    const narrowingRecord = {
      timestamp: Date.now(),
      initialCount,
      finalCount,
      scope_reduction: (initialCount - finalCount) / Math.max(1, initialCount),
      antiRecaptureMetric: antiRecapture
    };

    const lastRecord = antiRecaptureLog.length > 0
      ? antiRecaptureLog[antiRecaptureLog.length - 1]
      : null;

    if (lastRecord && finalCount > lastRecord.finalCount && antiRecapture > ROUTING_TH.antiR) {
      narrowingRecord.recapture_blocked = true;
      narrowingRecord.clamped_to = lastRecord.finalCount;
    }

    antiRecaptureLog.push(narrowingRecord);
  }

  const routingResult = {
    state: newState,
    strategy: ROUTING_STATES[newState]?.strategy || ROUTING_STATES.PLAY.strategy,
    harborMetric,
    persistence,
    recapture,
    antiRecapture,
    previousState: previousStateName,
    transitioned: newState !== previousStateName,
    triggeredTripwires,
    thresholds: ROUTING_TH,
    eoRouteState: eoRouteState || null,
    harborEligible: eoRouting?.harborEligible || (harborMetric > ROUTING_TH.harborH && persistence > ROUTING_TH.strongP)
  };

  signalBus.setRegister('L7.routing_state', routingResult);
  signalBus.setRegister('L7.anti_recapture_log', antiRecaptureLog);

  signalBus.emit('layer.L7.complete', routingResult);
}

module.exports = { process };
