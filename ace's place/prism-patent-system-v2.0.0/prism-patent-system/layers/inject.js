/**
 * layers/inject.js
 *
 * V2 Signal Injection: Prism Object -> Geometric Stance -> EO-RFD Metrics
 *
 * V2 REWRITE: Replaces V1's numeric mapping with geometric stance computation.
 * The Prism Object determines the quadrilateral Q (prior art landscape) and
 * the L->E->R path (observer trajectory). All downstream metrics derive from
 * this geometry.
 *
 * Flow:
 *   1. Construct Q from prior art references
 *   2. Construct L->E->R path from seed, projection, emergent claims
 *   3. Call stance-engine.computeFramework()
 *   4. Call eo-bridge.deriveEO()
 *   5. Write to SignalBus (stance.*, eo.*, signal.* for backward compat)
 *
 * @module layers/inject
 */

'use strict';

const { computeFramework, writeToSignalBus: writeStance } = require('../shared/stance-engine');
const { deriveEO, writeToSignalBus: writeEO } = require('../shared/eo-bridge');
const { DEFAULT_QUAD, DEFAULT_PATH, CENTROID_Z, Z_C, TAU } = require('../shared/constants');

/**
 * Construct the containment quadrilateral Q from the Prism Object.
 * The shape of Q is determined by the prior art landscape.
 *
 * @param {Object} prismObject - Validated Prism Object from Phase A
 * @returns {number[][]} Four vertices [[x,y], ...]
 */
function constructQuad(prismObject) {
  const priorArtRefs = prismObject.reflection?.prior_art_refs || [];
  const tensionPoints = prismObject.tension_points || [];

  // Base quad expands based on prior art density
  const priorArtFactor = Math.min(1, priorArtRefs.length / 10);
  const tensionFactor = Math.min(1, tensionPoints.length / 5);

  // More prior art = larger containment domain
  // More tension = more asymmetric domain
  const baseSize = 0.3 + priorArtFactor * 0.4;
  const asymmetry = tensionFactor * 0.15;

  // Construct quad centered around (0.5, 0.5) with computed size
  const cx = 0.5, cy = 0.5;

  return [
    [cx - baseSize - asymmetry, cy - baseSize],           // Bottom-left
    [cx + baseSize, cy - baseSize + asymmetry],           // Bottom-right
    [cx + baseSize - asymmetry, cy + baseSize],           // Top-right
    [cx - baseSize, cy + baseSize - asymmetry]            // Top-left
  ];
}

/**
 * Construct the L->E->R path from the Prism Object.
 * - L (Latent): Entry point based on seed element
 * - E (Explorer): Observer position based on projection strength
 * - R (Registered): Exit point based on emergent claims
 *
 * @param {Object} prismObject - Validated Prism Object from Phase A
 * @param {number[][]} quad - The containment quadrilateral
 * @returns {number[][]} Three points [L, E, R]
 */
function constructPath(prismObject, quad) {
  const projElements = prismObject.projection?.elements || [];
  const emergentClaims = prismObject.emergent_claims || [];
  const irreducibility = prismObject.irreducibility_confidence || 0.5;
  const crystallization = prismObject.crystallization_confidence || 0.5;

  // Compute quad centroid and bounds
  const cx = quad.reduce((s, v) => s + v[0], 0) / 4;
  const cy = quad.reduce((s, v) => s + v[1], 0) / 4;

  const minX = Math.min(...quad.map(v => v[0]));
  const maxX = Math.max(...quad.map(v => v[0]));
  const minY = Math.min(...quad.map(v => v[1]));
  const maxY = Math.max(...quad.map(v => v[1]));

  // L: Entry point - lower left region, influenced by irreducibility
  // Higher irreducibility = closer to boundary (more defined entry)
  const lx = minX + (maxX - minX) * (0.15 + 0.15 * (1 - irreducibility));
  const ly = minY + (maxY - minY) * (0.2 + 0.1 * irreducibility);
  const L = [lx, ly];

  // E: Observer position - influenced by projection strength
  // More projection elements = more central position
  const projStrength = Math.min(1, projElements.length / 10);
  const ex = cx - (cx - minX) * (0.3 - projStrength * 0.2);
  const ey = cy - (cy - minY) * (0.2 - projStrength * 0.15);
  const E = [ex, ey];

  // R: Exit point - upper right region, influenced by crystallization
  // Higher crystallization = more defined exit (further toward corner)
  const rx = maxX - (maxX - minX) * (0.15 + 0.15 * (1 - crystallization));
  const ry = maxY - (maxY - minY) * (0.2 - 0.1 * crystallization);
  const R = [rx, ry];

  return [L, E, R];
}

/**
 * Inject a Prism Object into the SignalBus via geometric stance computation.
 *
 * V2: This replaces V1's direct numeric mapping with:
 *   1. Geometric stance computation (Q, L->E->R path)
 *   2. EO-RFD metric derivation from geometry
 *   3. Backward-compatible signal.* registers for V1 layers
 *
 * @param {Object} prismObject - Validated Prism Object from Phase A
 * @param {import('../shared/signal-bus').SignalBus} signalBus - The signal bus
 * @throws {Error} If prismObject is missing required fields
 */
function inject(prismObject, signalBus) {
  if (!prismObject || !prismObject.seed_element) {
    throw new Error('inject: prismObject must have a seed_element');
  }

  // Step 1: Construct geometric primitives from Prism Object
  const quad = constructQuad(prismObject);
  const pathPts = constructPath(prismObject, quad);

  // Step 2: Compute geometric framework
  const framework = computeFramework(quad, pathPts);

  // Step 3: Derive EO-RFD metrics from geometry
  const eoMetrics = deriveEO(framework);

  // Step 4: Write to SignalBus
  writeStance(framework, signalBus);
  writeEO(eoMetrics, signalBus);

  // Step 5: Store the raw Prism Object
  signalBus.setRegister('prism_object', prismObject);

  // Step 6: V1 backward compatibility - write signal.* registers
  // These are now derived from geometry instead of directly from Prism fields
  const position = {
    x: framework.centroid[0],
    y: framework.centroid[1]
  };

  const direction = {
    vx: pathPts[2][0] - pathPts[0][0],
    vy: pathPts[2][1] - pathPts[0][1]
  };

  // Phase from deflection angle
  const phase = framework.deflection;

  // Intensity from im_norm and crystallization
  const intensity = framework.imNorm * (prismObject.crystallization_confidence || 0.5);

  // Defect from k4_deficit
  const defect = framework.k4Deficit;

  signalBus.setRegister('signal.position', position);
  signalBus.setRegister('signal.direction', direction);
  signalBus.setRegister('signal.phase', phase);
  signalBus.setRegister('signal.intensity', intensity);
  signalBus.setRegister('signal.defect', defect);

  // Emit injection complete event with V2 summary
  signalBus.emit('signal.injected', {
    version: 2,
    eInside: framework.eInside,
    compression: framework.compression,
    z: eoMetrics.z,
    registered: eoMetrics.admissibility.registered,
    routeState: eoMetrics.routing.state
  });
}

module.exports = { inject, constructQuad, constructPath };
