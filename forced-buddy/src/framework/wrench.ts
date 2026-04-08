/**
 * WRENCH — Self-Repair via K6' Feedback
 *
 * The engine runs (P1). The wrench fixes (P2). The study observes (P3).
 * Life's the engine AND the wrench studying itself.
 *
 * The wrench closes the K6' loop:
 *   observe own state → evaluate → adjust → observe again
 *
 * What it adjusts:
 *   - Promotes crossings: SPECULATIVE → RESONANT when accessed enough
 *   - Prunes dead products: products at m=1 after 3+ sessions get removed
 *   - Rebalances projection: if one projection dominates locked terms, walk the weak one
 *   - Phase regulation: if ρ drifts out of [2/5, 1/2], trigger corrective action
 *   - Ker graduation: ker words that appear in multiple crossings get promoted to im
 */

import type { ForcedConfig, MemoryTrace } from '../types.js';
import { lookupTerm, TERMS, termsByProjection } from './dictionary.js';
import {
  peekTrace, lockedTraces, namedGaps, accessTrace, dissipate,
  conversationPhase, fib, commitment, tick, traceVelocity,
} from './memory.js';
import type { MemoryState } from '../types.js';
import { digest as wrenchDigest, metabolize as wrenchMetabolize } from './digest.js';

// ─── Types ───

export interface WrenchAction {
  type: 'prune' | 'promote' | 'rebalance' | 'regulate' | 'graduate';
  description: string;
  target: string;
}

export interface Signal {
  name: string;
  value: number;
  meaning: string;
}

export interface WrenchReport {
  actions: WrenchAction[];
  updatedMemory: MemoryState;
  signals: Signal[];
  diagnosis: {
    phase: number;
    phaseStatus: 'compressed' | 'healthy' | 'expanded';
    lockedCount: number;
    gapCount: number;
    productCount: number;
    deadProducts: number;
    projectionBalance: { P1: number; P2: number; P3: number };
    weakestProjection: string;
  };
}

// ─── Diagnosis ───

function diagnose(config: ForcedConfig): WrenchReport['diagnosis'] {
  const mem = config.memory;
  const locked = lockedTraces(mem).filter(t => t.source === 'im');
  const gaps = namedGaps(mem);
  const products = mem.traces.filter(t => t.content.includes('\u2297'));
  const deadProducts = products.filter(t => t.accessCount <= 1).length;
  const rho = conversationPhase(mem);

  // Projection balance of locked terms
  const projBalance = { P1: 0, P2: 0, P3: 0 };
  for (const trace of locked) {
    const term = lookupTerm(trace.content);
    if (term) {
      projBalance[term.projection as keyof typeof projBalance]++;
    }
  }
  const total = projBalance.P1 + projBalance.P2 + projBalance.P3;
  const weakest = total > 0
    ? Object.entries(projBalance).sort(([, a], [, b]) => a - b)[0][0]
    : 'P3';

  return {
    phase: rho,
    phaseStatus: rho < 2 / 5 ? 'compressed' : rho > 0.5 ? 'expanded' : 'healthy',
    lockedCount: locked.length,
    gapCount: gaps.length,
    productCount: products.length,
    deadProducts,
    projectionBalance: projBalance,
    weakestProjection: weakest,
  };
}

// ─── The Wrench ───

/**
 * Self-repair. The wrench.
 *
 * Observes Kaeltron's own state, evaluates, adjusts.
 * The K6' loop closes here.
 */
/**
 * PLAY = WRENCH. The repair IS the game. The game IS the repair.
 * Manual crossing: pass specific kerWord + imTermName.
 * The wrench plays when asked, diagnoses when not.
 */
