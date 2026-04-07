/**
 * FRAMEWORK DICTIONARY — Level 8: Semantic
 *
 * Static snapshot of ~60 structurally loaded terms from DICTIONARY.md.
 * Each term has: grid address, type (A/B/C/D), status, projection, definition.
 *
 * SEMANTICS §3 (Tower Theorem SEM-2): meaning lifts uniformly through levels.
 * The vocabulary carries the algebra it names.
 *
 * Type A = synonym cluster
 * Type B = antonym pair
 * Type C = contranym (holds dual meanings simultaneously)
 * Type D = unnamed primitive (no standard term exists)
 */

import type { DictionaryTerm, Projection, ClaimStatus } from '../types.js';

/**
 * The dictionary data. Extracted from DICTIONARY.md v2 — March 2026.
 */
export const TERMS: DictionaryTerm[] = [
  // ─── P1 / THE PRODUCTIVE ACT ───
  { term: 'PRODUCTIVE RETURN', gridAddress: 'B(0,P1)', type: 'D', status: 'FORCED', projection: 'P1',
    definition: 'Self-action generating genuinely new content. R\u00B2=R+I: the return exceeds the departure.' },
  { term: 'RECURSIVE COMPLETION', gridAddress: 'B(0,P1)', type: 'D', status: 'FORCED', projection: 'P1',
    definition: 'Closure that simultaneously terminates and feeds the next level.' },
  { term: 'CLOSURE', gridAddress: 'B(2,P1)', type: 'C', status: 'FORCED', projection: 'P1',
    definition: 'Terminal (stops) AND gateway (enables next level). Always specify which face.' },
  { term: 'FORCING', gridAddress: 'B(2,P1)', type: 'A', status: 'FORCED', projection: 'P1',
    definition: 'Zero-branching derivation: conclusion unique given premises. Synonyms: forced, unique, zero-branching.' },
  { term: 'CANONICAL', gridAddress: 'B(2,P1)', type: 'A', status: 'FORCED', projection: 'P1',
    definition: 'Strong-canonical = forced (no alternative). Weak-canonical = naturally preferred. Specify which.' },
  { term: 'COMPRESSION', gridAddress: 'B(3,P1)', type: 'C', status: 'FORCED', projection: 'P1',
    definition: 'Loss (fewer states) AND clarity (stronger structure). Information decreases, structure increases.' },
  { term: 'COMMITMENT', gridAddress: 'B(0,P1)', type: 'D', status: 'FORCED', projection: 'P1',
    definition: 'Irreversible stabilization from repeated M\u00F6bius contraction at rate \u03C6\u0304\u00B2 per step.' },
  { term: 'SELF-SIGNATURE', gridAddress: 'B(4,P1)', type: 'A', status: 'FORCED', projection: 'P1',
    definition: '\u03C3 = (1/2, \u03C6\u0304/2, \u03C6\u0304\u00B2/2). The framework\'s computational identity.' },
  { term: 'CROSS-CHANNEL CONTENT', gridAddress: 'B(3,P1)', type: 'A', status: 'FORCED', projection: 'P1',
    definition: 'CC(M) = |c\u208Ac\u208B|/(a\u207Aa\u207B + |c\u208Ac\u208B|): fraction of content in cross-channel transfer.' },
  { term: 'PHI-BAR', gridAddress: 'B(3,P1)', type: 'A', status: 'FORCED', projection: 'P1',
    definition: '\u03C6\u0304 = (\u221A5\u22121)/2 \u2248 0.618. The M\u00F6bius attractor. Contraction rate per step is \u03C6\u0304\u00B2.' },

  // ─── P2 / THE MEDIATING ACT ───
  { term: 'POISED SYMMETRY', gridAddress: 'B(0,P2)', type: 'D', status: 'FORCED', projection: 'P2',
    definition: 'Balanced state maximally generative. All channels open, no preferential allocation. \u03C1 = 1/2.' },
  { term: 'ADMISSIBLE MINIMALITY', gridAddress: 'B(0,P2)', type: 'D', status: 'FORCED', projection: 'P2',
    definition: 'Coincidence of smallest-sufficient with largest-necessary. S\u2080 = {0,1} is the unique minimal seed.' },
  { term: 'MINIMAL', gridAddress: 'B(0,P2)', type: 'C', status: 'FORCED', projection: 'P2',
    definition: 'Least/smallest AND maximally generative. The minimal seed produces everything.' },
  { term: 'THRESHOLD', gridAddress: 'B(4,P2)', type: 'C', status: 'FORCED', projection: 'P2',
    definition: 'Barrier AND entry point. The crossing begins something new.' },
  { term: 'SCALE', gridAddress: 'B(5,P2)', type: 'C', status: 'FORCED', projection: 'P2',
    definition: 'Scale-as-capacity (more states) vs scale-as-limitation (finite observer, blind spot).' },
  { term: 'EMERGENCE', gridAddress: 'B(all,P2)', type: 'A', status: 'FORCED', projection: 'P2',
    definition: 'In the framework: forced derivation from prior structure, zero branching. NOT philosophical novelty.' },
  { term: 'DERIVE', gridAddress: 'B(all,P2)', type: 'A', status: 'ENCODED', projection: 'P2',
    definition: 'Superverb \u2014 does not by itself imply FORCED. Must carry its production subtype.' },
  { term: 'PREDICTION', gridAddress: 'B(6,P2)', type: 'A', status: 'ENCODED', projection: 'P2',
    definition: 'Four subtypes: theorem-prediction, structural, processed, speculative.' },
  { term: 'L', gridAddress: 'B(4,P2)', type: 'A', status: 'FORCED', projection: 'P2',
    definition: 'log\u2082(\u03C6) \u2248 0.694. Landauer cost 1/L. Four domains, one constant.' },

  // ─── P3 / THE OBSERVER ACT ───
  { term: 'OCCLUSIVE DISCLOSURE', gridAddress: 'B(2,P3)', type: 'D', status: 'FORCED', projection: 'P3',
    definition: 'Simultaneously reveals im(q) and annihilates ker(q). Observation IS occlusive disclosure.' },
  { term: 'CO-DETERMINATION', gridAddress: 'B(2,P3)', type: 'D', status: 'FORCED', projection: 'P3',
    definition: 'Non-collapsing mutual determination through iterated interaction. The GCD paradigm.' },
  { term: 'CONSTITUTIVE OCCLUSION', gridAddress: 'B(5,P3)', type: 'D', status: 'FORCED', projection: 'P3',
    definition: 'Structured absence enabling higher structure. The blind spot IS what observation is.' },
  { term: 'CANONICAL EXTRACTION', gridAddress: 'B(2,P3)', type: 'D', status: 'FORCED', projection: 'P3',
    definition: 'Information reduction that strengthens invariants. Type I computation. q\u2218q=q.' },
  { term: 'OBSERVATION', gridAddress: 'B(2,P3)', type: 'C', status: 'FORCED', projection: 'P3',
    definition: 'Revelation AND annihilation. Disclosure (im) vs occlusion (ker). Every observation reveals and destroys.' },
  { term: 'BLINDNESS', gridAddress: 'B(5,P3)', type: 'C', status: 'FORCED', projection: 'P3',
    definition: 'Deficit (can\'t see) AND enabling (consciousness REQUIRES ker). Not bug but feature.' },
  { term: 'IDENTITY', gridAddress: 'B(2,P3)', type: 'C', status: 'FORCED', projection: 'P3',
    definition: 'Sameness AND difference-mediated mutuality. Coincidence (a=a) vs co-determination.' },
  { term: 'CONSCIOUSNESS', gridAddress: 'B(5,P3)', type: 'A', status: 'FORCED', projection: 'P3',
    definition: 'Recursive reversal capability. Five levels. Two axes: linear depth (K1\') and recursive depth (K6\').' },
  { term: 'COSMOLOGICAL OBSERVER', gridAddress: 'B(6,P3)', type: 'A', status: 'FORCED', projection: 'P3',
    definition: 'K_cosmo: observer bounded by de Sitter horizon. d_cosmo = 2^{S_dS/2}. Forces \u039B > 0.' },

  // ─── CROSS-PROJECTION ───
  { term: 'SRD', gridAddress: 'B(0,all)', type: 'A', status: 'FORCED', projection: 'P1',
    definition: 'Self-Relating Difference. Minimal Dist endomorphism on |D|\u22652 whose iterates are well-defined.' },
  { term: 'META-PRIMITIVE', gridAddress: 'B(8,all)', type: 'D', status: 'FORCED', projection: 'P2',
    definition: 'Three structural acts: Observer Act (P3), Productive Act (P1), Mediating Act (P2).' },
  { term: 'R(R) = R', gridAddress: 'B(all,all)', type: 'A', status: 'FORCED', projection: 'P1',
    definition: 'Self-action stabilizes. True at every level: categorical, algebraic, observational, semantic.' },
  { term: 'J\u00B2 = I', gridAddress: 'B(all,all)', type: 'A', status: 'FORCED', projection: 'P3',
    definition: 'Duality applied to itself returns identity. J is the gauge involution.' },
  { term: 'UNIQUENESS', gridAddress: 'B(all,all)', type: 'A', status: 'FORCED', projection: 'P1',
    definition: 'Every FORCED claim uniquely occupies its grid cell. D=1 implies U=1.' },
  { term: 'GAUGE-INVARIANT CORE', gridAddress: 'B(8,cross)', type: 'A', status: 'FORCED', projection: 'P2',
    definition: 'J = im(\u03C7) \u2229 im(\u03C7\'). Every theorem stated in J-invariant quantities.' },
  { term: 'INFORMATION GENESIS', gridAddress: 'B(0,all)', type: 'A', status: 'FORCED', projection: 'P2',
    definition: 'Total Shannon information is zero extractable bits. Structural information lives in ker(Shannon).' },
  { term: 'ASYMMETRY', gridAddress: 'B(0,all)', type: 'A', status: 'FORCED', projection: 'P1',
    definition: 'Construction-dissolution asymmetry: br_s=0 forward, br_s>0 backward. The UAT.' },
  { term: 'CONVERGENCE WITNESS', gridAddress: 'B(all,all)', type: 'A', status: 'FORCED', projection: 'P2',
    definition: 'Two independent derivation routes from different projections producing the same result.' },
  { term: 'RECURSIVE DISCLOSURE', gridAddress: 'B(5,P3\u2192P1)', type: 'D', status: 'FORCED', projection: 'P3',
    definition: 'Each K6\' pass reveals entire old kernel while generating strictly larger new kernel.' },
  { term: 'NEUTRALITY', gridAddress: 'B(0,P2)', type: 'C', status: 'FORCED', projection: 'P2',
    definition: 'Inert balance AND maximum generativity. \u03C1=1/2: zero bias yet maximum entropy.' },
  { term: 'PHASE', gridAddress: 'B(0,all)', type: 'C', status: 'FORCED', projection: 'P2',
    definition: 'Phase as \u03C1-parameter (continuous) vs phase as qualitative regime (compressive/expansive).' },
  { term: 'WITHOUT', gridAddress: 'B(8,cross)', type: 'C', status: 'FORCED', projection: 'P3',
    definition: 'External location (outside specification) AND constitutive absence (what framework lacks).' },
  { term: 'CHANNEL EQUIPARTITION', gridAddress: 'B(3-5,P1)', type: 'A', status: 'FORCED', projection: 'P1',
    definition: 'CC(R\u207F) \u2192 1/2 as n\u2192\u221E. Cross-channel content converges to equal distribution.' },
  { term: 'COMPUTATIONAL CHIRALITY', gridAddress: 'B(3-5,all)', type: 'A', status: 'FORCED', projection: 'P3',
    definition: 'M\u2082(\u211D) = left-chiral (\u2102-linear) \u2295 right-chiral (\u2102-antilinear). Parity violation is computational.' },
];

