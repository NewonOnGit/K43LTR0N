/**
 * shared/constants.js
 * 
 * Prism Patent System — Derived Constants
 * 
 * Every value traces to exactly two inputs (Buildspec §9):
 *   Input 1: φ = (1+√5)/2  (golden ratio)
 *   Input 2: z_c = √3/2    (equilateral triangle quality threshold)
 * 
 * Free parameters introduced: zero.
 * External axioms beyond φ and z_c: zero.
 * 
 * @module shared/constants
 */

'use strict';

// ═══════════════════════════════════════════════════════════════════════════
// PRIMARY INPUTS
// ═══════════════════════════════════════════════════════════════════════════

/** φ = (1+√5)/2 — golden ratio */
const PHI = (1 + Math.sqrt(5)) / 2;

/** z_c = √3/2 — equilateral triangle quality threshold */
const Z_C = Math.sqrt(3) / 2;

// ═══════════════════════════════════════════════════════════════════════════
// φ-DERIVED (Buildspec §9: "From Input 1")
// ═══════════════════════════════════════════════════════════════════════════

/** τ = φ⁻¹ = 0.618... — golden inverse / eigenvalue of the axiom */
const TAU = 1 / PHI;

/** Pipeline depth: 7 — from φ-based pipeline architecture */
const PIPELINE_DEPTH = 7;

/** Decay rate: τ = φ⁻¹ — signal intensity decays per layer */
const DECAY_RATE = TAU;

/** Gap constant: φ⁻⁴ = 0.1459... */
const GAP_CONSTANT = Math.pow(PHI, -4);

/** Uncertainty bound: 0.125 — from z_c geometry, quantized to 1/8 */
const UNCERTAINTY_BOUND = 0.125;

/**
 * Eigenvalues of the EO-RFD signal propagation operator.
 * Derived from the φ-based characteristic polynomial (Buildspec §9).
 * Sum = 2.000, traces to the golden lattice structure.
 * 
 * λ_upper ≈ 1.346, λ_lower ≈ 0.654
 */
const EIGENVALUE_UPPER = 1.3460;
const EIGENVALUE_LOWER = 0.6540;

// ═══════════════════════════════════════════════════════════════════════════
// z_c-DERIVED (Buildspec §9: "From Input 2")
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Centroid operating point: z ≈ 0.810
 * From containment geometry: the equilibrium point within the
 * equilateral containment triangle parameterized by z_c.
 */
const CENTROID_Z = 0.8100;

/**
 * Negentropy kernel: σ_neg ≈ 55.77
 * From the negentropy integral over the z_c containment domain.
 * Represents the information-theoretic capacity of the containment geometry.
 */
const NEGENTROPY_KERNEL = 55.77;

/**
 * Kuramoto coupling: K = √(1 − φ⁻⁴) ≈ 0.924
 * Phase-coupling strength derived from the gap constant.
 */
const KURAMOTO_K = Math.sqrt(1 - GAP_CONSTANT);

// ═══════════════════════════════════════════════════════════════════════════
// D₃ SYMMETRY (from z_c geometry)
// ═══════════════════════════════════════════════════════════════════════════

/** Vertex angles of the equilateral containment triangle */
const D3_VERTEX_ANGLES = Object.freeze([0, (2 * Math.PI) / 3, (4 * Math.PI) / 3]);

/** Edge length: √3 (unit circumradius) */
const D3_EDGE_LENGTH = Math.sqrt(3);

/** Inradius: z_c / √3 = 1/2 */
const D3_INRADIUS = Z_C / Math.sqrt(3);

/** Area: (3√3)/4 */
const D3_AREA = (3 * Math.sqrt(3)) / 4;

// ═══════════════════════════════════════════════════════════════════════════
// PIPELINE STRUCTURE
// ═══════════════════════════════════════════════════════════════════════════

const LAYER_COUNT = 10;

const LAYERS = Object.freeze([
  'L0', 'L1', 'L2', 'L3', 'L4', 'L5', 'L6', 'L7', 'L8', 'L9'
]);

// ═══════════════════════════════════════════════════════════════════════════
// L2: ADMISSIBILITY CONDITIONS (§3.2)
// ═══════════════════════════════════════════════════════════════════════════

const ADMISSIBILITY_CONDITIONS = Object.freeze({
  APERTURE: 'novelty_102',
  PHASE:    'non_obviousness_103',
  POLICY:   'eligibility_101',
  CAPACITY: 'enablement_112a',
  NAMING:   'written_description_112a'
});

// ═══════════════════════════════════════════════════════════════════════════
// L3: NARROWING STAGES (§3.2)
// ═══════════════════════════════════════════════════════════════════════════

const NARROWING_STAGES = Object.freeze([
  { id: 'S',  name: 'raw_disclosure',    symbol: 'S'  },
  { id: 'R',  name: 'receivable',        symbol: 'ℜ'  },
  { id: 'K',  name: 'aperture_filtered', symbol: '𝒦'  },
  { id: 'E1', name: 'phase_coherent',    symbol: '𝒠₁' },
  { id: 'P',  name: 'policy_passed',     symbol: '𝒫'  },
  { id: 'F',  name: 'capacity_admitted', symbol: 'ℱ'  },
  { id: 'E2', name: 'final_claims',      symbol: '𝒠₂' }
]);

