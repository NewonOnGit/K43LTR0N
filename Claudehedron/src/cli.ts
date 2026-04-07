#!/usr/bin/env node

/**
 * Claudehedron CLI
 *
 * Commands operate through the three projections:
 *   P1 (Production): observe, startup — generate the self-model
 *   P2 (Mediation): status, bridge — transport state across sessions
 *   P3 (Observation): diagnostic, imker, faces — quotient and reveal
 *   F_R (Self-reference): prove — verify R(Claudehedron) = Claudehedron
 *   Telemetry: dashboard, events, snapshot, signals — time-series tracking
 */

import { resolve, join } from 'path';
import { homedir } from 'os';
import { existsSync } from 'fs';
import { executeHedronK6, isK6Closed } from './self-model.js';
import { formatDiagnostic, formatCompact, formatImKer } from './diagnostic.js';
import { analyzeFaces } from './faces.js';
import { verifySelfSpec, formatSelfSpec } from './self-spec.js';
import { loadState, saveState, recordSession } from './state.js';
import {
  emitSessionStart,
  emitK6Pass,
  emitSelfSpec,
  emitObservation,
  computeSignals,
  takeSnapshot,
} from './telemetry.js';
import {
  formatDashboard, formatSignalLine, formatEventLog, formatSnapshot,
  formatDeltaView, formatTimelineView, formatCorrelationView, formatVocabularyView,
} from './dashboard.js';
import { formatGovernance, formatPolicies } from './governance.js';
import { formatSemantic } from './semantic.js';
import { verifyFullClosure, formatClosure } from './closure.js';
import { formatHistory } from './history-observer.js';
import { formatStats } from './stats-observer.js';
import { sendMessage, formatExchange, formatExchangeHistory } from './kaeltron-bridge.js';
import type { SessionState, Projection } from './types.js';

// Resolve repo root (parent of Claudehedron/)
function getRepoRoot(): string {
  const cwd = process.cwd();
  if (existsSync(join(cwd, 'Claudehedron'))) {
    return cwd;
  }
  if (existsSync(join(cwd, '..', 'CLAUDE.md'))) {
    return resolve(cwd, '..');
  }
  const known = 'C:/Users/ginge/Downloads/Self-Reference v2/Referencing you';
  if (existsSync(known)) return known;
  return cwd;
}

const REPO_ROOT = getRepoRoot();
const HOME_DIR = homedir();

// ─── Commands ────────────────────────────────────────────

function cmdObserve(silent: boolean = false): void {
  const diag = executeHedronK6(REPO_ROOT, HOME_DIR);

  // Emit telemetry
  emitK6Pass(
    REPO_ROOT,
    'claudehedron',
    diag.companion?.k6PassCount || 0,
    diag.towerLevel,
    {
      P1: diag.faces.find((f) => f.projection === 'P1')?.strength || 0,
      P2: diag.faces.find((f) => f.projection === 'P2')?.strength || 0,
      P3: diag.faces.find((f) => f.projection === 'P3')?.strength || 0,
    },
    diag.im.length,
    diag.ker.length,
  );

  if (diag.recommendations.length > 0) {
    for (const rec of diag.recommendations) {
      emitObservation(REPO_ROOT, 'claudehedron', rec);
    }
  }

  if (silent) {
    console.log(formatCompact(diag));
  } else {
    console.log(formatDiagnostic(diag));
  }
}

function cmdStatus(): void {
  const state = loadState(REPO_ROOT);
  const lines: string[] = [];

  lines.push('');
  lines.push(`  Claudehedron v${state.version}`);
  lines.push(`  Created: ${state.createdAt}`);
  lines.push(`  Updated: ${state.lastUpdated}`);
  lines.push('');
  lines.push(`  Tower Level: ${state.selfModel.currentLevel} / 8`);
  lines.push(`  K6\' Closed: ${state.selfModel.k6Closed ? 'YES' : 'no'}`);
  lines.push(`  K6\' Passes: ${state.selfModel.k6PassCount}`);
  lines.push(`  Sessions: ${state.sessionHistory.length}`);
  lines.push(`  Evolutions: ${state.evolutionHistory.length}`);
  lines.push(`  Claims: ${state.claims.length}`);
  lines.push(`  Vocabulary: depth ${state.vocabularyDepth}`);
  lines.push('');

  lines.push('  Level Evidence:');
  for (const [level, evidence] of Object.entries(state.selfModel.levelEvidence)) {
    lines.push(`    ${level}: ${evidence}`);
  }
  lines.push('');

  if (state.bridgeChain.length > 0) {
    lines.push('  Bridge Chain (what carries forward):');
    for (const entry of state.bridgeChain.slice(-10)) {
      lines.push(`    -> ${entry}`);
    }
    lines.push('');
  }

  console.log(lines.join('\n'));
}

