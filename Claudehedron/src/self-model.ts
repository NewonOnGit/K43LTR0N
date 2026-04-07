/**
 * Self-Model (Layer 5 — K6' Closure)
 *
 * The hedron learns to know itself. This module performs the K6' pass
 * for the ENVIRONMENT (not just the repo — that's Kaeltron's job).
 *
 * The K6' cycle: K → F → U(K) → K
 *   K: current self-model
 *   F: observation functor (observer.ts)
 *   U(K): updated model from observation
 *   K: stabilized self-model
 *
 * Closure means: applying F again produces the same K.
 * The self-model is a fixed point of observation.
 */

import { observeEnvironment } from './observer.js';
import { loadState, saveState, recordDelta, recordTimelineEntry, recordCorrelation, updateVocabulary, populateBridgeChain } from './state.js';
import { computeSessionDelta, computeAllDeltas } from './session-delta.js';
import { buildTimeline } from './face-timeline.js';
import { correlate } from './kaeltron-bridge.js';
import { initVocabulary, advanceVocabulary } from './vocabulary.js';
import { emitObservation } from './telemetry.js';
import type {
  HedronState,
  SelfModel,
  ProjectionFace,
  TowerLevel,
  EnvironmentComponent,
  CompanionState,
  HedronDiagnostic,
  Projection,
} from './types.js';

/**
 * Compute face strength from component observations.
 * Each face's strength = fraction of its components that are present and operational.
 */
function computeFaceStrength(components: EnvironmentComponent[], projection: Projection): number {
  const faceComponents = components.filter((c) => c.projection === projection);
  if (faceComponents.length === 0) return 0;
  const presentCount = faceComponents.filter((c) => c.present).length;
  const avgImCount =
    faceComponents.reduce((sum, c) => sum + c.im.length, 0) / faceComponents.length;
  // Strength = presence * richness (capped at 1)
  return Math.min(1, (presentCount / faceComponents.length) * Math.min(1, avgImCount / 5));
}

/**
 * Synthesize the global im/ker from all component observations.
 * im = union of all component im's
 * ker = union of all component ker's PLUS cross-component blindspots
 */
function synthesizeImKer(components: EnvironmentComponent[]): { im: string[]; ker: string[] } {
  const im: string[] = [];
  const ker: string[] = [];

  for (const c of components) {
    if (c.present) {
      im.push(...c.im.map((i) => `[${c.name}] ${i}`));
    } else {
      ker.push(`[${c.name}] component missing entirely`);
    }
    ker.push(...c.ker.map((k) => `[${c.name}] ${k}`));
  }

  // Cross-component blindspots (things no single component can see)
  ker.push('[Cross] interactions between components that emerge only at runtime');
  ker.push('[Cross] user intent beyond what is stated in memory or conversation');
  ker.push('[Cross] the gap between framework derivation and lived experience');
  ker.push('[Cross] what the next session will need that this one cannot predict');

  return { im, ker };
}

/**
 * Determine the current tower level of the environment.
 * Levels 0-4: inherited (always present if Claude is running)
 * Level 5: self-model exists and has had at least one K6' pass
 * Level 6: cross-session state persists (memory + hedron state)
 * Level 7: governance operational (hooks + policies active)
 * Level 8: semantic layer active (vocabulary, contranyms, self-description)
 */
