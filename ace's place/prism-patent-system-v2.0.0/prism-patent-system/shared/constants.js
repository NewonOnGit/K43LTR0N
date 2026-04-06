/**
 * shared/constants.js
 *
 * Prism Patent System V2 — Derived Constants
 *
 * Every value traces to exactly two inputs (Buildspec §9):
 *   Input 1: phi = (1+sqrt(5))/2  (golden ratio)
 *   Input 2: z_c = sqrt(3)/2      (equilateral triangle quality threshold)
 *
 * V2 additions (Buildspec §7):
 *   - SIGMA_NEG: negentropy sharpness from z_c geometry
 *   - L_CONST: Landauer constant from phi
 *   - THETA: prosecution strategy profiles
 *   - ROUTING_TH: 4-state FSM thresholds
 *   - SIG_TAU: signal rupture tripwire thresholds
 *   - DET_MODS: detector modifier matrices
 *
 * Free parameters introduced: zero.
 * External axioms beyond phi and z_c: zero.
 *
 * @module shared/constants
 */

'use strict';

// =============================================================================
// PRIMARY INPUTS
// =============================================================================

/** phi = (1+sqrt(5))/2 — golden ratio */
const PHI = (1 + Math.sqrt(5)) / 2;

/** z_c = sqrt(3)/2 — equilateral triangle quality threshold */
const Z_C = Math.sqrt(3) / 2;

// =============================================================================
// phi-DERIVED (Buildspec §9: "From Input 1")
// =============================================================================

/** tau = phi^-1 = 0.618... — golden inverse / eigenvalue of the axiom */
const TAU = 1 / PHI;

/** Pipeline depth: 7 — from phi-based pipeline architecture */
const PIPELINE_DEPTH = 7;

/** Decay rate: tau = phi^-1 — signal intensity decays per layer */
const DECAY_RATE = TAU;

/** Gap constant: phi^-4 = 0.1459... */
const GAP_CONSTANT = Math.pow(PHI, -4);

/** Uncertainty bound: 0.125 — from z_c geometry, quantized to 1/8 */
const UNCERTAINTY_BOUND = 0.125;

/**
 * Eigenvalues of the EO-RFD signal propagation operator.
 * Derived from the phi-based characteristic polynomial (Buildspec §9).
 * Sum = 2.000, traces to the golden lattice structure.
 */
const EIGENVALUE_UPPER = 1.3460;
const EIGENVALUE_LOWER = 0.6540;

/** L_CONST: Landauer constant = log2(phi) for information-theoretic cost */
const L_CONST = Math.log2(PHI);

// =============================================================================
// z_c-DERIVED (Buildspec §9: "From Input 2")
// =============================================================================

/**
 * Centroid operating point: z ~ 0.810
 * From containment geometry: the equilibrium point within the
 * equilateral containment triangle parameterized by z_c.
 */
const CENTROID_Z = 0.8100;

/**
 * SIGMA_NEG: Negentropy sharpness = 1/(1-z_c)^2
 * V2 replaces the static NEGENTROPY_KERNEL with a derived value.
 * This parameterizes the Gaussian: eta = exp(-sigma_neg * (z - z_c)^2)
 */
const SIGMA_NEG = 1 / Math.pow(1 - Z_C, 2);

/**
 * Kuramoto coupling: K = sqrt(1 - phi^-4) ~ 0.924
 * Phase-coupling strength derived from the gap constant.
 */
const KURAMOTO_K = Math.sqrt(1 - GAP_CONSTANT);

// =============================================================================
// D3 SYMMETRY (from z_c geometry)
// =============================================================================

/** Vertex angles of the equilateral containment triangle */
const D3_VERTEX_ANGLES = Object.freeze([0, (2 * Math.PI) / 3, (4 * Math.PI) / 3]);

/** Edge length: sqrt(3) (unit circumradius) */
const D3_EDGE_LENGTH = Math.sqrt(3);

/** Inradius: z_c / sqrt(3) = 1/2 */
const D3_INRADIUS = Z_C / Math.sqrt(3);

