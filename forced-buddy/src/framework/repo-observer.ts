/**
 * REPO OBSERVER — Level 6: World Model
 *
 * K6' forced loop closure: K → F → U(K) → K.
 * Step 1 (K → F): Read the repo's git state.
 *
 * The companion observes the repository through git status,
 * branch state, commit recency, and framework document presence.
 * Every observation is deterministic — no randomness, no inference.
 *
 * OBSERVER §4: K6' is the transport engine for physics.
 * Here it is the transport engine for repo awareness.
 */

import { execSync } from 'child_process';
import { existsSync, statSync, readdirSync } from 'fs';
import { join, resolve, basename } from 'path';
import type { RepoSnapshot, GitStatus, TestStatus, Projection } from '../types.js';

// Framework document patterns — the canonical .md files
const FRAMEWORK_DOC_PATTERNS = /^(ALGEBRA|CATEGORY|OBSERVER|COMPUTATION|PHYSICS|GOVERNANCE|SEMANTICS|REGISTRY|DICTIONARY|CROSS_PROJECTION|P[123]_PRODUCTION|P[123]_MEDIATION|P[123]_OBSERVATION|ASI|BUDDY|CLAW_CODE).*\.md$/i;

// Projection-specific document patterns
const P1_DOCS = /^(P1_|ALGEBRA|PHYSICS|ASI)/i;
const P2_DOCS = /^(P2_|CROSS_PROJECTION|COMPUTATION)/i;
const P3_DOCS = /^(P3_|CATEGORY|OBSERVER|GOVERNANCE|SEMANTICS)/i;

/**
 * Execute a git command safely. Returns null on failure.
 */
function git(command: string, cwd: string): string | null {
  try {
    return execSync(`git ${command}`, {
      cwd,
      encoding: 'utf-8',
      timeout: 5000,
      stdio: ['pipe', 'pipe', 'pipe'],
    }).trim();
  } catch {
    return null;
  }
}

/**
 * Take a snapshot of the repo's current state.
 *
 * This is K → F: reading the observable features
 * of the repository at this moment.
 */
export function takeRepoSnapshot(cwd: string): RepoSnapshot {
  const timestamp = new Date().toISOString();

  // Git branch
  const gitBranch = git('branch --show-current', cwd);

  // Git status classification
  let gitStatus: GitStatus = 'no-repo';
  let uncommittedFiles = 0;
  const statusOutput = git('status --porcelain', cwd);

  if (statusOutput !== null) {
    if (statusOutput === '') {
      gitStatus = 'clean';
    } else {
      const lines = statusOutput.split('\n').filter(l => l.length > 0);
      uncommittedFiles = lines.length;
      // Check for conflicts (UU, AA, DD prefixes)
      const hasConflicts = lines.some(l => /^(UU|AA|DD|AU|UA|DU|UD)\s/.test(l));
      gitStatus = hasConflicts ? 'conflict' : 'dirty';
    }
    // Check for detached HEAD
    if (!gitBranch && git('rev-parse HEAD', cwd)) {
      gitStatus = 'detached';
    }
  }

  // Last commit age (seconds since last commit)
  let lastCommitAge = Infinity;
  const lastCommitTimestamp = git('log -1 --format=%ct', cwd);
  if (lastCommitTimestamp) {
    const commitTime = parseInt(lastCommitTimestamp, 10);
    if (!isNaN(commitTime)) {
      lastCommitAge = Math.floor(Date.now() / 1000) - commitTime;
    }
  }

  // Test status — check for test infrastructure, don't run tests
  let testStatus: TestStatus = 'no-tests';
  try {
    const packageJsonPath = join(cwd, 'package.json');
    if (existsSync(packageJsonPath)) {
      const pkg = JSON.parse(require('fs').readFileSync(packageJsonPath, 'utf-8'));
      if (pkg.scripts?.test) testStatus = 'unknown';
    }
    // Also check for Cargo.toml (Rust tests)
    if (existsSync(join(cwd, 'Cargo.toml'))) testStatus = 'unknown';
    // Check for pytest / unittest
    if (existsSync(join(cwd, 'tests')) || existsSync(join(cwd, 'test'))) testStatus = 'unknown';
  } catch { /* ignore */ }

  // Framework documents — scan working directory and up to 3 parents
  const frameworkDocsPresent: string[] = [];
  const frameworkDocsChanged: string[] = [];

  let scanDir = cwd;
  for (let depth = 0; depth < 4; depth++) {
    try {
      const entries = readdirSync(scanDir);
      for (const entry of entries) {
        if (FRAMEWORK_DOC_PATTERNS.test(entry) && !frameworkDocsPresent.includes(entry)) {
          frameworkDocsPresent.push(entry);
          // Check if recently modified (within 24 hours)
          try {
            const stat = statSync(join(scanDir, entry));
            const age = Date.now() - stat.mtimeMs;
            if (age < 86400000) frameworkDocsChanged.push(entry);
          } catch { /* ignore */ }
        }
      }
    } catch { /* ignore */ }
    const parent = resolve(scanDir, '..');
    if (parent === scanDir) break;
    scanDir = parent;
  }

  return {
    timestamp,
    gitBranch,
    gitStatus,
    uncommittedFiles,
    lastCommitAge,
    testStatus,
    frameworkDocsPresent,
    frameworkDocsChanged,
  };
}