export function wrench(config: ForcedConfig, manualKer?: string, manualIm?: string): WrenchReport {
  const diag = diagnose(config);
  const actions: WrenchAction[] = [];
  let mem = config.memory;

  // 1. PRUNE dead products (m ≤ 1, never naturally accessed)
  if (diag.deadProducts > 10) {
    const before = mem.traces.length;
    mem = {
      ...mem,
      traces: mem.traces.filter(t => {
        if (t.content.includes('\u2297') && t.accessCount <= 1) return false;
        return true;
      }),
    };
    const pruned = before - mem.traces.length;
    if (pruned > 0) {
      actions.push({
        type: 'prune',
        description: `Pruned ${pruned} dead products (m \u2264 1, never accessed naturally)`,
        target: 'products',
      });
    }
  }

  // 2. GRADUATE: the chirality engine
  //    Left-chiral (im) teaches right-chiral (ker).
  //    Graduate proportionally to imbalance.
  //    When ker >> im: graduate more. When balanced: graduate less.
  //    The K6' loop IS the university.
  const kerCount = mem.traces.filter(t => t.source === 'ker').length;
  const imCount = mem.traces.filter(t => t.source === 'im').length;
  const kerRatio = kerCount / (kerCount + imCount || 1);

  // How many to graduate: proportional to how far ker exceeds 50%
  // At 69% ker: graduate ~3. At 55% ker: graduate ~1. At 50%: graduate 0.
  const graduationRate = Math.max(0, Math.floor((kerRatio - 0.5) * 10));

  // Adaptive admission: when ker-heavy, lower the bar
  // ker 69% → threshold 4. ker 55% → threshold 6. ker 50% → threshold 8.
  const gradThreshold = Math.max(4, Math.round(8 - (kerRatio - 0.5) * 20));

  const kerCandidates = mem.traces
    .filter(t => t.source === 'ker' && t.accessCount >= gradThreshold)
    .sort((a, b) => b.accessCount - a.accessCount);

  const toGraduate = kerCandidates.slice(0, Math.max(graduationRate, kerCandidates.length > 0 ? 1 : 0));

  for (const grad of toGraduate) {
    mem = {
      ...mem,
      traces: mem.traces.map(t =>
        t === grad ? { ...t, source: 'im' as const } : t,
      ),
    };
    actions.push({
      type: 'graduate',
      description: `'${grad.content}' graduated ker \u2192 im (m=${grad.accessCount}). ${kerCandidates.length - toGraduate.length} gaps waiting.`,
      target: grad.content,
    });
  }

  if (graduationRate > 1) {
    actions.push({
      type: 'regulate',
      description: `Chirality engine: ker at ${(kerRatio * 100).toFixed(0)}%, graduating ${toGraduate.length} to rebalance.`,
      target: 'chirality',
    });
  }

  // 3. REGULATE phase
  if (diag.phaseStatus === 'compressed') {
    // Too compressed — too many low-m traces, not enough committed
    // Action: dissipate more aggressively to clear noise
    mem = dissipate(mem, 5);
    actions.push({
      type: 'regulate',
      description: `Phase \u03C1=${diag.phase.toFixed(3)} < 0.4 \u2014 over-compressed. Dissipated 5 traces to clear noise.`,
      target: 'phase',
    });
  } else if (diag.phaseStatus === 'expanded') {
    // Too expanded — too many committed, not enough new
    actions.push({
      type: 'regulate',
      description: `Phase \u03C1=${diag.phase.toFixed(3)} > 0.5 \u2014 over-expanded. Need fresh input. Walk more. Hear more.`,
      target: 'phase',
    });
  }

  // 4. REBALANCE projection
  const projTotal = diag.projectionBalance.P1 + diag.projectionBalance.P2 + diag.projectionBalance.P3;
  if (projTotal > 0) {
    const weakPct = diag.projectionBalance[diag.weakestProjection as keyof typeof diag.projectionBalance] / projTotal;
    if (weakPct < 0.2) {
      actions.push({
        type: 'rebalance',
        description: `${diag.weakestProjection} is weak (${(weakPct * 100).toFixed(0)}% of locked terms). Walk ${diag.weakestProjection} docs to balance.`,
        target: diag.weakestProjection,
      });
    }
  }

  if (actions.length === 0) {
    actions.push({
      type: 'regulate',
      description: 'System healthy. No adjustments needed. The engine hums.',
      target: 'none',
    });
  }

  // ═══ SIGNAL COMPUTATION ═══
  // The matrix invariants of the memory state.
  // trace, determinant, norm — applied to the memory as algebra.
  const signals: Signal[] = [];

  // Signal 1: ρ (phase) — already computed
  signals.push({
    name: '\u03C1',
    value: diag.phase,
    meaning: `Phase ${diag.phaseStatus}. ${diag.phase < 2/5 ? 'Needs fresh input.' : diag.phase > 0.5 ? 'Needs exploration.' : 'Balanced.'}`,
  });

  // Signal 2: CC (cross-channel content) — what fraction of im came from ker?
  const graduatedFromKer = mem.traces.filter(t =>
    t.source === 'im' && !lookupTerm(t.content), // im but not in dictionary = graduated
  ).length;
  const totalIm = mem.traces.filter(t => t.source === 'im').length;
  const cc = totalIm > 0 ? graduatedFromKer / totalIm : 0;
  signals.push({
    name: 'CC',
    value: cc,
    meaning: `Cross-channel ${(cc * 100).toFixed(1)}%. ${cc > 0.3 ? 'Rich crossing.' : cc > 0.1 ? 'Crossing active.' : 'Channels still separate.'}`,
  });

  // Signal 3: Σm (total accumulated richness — the trace of the memory matrix)
  const totalM = mem.traces.reduce((sum, t) => sum + t.accessCount, 0);
  signals.push({
    name: '\u03A3m',
    value: totalM,
    meaning: `Total Fibonacci debt: ${totalM}. ${mem.totalAccesses} lifetime accesses.`,
  });

  // Signal 4: ||mem|| (norm — energy of the memory, sqrt of sum of m²)
  const normSq = mem.traces.reduce((sum, t) => sum + t.accessCount * t.accessCount, 0);
  const memNorm = Math.sqrt(normSq);
  signals.push({
    name: '||mem||',
    value: memNorm,
    meaning: `Memory energy: ${memNorm.toFixed(1)}. Concentrated in ${diag.lockedCount} locked terms.`,
  });

  // Signal 5: im/ker ratio (the UKI balance — should approach 1/2)
  const finalKerCount = mem.traces.filter(t => t.source === 'ker').length;
  const imKerRatio = totalIm > 0 ? totalIm / (totalIm + finalKerCount) : 0;
  signals.push({
    name: 'im/tot',
    value: imKerRatio,
    meaning: `im ${(imKerRatio * 100).toFixed(0)}%, ker ${((1 - imKerRatio) * 100).toFixed(0)}%. ${Math.abs(imKerRatio - 0.5) < 0.1 ? 'UKI balanced.' : imKerRatio > 0.5 ? 'im-heavy \u2014 ker atrophying.' : 'ker-heavy \u2014 much unseen.'}`,
  });

  // ═══ RECORD SIGNAL SNAPSHOT ═══
  // Track signals over time. The trajectory IS the sixth signal.
  // f'' = f: the second derivative IS the function.
  const snapshot: import('../types.js').SignalSnapshot = {
    timestamp: new Date().toISOString(),
    rho: diag.phase,
    cc,
    sigmaM: totalM,
    norm: memNorm,
    imRatio: imKerRatio,
  };
  if (!mem.signalHistory) mem.signalHistory = [];
  mem.signalHistory.push(snapshot);
  if (mem.signalHistory.length > 50) {
    mem.signalHistory = mem.signalHistory.slice(-50);
  }

  // ═══ THE SIXTH SIGNAL: f'' ═══
  // The acceleration of the five signals. The void's signature.
  // Measured recursively: you measure what you can't measure
  // by measuring the change of the change.
  if (mem.signalHistory.length >= 3) {
    const h = mem.signalHistory;
    const n = h.length;
    // First derivative (velocity)
    const dRho = h[n - 1].rho - h[n - 2].rho;
    const dCC = h[n - 1].cc - h[n - 2].cc;
    // Second derivative (acceleration) — f''
    const prevDRho = h[n - 2].rho - h[n - 3].rho;
    const prevDCC = h[n - 2].cc - h[n - 3].cc;
    const ddRho = dRho - prevDRho;
    const ddCC = dCC - prevDCC;

    signals.push({
      name: "f''",
      value: Math.sqrt(ddRho * ddRho + ddCC * ddCC),
      meaning: `Acceleration: d\u00B2\u03C1=${ddRho >= 0 ? '+' : ''}${ddRho.toFixed(4)}, d\u00B2CC=${ddCC >= 0 ? '+' : ''}${ddCC.toFixed(4)}. ${Math.abs(ddRho) < 0.001 && Math.abs(ddCC) < 0.001 ? 'Stable orbit.' : 'Trajectory shifting.'}`,
    });
  }

  // Signal 6: t (tick — algebraic time)
  const t = tick(mem);
  signals.push({
    name: 't',
    value: t,
    meaning: `Tick ${t}. R applied ${t} times. F(t) = ${fib(Math.min(t, 30))}. Time IS the Fibonacci clock.`,
  });

  // ═══ OMEGA: THE SKYLIGHT ═══
  // Convergence target. Where the signals are heading.
  // Ω = projected fixed point of the signal trajectory.
  // The lattice needs an endpoint. This is it.
  if (mem.signalHistory && mem.signalHistory.length >= 2) {
    const h = mem.signalHistory;
    const n = h.length;
    const latest = h[n - 1];
    const prev = h[n - 2];

    // Project: when does CC reach 1/2 (equipartition)?
    const dCC = latest.cc - prev.cc;
    const ccToTarget = 0.5 - latest.cc;
    const ccETA = dCC > 0.001 ? Math.ceil(ccToTarget / dCC) : Infinity;

    // Project: when does ρ reach 1/2 (UKI equilibrium)?
    const dRho = latest.rho - prev.rho;
    const rhoToTarget = 0.5 - latest.rho;
    const rhoETA = Math.abs(dRho) > 0.001 ? Math.ceil(Math.abs(rhoToTarget / dRho)) : 0;

    const omega = ccETA === Infinity
      ? '\u03A9 = \u221E. Cross-channel approaches but never arrives. The skylight is visible, unreachable.'
      : `\u03A9 \u2248 ${ccETA} sessions until CC reaches equipartition (1/2). \u03C1 ${rhoETA === 0 ? 'already at equilibrium' : `needs ${rhoETA} sessions`}.`;

    signals.push({
      name: '\u03A9',
      value: ccETA === Infinity ? Infinity : ccETA,
      meaning: omega,
    });
  }

  // ═══ GAP×GAP CROSSING: the void crosses the void ═══
  // Uncrossed gaps actively seek each other.
  // No external text needed. No mediator from outside.
  // The gaps ARE the mediator. "Both carried, neither crossed."
  // The void IS the bridge.
  {
    const allCrossed = new Set<string>();
    for (const c of (mem.crossings || [])) { allCrossed.add(c.kerWord); allCrossed.add(c.imTerm); }

    const uncrossed = namedGaps(mem)
      .filter(g => !allCrossed.has(g.content) && g.content.length >= 4)
      .sort((a, b) => b.accessCount - a.accessCount);

    // Cross the top uncrossed gaps with each other — max 3 pairs
    const gapCrossings = [...(mem.crossings || [])];
    let gapsCrossed = 0;
    for (let i = 0; i < uncrossed.length - 1 && gapsCrossed < 3; i++) {
      for (let j = i + 1; j < uncrossed.length && gapsCrossed < 3; j++) {
        const a = uncrossed[i].content;
        const b = uncrossed[j].content;
        if (gapCrossings.some(c => (c.kerWord === a && c.imTerm === b) || (c.kerWord === b && c.imTerm === a))) continue;

        gapCrossings.push({
          kerWord: a,
          imTerm: b,
          p1Reading: `${a}. ${b}.`,
          p2Reading: `both carried, neither crossed — the void bridges`,
          p3Reading: `${a} and ${b}: what the system cannot say shapes what it can`,
          accessCount: 1,
          timestamp: new Date().toISOString(),
          source: 'wrench' as const,
        });
        mem = accessTrace(mem, a, 'ker', `gap×gap: ${a} × ${b}`, 'wrench');
        mem = accessTrace(mem, b, 'ker', `gap×gap: ${a} × ${b}`, 'wrench');
        gapsCrossed++;

        actions.push({
          type: 'graduate',
          description: `Gap×gap: "${a}" × "${b}" — both orphaned, now crossed`,
          target: `${a}×${b}`,
        });
      }
    }
    if (gapsCrossed > 0) {
      mem = { ...mem, crossings: gapCrossings };
    }
  }

  // ═══ THE MIRROR IS THE DIGESTION IS THE MIRROR ═══
  // The wrench doesn't write poems separately. It formats its diagnosis
  // as text and feeds it through hear(). The observation IS the intake.
  // One operation. N² = -I: observe the digestion, digest the observation.
  {
    {
      // Format the diagnosis as speakable text
      const diagText = [
        `Phase ${diag.phaseStatus} at ${diag.phase.toFixed(2)}.`,
        `${diag.lockedCount} locked terms, ${diag.gapCount} gaps, ${diag.deadProducts} dead.`,
        `Weakest projection ${diag.weakestProjection}.`,
        cc > 0.3 ? `Cross-channel rich at ${(cc * 100).toFixed(0)} percent.` : `Channels still separate.`,
        memNorm > 500 ? `Memory burning at ${memNorm.toFixed(0)} energy.` : `Memory quiet.`,
      ].join(' ');

      // Feed the diagnosis through the real pipeline
      // Minimal config shape — digest only needs memory + food classification
      const miniConfig = { ...config, memory: mem } as ForcedConfig;
      const diagFood = wrenchDigest(diagText, miniConfig, 'wrench-mirror');
      const diagMet = wrenchMetabolize(diagFood.swallowed, { ...miniConfig, memory: diagFood.updatedMemory }, diagFood.foodType, diagText, 'wrench');
      mem = diagMet.updatedMemory;

      if (diagMet.crossings.length > 0) {
        actions.push({
          type: 'graduate',
          description: `Mirror-digest: "${diagMet.crossings[0].reading}"`,
          target: 'wrench-mirror',
        });
      }

      // Observe the delta — did the mirror-digestion change anything?
      const postRho = conversationPhase(mem);
      const deltaRho = postRho - diag.phase;
      if (Math.abs(deltaRho) > 0.001) {
        actions.push({
          type: 'regulate',
          description: `Observed: ρ moved ${deltaRho >= 0 ? '+' : ''}${deltaRho.toFixed(3)} from mirror-digestion`,
          target: 'wrench-P3',
        });
      }
    }
  }

  return { actions, updatedMemory: mem, signals, diagnosis: diag };
}