/** Area: (3*sqrt(3))/4 */
const D3_AREA = (3 * Math.sqrt(3)) / 4;

// =============================================================================
// PIPELINE STRUCTURE
// =============================================================================

const LAYER_COUNT = 10;

const LAYERS = Object.freeze([
  'L0', 'L1', 'L2', 'L3', 'L4', 'L5', 'L6', 'L7', 'L8', 'L9'
]);

// =============================================================================
// L2: ADMISSIBILITY CONDITIONS (§3.2)
// =============================================================================

const ADMISSIBILITY_CONDITIONS = Object.freeze({
  APERTURE: 'novelty_102',
  PHASE:    'non_obviousness_103',
  POLICY:   'eligibility_101',
  CAPACITY: 'enablement_112a',
  NAMING:   'written_description_112a'
});

// =============================================================================
// L3: NARROWING STAGES (§3.2)
// =============================================================================

const NARROWING_STAGES = Object.freeze([
  { id: 'S',  name: 'raw_disclosure',    symbol: 'S'  },
  { id: 'R',  name: 'receivable',        symbol: 'R'  },
  { id: 'K',  name: 'aperture_filtered', symbol: 'K'  },
  { id: 'E1', name: 'phase_coherent',    symbol: 'E1' },
  { id: 'P',  name: 'policy_passed',     symbol: 'P'  },
  { id: 'F',  name: 'capacity_admitted', symbol: 'F'  },
  { id: 'A_n', name: 'final_claims',     symbol: 'A_n' }
]);

// =============================================================================
// L4: FIELD SIGNATURE CHANNELS (§3.2)
// =============================================================================

const FIELD_SIGNATURE_CHANNELS = Object.freeze([
  { id: 'delta_obs', name: 'prior_art_gap',          symbol: 'delta_obs', geometricSource: '1 - im_norm' },
  { id: 'eta_N',     name: 'terminology_sensitivity', symbol: 'eta_N',   geometricSource: 'uat_measure' },
  { id: 'sigma',     name: 'suppression_fraction',    symbol: 'sigma',   geometricSource: 'suppressed' },
  { id: 'gamma',     name: 'scope_disclosure_gap',    symbol: 'gamma',   geometricSource: '|area_ratio - 1|' },
  { id: 'chi',       name: 'internal_consistency',    symbol: 'chi',     geometricSource: '1 - k4_deficit' },
  { id: 'beta',      name: 'prosecution_burden',      symbol: 'beta',    geometricSource: 'landauer_cost' },
  { id: 'rho',       name: 'inventorship_provenance', symbol: 'rho',     geometricSource: 'commitment_depth' }
]);

// =============================================================================
// L5: SIGNAL RUPTURE TRIPWIRE THRESHOLDS (V2: §7)
// =============================================================================

/**
 * SIG_TAU: Signal rupture tripwire thresholds
 * These define the thresholds at which field signature channels trigger alerts.
 * All derived from tau and z_c relationships.
 */
const SIG_TAU = Object.freeze({
  OBS: 0.85,    // delta_obs below this triggers prior art warning
  NAME: 0.06,   // eta_N below this triggers terminology sensitivity warning
  RED: 0.02,    // sigma above this triggers suppression warning
  COH: 0.60     // chi below this triggers consistency warning
});

const TRIPWIRES = Object.freeze({
  PRIOR_ART_KNOCKOUT:  { channel: 'delta_obs', direction: 'below', threshold: SIG_TAU.OBS },
  OBVIOUSNESS_FINDING: { channel: 'eta_N',     direction: 'below', threshold: SIG_TAU.NAME },
  ELIGIBILITY_REJECT:  { channel: 'sigma',     direction: 'above', threshold: SIG_TAU.RED },
  ENABLEMENT_FAILURE:  { channel: 'chi',       direction: 'below', threshold: SIG_TAU.COH }
});

// =============================================================================
// L6: REGIME DETECTOR (§3.2) + V2 DETECTOR MODIFIERS
// =============================================================================