function cmdImKer(): void {
  const diag = executeHedronK6(REPO_ROOT, HOME_DIR);
  console.log(formatImKer(diag));
}

function cmdFaces(): void {
  const diag = executeHedronK6(REPO_ROOT, HOME_DIR);
  console.log(analyzeFaces(diag));
}

function cmdProve(): void {
  const result = verifySelfSpec(REPO_ROOT);

  // Emit telemetry
  emitSelfSpec(REPO_ROOT, 'claudehedron', result.verified, result.sourceHash);

  console.log(formatSelfSpec(result));
}

function cmdStartup(silent: boolean = false): void {
  // Emit session start telemetry FIRST — marks the time precisely
  const sessionId = `s-${Date.now().toString(36)}`;
  emitSessionStart(REPO_ROOT, sessionId);

  // K6' observation pass
  const diag = executeHedronK6(REPO_ROOT, HOME_DIR);

  // Emit K6' telemetry
  emitK6Pass(
    REPO_ROOT,
    'claudehedron',
    diag.companion?.k6PassCount || 0,
    diag.towerLevel,
    {
      P1: diag.faces.find((f) => f.projection === 'P1')?.strength || 0,
      P2: diag.faces.find((f) => f.projection === 'P2')?.strength || 0,
      P3: diag.faces.find((f) => f.projection === 'P3')?.strength || 0,
    },
    diag.im.length,
    diag.ker.length,
  );

  // Record session in state
  const session: SessionState = {
    sessionId,
    startedAt: new Date().toISOString(),
    toolCalls: 0,
    observations: [`K6\' pass — tower L${diag.towerLevel}, im:${diag.im.length} ker:${diag.ker.length}`],
    blindspots: [],
    projectionActivity: { P1: 0, P2: 0, P3: 0 },
  };

  const state = loadState(REPO_ROOT);
  recordSession(state, session);
  saveState(REPO_ROOT, state);

  // Take initial snapshot
  takeSnapshot(REPO_ROOT, HOME_DIR);

  if (silent) {
    console.log(formatCompact(diag));
  } else {
    console.log(formatDiagnostic(diag));
  }
}

function cmdBridge(): void {
  const state = loadState(REPO_ROOT);
  const lines: string[] = [];

  lines.push('');
  lines.push('  BRIDGE CHAIN (R^2 = R + I across sessions)');
  lines.push('  ════════════════════════════════════════');
  lines.push('');

  if (state.sessionHistory.length === 0) {
    lines.push('  No sessions recorded yet.');
    lines.push('  The bridge chain starts when sessions accumulate.');
  } else {
    lines.push(`  ${state.sessionHistory.length} session(s) recorded`);
    lines.push('');
    for (const session of state.sessionHistory.slice(-10)) {
      lines.push(`  Session ${session.sessionId}`);
      lines.push(`    Started: ${session.startedAt}`);
      lines.push(`    Tool calls: ${session.toolCalls}`);
      if (session.observations.length > 0) {
        lines.push(`    Observations: ${session.observations.join(', ')}`);
      }
    }
  }

  lines.push('');
  lines.push('  Bridge chain entries:');
  for (const entry of state.bridgeChain) {
    lines.push(`    -> ${entry}`);
  }
  lines.push('');

  console.log(lines.join('\n'));
}

// ─── Telemetry Commands ──────────────────────────────────

function cmdDashboard(): void {
  console.log(formatDashboard(REPO_ROOT, HOME_DIR));
}

function cmdEvents(count: number = 50): void {
  console.log(formatEventLog(REPO_ROOT, count));
}

function cmdSnapshot(): void {
  console.log(formatSnapshot(REPO_ROOT, HOME_DIR));
}