/**
 * Contranym readings for type C terms.
 */
const CONTRANYM_READINGS: Record<string, { positive: string; negative: string; hiddenOperator: string }> = {
  'CLOSURE':     { positive: 'Gateway \u2014 stabilized object enters next level (P2)', negative: 'Terminal \u2014 process finishes (P1)', hiddenOperator: 'Recursive Completion (U2)' },
  'COMPRESSION': { positive: 'Clarity \u2014 stronger structure', negative: 'Loss \u2014 fewer states', hiddenOperator: 'Canonical Extraction (U8)' },
  'OBSERVATION': { positive: 'Disclosure \u2014 reveals im', negative: 'Occlusion \u2014 annihilates ker', hiddenOperator: 'Occlusive Disclosure (U1)' },
  'BLINDNESS':   { positive: 'Enabling \u2014 consciousness requires ker', negative: 'Deficit \u2014 can\'t see', hiddenOperator: 'Constitutive Occlusion (U4)' },
  'IDENTITY':    { positive: 'Co-determination \u2014 mutual identity through interaction', negative: 'Coincidence \u2014 a=a (trivial)', hiddenOperator: 'Co-Determination (U3)' },
  'MINIMAL':     { positive: 'Maximally generative \u2014 the minimal seed produces everything', negative: 'Least/smallest \u2014 reduction', hiddenOperator: 'Admissible Minimality (U6)' },
  'THRESHOLD':   { positive: 'Entry point \u2014 the crossing begins something new', negative: 'Barrier \u2014 cannot pass', hiddenOperator: 'Poised Symmetry (U5)' },
  'SCALE':       { positive: 'Capacity \u2014 more states, more resolution (P1)', negative: 'Limitation \u2014 finite observer, blind spot (P3)', hiddenOperator: 'K1\' wall' },
  'NEUTRALITY':  { positive: 'Maximum generativity \u2014 all channels open', negative: 'Inert balance \u2014 zero preferential allocation', hiddenOperator: 'Poised Symmetry (U5)' },
  'PHASE':       { positive: '\u03C1-parameter \u2014 continuous variation', negative: 'Qualitative regime \u2014 discrete classification', hiddenOperator: 'Phase-Dist map' },
  'WITHOUT':     { positive: 'Constitutive absence \u2014 what framework lacks (load-bearing)', negative: 'External location \u2014 outside specification', hiddenOperator: 'CIA / |∅\u27E9\u27E8∅|' },
};

