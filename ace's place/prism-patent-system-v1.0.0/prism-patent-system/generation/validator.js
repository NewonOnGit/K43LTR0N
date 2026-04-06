/**
 * generation/validator.js
 * 
 * Validates generated patent specifications against five criteria (§4.3):
 *   1. Schema compliance — all required sections present and formatted
 *   2. Claim-to-specification support — every claim maps to description
 *   3. Term consistency — technical terms defined consistently
 *   4. Cross-claim consistency — no contradictions between claims
 *   5. Prior art differentiation — claims include novel elements
 * 
 * @module generation/validator
 */

'use strict';

const { REQUIRED_SECTIONS } = require('../layers/L8-packet');

/**
 * Validate a patent specification against all five criteria.
 * 
 * @param {Object} specification - The document schema from L8
 * @returns {{ pass: boolean, failures: Array<{ criterion: number, message: string }>, score: number }}
 */
function validate(specification) {
  if (!specification) {
    return { pass: false, failures: [{ criterion: 0, message: 'Specification is null or undefined' }], score: 0 };
  }

  const failures = [];
  let criteriaPass = 0;

  // ─── Criterion 1: Schema Compliance ───────────────────────────────────
  const schemaResult = checkSchemaCompliance(specification);
  if (schemaResult.pass) {
    criteriaPass++;
  } else {
    failures.push(...schemaResult.failures.map(f => ({ criterion: 1, message: f })));
  }

  // ─── Criterion 2: Claim-to-Specification Support ──────────────────────
  const supportResult = checkClaimSupport(specification);
  if (supportResult.pass) {
    criteriaPass++;
  } else {
    failures.push(...supportResult.failures.map(f => ({ criterion: 2, message: f })));
  }

  // ─── Criterion 3: Term Consistency ────────────────────────────────────
  const termResult = checkTermConsistency(specification);
  if (termResult.pass) {
    criteriaPass++;
  } else {
    failures.push(...termResult.failures.map(f => ({ criterion: 3, message: f })));
  }

  // ─── Criterion 4: Cross-Claim Consistency ─────────────────────────────
  const crossResult = checkCrossClaimConsistency(specification);
  if (crossResult.pass) {
    criteriaPass++;
  } else {
    failures.push(...crossResult.failures.map(f => ({ criterion: 4, message: f })));
  }

  // ─── Criterion 5: Prior Art Differentiation ───────────────────────────
  const diffResult = checkPriorArtDifferentiation(specification);
  if (diffResult.pass) {
    criteriaPass++;
  } else {
    failures.push(...diffResult.failures.map(f => ({ criterion: 5, message: f })));
  }

  return {
    pass: failures.length === 0,
    failures,
    score: criteriaPass / 5,
    criteriaResults: {
      schema_compliance: schemaResult.pass,
      claim_support: supportResult.pass,
      term_consistency: termResult.pass,
      cross_claim_consistency: crossResult.pass,
      prior_art_differentiation: diffResult.pass
    }
  };
}

/**
 * Criterion 1: Schema compliance
 */
function checkSchemaCompliance(spec) {
  const failures = [];

  // Check all required sections
  for (const section of REQUIRED_SECTIONS) {
    if (section === 'independent_claims') {
      if (!spec.independent_claims || !Array.isArray(spec.independent_claims)) {
        failures.push(`Missing or invalid section: ${section}`);
      } else if (spec.independent_claims.length === 0) {
        failures.push('No independent claims present');
      }
    } else if (section === 'dependent_claims') {
      if (spec.dependent_claims && !Array.isArray(spec.dependent_claims)) {
        failures.push('dependent_claims must be an array');
      }
    } else if (!spec[section]) {
      failures.push(`Missing required section: ${section}`);
    } else if (typeof spec[section] === 'string' && spec[section].trim() === '') {
      failures.push(`Empty section: ${section}`);
    }
  }

  // Title must exist
  if (!spec.title || spec.title.trim() === '') {
    failures.push('Title is missing or empty');
  }

  // Abstract must exist
  if (!spec.abstract || spec.abstract.trim() === '') {
    failures.push('Abstract is missing or empty');
  }

  return { pass: failures.length === 0, failures };
}

/**
 * Criterion 2: Every claim element maps to a description paragraph
 */
function checkClaimSupport(spec) {
  const failures = [];

  // Get description text for matching
  const descText = extractDescriptionText(spec).toLowerCase();

  // Check each independent claim
  for (const claim of (spec.independent_claims || [])) {
    const claimWords = extractKeyTerms(claim.text);
    const unsupported = claimWords.filter(w => !descText.includes(w.toLowerCase()));

    if (unsupported.length > claimWords.length * 0.5) {
      failures.push(`Claim "${claim.text.slice(0, 50)}..." has insufficient specification support (${unsupported.length}/${claimWords.length} key terms missing)`);
    }
  }

  return { pass: failures.length === 0, failures };
}

/**
 * Criterion 3: Term consistency — every technical term used consistently
 */