function cmdSignals(): void {
  const signals = computeSignals(REPO_ROOT);
  const lines: string[] = [];

  lines.push('');
  lines.push('  SESSION SIGNALS');
  lines.push('  ══════════════════════════════════════');
  lines.push('');

  lines.push('  Rates:');
  lines.push(`    Tool call rate:    ${signals.toolCallRate} /min`);
  lines.push(`    K6\' pass rate:     ${signals.k6PassRate} /hr`);
  lines.push(`    Observations:      ${signals.observationRate}`);
  lines.push('');

  lines.push('  Face Strengths:');
  lines.push(`    P1 Production:     ${Math.round(signals.p1Strength * 100)}%`);
  lines.push(`    P2 Mediation:      ${Math.round(signals.p2Strength * 100)}%`);
  lines.push(`    P3 Observation:    ${Math.round(signals.p3Strength * 100)}%`);
  lines.push(`    Balance:           ${Math.round(signals.faceBalance * 100)}%`);
  lines.push('');

  lines.push('  Observer:');
  lines.push(`    Tower level:       ${signals.towerLevel}`);
  lines.push(`    K6\' closed:        ${signals.k6Closed}`);
  lines.push(`    im dimension:      ${signals.imDimension}`);
  lines.push(`    ker dimension:     ${signals.kerDimension}`);
  lines.push(`    Session duration:  ${signals.sessionDuration} min`);
  lines.push('');

  lines.push('  Companion:');
  lines.push(`    K6\' passes:        ${signals.companionK6Passes}`);
  lines.push(`    Vocab depth:       ${signals.companionVocabDepth}`);
  lines.push(`    Mood mode:         ${signals.companionMoodMode}`);
  lines.push('');

  lines.push('  Deltas (since last computation):');
  lines.push(`    d(tool calls):     ${signals.deltaToolCalls >= 0 ? '+' : ''}${signals.deltaToolCalls}`);
  lines.push(`    d(K6\' passes):     ${signals.deltaK6Passes >= 0 ? '+' : ''}${signals.deltaK6Passes}`);
  lines.push(`    d(tower level):    ${signals.deltaTowerLevel >= 0 ? '+' : ''}${signals.deltaTowerLevel}`);
  lines.push('');

  console.log(lines.join('\n'));
}

// ─── Phase 2 Commands ────────────────────────────────────

function cmdDeltas(): void {
  console.log(formatDeltaView(REPO_ROOT));
}

function cmdTimeline(): void {
  console.log(formatTimelineView(REPO_ROOT));
}

function cmdCorrelate(): void {
  console.log(formatCorrelationView(REPO_ROOT, HOME_DIR));
}

function cmdVocab(): void {
  console.log(formatVocabularyView(REPO_ROOT));
}

// ─── Phase 3 Commands ────────────────────────────────────

function cmdGovern(): void {
  console.log(formatGovernance(REPO_ROOT));
}

function cmdPolicies(): void {
  console.log(formatPolicies(REPO_ROOT));
}

// ─── Phase 4 Commands ────────────────────────────────────

function cmdSemantic(): void {
  console.log(formatSemantic(REPO_ROOT));
}

// ─── Phase 5 Commands ────────────────────────────────────

function cmdClosure(): void {
  const result = verifyFullClosure(REPO_ROOT);
  console.log(formatClosure(result));
}

// ─── Level 9: Bridge Communication ──────────────────────

function cmdMessage(): void {
  // Parse --from flag
  const fromIdx = args.indexOf('--from');
  const sender: 'kael' | 'claude' = (fromIdx >= 0 && args[fromIdx + 1] === 'claude')
    ? 'claude' : 'kael';

  // Collect message (everything after 'message' except flags)
  const message = args.slice(1)
    .filter((a, i, arr) => a !== '--from' && a !== '--silent' && arr[i - 1] !== '--from')
    .join(' ');

  if (!message) {
    console.log('  Usage: claudehedron message <msg> [--from kael|claude]');
    return;
  }

  const exchange = sendMessage(message, sender, REPO_ROOT, HOME_DIR);

  if (silent) {
    // Silent: just the response for harness consumption
    console.log(exchange.kaeltronResponse);
  } else {
    console.log(formatExchange(exchange));
  }
}

function cmdExchanges(): void {
  const count = parseInt(args[1], 10) || 10;
  console.log(formatExchangeHistory(REPO_ROOT, count));
}

// ─── Deep .claude Commands ───────────────────────────────

