/**
 * shared/vec.js
 *
 * Vector Math Utilities for Geometric Stance Engine
 *
 * All functions operate on 2D points represented as [x, y] arrays.
 * This module provides the geometric primitives required by stance-engine.js.
 *
 * @module shared/vec
 */

'use strict';

/**
 * Subtract two vectors: a - b
 * @param {number[]} a - First vector [x, y]
 * @param {number[]} b - Second vector [x, y]
 * @returns {number[]} Result vector
 */
function sub(a, b) {
  return [a[0] - b[0], a[1] - b[1]];
}

/**
 * Add two vectors: a + b
 * @param {number[]} a - First vector [x, y]
 * @param {number[]} b - Second vector [x, y]
 * @returns {number[]} Result vector
 */
function add(a, b) {
  return [a[0] + b[0], a[1] + b[1]];
}

/**
 * Scale a vector by a scalar: s * v
 * @param {number[]} v - Vector [x, y]
 * @param {number} s - Scalar
 * @returns {number[]} Scaled vector
 */
function scale(v, s) {
  return [v[0] * s, v[1] * s];
}

/**
 * Dot product of two vectors: a . b
 * @param {number[]} a - First vector [x, y]
 * @param {number[]} b - Second vector [x, y]
 * @returns {number} Scalar dot product
 */
function dot(a, b) {
  return a[0] * b[0] + a[1] * b[1];
}

/**
 * Euclidean norm (magnitude) of a vector: ||v||
 * @param {number[]} v - Vector [x, y]
 * @returns {number} Magnitude
 */
function norm(v) {
  return Math.sqrt(v[0] * v[0] + v[1] * v[1]);
}

/**
 * Normalize a vector to unit length
 * Returns [0, 0] if the input is the zero vector
 * @param {number[]} v - Vector [x, y]
 * @returns {number[]} Unit vector
 */
function normalize(v) {
  const n = norm(v);
  if (n === 0) return [0, 0];
  return [v[0] / n, v[1] / n];
}

/**
 * 2D cross product (z-component of 3D cross with z=0)
 * Returns the signed area of the parallelogram spanned by a and b
 * @param {number[]} a - First vector [x, y]
 * @param {number[]} b - Second vector [x, y]
 * @returns {number} Scalar cross product (positive if b is counterclockwise from a)
 */
function cross2d(a, b) {
  return a[0] * b[1] - a[1] * b[0];
}

/**
 * Linear interpolation between two points
 * @param {number[]} a - Start point [x, y]
 * @param {number[]} b - End point [x, y]
 * @param {number} t - Interpolation parameter (0 = a, 1 = b)
 * @returns {number[]} Interpolated point
 */
function lerp(a, b, t) {
  return [
    a[0] + (b[0] - a[0]) * t,
    a[1] + (b[1] - a[1]) * t
  ];
}

/**
 * Angle between two vectors in radians
 * Returns 0 for zero vectors
 * @param {number[]} a - First vector [x, y]
 * @param {number[]} b - Second vector [x, y]
 * @returns {number} Angle in radians [0, PI]
 */
function angle(a, b) {
  const na = norm(a);
  const nb = norm(b);
  if (na === 0 || nb === 0) return 0;
  const cosTheta = dot(a, b) / (na * nb);
  // Clamp to [-1, 1] to handle floating point errors
  return Math.acos(Math.max(-1, Math.min(1, cosTheta)));
}

/**
 * Rotate a vector 90 degrees counterclockwise
 * @param {number[]} v - Vector [x, y]
 * @returns {number[]} Rotated vector
 */
function rot90(v) {
  return [-v[1], v[0]];
}

/**
 * Rotate a vector by an arbitrary angle (counterclockwise)
 * @param {number[]} v - Vector [x, y]
 * @param {number} theta - Angle in radians
 * @returns {number[]} Rotated vector
 */
function rotate(v, theta) {
  const c = Math.cos(theta);
  const s = Math.sin(theta);
  return [
    v[0] * c - v[1] * s,
    v[0] * s + v[1] * c
  ];
}

/**
 * Distance between two points
 * @param {number[]} a - First point [x, y]
 * @param {number[]} b - Second point [x, y]
 * @returns {number} Euclidean distance
 */
