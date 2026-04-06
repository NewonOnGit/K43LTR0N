/**
 * layers/L3-narrowing.js
 *
 * L3: Claim Narrowing
 *
 * V2 REWRITE: Compression-cascade narrowing from geometric stance.
 * Loss at each stage derived from geometric ratios.
 *
 * Seven stages: S -> R -> K -> E1 -> P -> F -> A_n
 *
 * Reads: L2.*, eo.narrowing, prism_object
 * Writes: L3.narrowing_stages, L3.loss_operators, L3.dominant_loss
 * Emits: layer.L3.complete
 *
 * @module layers/L3-narrowing
 */

'use strict';

const { NARROWING_STAGES, TAU } = require('../shared/constants');

/**
 * @param {import('../shared/signal-bus').SignalBus} signalBus
 */
function process(signalBus) {
  const admissibilityResults = signalBus.getRegister('L2.admissibility_results');
  const prism = signalBus.getRegister('prism_object');

  // V2: Read geometric narrowing from EO bridge
  const eoNarrowing = signalBus.getRegister('eo.narrowing');
  const compression = signalBus.getRegister('stance.compression') || 1;
  const k4Deficit = signalBus.getRegister('stance.k4Deficit') || 0;

  if (!admissibilityResults || !prism) {
    signalBus.emit('layer.L3.error', { message: 'Missing L2 outputs or prism_object' });
    return;
  }

  // Build the initial pool
  const projElements = prism.projection ? prism.projection.elements : [];
  const emergentClaims = prism.emergent_claims || [];

  let pool = [
    ...projElements.map((el, i) => ({
      id: `proj_${i}`,
      text: el,
      source: 'projection',
      admissibility: null
    })),
    ...emergentClaims.map((cl, i) => ({
      id: `claim_${i}`,
      text: cl,
      source: 'emergent',
      admissibility: admissibilityResults[i] || null
    }))
  ];

  const stages = [];
  const lossOperators = [];

  // V2: Use geometric narrowing fractions to modulate filtering
  const geoS = eoNarrowing?.S || 1;
  const geoR = eoNarrowing?.R || 0.9;
  const geoK = eoNarrowing?.K || 0.8;
  const geoE1 = eoNarrowing?.E1 || 0.7;
  const geoP = eoNarrowing?.P || 0.6;
  const geoF = eoNarrowing?.F || 0.5;
  const geoAn = eoNarrowing?.A_n || 0.4;

  // Stage S: Raw disclosure pool
  stages.push({
    id: 'S',
    name: 'raw_disclosure',
    elements: [...pool],
    element_count: pool.length,
    geometric_fraction: geoS
  });

  // Stage R: Receivable (articulable as claim language)
  let prev = pool;
  // V2: Filtering threshold modulated by compression
  const receivableThreshold = Math.max(3, Math.floor(3 + compression * 0.5));
  pool = pool.filter(el => el.text.split(/\s+/).length > receivableThreshold);
  const lossR = prev.length - pool.length;
  stages.push({
    id: 'R',
    name: 'receivable',
    elements: [...pool],
    element_count: pool.length,
    geometric_fraction: geoR
  });
  lossOperators.push({ stage: 'S->R', lost: lossR, reason: 'not_articulable', geometric: 1 - geoR/geoS });

  // Stage K: Aperture-filtered (novelty)
  prev = pool;
  pool = pool.filter(el => {
    if (el.admissibility?.conditions?.APERTURE) {
      return el.admissibility.conditions.APERTURE.pass;
    }
    return true;
  });
  const lossK = prev.length - pool.length;
  stages.push({
    id: 'K',
    name: 'aperture_filtered',
    elements: [...pool],
    element_count: pool.length,
    geometric_fraction: geoK
  });
  lossOperators.push({ stage: 'R->K', lost: lossK, reason: 'novelty_failure', geometric: 1 - geoK/geoR });

  // Stage E1: Phase-coherent (non-obviousness)
  prev = pool;
  pool = pool.filter(el => {
    if (el.admissibility?.conditions?.PHASE) {
      return el.admissibility.conditions.PHASE.pass;
    }
    return true;
  });
  const lossE1 = prev.length - pool.length;
  stages.push({
    id: 'E1',
    name: 'phase_coherent',
    elements: [...pool],
    element_count: pool.length,
    geometric_fraction: geoE1
  });
  lossOperators.push({ stage: 'K->E1', lost: lossE1, reason: 'obviousness_failure', geometric: 1 - geoE1/geoK });

  // Stage P: Policy-passed (eligibility)
  prev = pool;
  pool = pool.filter(el => {
    if (el.admissibility?.conditions?.POLICY) {
      return el.admissibility.conditions.POLICY.pass;
    }
    return true;
  });
  const lossP = prev.length - pool.length;
  stages.push({
    id: 'P',
    name: 'policy_passed',
    elements: [...pool],
    element_count: pool.length,
    geometric_fraction: geoP
  });
  lossOperators.push({ stage: 'E1->P', lost: lossP, reason: 'eligibility_failure', geometric: 1 - geoP/geoE1 });

  // Stage F: Capacity-admitted (enablement)
  prev = pool;
  pool = pool.filter(el => {
    if (el.admissibility?.conditions?.CAPACITY) {
      return el.admissibility.conditions.CAPACITY.pass;
    }
    return true;
  });
  const lossF = prev.length - pool.length;
  stages.push({
    id: 'F',
    name: 'capacity_admitted',
    elements: [...pool],
    element_count: pool.length,
    geometric_fraction: geoF
  });
  lossOperators.push({ stage: 'P->F', lost: lossF, reason: 'enablement_failure', geometric: 1 - geoF/geoP });

  // Stage A_n: Final claims (written description)
  prev = pool;
  pool = pool.filter(el => {
    if (el.admissibility?.conditions?.NAMING) {
      return el.admissibility.conditions.NAMING.pass;
    }
    return true;
  });
  const lossAn = prev.length - pool.length;
  stages.push({
    id: 'A_n',
    name: 'final_claims',
    elements: [...pool],
    element_count: pool.length,
    geometric_fraction: geoAn
  });
  lossOperators.push({ stage: 'F->A_n', lost: lossAn, reason: 'description_failure', geometric: 1 - geoAn/geoF });

  // Identify dominant loss operator
  let dominantLoss = lossOperators[0];
  for (const op of lossOperators) {
    // V2: Weight by both count and geometric loss
    const effectiveLoss = op.lost + op.geometric * 10;
    const dominantEffective = dominantLoss.lost + dominantLoss.geometric * 10;
    if (effectiveLoss > dominantEffective) {
      dominantLoss = op;
    }
  }

  // V2: Also check EO-computed dominant loss
  if (eoNarrowing?.dominantLoss) {
    dominantLoss.eoSource = eoNarrowing.dominantLoss;
  }

  signalBus.setRegister('L3.narrowing_stages', stages);
  signalBus.setRegister('L3.loss_operators', lossOperators);
  signalBus.setRegister('L3.dominant_loss', dominantLoss);

  // Check for total elimination - triggers B->A feedback
  const totalElimination = stages.some((s, i) => i > 0 && s.element_count === 0);
  if (totalElimination) {
    signalBus.emit('feedback.b_to_a', {
      failure_layer: 'L3',
      failure_mode: 'total_narrowing_loss',
      details: { stages, dominantLoss, compression, k4Deficit }
    });
  }

  signalBus.emit('layer.L3.complete', {
    stageProfile: stages.map(s => ({ id: s.id, count: s.element_count, geo: s.geometric_fraction })),
    dominantLoss,
    finalClaimCount: stages[stages.length - 1].element_count,
    compressionApplied: compression
  });
}

module.exports = { process };
