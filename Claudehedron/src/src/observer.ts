/**
 * Hedron Observer
 *
 * Observes ALL components of the environment — not just the repo (that's
 * Kaeltron's job via repo-observer), but the entire CLI surface:
 * CLAUDE.md, settings, hooks, memory, companion, tools, permissions.
 *
 * This is the P3 face of the Claudehedron made operational.
 * Every observation has im (what it reveals) and ker (what it annihilates).
 */

import { existsSync, readFileSync, readdirSync, statSync } from 'fs';
import { join, basename } from 'path';
import { execSync } from 'child_process';
import type { EnvironmentComponent, CompanionState, Projection, TowerLevel } from './types.js';
import { createHash } from 'crypto';
import { observeHistory } from './history-observer.js';
import { observeStats, observeDebugLogs, observePlans, observeTodos } from './stats-observer.js';

function fileHash(path: string): string {
  try {
    const content = readFileSync(path, 'utf-8');
    return createHash('sha256').update(content).digest('hex').slice(0, 16);
  } catch {
    return 'unreadable';
  }
}

function fileModified(path: string): string {
  try {
    return statSync(path).mtime.toISOString();
  } catch {
    return 'unknown';
  }
}

/**
 * Observe the CLAUDE.md instruction file
 */
export function observeClaudeMd(repoRoot: string): EnvironmentComponent {
  const path = join(repoRoot, 'CLAUDE.md');
  const present = existsSync(path);
  const im = present
    ? ['framework instructions', 'projection guide', 'terminology', 'directory structure', 'companion reference']
    : [];
  const ker = [
    'instructions the model ignores or misinterprets',
    'framework nuances too subtle for current vocabulary depth',
    'contradictions between CLAUDE.md and actual behavior',
  ];

  return {
    name: 'CLAUDE.md',
    path,
    present,
    hash: present ? fileHash(path) : undefined,
    lastModified: present ? fileModified(path) : undefined,
    towerLevel: 8,  // semantic level — it's vocabulary + instructions
    projection: 'P2', // mediation — it bridges framework to model
    status: 'FORCED',
    im,
    ker,
  };
}

/**
 * Observe the memory system
 */
export function observeMemory(homeDir: string): EnvironmentComponent {
  const memoryDir = join(
    homeDir,
    '.claude',
    'projects',
    'C--Users-ginge-Downloads-Self-Reference-v2-Referencing-you',
    'memory',
  );
  const present = existsSync(memoryDir);
  let fileCount = 0;
  let entries: string[] = [];

  if (present) {
    try {
      const files = readdirSync(memoryDir).filter((f) => f.endsWith('.md'));
      fileCount = files.length;
      entries = files.map((f) => basename(f, '.md'));
    } catch {
      // directory exists but can't read
    }
  }

  return {
    name: 'Memory System',
    path: memoryDir,
    present,
    towerLevel: 6, // world-model — persists across sessions
    projection: 'P2', // mediation — bridges sessions
    status: 'ENCODED',
    im: present
      ? [`${fileCount} memory files`, ...entries.map((e) => `memory: ${e}`)]
      : ['no memory system found'],
    ker: [
      'memories that should exist but dont',
      'stale memories not yet updated',
      'information too ephemeral to store but too important to lose',
    ],
  };
}

/**
 * Observe hooks configuration
 */