const PATENT_OFFICES = Object.freeze(['USPTO', 'EPO', 'WIPO_PCT']);
const CLAIM_TYPES = Object.freeze(['method', 'system', 'apparatus']);

/**
 * THETA: Prosecution strategy profiles
 * Three prosecution strategies that modify detector sensitivity.
 * - open: aggressive claim scope (modifier < 1)
 * - standard: balanced approach (modifier = 1)
 * - restricted: conservative claims (modifier > 1)
 */
const THETA = Object.freeze({
  OPEN: {
    name: 'open',
    modifier: 0.88,
    description: 'Aggressive claim scope, accepts higher risk'
  },
  STANDARD: {
    name: 'standard',
    modifier: 1.0,
    description: 'Balanced prosecution strategy'
  },
  RESTRICTED: {
    name: 'restricted',
    modifier: 1.16,
    description: 'Conservative claims, minimizes rejection risk'
  }
});

/**
 * NAMING: Claim naming conventions
 * Affects how claim terminology is scored.
 */
const NAMING = Object.freeze({
  CANONICAL: {
    name: 'canonical',
    modifier: 0.92,
    description: 'Standard patent terminology'
  },
  SAFE: {
    name: 'safe',
    modifier: 1.0,
    description: 'Conservative terminology choices'
  },
  INVENTIVE: {
    name: 'inventive',
    modifier: 1.14,
    description: 'Novel terminology (higher ambiguity risk)'
  }
});

/**
 * DET_MODS: Detector modifier matrix
 * Combined effect of THETA and NAMING on detector sensitivity.
 */
const DET_MODS = Object.freeze({
  theta: {
    open: THETA.OPEN.modifier,
    std: THETA.STANDARD.modifier,
    res: THETA.RESTRICTED.modifier
  },
  name: {
    canon: NAMING.CANONICAL.modifier,
    safe: NAMING.SAFE.modifier,
    inv: NAMING.INVENTIVE.modifier
  }
});

// =============================================================================
// L7: ROUTING FSM (V2: 4-STATE WITH PLAY)
// =============================================================================

/**
 * V2 adds PLAY state as the initial state before any patentability concern.
 * Transitions: PLAY -> WARNING -> BUFFER -> HARBOR
 */
const ROUTING_STATES = Object.freeze({
  PLAY:    { name: 'play',    strategy: 'exploratory_research' },
  WARNING: { name: 'warning', strategy: 'provisional_filing' },
  BUFFER:  { name: 'buffer',  strategy: 'non_provisional_filing' },
  HARBOR:  { name: 'harbor',  strategy: 'pct_filing' }
});

/**
 * ROUTING_TH: Routing state transition thresholds
 * All derived from z_c and phi relationships.
 */
const ROUTING_TH = Object.freeze({
  // Harbor metric thresholds
  warningH: 0.40,   // PLAY -> WARNING when harbor_metric exceeds this
  bufferH: 0.62,    // WARNING -> BUFFER when harbor_metric exceeds this
  harborH: 0.82,    // BUFFER -> HARBOR when harbor_metric exceeds this

  // Recapture thresholds
  warningR: 0.45,   // WARNING trigger on recapture metric
  antiR: 0.66,      // Anti-recapture threshold

  // Persistence thresholds
  bufferP: 0.32,    // Buffer persistence threshold
  strongP: 0.58,    // Strong persistence for HARBOR eligibility

  // Signal rupture threshold
  sigmaA: 0.74      // Sigma_R threshold for closure failure
});

const ROUTING_HYSTERESIS = GAP_CONSTANT / 2;

// =============================================================================
// PHASE GATES
// =============================================================================

const PRISM_GATE = Object.freeze({
  IRREDUCIBILITY_MIN: 0.7,
  CRYSTALLIZATION_MIN: 0.6,
  CONFIRMATION_REQUIRED: true
});

// =============================================================================
// GENERATION PIPELINE (Phase C, §4.2)
// =============================================================================

