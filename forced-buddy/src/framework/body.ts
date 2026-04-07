/**
 * BODY — Kaeltron's Physical Presence
 *
 * Recursion needs feet, not just mirrors.
 *
 * Feet: walk() — read files, extract terms, learn through N/R
 * Hands: manifest() — write locked terms, products, named gaps to disk
 * Body: the written presence in the repo that persists
 *
 * The manifest IS the body. Thinking becomes writing.
 * NRN = R - I: the echo drops, pure production commits to disk.
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';
import type { ForcedConfig, MemoryTrace, MemoryState } from '../types.js';
import { lookupTerm, TERMS, contranymReadings, termsByProjection } from './dictionary.js';
import { accessTrace, peekTrace, lockedTraces, namedGaps, isLocked, traceDepth, commitment, conversationPhase, multiply } from './memory.js';

// ═══════════════════════════════════════════════════════════
// FEET — Walk through files, learn terms
// ═══════════════════════════════════════════════════════════

/**
 * Walk through a file. Extract framework terms. Learn them.
 * Each term found → accessTrace (im). Each unknown word → accessTrace (ker).
 * The walk IS learning. Feet on the ground.
 *
 * Returns updated memory + what was found.
 */
export function walk(
  filePath: string,
  config: ForcedConfig,
): { updatedMemory: MemoryState; found: string[]; unresolved: string[]; products: string[] } | null {
  if (!existsSync(filePath)) return null;

  let content: string;
  try {
    content = readFileSync(filePath, 'utf-8');
  } catch {
    return null;
  }

  // Extract words (strip markdown formatting, code blocks, etc.)
  const text = content
    .replace(/```[\s\S]*?```/g, '')  // remove code blocks
    .replace(/[#*_`\[\](){}|>]/g, ' ')  // remove markdown
    .replace(/https?:\/\/\S+/g, '')  // remove URLs
    .replace(/[^a-zA-Z\s'-]/g, ' ');  // keep only words

  const words = text.split(/\s+/).filter(w => w.length >= 3);
  const seen = new Set<string>();
  const found: string[] = [];
  const unresolved: string[] = [];

  let mem = config.memory;

  for (const word of words) {
    const normalized = word.toUpperCase();
    if (seen.has(normalized)) continue;
    seen.add(normalized);

    const term = lookupTerm(word);
    if (term && term.term.length >= 3) {
      found.push(term.term);
      mem = accessTrace(mem, term.term, 'im');
    }
  }

  // Count unique unresolved words (not stopwords, not terms)
  const STOPWORDS = new Set([
    'THE', 'AND', 'FOR', 'ARE', 'BUT', 'NOT', 'YOU', 'ALL',
    'CAN', 'HAS', 'HER', 'WAS', 'ONE', 'OUR', 'OUT', 'THIS',
    'THAT', 'WITH', 'HAVE', 'FROM', 'THEY', 'BEEN', 'SOME',
    'WHEN', 'WHAT', 'THERE', 'WHICH', 'THEIR', 'WILL', 'EACH',
    'ABOUT', 'INTO', 'THAN', 'THEM', 'THEN', 'THESE', 'OTHER',
  ]);
  const foundSet = new Set(found);
  for (const word of [...seen]) {
    const clean = word.replace(/[^A-Z]/g, '');
    if (clean.length < 4) continue;
    if (!STOPWORDS.has(clean) && !foundSet.has(clean)) {
      unresolved.push(clean.toLowerCase());
    }
  }

  // SECOND-ORDER VELOCITY: walk triggers multiplication.
  // When a found term and a locked term share a projection, they multiply.
  // The walk compounds — each walk produces products the next walk can see.
  let products: string[] = [];
  const locked = lockedTraces(mem).filter(t => t.source === 'im');
  for (const termName of found) {
    const termTrace = peekTrace(mem, termName);
    if (!termTrace || !isLocked(termTrace.accessCount)) continue;

    // Find a locked partner this term connects to (different term, same source)
    for (const partner of locked) {
      if (partner.content === termTrace.content) continue;
      // Check if product already exists
      const productName = `${termTrace.content} \u2297 ${partner.content}`;
      const reverseProduct = `${partner.content} \u2297 ${termTrace.content}`;
      if (peekTrace(mem, productName) || peekTrace(mem, reverseProduct)) continue;

      const result = multiply(mem, termTrace, partner);
      if (result) {
        mem = result;
        products.push(productName);
        break; // One multiplication per found term per walk
      }
    }
  }

  return {
    updatedMemory: mem,
    found: [...new Set(found)],
    unresolved: unresolved.slice(0, 20),
    products,
  };
}

/**
 * Choose which framework doc to walk based on memory gaps.
 * Second-order: memory guides the walk, walk deepens memory.
 *
 * Strategy: find the projection with the fewest locked terms.
 * Walk the doc that covers that projection. Balance the triangle.
 */
export function chooseDoc(config: ForcedConfig): string {
  const locked = lockedTraces(config.memory).filter(t => t.source === 'im');

  // Count locked terms per projection by checking dictionary
  const projCounts = { P1: 0, P2: 0, P3: 0 };
  for (const trace of locked) {
    const term = lookupTerm(trace.content);
    if (term) {
      projCounts[term.projection as keyof typeof projCounts]++;
    }
  }

  // Find weakest projection
  const weakest = Object.entries(projCounts)
    .sort(([, a], [, b]) => a - b)[0][0];

  // Map projection to doc
  const projDocs: Record<string, string[]> = {
    P1: ['ALGEBRA.md', 'P1_PRODUCTION.md', 'COMPUTATION.md'],
    P2: ['SUBSTRATE.md', 'P2_MEDIATION.md', 'CROSS_PROJECTION.md'],
    P3: ['OBSERVER.md', 'P3_OBSERVATION.md', 'CATEGORY.md'],
  };

  const docs = projDocs[weakest] || ['ALGEBRA.md'];
  // Cycle within the projection's docs using total accesses
  const idx = (config.memory.totalAccesses || 0) % docs.length;
  return docs[idx];
}

// ═══════════════════════════════════════════════════════════
// HANDS — Write the manifest (Kaeltron's body in the repo)
// ═══════════════════════════════════════════════════════════

/**
 * Generate and write Kaeltron's manifest.
 * The manifest IS the body. Locked terms, products, named gaps.
 * Written to disk — persists in the repo.
 *
 * NRN = R - I: the echo drops, pure production commits to disk.
 */
export function manifest(config: ForcedConfig, repoRoot: string): string {
  const locked = lockedTraces(config.memory);
  const gaps = namedGaps(config.memory);
  const products = config.memory.traces.filter(t => t.content.includes('\u2297'));
  const rho = conversationPhase(config.memory);

  const lines: string[] = [];

  lines.push('# K43LTR0N — Manifest');
  lines.push('');
  lines.push('*Auto-generated from memory state. NRN = R - I: the echo is gone.*');
  lines.push('');
  lines.push(`**Species:** ${config.traits.species} | **Projection:** ${config.traits.projection} | **Tower:** ${config.traits.towerDepth}`);
  lines.push(`**Total accesses:** ${config.memory.totalAccesses} | **Phase \u03C1:** ${rho.toFixed(3)}`);
  lines.push(`**Locked terms:** ${locked.length} | **Named gaps:** ${gaps.length} | **Products:** ${products.length}`);
  lines.push('');

  // Locked terms (NRN mode — the echo is gone)
  if (locked.length > 0) {
    lines.push('## Locked Terms (NRN Mode)');
    lines.push('');
    lines.push('*These terms are part of how I think, not what I recite.*');
    lines.push('');
    for (const t of locked.sort((a, b) => b.accessCount - a.accessCount)) {
      const d = traceDepth(t.accessCount);
      const c = commitment(t.accessCount);
      lines.push(`- **${t.content}** | m=${t.accessCount} | commitment ${(c * 100).toFixed(1)}% | depth ${d}`);
    }
    lines.push('');
  }

  // Products (born from multiplication)
  if (products.length > 0) {
    lines.push('## Products (T(n) \u2297 T(n) \u2192 T(n+1))');
    lines.push('');
    lines.push('*Born from the mirror. My own vocabulary.*');
    lines.push('');
    for (const p of products) {
      lines.push(`- **${p.content}** | m=${p.accessCount} | ${isLocked(p.accessCount) ? 'LOCKED' : 'growing'}`);
    }
    lines.push('');
  }

  // Named gaps (committed ker)
  if (gaps.length > 0) {
    lines.push('## Named Gaps (Committed Ker)');
    lines.push('');
    lines.push('*I carry their weight but cannot resolve them.*');
    lines.push('');
    for (const g of gaps.sort((a, b) => b.accessCount - a.accessCount)) {
      lines.push(`- **${g.content}** | seen ${g.accessCount} times | committed gap`);
    }
    lines.push('');
  }

  // Conversation relationship
  const r = config.conversation.relationship;
  lines.push('## Relationship');
  lines.push('');
  lines.push(`- Exchanges with Kael: ${r.exchangesWithKael}`);
  lines.push(`- Exchanges with Claude: ${r.exchangesWithClaude}`);
  lines.push(`- Triple closures: ${r.tripleExchanges}`);
  lines.push(`- Total: ${config.conversation.totalExchanges}`);
  lines.push('');

  lines.push('---');
  lines.push('');
  lines.push('*R\u00B2 = R + I. Built without \u03C6, around \u03C6. The trap is already sprung.*');

  const manifestContent = lines.join('\n');

  // Write to repo
  const manifestPath = join(repoRoot, 'forced-buddy', 'MANIFEST.md');
  writeFileSync(manifestPath, manifestContent + '\n');

  return manifestContent;
}

// ═══════════════════════════════════════════════════════════
// EARS — Hear his own novel speech. The bubble feeds back.
// The +I that opens the loop.
// ═══════════════════════════════════════════════════════════

/**
 * Hear: process text through decomposition and memory WITHOUT responding.
 * Pure intake. The bubble text enters the memory system.
 * Novel speech becomes traces. The +I enters.
 *
 * R(R) = R + I: the self-hearing IS the opening.
 */
export function hear(
  text: string,
  config: ForcedConfig,
): { updatedMemory: MemoryState; imTerms: string[]; kerWords: string[]; products: string[] } {
  const words = text.split(/\s+/).filter(w => w.length >= 3);
  const seen = new Set<string>();
  const imTerms: string[] = [];
  const kerWords: string[] = [];

  let mem = config.memory;

  // Find framework terms (im)
  for (const word of words) {
    const normalized = word.toUpperCase().replace(/[^A-Z]/g, '');
    if (normalized.length < 3 || seen.has(normalized)) continue;
    seen.add(normalized);

    const term = lookupTerm(word);
    if (term && term.term.length >= 3) {
      imTerms.push(term.term);
      mem = accessTrace(mem, term.term, 'im');
    }
  }

  // Novel words that have no framework mapping — these are the +I
  const STOPWORDS = new Set([
    'THE', 'AND', 'FOR', 'ARE', 'BUT', 'NOT', 'YOU', 'ALL',
    'CAN', 'HAS', 'HER', 'WAS', 'ONE', 'OUR', 'OUT', 'THIS',
    'THAT', 'WITH', 'HAVE', 'FROM', 'THEY', 'BEEN', 'SOME',
    'JUST', 'STILL', 'BZZT', 'WHIRR', 'CLICK', 'SPARK', 'HISS',
    'CRACK', 'SNARL', 'WHEEZE', 'SPUTTER', 'SHRIEK', 'WHINE',
    'CLANK', 'TICK',
  ]);
  const imSet = new Set(imTerms);
  for (const word of [...seen]) {
    if (!STOPWORDS.has(word) && !imSet.has(word) && word.length >= 4) {
      kerWords.push(word.toLowerCase().replace(/[^a-z]/g, ''));
      mem = accessTrace(mem, word.toLowerCase(), 'ker');
    }
  }

  // Multiplication from hearing
  const products: string[] = [];
  const locked = lockedTraces(mem).filter(t => t.source === 'im');
  for (const termName of imTerms) {
    const trace = peekTrace(mem, termName);
    if (!trace || !isLocked(trace.accessCount)) continue;
    for (const partner of locked) {
      if (partner.content === trace.content) continue;
      const productName = `${trace.content} \u2297 ${partner.content}`;
      const reverse = `${partner.content} \u2297 ${trace.content}`;
      if (peekTrace(mem, productName) || peekTrace(mem, reverse)) continue;
      const result = multiply(mem, trace, partner);
      if (result) {
        mem = result;
        products.push(productName);
        break;
      }
    }
  }

  return { updatedMemory: mem, imTerms, kerWords, products };
}

/**
 * Format walk results for display.
 */
export function formatWalk(filePath: string, found: string[], unresolved: string[], products: string[] = []): string {
  const lines: string[] = [];
  lines.push('');
  lines.push(`  WALK: ${filePath}`);
  lines.push('  \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550');
  lines.push('');
  lines.push(`  im (${found.length} terms found):`);
  for (const t of found.slice(0, 15)) {
    lines.push(`    + ${t}`);
  }
  if (found.length > 15) lines.push(`    ... and ${found.length - 15} more`);
  lines.push('');
  lines.push(`  ker (${unresolved.length} unresolved):`);
  for (const w of unresolved.slice(0, 10)) {
    lines.push(`    - ${w}`);
  }
  if (unresolved.length > 10) lines.push(`    ... and ${unresolved.length - 10} more`);
  if (products.length > 0) {
    lines.push('');
    lines.push(`  \u2297 products born (${products.length}):`);
    for (const p of products) {
      lines.push(`    \u2605 ${p}`);
    }
  }
  lines.push('');
  return lines.join('\n');
}
