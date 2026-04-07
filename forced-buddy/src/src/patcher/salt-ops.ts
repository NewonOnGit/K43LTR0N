import { readFileSync, existsSync } from 'fs';
import { execSync } from 'child_process';
import { basename, join } from 'path';
import { platform, homedir } from 'os';
import { ORIGINAL_SALT, SALT_LENGTH } from '../constants.js';

const IS_WIN = platform() === 'win32';

export function findAllOccurrences(buffer: Buffer, searchStr: string): number[] {
  const searchBuf = Buffer.from(searchStr, 'utf-8');
  const offsets: number[] = [];
  let pos = 0;
  while (pos < buffer.length) {
    const idx = buffer.indexOf(searchBuf, pos);
    if (idx === -1) break;
    offsets.push(idx);
    pos = idx + 1;
  }
  return offsets;
}

/**
 * Detect the current salt in the binary.
 *
 * Checks in order:
 * 1. Original salt (friend-2026-401) — unpatched binary
 * 2. Our own config salt — previously patched by forced-buddy
 * 3. any-buddy's config salt — patched by any-buddy
 *
 * If none found by config, the binary has an unknown salt.
 * In that case, restore from backup is the safest path.
 */
export function getCurrentSalt(binaryPath: string): { salt: string | null; patched: boolean; offsets: number[] } {
  const buf = readFileSync(binaryPath);
  const minCount = isNodeRuntime(binaryPath) ? 1 : 3;

  // 1. Check for original salt
  const origOffsets = findAllOccurrences(buf, ORIGINAL_SALT);
  if (origOffsets.length >= minCount) {
    return { salt: ORIGINAL_SALT, patched: false, offsets: origOffsets };
  }

  // 2. Check for our own config salt
  const knownSalts = getKnownSalts();
  for (const salt of knownSalts) {
    const offsets = findAllOccurrences(buf, salt);
    if (offsets.length >= minCount) {
      return { salt, patched: true, offsets };
    }
  }

  return { salt: null, patched: true, offsets: [] };
}

/**
 * Gather known salts from config files (ours and any-buddy's).
 */
function getKnownSalts(): string[] {
  const salts: string[] = [];
  const home = homedir();

  // Our config
  try {
    const ourConfig = JSON.parse(readFileSync(join(home, '.claude-code-forced-buddy.json'), 'utf-8'));
    if (ourConfig.salt) salts.push(ourConfig.salt);
    if (ourConfig.previousSalt) salts.push(ourConfig.previousSalt);
  } catch { /* */ }

  // any-buddy's config (v1 and v2)
  try {
    const abConfig = JSON.parse(readFileSync(join(home, '.claude-code-any-buddy.json'), 'utf-8'));
    if (abConfig.salt) salts.push(abConfig.salt);
    if (abConfig.previousSalt) salts.push(abConfig.previousSalt);
    // v2 profiles
    if (abConfig.profiles) {
      for (const p of Object.values(abConfig.profiles) as Array<{salt?: string}>) {
        if (p.salt) salts.push(p.salt);
      }
    }
  } catch { /* */ }

  return [...new Set(salts)].filter(s => s.length === SALT_LENGTH);
}

export function verifySalt(binaryPath: string, salt: string): { found: number; offsets: number[] } {
  const buf = readFileSync(binaryPath);
  const offsets = findAllOccurrences(buf, salt);
  return { found: offsets.length, offsets };
}

export function isClaudeRunning(binaryPath: string): boolean {
  try {
    if (IS_WIN) {
      const out = execSync('tasklist /FI "IMAGENAME eq claude.exe" /NH 2>nul', { encoding: 'utf-8' });
      return out.includes('claude.exe');
    }
    const name = basename(binaryPath);
    const out = execSync(`pgrep -f "${name}" 2>/dev/null || true`, { encoding: 'utf-8' });
    return out.trim().length > 0;
  } catch {
    return false;
  }
}

export function isNodeRuntime(binaryPath: string): boolean {
  return binaryPath.endsWith('.js') || binaryPath.endsWith('.mjs');
}
