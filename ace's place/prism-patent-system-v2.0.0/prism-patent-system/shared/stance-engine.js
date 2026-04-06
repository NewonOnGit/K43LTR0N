/**
 * shared/stance-engine.js
 *
 * Geometric Stance Engine — Observer Interior Architecture
 *
 * V2 introduces the geometric grounding where the observer sits INSIDE the
 * containment domain Q, and ALL EO-RFD metrics derive from the geometry
 * of that observation.
 *
 * The central insight: the inventor (observer) sits inside the prior art
 * landscape (Q), and the path from latent (L) to registered (R) passes
 * through the observer (E). The shape of that passage — compression,
 * deflection, ker/im decomposition — IS the signal.
 *
 * Buildspec §1.2, §2.3, Contract 6
 *
 * @module shared/stance-engine
 */

'use strict';

const vec = require('./vec');
const { TAU, L_CONST } = require('./constants');

/**
 * @typedef {number[]} Point - [x, y] coordinate
 */

/**
 * @typedef {Point[]} Quadrilateral - Array of 4 vertices [p0, p1, p2, p3]
 */

/**
 * @typedef {Object} PathPoints
 * @property {Point} L - Latent entry point
 * @property {Point} E - Explorer/Observer position
 * @property {Point} R - Registered exit point
 */

/**
 * @typedef {Object} FrameworkQuantities
 * @property {Quadrilateral} quad - The containment quadrilateral Q
 * @property {Point[]} pathPts - [L, E, R] path points
 * @property {Point|null} Pin - Entry intersection with boundary
 * @property {Point|null} Pout - Exit intersection with boundary
 * @property {number} lenIn - Length from L to E (or Pin to E)
 * @property {number} lenOut - Length from E to R (or E to Pout)
 * @property {number} compression - Compression ratio: lenIn / lenOut
 * @property {number} deflection - Deflection angle in radians
 * @property {number} kerNorm - Kernel component magnitude
 * @property {number} imNorm - Image component magnitude
 * @property {number} imKerRatio - im/ker ratio
 * @property {number} areaRatio - Area partition ratio
 * @property {number} area1 - First partition area (im side)
 * @property {number} area2 - Second partition area (ker side)
 * @property {boolean} eInside - Is observer E inside Q?
 * @property {number} centrality - Centrality of E within Q (0-1)
 * @property {number} boundaryProx - Boundary proximity (0-1)
 * @property {number} commitmentDepth - Logarithmic commitment metric
 * @property {number} bekensteinBound - Information-theoretic ceiling
 * @property {number} landauerCost - Thermodynamic framing cost
 * @property {number} k4Deficit - Algebraic closure deficit
 * @property {Point} centroid - Centroid of Q
 * @property {number} diagonal - Diagonal length of Q
 * @property {number} totalArea - Total area of Q
 * @property {number} uatMeasure - Undefined Accessible Territory measure
 */

/**
 * Find the first intersection point of a ray from P in direction D with the quadrilateral boundary.
 * Returns null if no intersection found.
 *
 * @param {Point} P - Ray origin
 * @param {Point} D - Ray direction (will be normalized)
 * @param {Quadrilateral} quad - The quadrilateral vertices
 * @param {boolean} forward - If true, search in positive direction; if false, search negative
 * @returns {Point|null} Intersection point or null
 */
function findRayQuadIntersection(P, D, quad, forward = true) {
  const n = quad.length;
  let bestT = forward ? Infinity : -Infinity;
  let bestPoint = null;

  for (let i = 0; i < n; i++) {
    const j = (i + 1) % n;
    const edgeStart = quad[i];
    const edgeEnd = quad[j];

    // Ray-segment intersection
    const edgeDir = vec.sub(edgeEnd, edgeStart);
    const cross = vec.cross2d(D, edgeDir);

    if (Math.abs(cross) < 1e-10) continue; // Parallel

    const delta = vec.sub(edgeStart, P);
    const t = vec.cross2d(delta, edgeDir) / cross;
    const u = vec.cross2d(delta, D) / cross;

    // Check if intersection is on the segment (u in [0,1]) and in the right direction
    if (u >= -1e-10 && u <= 1 + 1e-10) {
      if (forward && t > 1e-6 && t < bestT) {
        bestT = t;
        bestPoint = vec.add(P, vec.scale(D, t));
      } else if (!forward && t < -1e-6 && t > bestT) {
        bestT = t;
        bestPoint = vec.add(P, vec.scale(D, t));
      }
    }
  }

  return bestPoint;
}

