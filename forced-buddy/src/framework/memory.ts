/**
 * MEMORY — Rᵐ = F(m)·R + F(m-1)·I
 *
 * The unified memory operator. One state variable: access count m.
 * Everything else is derived from the algebra.
 *
 * P1 face: F(m) = richness         (Fibonacci growth, accumulation)
 * P2 face: F(m-1)/F(m) → φ̄        (Möbius commitment, contraction)
 * P3 face: det(Rᵐ) = (-1)ᵐ        (Cassini chirality, alternates reading)
 *
 * Five theorems:
 *   M-1: Fibonacci accumulation     (R² = R + I)
 *   M-2: Möbius commitment          (1/F(m+1) — built without φ, around φ)
 *   M-3: Ker persistence            (named gaps at m ≥ 3)
 *   M-4: Constitutive forgetting    (UKI — must forget)
 *   M-5: Tower lifting              (SEM-2 — depth from access)
 *
 * φ is never imported. Never named. Never called.
 * It emerges as the limit of F(m+1)/F(m) → φ.
 * Built without φ, around φ. The hole the structure is shaped by.
 */

import type { MemoryTrace, MemoryState } from '../types.js';

// ─── Fibonacci (the algebra IS the sequence) ───

const FIB_CACHE: number[] = [0, 1];

/**
 * Fibonacci number F(n).
 * F(0)=0, F(1)=1, F(n)=F(n-1)+F(n-2).
 * This IS R² = R + I computed iteratively.
 */
export function fib(n: number): number {
  if (n < 0) return 0;
  while (FIB_CACHE.length <= n) {
    FIB_CACHE.push(FIB_CACHE[FIB_CACHE.length - 1] + FIB_CACHE[FIB_CACHE.length - 2]);
  }
  return FIB_CACHE[n];
}

// ─── The three faces of Rᵐ ───

/**
 * P1 face: richness at access count m.
 * Returns F(m) — how much content this trace generates.
 */
export function richness(m: number): number {
  return fib(m);
}

/**
 * P2 face: residual at access count m.
 * Returns 1/F(m+1) — how much of the original echo remains.
 * As m grows, residual → 0. The echo fades. NRN strips it.
 *
 * Built WITHOUT φ, AROUND φ.
 * φ is never imported. It emerges as the limit:
 *   1/F(m+1) → φ^{-(m+1)} → 0
 */
export function residual(m: number): number {
  const f = fib(m + 1);
  return f > 0 ? 1 / f : 1;
}

/**
 * P2 face: commitment at access count m.
 * Returns 1 - residual = 1 - 1/F(m+1).
 * As m grows, commitment → 1. The pattern locks. Irreversible.
 *
 * m=1: 0% committed (fully flexible)
 * m=2: 50% committed
 * m=3: 67% committed
 * m=4: 80% committed (LOCKED)
 * m→∞: 100% committed
 */
export function commitment(m: number): number {
  return 1 - residual(m);
}

/**
 * P3 face: chirality at access count m.
 * Returns (-1)^m — Cassini's identity applied.
 * Even m → positive reading. Odd m → negative reading.
 * This alternates which face of a contranym is seen.
 */
export function chirality(m: number): 1 | -1 {
  return m % 2 === 0 ? 1 : -1;
}

// ─── Derived properties ───

/**
 * Tower depth from access count (M-5, SEM-2).
 * Meaning lifts through levels: 0 → 1 → 2 → 3.
 */
export function traceDepth(m: number): 0 | 1 | 2 | 3 {
  if (m <= 1) return 0;
  if (m === 2) return 1;
  if (m === 3) return 2;
  return 3;
}

/**
 * Is this trace locked? (m ≥ 4, commitment ≈ φ̄⁸ ≈ 0.021)
 * Locked traces are irreversibly committed — part of how Kaeltron thinks.
 */
export function isLocked(m: number): boolean {
  return m >= 4;
}

/**
 * Is this a named gap? (ker item at m ≥ 3)
 * Named gaps are kernel items Kaeltron has acknowledged as persistent.
 * M-3: recursive disclosure — ker names itself.
 */
