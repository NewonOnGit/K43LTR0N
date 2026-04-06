/**
 * tests/fixtures/prism-objects.js
 *
 * Test fixtures for prism objects used in acceptance testing.
 *
 * @module tests/fixtures/prism-objects
 */

'use strict';

/**
 * Minimal valid prism object for basic testing.
 */
const MINIMAL_PRISM = {
  seed_element: 'Signal processing method',
  irreducibility_confidence: 0.7,
  crystallization_confidence: 0.6,
  projection: {
    elements: ['input processing', 'transformation', 'output generation']
  },
  reflection: {
    prior_art_refs: [
      'US Patent 1234567',
      'IEEE Signal Processing 2020'
    ]
  },
  tension_points: [
    { description: 'Existing methods lack real-time capability', severity: 0.6 }
  ],
  emergent_claims: [
    'Real-time signal transformation system',
    'Low-latency processing pipeline'
  ]
};

/**
 * Full prism object with all fields populated.
 */
const FULL_PRISM = {
  seed_element: 'Adaptive neural network compression system',
  irreducibility_confidence: 0.85,
  crystallization_confidence: 0.8,
  projection: {
    elements: [
      'input layer quantization',
      'weight pruning mechanism',
      'activation function optimization',
      'gradient-based learning rate adjustment',
      'output layer reconstruction'
    ],
    geometric_bounds: {
      claim_breadth: 0.75,
      enablement_depth: 0.82
    }
  },
  reflection: {
    prior_art_refs: [
      'US Patent 9876543 - Neural Network Compression',
      'arXiv:2019.12345 - Deep Learning Optimization',
      'IEEE CVPR 2021 - Model Pruning Techniques',
      'EP 3456789 - Quantization Methods'
    ],
    gaps_identified: [
      'No adaptive compression based on input complexity',
      'Fixed pruning ratios limit flexibility'
    ]
  },
  tension_points: [
    {
      description: 'Existing compression methods use fixed ratios regardless of input complexity',
      severity: 0.85
    },
    {
      description: 'Prior art requires retraining after compression',
      severity: 0.72
    },
    {
      description: 'Current methods do not preserve edge-case accuracy',
      severity: 0.58
    }
  ],
  emergent_claims: [
    'Adaptive compression system that adjusts pruning ratio based on input complexity metrics',
    'Real-time weight adjustment without full retraining cycle',
    'Edge-case preservation module for maintaining accuracy on rare inputs',
    'Gradient-based learning rate scheduler integrated with compression feedback'
  ],
  metadata: {
    inventor: 'Test Inventor',
    filing_date: '2025-01-15',
    application_number: 'TEST-2025-001'
  }
};

/**
 * Prism object designed to trigger closure failure.
 */
const CLOSURE_FAILURE_PRISM = {
  seed_element: 'Contradictory claim system',
  irreducibility_confidence: 0.5,
  crystallization_confidence: 0.4,
  projection: {
    elements: [
      'all data types supported',
      'specific data type X only',
      'no data type restrictions'
    ]
  },
  reflection: {
    prior_art_refs: ['Generic prior art reference']
  },
  tension_points: [
    { description: 'Claims have logical contradictions', severity: 0.95 }
  ],
  emergent_claims: [
    'A system that processes all data types',
    'A system limited to data type X only',
    'A system with no data type restrictions'
  ]
};

/**
 * Prism object with high novelty (above z_c threshold).
 */
const HIGH_NOVELTY_PRISM = {
  seed_element: 'Quantum-classical hybrid computing interface',
  irreducibility_confidence: 0.95,
  crystallization_confidence: 0.9,
  projection: {
    elements: [
      'quantum state preparation module',
      'classical-quantum data bridge',
      'error correction subsystem',
      'measurement optimization layer'
    ]
  },
  reflection: {
    prior_art_refs: [
      'Basic quantum computing reference (distant from claims)'
    ]
  },
  tension_points: [
    { description: 'No prior art addresses hybrid interface at this level', severity: 0.92 }
  ],
  emergent_claims: [
    'Novel quantum-classical interface with real-time state synchronization',
    'Adaptive error correction based on qubit coherence metrics'
  ]
};

/**
 * Prism object with low novelty (below z_c threshold).
 */
const LOW_NOVELTY_PRISM = {
  seed_element: 'Standard data sorting method',
  irreducibility_confidence: 0.3,
  crystallization_confidence: 0.2,
  projection: {
    elements: ['compare elements', 'swap if needed', 'repeat']
  },
  reflection: {
    prior_art_refs: [
      'Quicksort algorithm (1960)',
      'Mergesort algorithm (1945)',
      'Heapsort algorithm (1964)',
      'Timsort algorithm (2002)',
      'Introsort algorithm (1997)'
    ]
  },
  tension_points: [
    { description: 'Minor variation on existing sorting', severity: 0.15 }
  ],
  emergent_claims: [
    'A method of sorting data by comparing and swapping elements'
  ]
};

module.exports = {
  MINIMAL_PRISM,
  FULL_PRISM,
  CLOSURE_FAILURE_PRISM,
  HIGH_NOVELTY_PRISM,
  LOW_NOVELTY_PRISM
};
