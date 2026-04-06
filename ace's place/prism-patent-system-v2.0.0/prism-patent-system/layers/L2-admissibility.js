/**
 * layers/L2-admissibility.js
 *
 * L2: Patentability Classification
 *
 * V2 REWRITE: Uses R/L/S/A decomposition from eo.* registers.
 * Theta profiles modulate geometric thresholds.
 *
 * Reads: L1.*, eo.*, prism_object
 * Writes: L2.admissibility_results, L2.theta_profile, L2.rlsa_decomposition
 * Emits: layer.L2.complete
 *
 * @module layers/L2-admissibility
 */

'use strict';

const { ADMISSIBILITY_CONDITIONS, TAU, Z_C, THETA } = require('../shared/constants');

/**
 * V2: Theta profile thresholds now derived from THETA constants.
 * These modulate the geometric admissibility thresholds.
 */
const THETA_PROFILES = {
  open: {
    modifier: THETA.OPEN.modifier,
    aperture: 0.3 * THETA.OPEN.modifier,
    phase: 0.3 * THETA.OPEN.modifier,
    policy: 0.2 * THETA.OPEN.modifier,
    capacity: 0.3 * THETA.OPEN.modifier,
    naming: 0.2 * THETA.OPEN.modifier
  },
  standard: {
    modifier: THETA.STANDARD.modifier,
    aperture: 0.5,
    phase: 0.5,
    policy: 0.4,
    capacity: 0.5,
    naming: 0.4
  },
  restricted: {
    modifier: THETA.RESTRICTED.modifier,
    aperture: 0.7 * THETA.RESTRICTED.modifier,
    phase: 0.7 * THETA.RESTRICTED.modifier,
    policy: 0.6 * THETA.RESTRICTED.modifier,
    capacity: 0.7 * THETA.RESTRICTED.modifier,
    naming: 0.6 * THETA.RESTRICTED.modifier
  }
};

/**
 * V2: Evaluate condition using geometric admissibility fractions.
 */
function evaluateCondition(condition, claim, prism, thresholds, eoMetrics) {
  const { registered, latent, suppressed, aliased } = eoMetrics.admissibility || {};

  switch (condition) {
    case 'APERTURE': {
      // Novelty: based on registered fraction and novelty score
      const geoConfidence = registered || 0;
      const textConfidence = claim.noveltyScore || 0;
      const confidence = geoConfidence * 0.6 + textConfidence * 0.4;
      return {
        pass: confidence >= thresholds.aperture,
        confidence,
        reason: confidence < thresholds.aperture
          ? `Novelty score ${confidence.toFixed(3)} below threshold ${thresholds.aperture.toFixed(3)}`
          : 'Claim survives novelty analysis',
        geometric: { registered, contribution: 0.6 }
      };
    }

    case 'PHASE': {
      // Non-obviousness: based on latent fraction (unexpressed potential)
      const geoConfidence = 1 - (suppressed || 0);
      const maxPhase = Math.PI * 2;
      const textConfidence = 1 - Math.min(1, Math.abs(claim.phase || 0) / maxPhase);
      const confidence = geoConfidence * 0.5 + textConfidence * 0.5;
      return {
        pass: confidence >= thresholds.phase,
        confidence,
        reason: confidence < thresholds.phase
          ? `Obviousness score ${confidence.toFixed(3)} below threshold`
          : 'Claim survives obviousness analysis',
        geometric: { suppressed, contribution: 0.5 }
      };
    }

    case 'POLICY': {
      // Eligibility: based on aliased fraction (ambiguity)
      const geoConfidence = 1 - (aliased || 0);
      const text = claim.text.toLowerCase();
      const concreteIndicators = ['method', 'system', 'apparatus', 'device', 'process',
        'circuit', 'module', 'signal', 'data', 'processor', 'memory', 'interface'];
      const abstractIndicators = ['idea', 'concept', 'principle', 'theory', 'abstract',
        'mathematical', 'mental', 'natural'];

      const concreteScore = concreteIndicators.filter(w => text.includes(w)).length;
      const abstractScore = abstractIndicators.filter(w => text.includes(w)).length;
      const textConfidence = Math.min(1, (concreteScore + 1) / (concreteScore + abstractScore + 2));

      const confidence = geoConfidence * 0.4 + textConfidence * 0.6;
      return {
        pass: confidence >= thresholds.policy,
        confidence,
        reason: confidence < thresholds.policy
          ? 'Claim may describe an abstract idea or natural phenomenon'
          : 'Claim describes patentable subject matter',
        geometric: { aliased, contribution: 0.4 }
      };
    }

    case 'CAPACITY': {
      // Enablement: based on latent fraction (articulation potential)
      const geoConfidence = 1 - (latent || 0) * 0.5;
      const artifacts = prism.artifacts || [];
      const projElements = prism.projection ? prism.projection.elements.length : 0;
      const textConfidence = Math.min(1, (artifacts.length + projElements) / 5 * TAU + TAU);

      const confidence = geoConfidence * 0.5 + textConfidence * 0.5;
      return {
        pass: confidence >= thresholds.capacity,
        confidence,
        reason: confidence < thresholds.capacity
          ? 'Insufficient specification support for claimed scope'
          : 'Specification adequately enables the claimed scope',
        geometric: { latent, contribution: 0.5 }
      };
    }

    case 'NAMING': {
      // Written description: based on aliased fraction (terminology clarity)
      const geoConfidence = 1 - (aliased || 0) * 0.8;
      const wordCount = claim.text.split(/\s+/).length;
      const textConfidence = Math.min(1, wordCount / 20 * TAU + TAU * 0.5);

      const confidence = geoConfidence * 0.5 + textConfidence * 0.5;
      return {
        pass: confidence >= thresholds.naming,
        confidence,
        reason: confidence < thresholds.naming
          ? 'Claim terms may be ambiguous or insufficiently defined'
          : 'Claim terms are adequately described',
        geometric: { aliased, contribution: 0.5 }
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

  // V2: Read EO metrics
  const registered = signalBus.getRegister('eo.registered');
  const latent = signalBus.getRegister('eo.latent');
  const suppressed = signalBus.getRegister('eo.suppressed');
  const aliased = signalBus.getRegister('eo.aliased');
  const z = signalBus.getRegister('eo.z');

  const eoMetrics = {
    admissibility: { registered, latent, suppressed, aliased },
    z
  };

  if (!propagatedClaims || !prism) {
    signalBus.emit('layer.L2.error', { message: 'Missing L1 outputs or prism_object' });
    return;
  }

  // Select theta profile
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
      const evaluation = evaluateCondition(condKey, claim, prism, thresholds, eoMetrics);
      claimResult.conditions[condKey] = evaluation;
      if (!evaluation.pass) {
        claimResult.allPass = false;
      }
    }

    results.push(claimResult);
  }

  // Check for blanket failure
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

  // V2: Store R/L/S/A decomposition for downstream layers
  signalBus.setRegister('L2.rlsa_decomposition', {
    registered,
    latent,
    suppressed,
    aliased,
    z
  });

  // Feedback trigger on blanket failure
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
    profile: profileName,
    rlsa: { registered, latent, suppressed, aliased }
  });
}

module.exports = { process, THETA_PROFILES };
