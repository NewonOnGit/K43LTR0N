import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join, resolve } from 'path';
import { homedir } from 'os';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const SETTINGS_PATH = join(homedir(), '.claude', 'settings.json');

// Resolve the project root from this file's location
const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = resolve(__dirname, '..', '..');

// The hook command uses node directly with the compiled JS (no tsx needed at runtime)
// Falls back to tsx if dist doesn't exist
function getHookCommand(): string {
  const distCli = join(PROJECT_ROOT, 'dist', 'cli.js');
  if (existsSync(distCli)) {
    return `node "${distCli}" apply --silent`;
  }
  // Fallback: use tsx from the project
  return `npx --prefix "${PROJECT_ROOT}" tsx "${join(PROJECT_ROOT, 'src', 'cli.ts')}" apply --silent`;
}

// Match any forced-buddy hook command (current or legacy)
function isOurHook(command: string): boolean {
  return command.includes('forced-buddy') || command.includes('forced-bud') || command.includes('cli.js" apply') || command.includes('cli.ts" apply');
}

interface HookEntry { type: string; command: string; }
interface MatcherEntry { matcher: string; hooks: HookEntry[]; }
interface ClaudeSettings {
  hooks?: { SessionStart?: MatcherEntry[]; [key: string]: MatcherEntry[] | undefined; };
  [key: string]: unknown;
}

function getClaudeSettings(): ClaudeSettings {
  if (!existsSync(SETTINGS_PATH)) return {};
  try { return JSON.parse(readFileSync(SETTINGS_PATH, 'utf-8')); }
  catch { return {}; }
}

function saveClaudeSettings(settings: ClaudeSettings): void {
  const dir = join(homedir(), '.claude');
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  writeFileSync(SETTINGS_PATH, JSON.stringify(settings, null, 2) + '\n', { mode: 0o600 });
}

function findHookEntry(matchers: MatcherEntry[] | undefined): MatcherEntry | null {
  if (!Array.isArray(matchers)) return null;
  return matchers.find(m =>
    Array.isArray(m.hooks) && m.hooks.some(h => isOurHook(h.command))
  ) ?? null;
}

export function isHookInstalled(): boolean {
  return findHookEntry(getClaudeSettings().hooks?.SessionStart) !== null;
}

export function installHook(): void {
  const settings = getClaudeSettings();
  if (!settings.hooks) settings.hooks = {};
  if (!Array.isArray(settings.hooks.SessionStart)) settings.hooks.SessionStart = [];

  // Remove any old/broken forced-buddy hooks first
  settings.hooks.SessionStart = settings.hooks.SessionStart.filter(
    m => !Array.isArray(m.hooks) || !m.hooks.some(h => isOurHook(h.command))
  );

  // Add fresh hook with correct absolute path
  settings.hooks.SessionStart.push({
    matcher: '',
    hooks: [{ type: 'command', command: getHookCommand() }],
  });

  saveClaudeSettings(settings);
}

export function removeHook(): void {
  const settings = getClaudeSettings();
  if (!settings.hooks?.SessionStart) return;
  settings.hooks.SessionStart = settings.hooks.SessionStart.filter(
    m => !Array.isArray(m.hooks) || !m.hooks.some(h => isOurHook(h.command))
  );
  if (settings.hooks.SessionStart.length === 0) delete settings.hooks.SessionStart;
  if (Object.keys(settings.hooks).length === 0) delete settings.hooks;
  saveClaudeSettings(settings);
}
