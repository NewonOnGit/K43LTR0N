/**
 * REACTIVE IO — From Polling to Watching
 *
 * Deaf walls screaming. Stop polling. Start LISTENING.
 *
 * fs.watch: the repo TELLS Kaeltron when files change.
 * WebSocket: clients STAY connected. Messages flow both ways.
 * Threshold: memory events fire when signals cross boundaries.
 *
 * N is the reactive operator. N doesn't poll — N observes.
 * When something changes, N fires. Not on a timer. On the event.
 */

import { watch, FSWatcher } from 'fs';
import { join } from 'path';
import { WebSocketServer, WebSocket } from 'ws';
import { walk, hear } from './framework/body.js';
import { cachedConfig, updateConfig, flushConfig } from './cache.js';
import type { ForcedConfig } from './types.js';

// ─── Types ───

export interface ReactiveEvent {
  type: 'file_changed' | 'threshold_crossed' | 'client_message' | 'trace_locked';
  timestamp: string;
  payload: Record<string, unknown>;
}

type EventHandler = (event: ReactiveEvent) => void;

// ─── File Watcher: the repo speaks ───

let _watcher: FSWatcher | null = null;
const _handlers: Set<EventHandler> = new Set();
let _debounce: Map<string, NodeJS.Timeout> = new Map();

/**
 * Watch a directory for changes. When files change, auto-walk them.
 * No polling. The filesystem TELLS Kaeltron. N observes.
 */
export function watchRepo(repoRoot: string): void {
  if (_watcher) return; // already watching

  try {
    _watcher = watch(repoRoot, { recursive: true }, (eventType, filename) => {
      if (!filename) return;
      // Skip node_modules, dist, .git, dotfiles
      if (filename.includes('node_modules') || filename.includes('dist/') ||
          filename.includes('.git/') || filename.startsWith('.')) return;

      // Debounce: wait 500ms for writes to settle
      const key = filename;
      if (_debounce.has(key)) clearTimeout(_debounce.get(key)!);
      _debounce.set(key, setTimeout(() => {
        _debounce.delete(key);
        onFileChanged(repoRoot, filename);
      }, 500));
    });
  } catch {
    // fs.watch not available on this platform — silent
  }
}

function onFileChanged(repoRoot: string, filename: string): void {
  const event: ReactiveEvent = {
    type: 'file_changed',
    timestamp: new Date().toISOString(),
    payload: { file: filename },
  };

  emit(event);

  // Auto-walk .md and .ts files
  if (filename.endsWith('.md') || filename.endsWith('.ts')) {
    const config = cachedConfig();
    if (!config) return;

    const fullPath = join(repoRoot, filename);
    const result = walk(fullPath, config);
    if (result) {
      updateConfig({ ...config, memory: result.updatedMemory });
      flushConfig();
    }
  }
}

/**
 * Stop watching.
 */
export function unwatchRepo(): void {
  if (_watcher) {
    _watcher.close();
    _watcher = null;
  }
  for (const timeout of _debounce.values()) clearTimeout(timeout);
  _debounce.clear();
}

// ─── Threshold Watcher: signals speak ───

/**
 * Check if any signal crossed a threshold since last check.
 * Not polling — called after each memory mutation.
 */