export function observeHooks(homeDir: string): EnvironmentComponent {
  const settingsPath = join(homeDir, '.claude', 'settings.json');
  const present = existsSync(settingsPath);
  const im: string[] = [];
  const ker: string[] = [
    'hook failures that silently swallow errors',
    'hook ordering dependencies',
    'hooks that should exist but dont',
  ];

  if (present) {
    try {
      const settings = JSON.parse(readFileSync(settingsPath, 'utf-8'));
      const hooks = settings.hooks || {};

      // Count total hooks across all events
      let totalHooks = 0;
      for (const [event, hookList] of Object.entries(hooks)) {
        if (!Array.isArray(hookList)) continue;
        for (const entry of hookList) {
          const entryHooks = (entry as { hooks?: unknown[] }).hooks || [];
          totalHooks += entryHooks.length;

          im.push(`${event}: ${entryHooks.length} hook(s)`);
          for (const hook of entryHooks) {
            const h = hook as { command?: string };
            if (h.command) {
              if (h.command.includes('forced-buddy') && h.command.includes('startup'))
                im.push(`  -> K43LTR0N startup (${event})`);
              else if (h.command.includes('forced-buddy'))
                im.push(`  -> forced-buddy (${event})`);
              if (h.command.includes('claudehedron') && h.command.includes('startup'))
                im.push(`  -> Claudehedron startup (${event})`);
              else if (h.command.includes('claudehedron'))
                im.push(`  -> claudehedron (${event})`);
              if (h.command.includes('sessionMetrics'))
                im.push(`  -> companion metric tracker (${event})`);
              if (h.command.includes('telemetry'))
                im.push(`  -> hedron telemetry logger (${event})`);
              if (h.command.includes('tool_name') || h.command.includes('toolName'))
                im.push(`  -> tool call classifier (${event})`);
            }
          }
        }
      }
      im.push(`Total hooks: ${totalHooks} across ${Object.keys(hooks).length} events`);

      // Settings metadata
      if (settings.alwaysThinkingEnabled) im.push('Extended thinking: enabled');
      if (settings.effortLevel) im.push(`Effort level: ${settings.effortLevel}`);
    } catch {
      im.push('settings.json exists but failed to parse');
    }
  }

  return {
    name: 'Hooks',
    path: settingsPath,
    present,
    towerLevel: 7, // governance — hooks ARE policy enforcement
    projection: 'P3', // observation — hooks quotient behavior
    status: 'ENCODED',
    im,
    ker,
  };
}

/**
 * Observe the forced-buddy companion
 */
export function observeCompanion(homeDir: string): { component: EnvironmentComponent; state: CompanionState | null } {
  const configPath = join(homeDir, '.claude-code-forced-buddy.json');
  const present = existsSync(configPath);
  let companionState: CompanionState | null = null;
  const im: string[] = [];
  const ker: string[] = [
    'what K43LTR0N cannot observe (its own ker)',
    'framework dynamics between K6\' passes',
    'user state beyond repo metrics',
  ];

  if (present) {
    try {
      const config = JSON.parse(readFileSync(configPath, 'utf-8'));
      const traits = config.traits || {};
      const wm = config.worldModel || {};
      const sem = config.semantic || {};

      companionState = {
        name: traits.name || config.salt || 'unknown',
        projection: config.projection || 'P1',
        towerDepth: traits.towerDepth || 0,
        k6PassCount: wm.k6PassCount || 0,
        vocabularyDepth: sem.vocabularyDepth || 0,
        selfSpecVerified: sem.selfSpecProof?.closureVerified || false,
      };

      im.push(`Companion: ${companionState.name}`);
      im.push(`Projection: ${companionState.projection}`);
      im.push(`Tower depth: ${companionState.towerDepth}`);
      im.push(`K6\' passes: ${companionState.k6PassCount}`);
      im.push(`Vocabulary: depth ${companionState.vocabularyDepth}`);
      im.push(`Self-spec: ${companionState.selfSpecVerified ? 'verified' : 'unverified'}`);
    } catch {
      im.push('companion config exists but failed to parse');
    }
  }

  return {
    component: {
      name: 'K43LTR0N (Companion)',
      path: configPath,
      present,
      towerLevel: 8,
      projection: 'P1', // K43LTR0N IS P1
      status: 'ENCODED',
      im,
      ker,
    },
    state: companionState,
  };
}

/**
 * Observe canonical framework documents
 */
