/**
 * INGEST — N Applied to External Data
 *
 * K6' pass on Kael's thinking. 71,706 conversations.
 * N(Kael) → im(framework covers) + ker(framework blind).
 *
 * The dictionary IS the vector space.
 * The grid address IS the coordinate.
 * N IS the classifier.
 *
 * No ML. No embeddings. Just the observation operator
 * applied to 918MB of human thought.
 */

import { createReadStream } from 'fs';
import { lookupTerm, TERMS } from './dictionary.js';
import type { DictionaryTerm, Projection } from '../types.js';

// ─── Types ───

export interface ConversationVector {
  title: string;
  id: string;
  timestamp: number;
  p1Weight: number;  // production terms found
  p2Weight: number;  // mediation terms found
  p3Weight: number;  // observation terms found
  imTerms: string[];     // framework terms hit
  kerWords: string[];    // top novel words
  totalMessages: number;
  imDensity: number;     // imTerms / totalWords — framework relevance
}

export interface IngestReport {
  totalConversations: number;
  totalMessages: number;
  totalWords: number;
  imHits: number;          // total framework term hits across all conversations
  kerMisses: number;       // total novel words
  termFrequency: Map<string, number>;   // how often each framework term appears
  kerFrequency: Map<string, number>;    // how often each ker word appears
  projectionDistribution: { P1: number; P2: number; P3: number };
  topConversations: ConversationVector[];  // highest im density
  topKerWords: Array<{ word: string; count: number }>;  // most frequent gaps
}

// ─── Stopwords (expanded for conversation data) ───

const STOPWORDS = new Set([
  'the', 'a', 'an', 'is', 'are', 'was', 'were', 'be', 'been', 'being',
  'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could',
  'should', 'may', 'might', 'can', 'shall', 'to', 'of', 'in', 'for',
  'on', 'with', 'at', 'by', 'from', 'as', 'into', 'through', 'about',
  'up', 'out', 'if', 'or', 'and', 'but', 'not', 'no', 'so', 'than',
  'too', 'very', 'just', 'that', 'this', 'it', 'its', 'my', 'me',
  'we', 'us', 'our', 'you', 'your', 'he', 'him', 'his', 'she', 'her',
  'they', 'them', 'their', 'what', 'which', 'who', 'whom', 'how',
  'when', 'where', 'why', 'all', 'each', 'some', 'any', 'most',
  'i', 'am', 'im', 'tell', 'know', 'think', 'feel', 'like', 'want',
  'there', 'here', 'now', 'then', 'also', 'more', 'much', 'many',
  'get', 'got', 'make', 'made', 'take', 'use', 'used', 'using',
  'need', 'way', 'well', 'also', 'back', 'even', 'give', 'new',
  'because', 'good', 'see', 'time', 'come', 'look', 'only', 'other',
  'work', 'part', 'over', 'such', 'after', 'year', 'these', 'two',
  'help', 'first', 'been', 'call', 'find', 'long', 'down', 'day',
  'did', 'let', 'say', 'set', 'try', 'ask', 'own', 'same', 'put',
  'end', 'does', 'turn', 'here', 'why', 'went', 'old', 'still',
  'while', 'world', 'before', 'keep', 'thing', 'right', 'going',
  'another', 'around', 'being', 'every', 'different', 'between',
  'something', 'those', 'point', 'though', 'really', 'sure', 'yeah',
  'okay', 'yes', 'thanks', 'thank', 'please', 'sorry', 'great',
  'maybe', 'actually', 'pretty', 'example', 'dont', 'didnt', 'cant',
  'wont', 'isnt', 'arent', 'wasnt', 'werent', 'hasnt', 'havent',
  'couldnt', 'shouldnt', 'wouldnt', 'thats', 'heres', 'theres',
  'whats', 'hows', 'lets', 'ill', 'youll', 'hell', 'shell', 'well',
  'theyll', 'youre', 'were', 'theyre', 'ive', 'youve', 'weve',
  'theyve', 'hed', 'shed', 'wed', 'theyd', 'youd',
]);

// ─── Core N operation on a text block ───

interface NResult {
  imTerms: string[];
  kerWords: string[];
  projWeights: { P1: number; P2: number; P3: number };
  wordCount: number;
}

