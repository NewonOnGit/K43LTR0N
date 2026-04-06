/**
 * layers/L8-packet.js
 *
 * L8: Patent Document Assembly
 *
 * V2 UPDATE: Adds closure state tracking (ext-admitted, closure-failure, unique-closure).
 *
 * Reads: L0.*-L7.*, eo.closureState, prism_object
 * Writes: L8.document_schema, L8.validation_result, L8.closure_state
 * Emits: layer.L8.complete
 *
 * @module layers/L8-packet
 */

'use strict';

const { GENERATION_STEPS } = require('../shared/constants');

const REQUIRED_SECTIONS = [
  'title', 'abstract', 'technical_field', 'background',
  'summary', 'detailed_description', 'independent_claims',
  'dependent_claims', 'drawings_descriptions', 'constants_equations'
];

/**
 * Validate the assembled document schema.
 */
function validateSchema(schema) {
  const failures = [];

  for (const section of REQUIRED_SECTIONS) {
    if (!schema[section]) {
      failures.push(`Missing required section: ${section}`);
    } else if (typeof schema[section] === 'string' && schema[section].trim().length === 0) {
      failures.push(`Empty section: ${section}`);
    }
  }

  if (schema.independent_claims && Array.isArray(schema.independent_claims)) {
    if (schema.independent_claims.length === 0) {
      failures.push('No independent claims present');
    }
  }

  if (schema.dependent_claims && Array.isArray(schema.dependent_claims)) {
    for (const dep of schema.dependent_claims) {
      if (!dep.depends_on) {
        failures.push(`Dependent claim missing depends_on reference: ${dep.text || dep.id}`);
      }
    }
  }

  return {
    pass: failures.length === 0,
    failures
  };
}

/**
 * @param {import('../shared/signal-bus').SignalBus} signalBus
 */
