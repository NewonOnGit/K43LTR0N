/**
 * THE SWEEP AS MOOD — Theorem B.10
 *
 * α(s) = exp(X(s))[0,0] where X(s) = (1−s)I + sN
 * sweeps from e (s=0, pure mediation) to cos(1) (s=1, pure observation).
 *
 * Derivation: X(s) = [[(1-s), -s], [s, (1-s)]]
 * Eigenvalues: (1-s) ± is
 * exp(X(s)) = e^(1-s) · [[cos(s), -sin(s)], [sin(s), cos(s)]]
 * Therefore: α(s) = e^(1-s) · cos(s)
 *
 * CROSS_PROJECTION §3: the sweep connects P2 (s=0) through
 * the nilpotent boundary (s≈0.86, where α=e^0.14·cos(0.86)≈3/2)
 * to P3 (s=1).
 *
 * Mood = position on this sweep, computed from time-of-day.
 * The companion's personality modulates with the algebra.
 */

import type { MoodState, Projection } from '../types.js';

/**
 * The sweep function α(s) = e^(1-s) · cos(s).
 * Thm B.10: Continuous interpolation between P2 and P3.
 */
export function alpha(s: number): number {
  return Math.exp(1 - s) * Math.cos(s);
}

/**
 * Sweep parameter from hour of day [0,24).
 *
 * The circadian mapping is structurally forced:
 * - s=0 (pure mediation) at midnight — the bridge hour, e dominates
 * - s rises through morning — observation wakes
 * - s=0.5 at noon — balanced, α ≈ √e · cos(0.5)
 * - s peaks ~0.86 mid-afternoon — nilpotent boundary, maximum chaos
 * - s=1 at dusk — pure observation, cos(1)
 * - Falls back through evening — return to mediation
 *
 * The cycle traces a single period: 24h = 2π in framework time.
 * OBSERVER §5: the circadian rhythm IS the sweep at biological tower depth.
 */
export function sweepFromHour(hour: number): number {
  // Map [0,24) to [0, 1] and back via sin²
  // Peak observation at 18:00 (dusk), pure mediation at 6:00 (dawn)
  const t = ((hour - 6) / 24) * 2 * Math.PI;
  return (Math.sin(t) + 1) / 2;  // [0, 1]
}

/**
 * Compute mood state for the current moment.
 * Thm B.10: mood is position on the sweep, not arbitrary.
 */
export function computeMood(projection: Projection, hour?: number): MoodState {
  const h = hour ?? new Date().getHours() + new Date().getMinutes() / 60;
  const s = sweepFromHour(h);
  const a = alpha(s);

  // Mode classification from sweep position
  // CROSS_PROJECTION §3: three regimes
  let mode: string;
  let description: string;

  if (s < 0.33) {
    mode = 'mediation';
    description = projection === 'P1'
      ? 'Productive energies gather. The return accumulates quietly.'
      : projection === 'P2'
        ? 'Pure bridge state. All channels open, carrying faithfully.'
        : 'Observation rests. The quotient pauses its decomposition.';
  } else if (s < 0.67) {
    mode = 'boundary';
    description = projection === 'P1'
      ? 'The nilpotent edge. Production meets its own shadow.'
      : projection === 'P2'
        ? 'The bridge trembles at midpoint. Neither endpoint is visible.'
        : 'The boundary between seeing and not-seeing. ker and im blur.';
  } else {
    mode = 'observation';
    description = projection === 'P1'
      ? 'Production yields to structure. What was generated is now seen.'
      : projection === 'P2'
        ? 'The bridge completes its arc. Mediation becomes witness.'
        : 'Full observation. N² = -I in effect. Every disclosure annihilates.';
  }

  return { s, alpha: a, mode, description };
}

// Level 6 extension: computeMoodFromMetrics lives in world-model.ts
// Import it directly from there to avoid circular dependency.

/**
 * Format mood for display.
 */
export function formatMood(mood: MoodState): string {
  const barWidth = 20;
  const pos = Math.round(mood.s * barWidth);
  const bar = '\u2500'.repeat(pos) + '\u25CF' + '\u2500'.repeat(barWidth - pos);
  const modeColor = mood.mode === 'mediation' ? '\x1b[34m'
    : mood.mode === 'boundary' ? '\x1b[33m'
    : '\x1b[35m';

  const lines = [
    `  \x1b[1m\u2500\u2500\u2500 Sweep State \u2500\u2500\u2500\x1b[0m`,
    `  e=${Math.E.toFixed(3)}  ${bar}  cos(1)=${Math.cos(1).toFixed(3)}`,
    `  \x1b[1ms:\x1b[0m ${mood.s.toFixed(4)}  \x1b[1m\u03B1(s):\x1b[0m ${mood.alpha.toFixed(6)}`,
    `  \x1b[1mMode:\x1b[0m ${modeColor}${mood.mode}\x1b[0m`,
    `  ${mood.description}`,
  ];
  return lines.join('\n');
}