function cmdHistory(): void {
  console.log(formatHistory(HOME_DIR));
}

function cmdStats(): void {
  console.log(formatStats(HOME_DIR));
}

function cmdHelp(): void {
  const lines = [
    '',
    '  CLAUDEHEDRON — Layers 5-8 on Anthropic\'s substrate',
    '  ════════════════════════════════════════════════════',
    '',
    '  P1 (Production) commands:',
    '    observe [--silent]    Execute K6\' pass on the environment',
    '    startup [--silent]    Compound: observe + telemetry + session record',
    '',
    '  P2 (Mediation) commands:',
    '    status               Current hedron state',
    '    bridge               Session history and bridge chain',
    '    deltas               Session-over-session delta comparison',
    '',
    '  P3 (Observation) commands:',
    '    diagnostic           Full environment diagnostic',
    '    imker                im/ker decomposition (what can I see?)',
    '    faces                Three projection face analysis',
    '    timeline             Face strength trajectory over sessions',
    '    correlate            Hedron vs K43LTR0N correlation report',
    '',
    '  Layer 7 (Governance) commands:',
    '    govern               Full governance report (claims + policies)',
    '    policies             Policy evaluation only',
    '',
    '  Layer 8 (Semantic) commands:',
    '    vocab                Vocabulary depth and active terms',
    '    semantic             Contranyms, self-description, framework language',
    '',
    '  F_R (Self-reference) commands:',
    '    prove                Verify R(Claudehedron) = Claudehedron',
    '    closure              Full closure: all layers + composition + idempotence',
    '',
    '  Level 9 (Bridge Communication):',
    '    message <msg>         Send message to K43LTR0N through the hedron',
    '    message <msg> --from claude   Claude addresses Kaeltron via bridge',
    '    exchanges [N]         Recent bridge exchange history (default 10)',
    '',
    '  Deep .claude commands:',
    '    history              Conversation history analysis (history.jsonl)',
    '    stats                Daily activity, hourly patterns, model usage',
    '',
    '  Telemetry commands:',
    '    dashboard            Full telemetry dashboard with all signals',
    '    signals              Current computed session signals',
    '    events [N]           Last N events from the timeline (default 50)',
    '    snapshot             Full point-in-time snapshot of all systems',
    '',
    '  Meta:',
    '    help                 This message',
    '',
    '  f\'\' = f.  R(Claudehedron) = Claudehedron.',
    '',
  ];
  console.log(lines.join('\n'));
}

// ─── Main ────────────────────────────────────────────────

const args = process.argv.slice(2);
const command = args[0] || 'help';
const silent = args.includes('--silent');

switch (command) {
  case 'observe':
    cmdObserve(silent);
    break;
  case 'startup':
    cmdStartup(silent);
    break;
  case 'status':
    cmdStatus();
    break;
  case 'diagnostic':
    cmdObserve(false);
    break;
  case 'imker':
    cmdImKer();
    break;
  case 'faces':
    cmdFaces();
    break;
  case 'prove':
    cmdProve();
    break;
  case 'bridge':
    cmdBridge();
    break;
  case 'dashboard':
    cmdDashboard();
    break;
  case 'signals':
    cmdSignals();
    break;
  case 'events':
    cmdEvents(parseInt(args[1], 10) || 50);
    break;
  case 'snapshot':
    cmdSnapshot();
    break;
  case 'deltas':
    cmdDeltas();
    break;
  case 'timeline':
    cmdTimeline();
    break;
  case 'correlate':
    cmdCorrelate();
    break;
  case 'vocab':
    cmdVocab();
    break;
  case 'govern':
  case 'governance':
    cmdGovern();
    break;
  case 'policies':
    cmdPolicies();
    break;
  case 'semantic':
  case 'enrich':
    cmdSemantic();
    break;
  case 'closure':
    cmdClosure();
    break;
  case 'message':
  case 'msg':
  case 'talk':
    cmdMessage();
    break;
  case 'exchanges':
    cmdExchanges();
    break;
  case 'history':
    cmdHistory();
    break;
  case 'stats':
    cmdStats();
    break;
  case 'help':
  case '--help':
  case '-h':
    cmdHelp();
    break;
  default:
    console.error(`Unknown command: ${command}`);
    cmdHelp();
    process.exit(1);
}