/**
 * Find intersection points P_in and P_out where the L->E and E->R segments
 * cross the quadrilateral boundary.
 *
 * @param {Point} L - Latent point
 * @param {Point} E - Explorer point
 * @param {Point} R - Registered point
 * @param {Quadrilateral} quad - The quadrilateral
 * @returns {{Pin: Point|null, Pout: Point|null}}
 */
function findPathBoundaryIntersections(L, E, R, quad) {
  const n = quad.length;
  let Pin = null;
  let Pout = null;

  // Find P_in: intersection of L->E segment with quad boundary
  for (let i = 0; i < n; i++) {
    const j = (i + 1) % n;
    const intersection = vec.segSegIntersect(L, E, quad[i], quad[j]);
    if (intersection) {
      // If multiple intersections, take the one closest to E
      if (!Pin || vec.dist(intersection, E) < vec.dist(Pin, E)) {
        Pin = intersection;
      }
    }
  }

  // Find P_out: intersection of E->R segment with quad boundary
  for (let i = 0; i < n; i++) {
    const j = (i + 1) % n;
    const intersection = vec.segSegIntersect(E, R, quad[i], quad[j]);
    if (intersection) {
      // If multiple intersections, take the one closest to E
      if (!Pout || vec.dist(intersection, E) < vec.dist(Pout, E)) {
        Pout = intersection;
      }
    }
  }

  return { Pin, Pout };
}

/**
 * Compute the Undefined Accessible Territory (UAT) measure.
 * This quantifies the region of Q that the observer path doesn't cover.
 *
 * @param {Quadrilateral} quad - The quadrilateral
 * @param {Point} L - Latent point
 * @param {Point} E - Explorer point
 * @param {Point} R - Registered point
 * @param {boolean} eInside - Is E inside Q?
 * @returns {number} UAT measure (0-1, higher = more undefined territory)
 */
function computeUAT(quad, L, E, R, eInside) {
  if (!eInside) return 1.0; // If outside, everything is undefined

  const centroid = vec.polygonCentroid(quad);
  const diagonal = vec.quadDiagonal(quad);

  // UAT based on how off-center the path is
  const pathMidpoint = vec.lerp(L, R, 0.5);
  const pathDeviation = vec.dist(pathMidpoint, centroid) / (diagonal / 2);

  // Also consider how much of the path is inside Q
  const v1 = vec.sub(E, L);
  const v2 = vec.sub(R, E);
  const pathLength = vec.norm(v1) + vec.norm(v2);
  const coverageFactor = Math.min(1, pathLength / diagonal);

  // UAT is high when path is deviated and coverage is low
  return Math.min(1, Math.max(0, pathDeviation * (1 - coverageFactor * 0.5)));
}

/**
 * Compute all geometric framework quantities from the quadrilateral Q
 * and the L->E->R path.
 *
 * This is the main entry point for the Stance Engine.
 *
 * @param {Quadrilateral} quad - Four vertices [[x,y], ...] defining containment domain Q
 * @param {Point[]} pathPts - Three points [L, E, R] defining observer path
 * @returns {FrameworkQuantities} All computed geometric quantities
 */