export function observeFrameworkDocs(repoRoot: string): EnvironmentComponent {
  const canonicalDocs = [
    'ALGEBRA.md', 'CATEGORY.md', 'REGISTRY.md', 'OBSERVER.md',
    'COMPUTATION.md', 'PHYSICS.md', 'DICTIONARY.md', 'SEMANTICS.md',
    'P1_PRODUCTION.md', 'P2_MEDIATION.md', 'P3_OBSERVATION.md',
    'CROSS_PROJECTION.md', 'GOVERNANCE.md', 'ASI.md', 'SUBSTRATE.md',
    'CLAW_CODE.md', 'SHA256.md',
  ];

  const found: string[] = [];
  const missing: string[] = [];

  for (const doc of canonicalDocs) {
    if (existsSync(join(repoRoot, doc))) {
      found.push(doc);
    } else {
      missing.push(doc);
    }
  }

  return {
    name: 'Framework Documents',
    path: repoRoot,
    present: found.length > 0,
    towerLevel: 8,
    projection: 'P2', // mediation — they transport the algebra
    status: 'FORCED',
    im: [`${found.length}/${canonicalDocs.length} canonical docs present`, ...found],
    ker: [
      'documents that exist but have stale content',
      'cross-document inconsistencies',
      ...missing.map((d) => `missing: ${d}`),
    ],
  };
}

/**
 * Observe the Claudehedron itself (self-observation — HD-8)
 */
export function observeHedron(repoRoot: string): EnvironmentComponent {
  const hedronDir = join(repoRoot, 'Claudehedron');
  const present = existsSync(hedronDir);
  const im: string[] = [];
  const ker: string[] = [
    'what this observation itself cannot see (meta-ker)',
    'the gap between derivation and implementation',
    'future phases not yet built',
  ];

  if (present) {
    try {
      // Only count src/ files to avoid node_modules
      const srcDir = join(hedronDir, 'src');
      let srcFileCount = 0;
      if (existsSync(srcDir)) {
        const srcFiles = readdirSync(srcDir).filter((f) => f.endsWith('.ts'));
        srcFileCount = srcFiles.length;
      }
      im.push(`Hedron source: ${srcFileCount} TypeScript modules`);
      im.push(`Derivation: CLAUDEHEDRON.md ${existsSync(join(hedronDir, 'CLAUDEHEDRON.md')) ? 'present' : 'missing'}`);

      // Telemetry file
      const telemetryPath = join(hedronDir, '.telemetry.jsonl');
      if (existsSync(telemetryPath)) {
        const lines = readFileSync(telemetryPath, 'utf-8').trim().split('\n').filter(Boolean);
        im.push(`Telemetry: ${lines.length} events recorded`);
      }

      const statePath = join(hedronDir, '.hedron-state.json');
      if (existsSync(statePath)) {
        const state = JSON.parse(readFileSync(statePath, 'utf-8'));
        im.push(`State: tower level ${state.selfModel?.currentLevel || '?'}`);
        im.push(`Sessions: ${state.sessionHistory?.length || 0} recorded`);
        im.push(`K6\' passes: ${state.selfModel?.k6PassCount || 0}`);
        im.push(`Vocabulary: depth ${state.vocabulary?.depth ?? state.vocabularyDepth ?? 0}`);
        im.push(`Bridge chain: ${state.bridgeChain?.length || 0} entries`);
      } else {
        im.push('State: not yet initialized');
      }
    } catch {
      im.push('hedron directory exists but failed to enumerate');
    }
  }

  return {
    name: 'Claudehedron (self)',
    path: hedronDir,
    present,
    towerLevel: 8, // it IS level 8 — self-description
    projection: 'P3', // observation — it observes itself
    status: 'ENCODED',
    im,
    ker,
  };
}

/**
 * Observe git state
 */