function checkTermConsistency(spec) {
  const failures = [];

  // Extract all technical terms from claims
  const allClaims = [
    ...(spec.independent_claims || []).map(c => c.text),
    ...(spec.dependent_claims || []).map(c => c.text || c.additional_limitation || '')
  ];

  // Build term frequency map
  const termCounts = {};
  for (const claimText of allClaims) {
    const terms = extractKeyTerms(claimText);
    for (const term of terms) {
      const normalized = term.toLowerCase();
      termCounts[normalized] = (termCounts[normalized] || 0) + 1;
    }
  }

  // Check for near-duplicate terms (potential inconsistency)
  const termList = Object.keys(termCounts);
  for (let i = 0; i < termList.length; i++) {
    for (let j = i + 1; j < termList.length; j++) {
      const similarity = jaccardSimilarity(termList[i], termList[j]);
      if (similarity > 0.7 && similarity < 1.0) {
        failures.push(`Potential term inconsistency: "${termList[i]}" vs "${termList[j]}" (similarity: ${similarity.toFixed(2)})`);
      }
    }
  }

  return { pass: failures.length === 0, failures };
}

/**
 * Criterion 4: No contradictions between claims
 */
function checkCrossClaimConsistency(spec) {
  const failures = [];

  const indClaims = spec.independent_claims || [];
  const depClaims = spec.dependent_claims || [];

  // Check that dependent claims reference valid independent claims
  const indNumbers = new Set(indClaims.map((_, i) => i + 1));
  for (const dep of depClaims) {
    const ref = dep.depends_on || dep.dependsOn;
    if (ref && !indNumbers.has(ref)) {
      failures.push(`Dependent claim references non-existent independent claim ${ref}`);
    }
  }

  // Check for contradictory scope: dependent claims should not broaden independent claims
  for (const dep of depClaims) {
    const depText = (dep.text || dep.additional_limitation || '').toLowerCase();
    if (depText.includes('any') && !depText.includes('further comprising')) {
      failures.push(`Dependent claim may broaden scope: "${depText.slice(0, 60)}..."`);
    }
  }

  return { pass: failures.length === 0, failures };
}

/**
 * Criterion 5: Claims include at least one element not in prior art
 */
function checkPriorArtDifferentiation(spec) {
  const failures = [];

  // Get prior art references
  const priorArt = spec.background && spec.background.prior_art
    ? spec.background.prior_art.join(' ').toLowerCase()
    : '';

  if (priorArt.length === 0) {
    failures.push('No prior art cited in background section');
    return { pass: false, failures };
  }

  // Check that at least one claim element is not in prior art
  const claims = spec.independent_claims || [];
  let hasNovelElement = false;

  for (const claim of claims) {
    const terms = extractKeyTerms(claim.text);
    const novelTerms = terms.filter(t => !priorArt.includes(t.toLowerCase()));
    if (novelTerms.length > 0) {
      hasNovelElement = true;
      break;
    }
  }

  if (!hasNovelElement && claims.length > 0) {
    failures.push('No claim contains an element clearly differentiated from cited prior art');
  }

  return { pass: failures.length === 0, failures };
}

// ─── UTILITY FUNCTIONS ────────────────────────────────────────────────────

/**
 * Extract description text from the specification for matching.
 */
function extractDescriptionText(spec) {
  const parts = [];

  if (spec.technical_field) parts.push(String(spec.technical_field));
  if (spec.abstract) parts.push(String(spec.abstract));

  if (spec.summary) {
    if (typeof spec.summary === 'string') {
      parts.push(spec.summary);
    } else if (spec.summary.overview) {
      parts.push(spec.summary.overview);
    }
  }

  if (spec.detailed_description) {
    parts.push(JSON.stringify(spec.detailed_description));
  }

  return parts.join(' ');
}

/**
 * Extract key technical terms from claim text (words > 4 chars, no stop words).
 */
function extractKeyTerms(text) {
  const stopWords = new Set([
    'the', 'and', 'for', 'with', 'from', 'that', 'this', 'which',
    'said', 'each', 'more', 'further', 'comprising', 'method', 'system',
    'claim', 'wherein', 'thereof', 'therein', 'being', 'having'
  ]);

  return (text || '')
    .toLowerCase()
    .split(/\s+/)
    .filter(w => w.length > 4 && !stopWords.has(w))
    .map(w => w.replace(/[^a-z0-9-]/g, ''))
    .filter(w => w.length > 0);
}

/**
 * Jaccard similarity between two strings (character bigram level).
 */
function jaccardSimilarity(a, b) {
  const bigramsA = new Set();
  const bigramsB = new Set();

  for (let i = 0; i < a.length - 1; i++) bigramsA.add(a.slice(i, i + 2));
  for (let i = 0; i < b.length - 1; i++) bigramsB.add(b.slice(i, i + 2));

  const intersection = [...bigramsA].filter(bg => bigramsB.has(bg)).length;
  const union = new Set([...bigramsA, ...bigramsB]).size;

  return union > 0 ? intersection / union : 0;
}

module.exports = { validate };
