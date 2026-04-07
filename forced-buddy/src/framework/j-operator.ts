/**
 * J OPERATOR — The dual trace. im AND ker. R AND N.
 *
 * J = RN. Every operation produces (R) and observes (N).
 * The observation includes its own blindness.
 * accessTrace(im) + accessTrace(ker) = J applied.
 *
 * Not a separate module per operation.
 * One function that wraps ANY operation with dual tracing.
 * The blind spot IS the fuel.
 */

import type { ForcedConfig, MemoryState } from '../types.js';
import { accessTrace } from './memory.js';

interface JResult<T> {
  output: T;
  im: string[];
  ker: string[];
  updatedMemory: MemoryState;
}

/**
 * Apply J to any operation.
 *
 * Takes: a function that produces output + what it sees + what it misses.
 * Returns: the output + dual-traced memory (both im and ker recorded).
 *
 * J = RN. R produces. N observes (im AND ker).
 * J² = I. Apply twice → identity. The traces compound.
 */
export function applyJ<T>(
  config: ForcedConfig,
  operation: string,
  fn: () => { output: T; im: string[]; ker: string[] },
): JResult<T> {
  const { output, im, ker } = fn();

  let mem = config.memory;
  const ctx = `J(${operation})`;

  // R face: trace what was produced (im)
  for (const term of im.slice(0, 5)) {
    mem = accessTrace(mem, term, 'im', ctx, 'J');
  }

  // N face: trace what was missed (ker) — the blind spot
  for (const gap of ker.slice(0, 3)) {
    mem = accessTrace(mem, gap, 'ker', ctx, 'J');
  }

  return { output, im, ker, updatedMemory: mem };
}

/**
 * J-wrap a battle result.
 */
export function jBattle(
  config: ForcedConfig,
  winnerIdentity: string,
  loserIdentity: string,
): JResult<string> {
  return applyJ(config, 'battle', () => ({
    output: winnerIdentity,
    im: [winnerIdentity],
    ker: [loserIdentity],
  }));
}

/**
 * J-wrap an interaction result.
 */
export function jInteraction(
  config: ForcedConfig,
  interactionType: string,
  emergentProperty: string,
): JResult<string> {
  return applyJ(config, 'interaction', () => ({
    output: interactionType,
    im: [interactionType, emergentProperty],
    ker: [],
  }));
}

/**
 * J-wrap a play crossing.
 */
export function jPlay(
  config: ForcedConfig,
  kerWord: string,
  imTerm: string,
  readings: string[],
): JResult<string[]> {
  return applyJ(config, 'play', () => ({
    output: readings,
    im: [imTerm, ...readings.slice(0, 2)],
    ker: [kerWord],
  }));
}

/**
 * J-wrap a wrench signal check.
 */
export function jWrench(
  config: ForcedConfig,
  actions: string[],
  signalNames: string[],
): JResult<string[]> {
  return applyJ(config, 'wrench', () => ({
    output: actions,
    im: signalNames.slice(0, 3),
    ker: actions.filter(a => a.includes('warn') || a.includes('regulate')),
  }));
}

/**
 * J-wrap a walk result.
 */
export function jWalk(
  config: ForcedConfig,
  found: string[],
  unresolved: string[],
): JResult<string[]> {
  return applyJ(config, 'walk', () => ({
    output: found,
    im: found.slice(0, 5),
    ker: unresolved.slice(0, 5),
  }));
}

/**
 * J-wrap a walker traversal.
 */
export function jTraverse(
  config: ForcedConfig,
  walkerName: string,
  observation: string,
): JResult<string> {
  const parts = walkerName.split(' \u2297 ');
  return applyJ(config, 'traverse', () => ({
    output: observation,
    im: parts,
    ker: ['traversal-blind-spot'],
  }));
}