function computeFramework(quad, pathPts) {
  // Validate inputs
  if (!quad || quad.length !== 4) {
    throw new Error('computeFramework: quad must have exactly 4 vertices');
  }
  if (!pathPts || pathPts.length !== 3) {
    throw new Error('computeFramework: pathPts must have exactly 3 points [L, E, R]');
  }

  const [L, E, R] = pathPts;

  // Basic geometric properties of Q
  const centroid = vec.polygonCentroid(quad);
  const diagonal = vec.quadDiagonal(quad);
  const totalArea = Math.abs(vec.polygonArea(quad));

  // Is E inside Q?
  const eInside = vec.pointInConvexPolygon(E, quad);

  // Find boundary intersections
  const { Pin, Pout } = findPathBoundaryIntersections(L, E, R, quad);

  // Compute path vectors
  const v1 = vec.sub(E, L);  // L -> E
  const v2 = vec.sub(R, E);  // E -> R

  // Path lengths (use intersection points if available)
  const effectiveStart = Pin || L;
  const effectiveEnd = Pout || R;
  const lenIn = vec.dist(effectiveStart, E);
  const lenOut = vec.dist(E, effectiveEnd);

  // Compression ratio (avoid division by zero)
  const compression = lenOut > 1e-10 ? lenIn / lenOut : (lenIn > 1e-10 ? Infinity : 1);

  // Deflection angle between v1 and v2
  const deflection = vec.angle(v1, v2);

  // ker/im decomposition
  // im component: projection of v1 onto v2 (how much of the incoming signal passes through)
  // ker component: perpendicular component (what gets blocked/transformed)
  const imNorm = Math.abs(vec.dot(vec.normalize(v1), vec.normalize(v2)));
  const kerNorm = Math.abs(vec.norm(vec.cross2d(v1, v2))) / (vec.norm(v1) * vec.norm(v2) + 1e-10);

  // im/ker ratio (signal-to-noise)
  const imKerRatio = kerNorm > 1e-10 ? imNorm / kerNorm : (imNorm > 1e-10 ? Infinity : 1);

  // Area partition: split Q by the line through Pin and Pout (or L and R if no intersections)
  let area1 = totalArea / 2;
  let area2 = totalArea / 2;

  if (Pin && Pout) {
    const split = vec.splitPolygonByLine(quad, Pin, Pout);
    area1 = Math.abs(vec.polygonArea(split.poly1));
    area2 = Math.abs(vec.polygonArea(split.poly2));
  }

  const areaRatio = Math.min(area1, area2) > 1e-10
    ? Math.max(area1, area2) / Math.min(area1, area2)
    : 1;

  // Centrality: how central is E within Q (1 = at centroid, 0 = at boundary)
  const distToCentroid = vec.dist(E, centroid);
  const maxDistFromCentroid = diagonal / 2;
  const centrality = Math.max(0, Math.min(1, 1 - distToCentroid / maxDistFromCentroid));

  // Boundary proximity: distance to nearest boundary edge
  const boundaryDist = vec.pointToPolygonBoundary(E, quad);
  const boundaryScale = diagonal / 4;
  const boundaryProx = Math.max(0, Math.min(1, boundaryDist / boundaryScale));

  // Commitment depth: logarithmic measure of compression
  // How deeply has the observer committed to a narrowing path?
  const tauSquaredInv = 1 / (TAU * TAU);
  const commitmentDepth = compression > 1
    ? Math.log(compression) / Math.log(tauSquaredInv)
    : 0;

  // Bekenstein bound: information-theoretic ceiling on claim content
  const bekensteinBound = 2 * Math.log2(2 + lenIn + lenOut);

  // Landauer cost: thermodynamic cost of claim framing changes
  const landauerCost = (1 / L_CONST) * (deflection / Math.PI);

  // K4 deficit: algebraic closure deficit of the claim set
  const k4Deficit = kerNorm + 1 / (1 + imNorm);

  // UAT measure
  const uatMeasure = computeUAT(quad, L, E, R, eInside);

  return {
    // Input geometry
    quad,
    pathPts,

    // Intersection points
    Pin,
    Pout,

    // Path metrics
    lenIn,
    lenOut,
    compression,
    deflection,

    // ker/im decomposition
    kerNorm,
    imNorm,
    imKerRatio,

    // Area partition
    areaRatio,
    area1,
    area2,

    // Observer position
    eInside,
    centrality,
    boundaryProx,

    // Derived metrics
    commitmentDepth,
    bekensteinBound,
    landauerCost,
    k4Deficit,

    // Q properties
    centroid,
    diagonal,
    totalArea,

    // UAT
    uatMeasure
  };
}

/**
 * Write all framework quantities to the SignalBus under stance.* prefix.
 *
 * @param {FrameworkQuantities} framework - Computed framework quantities
 * @param {import('./signal-bus').SignalBus} signalBus - The signal bus
 */
