/**
 * tests/fixtures/prism-objects.js
 * 
 * Synthetic Prism Objects for testing:
 *   - Happy path (all conditions met)
 *   - Phase A failure (confidence below threshold)
 *   - L2 rejection (each of five conditions)
 *   - L5 tripwire latch scenarios
 *   - Minimal claims / maximum tension / zero artifacts
 * 
 * @module tests/fixtures/prism-objects
 */

'use strict';

/** Happy path: all conditions met, clean flow */
const HAPPY_PATH = {
  seed_element: 'adaptive compression algorithm using golden-ratio partitioning for hierarchical data streams',
  irreducibility_confidence: 0.85,
  projection: {
    summary: 'A method of data compression applying golden-ratio partitioning to achieve optimal encoding density',
    elements: [
      'golden-ratio-based block partitioning module for adaptive segmentation of input data streams',
      'adaptive threshold selection processor using phi-derived constants for dynamic encoding adjustment',
      'hierarchical compression controller with tau-scaled decay rate for progressive resolution management'
    ]
  },
  reflection: {
    summary: 'Existing compression algorithms use fixed block sizes and entropy coding without geometric optimization',
    prior_art_refs: [
      'US10234567 Huffman coding variant with fixed blocks',
      'EP3456789 LZ-family dictionary compression',
      'WO2024001234 Neural network-based compression'
    ]
  },
  tension_points: [
    { description: 'Fixed vs adaptive block sizing strategy', severity: 0.8 },
    { description: 'Entropy-based vs geometry-based threshold selection', severity: 0.6 },
    { description: 'Flat vs hierarchical compression architecture', severity: 0.7 }
  ],
  emergent_claims: [
    'A method for compressing data using golden-ratio-partitioned blocks with adaptive threshold selection based on phi-derived constants',
    'A system for hierarchical data stream compression applying tau-scaled decay rates across compression layers with automatic level selection',
    'An apparatus implementing phi-partitioned resolution reduction for progressive data encoding with geometric optimization'
  ],
  crystallization_confidence: 0.78,
  inventor_confirmation: true,
  session_transcript: 'Full inventor session transcript covering all three stages of the VN Formation Protocol...',
  artifacts: [
    { filename: 'compression-algo.py', type: 'code', content: 'def compress(data, phi_ratio): ...' },
    { filename: 'benchmark-results.csv', type: 'data', content: 'block_size,ratio,time\n...' }
  ]
};

/** Phase A failure: irreducibility below threshold */
const LOW_IRREDUCIBILITY = {
  ...HAPPY_PATH,
  irreducibility_confidence: 0.4,
  seed_element: 'compression'
};

/** Phase A failure: crystallization below threshold */
const LOW_CRYSTALLIZATION = {
  ...HAPPY_PATH,
  crystallization_confidence: 0.3,
  emergent_claims: ['something vague about compression']
};

/** Phase A failure: no inventor confirmation */
const NO_CONFIRMATION = {
  ...HAPPY_PATH,
  inventor_confirmation: false
};

/** Phase A failure: missing required field */
const MISSING_FIELD = {
  seed_element: 'compression algorithm',
  irreducibility_confidence: 0.85,
  // Missing: projection, reflection, tension_points, emergent_claims, etc.
  crystallization_confidence: 0.78,
  inventor_confirmation: true,
  session_transcript: 'Incomplete session'
};

/** Minimal claims: single claim, single element */
const MINIMAL_CLAIMS = {
  ...HAPPY_PATH,
  projection: { summary: 'Compression method', elements: ['phi-based compression'] },
  emergent_claims: ['A method for data compression using phi-based partitioning'],
  tension_points: [{ description: 'Novel approach', severity: 0.5 }],
  artifacts: []
};

/** Maximum tension: many divergence points */
const MAX_TENSION = {
  ...HAPPY_PATH,
  tension_points: Array.from({ length: 10 }, (_, i) => ({
    description: `Tension point ${i + 1}: fundamental divergence in approach ${i + 1}`,
    severity: 0.7 + Math.random() * 0.3
  }))
};

/** Zero artifacts: no supporting materials */
const ZERO_ARTIFACTS = {
  ...HAPPY_PATH,
  artifacts: []
};

/** Short claims: claims too brief to be articulable */
const SHORT_CLAIMS = {
  ...HAPPY_PATH,
  emergent_claims: ['compress', 'phi', 'data'],
  projection: { summary: 'Short', elements: ['a', 'b'] }
};

/** Prior art heavy: many references overwhelming novelty */
const HEAVY_PRIOR_ART = {
  ...HAPPY_PATH,
  reflection: {
    summary: 'Extensive prior art in this domain',
    prior_art_refs: Array.from({ length: 20 }, (_, i) =>
      `US${10000000 + i} Prior art reference ${i + 1}`
    )
  }
};

module.exports = {
  HAPPY_PATH,
  LOW_IRREDUCIBILITY,
  LOW_CRYSTALLIZATION,
  NO_CONFIRMATION,
  MISSING_FIELD,
  MINIMAL_CLAIMS,
  MAX_TENSION,
  ZERO_ARTIFACTS,
  SHORT_CLAIMS,
  HEAVY_PRIOR_ART
};
