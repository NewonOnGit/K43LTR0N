/**
 * layers/L3-narrowing.js
 * 
 * L3: Claim Narrowing
 * 
 * Seven-stage pipeline: S → ℜ → 𝒦 → 𝒠₁ → 𝒫 → ℱ → 𝒠₂
 * Each stage filters claims; loss operator L_i measures scope lost at each transition.
 * Dominant loss operator = primary prosecution risk.
 * 
 * Reads: L2.admissibility_results, prism_object
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

  if (!admissibilityResults || !prism) {
    signalBus.emit('layer.L3.error', { message: 'Missing L2 outputs or prism_object' });
    return;
  }

  // Start with the full disclosure pool (all claims + projection elements)
  const projElements = prism.projection ? prism.projection.elements : [];
  const emergentClaims = prism.emergent_claims || [];

  // Build the initial pool: combine projection elements + emergent claims
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

  // Stage S: Raw disclosure pool — everything the inventor disclosed
  stages.push({
    id: 'S',
    name: 'raw_disclosure',
    elements: [...pool],
    element_count: pool.length
  });

  // Stage ℜ: Receivable — elements articulable as claim language
  // Filter: elements must be specific enough (word count > 3)
  let prev = pool;
  pool = pool.filter(el => el.text.split(/\s+/).length > 3);
  const lossR = prev.length - pool.length;
  stages.push({ id: 'R', name: 'receivable', elements: [...pool], element_count: pool.length });
  lossOperators.push({ stage: 'S→R', lost: lossR, reason: 'not_articulable' });

  // Stage 𝒦: Aperture-filtered — surviving novelty analysis
  prev = pool;
  pool = pool.filter(el => {
    if (el.admissibility && el.admissibility.conditions) {
      return el.admissibility.conditions.APERTURE ? el.admissibility.conditions.APERTURE.pass : true;
    }
    return true; // projection elements without admissibility pass by default
  });
  const lossK = prev.length - pool.length;
  stages.push({ id: 'K', name: 'aperture_filtered', elements: [...pool], element_count: pool.length });
  lossOperators.push({ stage: 'R→K', lost: lossK, reason: 'novelty_failure' });

  // Stage 𝒠₁: Phase-coherent — surviving obviousness analysis
  prev = pool;
  pool = pool.filter(el => {
    if (el.admissibility && el.admissibility.conditions) {
      return el.admissibility.conditions.PHASE ? el.admissibility.conditions.PHASE.pass : true;
    }
    return true;
  });
  const lossE1 = prev.length - pool.length;
  stages.push({ id: 'E1', name: 'phase_coherent', elements: [...pool], element_count: pool.length });
  lossOperators.push({ stage: 'K→E1', lost: lossE1, reason: 'obviousness_failure' });

  // Stage 𝒫: Policy-passed — surviving eligibility analysis
  prev = pool;
  pool = pool.filter(el => {
    if (el.admissibility && el.admissibility.conditions) {
      return el.admissibility.conditions.POLICY ? el.admissibility.conditions.POLICY.pass : true;
    }
    return true;
  });
  const lossP = prev.length - pool.length;
  stages.push({ id: 'P', name: 'policy_passed', elements: [...pool], element_count: pool.length });
  lossOperators.push({ stage: 'E1→P', lost: lossP, reason: 'eligibility_failure' });

  // Stage ℱ: Capacity-admitted — within specification support
  prev = pool;
  pool = pool.filter(el => {
    if (el.admissibility && el.admissibility.conditions) {
      return el.admissibility.conditions.CAPACITY ? el.admissibility.conditions.CAPACITY.pass : true;
    }
    return true;
  });
  const lossF = prev.length - pool.length;
  stages.push({ id: 'F', name: 'capacity_admitted', elements: [...pool], element_count: pool.length });
  lossOperators.push({ stage: 'P→F', lost: lossF, reason: 'enablement_failure' });

  // Stage 𝒠₂: Final claims — surviving all five gates
  prev = pool;
  pool = pool.filter(el => {
    if (el.admissibility && el.admissibility.conditions) {
      return el.admissibility.conditions.NAMING ? el.admissibility.conditions.NAMING.pass : true;
    }
    return true;
  });
  const lossE2 = prev.length - pool.length;
  stages.push({ id: 'E2', name: 'final_claims', elements: [...pool], element_count: pool.length });
  lossOperators.push({ stage: 'F→E2', lost: lossE2, reason: 'description_failure' });

  // Identify dominant loss operator: the stage with the highest loss
  let dominantLoss = lossOperators[0];
  for (const op of lossOperators) {
    if (op.lost > dominantLoss.lost) {
      dominantLoss = op;
    }
  }

  signalBus.setRegister('L3.narrowing_stages', stages);
  signalBus.setRegister('L3.loss_operators', lossOperators);
  signalBus.setRegister('L3.dominant_loss', dominantLoss);

  // Check for total elimination at any stage — triggers B→A feedback
  const totalElimination = stages.some((s, i) => i > 0 && s.element_count === 0);
  if (totalElimination) {
    signalBus.emit('feedback.b_to_a', {
      failure_layer: 'L3',
      failure_mode: 'total_narrowing_loss',
      details: { stages, dominantLoss }
    });
  }

  signalBus.emit('layer.L3.complete', {
    stageProfile: stages.map(s => ({ id: s.id, count: s.element_count })),
    dominantLoss,
    finalClaimCount: stages[stages.length - 1].element_count
  });
}

module.exports = { process };
