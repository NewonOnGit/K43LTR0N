import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';
import { homedir } from 'os';
import type { ForcedConfig, EvolutionRecord, ConstantWitness, CompanionProfile } from '../types.js';
import { defaultWorldModel, defaultGovernance, defaultSemantic, defaultConversation, defaultMemory } from './defaults.js';

const CONFIG_PATH = join(homedir(), '.claude-code-forced-buddy.json');

export function loadConfig(): ForcedConfig | null {
  if (!existsSync(CONFIG_PATH)) return null;
  try {
    const raw = JSON.parse(readFileSync(CONFIG_PATH, 'utf-8'));
    // Migrate v1 → v2
    if (raw.version === 1 || !raw.version) {
      raw.version = 2;
      raw.evolutionHistory = raw.evolutionHistory ?? [];
      raw.witnessedConstants = raw.witnessedConstants ?? [];
      raw.interactionCount = raw.interactionCount ?? 0;
      raw.battleWins = raw.battleWins ?? 0;
      raw.battleLosses = raw.battleLosses ?? 0;
    }
    // Migrate v2 → v3
    if (raw.version === 2) {
      raw.version = 3;
      raw.worldModel = raw.worldModel ?? defaultWorldModel();
      raw.governance = raw.governance ?? defaultGovernance();
      raw.semantic = raw.semantic ?? defaultSemantic();
      raw.profiles = raw.profiles ?? {};
      raw.activeProfile = raw.activeProfile ?? null;
    }
    // Ensure Level 9 fields exist (added post-v3)
    raw.conversation = raw.conversation ?? defaultConversation();
    raw.memory = raw.memory ?? defaultMemory();
    // Migration: ensure crossings array exists on memory
    raw.memory.crossings = raw.memory.crossings ?? [];
    // Add any new achievements that don't exist in config yet
    const allDefaults = defaultGovernance().achievements;
    const existingIds = new Set(raw.governance.achievements.map((a: { id: string }) => a.id));
    for (const ach of allDefaults) {
      if (!existingIds.has(ach.id)) {
        raw.governance.achievements.push(ach);
      }
    }
    return raw as ForcedConfig;
  } catch {
    return null;
  }
}

export function saveConfig(config: ForcedConfig): void {
  // Ensure v3 fields exist
  config.version = 3;
  config.evolutionHistory = config.evolutionHistory ?? [];
  config.witnessedConstants = config.witnessedConstants ?? [];
  config.interactionCount = config.interactionCount ?? 0;
  config.battleWins = config.battleWins ?? 0;
  config.battleLosses = config.battleLosses ?? 0;
  config.worldModel = config.worldModel ?? defaultWorldModel();
  config.governance = config.governance ?? defaultGovernance();
  config.semantic = config.semantic ?? defaultSemantic();
  config.profiles = config.profiles ?? {};
  config.activeProfile = config.activeProfile ?? null;
  config.conversation = config.conversation ?? defaultConversation();
  config.memory = config.memory ?? defaultMemory();
  // Cap history arrays to prevent config bloat
  if (config.worldModel.snapshotHistory.length > 20) {
    config.worldModel.snapshotHistory = config.worldModel.snapshotHistory.slice(-20);
  }
  if (config.governance.claimHistory.length > 50) {
    config.governance.claimHistory = config.governance.claimHistory.slice(-50);
  }
  if (config.semantic.contributions.length > 100) {
    config.semantic.contributions = config.semantic.contributions.slice(-100);
  }
  if (config.conversation.messages.length > 50) {
    config.conversation.messages = config.conversation.messages.slice(-50);
  }
  if (config.conversation.topicTracker.length > 30) {
    config.conversation.topicTracker = config.conversation.topicTracker.slice(-30);
  }
  // UKI: memory must forget — cap traces, prune least-accessed
  // But: newborns are protected (lastAccessed < 60s ago)
  // And: ker dies before im. Products and im terms protected.
  if (config.memory.traces.length > 250) {
    const now = Date.now();
    const isNewborn = (t: { lastAccessed: string }) =>
      now - new Date(t.lastAccessed).getTime() < 60000;

    const fresh = config.memory.traces.filter(isNewborn);
    const stale = config.memory.traces.filter(t => !isNewborn(t));

    // Prune stale: ker first, then low-m im
    const staleIm = stale.filter(t => t.source === 'im');
    const staleKer = stale.filter(t => t.source === 'ker');
    const kerKept = staleKer
      .sort((a, b) => b.accessCount - a.accessCount)
      .slice(0, Math.max(250 - staleIm.length - fresh.length, 30));

    config.memory.traces = [...fresh, ...staleIm, ...kerKept]
      .sort((a, b) => b.accessCount - a.accessCount)
      .slice(0, 250);
  }
  // Ensure crossings exist and cap at 50
  // Protect newborns (< 60s old) — don't prune what just arrived.
  // Among stale crossings, keep the most-accessed.
  config.memory.crossings = config.memory.crossings ?? [];
  if (config.memory.crossings.length > 50) {
    const now = Date.now();
    const fresh = config.memory.crossings.filter(
      c => now - new Date(c.timestamp).getTime() < 60000,
    );
    const stale = config.memory.crossings.filter(
      c => now - new Date(c.timestamp).getTime() >= 60000,
    );
    const staleKept = stale
      .sort((a, b) => b.accessCount - a.accessCount)
      .slice(0, Math.max(50 - fresh.length, 10));
    config.memory.crossings = [...fresh, ...staleKept].slice(0, 60);
  }
  writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2) + '\n');
}

export function addEvolution(record: EvolutionRecord): void {
  const config = loadConfig();
  if (!config) throw new Error('No companion configured.');
  config.evolutionHistory = config.evolutionHistory ?? [];
  config.evolutionHistory.push(record);
  saveConfig(config);
}

export function addWitnesses(witnesses: ConstantWitness[]): void {
  const config = loadConfig();
  if (!config) return;
  config.witnessedConstants = config.witnessedConstants ?? [];
  config.witnessedConstants.push(...witnesses);
  saveConfig(config);
}

export function incrementInteractions(): void {
  const config = loadConfig();
  if (!config) return;
  config.interactionCount = (config.interactionCount ?? 0) + 1;
  saveConfig(config);
}

export function recordBattle(won: boolean): void {
  const config = loadConfig();
  if (!config) return;
  if (won) config.battleWins = (config.battleWins ?? 0) + 1;
  else config.battleLosses = (config.battleLosses ?? 0) + 1;
  saveConfig(config);
}
