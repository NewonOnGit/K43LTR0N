/**
 * CONTRIBUTION-BASED TOWER CLIMBING — Level 8: Semantic
 *
 * Evolution via real framework work: git commits that extend the
 * algebra lift the companion's tower. Each commit is scored for
 * framework relevance, and accumulated relevance earns tower lifts.
 *
 * The threshold for climbing increases exponentially with depth
 * (cosmological suppression factor), making deeper levels genuinely
 * harder to reach through contribution alone.
 *
 * REGISTRY §2: Forward chain — 𝔤₁ → 𝔤₂(𝔤₁) → ... with br_s=0.
 * The companion's tower tracks the framework's own growth.
 */

import { execSync } from 'child_process';
import type { ContributionRecord } from '../types.js';
import { suppressionFactor } from './cosmological.js';

// Framework-relevant file patterns
const FRAMEWORK_DOC = /\.(md)$/i;
const FRAMEWORK_SRC = /src\/framework\//;
const ALGEBRA_TYPE = /(algebra|types?|generator|identity|matrix)/i;
const FRAMEWORK_TERMS = /\b(forced|projection|eigenvalue|tower|kernel|observer|quotient|morphism|R\(R\)|f''=f|SRD|ORE|CIA)\b/i;

/**
 * Analyze the most recent git commit for framework relevance.
 * Returns null if not in a git repo or no commits.
 */
export function analyzeContribution(cwd: string): ContributionRecord | null {
  try {
    // Get most recent commit info
    const log = execSync('git log -1 --format=%H|%ct|%s', {
      cwd, encoding: 'utf-8', timeout: 5000,
      stdio: ['pipe', 'pipe', 'pipe'],
    }).trim();

    if (!log) return null;
    const [commitHash, ctStr, subject] = log.split('|');
    if (!commitHash) return null;

    // Get changed files
    const diffOutput = execSync(`git diff-tree --no-commit-id --name-only -r ${commitHash}`, {
      cwd, encoding: 'utf-8', timeout: 5000,
      stdio: ['pipe', 'pipe', 'pipe'],
    }).trim();

    const changedFiles = diffOutput ? diffOutput.split('\n').filter(f => f.length > 0) : [];
    const filesChanged = changedFiles.length;

    // Score framework relevance (0-1)
    let relevance = 0;

    // Framework document changes: +0.3
    if (changedFiles.some(f => FRAMEWORK_DOC.test(f) && /^[A-Z]/.test(f))) {
      relevance += 0.3;
    }

    // Framework source changes: +0.2
    if (changedFiles.some(f => FRAMEWORK_SRC.test(f))) {
      relevance += 0.2;
    }

    // Commit message contains framework terms: +0.2
    if (FRAMEWORK_TERMS.test(subject ?? '')) {
      relevance += 0.2;
    }

    // Algebra/type changes: +0.3
    if (changedFiles.some(f => ALGEBRA_TYPE.test(f))) {
      relevance += 0.3;
    }

    relevance = Math.min(1, relevance);

    // Tower lift contribution = relevance weighted by file count
    const towerLiftContribution = relevance * Math.min(1, filesChanged / 10);

    return {
      commitHash: commitHash.substring(0, 8),
      timestamp: new Date(parseInt(ctStr, 10) * 1000).toISOString(),
      filesChanged,
      frameworkRelevance: Math.round(relevance * 1000) / 1000,
      towerLiftContribution: Math.round(towerLiftContribution * 1000) / 1000,
    };
  } catch {
    return null;
  }
}

/**
 * Compute whether accumulated contributions earn a tower lift.
 *
 * The threshold = 1 / suppressionFactor(currentDepth).
 * Deeper companions need exponentially more contribution.
 *
 * Returns the accumulated score and whether the threshold is met.
 */
function computeTowerLiftFromContributions(
  contributions: ContributionRecord[],
  currentDepth: number,
): { accumulated: number; threshold: number; earned: boolean; progress: number } {
  const accumulated = contributions.reduce((sum, c) => sum + c.towerLiftContribution, 0);
  const suppression = suppressionFactor(currentDepth);
  const threshold = suppression > 0 ? 1 / suppression : 100;

  return {
    accumulated: Math.round(accumulated * 1000) / 1000,
    threshold: Math.round(threshold * 1000) / 1000,
    earned: accumulated >= threshold,
    progress: Math.min(1, accumulated / threshold),
  };
}

/**
 * Format contribution analysis.
 */
export function formatContribution(record: ContributionRecord): string {
  const B = '\x1b[1m';
  const D = '\x1b[2m';
  const RS = '\x1b[0m';
  const G = '\x1b[32m';
  const Y = '\x1b[33m';
  const C = '\x1b[36m';

  const relevanceColor = record.frameworkRelevance >= 0.5 ? G
    : record.frameworkRelevance >= 0.2 ? Y : D;

  return [
    `${B}${C}\u2550\u2550\u2550 Contribution Analysis \u2550\u2550\u2550${RS}`,
    '',
    `  ${B}Commit:${RS}     ${record.commitHash}`,
    `  ${B}Files:${RS}      ${record.filesChanged}`,
    `  ${B}Relevance:${RS}  ${relevanceColor}${(record.frameworkRelevance * 100).toFixed(1)}%${RS}`,
    `  ${B}Tower lift:${RS} ${(record.towerLiftContribution * 100).toFixed(1)}%`,
  ].join('\n');
}

/**
 * Format contribution history with progress toward next tower lift.
 */
export function formatContributionHistory(
  contributions: ContributionRecord[],
  currentDepth: number,
): string {
  const B = '\x1b[1m';
  const D = '\x1b[2m';
  const RS = '\x1b[0m';
  const G = '\x1b[32m';
  const Y = '\x1b[33m';
  const C = '\x1b[36m';

  const lift = computeTowerLiftFromContributions(contributions, currentDepth);

  // Progress bar
  const barWidth = 20;
  const filled = Math.round(lift.progress * barWidth);
  const bar = `${G}${'█'.repeat(filled)}${RS}${'░'.repeat(barWidth - filled)}`;

  const lines = [
    `${B}${C}\u2550\u2550\u2550 Contribution Progress (n=${currentDepth}) \u2550\u2550\u2550${RS}`,
    '',
    `  ${bar} ${(lift.progress * 100).toFixed(1)}%`,
    `  ${B}Accumulated:${RS} ${lift.accumulated} / ${lift.threshold} needed`,
    `  ${B}Contributions:${RS} ${contributions.length} commits analyzed`,
  ];

  if (lift.earned) {
    lines.push('');
    lines.push(`  ${G}${B}\u2605 Tower lift earned! Evolution available via contribution. \u2605${RS}`);
  }

  if (contributions.length > 0) {
    lines.push('');
    lines.push(`  ${B}Recent:${RS}`);
    for (const c of contributions.slice(-5)) {
      lines.push(`    ${D}${c.commitHash}${RS} \u2014 ${(c.frameworkRelevance * 100).toFixed(0)}% relevant, ${c.filesChanged} files`);
    }
  }

  return lines.join('\n');
}