function dist(a, b) {
  return norm(sub(a, b));
}

/**
 * Project vector a onto vector b
 * Returns the component of a in the direction of b
 * @param {number[]} a - Vector to project
 * @param {number[]} b - Vector to project onto
 * @returns {number[]} Projection of a onto b
 */
function project(a, b) {
  const bn = norm(b);
  if (bn === 0) return [0, 0];
  const scalar = dot(a, b) / (bn * bn);
  return scale(b, scalar);
}

/**
 * Perpendicular component of a relative to b
 * Returns the component of a perpendicular to b
 * @param {number[]} a - Vector
 * @param {number[]} b - Reference vector
 * @returns {number[]} Perpendicular component
 */
function perp(a, b) {
  return sub(a, project(a, b));
}

/**
 * Check if two line segments intersect, return intersection point if they do
 * Segment 1: p1 to p2
 * Segment 2: p3 to p4
 * @param {number[]} p1 - Start of segment 1
 * @param {number[]} p2 - End of segment 1
 * @param {number[]} p3 - Start of segment 2
 * @param {number[]} p4 - End of segment 2
 * @returns {number[]|null} Intersection point [x, y] or null if no intersection
 */
function segSegIntersect(p1, p2, p3, p4) {
  const d1 = sub(p2, p1);
  const d2 = sub(p4, p3);
  const d3 = sub(p3, p1);

  const cross = cross2d(d1, d2);

  // Parallel or collinear segments
  if (Math.abs(cross) < 1e-10) return null;

  const t = cross2d(d3, d2) / cross;
  const u = cross2d(d3, d1) / cross;

  // Check if intersection is within both segments
  if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
    return lerp(p1, p2, t);
  }

  return null;
}

/**
 * Compute the centroid of a polygon
 * @param {number[][]} vertices - Array of vertices [[x,y], ...]
 * @returns {number[]} Centroid [x, y]
 */
function polygonCentroid(vertices) {
  const n = vertices.length;
  if (n === 0) return [0, 0];

  let cx = 0, cy = 0;
  for (const v of vertices) {
    cx += v[0];
    cy += v[1];
  }
  return [cx / n, cy / n];
}

/**
 * Compute the signed area of a polygon (positive if counterclockwise)
 * Uses the shoelace formula
 * @param {number[][]} vertices - Array of vertices [[x,y], ...] in order
 * @returns {number} Signed area
 */
function polygonArea(vertices) {
  const n = vertices.length;
  if (n < 3) return 0;

  let area = 0;
  for (let i = 0; i < n; i++) {
    const j = (i + 1) % n;
    area += vertices[i][0] * vertices[j][1];
    area -= vertices[j][0] * vertices[i][1];
  }
  return area / 2;
}

/**
 * Check if a point is inside a convex polygon
 * Uses cross product sign consistency
 * @param {number[]} point - Point to test [x, y]
 * @param {number[][]} vertices - Polygon vertices (convex, counterclockwise)
 * @returns {boolean} True if point is inside or on the boundary
 */
function pointInConvexPolygon(point, vertices) {
  const n = vertices.length;
  if (n < 3) return false;

  let sign = null;
  for (let i = 0; i < n; i++) {
    const j = (i + 1) % n;
    const edge = sub(vertices[j], vertices[i]);
    const toPoint = sub(point, vertices[i]);
    const cross = cross2d(edge, toPoint);

    if (sign === null) {
      sign = cross >= 0;
    } else if ((cross >= 0) !== sign) {
      return false;
    }
  }
  return true;
}

/**
 * Compute the diagonal length of a quadrilateral (longer diagonal)
 * @param {number[][]} vertices - Four vertices [[x,y], ...]
 * @returns {number} Length of the longer diagonal
 */
function quadDiagonal(vertices) {
  if (vertices.length !== 4) return 0;
  const d1 = dist(vertices[0], vertices[2]);
  const d2 = dist(vertices[1], vertices[3]);
  return Math.max(d1, d2);
}

/**
 * Find the minimum distance from a point to a polygon boundary
 * @param {number[]} point - Point [x, y]
 * @param {number[][]} vertices - Polygon vertices
 * @returns {number} Minimum distance to boundary
 */
