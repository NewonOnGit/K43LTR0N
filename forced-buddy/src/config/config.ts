import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';
import { homedir } from 'os';
import type { ForcedConfig, EvolutionRecord, ConstantWitness, CompanionProfile } from '../types.js';
import { defaultWorldModel, defaultGovernance, defaultSemantic } from './defaults.js';

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