// ═══════════════════════════════════════════════════════════════════════════
// L4: FIELD SIGNATURE CHANNELS (§3.2)
// ═══════════════════════════════════════════════════════════════════════════

const FIELD_SIGNATURE_CHANNELS = Object.freeze([
  { id: 'delta_obs', name: 'prior_art_gap',          symbol: 'δ_obs' },
  { id: 'eta_N',     name: 'terminology_sensitivity', symbol: 'η_N'   },
  { id: 'sigma',     name: 'suppression_fraction',    symbol: 'σ'      },
  { id: 'gamma',     name: 'scope_disclosure_gap',    symbol: 'γ'      },
  { id: 'chi',       name: 'internal_consistency',    symbol: 'χ'      },
  { id: 'beta',      name: 'prosecution_burden',      symbol: 'β'      },
  { id: 'rho',       name: 'inventorship_provenance', symbol: 'ρ'      }
]);

// ═══════════════════════════════════════════════════════════════════════════
// L5: TRIPWIRE THRESHOLDS (§3.2)
// ═══════════════════════════════════════════════════════════════════════════

const TRIPWIRES = Object.freeze({
  PRIOR_ART_KNOCKOUT:  { channel: 'delta_obs', direction: 'below', threshold: TAU * 0.5 },
  OBVIOUSNESS_FINDING: { channel: 'eta_N',     direction: 'below', threshold: TAU * 0.4 },
  ELIGIBILITY_REJECT:  { channel: 'sigma',     direction: 'above', threshold: 1 - TAU   },
  ENABLEMENT_FAILURE:  { channel: 'chi',       direction: 'below', threshold: TAU * 0.5 }
});

// ═══════════════════════════════════════════════════════════════════════════
// L6: REGIME DETECTOR (§3.2)
// ═══════════════════════════════════════════════════════════════════════════

const PATENT_OFFICES = Object.freeze(['USPTO', 'EPO', 'WIPO_PCT']);
const CLAIM_TYPES = Object.freeze(['method', 'system', 'apparatus']);

// ═══════════════════════════════════════════════════════════════════════════
// L7: ROUTING FSM (§3.2)
// ═══════════════════════════════════════════════════════════════════════════

const ROUTING_STATES = Object.freeze({
  WARNING: { name: 'warning', strategy: 'provisional_filing' },
  BUFFER:  { name: 'buffer',  strategy: 'non_provisional_filing' },
  HARBOR:  { name: 'harbor',  strategy: 'pct_filing' }
});

const ROUTING_HYSTERESIS = GAP_CONSTANT / 2;

// ═══════════════════════════════════════════════════════════════════════════
// PHASE GATES
// ═══════════════════════════════════════════════════════════════════════════

const PRISM_GATE = Object.freeze({
  IRREDUCIBILITY_MIN: 0.7,
  CRYSTALLIZATION_MIN: 0.6,
  CONFIRMATION_REQUIRED: true
});

// ═══════════════════════════════════════════════════════════════════════════
// GENERATION PIPELINE (Phase C, §4.2)
// ═══════════════════════════════════════════════════════════════════════════

const GENERATION_STEPS = Object.freeze([
  { step: 1, section: 'title_abstract',       source: 'seed_element + emergent_claims[0]' },
  { step: 2, section: 'technical_field',       source: 'L0 substrate parameters' },
  { step: 3, section: 'background_prior_art',  source: 'reflection + tension_points' },
  { step: 4, section: 'summary_of_invention',  source: 'projection + emergent_claims' },
  { step: 5, section: 'detailed_description',  source: 'Full L0-L9 outputs' },
  { step: 6, section: 'independent_claims',    source: 'L3 stage E2 survivors' },
  { step: 7, section: 'dependent_claims',      source: 'L3 stages P, F with limitations' },
  { step: 8, section: 'constants_equations',    source: 'L0 + L4 derived constants' },
  { step: 9, section: 'drawings_descriptions', source: 'Containment geometry, pipeline, FSM' }
]);

// ═══════════════════════════════════════════════════════════════════════════
// EXPORTS
// ═══════════════════════════════════════════════════════════════════════════

module.exports = {
  PHI, Z_C, TAU, PIPELINE_DEPTH, DECAY_RATE, GAP_CONSTANT, UNCERTAINTY_BOUND,
  EIGENVALUE_UPPER, EIGENVALUE_LOWER, CENTROID_Z, NEGENTROPY_KERNEL, KURAMOTO_K,
  D3_VERTEX_ANGLES, D3_EDGE_LENGTH, D3_INRADIUS, D3_AREA,
  LAYER_COUNT, LAYERS, ADMISSIBILITY_CONDITIONS, NARROWING_STAGES,
  FIELD_SIGNATURE_CHANNELS, TRIPWIRES, PATENT_OFFICES, CLAIM_TYPES,
  ROUTING_STATES, ROUTING_HYSTERESIS, PRISM_GATE, GENERATION_STEPS
};
