/**
 * layers/L9-metacybernetic.js
 * 
 * L9: Portfolio Oversight
 * 
 * Monitors: coverage gaps, claim dependency risks, prosecution status,
 * composite portfolio health (CSD: nominal, degraded, critical).
 * 
 * Reads: L0.*–L8.*
 * Writes: L9.portfolio_health, L9.coverage_gaps
 * Emits: layer.L9.complete
 * 
 * @module layers/L9-metacybernetic
 */

'use strict';

const { TAU, Z_C } = require('../shared/constants');

/** CSD state thresholds */
const CSD_THRESHOLDS = {
  NOMINAL_MIN: Z_C * TAU,          // ≈ 0.535 — above this = nominal
  DEGRADED_MIN: TAU * TAU,         // ≈ 0.382 — above this = degraded
  // Below DEGRADED_MIN = critical
};

/**
 * @param {import('../shared/signal-bus').SignalBus} signalBus
 */
function process(signalBus) {
  const documentSchema = signalBus.getRegister('L8.document_schema');
  const validationResult = signalBus.getRegister('L8.validation_result');
  const integrityScore = signalBus.getRegister('L5.integrity_score');
  const tripwireStates = signalBus.getRegister('L5.tripwire_states');
  const regimeMatrix = signalBus.getRegister('L6.regime_matrix');
  const routingState = signalBus.getRegister('L7.routing_state');
  const fieldSignature = signalBus.getRegister('L4.field_signature');
  const narrowingStages = signalBus.getRegister('L3.narrowing_stages');

  if (!documentSchema) {
    signalBus.emit('layer.L9.error', { message: 'Missing L8 document_schema' });
    return;
  }

  // ─── Coverage Gap Analysis ────────────────────────────────────────────
  const coverageGaps = [];

  // Check: are there projection elements not covered by any claim?
  const prism = signalBus.getRegister('prism_object');
  if (prism && prism.projection) {
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

  // Check: tension points without corresponding claims
  if (prism && prism.tension_points) {
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

  // ─── Claim Dependency Risk Analysis ───────────────────────────────────
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

  // ─── Prosecution Status ───────────────────────────────────────────────
  const triggeredCount = tripwireStates
    ? Object.values(tripwireStates).filter(t => t.triggered).length
    : 0;

  const prosecutionStatus = {
    routing: routingState ? routingState.strategy : 'unknown',
    integrityScore: integrityScore || 0,
    activeTrippires: triggeredCount,
    schemaValid: validationResult ? validationResult.pass : false,
    claimCount: {
      independent: documentSchema.independent_claims.length,
      dependent: documentSchema.dependent_claims.length,
      total: documentSchema.independent_claims.length + documentSchema.dependent_claims.length
    }
  };

  // ─── Composite Portfolio Health (CSD) ─────────────────────────────────
  // Aggregate health from multiple signals
  const healthSignals = [
    integrityScore || 0,
    validationResult && validationResult.pass ? 1 : 0,
    documentSchema.independent_claims.length > 0 ? 1 : 0,
    coverageGaps.length === 0 ? 1 : Math.max(0, 1 - coverageGaps.length * 0.2),
    dependencyRisks.length === 0 ? 1 : Math.max(0, 1 - dependencyRisks.length * 0.3),
    1 - triggeredCount * 0.25
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
      schema_valid: validationResult ? validationResult.pass : false,
      claims_present: documentSchema.independent_claims.length > 0,
      coverage_gap_count: coverageGaps.length,
      dependency_risk_count: dependencyRisks.length,
      tripwire_count: triggeredCount
    },
    prosecution_status: prosecutionStatus,
    dependency_risks: dependencyRisks
  };

  signalBus.setRegister('L9.portfolio_health', portfolioHealth);
  signalBus.setRegister('L9.coverage_gaps', coverageGaps);

  signalBus.emit('layer.L9.complete', {
    csd_state: csdState,
    composite_score: compositeHealth,
    coverage_gaps: coverageGaps.length,
    dependency_risks: dependencyRisks.length
  });
}

module.exports = { process, CSD_THRESHOLDS };
