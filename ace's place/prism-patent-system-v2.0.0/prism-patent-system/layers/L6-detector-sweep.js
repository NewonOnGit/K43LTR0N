/**
 * layers/L6-detector-sweep.js
 *
 * L6: Jurisdictional Regime Detection
 *
 * V2 REWRITE: Theta x Naming crossbar with DET_MODS scaling.
 *
 * Reads: L5.*, L4.*, eo.detectorSweep, eo.z
 * Writes: L6.regime_matrix, L6.cross_regime_confidence
 * Emits: layer.L6.complete
 *
 * @module layers/L6-detector-sweep
 */

'use strict';

const { PATENT_OFFICES, CLAIM_TYPES, TAU, Z_C, DET_MODS, THETA, NAMING } = require('../shared/constants');

/**
 * V2: Jurisdiction modifiers now scale with DET_MODS
 */
const JURISDICTION_MODIFIERS = {
  USPTO: {
    method: { novelty: 1.0, eligibility: 0.85, description: 1.0 },
    system: { novelty: 1.0, eligibility: 0.95, description: 1.0 },
    apparatus: { novelty: 1.0, eligibility: 0.98, description: 1.0 }
  },
  EPO: {
    method: { novelty: 0.95, eligibility: 0.90, description: 1.05 },
    system: { novelty: 0.95, eligibility: 0.95, description: 1.05 },
    apparatus: { novelty: 0.95, eligibility: 1.0, description: 1.05 }
  },
  WIPO_PCT: {
    method: { novelty: 0.98, eligibility: 0.92, description: 1.0 },
    system: { novelty: 0.98, eligibility: 0.95, description: 1.0 },
    apparatus: { novelty: 0.98, eligibility: 0.98, description: 1.0 }
  }
};

/**
 * @param {import('../shared/signal-bus').SignalBus} signalBus
 */
function process(signalBus) {
  const integrityScore = signalBus.getRegister('L5.integrity_score');
  const fieldSignature = signalBus.getRegister('L4.field_signature');
  const tripwireStates = signalBus.getRegister('L5.tripwire_states');
  const stages = signalBus.getRegister('L3.narrowing_stages');

  // V2: Read EO detector sweep
  const eoDetectorSweep = signalBus.getRegister('eo.detectorSweep');
  const z = signalBus.getRegister('eo.z') || 0.5;

  if (integrityScore === undefined || !fieldSignature) {
    signalBus.emit('layer.L6.error', { message: 'Missing L5/L4 outputs' });
    return;
  }

  const finalClaims = stages ? stages[stages.length - 1].element_count : 0;

  // V2: Build 3x3 regime matrix with Theta x Naming crossbar
  const regimeMatrix = {};
  let totalConfidence = 0;
  let cellCount = 0;

  // Get active theta and naming profiles
  const thetaProfile = signalBus.getRegister('L2.theta_override') || 'standard';
  const namingProfile = signalBus.getRegister('L6.naming_override') || 'safe';

  const thetaMod = DET_MODS.theta[thetaProfile === 'open' ? 'open' : thetaProfile === 'restricted' ? 'res' : 'std'];
  const nameMod = DET_MODS.name[namingProfile === 'canonical' ? 'canon' : namingProfile === 'inventive' ? 'inv' : 'safe'];

  for (const office of PATENT_OFFICES) {
    regimeMatrix[office] = {};
    const officeMods = JURISDICTION_MODIFIERS[office];

    for (const claimType of CLAIM_TYPES) {
      const mods = officeMods[claimType];

      // Base confidence from integrity score
      let confidence = integrityScore;

      // Apply jurisdiction modifiers
      confidence *= mods.novelty;
      confidence *= mods.eligibility;
      confidence *= mods.description;

      // V2: Apply DET_MODS
      confidence *= thetaMod;
      confidence *= nameMod;

      // V2: Factor in z-coordinate (proximity to novelty threshold)
      confidence *= (0.7 + z * 0.3);

      // Penalize for triggered tripwires
      if (tripwireStates) {
        const triggered = Object.values(tripwireStates).filter(t => t.triggered).length;
        confidence *= Math.pow(TAU, triggered);
      }

      // Penalize if no claims survived
      if (finalClaims === 0) {
        confidence *= 0.1;
      }

      confidence = Math.min(1, Math.max(0, confidence));

      // V2: Check EO detector sweep for this theta/naming combo
      const eoConfidence = eoDetectorSweep?.[thetaProfile === 'open' ? 'open' : thetaProfile === 'restricted' ? 'res' : 'std']
        ?.[namingProfile === 'canonical' ? 'canon' : namingProfile === 'inventive' ? 'inv' : 'safe'];

      if (eoConfidence !== undefined) {
        confidence = confidence * 0.6 + eoConfidence * 0.4;
      }

      regimeMatrix[office][claimType] = {
        confidence,
        viable: confidence >= Z_C * TAU,
        risks: [],
        detMods: { theta: thetaMod, naming: nameMod }
      };

      // Identify jurisdiction-specific risks
      if (office === 'USPTO' && fieldSignature.sigma > 0.5) {
        regimeMatrix[office][claimType].risks.push('section_101_eligibility_concern');
      }
      if (office === 'EPO' && claimType === 'method' && fieldSignature.sigma > 0.3) {
        regimeMatrix[office][claimType].risks.push('epo_technical_effect_requirement');
      }
      if (fieldSignature.delta_obs < TAU * 0.5) {
        regimeMatrix[office][claimType].risks.push('prior_art_coverage_concern');
      }
      if (z < Z_C) {
        regimeMatrix[office][claimType].risks.push('below_novelty_threshold');
      }

      totalConfidence += confidence;
      cellCount++;
    }
  }

  const crossRegimeConfidence = cellCount > 0 ? totalConfidence / cellCount : 0;

  signalBus.setRegister('L6.regime_matrix', regimeMatrix);
  signalBus.setRegister('L6.cross_regime_confidence', crossRegimeConfidence);
  signalBus.setRegister('L6.active_profiles', { theta: thetaProfile, naming: namingProfile });

  signalBus.emit('layer.L6.complete', {
    crossRegimeConfidence,
    regimeMatrix,
    z,
    profiles: { theta: thetaProfile, naming: namingProfile }
  });
}

module.exports = { process, JURISDICTION_MODIFIERS };