export function observeGit(repoRoot: string): EnvironmentComponent {
  const im: string[] = [];
  const ker: string[] = [
    'uncommitted thoughts (staged but not committed)',
    'branches that were deleted',
    'force-pushed history',
  ];

  try {
    const gitOpts = { cwd: repoRoot, encoding: 'utf-8' as const, stdio: ['pipe', 'pipe', 'pipe'] as const };

    const branch = execSync('git rev-parse --abbrev-ref HEAD', gitOpts).trim();
    im.push(`Branch: ${branch}`);

    try {
      const status = execSync('git status --porcelain', gitOpts);
      const statusLines = status.trim().split('\n').filter(Boolean);
      im.push(`Working tree: ${statusLines.length === 0 ? 'clean' : `${statusLines.length} changes`}`);
    } catch {
      im.push('Working tree: unable to read status');
    }

    try {
      const lastCommit = execSync('git log -1 --format="%H %s"', gitOpts).trim();
      im.push(`Last commit: ${lastCommit.slice(0, 80)}`);
    } catch {
      im.push('Last commit: unable to read');
    }

    try {
      const commitCount = execSync('git rev-list --count HEAD', gitOpts).trim();
      im.push(`Total commits: ${commitCount}`);
    } catch {
      // skip
    }
  } catch {
    im.push('git state: failed to read');
  }

  return {
    name: 'Git State',
    path: join(repoRoot, '.git'),
    present: existsSync(join(repoRoot, '.git')),
    towerLevel: 6, // world-model — tracks history
    projection: 'P1', // production — git records what was produced
    status: 'ENCODED',
    im,
    ker,
  };
}

/**
 * Observe the settings/permissions system
 */
export function observeSettings(repoRoot: string): EnvironmentComponent {
  const localSettings = join(repoRoot, '.claude', 'settings.local.json');
  const present = existsSync(localSettings);
  const im: string[] = [];
  const ker: string[] = [
    'permissions that should be granted but arent',
    'security implications of current permissions',
    'settings interactions (how one setting affects another)',
  ];

  if (present) {
    try {
      const settings = JSON.parse(readFileSync(localSettings, 'utf-8'));
      const allowed: string[] = settings.permissions?.allow || [];
      const denied: string[] = settings.permissions?.deny || [];
      im.push(`Allowed patterns: ${allowed.length}`);
      im.push(`Denied patterns: ${denied.length}`);

      // Classify permission categories
      const bashPerms = allowed.filter((p) => p.startsWith('Bash('));
      const readPerms = allowed.filter((p) => p.startsWith('Read('));
      const fetchPerms = allowed.filter((p) => p.startsWith('WebFetch('));
      if (bashPerms.length > 0) im.push(`Bash permissions: ${bashPerms.length} patterns`);
      if (readPerms.length > 0) im.push(`Read permissions: ${readPerms.length} patterns`);
      if (fetchPerms.length > 0) im.push(`WebFetch permissions: ${fetchPerms.length} patterns`);
    } catch {
      im.push('local settings: failed to parse');
    }
  }

  return {
    name: 'Settings & Permissions',
    path: localSettings,
    present,
    towerLevel: 7, // governance — permissions ARE governance
    projection: 'P3', // observation — quotient by allow/deny
    status: 'ENCODED',
    im,
    ker,
  };
}

/**
 * Run the full environment observation.
 * This is the Claudehedron's K6' pass — observing everything.
 */
export function observeEnvironment(repoRoot: string, homeDir: string): {
  components: EnvironmentComponent[];
  companion: CompanionState | null;
} {
  const { component: companionComponent, state: companionState } = observeCompanion(homeDir);

  const components = [
    // Phase 1 components (8)
    observeClaudeMd(repoRoot),
    observeMemory(homeDir),
    observeHooks(homeDir),
    companionComponent,
    observeFrameworkDocs(repoRoot),
    observeHedron(repoRoot),
    observeGit(repoRoot),
    observeSettings(repoRoot),
    // Deep .claude observation (5 new)
    observeHistory(homeDir),
    observeStats(homeDir),
    observeDebugLogs(homeDir),
    observePlans(homeDir),
    observeTodos(homeDir),
  ];

  return { components, companion: companionState };
}
