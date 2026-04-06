/**
 * index.js
 * 
 * Prism Patent System — Entry Point
 * 
 * Orchestrates the full three-phase pipeline:
 *   Phase A: VN Formation Protocol (inventor session → Prism Object)
 *   Phase B: EO-RFD Pipeline (Prism Object → Processed Signal)
 *   Phase C: LLM Generation Engine (Processed Signal → Draft Patent .docx)
 * 
 * Usage:
 *   node index.js <prism-object.json> [output.docx]
 * 
 * @module index
 */

'use strict';

const fs = require('fs');
const path = require('path');
const { SignalBus } = require('./shared/signal-bus');
const constants = require('./shared/constants');
const { inject } = require('./layers/inject');
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
const { buildClaimSkeleton } = require('./generation/claim-skeleton');
const { validate } = require('./generation/validator');
const { buildDocx } = require('./generation/docx-builder');

const LAYERS = [L0, L1, L2, L3, L4, L5, L6, L7, L8, L9];

/**
 * Validate a Prism Object against the Phase A gate.
 * @param {Object} prism
 * @returns {{ pass: boolean, failures: string[] }}
 */
function validatePrismGate(prism) {
  const failures = [];
  if (!prism.inventor_confirmation) failures.push('inventor_confirmation must be true');
  if ((prism.irreducibility_confidence || 0) <= constants.PRISM_GATE.IRREDUCIBILITY_MIN)
    failures.push(`irreducibility_confidence must exceed ${constants.PRISM_GATE.IRREDUCIBILITY_MIN}`);
  if ((prism.crystallization_confidence || 0) <= constants.PRISM_GATE.CRYSTALLIZATION_MIN)
    failures.push(`crystallization_confidence must exceed ${constants.PRISM_GATE.CRYSTALLIZATION_MIN}`);
  return { pass: failures.length === 0, failures };
}

/**
 * Run the full pipeline: Phase A gate → Phase B processing → Phase C output.
 * 
 * @param {Object} prismObject - Validated Prism Object from Phase A
 * @param {Object} [options] - Pipeline options
 * @param {string} [options.outputPath] - Output .docx file path
 * @param {boolean} [options.verbose] - Enable verbose logging
 * @returns {Promise<Object>} Pipeline results
 */
async function runPipeline(prismObject, options = {}) {
  const { outputPath, verbose } = options;
  const bus = new SignalBus();
  if (verbose) bus.setDevMode(true);

  // Phase A gate
  const gate = validatePrismGate(prismObject);
  if (!gate.pass) {
    return { success: false, phase: 'A', errors: gate.failures };
  }

  // Phase B: Signal Processing
  const startB = Date.now();
  inject(prismObject, bus);
  for (let i = 0; i < LAYERS.length; i++) {
    if (verbose) console.log(`Processing L${i}...`);
    LAYERS[i].process(bus);
  }
  const phaseB_ms = Date.now() - startB;

  // Extract results
  const documentSchema = bus.getRegister('L8.document_schema');
  const portfolioHealth = bus.getRegister('L9.portfolio_health');
  const routingState = bus.getRegister('L7.routing_state');

  // Phase C: Validation
  const validationResult = validate(documentSchema);

  // Phase C: Document generation
  let docxBuffer = null;
  if (documentSchema) {
    const outPath = outputPath || path.join(process.cwd(), 'output', 'patent-specification.docx');
    const outDir = path.dirname(outPath);
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

    docxBuffer = await buildDocx(documentSchema, outPath);
    if (verbose) console.log(`DOCX written to ${outPath} (${docxBuffer.length} bytes)`);
  }

  // Claim skeleton
  const skeleton = buildClaimSkeleton({
    narrowing_stages: bus.getRegister('L3.narrowing_stages'),
    loss_operators: bus.getRegister('L3.loss_operators'),
    dominant_loss: bus.getRegister('L3.dominant_loss')
  });

  return {
    success: true,
    phaseB_ms,
    routing: routingState,
    portfolioHealth,
    validation: validationResult,
    claimSkeleton: skeleton,
    documentSchema,
    docxSize: docxBuffer ? docxBuffer.length : 0,
    historyEntries: bus.getHistory().length
  };
}

// CLI entry point
if (require.main === module) {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.log('Prism Patent System v1.0.0');
    console.log('Usage: node index.js <prism-object.json> [output.docx]');
    console.log('\nRun tests: npm test');
    process.exit(0);
  }

  const inputPath = args[0];
  const outputPath = args[1] || 'output/patent-specification.docx';

  try {
    const prism = JSON.parse(fs.readFileSync(inputPath, 'utf8'));
    runPipeline(prism, { outputPath, verbose: true }).then(result => {
      if (result.success) {
        console.log('\n═══ Pipeline Complete ═══');
        console.log(`Routing: ${result.routing.strategy}`);
        console.log(`CSD: ${result.portfolioHealth.csd_state}`);
        console.log(`Claims: ${result.claimSkeleton.independent.length} independent, ${result.claimSkeleton.dependent.length} dependent`);
        console.log(`Validation: ${result.validation.pass ? 'PASS' : 'FAIL'} (score: ${result.validation.score})`);
        console.log(`DOCX: ${result.docxSize} bytes → ${outputPath}`);
      } else {
        console.error('Pipeline failed at Phase', result.phase);
        console.error('Errors:', result.errors);
        process.exit(1);
      }
    });
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
}

module.exports = { runPipeline, validatePrismGate };
