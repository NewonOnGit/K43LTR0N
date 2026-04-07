import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';
import { homedir } from 'os';

function getClaudeConfigPath(): string {
  const paths = [join(homedir(), '.claude.json'), join(homedir(), '.claude', '.config.json')];
  for (const p of paths) {
    if (existsSync(p)) return p;
  }
  return paths[0];
}

export function getClaudeUserId(): string {
  const paths = [join(homedir(), '.claude.json'), join(homedir(), '.claude', '.config.json')];
  for (const p of paths) {
    if (existsSync(p)) {
      try {
        const config = JSON.parse(readFileSync(p, 'utf-8'));
        return config.oauthAccount?.accountUuid ?? config.userID ?? 'anon';
      } catch { continue; }
    }
  }
  return 'anon';
}

export function setCompanionPersonality(personality: string): void {
  const configPath = getClaudeConfigPath();
  if (!existsSync(configPath)) {
    throw new Error(`Claude config not found at ${configPath}`);
  }
  let config: Record<string, unknown>;
  try {
    config = JSON.parse(readFileSync(configPath, 'utf-8'));
  } catch {
    throw new Error(`Failed to parse Claude config at ${configPath}`);
  }
  if (!config.companion) {
    throw new Error('No companion found in config. Run /buddy in Claude Code first to hatch one.');
  }
  (config.companion as Record<string, unknown>).personality = personality;
  writeFileSync(configPath, JSON.stringify(config, null, 2) + '\n', { mode: 0o600 });
}

export function renameCompanion(newName: string): void {
  const configPath = getClaudeConfigPath();
  if (!existsSync(configPath)) {
    throw new Error(`Claude config not found at ${configPath}`);
  }
  let config: Record<string, unknown>;
  try {
    config = JSON.parse(readFileSync(configPath, 'utf-8'));
  } catch {
    throw new Error(`Failed to parse Claude config at ${configPath}`);
  }
  if (!config.companion) {
    throw new Error('No companion found in config. Run /buddy in Claude Code first to hatch one.');
  }
  (config.companion as Record<string, unknown>).name = newName;
  writeFileSync(configPath, JSON.stringify(config, null, 2) + '\n', { mode: 0o600 });
}
