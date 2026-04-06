/**
 * layers/L2-admissibility.js
 * 
 * L2: Patentability Classification
 * 
 * Five-condition admissibility gate mapping to patentability criteria:
 *   Aperture → Novelty (§102)
 *   Phase    → Non-obviousness (§103)
 *   Policy   → Subject-matter eligibility (§101)
 *   Capacity → Enablement (§112a)
 *   Naming   → Written description (§112a)
 * 
 * Three Θ profiles: Θ_open (broad), Θ_standard (balanced), Θ_restricted (narrow)
 * 
 * Reads: L1.*, prism_object
 * Writes: L2.admissibility_results, L2.theta_profile
 * Emits: layer.L2.complete
 * 
 * @module layers/L2-admissibility
 */

'use strict';

const { ADMISSIBILITY_CONDITIONS, TAU, Z_C } = require('../shared/constants');

/**
 * Θ profile thresholds: how aggressively each condition filters.
 * Lower threshold = more claims pass = broader scope.
 */
const THETA_PROFILES = {
  open:       { aperture: 0.3, phase: 0.3, policy: 0.2, capacity: 0.3, naming: 0.2 },
  standard:   { aperture: 0.5, phase: 0.5, policy: 0.4, capacity: 0.5, naming: 0.4 },
  restricted: { aperture: 0.7, phase: 0.7, policy: 0.6, capacity: 0.7, naming: 0.6 }
};

/**
 * Evaluate a single admissibility condition for a claim.
 * @param {string} condition - Condition key from ADMISSIBILITY_CONDITIONS
 * @param {Object} claim - Propagated claim from L1
 * @param {Object} prism - Prism Object
 * @param {Object} thresholds - Active Θ profile thresholds
 * @returns {{ pass: boolean, confidence: number, reason: string }}
 */
function evaluateCondition(condition, claim, prism, thresholds) {
  switch (condition) {
    case 'APERTURE': {
      // Novelty §102: does this claim survive prior art?
      const confidence = claim.noveltyScore;
      return {
        pass: confidence >= thresholds.aperture,
        confidence,
        reason: confidence < thresholds.aperture
          ? `Novelty score ${confidence.toFixed(3)} below threshold ${thresholds.aperture}`
          : 'Claim survives novelty analysis'
      };
    }

    case 'PHASE': {
      // Non-obviousness §103: is this an obvious combination?
      // Higher phase accumulation (more reflections) suggests more interaction with prior art
      const maxPhase = Math.PI * 2;
      const normalized = 1 - Math.min(1, Math.abs(claim.phase) / maxPhase);
      return {
        pass: normalized >= thresholds.phase,
        confidence: normalized,
        reason: normalized < thresholds.phase
          ? `Obviousness score ${normalized.toFixed(3)} below threshold`
          : 'Claim survives obviousness analysis'
      };
    }

    case 'POLICY': {
      // Eligibility §101: is this an abstract idea or natural phenomenon?
      // Score based on whether the claim describes a concrete implementation
      const text = claim.text.toLowerCase();
      const concreteIndicators = ['method', 'system', 'apparatus', 'device', 'process',
        'circuit', 'module', 'signal', 'data', 'processor', 'memory', 'interface'];
      const abstractIndicators = ['idea', 'concept', 'principle', 'theory', 'abstract',
        'mathematical', 'mental', 'natural'];

      const concreteScore = concreteIndicators.filter(w => text.includes(w)).length;
      const abstractScore = abstractIndicators.filter(w => text.includes(w)).length;
      const confidence = Math.min(1, (concreteScore + 1) / (concreteScore + abstractScore + 2));

      return {
        pass: confidence >= thresholds.policy,
        confidence,
        reason: confidence < thresholds.policy
          ? 'Claim may describe an abstract idea or natural phenomenon'
          : 'Claim describes patentable subject matter'
      };
    }

    case 'CAPACITY': {
      // Enablement §112a: does the specification enable the full claimed scope?
      // Proxy: do we have sufficient supporting artifacts?
      const artifacts = prism.artifacts || [];
      const projElements = prism.projection ? prism.projection.elements.length : 0;
      const confidence = Math.min(1, (artifacts.length + projElements) / 5 * TAU + TAU);

      return {
        pass: confidence >= thresholds.capacity,
        confidence,
        reason: confidence < thresholds.capacity
          ? 'Insufficient specification support for claimed scope'
          : 'Specification adequately enables the claimed scope'
      };
    }

    case 'NAMING': {
      // Written description §112a: are terms unambiguous and consistently defined?
      // Proxy: claim text length and specificity
      const wordCount = claim.text.split(/\s+/).length;
      const confidence = Math.min(1, wordCount / 20 * TAU + TAU * 0.5);

      return {
        pass: confidence >= thresholds.naming,
        confidence,
        reason: confidence < thresholds.naming
          ? 'Claim terms may be ambiguous or insufficiently defined'
          : 'Claim terms are adequately described'
      };
    }

    default:
      return { pass: false, confidence: 0, reason: `Unknown condition: ${condition}` };
  }
}

/**
 * @param {import('../shared/signal-bus').SignalBus} signalBus
 */
function process(signalBus) {
  const propagatedClaims = signalBus.getRegister('L1.propagated_claims');
  const prism = signalBus.getRegister('prism_object');

  if (!propagatedClaims || !prism) {
    signalBus.emit('layer.L2.error', { message: 'Missing L1 outputs or prism_object' });
    return;
  }

  // Default to standard profile; can be overridden via parameter adjustments
  const profileName = signalBus.hasRegister('L2.theta_override')
    ? signalBus.getRegister('L2.theta_override')
    : 'standard';
  const thresholds = THETA_PROFILES[profileName] || THETA_PROFILES.standard;

  const results = [];
  const conditionKeys = Object.keys(ADMISSIBILITY_CONDITIONS);

  for (const claim of propagatedClaims) {
    const claimResult = {
      claimIndex: claim.index,
      claimText: claim.text,
      conditions: {},
      allPass: true
    };

    for (const condKey of conditionKeys) {
      const evaluation = evaluateCondition(condKey, claim, prism, thresholds);
      claimResult.conditions[condKey] = evaluation;
      if (!evaluation.pass) {
        claimResult.allPass = false;
      }
    }

    results.push(claimResult);
  }

  // Check for blanket failure (all claims fail on a single condition)
  const blanketFailures = [];
  for (const condKey of conditionKeys) {
    const allFail = results.length > 0 && results.every(r => !r.conditions[condKey].pass);
    if (allFail) {
      blanketFailures.push(condKey);
    }
  }

  signalBus.setRegister('L2.admissibility_results', results);
  signalBus.setRegister('L2.theta_profile', profileName);
  signalBus.setRegister('L2.blanket_failures', blanketFailures);

  // If blanket failure detected, emit feedback trigger
  if (blanketFailures.length > 0) {
    signalBus.emit('feedback.b_to_a', {
      failure_layer: 'L2',
      failure_mode: `blanket_${blanketFailures[0].toLowerCase()}`,
      details: { blanketFailures, results }
    });
  }

  signalBus.emit('layer.L2.complete', {
    claimCount: results.length,
    passCount: results.filter(r => r.allPass).length,
    blanketFailures,
    profile: profileName
  });
}

module.exports = { process, THETA_PROFILES };