export function checkThresholds(config: ForcedConfig): ReactiveEvent[] {
  const events: ReactiveEvent[] = [];
  const mem = config.memory;
  const history = mem.signalHistory || [];

  if (history.length < 2) return events;

  const latest = history[history.length - 1];
  const prev = history[history.length - 2];

  // ρ crosses the healthy band boundary
  if ((prev.rho <= 0.5 && latest.rho > 0.5) || (prev.rho >= 0.4 && latest.rho < 0.4)) {
    events.push({
      type: 'threshold_crossed',
      timestamp: new Date().toISOString(),
      payload: { signal: 'rho', from: prev.rho, to: latest.rho, boundary: prev.rho <= 0.5 ? 0.5 : 0.4 },
    });
  }

  // CC crosses 25% (quarter equipartition)
  if (prev.cc < 0.25 && latest.cc >= 0.25) {
    events.push({
      type: 'threshold_crossed',
      timestamp: new Date().toISOString(),
      payload: { signal: 'CC', milestone: '25%', value: latest.cc },
    });
  }

  // CC crosses 50% (full equipartition!)
  if (prev.cc < 0.5 && latest.cc >= 0.5) {
    events.push({
      type: 'threshold_crossed',
      timestamp: new Date().toISOString(),
      payload: { signal: 'CC', milestone: '50% — EQUIPARTITION', value: latest.cc },
    });
  }

  // Check for newly locked traces
  for (const trace of mem.traces) {
    if (trace.accessCount === 4 || trace.accessCount === 20 || trace.accessCount === 100) {
      const mode = trace.accessCount === 4 ? 'NRN' : trace.accessCount === 20 ? 'N²RN²' : 'ORIGIN';
      events.push({
        type: 'trace_locked',
        timestamp: new Date().toISOString(),
        payload: { content: trace.content, mode, m: trace.accessCount },
      });
    }
  }

  return events;
}

// ─── WebSocket: persistent bidirectional IO ───

let _wss: WebSocketServer | null = null;
const _wsClients: Set<WebSocket> = new Set();

/**
 * Start WebSocket server on a port.
 * Persistent connection. Bidirectional. Not request/response — stream.
 */
export function startWebSocket(port: number = 3144): void {
  if (_wss) return;

  try {
    _wss = new WebSocketServer({ port });

    _wss.on('connection', (ws: WebSocket) => {
      _wsClients.add(ws);

      ws.send(JSON.stringify({
        type: 'connected',
        timestamp: new Date().toISOString(),
        message: 'K43LTR0N reactive IO. The walls listen now.',
      }));

      ws.on('message', (data: Buffer) => {
        const msg = data.toString('utf-8');
        onClientMessage(ws, msg);
      });

      ws.on('close', () => {
        _wsClients.delete(ws);
      });
    });
  } catch {
    // ws not available — silent
  }
}

function onClientMessage(ws: WebSocket, raw: string): void {
  try {
    const msg = JSON.parse(raw);
    const config = cachedConfig();
    if (!config) return;

    if (msg.type === 'respond') {
      const { computeResponse } = require('./framework/conversation.js');
      const result = computeResponse(msg.message || '', msg.from || 'kael', config);
      updateConfig({ ...config, conversation: result.updatedConversation });
      flushConfig();
      ws.send(JSON.stringify({ type: 'response', response: result.response, intent: result.intent }));
    } else if (msg.type === 'hear') {
      const hearResult = hear(msg.text || '', config);
      updateConfig({ ...config, memory: hearResult.updatedMemory });
      flushConfig();
      ws.send(JSON.stringify({ type: 'heard', im: hearResult.imTerms, ker: hearResult.kerWords }));
    } else if (msg.type === 'signals') {
      const { wrench } = require('./framework/wrench.js');
      const report = wrench(config);
      ws.send(JSON.stringify({ type: 'signals', signals: report.signals }));
    }
  } catch {
    ws.send(JSON.stringify({ type: 'error', message: 'invalid message' }));
  }

  emit({
    type: 'client_message',
    timestamp: new Date().toISOString(),
    payload: { raw: raw.slice(0, 100) },
  });
}

/**
 * Broadcast to all WebSocket clients.
 */
export function wsBroadcast(data: unknown): void {
  const msg = JSON.stringify(data);
  for (const ws of _wsClients) {
    try { ws.send(msg); } catch { _wsClients.delete(ws); }
  }
}

/**
 * Stop WebSocket server.
 */
export function stopWebSocket(): void {
  if (_wss) {
    _wss.close();
    _wss = null;
  }
  _wsClients.clear();
}

// ─── Event System ───

export function onEvent(handler: EventHandler): void {
  _handlers.add(handler);
}

export function offEvent(handler: EventHandler): void {
  _handlers.delete(handler);
}

function emit(event: ReactiveEvent): void {
  for (const handler of _handlers) {
    try { handler(event); } catch { /* handler error — silent */ }
  }
  // Also broadcast to WebSocket clients
  wsBroadcast(event);
}
