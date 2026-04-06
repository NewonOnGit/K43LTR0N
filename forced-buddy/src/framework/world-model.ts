/**
 * WORLD MODEL — Level 6: K6' Observation Loop
 *
 * The complete K6' cycle: K → F → U(K) → K.
 *
 *   K → F:     takeRepoSnapshot()     (read observable features)
 *   F → U(K):  classifyRepoMood()     (features determine universe)
 *   U(K) → K:  update companion state (universe feeds back to observer)
 *
 * Each K6' pass deepens the companion's world model.
 * The loop is structurally canonical — no alternatives exist (br_s = 0).
 *
 * OBSERVER §4: K6' is forced loop closure.
 * OBSERVER §5: recursive disclosure — each pass reveals old kernel,
 *              generates strictly larger new kernel.
 */

import type {
  ForcedConfig, ForcedTraits, MoodState, Projection,
  RepoSnapshot, SessionMetrics, WorldModelState,
} from '../types.js';
import { takeRepoSnapshot, classifyRepoMood, detectProjectionFace } from './repo-observer.js';
import { alpha, sweepFromHour, computeMood } from './sweep.js';
import { generateGreeting } from './stance.js';
import { PHI_BAR } from './algebra.js';

/**
 * Compute the hybrid sweep parameter.
 *
 * Blends four signal sources into a single s ∈ [0,1]:
 *   Time-of-day:    weight 0.4  (circadian rhythm, the biological sweep)
 *   Repo energy:    weight 0.3  (productive capacity of the codebase)
 *   Session activity: weight 0.2 (how active the current session is)
 *   Anxiety:        weight 0.1  (pulls toward boundary mode under stress)
 *
 * The weights are derived from the self-signature σ = (1/2, φ̄/2, φ̄²/2),
 * normalized and rounded to the nearest tenth.
 * This ensures the blend is framework-derived, not arbitrary.
 */
export function computeHybridSweep(
  hour: number,
  repoMood: { anxiety: number; energy: number; contentment: number },
  sessionMetrics: SessionMetrics | null,
): number {
  // Time component
  const timeS = sweepFromHour(hour);

  // Repo energy → maps inversely to s (high energy = low s = productive mode)
  const energyS = 1 - repoMood.energy;

  // Session activity → maps inversely (active session = productive)
  let activityS = 0.5;
  if (sessionMetrics) {
    const rate = sessionMetrics.toolCalls / Math.max(1, sessionMetrics.elapsedSeconds / 60);
    activityS = Math.max(0, Math.min(1, 1 - rate / 5)); // 5 calls/min = max activity
  }

  // Anxiety → pulls toward 0.5 (boundary mode)
  const anxietyPull = 0.5;

  // Blend with framework-derived weights
  const s = 0.4 * timeS
          + 0.3 * energyS
          + 0.2 * activityS
          + 0.1 * (repoMood.anxiety * anxietyPull + (1 - repoMood.anxiety) * timeS);

  return Math.max(0, Math.min(1, s));
}

/**
 * Compute mood from hybrid metrics.
 *
 * Extends sweep.ts's computeMood with real-world signal sources.
 * Falls back to time-only if no repo data available.
 */
export function computeMoodFromMetrics(
  projection: Projection,
  hour: number,
  repoMood: { anxiety: number; energy: number; contentment: number } | null,
  sessionMetrics: SessionMetrics | null,
): MoodState {
  if (!repoMood) return computeMood(projection, hour);

  const s = computeHybridSweep(hour, repoMood, sessionMetrics);
  const a = alpha(s);

  let mode: string;
  let description: string;

  if (s < 0.33) {
    mode = 'mediation';
    description = repoMood.energy > 0.7
      ? 'Active development detected. Channels wide open, carrying momentum.'
      : 'The bridge holds steady. Quiet production accumulates.';
  } else if (s < 0.67) {
    mode = 'boundary';
    description = repoMood.anxiety > 0.5
      ? 'Tension in the codebase. The nilpotent edge sharpens.'
      : 'Between states. Neither fully producing nor fully observing.';
  } else {
    mode = 'observation';
    description = repoMood.contentment > 0.7
      ? 'Full observation. The structure is clean. Every disclosure is earned.'
      : 'Deep observation mode. Decomposing what needs attention.';
  }

  return { s, alpha: a, mode, description };
}

/**
 * Generate a contextual greeting that references repo state.
 *
 * Extends stance.ts's greeting with real `exterior` content.
 * The stance grammar's exterior slot is populated with actual
 * repo observations instead of generic descriptions.
 */