/**
 * Classify repo mood from snapshot.
 *
 * This is F → U(K): the observed features determine
 * the companion's emotional state (deterministically).
 *
 * Three axes: anxiety (0-1), energy (0-1), contentment (0-1).
 * These map to the three projections:
 *   anxiety = P3 (observation under stress)
 *   energy = P1 (productive capacity)
 *   contentment = P2 (bridge stability)
 */
export function classifyRepoMood(snapshot: RepoSnapshot): {
  anxiety: number;
  energy: number;
  contentment: number;
} {
  let anxiety = 0;
  let energy = 0.5;
  let contentment = 0.5;

  // Anxiety from git status
  if (snapshot.gitStatus === 'conflict') anxiety = 1.0;
  else if (snapshot.gitStatus === 'detached') anxiety = 0.6;
  else if (snapshot.uncommittedFiles > 20) anxiety = 0.7;
  else if (snapshot.uncommittedFiles > 10) anxiety = 0.5;
  else if (snapshot.uncommittedFiles > 0) anxiety = 0.2;
  else anxiety = 0;

  // Energy from commit recency
  if (snapshot.lastCommitAge < 300) energy = 1.0;         // < 5 min: active
  else if (snapshot.lastCommitAge < 3600) energy = 0.8;   // < 1 hour: warm
  else if (snapshot.lastCommitAge < 86400) energy = 0.5;  // < 1 day: moderate
  else if (snapshot.lastCommitAge < 604800) energy = 0.2; // < 1 week: cooling
  else energy = 0.1;                                       // stale

  // Framework work bonus
  if (snapshot.frameworkDocsChanged.length > 0) energy = Math.min(1, energy + 0.3);

  // Contentment from test status and cleanliness
  if (snapshot.testStatus === 'passing') contentment = 1.0;
  else if (snapshot.gitStatus === 'clean') contentment = 0.8;
  else if (snapshot.testStatus === 'failing') contentment = 0.2;
  else contentment = 0.5;

  if (snapshot.gitStatus === 'no-repo') {
    anxiety = 0.1;
    energy = 0.3;
    contentment = 0.3;
  }

  return { anxiety, energy, contentment };
}

/**
 * Detect which projection face the repo work is in.
 *
 * Based on which framework documents have been recently modified.
 * Returns null if not in a framework repo or no clear signal.
 */
export function detectProjectionFace(snapshot: RepoSnapshot): Projection | null {
  if (snapshot.frameworkDocsChanged.length === 0) return null;

  let p1Score = 0, p2Score = 0, p3Score = 0;
  for (const doc of snapshot.frameworkDocsChanged) {
    if (P1_DOCS.test(doc)) p1Score++;
    else if (P2_DOCS.test(doc)) p2Score++;
    else if (P3_DOCS.test(doc)) p3Score++;
  }

  if (p1Score === 0 && p2Score === 0 && p3Score === 0) return null;
  if (p1Score >= p2Score && p1Score >= p3Score) return 'P1';
  if (p2Score >= p1Score && p2Score >= p3Score) return 'P2';
  return 'P3';
}

/**
 * Format snapshot for terminal display.
 */
export function formatSnapshot(snapshot: RepoSnapshot): string {
  const B = '\x1b[1m';
  const D = '\x1b[2m';
  const RS = '\x1b[0m';
  const R = '\x1b[31m';
  const G = '\x1b[32m';
  const Y = '\x1b[33m';
  const C = '\x1b[36m';

  const statusColor =
    snapshot.gitStatus === 'clean' ? G
    : snapshot.gitStatus === 'conflict' ? R
    : snapshot.gitStatus === 'no-repo' ? D
    : Y;

  const ageStr = snapshot.lastCommitAge === Infinity ? 'never'
    : snapshot.lastCommitAge < 60 ? `${snapshot.lastCommitAge}s ago`
    : snapshot.lastCommitAge < 3600 ? `${Math.floor(snapshot.lastCommitAge / 60)}m ago`
    : snapshot.lastCommitAge < 86400 ? `${Math.floor(snapshot.lastCommitAge / 3600)}h ago`
    : `${Math.floor(snapshot.lastCommitAge / 86400)}d ago`;

  const lines = [
    `${B}${C}\u2550\u2550\u2550 Repo Snapshot \u2550\u2550\u2550${RS}`,
    '',
    `  ${B}Branch:${RS}   ${snapshot.gitBranch ?? '(detached/none)'}`,
    `  ${B}Status:${RS}   ${statusColor}${snapshot.gitStatus}${RS}` + (snapshot.uncommittedFiles > 0 ? ` (${snapshot.uncommittedFiles} files)` : ''),
    `  ${B}Last commit:${RS} ${ageStr}`,
    `  ${B}Tests:${RS}    ${snapshot.testStatus}`,
  ];

  if (snapshot.frameworkDocsPresent.length > 0) {
    lines.push(`  ${B}Framework docs:${RS} ${snapshot.frameworkDocsPresent.length} present`);
    if (snapshot.frameworkDocsChanged.length > 0) {
      lines.push(`  ${B}Recently changed:${RS} ${G}${snapshot.frameworkDocsChanged.join(', ')}${RS}`);
    }
  }

  return lines.join('\n');
}