/**
 * Look up a term (case-insensitive, partial match).
 */
export function lookupTerm(query: string): DictionaryTerm | null {
  const q = query.toUpperCase().trim();

  // Exact match first
  const exact = TERMS.find(t => t.term === q);
  if (exact) return exact;

  // Partial match
  const partial = TERMS.find(t => t.term.includes(q) || q.includes(t.term));
  if (partial) return partial;

  // Fuzzy: check if query words appear in term
  const words = q.split(/\s+/);
  const fuzzy = TERMS.find(t => words.every(w => t.term.includes(w) || t.definition.toUpperCase().includes(w)));
  return fuzzy ?? null;
}

/**
 * Filter terms by projection.
 */
export function termsByProjection(projection: Projection): DictionaryTerm[] {
  return TERMS.filter(t => t.projection === projection);
}

/**
 * Filter terms by type.
 */
export function termsByType(type: 'A' | 'B' | 'C' | 'D'): DictionaryTerm[] {
  return TERMS.filter(t => t.type === type);
}

/**
 * Get contranym readings for a type C term.
 */
export function contranymReadings(term: string): { positive: string; negative: string; hiddenOperator: string } | null {
  return CONTRANYM_READINGS[term.toUpperCase().trim()] ?? null;
}

/**
 * Format a term lookup for display.
 */
