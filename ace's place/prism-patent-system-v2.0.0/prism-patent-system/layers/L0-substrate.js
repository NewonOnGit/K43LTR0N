/**
 * layers/L0-substrate.js
 *
 * L0: Prior Art Landscape (Substrate)
 *
 * V2 UPDATE: Now reads geometric stance from stance.* registers.
 * Q edges define prior art boundaries; zones derived from Q partition.
 *
 * Reads: stance.*, signal.*, prism_object
 * Writes: L0.substrate, L0.zones, L0.electrodes, L0.domain_bounds
 * Emits: layer.L0.complete
 *
 * @module layers/L0-substrate
 */

'use strict';

const { Z_C, CENTROID_Z, D3_VERTEX_ANGLES, D3_EDGE_LENGTH, D3_INRADIUS } = require('../shared/constants');

/**
 * Process L0: Build the prior art landscape from geometric stance + Prism Object.
 * @param {import('../shared/signal-bus').SignalBus} signalBus
 */
function process(signalBus) {
  const prism = signalBus.getRegister('prism_object');

  // V2: Read geometric stance
  const quad = signalBus.getRegister('stance.quad');
  const eInside = signalBus.getRegister('stance.eInside');
  const centrality = signalBus.getRegister('stance.centrality');

  if (!prism) {
    signalBus.emit('layer.L0.error', { message: 'No prism_object in register bank' });
    return;
  }

  // Zone count = number of distinct prior art categories
  const priorArtRefs = prism.reflection ? prism.reflection.prior_art_refs : [];
  const categories = new Set(priorArtRefs.map(ref => {
    const parts = ref.split(/[:\-/]/);
    return parts[0].trim();
  }));
  const zoneCount = Math.max(1, categories.size);

  // Electrode count = number of specific prior art references
  const electrodeCount = Math.max(1, priorArtRefs.length);

  // V2: Domain bounds from geometric stance quad (if available) or D3 fallback
  let vertices;
  let centroid;
  let domainBounds;

  if (quad && quad.length === 4) {
    // Use geometric stance quad
    vertices = quad.map(v => ({ x: v[0], y: v[1] }));
    centroid = {
      x: quad.reduce((s, v) => s + v[0], 0) / 4,
      y: quad.reduce((s, v) => s + v[1], 0) / 4
    };

    // Compute diagonal
    const dx1 = quad[2][0] - quad[0][0];
    const dy1 = quad[2][1] - quad[0][1];
    const dx2 = quad[3][0] - quad[1][0];
    const dy2 = quad[3][1] - quad[1][1];
    const diag = Math.max(
      Math.sqrt(dx1 * dx1 + dy1 * dy1),
      Math.sqrt(dx2 * dx2 + dy2 * dy2)
    );

    domainBounds = {
      vertices,
      centroid,
      z_c: Z_C,
      diagonal: diag,
      source: 'geometric_stance'
    };
  } else {
    // Fallback: D3 symmetry containment triangle
    vertices = D3_VERTEX_ANGLES.map(angle => ({
      x: D3_INRADIUS * Math.cos(angle),
      y: D3_INRADIUS * Math.sin(angle) + Z_C
    }));

    domainBounds = {
      vertices,
      centroid: { x: 0, y: CENTROID_Z },
      z_c: Z_C,
      inradius: D3_INRADIUS,
      edgeLength: D3_EDGE_LENGTH,
      source: 'd3_fallback'
    };
  }

  // Tessellate the domain into zones based on prior art categories
  const zones = [];
  const categoryArray = Array.from(categories);

  for (let i = 0; i < zoneCount; i++) {
    const angle = (2 * Math.PI * i) / zoneCount;
    const cx = domainBounds.centroid.x;
    const cy = domainBounds.centroid.y;
    const radius = (domainBounds.diagonal || D3_INRADIUS) * 0.3;

    zones.push({
      id: i,
      center: {
        x: cx + radius * Math.cos(angle),
        y: cy + radius * Math.sin(angle)
      },
      category: categoryArray[i] || `zone_${i}`,
      references: priorArtRefs.filter((_, idx) => idx % zoneCount === i)
    });
  }

  // Write outputs
  signalBus.setRegister('L0.substrate', {
    zoneCount,
    electrodeCount,
    noveltyThreshold: Z_C,
    eInside: eInside !== undefined ? eInside : true,
    centrality: centrality || 0.5
  });
  signalBus.setRegister('L0.zones', zones);
  signalBus.setRegister('L0.electrodes', priorArtRefs);
  signalBus.setRegister('L0.domain_bounds', domainBounds);

  signalBus.emit('layer.L0.complete', {
    zoneCount,
    electrodeCount,
    noveltyThreshold: Z_C,
    source: domainBounds.source
  });
}

module.exports = { process };