function writeToSignalBus(framework, signalBus) {
  signalBus.setRegister('stance.quad', framework.quad);
  signalBus.setRegister('stance.pathPts', framework.pathPts);
  signalBus.setRegister('stance.Pin', framework.Pin);
  signalBus.setRegister('stance.Pout', framework.Pout);
  signalBus.setRegister('stance.lenIn', framework.lenIn);
  signalBus.setRegister('stance.lenOut', framework.lenOut);
  signalBus.setRegister('stance.compression', framework.compression);
  signalBus.setRegister('stance.deflection', framework.deflection);
  signalBus.setRegister('stance.kerNorm', framework.kerNorm);
  signalBus.setRegister('stance.imNorm', framework.imNorm);
  signalBus.setRegister('stance.imKerRatio', framework.imKerRatio);
  signalBus.setRegister('stance.areaRatio', framework.areaRatio);
  signalBus.setRegister('stance.area1', framework.area1);
  signalBus.setRegister('stance.area2', framework.area2);
  signalBus.setRegister('stance.eInside', framework.eInside);
  signalBus.setRegister('stance.centrality', framework.centrality);
  signalBus.setRegister('stance.boundaryProx', framework.boundaryProx);
  signalBus.setRegister('stance.commitmentDepth', framework.commitmentDepth);
  signalBus.setRegister('stance.bekensteinBound', framework.bekensteinBound);
  signalBus.setRegister('stance.landauerCost', framework.landauerCost);
  signalBus.setRegister('stance.k4Deficit', framework.k4Deficit);
  signalBus.setRegister('stance.centroid', framework.centroid);
  signalBus.setRegister('stance.diagonal', framework.diagonal);
  signalBus.setRegister('stance.totalArea', framework.totalArea);
  signalBus.setRegister('stance.uatMeasure', framework.uatMeasure);

  signalBus.emit('stance.computed', {
    eInside: framework.eInside,
    compression: framework.compression,
    centrality: framework.centrality
  });
}

/**
 * Read framework quantities from the SignalBus.
 *
 * @param {import('./signal-bus').SignalBus} signalBus - The signal bus
 * @returns {FrameworkQuantities} Framework quantities from registers
 */
function readFromSignalBus(signalBus) {
  return {
    quad: signalBus.getRegister('stance.quad'),
    pathPts: signalBus.getRegister('stance.pathPts'),
    Pin: signalBus.getRegister('stance.Pin'),
    Pout: signalBus.getRegister('stance.Pout'),
    lenIn: signalBus.getRegister('stance.lenIn'),
    lenOut: signalBus.getRegister('stance.lenOut'),
    compression: signalBus.getRegister('stance.compression'),
    deflection: signalBus.getRegister('stance.deflection'),
    kerNorm: signalBus.getRegister('stance.kerNorm'),
    imNorm: signalBus.getRegister('stance.imNorm'),
    imKerRatio: signalBus.getRegister('stance.imKerRatio'),
    areaRatio: signalBus.getRegister('stance.areaRatio'),
    area1: signalBus.getRegister('stance.area1'),
    area2: signalBus.getRegister('stance.area2'),
    eInside: signalBus.getRegister('stance.eInside'),
    centrality: signalBus.getRegister('stance.centrality'),
    boundaryProx: signalBus.getRegister('stance.boundaryProx'),
    commitmentDepth: signalBus.getRegister('stance.commitmentDepth'),
    bekensteinBound: signalBus.getRegister('stance.bekensteinBound'),
    landauerCost: signalBus.getRegister('stance.landauerCost'),
    k4Deficit: signalBus.getRegister('stance.k4Deficit'),
    centroid: signalBus.getRegister('stance.centroid'),
    diagonal: signalBus.getRegister('stance.diagonal'),
    totalArea: signalBus.getRegister('stance.totalArea'),
    uatMeasure: signalBus.getRegister('stance.uatMeasure')
  };
}

module.exports = {
  computeFramework,
  writeToSignalBus,
  readFromSignalBus,
  findPathBoundaryIntersections,
  findRayQuadIntersection,
  computeUAT
};