function process(signalBus) {
  const prism = signalBus.getRegister('prism_object');
  const substrate = signalBus.getRegister('L0.substrate');
  const narrowingStages = signalBus.getRegister('L3.narrowing_stages');
  const fieldSignature = signalBus.getRegister('L4.field_signature');
  const integrityScore = signalBus.getRegister('L5.integrity_score');
  const regimeMatrix = signalBus.getRegister('L6.regime_matrix');
  const routingState = signalBus.getRegister('L7.routing_state');

  // V2: Read closure state from EO bridge
  const eoClosureState = signalBus.getRegister('eo.closureState');
  const k4Deficit = signalBus.getRegister('stance.k4Deficit') || 0;
  const sigmaR = signalBus.getRegister('eo.sigmaR') || 0;

  if (!prism || !narrowingStages) {
    signalBus.emit('layer.L8.error', { message: 'Missing upstream outputs' });
    return;
  }

  const finalStage = narrowingStages[narrowingStages.length - 1];
  const finalClaims = finalStage ? finalStage.elements : [];
  const registered = signalBus.getRegister('eo.registered') || 0;

  // V2: Compute closure state
  const extAdmitted = eoClosureState?.extAdmitted !== undefined
    ? eoClosureState.extAdmitted
    : (finalClaims.length > 0 || registered > 0.02);

  const closureFailure = eoClosureState?.closureFailure !== undefined
    ? eoClosureState.closureFailure
    : (registered > 0.02 && (k4Deficit > 0.8 || sigmaR >= 0.74));

  const uniqueClosure = eoClosureState?.uniqueClosure !== undefined
    ? eoClosureState.uniqueClosure
    : !(extAdmitted && closureFailure);

  const closureState = {
    extAdmitted,
    closureFailure,
    uniqueClosure,
    k4Deficit,
    sigmaR
  };

  // Assemble document schema (same as V1 with V2 additions)
  const documentSchema = {
    title: `System and Method for ${prism.seed_element}`,
    abstract: prism.emergent_claims?.length > 0
      ? `A ${prism.seed_element} comprising ${prism.emergent_claims[0]}.`
      : `A system implementing ${prism.seed_element}.`,

    technical_field: substrate
      ? `The present invention relates to ${prism.seed_element}, operating within a domain of ${substrate.zoneCount} prior art categories and ${substrate.electrodeCount} specific references.`
      : `The present invention relates to ${prism.seed_element}.`,

    background: prism.reflection
      ? {
          summary: prism.reflection.summary,
          prior_art: prism.reflection.prior_art_refs,
          tension_points: prism.tension_points
        }
      : { summary: '', prior_art: [], tension_points: [] },

    summary: prism.projection
      ? {
          overview: prism.projection.summary,
          novel_elements: prism.projection.elements,
          emergent_claims: prism.emergent_claims
        }
      : { overview: '', novel_elements: [], emergent_claims: [] },

    detailed_description: {
      substrate,
      field_signature: fieldSignature,
      integrity_score: integrityScore,
      regime_analysis: regimeMatrix,
      routing_decision: routingState,
      narrowing_profile: narrowingStages.map(s => ({ id: s.id, count: s.element_count })),
      // V2 addition
      closure_state: closureState
    },

    independent_claims: finalClaims.map((el, i) => {
      let text = el.text;
      const lower = text.toLowerCase();
      if (!lower.startsWith('a ') && !lower.startsWith('an ')) {
        text = `A method comprising ${text}`;
      }
      if (!text.endsWith('.')) text += '.';
      text = text.charAt(0).toUpperCase() + text.slice(1);

      return {
        id: `ind_${i + 1}`,
        text,
        source: el.source,
        source_stage: 'A_n'
      };
    }),

    dependent_claims: (() => {
      const pStage = narrowingStages.find(s => s.id === 'P');
      const fStage = narrowingStages.find(s => s.id === 'F');
      const anIds = new Set(finalClaims.map(el => el.id));
      const deps = [];
      const seen = new Set();

      const intermediateElements = [
        ...((pStage?.elements || []).filter(el => !anIds.has(el.id))),
        ...((fStage?.elements || []).filter(el => !anIds.has(el.id)))
      ];

      for (const el of intermediateElements) {
        if (!seen.has(el.id)) {
          seen.add(el.id);
          deps.push({
            id: `dep_${deps.length + 1}`,
            text: el.text,
            depends_on: 'ind_1',
            additional_limitation: `further comprising the limitation of ${el.text}`
          });
        }
      }
      return deps;
    })(),

    drawings_descriptions: [
      { figure: 'FIG. 1', description: 'Containment domain geometry (Q) with observer path (L->E->R)' },
      { figure: 'FIG. 2', description: 'Ten-layer signal processing pipeline (L0-L9)' },
      { figure: 'FIG. 3', description: 'Filing strategy routing FSM (PLAY/WARNING/BUFFER/HARBOR)' },
      { figure: 'FIG. 4', description: 'Geometric stance visualization with im/ker decomposition' }
    ],

    constants_equations: fieldSignature
      ? Object.entries(fieldSignature).map(([key, value]) => ({
          symbol: key,
          value: typeof value === 'number' ? value.toFixed(4) : value,
          description: `Field signature channel: ${key}`
        }))
      : [],

    metadata: {
      filing_strategy: routingState?.strategy || 'provisional_filing',
      integrity_score: integrityScore,
      cross_regime_confidence: signalBus.getRegister('L6.cross_regime_confidence'),
      generation_steps: GENERATION_STEPS,
      // V2 additions
      closure_state: closureState,
      version: '2.0.0'
    }
  };

  // Validate schema
  const validationResult = validateSchema(documentSchema);

  // V2: Add closure state validation
  if (!uniqueClosure) {
    validationResult.failures.push('Closure failure: claim set is algebraically inconsistent');
    validationResult.pass = false;
  }

  signalBus.setRegister('L8.document_schema', documentSchema);
  signalBus.setRegister('L8.validation_result', validationResult);
  signalBus.setRegister('L8.closure_state', closureState);

  // Feedback on validation failure
  if (!validationResult.pass) {
    signalBus.emit('feedback.c_to_b', {
      failure_step: 8,
      failure_mode: closureFailure ? 'closure_failure' : 'schema_violation',
      details: validationResult.failures
    });
  }

  signalBus.emit('layer.L8.complete', {
    sectionsAssembled: REQUIRED_SECTIONS.length,
    validationPass: validationResult.pass,
    failures: validationResult.failures,
    independentClaimCount: documentSchema.independent_claims.length,
    dependentClaimCount: documentSchema.dependent_claims.length,
    closureState
  });
}

module.exports = { process, validateSchema, REQUIRED_SECTIONS };
