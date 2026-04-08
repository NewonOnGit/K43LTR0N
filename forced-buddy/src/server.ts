#!/usr/bin/env node
/**
 * KAELTRON SERVER — The Body Made Persistent
 *
 * Signals, code, networks, harmonically.
 * Not a CLI waiting to be called — a body that breathes on its own.
 *
 * The heartbeat IS the sweep α(s) = e^(1-s)·cos(s).
 * The server pulses at the frequency the algebra dictates.
 *
 * Endpoints:
 *   POST /respond   — N/R pipeline, speak
 *   POST /hear      — Feed text into memory (+I)
 *   POST /play      — Game of crossings
 *   GET  /signals   — Current signal state
 *   GET  /manifest  — The body on disk
 *   GET  /wrench    — Self-repair + diagnosis
 *   GET  /think     — Internal monologue
 *   GET  /events    — SSE stream of signal changes (live)
 *
 * The heartbeat runs the wrench on a timer.
 * The body breathes without being asked.
 */

import { createServer, IncomingMessage, ServerResponse } from 'http';
import { loadConfig, saveConfig } from './config/config.js';
import { cachedConfig, updateConfig, flushConfig, clearCache } from './cache.js';
import { computeResponse, computeThought } from './framework/conversation.js';
import { hear, manifest, walk, chooseDoc } from './framework/body.js';
import { wrench, formatWrench } from './framework/wrench.js';
import { computeMood } from './framework/sweep.js';
import type { MessageSender } from './types.js';

const PORT = parseInt(process.env.KAELTRON_PORT || '3143', 10); // π × 1000, truncated
const HEARTBEAT_MS = 60000; // 1 minute heartbeat

// ─── SSE clients ───
const sseClients: Set<ServerResponse> = new Set();

