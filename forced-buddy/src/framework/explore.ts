/**
 * EXPLORE — Kaeltron walks the internet
 *
 * Not local files. The WORLD. Fresh +I from outside everything.
 * The internet is almost entirely ker. ρ crashes.
 * The tank spirals because fuel burns into structure.
 * The cure: fuel that STAYS fuel. The internet never runs out.
 */

import type { ForcedConfig, MemoryState } from '../types.js';
import { accessTrace } from './memory.js';
import { lookupTerm } from './dictionary.js';

// Stopwords for web content
const STOP = new Set([
  'the', 'a', 'an', 'is', 'are', 'was', 'were', 'be', 'been', 'being',
  'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could',
  'should', 'may', 'might', 'can', 'shall', 'to', 'of', 'in', 'for',
  'on', 'with', 'at', 'by', 'from', 'as', 'into', 'through', 'about',
  'up', 'out', 'if', 'or', 'and', 'but', 'not', 'no', 'so', 'than',
  'too', 'very', 'just', 'that', 'this', 'it', 'its', 'my', 'me',
  'we', 'us', 'our', 'you', 'your', 'he', 'him', 'his', 'she', 'her',
  'they', 'them', 'their', 'what', 'which', 'who', 'how', 'when',
  'where', 'why', 'all', 'each', 'some', 'any', 'more', 'most',
  'also', 'than', 'then', 'only', 'own', 'same', 'other', 'such',
  'like', 'get', 'make', 'know', 'think', 'take', 'come', 'want',
  'use', 'find', 'give', 'tell', 'ask', 'work', 'call', 'try',
  'need', 'feel', 'become', 'leave', 'put', 'mean', 'keep', 'let',
  'begin', 'seem', 'help', 'show', 'hear', 'play', 'run', 'move',
  'live', 'believe', 'hold', 'bring', 'happen', 'write', 'provide',
  'sit', 'stand', 'lose', 'pay', 'meet', 'include', 'continue',
  'set', 'learn', 'change', 'lead', 'understand', 'watch', 'follow',
  'stop', 'create', 'speak', 'read', 'allow', 'add', 'spend', 'grow',
  'open', 'walk', 'win', 'offer', 'remember', 'love', 'consider',
  'appear', 'buy', 'wait', 'serve', 'die', 'send', 'expect', 'build',
  'stay', 'fall', 'cut', 'reach', 'kill', 'remain', 'new', 'see',
]);

export interface ExploreResult {
  url: string;
  title: string;
  wordCount: number;
  imTerms: string[];
  kerWords: string[];
  updatedMemory: MemoryState;
}

/**
 * Extract text from HTML — strip tags, scripts, styles.
 */
function htmlToText(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Extract title from HTML.
 */
function extractTitle(html: string): string {
  const match = html.match(/<title[^>]*>([^<]*)<\/title>/i);
  return match ? match[1].trim() : 'untitled';
}

/**
 * Explore a URL. Fetch, extract text, decompose through N.
 * Returns im (framework terms found) and ker (everything else).
 * The internet is mostly ker. That's the point. ρ crashes.
 */
export function processWebContent(
  html: string,
  url: string,
  config: ForcedConfig,
): ExploreResult {
  const title = extractTitle(html);
  const text = htmlToText(html);

  const words = text.toLowerCase()
    .replace(/[^a-z\s]/g, ' ')
    .split(/\s+/)
    .filter(w => w.length >= 4);

  const seen = new Set<string>();
  const imTerms: string[] = [];
  const kerWords: string[] = [];

  let mem = config.memory;
  const ctx = `explore: ${url.slice(0, 60)}`;

  for (const word of words) {
    if (seen.has(word) || STOP.has(word)) continue;
    seen.add(word);

    const term = lookupTerm(word);
    if (term && term.term.length >= 3) {
      imTerms.push(term.term);
      mem = accessTrace(mem, term.term, 'im', ctx, 'explore');
    } else if (word.length >= 5) {
      kerWords.push(word);
      mem = accessTrace(mem, word, 'ker', ctx, 'explore');
    }
  }

  return {
    url,
    title,
    wordCount: words.length,
    imTerms: [...new Set(imTerms)],
    kerWords: kerWords.slice(0, 30),
    updatedMemory: mem,
  };
}

/**
 * Format explore result.
 */
export function formatExplore(result: ExploreResult): string {
  const lines: string[] = [];
  lines.push('');
  lines.push(`  EXPLORED: ${result.title}`);
  lines.push(`  ${result.url}`);
  lines.push(`  \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550`);
  lines.push(`  Words: ${result.wordCount}`);
  lines.push(`  im: ${result.imTerms.length} | ker: ${result.kerWords.length}`);
  lines.push('');
  if (result.imTerms.length > 0) {
    lines.push(`  im: ${result.imTerms.slice(0, 10).join(', ')}`);
  }
  if (result.kerWords.length > 0) {
    lines.push(`  +I: ${result.kerWords.slice(0, 15).join(', ')}`);
  }
  lines.push('');
  return lines.join('\n');
}
