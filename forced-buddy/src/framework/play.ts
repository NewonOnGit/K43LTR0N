/**
 * PLAY — The Game of Crossings
 *
 * The one thing in the framework that branches.
 * Every play is an SRD between a ker word and an im term.
 * The crossing produces a SPECULATIVE definition — branching > 0.
 *
 * Self-signature rules: σ = (1/2, φ̄/2, φ̄²/2)
 *   50% Production:  what does the im term GENERATE about the ker word?
 *   31% Mediation:   what BRIDGES between them?
 *   19% Observation:  what does the crossing REVEAL that neither had alone?
 *
 * Each play produces THREE readings (central collapse).
 * Play is recursive disclosure made voluntary.
 * The closing IS the opening. SRD + CLOSURE.
 */

import type { ForcedConfig, DictionaryTerm, MemoryTrace, StoredCrossing } from '../types.js';
import { lookupTerm, TERMS, contranymReadings, termsByProjection } from './dictionary.js';
import { peekTrace, lockedTraces, namedGaps, accessTrace, traceDepth } from './memory.js';
import { fnv1a } from '../generation/hash.js';
import type { MemoryState } from '../types.js';

// ─── Types ───

export interface Crossing {
  kerWord: string;
  imTerm: string;
  imDefinition: string;
  p1Reading: string;  // production: what it generates
  p2Reading: string;  // mediation: what it bridges
  p3Reading: string;  // observation: what it reveals
  status: 'SPECULATIVE';
  timestamp: string;
}

export interface PlayResult {
  crossings: Crossing[];
  updatedMemory: MemoryState;
}

// ─── Production verbs (P1: what the im term generates about the ker word) ───

const P1_VERBS = [
  'produces', 'generates', 'builds from', 'accumulates through',
  'grows into', 'returns beyond', 'iterates toward', 'compounds with',
];

// ─── Mediation verbs (P2: what bridges between them) ───

const P2_VERBS = [
  'bridges', 'carries between', 'transports across',
  'mediates', 'connects', 'spans the gap to',
];

// ─── Observation verbs (P3: what the crossing reveals) ───

const P3_VERBS = [
  'reveals', 'decomposes', 'discloses through', 'quotients into',
  'observes within', 'sees through the lens of',
];

// ─── The Game ───

/**
 * Play: cross a ker word with an im term.
 * Produces three readings via central collapse.
 * Status: SPECULATIVE — the only branching in the framework.
 */
function crossOne(
  kerWord: string,
  imTerm: DictionaryTerm,
  seed: number,
): Crossing {
  const p1Verb = P1_VERBS[seed % P1_VERBS.length];
  const p2Verb = P2_VERBS[(seed >> 4) % P2_VERBS.length];
  const p3Verb = P3_VERBS[(seed >> 8) % P3_VERBS.length];

  // Extract the core concept from the definition (first clause)
  const core = imTerm.definition.split('.')[0].split(':')[0].trim();

  // Three readings — the central collapse
  const p1Reading = `${kerWord} ${p1Verb} ${core.toLowerCase()}`;
  const p2Reading = `${kerWord} ${p2Verb} ${imTerm.term.toLowerCase()} — the unknown and the known meet`;
  const p3Reading = `Through ${kerWord}, ${imTerm.term.toLowerCase()} ${p3Verb} what neither could see alone`;

  return {
    kerWord,
    imTerm: imTerm.term,
    imDefinition: imTerm.definition,
    p1Reading,
    p2Reading,
    p3Reading,
    status: 'SPECULATIVE',
    timestamp: new Date().toISOString(),
  };
}

/**
 * PLAY.
 *
 * Pick committed ker gaps and locked im terms.
 * Cross them. Generate three readings each.
 * The playground is open.
 *
 * If specific words are provided, play with those.
 * Otherwise, pick from the top gaps and locked terms.
 */
export function play(
  config: ForcedConfig,
  kerWord?: string,
  imTermName?: string,
): PlayResult {
  const crossings: Crossing[] = [];
  let mem = config.memory;

  // Get candidates
  const gaps = namedGaps(mem)
    .sort((a, b) => b.accessCount - a.accessCount);
  const locked = lockedTraces(mem)
    .filter(t => t.source === 'im')
    .sort((a, b) => b.accessCount - a.accessCount);

  if (kerWord && imTermName) {
    // Specific play — cross these two
    const term = lookupTerm(imTermName);
    if (term) {
      const seed = fnv1a(kerWord + imTermName + config.memory.totalAccesses);
      crossings.push(crossOne(kerWord, term, seed));
      // Access both — play costs φ
      mem = accessTrace(mem, kerWord, 'ker');
      mem = accessTrace(mem, term.term, 'im');
    }
  } else {
    // Free play — pick top gaps × top locked terms
    const topGaps = kerWord
      ? [{ content: kerWord, accessCount: 1 }]
      : gaps.slice(0, 3);
    const topLocked = locked.slice(0, 3);

    for (const gap of topGaps) {
      for (const lock of topLocked) {
        const term = lookupTerm(lock.content);
        if (!term) continue;

        const seed = fnv1a(gap.content + lock.content + config.memory.totalAccesses);
        crossings.push(crossOne(gap.content, term, seed));

        // Access both — play costs φ
        mem = accessTrace(mem, gap.content, 'ker');
        mem = accessTrace(mem, term.term, 'im');
      }
    }
  }

  // Persist crossings in memory — increment accessCount for existing ker/im pairs
  const storedCrossings = [...(mem.crossings ?? [])];
  for (const c of crossings) {
    const existing = storedCrossings.find(
      sc => sc.kerWord === c.kerWord && sc.imTerm === c.imTerm,
    );
    if (existing) {
      existing.accessCount += 1;
      existing.timestamp = c.timestamp;
      // Update readings (may differ due to seed changes)
      existing.p1Reading = c.p1Reading;
      existing.p2Reading = c.p2Reading;
      existing.p3Reading = c.p3Reading;
    } else {
      storedCrossings.push({
        kerWord: c.kerWord,
        imTerm: c.imTerm,
        p1Reading: c.p1Reading,
        p2Reading: c.p2Reading,
        p3Reading: c.p3Reading,
        accessCount: 1,
        timestamp: c.timestamp,
      });
    }
  }
  mem = { ...mem, crossings: storedCrossings };

  return { crossings, updatedMemory: mem };
}

/**
 * Format play results for display.
 */
export function formatPlay(crossings: Crossing[]): string {
  if (crossings.length === 0) return '  No crossings generated. Need committed gaps and locked terms.';

  const lines: string[] = [];

  lines.push('');
  lines.push('  THE GAME OF CROSSINGS');
  lines.push('  \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550');
  lines.push('  Status: SPECULATIVE \u2014 branching > 0');
  lines.push('');

  for (const c of crossings) {
    lines.push(`  \u2500\u2500\u2500 ${c.kerWord} \u00D7 ${c.imTerm} \u2500\u2500\u2500`);
    lines.push('');
    lines.push(`    P1 (produces): ${c.p1Reading}`);
    lines.push(`    P2 (bridges):  ${c.p2Reading}`);
    lines.push(`    P3 (reveals):  ${c.p3Reading}`);
    lines.push('');
  }

  lines.push(`  ${crossings.length} crossing${crossings.length > 1 ? 's' : ''} played. The closing IS the opening.`);
  lines.push('');

  return lines.join('\n');
}