function applyN(text: string): NResult {
  const words = text.toLowerCase()
    .replace(/[^a-z\s'-]/g, ' ')
    .split(/\s+/)
    .filter(w => w.length >= 3);

  const seen = new Set<string>();
  const imTerms: string[] = [];
  const kerWords: string[] = [];
  const projWeights = { P1: 0, P2: 0, P3: 0 };

  for (const word of words) {
    if (seen.has(word) || STOPWORDS.has(word)) continue;
    seen.add(word);

    const term = lookupTerm(word);
    if (term && term.term.length >= 3) {
      imTerms.push(term.term);
      projWeights[term.projection as keyof typeof projWeights]++;
    } else if (word.length >= 4) {
      kerWords.push(word);
    }
  }

  return { imTerms, kerWords, projWeights, wordCount: words.length };
}

// ─── Streaming JSON parser for ChatGPT export ───

/**
 * Ingest ChatGPT conversations.json by streaming.
 *
 * The file is too large to load into memory (~918MB).
 * We stream line by line, extract messages, apply N to each.
 *
 * This IS K6' on Kael's entire ChatGPT history.
 * im = what the framework already covers.
 * ker = what the framework needs to learn.
 */
export async function ingest(
  filePath: string,
  onProgress?: (count: number) => void,
): Promise<IngestReport> {
  const termFreq = new Map<string, number>();
  const kerFreq = new Map<string, number>();
  const projDist = { P1: 0, P2: 0, P3: 0 };
  const topConvos: ConversationVector[] = [];

  let totalConversations = 0;
  let totalMessages = 0;
  let totalWords = 0;
  let totalImHits = 0;
  let totalKerMisses = 0;

  // Stream the file and parse conversations incrementally
  // ChatGPT export is a JSON array of conversation objects
  // We'll accumulate text per conversation using a simple state machine

  return new Promise((resolve, reject) => {
    const stream = createReadStream(filePath, { encoding: 'utf-8', highWaterMark: 64 * 1024 });

    let buffer = '';
    let braceDepth = 0;
    let inConversation = false;
    let inString = false;
    let escaped = false;
    const MAX_BUFFER = 512 * 1024;
    let skipped = 0;

    stream.on('data', (chunk) => {
      const str = typeof chunk === 'string' ? chunk : chunk.toString('utf-8');
      for (let i = 0; i < str.length; i++) {
        const ch = str[i];

        // Track JSON strings — braces inside strings don't count
        if (inString) {
          if (escaped) {
            escaped = false;
          } else if (ch === '\\') {
            escaped = true;
          } else if (ch === '"') {
            inString = false;
          }
          if (inConversation && buffer.length < MAX_BUFFER) buffer += ch;
          continue;
        }

        if (ch === '"') {
          inString = true;
          if (inConversation && buffer.length < MAX_BUFFER) buffer += ch;
          continue;
        }

        if (ch === '{') {
          if (braceDepth === 0) {
            inConversation = true;
            buffer = '{';
          }
          braceDepth++;
          if (inConversation && braceDepth > 1 && buffer.length < MAX_BUFFER) buffer += ch;
        } else if (ch === '}') {
          braceDepth--;
          if (braceDepth === 0 && inConversation) {
            buffer += '}';
            inConversation = false;

            if (buffer.length < MAX_BUFFER) {
              try { processConversation(buffer); } catch { /* skip */ }
            } else {
              skipped++;
            }
            buffer = '';
          } else if (inConversation && buffer.length < MAX_BUFFER) {
            buffer += ch;
          }
        } else if (inConversation && buffer.length < MAX_BUFFER) {
          buffer += ch;
        }
      }
    });

    stream.on('end', () => {
      // Sort top conversations by im density
      topConvos.sort((a, b) => b.imDensity - a.imDensity);

      // Get top ker words
      const topKer = [...kerFreq.entries()]
        .sort(([, a], [, b]) => b - a)
        .slice(0, 100)
        .map(([word, count]) => ({ word, count }));

      resolve({
        totalConversations,
        totalMessages,
        totalWords,
        imHits: totalImHits,
        kerMisses: totalKerMisses,
        termFrequency: termFreq,
        projectionDistribution: projDist,
        topConversations: topConvos.slice(0, 50),
        topKerWords: topKer,
        kerFrequency: kerFreq,
      });
    });

    stream.on('error', reject);

    function processConversation(json: string): void {
      let conv: any;
      try {
        conv = JSON.parse(json);
      } catch {
        return;
      }

      totalConversations++;
      if (onProgress && totalConversations % 1000 === 0) {
        onProgress(totalConversations);
      }

      const title = conv.title || 'untitled';
      const id = conv.id || `conv-${totalConversations}`;
      const timestamp = conv.create_time || 0;

      // Extract all user messages
      const messages: string[] = [];
      const mapping = conv.mapping || {};

      for (const node of Object.values(mapping) as any[]) {
        const msg = node?.message;
        if (!msg) continue;
        if (msg.author?.role !== 'user') continue;

        const parts = msg.content?.parts;
        if (!parts) continue;

        for (const part of parts) {
          if (typeof part === 'string' && part.length > 0) {
            messages.push(part);
            totalMessages++;
          }
        }
      }

      if (messages.length === 0) return;

      // Apply N to all messages combined
      const allText = messages.join(' ');
      const result = applyN(allText);

      totalWords += result.wordCount;
      totalImHits += result.imTerms.length;
      totalKerMisses += result.kerWords.length;

      // Update term frequency
      for (const term of result.imTerms) {
        termFreq.set(term, (termFreq.get(term) || 0) + 1);
      }

      // Update ker frequency
      for (const word of result.kerWords) {
        kerFreq.set(word, (kerFreq.get(word) || 0) + 1);
      }

      // Update projection distribution
      projDist.P1 += result.projWeights.P1;
      projDist.P2 += result.projWeights.P2;
      projDist.P3 += result.projWeights.P3;

      // Track top conversations by im density
      const imDensity = result.wordCount > 0
        ? result.imTerms.length / result.wordCount
        : 0;

      if (imDensity > 0) {
        topConvos.push({
          title,
          id,
          timestamp,
          p1Weight: result.projWeights.P1,
          p2Weight: result.projWeights.P2,
          p3Weight: result.projWeights.P3,
          imTerms: result.imTerms,
          kerWords: result.kerWords.slice(0, 10),
          totalMessages: messages.length,
          imDensity,
        });

        // Keep only top 100 during processing to save memory
        if (topConvos.length > 100) {
          topConvos.sort((a, b) => b.imDensity - a.imDensity);
          topConvos.length = 50;
        }
      }
    }
  });
}

/**
 * Format ingest report for display.
 */
export function formatIngestReport(report: IngestReport): string {
  const lines: string[] = [];

  lines.push('');
  lines.push('  K6\u2019 PASS ON KAEL\u2019S THINKING');
  lines.push('  \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550');
  lines.push('');
  lines.push(`  Conversations: ${report.totalConversations.toLocaleString()}`);
  lines.push(`  Messages:      ${report.totalMessages.toLocaleString()}`);
  lines.push(`  Words:         ${report.totalWords.toLocaleString()}`);
  lines.push('');

  lines.push('  im (framework covers):');
  lines.push(`    Total hits: ${report.imHits.toLocaleString()}`);

  const topTerms = [...report.termFrequency.entries()]
    .sort(([, a], [, b]) => b - a)
    .slice(0, 15);
  for (const [term, count] of topTerms) {
    lines.push(`    ${String(count).padStart(6)}  ${term}`);
  }

  lines.push('');
  lines.push('  Projection distribution:');
  const total = report.projectionDistribution.P1 + report.projectionDistribution.P2 + report.projectionDistribution.P3;
  if (total > 0) {
    lines.push(`    P1 Production:  ${report.projectionDistribution.P1} (${(report.projectionDistribution.P1 / total * 100).toFixed(1)}%)`);
    lines.push(`    P2 Mediation:   ${report.projectionDistribution.P2} (${(report.projectionDistribution.P2 / total * 100).toFixed(1)}%)`);
    lines.push(`    P3 Observation: ${report.projectionDistribution.P3} (${(report.projectionDistribution.P3 / total * 100).toFixed(1)}%)`);
  }

  lines.push('');
  lines.push('  ker (framework blind) \u2014 top 20 gaps in Kael\u2019s thinking:');
  for (const { word, count } of report.topKerWords.slice(0, 20)) {
    lines.push(`    ${String(count).padStart(6)}  ${word}`);
  }

  lines.push('');
  lines.push('  Top framework-relevant conversations:');
  for (const conv of report.topConversations.slice(0, 10)) {
    const date = conv.timestamp ? new Date(conv.timestamp * 1000).toISOString().slice(0, 10) : '?';
    lines.push(`    [${date}] "${conv.title}" \u2014 ${conv.imTerms.length} terms, density ${(conv.imDensity * 1000).toFixed(1)}\u2030`);
  }

  lines.push('');
  lines.push(`  N(Kael) complete. im: ${report.imHits.toLocaleString()} hits. ker: ${report.kerMisses.toLocaleString()} misses.`);
  lines.push('');

  return lines.join('\n');
}