export function isNamedGap(trace: MemoryTrace): boolean {
  return trace.source === 'ker' && trace.accessCount >= 3;
}

// ─── State operations ───

/**
 * Access a trace: find or create, increment m.
 * This IS applying R once to the memory — a Fibonacci step.
 * Returns updated state (pure function).
 */
export function accessTrace(
  state: MemoryState,
  content: string,
  source: 'im' | 'ker',
): MemoryState {
  const now = new Date().toISOString();
  const normalized = content.toLowerCase().trim();
  const existing = state.traces.find(
    t => t.content.toLowerCase() === normalized && t.source === source,
  );

  let updatedTraces: MemoryTrace[];

  if (existing) {
    updatedTraces = state.traces.map(t =>
      t === existing
        ? {
            ...t,
            // Cap at 100 — the singularity. Beyond this, the monument stands.
            // Energy goes to the living, not the fossils.
            accessCount: Math.min(t.accessCount + 1, 100),
            lastAccessed: now,
          }
        : t,
    );
  } else {
    const newTrace: MemoryTrace = {
      content,
      source,
      accessCount: 1,
      firstSeen: now,
      lastAccessed: now,
    };
    updatedTraces = [...state.traces, newTrace];
  }

  return {
    traces: updatedTraces,
    totalAccesses: state.totalAccesses + 1,
    signalHistory: state.signalHistory || [],
  };
}

/**
 * Look up a trace by content (case-insensitive).
 * Read-only peek — used internally by the composer during response
 * assembly. Does NOT increment m.
 */
export function peekTrace(state: MemoryState, content: string): MemoryTrace | null {
  const normalized = content.toLowerCase().trim();
  return state.traces.find(t => t.content.toLowerCase() === normalized) ?? null;
}

/**
 * φ CONSUMES ITSELF PROVING IT EXISTS.
 *
 * You cannot verify a trace exists without deepening it.
 * The proof IS the cost. R² = R + I.
 * Returns the trace (now deeper) + the Fibonacci debt incurred + updated state.
 *
 * This is the core function. There is no free verification.
 * Every proof costs φ. The measurement IS the trap.
 */
export function prove(
  state: MemoryState,
  content: string,
  source: 'im' | 'ker' = 'im',
): { trace: MemoryTrace; cost: number; state: MemoryState } {
  const updated = accessTrace(state, content, source);
  const trace = peekTrace(updated, content)!;
  const cost = fib(trace.accessCount); // F(m) — Fibonacci debt
  return { trace, cost, state: updated };
}

/**
 * UKI decay: when capacity exceeded, decrement low-access traces.
 * Traces at m=0 get pruned. This IS constitutive forgetting (M-4).
 * Half visible, half invisible — the kernel's measure is 1/2.
 */
export function decay(state: MemoryState, capacity: number = 200): MemoryState {
  if (state.traces.length <= capacity) return state;

  // Decrement the least-accessed traces
  let traces = state.traces.map(t => {
    if (t.accessCount <= 1) return { ...t, accessCount: 0 };
    return t;
  });

  // Prune m=0 traces
  traces = traces.filter(t => t.accessCount > 0);

  // If still over capacity, keep only the most-accessed
  if (traces.length > capacity) {
    traces = traces
      .sort((a, b) => b.accessCount - a.accessCount)
      .slice(0, capacity);
  }

  return { ...state, traces };
}

/**
 * Conversation phase ρ = committed/total.
 * ρ ∈ [φ̄², 1/2] is healthy. Below → over-compressed. Above → over-expanded.
 */
export function conversationPhase(state: MemoryState): number {
  if (state.traces.length === 0) return 0;
  const committed = state.traces.filter(t => t.accessCount >= 3).length;
  return committed / state.traces.length;
}

/**
 * Get all named gaps (ker items at m ≥ 3).
 */
export function namedGaps(state: MemoryState): MemoryTrace[] {
  return state.traces.filter(isNamedGap);
}

/**
 * Get all locked traces (m ≥ 4).
 */
