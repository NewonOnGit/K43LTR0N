/**
 * tests/fixtures/geometric-stances.js
 *
 * Test fixtures for geometric stance configurations.
 *
 * @module tests/fixtures/geometric-stances
 */

'use strict';

/**
 * Default stance: observer centered inside Q.
 */
const DEFAULT_STANCE = {
  name: 'Default (Centered)',
  quad: [[0, 0], [1, 0], [1, 1], [0, 1]],
  path: [[0.2, 0.5], [0.5, 0.5], [0.8, 0.5]],
  expected: {
    insideQ: true,
    compressionRange: [0.8, 1.2],
    centralityMin: 0.3,
    zAboveThreshold: false // z_c = 0.866, centered stance won't exceed
  }
};

/**
 * High compression stance: E closer to R than L.
 */
const HIGH_COMPRESSION_STANCE = {
  name: 'High Compression',
  quad: [[0, 0], [1, 0], [1, 1], [0, 1]],
  path: [[0.1, 0.5], [0.8, 0.5], [0.9, 0.5]],
  expected: {
    insideQ: true,
    compressionRange: [0.1, 0.3], // |ER|/|LE| is small
    centralityMin: 0.2
  }
};

/**
 * High deflection stance: path bends significantly.
 */
const HIGH_DEFLECTION_STANCE = {
  name: 'High Deflection',
  quad: [[0, 0], [1, 0], [1, 1], [0, 1]],
  path: [[0.2, 0.2], [0.5, 0.8], [0.8, 0.2]],
  expected: {
    insideQ: true,
    deflectionMin: 1.0, // Radians (> 57 degrees)
    centralityMin: 0.1
  }
};

/**
 * Observer outside Q stance.
 */
const OUTSIDE_Q_STANCE = {
  name: 'Observer Outside Q',
  quad: [[0.3, 0.3], [0.7, 0.3], [0.7, 0.7], [0.3, 0.7]],
  path: [[-0.1, 0.5], [0.5, 0.5], [1.1, 0.5]],
  expected: {
    insideQ: false, // E is inside but L and R are outside
    zNegative: true // Outside Q → negative z
  }
};

/**
 * Near-boundary stance: E close to Q edge.
 */
const BOUNDARY_STANCE = {
  name: 'Near Boundary',
  quad: [[0, 0], [1, 0], [1, 1], [0, 1]],
  path: [[0.05, 0.5], [0.05, 0.5], [0.5, 0.5]],
  expected: {
    insideQ: true,
    centralityMax: 0.3,
    boundaryProxMin: 0.7
  }
};

/**
 * Maximally central stance: E at centroid.
 */
const CENTRAL_STANCE = {
  name: 'Maximally Central',
  quad: [[0, 0], [1, 0], [1, 1], [0, 1]],
  path: [[0.2, 0.5], [0.5, 0.5], [0.8, 0.5]],
  expected: {
    insideQ: true,
    centralityMin: 0.9, // Very close to centroid
    boundaryProxMax: 0.2
  }
};

/**
 * Non-convex quad (not actually convex - tests edge cases).
 */
const SKEWED_QUAD_STANCE = {
  name: 'Skewed Quadrilateral',
  quad: [[0, 0], [1.5, 0.2], [0.8, 1], [0, 0.8]],
  path: [[0.3, 0.4], [0.6, 0.5], [0.7, 0.6]],
  expected: {
    insideQ: true,
    compressionRange: [0.2, 2.0]
  }
};

/**
 * Degenerate path (L = E = R).
 */
const DEGENERATE_PATH_STANCE = {
  name: 'Degenerate Path',
  quad: [[0, 0], [1, 0], [1, 1], [0, 1]],
  path: [[0.5, 0.5], [0.5, 0.5], [0.5, 0.5]],
  expected: {
    insideQ: true,
    compressionUndefined: true, // 0/0 case
    deflectionUndefined: true
  }
};

/**
 * All stance fixtures as array for iteration.
 */
const ALL_STANCES = [
  DEFAULT_STANCE,
  HIGH_COMPRESSION_STANCE,
  HIGH_DEFLECTION_STANCE,
  OUTSIDE_Q_STANCE,
  BOUNDARY_STANCE,
  CENTRAL_STANCE,
  SKEWED_QUAD_STANCE,
  DEGENERATE_PATH_STANCE
];

module.exports = {
  DEFAULT_STANCE,
  HIGH_COMPRESSION_STANCE,
  HIGH_DEFLECTION_STANCE,
  OUTSIDE_Q_STANCE,
  BOUNDARY_STANCE,
  CENTRAL_STANCE,
  SKEWED_QUAD_STANCE,
  DEGENERATE_PATH_STANCE,
  ALL_STANCES
};
