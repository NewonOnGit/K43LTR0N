/**
 * generation/closure-checker.js
 *
 * V2 NEW: Extension/Closure/Uniqueness Tracker
 *
 * Tracks closure state across the pipeline:
 *   - extAdmitted: At least one claim element survived to final stage
 *   - closureFailure: Claims exist but set is algebraically inconsistent
 *   - uniqueClosure: Claim set is either empty (vacuous) or consistent
 *
 * Buildspec §2.4
 *
 * @module generation/closure-checker
 */

'use strict';

const { ROUTING_TH } = require('../shared/constants');

/**
 * @typedef {Object} ClosureState
 * @property {boolean} extAdmitted - At least one claim element survived
 * @property {boolean} closureFailure - Claims exist but set is inconsistent
 * @property {boolean} uniqueClosure - Claim set is consistent or empty
 * @property {number} k4Deficit - K4 algebraic closure deficit
 * @property {number} sigmaR - Signal rupture composite
 * @property {string} recommendation - Recommended action
 */

/**
 * Check closure state from pipeline outputs.
 *
 * @param {Object} signalBus - The signal bus with registers
 * @returns {ClosureState}
 */
function checkClosure(signalBus) {
  // Get relevant registers
  const narrowingStages = signalBus.getRegister('L3.narrowing_stages');
  const registered = signalBus.getRegister('eo.registered') || 0;
  const k4Deficit = signalBus.getRegister('stance.k4Deficit') || 0;
  const sigmaR = signalBus.getRegister('eo.sigmaR') || 0;
  const eoClosureState = signalBus.getRegister('eo.closureState');

  // If EO closure state is available, use it
  if (eoClosureState) {
    return {
      ...eoClosureState,
      k4Deficit,
      sigmaR,
      recommendation: getRecommendation(eoClosureState)
    };
  }

  // Otherwise compute from pipeline outputs
  const finalStage = narrowingStages?.[narrowingStages.length - 1];
  const finalClaimCount = finalStage?.element_count || 0;

  // Extension admitted: at least one claim survived
  const extAdmitted = finalClaimCount > 0 || registered > 0.02;

  // Closure failure: claims exist but set is algebraically inconsistent
  const closureFailure = registered > 0.02 &&
                         (k4Deficit > 0.8 || sigmaR >= ROUTING_TH.sigmaA);

  // Unique closure: either empty or consistent
  const uniqueClosure = !(extAdmitted && closureFailure);

  const state = {
    extAdmitted,
    closureFailure,
    uniqueClosure,
    k4Deficit,
    sigmaR,
    finalClaimCount,
    registeredFraction: registered
  };

  state.recommendation = getRecommendation(state);

  return state;
}

/**
 * Get recommendation based on closure state.
 *
 * @param {ClosureState} state
 * @returns {string}
 */
function getRecommendation(state) {
  if (!state.extAdmitted) {
    return 'No claims survived. Consider broadening the seed element or adjusting the projection.';
  }

  if (state.closureFailure) {
    if (state.k4Deficit > 0.8) {
      return `High K4 deficit (${state.k4Deficit.toFixed(3)}). Claim set has algebraic inconsistency. Consider narrowing claim scope or removing conflicting claims.`;
    }
    if (state.sigmaR >= ROUTING_TH.sigmaA) {
      return `High signal rupture (${state.sigmaR.toFixed(3)}). Multiple tripwires triggered. Review field signature channels for weak areas.`;
    }
    return 'Closure failure detected. Review claim dependencies and reduce scope conflicts.';
  }

  if (state.uniqueClosure) {
    return 'Claim set is algebraically consistent. Proceed to filing.';
  }

  return 'Closure state indeterminate. Manual review recommended.';
}

/**
 * Validate closure state meets filing requirements.
 *
 * @param {ClosureState} state
 * @returns {{ pass: boolean, failures: string[] }}
 */
function validateClosure(state) {
  const failures = [];

  if (!state.extAdmitted) {
    failures.push('No claims admitted - cannot proceed to filing');
  }

  if (state.closureFailure) {
    failures.push(`Closure failure: k4_deficit=${state.k4Deficit?.toFixed(3)}, sigmaR=${state.sigmaR?.toFixed(3)}`);
  }

  if (!state.uniqueClosure) {
    failures.push('Claim set is not uniquely closed - algebraic inconsistency detected');
  }

  return {
    pass: failures.length === 0,
    failures
  };
}

/**
 * Compute closure state directly from geometric quantities.
 * Use this when SignalBus is not available.
 *
 * @param {Object} params
 * @param {number} params.registered - Registered fraction
 * @param {number} params.k4Deficit - K4 closure deficit
 * @param {number} params.sigmaR - Signal rupture composite
 * @param {number} params.finalClaimCount - Number of final claims
 * @returns {ClosureState}
 */
function computeClosureState({ registered, k4Deficit, sigmaR, finalClaimCount }) {
  const extAdmitted = finalClaimCount > 0 || registered > 0.02;

  const closureFailure = registered > 0.02 &&
                         (k4Deficit > 0.8 || sigmaR >= ROUTING_TH.sigmaA);

  const uniqueClosure = !(extAdmitted && closureFailure);

  const state = {
    extAdmitted,
    closureFailure,
    uniqueClosure,
    k4Deficit,
    sigmaR,
    finalClaimCount,
    registeredFraction: registered
  };

  state.recommendation = getRecommendation(state);

  return state;
}

/**
 * Track closure state history for prosecution tracking.
 */
class ClosureHistory {
  constructor() {
    this.history = [];
  }

  /**
   * Record a closure state snapshot.
   * @param {ClosureState} state
   * @param {string} context - What triggered this snapshot
   */
  record(state, context = 'manual') {
    this.history.push({
      timestamp: Date.now(),
      context,
      state: { ...state }
    });
  }

  /**
   * Get the most recent closure state.
   * @returns {ClosureState|null}
   */
  latest() {
    if (this.history.length === 0) return null;
    return this.history[this.history.length - 1].state;
  }

  /**
   * Check if closure state has improved.
   * @returns {boolean}
   */
  hasImproved() {
    if (this.history.length < 2) return false;
    const prev = this.history[this.history.length - 2].state;
    const curr = this.history[this.history.length - 1].state;

    // Improvement = moved from failure to success
    if (prev.closureFailure && !curr.closureFailure) return true;
    if (!prev.extAdmitted && curr.extAdmitted) return true;

    return false;
  }

  /**
   * Export history for persistence.
   * @returns {Object[]}
   */
  export() {
    return [...this.history];
  }

  /**
   * Import history.
   * @param {Object[]} data
   */
  import(data) {
    this.history = data.map(h => ({ ...h }));
  }
}

module.exports = {
  checkClosure,
  validateClosure,
  computeClosureState,
  getRecommendation,
  ClosureHistory
};