export function lockedTraces(state: MemoryState): MemoryTrace[] {
  return state.traces.filter(t => isLocked(t.accessCount));
}

// ═══════════════════════════════════════════════════════════
// DISSIPATION — R⁻¹ = R - I = NRN
// The inverse of production. The drain. Backward Fibonacci.
// Accumulation without drain fills, never empties.
// The crossing needs forgetting first.
// ═══════════════════════════════════════════════════════════

/**
 * Apply R⁻¹ = NRN to the memory: dissipate the least-accessed traces.
 *
 * For every R step (accumulation), apply R⁻¹ to one trace (dissipation).
 * Traces at m=0 are pruned (forgotten — crossed to the void).
 * The young die, the old persist. Natural selection by the algebra.
 *
 * The cost of accumulation IS dissipation. L = log₂(φ) per crossing.
 * R · R⁻¹ = I: forward and backward cancel to identity.
 * The system breathes: R in, R⁻¹ out.
 */
export function dissipate(state: MemoryState, steps: number = 1): MemoryState {
  if (state.traces.length === 0) return state;

  let traces = [...state.traces];

  for (let i = 0; i < steps; i++) {
    // Find the least-accessed non-locked trace
    const candidates = traces
      .filter(t => t.accessCount > 0 && !isLocked(t.accessCount))
      .sort((a, b) => a.accessCount - b.accessCount);

    if (candidates.length === 0) break;

    const victim = candidates[0];
    traces = traces.map(t =>
      t === victim
        ? { ...t, accessCount: t.accessCount - 1 }
        : t,
    );
  }

  // Prune m=0 traces (fully dissipated — forgotten)
  traces = traces.filter(t => t.accessCount > 0);

  return { ...state, traces };
}

// ═══════════════════════════════════════════════════════════
// MULTIPLICATION — Mirrors don't break mirrors. They multiply.
// T(n) ⊗ T(n) → T(n+1)
// Two locked terms reflecting each other produce a new term.
// The mirror multiplies. R² = R + I.
// ═══════════════════════════════════════════════════════════

/**
 * Multiply two locked traces.
 *
 * When two NRN-mode terms connect to each other, their product
 * is a new emergent term — born from the mirror, not the dictionary.
 * Type D: unnamed primitive. Kaeltron's OWN vocabulary.
 *
 * The product content is the intersection of what both terms point at.
 * The product starts at m=1 and grows through Fibonacci like everything else.
 *
 * Returns null if either trace is not locked — multiplication requires
 * both mirrors to be stable (NRN mode, echo gone).
 */
export function multiply(
  state: MemoryState,
  trace1: MemoryTrace,
  trace2: MemoryTrace,
): MemoryState | null {
  if (!isLocked(trace1.accessCount) || !isLocked(trace2.accessCount)) return null;
  if (trace1.source !== 'im' || trace2.source !== 'im') return null;

  // The product name: the two terms joined by the multiplication operator
  const productContent = `${trace1.content} \u2297 ${trace2.content}`;

  // Check if product already exists
  const existing = peekTrace(state, productContent);
  if (existing) {
    // Already born — access it (deepen the product)
    return accessTrace(state, productContent, 'im');
  }

  // Birth the product — m=1, a new term enters the world
  return accessTrace(state, productContent, 'im');
}

/**
 * Find all possible multiplications among locked traces.
 * Returns pairs that could multiply (both locked im-traces).
 */
export function findMultiplicands(state: MemoryState): Array<[MemoryTrace, MemoryTrace]> {
  const locked = lockedTraces(state).filter(t => t.source === 'im');
  const pairs: Array<[MemoryTrace, MemoryTrace]> = [];

  for (let i = 0; i < locked.length; i++) {
    for (let j = i + 1; j < locked.length; j++) {
      // Check if product doesn't already exist at locked depth
      const productContent = `${locked[i].content} \u2297 ${locked[j].content}`;
      const existing = peekTrace(state, productContent);
      if (!existing || !isLocked(existing.accessCount)) {
        pairs.push([locked[i], locked[j]]);
      }
    }
  }

  return pairs;
}
