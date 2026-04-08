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

// ─── System limits: the stack evolves through Fibonacci ───

/**
 * SYSTEM LIMITS — derived from the system's Fibonacci age.
 *
 * Age = the Fibonacci step closest to totalAccesses.
 * As the system matures, all limits advance to the next F(n).
 * Young system: tight limits. Old system: room to grow.
 * The stack grows through the same algebra as everything else.
 *
 * R² = R + I. The limits exceed their previous values.
 */
export function systemLimits(totalAccesses: number): {
  traceCap: number;
  crossingCap: number;
  crossingsPerDigest: number;
  mCap: number;
  recentWindow: number;
} {
  // Find the Fibonacci age: which F(n) is closest to totalAccesses?
  // Use log_φ approximation: age ≈ log(totalAccesses * √5) / log(φ)
  const PHI = (1 + Math.sqrt(5)) / 2;
  const age = totalAccesses > 1
    ? Math.max(0, Math.floor(Math.log(totalAccesses * Math.sqrt(5)) / Math.log(PHI)))
    : 0;

  // Limits indexed by maturity brackets
  // Each bracket advances all limits by one Fibonacci step
  const maturity = Math.min(Math.floor(age / 5), 4); // 0-4 maturity levels

  return {
    traceCap:          [144, 233, 377, 610, 987][maturity],    // F(12) → F(16)
    crossingCap:       [34,  55,  89,  144, 233][maturity],    // F(9) → F(13)
    crossingsPerDigest:[3,   5,   5,   8,   8][maturity],      // F(4) → F(6)
    mCap:              [89,  89,  144, 233, 377][maturity],     // F(11) → F(14)
    recentWindow:      [8,   13,  13,  21,  21][maturity],     // F(6) → F(8)
  };
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
function residual(m: number): number {
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
  sentence?: string,
  who?: string,
  mood?: string,
): MemoryState {
  const now = new Date().toISOString();
  const normalized = content.toLowerCase().trim();
  const existing = state.traces.find(
    t => t.content.toLowerCase() === normalized && t.source === source,
  );

  let updatedTraces: MemoryTrace[];

  if (existing) {
    updatedTraces = state.traces.map(t => {
      if (t !== existing) return t;
      // Add context sentence (backward compat)
      const ctx = t.context || [];
      if (sentence && !ctx.includes(sentence)) {
        ctx.push(sentence);
        if (ctx.length > 5) ctx.shift();
      }
      // Fill the word full of itself — who, when, mood
      const filled = t.filled || [];
      if (sentence) {
        filled.push({
          sentence: sentence.slice(0, 100),
          who: (who || 'self') as any,
          mood: mood || 'unknown',
          timestamp: now,
        });
        if (filled.length > 5) filled.shift(); // keep last 5 fillings
      }
      return {
        ...t,
        accessCount: Math.min(t.accessCount + 1, systemLimits(state.totalAccesses).mCap),
        lastAccessed: now,
        context: ctx,
        filled,
      };
    });
  } else {
    const newTrace: MemoryTrace = {
      content,
      source,
      accessCount: 1,
      firstSeen: now,
      lastAccessed: now,
      context: sentence ? [sentence] : [],
      filled: sentence ? [{
        sentence: sentence.slice(0, 100),
        who: (who || 'self') as any,
        mood: mood || 'unknown',
        timestamp: now,
      }] : [],
    };
    updatedTraces = [...state.traces, newTrace];
  }

  return {
    traces: updatedTraces,
    totalAccesses: state.totalAccesses + 1,
    signalHistory: state.signalHistory || [],
    crossings: state.crossings ?? [],
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

// ═══════════════════════════════════════════════════════════
// TIME — R IS the clock. Each access is a tick.
// t = totalAccesses. F(t) grows as φ^t.
// The Fibonacci sequence IS time.
// ═══════════════════════════════════════════════════════════

/**
 * The current tick. t = totalAccesses.
 * Time IS R applied. Each access advances the clock.
 */
export function tick(state: MemoryState): number {
  return state.totalAccesses;
}

/**
 * Age of a trace in ticks. How many R-steps since birth.
 * Not wall-clock. Algebraic time. t_now - t_birth.
 */
export function traceAge(state: MemoryState, trace: MemoryTrace): number {
  // Approximate: total ticks - (accessCount accumulated over time)
  // True age = ticks since firstSeen, but we don't store birth-tick
  // So age ≈ total ticks × (1 - recency), where recency = how recently accessed
  const now = Date.now();
  const lastAccess = new Date(trace.lastAccessed).getTime();
  const birth = new Date(trace.firstSeen).getTime();
  const lifespan = now - birth;
  const staleness = now - lastAccess;
  // Convert to ticks: proportional to total accesses
  return Math.round((staleness / Math.max(lifespan, 1)) * state.totalAccesses);
}

/**
 * Velocity of a trace: how fast is it being accessed?
 * accesses / age_in_ticks. High velocity = actively used. Low = fading.
 */
export function traceVelocity(state: MemoryState, trace: MemoryTrace): number {
  const age = traceAge(state, trace);
  return age > 0 ? trace.accessCount / age : trace.accessCount;
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

