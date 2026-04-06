/**
 * layers/inject.js
 * 
 * Signal Injection: Prism Object → Signal Components
 * 
 * Converts the Prism Object (Phase A output) into a propagation signal
 * by mapping each field to a signal component per §3.1.
 * 
 * Mapping:
 *   seed_element    → Initial position (x, y) — centroid of containment domain
 *   projection      → Direction (vx, vy) — vector toward z_c apex
 *   tension_points  → Initial phase φ — offset ∝ number × severity
 *   emergent_claims → Initial intensity I — ∝ crystallization × claim count
 *   artifacts       → Defect contribution — ∝ incompleteness/ambiguity
 * 
 * @module layers/inject
 */

'use strict';

const { CENTROID_Z, Z_C, TAU, D3_VERTEX_ANGLES } = require('../shared/constants');

/**
 * Inject a Prism Object into the SignalBus as signal components.
 * 
 * @param {Object} prismObject - Validated Prism Object from Phase A
 * @param {import('../shared/signal-bus').SignalBus} signalBus - The signal bus
 * @throws {Error} If prismObject is missing required fields
 */
function inject(prismObject, signalBus) {
  if (!prismObject || !prismObject.seed_element) {
    throw new Error('inject: prismObject must have a seed_element');
  }

  // Position: centroid of containment domain (strongest starting position)
  // The centroid is at (0, CENTROID_Z) in the equilateral containment triangle
  const position = {
    x: 0,
    y: CENTROID_Z
  };

  // Direction: vector toward the z_c apex, weighted by projection strength
  const projectionStrength = prismObject.projection
    ? prismObject.projection.elements.length / 10
    : 0.5;
  const direction = {
    vx: 0,
    vy: (Z_C - CENTROID_Z) * Math.min(projectionStrength, 1)
  };

  // Phase: offset proportional to tension count × average severity
  const tensionCount = prismObject.tension_points
    ? prismObject.tension_points.length
    : 0;
  const avgSeverity = tensionCount > 0
    ? prismObject.tension_points.reduce((s, t) => s + t.severity, 0) / tensionCount
    : 0;
  const phase = tensionCount * avgSeverity * Math.PI * TAU;

  // Intensity: proportional to crystallization_confidence × claim count
  const claimCount = prismObject.emergent_claims
    ? prismObject.emergent_claims.length
    : 0;
  const intensity = (prismObject.crystallization_confidence || 0) * claimCount;

  // Defect: proportional to incompleteness in supporting materials
  // No artifacts = maximum defect (1.0); complete artifacts = low defect
  const artifactCount = prismObject.artifacts ? prismObject.artifacts.length : 0;
  const defect = artifactCount > 0
    ? TAU / (1 + artifactCount)   // diminishes with more artifacts
    : 1.0;                         // no artifacts = maximum defect

  // Write signal components to register bank
  signalBus.setRegister('signal.position', position);
  signalBus.setRegister('signal.direction', direction);
  signalBus.setRegister('signal.phase', phase);
  signalBus.setRegister('signal.intensity', intensity);
  signalBus.setRegister('signal.defect', defect);

  // Also store the raw prism object for downstream layers
  signalBus.setRegister('prism_object', prismObject);

  // Emit injection complete event
  signalBus.emit('signal.injected', {
    position,
    direction,
    phase,
    intensity,
    defect
  });
}

module.exports = { inject };
