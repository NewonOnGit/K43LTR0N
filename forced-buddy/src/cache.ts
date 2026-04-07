/**
 * CACHE — Stop limping. Start scaling.
 *
 * 43 loadConfig calls → 1 actual load.
 * 11 computeMood calls → 1 actual compute.
 * 16 lookupTerm calls → cached results.
 *
 * One tick, one load, one mood, one set of traces.
 * The cache IS the efficiency. R applied once, result reused.
 */

import type { ForcedConfig, MoodState, DictionaryTerm, MemoryTrace } from './types.js';

let _config: ForcedConfig | null = null;
let _configDirty = false;
let _mood: MoodState | null = null;
let _locked: MemoryTrace[] | null = null;
let _gaps: MemoryTrace[] | null = null;
let _termCache: Map<string, DictionaryTerm | null> = new Map();

/**
 * Load config once per process. 43 calls → 1 disk read.
 */
export function cachedConfig(): ForcedConfig | null {
  if (!_config) {
    const { loadConfig } = require('./config/config.js');
    _config = loadConfig();
  }
  return _config;
}

/**
 * Mark config as dirty (needs saving).
 */
export function updateConfig(config: ForcedConfig): void {
  _config = config;
  _configDirty = true;
  // Invalidate derived caches
  _mood = null;
  _locked = null;
  _gaps = null;
}

/**
 * Save config if dirty. Call once at end of process.
 */
export function flushConfig(): void {
  if (_config && _configDirty) {
    const { saveConfig } = require('./config/config.js');
    saveConfig(_config);
    _configDirty = false;
  }
}

/**
 * Cached mood. 11 calls → 1 compute per process.
 */
export function cachedMood(projection: import('./types.js').Projection): MoodState {
  if (!_mood) {
    const { computeMood } = require('./framework/sweep.js');
    _mood = computeMood(projection) as MoodState;
  }
  return _mood!;
}

/**
 * Cached locked traces. 5 calls → 1 filter.
 */
export function cachedLocked(): MemoryTrace[] {
  if (!_locked) {
    const config = cachedConfig();
    if (!config) return [];
    _locked = config.memory.traces.filter(
      (t: MemoryTrace) => t.accessCount >= 4 && t.source === 'im',
    );
  }
  return _locked;
}

/**
 * Cached named gaps. 3 calls → 1 filter.
 */
export function cachedGaps(): MemoryTrace[] {
  if (!_gaps) {
    const config = cachedConfig();
    if (!config) return [];
    _gaps = config.memory.traces.filter(
      (t: MemoryTrace) => t.source === 'ker' && t.accessCount >= 3,
    );
  }
  return _gaps;
}

/**
 * Cached term lookup. 16 calls → map lookup after first scan.
 */
export function cachedLookup(query: string): DictionaryTerm | null {
  const key = query.toLowerCase();
  if (_termCache.has(key)) return _termCache.get(key)!;
  const { lookupTerm } = require('./framework/dictionary.js');
  const result = lookupTerm(query);
  _termCache.set(key, result);
  return result;
}

/**
 * Clear all caches. Call between independent operations.
 */
export function clearCache(): void {
  _config = null;
  _configDirty = false;
  _mood = null;
  _locked = null;
  _gaps = null;
  _termCache.clear();
}