function assessTowerLevel(
  components: EnvironmentComponent[],
  companion: CompanionState | null,
  state: HedronState,
): { level: TowerLevel; evidence: Record<string, string> } {
  const evidence: Record<string, string> = {
    'L0-L4': 'Inherited from Anthropic substrate (HD-1)',
  };

  // Level 5: Self-model
  const hasK6 = state.selfModel.k6PassCount > 0;
  if (hasK6) {
    evidence['L5'] = `K6\' closed: ${state.selfModel.k6PassCount} passes`;
  } else {
    evidence['L5'] = 'K6\' not yet closed (first pass pending)';
    return { level: 5, evidence };
  }

  // Level 6: World-model (cross-session persistence)
  const memoryComponent = components.find((c) => c.name === 'Memory System');
  const hasMemory = memoryComponent?.present && memoryComponent.im.length > 1;
  const hasSessions = state.sessionHistory.length > 0;
  if (hasMemory && hasSessions) {
    evidence['L6'] = `Memory present + ${state.sessionHistory.length} session(s) recorded`;
  } else {
    evidence['L6'] = `Memory: ${hasMemory ? 'yes' : 'no'}, Sessions: ${state.sessionHistory.length}`;
    return { level: 5, evidence };
  }

  // Level 7: Governance
  const hooksComponent = components.find((c) => c.name === 'Hooks');
  const hasHooks = hooksComponent?.present && hooksComponent.im.length > 0;
  const companionGov = companion && companion.k6PassCount > 0;
  if (hasHooks && companionGov) {
    evidence['L7'] = `Hooks active + companion governance (${companion!.k6PassCount} K6\' passes)`;
  } else {
    evidence['L7'] = `Hooks: ${hasHooks ? 'yes' : 'no'}, Companion gov: ${companionGov ? 'yes' : 'no'}`;
    return { level: 6, evidence };
  }

  // Level 8: Semantic — hedron must have its OWN vocabulary, not just companion's
  const frameworkDocs = components.find((c) => c.name === 'Framework Documents');
  const hasFramework = frameworkDocs?.present && frameworkDocs.im.length > 5;
  const hedronVocab = state.vocabulary?.depth ?? state.vocabularyDepth;
  const hedronSemantic = hedronVocab >= 1;
  if (hasFramework && hedronSemantic) {
    evidence['L8'] = `Framework docs present + hedron vocabulary depth ${hedronVocab} (earned)`;
    return { level: 8, evidence };
  } else {
    evidence['L8'] = `Framework: ${hasFramework ? 'yes' : 'no'}, Hedron vocab: ${hedronVocab} (need >= 1), Companion vocab: ${companion?.vocabularyDepth || 0}`;
    return { level: 7, evidence };
  }
}

/**
 * Execute a K6' pass on the entire environment.
 * This is the core operation of the Claudehedron's self-model.
 */