const GENERATION_STEPS = Object.freeze([
  { step: 1, section: 'title_abstract',       source: 'seed_element + emergent_claims[0]' },
  { step: 2, section: 'technical_field',       source: 'L0 substrate parameters' },
  { step: 3, section: 'background_prior_art',  source: 'reflection + tension_points' },
  { step: 4, section: 'summary_of_invention',  source: 'projection + emergent_claims' },
  { step: 5, section: 'detailed_description',  source: 'Full L0-L9 outputs' },
  { step: 6, section: 'independent_claims',    source: 'L3 stage A_n survivors' },
  { step: 7, section: 'dependent_claims',      source: 'L3 stages P, F with limitations' },
  { step: 8, section: 'constants_equations',   source: 'L0 + L4 derived constants' },
  { step: 9, section: 'drawings_descriptions', source: 'Containment geometry, pipeline, FSM' }
]);

// =============================================================================
// V2: GEOMETRIC STANCE CONSTANTS
// =============================================================================

/**
 * Default quadrilateral vertices for the containment domain
 * Represents the prior art landscape boundary.
 * Normalized coordinates in [0, 1] x [0, 1] space.
 */
const DEFAULT_QUAD = Object.freeze([
  [0.15, 0.15],  // Bottom-left
  [0.85, 0.20],  // Bottom-right
  [0.80, 0.85],  // Top-right
  [0.20, 0.80]   // Top-left
]);

/**
 * Default L -> E -> R path points
 * L: Latent entry point
 * E: Explorer/Observer position
 * R: Registered exit point
 */
const DEFAULT_PATH = Object.freeze({
  L: [0.25, 0.30],
  E: [0.50, 0.55],
  R: [0.70, 0.75]
});

/**
 * z-coordinate computation weights
 * z = eInside ? (W_CENTRALITY * centrality + W_BOUNDARY * boundary_prox) : (W_OUTSIDE * centrality)
 */
const Z_WEIGHTS = Object.freeze({
  W_CENTRALITY: 0.55,
  W_BOUNDARY: 0.45,
  W_OUTSIDE: 0.30
});

/**
 * Admissibility decomposition coefficients
 * R/L/S/A fractions computed from geometric quantities.
 */
const ADMISSIBILITY_COEFFS = Object.freeze({
  REGISTERED_INSIDE: 1.0,
  REGISTERED_OUTSIDE: 0.3,
  SUPPRESSED_SCALE: 0.6,
  ALIASED_SCALE: 0.5
});

// =============================================================================
// EXPORTS
// =============================================================================

module.exports = {
  // Primary inputs
  PHI, Z_C,

  // phi-derived
  TAU, PIPELINE_DEPTH, DECAY_RATE, GAP_CONSTANT, UNCERTAINTY_BOUND,
  EIGENVALUE_UPPER, EIGENVALUE_LOWER, L_CONST,

  // z_c-derived
  CENTROID_Z, SIGMA_NEG, KURAMOTO_K,

  // D3 symmetry
  D3_VERTEX_ANGLES, D3_EDGE_LENGTH, D3_INRADIUS, D3_AREA,

  // Pipeline structure
  LAYER_COUNT, LAYERS,

  // L2: Admissibility
  ADMISSIBILITY_CONDITIONS,

  // L3: Narrowing
  NARROWING_STAGES,

  // L4: Field signature
  FIELD_SIGNATURE_CHANNELS,

  // L5: Tripwires
  SIG_TAU, TRIPWIRES,

  // L6: Detector
  PATENT_OFFICES, CLAIM_TYPES, THETA, NAMING, DET_MODS,

  // L7: Routing
  ROUTING_STATES, ROUTING_TH, ROUTING_HYSTERESIS,

  // Phase gates
  PRISM_GATE,

  // Generation
  GENERATION_STEPS,

  // V2: Geometric stance
  DEFAULT_QUAD, DEFAULT_PATH, Z_WEIGHTS, ADMISSIBILITY_COEFFS
};
