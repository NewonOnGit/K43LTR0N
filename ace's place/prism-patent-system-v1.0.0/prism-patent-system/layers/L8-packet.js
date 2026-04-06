/**
 * layers/L8-packet.js
 * 
 * L8: Patent Document Assembly
 * 
 * Assembles the processed signal into a patent specification schema.
 * Required sections: title, abstract, technical_field, background, summary,
 * detailed_description, claims, drawings_descriptions, constants_equations.
 * Schema validation before export.
 * 
 * Reads: L0.*–L7.*, prism_object
 * Writes: L8.document_schema, L8.validation_result
 * Emits: layer.L8.complete
 * 
 * @module layers/L8-packet
 */

'use strict';

const { GENERATION_STEPS } = require('../shared/constants');

/** Required sections in the patent document schema */
const REQUIRED_SECTIONS = [
  'title', 'abstract', 'technical_field', 'background',
  'summary', 'detailed_description', 'independent_claims',
  'dependent_claims', 'drawings_descriptions', 'constants_equations'
];

/**
 * Validate the assembled document schema.
 * @param {Object} schema - The document schema to validate
 * @returns {{ pass: boolean, failures: string[] }}
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

  // Claims must have at least one independent claim
  if (schema.independent_claims && Array.isArray(schema.independent_claims)) {
    if (schema.independent_claims.length === 0) {
      failures.push('No independent claims present');
    }
  }

  // Dependent claims must reference an independent claim
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
  const zones = signalBus.getRegister('L0.zones');
  const narrowingStages = signalBus.getRegister('L3.narrowing_stages');
  const fieldSignature = signalBus.getRegister('L4.field_signature');
  const integrityScore = signalBus.getRegister('L5.integrity_score');
  const regimeMatrix = signalBus.getRegister('L6.regime_matrix');
  const routingState = signalBus.getRegister('L7.routing_state');

  if (!prism || !narrowingStages) {
    signalBus.emit('layer.L8.error', { message: 'Missing upstream outputs' });
    return;
  }

  const finalStage = narrowingStages[narrowingStages.length - 1];
  const finalClaims = finalStage ? finalStage.elements : [];

  // Assemble document schema
  const documentSchema = {
    // Step 1: Title + Abstract
    title: `System and Method for ${prism.seed_element}`,
    abstract: prism.emergent_claims && prism.emergent_claims.length > 0
      ? `A ${prism.seed_element} comprising ${prism.emergent_claims[0]}.`
      : `A system implementing ${prism.seed_element}.`,

    // Step 2: Technical Field
    technical_field: substrate
      ? `The present invention relates to ${prism.seed_element}, operating within a domain of ${substrate.zoneCount} prior art categories and ${substrate.electrodeCount} specific references.`
      : `The present invention relates to ${prism.seed_element}.`,

    // Step 3: Background / Prior Art
    background: prism.reflection
      ? {
          summary: prism.reflection.summary,
          prior_art: prism.reflection.prior_art_refs,
          tension_points: prism.tension_points
        }
      : { summary: '', prior_art: [], tension_points: [] },

    // Step 4: Summary of Invention
    summary: prism.projection
      ? {
          overview: prism.projection.summary,
          novel_elements: prism.projection.elements,
          emergent_claims: prism.emergent_claims
        }
      : { overview: '', novel_elements: [], emergent_claims: [] },

    // Step 5: Detailed Description (assembled from pipeline outputs)
    detailed_description: {
      substrate: substrate,
      field_signature: fieldSignature,
      integrity_score: integrityScore,
      regime_analysis: regimeMatrix,
      routing_decision: routingState,
      narrowing_profile: narrowingStages.map(s => ({ id: s.id, count: s.element_count }))
    },

    // Step 6: Independent Claims (all survivors at stage 𝒠₂)
    // Both projection elements and emergent claims that survive all five gates
    // are legitimate independent claim material. Each is formatted with proper preamble.
    independent_claims: finalClaims
      .map((el, i) => {
        let text = el.text;
        // Ensure proper claim preamble
        const lower = text.toLowerCase();
        if (!lower.startsWith('a ') && !lower.startsWith('an ')) {
          text = `A method comprising ${text}`;
        }
        // Ensure period at end
        if (!text.endsWith('.')) text += '.';
        // Capitalize first letter
        text = text.charAt(0).toUpperCase() + text.slice(1);

        return {
          id: `ind_${i + 1}`,
          text,
          source: el.source,
          source_stage: 'E2'
        };
      }),

    // Step 7: Dependent Claims (elements at intermediate stages P, F)
    dependent_claims: (() => {
      const pStage = narrowingStages.find(s => s.id === 'P');
      const fStage = narrowingStages.find(s => s.id === 'F');
      const e2Ids = new Set(finalClaims.map(el => el.id));
      const deps = [];

      // Elements that survived P or F but not E2 can become dependent claims
      const intermediateElements = [
        ...((pStage ? pStage.elements : []).filter(el => !e2Ids.has(el.id))),
        ...((fStage ? fStage.elements : []).filter(el => !e2Ids.has(el.id)))
      ];

      // Deduplicate
      const seen = new Set();
      for (const el of intermediateElements) {
        if (!seen.has(el.id)) {
          seen.add(el.id);
          deps.push({
            id: `dep_${deps.length + 1}`,
            text: el.text,
            depends_on: 'ind_1',  // Default dependency on first independent claim
            additional_limitation: `further comprising the limitation of ${el.text}`
          });
        }
      }
      return deps;
    })(),

    // Step 9: Drawings Descriptions
    drawings_descriptions: [
      { figure: 'FIG. 1', description: 'Containment domain geometry with prior art zones' },
      { figure: 'FIG. 2', description: 'Ten-layer signal processing pipeline (L0–L9)' },
      { figure: 'FIG. 3', description: 'Filing strategy routing FSM (WARNING/BUFFER/HARBOR)' }
    ],

    // Step 8: Constants / Equations
    constants_equations: fieldSignature
      ? Object.entries(fieldSignature).map(([key, value]) => ({
          symbol: key,
          value: typeof value === 'number' ? value.toFixed(4) : value,
          description: `Field signature channel: ${key}`
        }))
      : [],

    // Metadata
    metadata: {
      filing_strategy: routingState ? routingState.strategy : 'provisional_filing',
      integrity_score: integrityScore,
      cross_regime_confidence: signalBus.getRegister('L6.cross_regime_confidence'),
      generation_steps: GENERATION_STEPS
    }
  };

  // Validate schema
  const validationResult = validateSchema(documentSchema);

  signalBus.setRegister('L8.document_schema', documentSchema);
  signalBus.setRegister('L8.validation_result', validationResult);

  // If validation fails, emit C→B feedback
  if (!validationResult.pass) {
    signalBus.emit('feedback.c_to_b', {
      failure_step: 8,
      failure_mode: 'schema_violation',
      details: validationResult.failures
    });
  }

  signalBus.emit('layer.L8.complete', {
    sectionsAssembled: REQUIRED_SECTIONS.length,
    validationPass: validationResult.pass,
    failures: validationResult.failures,
    independentClaimCount: documentSchema.independent_claims.length,
    dependentClaimCount: documentSchema.dependent_claims.length
  });
}

module.exports = { process, validateSchema, REQUIRED_SECTIONS };