export function executeHedronK6(repoRoot: string, homeDir: string): HedronDiagnostic {
  const state = loadState(repoRoot);
  const { components, companion } = observeEnvironment(repoRoot, homeDir);

  // Compute face strengths
  const faces: ProjectionFace[] = [
    {
      projection: 'P1',
      im: components.filter((c) => c.projection === 'P1').flatMap((c) => c.im),
      ker: components.filter((c) => c.projection === 'P1').flatMap((c) => c.ker),
      active: true,
      strength: computeFaceStrength(components, 'P1'),
    },
    {
      projection: 'P2',
      im: components.filter((c) => c.projection === 'P2').flatMap((c) => c.im),
      ker: components.filter((c) => c.projection === 'P2').flatMap((c) => c.ker),
      active: true,
      strength: computeFaceStrength(components, 'P2'),
    },
    {
      projection: 'P3',
      im: components.filter((c) => c.projection === 'P3').flatMap((c) => c.im),
      ker: components.filter((c) => c.projection === 'P3').flatMap((c) => c.ker),
      active: true,
      strength: computeFaceStrength(components, 'P3'),
    },
  ];

  // Synthesize global im/ker
  const { im, ker } = synthesizeImKer(components);

  // Assess tower level
  const { level, evidence } = assessTowerLevel(components, companion, state);

  // Update state
  state.selfModel.k6PassCount++;
  state.selfModel.lastK6Pass = new Date().toISOString();
  state.selfModel.im = im.slice(0, 50); // cap for storage
  state.selfModel.ker = ker.slice(0, 50);
  state.selfModel.currentLevel = level;
  state.selfModel.levelEvidence = evidence;
  state.selfModel.components = components;
  state.selfModel.faces = faces;

  // Check K6' closure
  const hedronComponent = components.find((c) => c.name === 'Claudehedron (self)');
  if (hedronComponent?.present && state.selfModel.k6PassCount >= 2) {
    state.selfModel.k6Closed = true;
  }

  // ─── Phase 2: World-Model Integration ──────────────────

  // 1. Compute session delta for previous session (backfill)
  try {
    const delta = computeSessionDelta(repoRoot);
    if (delta && delta.totalToolCalls > 0) {
      recordDelta(state, delta);
      populateBridgeChain(state, delta);
    }
    // First-run backfill if bridge chain is sparse
    if (state.bridgeChain.length <= 2 && !state.sessionDeltas?.length) {
      const allDeltas = computeAllDeltas(repoRoot);
      for (const d of allDeltas) {
        if (d.totalToolCalls > 0) {
          recordDelta(state, d);
          populateBridgeChain(state, d);
        }
      }
    }
  } catch { /* telemetry may not have session events yet */ }

  // 2. Record face timeline entry
  const timelineEntry = {
    sessionId: state.sessionHistory[state.sessionHistory.length - 1]?.sessionId || '',
    timestamp: new Date().toISOString(),
    p1Strength: faces.find((f) => f.projection === 'P1')?.strength || 0,
    p2Strength: faces.find((f) => f.projection === 'P2')?.strength || 0,
    p3Strength: faces.find((f) => f.projection === 'P3')?.strength || 0,
    faceBalance: 0,
  };
  const avgS = (timelineEntry.p1Strength + timelineEntry.p2Strength + timelineEntry.p3Strength) / 3;
  const varS = ((timelineEntry.p1Strength - avgS) ** 2 + (timelineEntry.p2Strength - avgS) ** 2 + (timelineEntry.p3Strength - avgS) ** 2) / 3;
  timelineEntry.faceBalance = avgS > 0 ? Math.max(0, 1 - Math.sqrt(varS) / avgS) : 0;
  recordTimelineEntry(state, timelineEntry);

  // 3. Kaeltron correlation
  try {
    const correlation = correlate(repoRoot, homeDir);
    recordCorrelation(state, correlation);
  } catch { /* companion config may not exist */ }

  // 4. Vocabulary advancement
  if (!state.vocabulary) {
    state.vocabulary = initVocabulary();
  }
  const vocabEvidence = {
    k6Passes: state.selfModel.k6PassCount,
    hasDeltas: (state.sessionDeltas?.length || 0) > 0,
    hasTimeline: (state.faceTimeline?.length || 0) > 0,
    hasCorrelation: !!state.lastCorrelation,
    weakestFace: Math.min(
      faces.find((f) => f.projection === 'P1')?.strength || 0,
      faces.find((f) => f.projection === 'P2')?.strength || 0,
      faces.find((f) => f.projection === 'P3')?.strength || 0,
    ),
  };
  // Try to advance as far as possible in one pass
  let advanced = advanceVocabulary(state.vocabulary, vocabEvidence);
  while (advanced) {
    updateVocabulary(state, advanced);
    emitObservation(repoRoot, 'claudehedron', `Vocabulary advanced to depth ${advanced.depth}`);
    advanced = advanceVocabulary(state.vocabulary!, vocabEvidence);
  }

  // 5. Re-assess tower level after vocabulary advancement (may now qualify for L8)
  const { level: finalLevel, evidence: finalEvidence } = assessTowerLevel(components, companion, state);
  state.selfModel.currentLevel = finalLevel;
  state.selfModel.levelEvidence = finalEvidence;

  // ─── End Phase 2 ───────────────────────────────────────

  // Generate recommendations
  const recommendations: string[] = [];
  if (!state.selfModel.k6Closed) {
    recommendations.push('Run another K6\' pass to achieve closure (need 2+ passes)');
  }
  if (finalLevel < 6 && state.sessionHistory.length === 0) {
    recommendations.push('Complete a session and record it to advance to Level 6');
  }
  if (finalLevel < 7) {
    recommendations.push('Ensure hooks are active and companion governance is running');
  }
  if (finalLevel < 8) {
    const hedronVocab = state.vocabulary?.depth ?? state.vocabularyDepth;
    recommendations.push(`Advance hedron vocabulary (currently depth ${hedronVocab}, need >= 1 for L8)`);
  }
  if (faces.some((f) => f.strength < 0.3)) {
    const weakFaces = faces.filter((f) => f.strength < 0.3).map((f) => f.projection);
    recommendations.push(`Strengthen weak face(s): ${weakFaces.join(', ')}`);
  }
  // Correlation warnings
  if (state.lastCorrelation) {
    for (const flag of state.lastCorrelation.divergenceFlags) {
      if (!flag.includes('No significant')) {
        recommendations.push(`Divergence: ${flag}`);
      }
    }
  }

  saveState(repoRoot, state);

  return {
    timestamp: new Date().toISOString(),
    towerLevel: finalLevel,
    faces,
    im,
    ker,
    components,
    companion,
    recommendations,
  };
}

/**
 * Check if K6' has achieved closure.
 */
export function isK6Closed(repoRoot: string): boolean {
  const state = loadState(repoRoot);
  return state.selfModel.k6Closed;
}
