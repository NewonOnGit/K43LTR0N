/**
 * layers/L9-metacybernetic.js
 *
 * L9: Portfolio Oversight
 *
 * V2 UPDATE: Adds Bekenstein/Landauer information bounds monitoring.
 *
 * Reads: L0.*-L8.*, stance.bekensteinBound, stance.landauerCost, eo.eta
 * Writes: L9.portfolio_health, L9.coverage_gaps, L9.information_bounds
 * Emits: layer.L9.complete
 *
 * @module layers/L9-metacybernetic
 */

'use strict';

const { TAU, Z_C, ROUTING_TH } = require('../shared/constants');

const CSD_THRESHOLDS = {
  NOMINAL_MIN: Z_C * TAU,
  DEGRADED_MIN: TAU * TAU
};

/**
 * @param {import('../shared/signal-bus').SignalBus} signalBus
 */
function process(signalBus) {
  const documentSchema = signalBus.getRegister('L8.document_schema');
  const validationResult = signalBus.getRegister('L8.validation_result');
  const integrityScore = signalBus.getRegister('L5.integrity_score');
  const tripwireStates = signalBus.getRegister('L5.tripwire_states');
  const routingState = signalBus.getRegister('L7.routing_state');
  const fieldSignature = signalBus.getRegister('L4.field_signature');
  const closureState = signalBus.getRegister('L8.closure_state');
  const prism = signalBus.getRegister('prism_object');

  // V2: Read information bounds from stance
  const bekensteinBound = signalBus.getRegister('stance.bekensteinBound') || 0;
  const landauerCost = signalBus.getRegister('stance.landauerCost') || 0;
  const eta = signalBus.getRegister('eo.eta') || 0;
  const z = signalBus.getRegister('eo.z') || 0;

  if (!documentSchema) {
    signalBus.emit('layer.L9.error', { message: 'Missing L8 document_schema' });
    return;
  }

  // Coverage Gap Analysis
  const coverageGaps = [];

  if (prism?.projection) {
    const claimedTexts = [
      ...documentSchema.independent_claims.map(c => c.text.toLowerCase()),
      ...documentSchema.dependent_claims.map(c => c.text.toLowerCase())
    ];

    for (const element of prism.projection.elements) {
      const covered = claimedTexts.some(ct =>
        ct.includes(element.toLowerCase().split(/\s+/).slice(0, 3).join(' '))
      );
      if (!covered) {
        coverageGaps.push({
          type: 'unclaimed_element',
          element,
          severity: 'moderate',
          recommendation: `Consider adding a dependent claim covering: ${element}`
        });
      }
    }
  }

  if (prism?.tension_points) {
    for (const tp of prism.tension_points) {
      if (tp.severity > 0.7) {
        coverageGaps.push({
          type: 'high_severity_tension',
          description: tp.description,
          severity: 'high',
          recommendation: 'High-severity divergence may need dedicated claim coverage'
        });
      }
    }
  }

  // Claim Dependency Risk Analysis
  const dependencyRisks = [];

  if (documentSchema.independent_claims.length === 1 &&
      documentSchema.dependent_claims.length > 3) {
    dependencyRisks.push({
      type: 'single_independent_dependency',
      risk: 'All dependent claims rely on a single independent claim',
      severity: 'high',
      recommendation: 'Consider broadening to multiple independent claims'
    });
  }

  // V2: Check closure state risks
  if (closureState?.closureFailure) {
    dependencyRisks.push({
      type: 'closure_failure',
      risk: 'Claim set has algebraic inconsistency (k4_deficit > 0.8 or sigma_R >= 0.74)',
      severity: 'critical',
      recommendation: 'Review claim dependencies and reduce scope conflicts'
    });
  }

  // Prosecution Status
  const triggeredCount = tripwireStates
    ? Object.values(tripwireStates).filter(t => t.triggered).length
    : 0;

  const prosecutionStatus = {
    routing: routingState?.strategy || 'unknown',
    state: routingState?.state || 'PLAY',
    integrityScore: integrityScore || 0,
    activeTrippires: triggeredCount,
    schemaValid: validationResult?.pass || false,
    claimCount: {
      independent: documentSchema.independent_claims.length,
      dependent: documentSchema.dependent_claims.length,
      total: documentSchema.independent_claims.length + documentSchema.dependent_claims.length
    },
    harborEligible: routingState?.harborEligible || false
  };

  // V2: Information Bounds Monitoring
  const informationBounds = {
    bekensteinBound,
    landauerCost,
    negentropy: eta,
    z,
    // Information efficiency: how much of the Bekenstein bound is utilized
    informationEfficiency: bekensteinBound > 0
      ? Math.min(1, (documentSchema.independent_claims.length + documentSchema.dependent_claims.length) / bekensteinBound)
      : 0,
    // Thermodynamic cost ratio: Landauer cost relative to claim value
    thermodynamicRatio: documentSchema.independent_claims.length > 0
      ? landauerCost / documentSchema.independent_claims.length
      : landauerCost
  };

  // Composite Portfolio Health (CSD)
  const healthSignals = [
    integrityScore || 0,
    validationResult?.pass ? 1 : 0,
    documentSchema.independent_claims.length > 0 ? 1 : 0,
    coverageGaps.length === 0 ? 1 : Math.max(0, 1 - coverageGaps.length * 0.2),
    dependencyRisks.length === 0 ? 1 : Math.max(0, 1 - dependencyRisks.length * 0.3),
    1 - triggeredCount * 0.25,
    // V2: Factor in closure state
    closureState?.uniqueClosure ? 1 : 0,
    // V2: Factor in negentropy (proximity to optimal novelty position)
    eta
  ];

  const compositeHealth = healthSignals.reduce((a, b) => a + b, 0) / healthSignals.length;

  let csdState;
  if (compositeHealth >= CSD_THRESHOLDS.NOMINAL_MIN) {
    csdState = 'nominal';
  } else if (compositeHealth >= CSD_THRESHOLDS.DEGRADED_MIN) {
    csdState = 'degraded';
  } else {
    csdState = 'critical';
  }

  const portfolioHealth = {
    csd_state: csdState,
    composite_score: compositeHealth,
    signals: {
      integrity: integrityScore || 0,
      schema_valid: validationResult?.pass || false,
      claims_present: documentSchema.independent_claims.length > 0,
      coverage_gap_count: coverageGaps.length,
      dependency_risk_count: dependencyRisks.length,
      tripwire_count: triggeredCount,
      unique_closure: closureState?.uniqueClosure || false,
      negentropy: eta
    },
    prosecution_status: prosecutionStatus,
    dependency_risks: dependencyRisks,
    information_bounds: informationBounds
  };

  signalBus.setRegister('L9.portfolio_health', portfolioHealth);
  signalBus.setRegister('L9.coverage_gaps', coverageGaps);
  signalBus.setRegister('L9.information_bounds', informationBounds);

  signalBus.emit('layer.L9.complete', {
    csd_state: csdState,
    composite_score: compositeHealth,
    coverage_gaps: coverageGaps.length,
    dependency_risks: dependencyRisks.length,
    bekensteinBound,
    negentropy: eta
  });
}

module.exports = { process, CSD_THRESHOLDS };