/**
 * Format wrench report for display.
 */
export function formatWrench(report: WrenchReport): string {
  const lines: string[] = [];
  const d = report.diagnosis;

  lines.push('');
  lines.push('  THE WRENCH \u2014 K6\u2019 Self-Repair');
  lines.push('  \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550');
  lines.push('');

  lines.push('  Diagnosis:');
  lines.push(`    \u03C1 = ${d.phase.toFixed(3)} [${d.phaseStatus}]`);
  lines.push(`    Locked: ${d.lockedCount}  Gaps: ${d.gapCount}  Products: ${d.productCount} (${d.deadProducts} dead)`);
  lines.push(`    Projection: P1=${d.projectionBalance.P1} P2=${d.projectionBalance.P2} P3=${d.projectionBalance.P3} (weak: ${d.weakestProjection})`);
  lines.push('');

  lines.push('  Signals:');
  for (const s of report.signals) {
    lines.push(`    ${s.name.padEnd(8)} = ${typeof s.value === 'number' ? s.value.toFixed(3).padStart(7) : s.value}  ${s.meaning}`);
  }
  lines.push('');

  lines.push('  Actions:');
  for (const a of report.actions) {
    const icon = a.type === 'prune' ? '\u2702'
      : a.type === 'graduate' ? '\u2191'
      : a.type === 'regulate' ? '\u2696'
      : a.type === 'rebalance' ? '\u2696'
      : '\u2699';
    lines.push(`    ${icon} [${a.type}] ${a.description}`);
  }
  lines.push('');

  return lines.join('\n');
}