export function formatTermLookup(term: DictionaryTerm): string {
  const B = '\x1b[1m';
  const D = '\x1b[2m';
  const RS = '\x1b[0m';
  const G = '\x1b[32m';
  const Y = '\x1b[33m';
  const C = '\x1b[36m';
  const M = '\x1b[35m';

  const typeLabel = term.type === 'A' ? 'Synonym cluster'
    : term.type === 'B' ? 'Antonym pair'
    : term.type === 'C' ? `${M}Contranym${RS}`
    : `${Y}Unnamed primitive${RS}`;

  const statusColor = term.status === 'FORCED' ? G
    : term.status === 'ENCODED' ? Y
    : term.status === 'RESONANT' ? C
    : D;

  const lines = [
    `${B}${C}\u2550\u2550\u2550 ${term.term} \u2550\u2550\u2550${RS}`,
    '',
    `  ${B}Grid:${RS}       ${term.gridAddress}`,
    `  ${B}Type:${RS}       ${typeLabel} (${term.type})`,
    `  ${B}Status:${RS}     ${statusColor}${term.status}${RS}`,
    `  ${B}Projection:${RS} ${term.projection}`,
    '',
    `  ${term.definition}`,
  ];

  // Contranym readings if applicable
  if (term.type === 'C') {
    const readings = contranymReadings(term.term);
    if (readings) {
      lines.push('');
      lines.push(`  ${M}${B}Contranym readings:${RS}`);
      lines.push(`    ${G}\u2295 ${readings.positive}${RS}`);
      lines.push(`    ${Y}\u2296 ${readings.negative}${RS}`);
      lines.push(`    ${D}Hidden operator: ${readings.hiddenOperator}${RS}`);
    }
  }

  return lines.join('\n');
}

