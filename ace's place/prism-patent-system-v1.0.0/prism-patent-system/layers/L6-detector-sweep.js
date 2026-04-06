/**
 * layers/L6-detector-sweep.js
 * 
 * L6: Jurisdictional Regime Detection
 * 
 * 3×3 crossbar: 3 patent offices (USPTO, EPO, WIPO/PCT) × 3 claim types (method, system, apparatus).
 * Computes cross-regime confidence for each of 9 cells.
 * 
 * Reads: L5.*, L4.*, L3.*, prism_object
 * Writes: L6.regime_matrix, L6.cross_regime_confidence
 * Emits: layer.L6.complete
 * 
 * @module layers/L6-detector-sweep
 */

'use strict';

const { PATENT_OFFICES, CLAIM_TYPES, TAU, Z_C } = require('../shared/constants');

/**
 * Jurisdiction-specific adjustments to patentability assessment.
 * These modifiers adjust the base confidence per patent office.
 */
const JURISDICTION_MODIFIERS = {
  USPTO: {
    method: { novelty: 1.0, eligibility: 0.85, description: 1.0 },    // §101 Alice/Mayo
    system: { novelty: 1.0, eligibility: 0.95, description: 1.0 },
    apparatus: { novelty: 1.0, eligibility: 0.98, description: 1.0 }
  },
  EPO: {
    method: { novelty: 0.95, eligibility: 0.90, description: 1.05 },   // Stricter on software methods
    system: { novelty: 0.95, eligibility: 0.95, description: 1.05 },
    apparatus: { novelty: 0.95, eligibility: 1.0, description: 1.05 }
  },
  WIPO_PCT: {
    method: { novelty: 0.98, eligibility: 0.92, description: 1.0 },    // ISA variability
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

  if (integrityScore === undefined || !fieldSignature) {
    signalBus.emit('layer.L6.error', { message: 'Missing L5/L4 outputs' });
    return;
  }

  const finalClaims = stages ? stages[stages.length - 1].element_count : 0;

  // Build 3×3 regime matrix
  const regimeMatrix = {};
  let totalConfidence = 0;
  let cellCount = 0;

  for (const office of PATENT_OFFICES) {
    regimeMatrix[office] = {};
    const officeMods = JURISDICTION_MODIFIERS[office];

    for (const claimType of CLAIM_TYPES) {
      const mods = officeMods[claimType];

      // Base confidence from integrity score
      let confidence = integrityScore;

      // Apply jurisdiction-specific modifiers
      confidence *= mods.novelty;
      confidence *= mods.eligibility;
      confidence *= mods.description;

      // Penalize for triggered tripwires
      if (tripwireStates) {
        const triggered = Object.values(tripwireStates).filter(t => t.triggered).length;
        confidence *= Math.pow(TAU, triggered);
      }

      // Penalize if no claims survived narrowing
      if (finalClaims === 0) {
        confidence *= 0.1;
      }

      confidence = Math.min(1, Math.max(0, confidence));

      regimeMatrix[office][claimType] = {
        confidence,
        viable: confidence >= Z_C * TAU,  // viability threshold
        risks: []
      };

      // Identify jurisdiction-specific risks
      if (office === 'USPTO' && fieldSignature.sigma > 0.5) {
        regimeMatrix[office][claimType].risks.push('§101 eligibility concern');
      }
      if (office === 'EPO' && claimType === 'method' && fieldSignature.sigma > 0.3) {
        regimeMatrix[office][claimType].risks.push('EPO technical effect requirement');
      }
      if (fieldSignature.delta_obs < TAU * 0.5) {
        regimeMatrix[office][claimType].risks.push('Prior art coverage concern');
      }

      totalConfidence += confidence;
      cellCount++;
    }
  }

  const crossRegimeConfidence = cellCount > 0 ? totalConfidence / cellCount : 0;

  signalBus.setRegister('L6.regime_matrix', regimeMatrix);
  signalBus.setRegister('L6.cross_regime_confidence', crossRegimeConfidence);

  signalBus.emit('layer.L6.complete', {
    crossRegimeConfidence,
    regimeMatrix
  });
}

module.exports = { process, JURISDICTION_MODIFIERS };