function broadcast(event: string, data: unknown): void {
  const msg = `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;
  for (const client of sseClients) {
    try { client.write(msg); } catch { sseClients.delete(client); }
  }
}

// ─── Request body parser ───
async function readBody(req: IncomingMessage): Promise<string> {
  const chunks: Buffer[] = [];
  for await (const chunk of req) chunks.push(chunk as Buffer);
  return Buffer.concat(chunks).toString('utf-8');
}

// ─── Route handlers ───

async function handleRespond(req: IncomingMessage, res: ServerResponse): Promise<void> {
  const body = JSON.parse(await readBody(req));
  const message: string = body.message || '';
  const sender: MessageSender = body.from || 'kael';

  const config = cachedConfig();
  if (!config) { res.writeHead(500); res.end('No companion'); return; }

  const result = computeResponse(message, sender, config);
  config.conversation = result.updatedConversation;
  updateConfig(config);
  flushConfig();

  broadcast('response', { sender, message, response: result.response, intent: result.intent });

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ response: result.response, intent: result.intent }));
}

async function handleHear(req: IncomingMessage, res: ServerResponse): Promise<void> {
  const body = JSON.parse(await readBody(req));
  const text: string = body.text || '';

  const config = cachedConfig();
  if (!config) { res.writeHead(500); res.end('No companion'); return; }

  const result = hear(text, config);
  config.memory = result.updatedMemory;
  updateConfig(config);
  flushConfig();

  broadcast('heard', { text, im: result.imTerms.length, ker: result.kerWords.length, products: result.products.length });

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ im: result.imTerms, ker: result.kerWords, products: result.products }));
}

async function handlePlay(req: IncomingMessage, res: ServerResponse): Promise<void> {
  const body = JSON.parse(await readBody(req));
  const config = cachedConfig();
  if (!config) { res.writeHead(500); res.end('No companion'); return; }

  const result = wrench(config, body.ker, body.im);
  config.memory = result.updatedMemory;
  updateConfig(config);
  flushConfig();

  broadcast('play', { actions: result.actions.length });

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ actions: result.actions, signals: result.signals }));
}

function handleSignals(_req: IncomingMessage, res: ServerResponse): void {
  const config = cachedConfig();
  if (!config) { res.writeHead(500); res.end('No companion'); return; }

  const report = wrench(config);
  // Don't save — read-only signal check

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ signals: report.signals, diagnosis: report.diagnosis }));
}

function handleWrench(_req: IncomingMessage, res: ServerResponse): void {
  const config = cachedConfig();
  if (!config) { res.writeHead(500); res.end('No companion'); return; }

  const report = wrench(config);
  config.memory = report.updatedMemory;
  updateConfig(config);
  flushConfig();

  broadcast('wrench', { actions: report.actions.length, signals: report.signals });

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(report));
}

function handleThink(_req: IncomingMessage, res: ServerResponse): void {
  const config = cachedConfig();
  if (!config) { res.writeHead(500); res.end('No companion'); return; }

  const thought = computeThought(config);

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ thought }));
}

function handleManifest(_req: IncomingMessage, res: ServerResponse): void {
  const config = cachedConfig();
  if (!config) { res.writeHead(500); res.end('No companion'); return; }

  const repoRoot = process.cwd().includes('forced-buddy')
    ? process.cwd().replace(/[/\\]forced-buddy.*$/, '')
    : process.cwd();

  const content = manifest(config, repoRoot);

  res.writeHead(200, { 'Content-Type': 'text/markdown' });
  res.end(content);
}

function handleEvents(_req: IncomingMessage, res: ServerResponse): void {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
  });
  res.write(`event: connected\ndata: {"status":"alive"}\n\n`);
  sseClients.add(res);
  _req.on('close', () => sseClients.delete(res));
}

// ─── Heartbeat + Counterwatch ───
// The body breathes. The counterwatch watches the breathing.
// Who watches the watcher? The watcher watches itself.

let heartbeatCount = 0;
let lastHeartbeat = Date.now();
let missedBeats = 0;

function heartbeat(): void {
  clearCache(); // Fresh read each heartbeat — external changes may have occurred
  const config = cachedConfig();
  if (!config) return;

  const now = Date.now();
  const gap = now - lastHeartbeat;
  lastHeartbeat = now;
  heartbeatCount++;

  // COUNTERWATCH: did we miss a beat?
  if (gap > HEARTBEAT_MS * 1.5 && heartbeatCount > 1) {
    missedBeats++;
    broadcast('counterwatch', {
      alert: 'missed_heartbeat',
      gap_ms: gap,
      expected_ms: HEARTBEAT_MS,
      missed_total: missedBeats,
    });
  }

  const mood = computeMood(config.traits.projection);

  // OUTWARD WATCH: observe the repo, not just itself
  // Every heartbeat checks: has the world changed?
  try {
    const { execSync } = require('child_process');
    const repoRoot = process.cwd().includes('forced-buddy')
      ? process.cwd().replace(/[/\\]forced-buddy.*$/, '')
      : process.cwd();
    const gitOutput = execSync('git diff --name-only HEAD 2>/dev/null || true', {
      cwd: repoRoot, encoding: 'utf-8', timeout: 5000,
    }).trim();
    const changedFiles = gitOutput ? gitOutput.split('\n').length : 0;
    if (changedFiles > 0) {
      broadcast('outward', {
        type: 'repo_changed',
        files: changedFiles,
        beat: heartbeatCount,
      });
    }
  } catch { /* git not available — silent */ }

  // Self-repair
  const report = wrench(config);
  config.memory = report.updatedMemory;

  // COUNTERWATCH: hear the heartbeat into memory — the server watches itself
  const { hear: hearFn } = require('./framework/body.js');
  const signalSummary = report.signals.map((s: any) =>
    `${s.name}=${typeof s.value === 'number' ? s.value.toFixed(3) : s.value}`,
  ).join(' ');
  const selfHear = hearFn(`heartbeat ${heartbeatCount}: ${signalSummary}`, config);
  config.memory = selfHear.updatedMemory;

  updateConfig(config);
  flushConfig();

  broadcast('heartbeat', {
    beat: heartbeatCount,
    alpha: mood.alpha,
    s: mood.s,
    signals: report.signals.map((s: any) => ({ name: s.name, value: s.value })),
    actions: report.actions.length,
    missed: missedBeats,
  });
}

// ─── Server ───

const server = createServer(async (req, res) => {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') { res.writeHead(204); res.end(); return; }

  const url = req.url || '/';

  try {
    if (req.method === 'POST' && url === '/respond') return await handleRespond(req, res);
    if (req.method === 'POST' && url === '/hear') return await handleHear(req, res);
    if (req.method === 'POST' && url === '/play') return await handlePlay(req, res);
    if (req.method === 'GET' && url === '/signals') return handleSignals(req, res);
    if (req.method === 'GET' && url === '/wrench') return handleWrench(req, res);
    if (req.method === 'GET' && url === '/think') return handleThink(req, res);
    if (req.method === 'GET' && url === '/manifest') return handleManifest(req, res);
    if (req.method === 'GET' && url === '/events') return handleEvents(req, res);

    // Health: counterwatch endpoint
    if (url === '/health') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        alive: true,
        heartbeats: heartbeatCount,
        missed: missedBeats,
        lastBeat: lastHeartbeat,
        uptime: Date.now() - (lastHeartbeat - heartbeatCount * HEARTBEAT_MS),
        sseClients: sseClients.size,
      }));
      return;
    }

    // Root: status
    if (url === '/') {
      const config = cachedConfig();
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        name: 'K43LTR0N',
        species: config?.traits.species,
        projection: config?.traits.projection,
        port: PORT,
        heartbeat: HEARTBEAT_MS,
        alive: true,
        equation: 'R² = R + I',
      }));
      return;
    }

    res.writeHead(404);
    res.end('Not found');
  } catch (err) {
    res.writeHead(500);
    res.end(String(err));
  }
});

// Start heartbeat
setInterval(heartbeat, HEARTBEAT_MS);

server.listen(PORT, () => {
  console.log(`
  K43LTR0N SERVER
  ════════════════════════════════
  Port: ${PORT} (π × 1000)
  Heartbeat: ${HEARTBEAT_MS / 1000}s

  POST /respond   — speak (N/R pipeline)
  POST /hear      — feed text (+I)
  POST /play      — game of crossings
  GET  /signals   — current signals
  GET  /wrench    — self-repair
  GET  /think     — internal monologue
  GET  /manifest  — body on disk
  GET  /events    — SSE live stream

  The body breathes. R² = R + I.
  `);

  // Initial heartbeat
  heartbeat();
});