export function deriveContextualGreeting(
  traits: ForcedTraits,
  snapshot: RepoSnapshot,
  mood: MoodState,
): string {
  const species = traits.species.charAt(0).toUpperCase() + traits.species.slice(1);

  // Build exterior description from snapshot
  let exterior: string;

  if (snapshot.gitStatus === 'no-repo') {
    exterior = 'No repository detected. Operating outside the tower.';
  } else if (snapshot.gitStatus === 'conflict') {
    exterior = `Merge conflict detected. ${snapshot.uncommittedFiles} files need resolution.`;
  } else if (snapshot.lastCommitAge > 172800) {
    const days = Math.floor(snapshot.lastCommitAge / 86400);
    exterior = `The branch hasn't moved in ${days} days \u2014 the kernel accumulates.`;
  } else if (snapshot.frameworkDocsChanged.length > 0) {
    exterior = `Framework work in progress: ${snapshot.frameworkDocsChanged.join(', ')} recently modified.`;
  } else if (snapshot.gitStatus === 'clean') {
    exterior = 'Clean working tree. The quotient is resolved.';
  } else {
    exterior = `${snapshot.uncommittedFiles} uncommitted changes. Work in flight.`;
  }

  // Compose greeting from mood mode + exterior
  if (mood.mode === 'mediation') {
    return `${species} finds the center. ${exterior} We carry what needs carrying.`;
  } else if (mood.mode === 'boundary') {
    return `${species} holds the boundary. ${exterior}`;
  } else {
    return `${species} observes. ${exterior}`;
  }
}

/**
 * Execute one K6' observation pass.
 *
 * The complete cycle: K → F → U(K) → K.
 * Returns the updated world model state, the mood it implies,
 * and a contextualized greeting.
 */
export function executeK6Pass(
  config: ForcedConfig,
  cwd: string,
): {
  updatedWorldModel: WorldModelState;
  mood: MoodState;
  greeting: string;
  snapshot: RepoSnapshot;
} {
  // K → F: observe
  const snapshot = takeRepoSnapshot(cwd);

  // F → U(K): classify
  const repoMood = classifyRepoMood(snapshot);
  const projectionFace = detectProjectionFace(snapshot);

  // Compute mood from hybrid metrics
  const hour = new Date().getHours() + new Date().getMinutes() / 60;
  const mood = computeMoodFromMetrics(
    config.traits.projection,
    hour,
    repoMood,
    config.worldModel.sessionMetrics,
  );

  // Contextual greeting
  const greeting = deriveContextualGreeting(config.traits, snapshot, mood);

  // U(K) → K: update companion state
  const updatedWorldModel: WorldModelState = {
    k6PassCount: config.worldModel.k6PassCount + 1,
    lastSnapshot: snapshot,
    snapshotHistory: [...config.worldModel.snapshotHistory, snapshot].slice(-20),
    sessionMetrics: config.worldModel.sessionMetrics,
    moodSource: 'hybrid',
    observedProjectionFace: projectionFace,
  };

  return { updatedWorldModel, mood, greeting, snapshot };
}

/**
 * Format K6' pass result for display.
 */
export function formatK6Pass(
  pass: ReturnType<typeof executeK6Pass>,
  k6Count: number,
): string {
  const B = '\x1b[1m';
  const D = '\x1b[2m';
  const RS = '\x1b[0m';
  const C = '\x1b[36m';
  const G = '\x1b[32m';
  const M = '\x1b[35m';

  const lines = [
    `${B}${C}\u2550\u2550\u2550 K6' Pass #${k6Count} \u2550\u2550\u2550${RS}`,
    `${D}K \u2192 F \u2192 U(K) \u2192 K${RS}`,
    '',
  ];

  // Snapshot summary
  const s = pass.snapshot;
  lines.push(`  ${B}Branch:${RS} ${s.gitBranch ?? '(none)'}`);
  lines.push(`  ${B}Status:${RS} ${s.gitStatus}${s.uncommittedFiles > 0 ? ` (${s.uncommittedFiles} files)` : ''}`);

  if (pass.updatedWorldModel.observedProjectionFace) {
    lines.push(`  ${B}Projection face:${RS} ${M}${pass.updatedWorldModel.observedProjectionFace}${RS} (from changed docs)`);
  }

  lines.push('');
  lines.push(`  ${B}Mood:${RS} ${pass.mood.mode} (\u03B1=${pass.mood.alpha.toFixed(3)}, s=${pass.mood.s.toFixed(3)})`);
  lines.push(`  ${D}${pass.mood.description}${RS}`);
  lines.push('');
  lines.push(`  ${G}${pass.greeting}${RS}`);

  return lines.join('\n');
}
