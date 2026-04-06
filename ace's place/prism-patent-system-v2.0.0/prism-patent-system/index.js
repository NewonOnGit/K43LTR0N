/**
 * PRISM Patent System V2.0.0
 *
 * Observer Interior Architecture — Prism-Guided Signal Propagation
 *
 * Main entry point exposing all system components:
 *   - Shared modules (constants, signal bus, stance engine, EO bridge)
 *   - Layer pipeline (L0-L9)
 *   - Generation engine (claim skeleton, validator, closure checker, DOCX builder)
 *   - VN Protocol (session manager)
 *
 * @module prism-patent-system
 * @version 2.0.0
 */

'use strict';

// ─── Shared Modules ──────────────────────────────────────────────────────────

const constants = require('./shared/constants');
const { SignalBus } = require('./shared/signal-bus');
const vec = require('./shared/vec');
const { computeFramework } = require('./shared/stance-engine');
const { deriveEO } = require('./shared/eo-bridge');

// ─── Layer Pipeline ──────────────────────────────────────────────────────────

const inject = require('./layers/inject');
const L0 = require('./layers/L0-substrate');
const L1 = require('./layers/L1-propagation');
const L2 = require('./layers/L2-admissibility');
const L3 = require('./layers/L3-narrowing');
const L4 = require('./layers/L4-field-signature');
const L5 = require('./layers/L5-signal-rupture');
const L6 = require('./layers/L6-detector-sweep');
const L7 = require('./layers/L7-routing');
const L8 = require('./layers/L8-packet');
const L9 = require('./layers/L9-metacybernetic');

// ─── Generation Engine ───────────────────────────────────────────────────────

const { buildClaimSkeleton } = require('./generation/claim-skeleton');
const { validate } = require('./generation/validator');
const {
  checkClosure,
  validateClosure,
  computeClosureState,
  ClosureHistory
} = require('./generation/closure-checker');
const { buildDocx } = require('./generation/docx-builder');

// ─── VN Protocol ─────────────────────────────────────────────────────────────

const { SessionManager } = require('./vn-protocol/session-manager');

// ─── Pipeline Orchestration ──────────────────────────────────────────────────

/**
 * Run the complete EO-RFD pipeline on a prism object.
 *
 * @param {Object} prism - The prism object from Phase A
 * @param {Object} options - Pipeline options
 * @returns {Object} Pipeline results including document schema and portfolio health
 */
function runPipeline(prism, options = {}) {
  const bus = new SignalBus();
  bus.setRegister('prism_object', prism);

  // Layer sequence
  const layers = [inject, L0, L1, L2, L3, L4, L5, L6, L7, L8, L9];
  const layerNames = ['inject', 'L0', 'L1', 'L2', 'L3', 'L4', 'L5', 'L6', 'L7', 'L8', 'L9'];

  const timing = {};
  const errors = [];

  for (let i = 0; i < layers.length; i++) {
    const name = layerNames[i];
    const start = Date.now();

    try {
      layers[i].process(bus);
      timing[name] = Date.now() - start;
    } catch (err) {
      errors.push({ layer: name, error: err.message });
      if (options.stopOnError) break;
    }
  }

  // Extract results
  const documentSchema = bus.getRegister('L8.document_schema');
  const closureState = bus.getRegister('L8.closure_state');
  const portfolioHealth = bus.getRegister('L9.portfolio_health');
  const routingState = bus.getRegister('L7.routing_state');
  const fieldSignature = bus.getRegister('L4.field_signature');

  // Validate if requested
  let validation = null;
  if (options.validate !== false && documentSchema) {
    validation = validate(documentSchema, closureState);
  }

  return {
    documentSchema,
    closureState,
    portfolioHealth,
    routingState,
    fieldSignature,
    validation,
    timing,
    errors,
    signalBus: options.returnBus ? bus : undefined
  };
}

/**
 * Generate a DOCX file from pipeline results.
 *
 * @param {Object} pipelineResults - Results from runPipeline
 * @param {string} outputPath - Optional file path for output
 * @returns {Promise<Buffer>} DOCX buffer
 */
async function generateDocx(pipelineResults, outputPath = null) {
  if (!pipelineResults.documentSchema) {
    throw new Error('No document schema available');
  }

  return buildDocx(pipelineResults.documentSchema, outputPath);
}

/**
 * Create a new VN protocol session for Phase A.
 *
 * @param {Object} options - Session options
 * @returns {SessionManager}
 */
function createSession(options = {}) {
  return new SessionManager(options);
}

// ─── Exports ─────────────────────────────────────────────────────────────────

module.exports = {
  // High-level API
  runPipeline,
  generateDocx,
  createSession,

  // Shared modules
  constants,
  SignalBus,
  vec,
  computeFramework,
  deriveEO,

  // Individual layers (for advanced use)
  layers: {
    inject,
    L0,
    L1,
    L2,
    L3,
    L4,
    L5,
    L6,
    L7,
    L8,
    L9
  },

  // Generation
  generation: {
    buildClaimSkeleton,
    validate,
    checkClosure,
    validateClosure,
    computeClosureState,
    ClosureHistory,
    buildDocx
  },

  // VN Protocol
  vnProtocol: {
    SessionManager
  },

  // Version info
  version: '2.0.0',
  name: 'PRISM Patent System',
  architecture: 'Observer Interior'
};
