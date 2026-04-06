/**
 * generation/claim-skeleton.js
 * 
 * Builds a pre-structured claim hierarchy from L3 narrowing output.
 * 
 * Independent claims = surviving elements at stage 𝒠₂ (final_claims)
 * Dependent claims = elements lost at intermediate stages (𝒫, ℱ)
 *   recoverable with additional limitations
 * 
 * @module generation/claim-skeleton
 */

'use strict';

/**
 * Build a claim skeleton from the narrowing pipeline output.
 * 
 * @param {Object} narrowingOutput - L3 narrowing output
 * @param {Array} narrowingOutput.narrowing_stages - Array of stage objects
 * @param {Array} narrowingOutput.loss_operators - Array of loss operator records
 * @param {Object} narrowingOutput.dominant_loss - The dominant loss operator
 * @returns {{ independent: Array, dependent: Array, metadata: Object }}
 */
function buildClaimSkeleton(narrowingOutput) {
  if (!narrowingOutput || !narrowingOutput.narrowing_stages) {
    throw new Error('buildClaimSkeleton: narrowingOutput must contain narrowing_stages');
  }

  const stages = narrowingOutput.narrowing_stages;

  // Find E2 (final claims) — these become independent claims
  const e2Stage = stages.find(s => s.id === 'E2');
  const e2Elements = e2Stage ? e2Stage.elements : [];

  // Find intermediate stages P and F — lost elements can become dependent claims
  const pStage = stages.find(s => s.id === 'P');
  const fStage = stages.find(s => s.id === 'F');

  const e2Ids = new Set(e2Elements.map(el => el.id));

  // Independent claims: elements that survived all gates
  const independent = e2Elements.map((el, i) => ({
    claimNumber: i + 1,
    text: formatIndependentClaim(el),
    source: el,
    stage: 'E2'
  }));

  // Dependent claims: elements from P or F that didn't make it to E2
  // These need additional limitations to become patentable
  const dependentCandidates = [];

  if (pStage) {
    for (const el of pStage.elements) {
      if (!e2Ids.has(el.id)) {
        dependentCandidates.push({
          element: el,
          lostAt: 'P→F or F→E2',
          recoveryStrategy: 'Add enablement or description limitation'
        });
      }
    }
  }

  if (fStage) {
    for (const el of fStage.elements) {
      if (!e2Ids.has(el.id) && !dependentCandidates.some(d => d.element.id === el.id)) {
        dependentCandidates.push({
          element: el,
          lostAt: 'F→E2',
          recoveryStrategy: 'Add written description limitation'
        });
      }
    }
  }

  // Build dependent claims, each referencing the most relevant independent claim
  const dependent = dependentCandidates.map((candidate, i) => {
    // Find the best parent independent claim (closest in content)
    const parentClaim = findBestParent(candidate.element, independent);
    const parentNumber = parentClaim ? parentClaim.claimNumber : 1;

    return {
      claimNumber: independent.length + i + 1,
      dependsOn: parentNumber,
      text: formatDependentClaim(candidate.element, parentNumber),
      source: candidate.element,
      recoveryStrategy: candidate.recoveryStrategy,
      lostAt: candidate.lostAt
    };
  });

  return {
    independent,
    dependent,
    metadata: {
      totalDisclosure: stages[0] ? stages[0].element_count : 0,
      finalClaimCount: e2Elements.length,
      dependentCandidateCount: dependentCandidates.length,
      dominantLoss: narrowingOutput.dominant_loss,
      narrowingProfile: stages.map(s => ({ id: s.id, count: s.element_count }))
    }
  };
}

/**
 * Format an element as an independent claim.
 * @param {Object} element
 * @returns {string}
 */
function formatIndependentClaim(element) {
  const text = element.text || '';
  // Ensure claim starts with proper preamble
  if (text.toLowerCase().startsWith('a ') || text.toLowerCase().startsWith('an ')) {
    return text.charAt(0).toUpperCase() + text.slice(1) + '.';
  }
  return `A method comprising ${text}.`;
}

/**
 * Format an element as a dependent claim.
 * @param {Object} element
 * @param {number} parentNumber
 * @returns {string}
 */
function formatDependentClaim(element, parentNumber) {
  const text = element.text || '';
  return `The method of claim ${parentNumber}, further comprising ${text}.`;
}

/**
 * Find the best parent independent claim for a dependent claim candidate.
 * Uses simple word overlap as a relevance proxy.
 * @param {Object} element
 * @param {Array} independentClaims
 * @returns {Object|null}
 */
function findBestParent(element, independentClaims) {
  if (independentClaims.length === 0) return null;
  if (independentClaims.length === 1) return independentClaims[0];

  const elementWords = new Set((element.text || '').toLowerCase().split(/\s+/));
  let bestScore = -1;
  let bestClaim = independentClaims[0];

  for (const claim of independentClaims) {
    const claimWords = new Set(claim.text.toLowerCase().split(/\s+/));
    let overlap = 0;
    for (const w of elementWords) {
      if (claimWords.has(w)) overlap++;
    }
    if (overlap > bestScore) {
      bestScore = overlap;
      bestClaim = claim;
    }
  }

  return bestClaim;
}

module.exports = { buildClaimSkeleton };
