/**
 * layers/L0-substrate.js
 * 
 * L0: Prior Art Landscape (Substrate)
 * 
 * Parameterizes the containment domain by prior art.
 * Zone count = prior art categories; electrode count = specific references.
 * z_c = novelty threshold: signals above z_c are novel; below z_c overlap with prior art.
 * 
 * Reads: signal.*, prism_object
 * Writes: L0.substrate, L0.zones, L0.electrodes, L0.domain_bounds
 * Emits: layer.L0.complete
 * 
 * @module layers/L0-substrate
 */

'use strict';

const { Z_C, CENTROID_Z, D3_VERTEX_ANGLES, D3_EDGE_LENGTH, D3_INRADIUS } = require('../shared/constants');

/**
 * Process L0: Build the prior art landscape from the Prism Object.
 * @param {import('../shared/signal-bus').SignalBus} signalBus
 */
function process(signalBus) {
  const prism = signalBus.getRegister('prism_object');
  const position = signalBus.getRegister('signal.position');

  if (!prism) {
    signalBus.emit('layer.L0.error', { message: 'No prism_object in register bank' });
    return;
  }

  // Zone count = number of distinct prior art categories
  const priorArtRefs = prism.reflection ? prism.reflection.prior_art_refs : [];
  const zoneCount = Math.max(1, new Set(priorArtRefs.map(ref => ref.split(/[:\-/]/)[0].trim())).size);

  // Electrode count = number of specific prior art references
  const electrodeCount = Math.max(1, priorArtRefs.length);

  // Build containment domain with D₃ symmetry
  const vertices = D3_VERTEX_ANGLES.map(angle => ({
    x: D3_INRADIUS * Math.cos(angle),
    y: D3_INRADIUS * Math.sin(angle) + Z_C
  }));

  // Domain bounds: the equilateral triangle containing the signal
  const domainBounds = {
    vertices,
    centroid: { x: 0, y: CENTROID_Z },
    z_c: Z_C,
    inradius: D3_INRADIUS,
    edgeLength: D3_EDGE_LENGTH
  };

  // Substrate: tessellate the domain into zones based on prior art
  const zones = [];
  for (let i = 0; i < zoneCount; i++) {
    const angle = (2 * Math.PI * i) / zoneCount;
    zones.push({
      id: i,
      center: {
        x: D3_INRADIUS * 0.5 * Math.cos(angle),
        y: D3_INRADIUS * 0.5 * Math.sin(angle) + CENTROID_Z
      },
      category: priorArtRefs[i] ? priorArtRefs[i].split(/[:\-/]/)[0].trim() : `zone_${i}`,
      references: priorArtRefs.filter((_, idx) => idx % zoneCount === i)
    });
  }

  // Write outputs
  signalBus.setRegister('L0.substrate', {
    zoneCount,
    electrodeCount,
    noveltyThreshold: Z_C
  });
  signalBus.setRegister('L0.zones', zones);
  signalBus.setRegister('L0.electrodes', priorArtRefs);
  signalBus.setRegister('L0.domain_bounds', domainBounds);

  signalBus.emit('layer.L0.complete', {
    zoneCount,
    electrodeCount,
    noveltyThreshold: Z_C
  });
}

module.exports = { process };