function pointToPolygonBoundary(point, vertices) {
  const n = vertices.length;
  if (n < 2) return Infinity;

  let minDist = Infinity;
  for (let i = 0; i < n; i++) {
    const j = (i + 1) % n;
    const d = pointToSegment(point, vertices[i], vertices[j]);
    if (d < minDist) minDist = d;
  }
  return minDist;
}

/**
 * Distance from a point to a line segment
 * @param {number[]} p - Point [x, y]
 * @param {number[]} a - Segment start [x, y]
 * @param {number[]} b - Segment end [x, y]
 * @returns {number} Distance
 */
function pointToSegment(p, a, b) {
  const ab = sub(b, a);
  const ap = sub(p, a);
  const lenSq = dot(ab, ab);

  if (lenSq === 0) return dist(p, a);

  const t = Math.max(0, Math.min(1, dot(ap, ab) / lenSq));
  const projection = add(a, scale(ab, t));
  return dist(p, projection);
}

/**
 * Split a convex polygon by a line defined by two points
 * Returns two polygons (or one if line doesn't intersect)
 * @param {number[][]} vertices - Polygon vertices
 * @param {number[]} lineP1 - First point on line
 * @param {number[]} lineP2 - Second point on line
 * @returns {Object} { poly1: vertices[], poly2: vertices[] }
 */
function splitPolygonByLine(vertices, lineP1, lineP2) {
  const n = vertices.length;
  if (n < 3) return { poly1: vertices, poly2: [] };

  const intersections = [];
  const lineDir = sub(lineP2, lineP1);

  // Find intersection points with polygon edges
  for (let i = 0; i < n; i++) {
    const j = (i + 1) % n;
    const intersection = lineSegIntersect(lineP1, lineP2, vertices[i], vertices[j]);
    if (intersection) {
      intersections.push({ point: intersection, edgeIndex: i });
    }
  }

  // Need exactly 2 intersection points to split
  if (intersections.length !== 2) {
    return { poly1: vertices, poly2: [] };
  }

  // Sort intersections by edge index
  intersections.sort((a, b) => a.edgeIndex - b.edgeIndex);

  const [int1, int2] = intersections;

  // Build two polygons
  const poly1 = [];
  const poly2 = [];

  // First polygon: from int1 to int2 along the original boundary
  poly1.push(int1.point);
  for (let i = int1.edgeIndex + 1; i <= int2.edgeIndex; i++) {
    poly1.push(vertices[i]);
  }
  poly1.push(int2.point);

  // Second polygon: from int2 to int1 (wrapping around)
  poly2.push(int2.point);
  for (let i = (int2.edgeIndex + 1) % n; i !== (int1.edgeIndex + 1) % n; i = (i + 1) % n) {
    poly2.push(vertices[i]);
  }
  poly2.push(int1.point);

  return { poly1, poly2 };
}

/**
 * Line-segment intersection (line extends infinitely, segment is bounded)
 * @param {number[]} lineP1 - First point on line
 * @param {number[]} lineP2 - Second point on line
 * @param {number[]} segP1 - Segment start
 * @param {number[]} segP2 - Segment end
 * @returns {number[]|null} Intersection point or null
 */
function lineSegIntersect(lineP1, lineP2, segP1, segP2) {
  const d1 = sub(lineP2, lineP1);
  const d2 = sub(segP2, segP1);
  const d3 = sub(segP1, lineP1);

  const cross = cross2d(d1, d2);

  if (Math.abs(cross) < 1e-10) return null;

  const u = cross2d(d3, d1) / cross;

  // Only check if intersection is within segment bounds
  if (u >= 0 && u <= 1) {
    return lerp(segP1, segP2, u);
  }

  return null;
}

module.exports = {
  sub,
  add,
  scale,
  dot,
  norm,
  normalize,
  cross2d,
  lerp,
  angle,
  rot90,
  rotate,
  dist,
  project,
  perp,
  segSegIntersect,
  polygonCentroid,
  polygonArea,
  pointInConvexPolygon,
  quadDiagonal,
  pointToPolygonBoundary,
  pointToSegment,
  splitPolygonByLine,
  lineSegIntersect
};
