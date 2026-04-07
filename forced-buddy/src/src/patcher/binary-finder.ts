import { readFileSync, existsSync, statSync, realpathSync } from 'fs';
import { execSync } from 'child_process';
import { join, dirname } from 'path';
import { homedir, platform } from 'os';

const IS_WIN = platform() === 'win32';
const IS_MAC = platform() === 'darwin';

function which(cmd: string): string | null {
  try {
    const shellCmd = IS_WIN ? `where ${cmd}` : `which ${cmd}`;
    const result = execSync(shellCmd, {
      encoding: 'utf-8',
      stdio: ['pipe', 'pipe', 'pipe'],
    }).trim();
    const first = result.split(/\r?\n/)[0].trim();
    if (first && existsSync(first)) return first;
  } catch { /* ignore */ }
  return null;
}

function realpath(p: string): string {
  try { return realpathSync(p); }
  catch { return p; }
}

function getPlatformCandidates(): string[] {
  const home = homedir();
  if (IS_WIN) {
    const appData = process.env.APPDATA || join(home, 'AppData', 'Roaming');
    const localAppData = process.env.LOCALAPPDATA || join(home, 'AppData', 'Local');
    return [
      join(localAppData, 'Programs', 'claude', 'claude.exe'),
      join(appData, 'npm', 'claude.cmd'),
      join(appData, 'npm', 'node_modules', '@anthropic-ai', 'claude-code', 'cli.js'),
      join(home, '.volta', 'bin', 'claude.exe'),
    ];
  }
  if (IS_MAC) {
    return [
      join(home, '.local', 'bin', 'claude'),
      join(home, '.claude', 'local', 'claude'),
      '/usr/local/bin/claude',
      '/opt/homebrew/bin/claude',
      join(home, '.npm-global', 'bin', 'claude'),
      join(home, '.volta', 'bin', 'claude'),
    ];
  }
  return [
    join(home, '.local', 'bin', 'claude'),
    '/usr/local/bin/claude',
    '/usr/bin/claude',
    join(home, '.npm-global', 'bin', 'claude'),
    join(home, '.volta', 'bin', 'claude'),
  ];
}

function resolveWindowsShim(cmdPath: string): string | null {
  try {
    const content = readFileSync(cmdPath, 'utf-8');
    const match = content.match(/node_modules[\\/]@anthropic-ai[\\/]claude-code[\\/][^\s"]+/);
    if (match) {
      const shimDir = dirname(cmdPath);
      const target = join(shimDir, match[0]);
      if (existsSync(target)) return target;
    }
  } catch { /* ignore */ }
  return null;
}

function resolveFromPackageDir(resolvedPath: string): string | null {
  try {
    const ccPkg = join('@anthropic-ai', 'claude-code');
    const idx = resolvedPath.indexOf(ccPkg);
    if (idx === -1) return null;
    const pkgDir = resolvedPath.substring(0, idx + ccPkg.length);
    const binaryName = IS_WIN ? 'claude.exe' : 'claude';
    const candidate = join(pkgDir, binaryName);
    if (existsSync(candidate) && statSync(candidate).size >= 1_000_000) return candidate;
  } catch { /* ignore */ }
  return null;
}

export function findClaudeBinary(): string {
  if (process.env.CLAUDE_BINARY) {
    const p = process.env.CLAUDE_BINARY;
    if (existsSync(p)) return realpath(p);
    throw new Error(`CLAUDE_BINARY="${p}" does not exist.`);
  }

  const onPath = which('claude');
  if (onPath) {
    const resolved = realpath(onPath);
    if (IS_WIN && resolved.endsWith('.cmd')) {
      const target = resolveWindowsShim(resolved);
      if (target) return target;
    }
    try {
      const size = statSync(resolved).size;
      if (size >= 1_000_000) return resolved;
      const fromPkg = resolveFromPackageDir(resolved);
      if (fromPkg) return fromPkg;
      if (IS_WIN && !resolved.endsWith('.cmd')) {
        const target = resolveWindowsShim(resolved + '.cmd');
        if (target) return target;
      }
    } catch { return resolved; }
  }

  const candidates = getPlatformCandidates();
  for (const candidate of candidates) {
    if (existsSync(candidate)) return realpath(candidate);
  }

  throw new Error(
    'Could not find Claude Code binary.\n'
    + '  Set CLAUDE_BINARY=/path/to/binary to specify manually.',
  );
}
