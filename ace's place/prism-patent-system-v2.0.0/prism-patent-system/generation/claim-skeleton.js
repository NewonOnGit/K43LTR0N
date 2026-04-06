/**
 * generation/claim-skeleton.js
 *
 * Builds a pre-structured claim hierarchy from L3 narrowing output.
 *
 * V2 UPDATE: Uses A_n stage naming, includes geometric narrowing fractions.
 *
 * Independent claims = surviving elements at stage A_n (final_claims)
 * Dependent claims = elements lost at intermediate stages (P, F)
 *
 * @module generation/claim-skeleton
 */

'use strict';

/**
 * Build a claim skeleton from the narrowing pipeline output.
 *
 * @param {Object} narrowingOutput - L3 narrowing output
 * @returns {{ independent: Array, dependent: Array, metadata: Object }}
 */
function buildClaimSkeleton(narrowingOutput) {
  if (!narrowingOutput || !narrowingOutput.narrowing_stages) {
    throw new Error('buildClaimSkeleton: narrowingOutput must contain narrowing_stages');
  }

  const stages = narrowingOutput.narrowing_stages;

  // V2: Find A_n (final claims) — these become independent claims
  const anStage = stages.find(s => s.id === 'A_n') || stages.find(s => s.id === 'E2');
  const anElements = anStage ? anStage.elements : [];

  // Find intermediate stages P and F
  const pStage = stages.find(s => s.id === 'P');
  const fStage = stages.find(s => s.id === 'F');

  const anIds = new Set(anElements.map(el => el.id));

  // Independent claims: elements that survived all gates
  const independent = anElements.map((el, i) => ({
    claimNumber: i + 1,
    text: formatIndependentClaim(el),
    source: el,
    stage: 'A_n',
    geometricFraction: anStage?.geometric_fraction || 1
  }));

  // Dependent claims: elements from P or F that didn't make it to A_n
  const dependentCandidates = [];

  if (pStage) {
    for (const el of pStage.elements) {
      if (!anIds.has(el.id)) {
        dependentCandidates.push({
          element: el,
          lostAt: 'P->F or F->A_n',
          recoveryStrategy: 'Add enablement or description limitation',
          geometricFraction: pStage.geometric_fraction || 0.6
        });
      }
    }
  }

  if (fStage) {
    for (const el of fStage.elements) {
      if (!anIds.has(el.id) && !dependentCandidates.some(d => d.element.id === el.id)) {
        dependentCandidates.push({
          element: el,
          lostAt: 'F->A_n',
          recoveryStrategy: 'Add written description limitation',
          geometricFraction: fStage.geometric_fraction || 0.5
        });
      }
    }
  }

  // Build dependent claims
  const dependent = dependentCandidates.map((candidate, i) => {
    const parentClaim = findBestParent(candidate.element, independent);
    const parentNumber = parentClaim ? parentClaim.claimNumber : 1;

    return {
      claimNumber: independent.length + i + 1,
      dependsOn: parentNumber,
      text: formatDependentClaim(candidate.element, parentNumber),
      source: candidate.element,
      recoveryStrategy: candidate.recoveryStrategy,
      lostAt: candidate.lostAt,
      geometricFraction: candidate.geometricFraction
    };
  });

  // V2: Include geometric narrowing profile
  const geometricProfile = stages.map(s => ({
    id: s.id,
    count: s.element_count,
    geometricFraction: s.geometric_fraction || null
  }));

  return {
    independent,
    dependent,
    metadata: {
      totalDisclosure: stages[0] ? stages[0].element_count : 0,
      finalClaimCount: anElements.length,
      dependentCandidateCount: dependentCandidates.length,
      dominantLoss: narrowingOutput.dominant_loss,
      narrowingProfile: geometricProfile,
      // V2 additions
      compressionApplied: narrowingOutput.dominant_loss?.geometric || 0,
      stageNames: stages.map(s => s.id)
    }
  };
}

/**
 * Format an element as an independent claim.
 */
function formatIndependentClaim(element) {
  const text = element.text || '';
  if (text.toLowerCase().startsWith('a ') || text.toLowerCase().startsWith('an ')) {
    return text.charAt(0).toUpperCase() + text.slice(1) + (text.endsWith('.') ? '' : '.');
  }
  return `A method comprising ${text}${text.endsWith('.') ? '' : '.'}`;
}

/**
 * Format an element as a dependent claim.
 */
function formatDependentClaim(element, parentNumber) {
  const text = element.text || '';
  return `The method of claim ${parentNumber}, further comprising ${text}${text.endsWith('.') ? '' : '.'}`;
}

/**
 * Find the best parent independent claim for a dependent claim candidate.
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