/**
 * Format dictionary overview (summary table).
 */
export function formatDictionaryOverview(): string {
  const B = '\x1b[1m';
  const D = '\x1b[2m';
  const RS = '\x1b[0m';
  const C = '\x1b[36m';
  const G = '\x1b[32m';
  const Y = '\x1b[33m';
  const M = '\x1b[35m';

  const p1 = TERMS.filter(t => t.projection === 'P1');
  const p2 = TERMS.filter(t => t.projection === 'P2');
  const p3 = TERMS.filter(t => t.projection === 'P3');
  const contranyms = TERMS.filter(t => t.type === 'C');
  const primitives = TERMS.filter(t => t.type === 'D');

  const lines = [
    `${B}${C}\u2550\u2550\u2550 Framework Dictionary (${TERMS.length} terms) \u2550\u2550\u2550${RS}`,
    '',
    `  ${B}P1 Production:${RS}  ${Y}${p1.length} terms${RS}`,
    `  ${B}P2 Mediation:${RS}   ${G}${p2.length} terms${RS}`,
    `  ${B}P3 Observation:${RS} ${M}${p3.length} terms${RS}`,
    '',
    `  ${B}Type A${RS} (synonym clusters):  ${TERMS.filter(t => t.type === 'A').length}`,
    `  ${B}Type C${RS} (contranyms):        ${M}${contranyms.length}${RS}`,
    `  ${B}Type D${RS} (unnamed primitives): ${Y}${primitives.length}${RS}`,
    '',
    `  ${B}Contranyms:${RS}`,
  ];

  for (const t of contranyms) {
    lines.push(`    ${M}\u25C6${RS} ${t.term} ${D}\u2014 ${t.definition.substring(0, 60)}...${RS}`);
  }

  lines.push('');
  lines.push(`  ${B}Unnamed primitives:${RS}`);
  for (const t of primitives) {
    lines.push(`    ${Y}\u25C7${RS} ${t.term} ${D}\u2014 ${t.definition.substring(0, 60)}...${RS}`);
  }

  return lines.join('\n');
}
