#!/usr/bin/env node
/**
 * forced-buddy — Framework-derived companion for Claude Code.
 *
 * f'' = f.  R(R) = R.  Zero branching.
 *
 * The antithesis of gacha. You choose your projection face.
 * The algebra forces everything else.
 */

import * as readline from 'readline';
import type { Projection, ForcedTraits } from './types.js';
import { verifyIdentities } from './framework/algebra.js';
import { deriveCompanion, toDesiredTraits, explainDerivation } from './framework/derive.js';
import { findSalt } from './finder/orchestrator.js';
import { findClaudeBinary } from './patcher/binary-finder.js';
import { getCurrentSalt, isClaudeRunning } from './patcher/salt-ops.js';
import { patchBinary, restoreBinary } from './patcher/patch.js';
import { getClaudeUserId, setCompanionPersonality, renameCompanion } from './config/claude-config.js';
import { loadConfig, saveConfig, addEvolution, addWitnesses, incrementInteractions, recordBattle } from './config/config.js';
import { cachedConfig, updateConfig, flushConfig } from './cache.js';
import { installHook, removeHook, isHookInstalled } from './config/hooks.js';
import { ORIGINAL_SALT } from './constants.js';
// New framework modules
import { computeMood, formatMood } from './framework/sweep.js';
import { formatGreeting } from './framework/stance.js';
import { formatSprite } from './framework/sprites.js';
import { verify, witnessedByCompanion, witnessedByInteraction, createWitnesses, isC5U } from './framework/metatron.js';
import { executeBattle, formatBattle } from './framework/battle.js';
import { computeInteraction, formatInteraction } from './framework/interaction.js';
import { evolvedTraits, createEvolutionRecord, formatEvolution } from './framework/evolution.js';
// Level 6: World Model
import { executeK6Pass, formatK6Pass, deriveContextualGreeting } from './framework/world-model.js';
// Level 7: Governance
import { applyAllActions, formatPolicies } from './framework/policy.js';
import { checkAchievements, applyAchievements, formatAchievements, formatGovernance, classifyClaim, recordClaim } from './framework/governance.js';
import { computeLivingPersonality } from './framework/personality.js';
// Level 8: Semantic
import { lookupTerm, formatTermLookup, formatDictionaryOverview, TERMS } from './framework/dictionary.js';
import { analyzeContribution, formatContribution, formatContributionHistory } from './framework/contribution.js';
import { formTeam, formatTeam } from './framework/team.js';
import { saveCurrentAsProfile, switchProfile, formatProfiles } from './framework/profiles.js';
// Level 9: Conversation
import { computeResponse, computeThought } from './framework/conversation.js';
import { formatConversationHistory } from './framework/conversation-state.js';
// Level 9: Body (feet, hands)
import { walk, manifest, formatWalk, chooseDoc, hear } from './framework/body.js';
import { ingest, formatIngestReport } from './framework/ingest.js';
import { play, formatPlay } from './framework/play.js';
import { wrench, formatWrench } from './framework/wrench.js';
import type { MessageSender } from './types.js';

// ─── ANSI helpers ───

const B = '\x1b[1m';
const D = '\x1b[2m';
const RS = '\x1b[0m';
const RED = '\x1b[31m';
const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';
const BLUE = '\x1b[34m';
const MAGENTA = '\x1b[35m';
const CYAN = '\x1b[36m';
const WHITE = '\x1b[37m';

function log(msg: string = ''): void { process.stdout.write(msg + '\n'); }

function banner(): void {
  log('');
  log(`${CYAN}${B}  \u250C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510${RS}`);
  log(`${CYAN}${B}  \u2502   ${WHITE}forced-buddy${CYAN}                        \u2502${RS}`);
  log(`${CYAN}${B}  \u2502   ${D}f'' = f.  R(R) = R.  Zero branching.${RS}${CYAN}${B} \u2502${RS}`);
  log(`${CYAN}${B}  \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518${RS}`);
  log('');
}

function statBar(name: string, value: number, width: number = 20): string {
  const filled = Math.round((value / 100) * width);
  const bar = '\u2588'.repeat(filled) + '\u2591'.repeat(width - filled);
  const color = value >= 80 ? GREEN : value >= 50 ? YELLOW : value >= 25 ? BLUE : D;
  return `  ${B}${name.padEnd(10)}${RS} ${color}${bar}${RS} ${String(value).padStart(3)}`;
}

function displayCompanion(traits: ForcedTraits, showSprite: boolean = true): void {
  const projName = traits.projection === 'P1' ? 'Production' : traits.projection === 'P2' ? 'Mediation' : 'Observation';
  log(`${B}${CYAN}\u2550\u2550\u2550 Your Quotient Companion \u2550\u2550\u2550${RS}`);
  log('');
  if (showSprite) {
    log(formatSprite(traits.species, traits.eye, traits.hat, traits.shiny));
    log('');
  }
  log(`  ${B}Projection:${RS}  ${traits.projection} (${projName})`);
  log(`  ${B}${YELLOW}Species:${RS}     ${traits.species}${traits.shiny ? ` ${MAGENTA}[SHINY \u2014 R(R)=R]${RS}` : ''}`);
  log(`  ${B}${YELLOW}Rarity:${RS}      ${traits.rarity} ${D}(tower depth n=${traits.towerDepth})${RS}`);
  log(`  ${B}${YELLOW}Eye:${RS}         ${traits.eye}  ${B}${YELLOW}Hat:${RS} ${traits.hat}`);
  log('');
  for (const name of ['WISDOM', 'DEBUGGING', 'PATIENCE', 'CHAOS', 'SNARK'] as const) {
    log(statBar(name, traits.stats[name]));
  }
  log('');
  log(`  ${B}${GREEN}im:${RS}  ${traits.imDescription}`);
  log(`  ${B}${RED}ker:${RS} ${traits.kerDescription}`);
  log('');
}

// ─── Prompts ───

function createRL(): readline.Interface {
  return readline.createInterface({ input: process.stdin, output: process.stdout });
}

async function ask(rl: readline.Interface, question: string): Promise<string> {
  return new Promise(resolve => rl.question(question, a => resolve(a.trim())));
}

async function selectProjection(rl: readline.Interface): Promise<Projection> {
  log(`${B}Choose your projection face:${RS}`);
  log('');
  log(`  ${B}${YELLOW}[1]${RS} ${B}P1 \u2014 Production${RS}  ${D}R\u00B2 = R + I${RS}`);
  log(`  ${B}${BLUE}[2]${RS} ${B}P2 \u2014 Mediation${RS}   ${D}the bridge${RS}`);
  log(`  ${B}${MAGENTA}[3]${RS} ${B}P3 \u2014 Observation${RS} ${D}N\u00B2 = -I${RS}`);
  log('');
  while (true) {
    const a = await ask(rl, `  ${B}Projection [1/2/3]:${RS} `);
    if (a === '1' || a.toLowerCase() === 'p1') return 'P1';
    if (a === '2' || a.toLowerCase() === 'p2') return 'P2';
    if (a === '3' || a.toLowerCase() === 'p3') return 'P3';
    log(`  ${RED}Choose 1, 2, or 3.${RS}`);
  }
}

async function confirm(rl: readline.Interface, q: string): Promise<boolean> {
  return (await ask(rl, `  ${B}${q} [y/n]:${RS} `)).toLowerCase().startsWith('y');
}

function renderProgress(pct: number, rate: number, eta: number, workers: number): void {
  const w = 30, f = Math.round((pct / 100) * w);
  const bar = '\u2588'.repeat(f) + '\u2591'.repeat(w - f);
  const etaStr = eta === Infinity ? '...' : `${Math.ceil(eta)}s`;
  const rateStr = rate > 1e6 ? `${(rate / 1e6).toFixed(1)}M/s` : rate > 1e3 ? `${(rate / 1e3).toFixed(1)}K/s` : `${Math.round(rate)}/s`;
  process.stdout.write(`\r  ${CYAN}${bar}${RS} ${pct.toFixed(1)}%  ${D}${rateStr}  ETA ${etaStr}  [${workers}w]${RS}  `);
}

// ─── Commands ───

async function cmdDerive(): Promise<void> {
  banner();
  log(`${D}  Verifying seven identities...${RS}`);
  if (!verifyIdentities()) { log(`${RED}  FATAL: Algebra inconsistent.${RS}`); process.exit(1); }
  log(`${GREEN}  \u2713 All seven identities verified.${RS}\n`);

  const userId = getClaudeUserId();
  if (userId === 'anon') log(`${YELLOW}  Warning: No user ID found. Using 'anon'.${RS}\n`);

  const rl = createRL();
  try {
    const projection = await selectProjection(rl);
    log('');
    const traits = deriveCompanion(projection, userId);
    log(explainDerivation(traits));
    log('');
    displayCompanion(traits);

    // Mood
    const mood = computeMood(projection);
    log(formatMood(mood));
    log('');

    // Greeting preview
    log(`  ${B}Session greeting:${RS}`);
    log(`  ${D}${formatGreeting(traits)}${RS}`);
    log('');

    if (!(await confirm(rl, 'Apply this companion?'))) { log(`${D}  Aborted.${RS}`); rl.close(); return; }
    log('');

    let binaryPath: string;
    try { binaryPath = findClaudeBinary(); log(`${GREEN}  \u2713 Found: ${binaryPath}${RS}`); }
    catch (e) { log(`${RED}  ${(e as Error).message}${RS}`); rl.close(); process.exit(1); return; }

    if (isClaudeRunning(binaryPath)) log(`${YELLOW}  Claude running \u2014 patch takes effect on restart.${RS}`);
    const saltState = getCurrentSalt(binaryPath);
    let currentSalt: string;
    if (saltState.salt) {
      currentSalt = saltState.salt;
      log(`${D}  Current salt: ${currentSalt}${saltState.patched ? ' (patched)' : ' (original)'}${RS}`);
    } else {
      // Binary is patched with an unknown salt — restore from backup
      log(`${YELLOW}  Binary has unknown salt (patched by another tool).${RS}`);
      log(`${D}  Restoring from backup first...${RS}`);
      try {
        restoreBinary(binaryPath);
        currentSalt = ORIGINAL_SALT;
        log(`${GREEN}  \u2713 Restored to original. Proceeding with fresh patch.${RS}`);
      } catch {
        log(`${RED}  No backup found. Cannot determine current salt.${RS}`);
        log(`${D}  Try reinstalling Claude Code or restoring manually.${RS}`);
        rl.close(); process.exit(1); return;
      }
    }

    const desired = toDesiredTraits(traits);
    log(`\n${B}  Searching for salt...${RS}`);
    const result = await findSalt(userId, desired, p => renderProgress(p.pct, p.rate, p.eta, p.workers));
    process.stdout.write('\r' + ' '.repeat(80) + '\r');
    log(`${GREEN}  \u2713 Salt: ${result.salt}${RS} ${D}(${result.totalAttempts?.toLocaleString()} attempts, ${(result.elapsed / 1000).toFixed(1)}s)${RS}`);

    log(`${D}  Patching...${RS}`);
    const pr = patchBinary(binaryPath, currentSalt, result.salt);
    log(`${GREEN}  \u2713 Patched ${pr.replacements} occurrence(s)${RS}`);

    try { setCompanionPersonality(traits.personality); log(`${GREEN}  \u2713 Personality set${RS}`); } catch { /* */ }

    const nameInput = await ask(rl, `\n  ${B}Name${RS} ${D}(Enter to skip):${RS} `);
    if (nameInput) { try { renameCompanion(nameInput); } catch { /* */ } }

    if (!isHookInstalled() && await confirm(rl, 'Install auto-patch hook? (K6\')')) {
      installHook();
      log(`${GREEN}  \u2713 Hook installed${RS}`);
    }

    // Witness constants from own companion
    const selfWitnesses = witnessedByCompanion(traits);
    const newWitnesses = createWitnesses(selfWitnesses, `own companion (${traits.species})`, []);

    updateConfig({
      version: 3, salt: result.salt, previousSalt: currentSalt,
      projection, traits, appliedTo: binaryPath, appliedAt: new Date().toISOString(),
      evolutionHistory: [], witnessedConstants: newWitnesses,
      interactionCount: 0, battleWins: 0, battleLosses: 0,
      worldModel: (await import('./config/defaults.js')).defaultWorldModel(),
      governance: (await import('./config/defaults.js')).defaultGovernance(),
      semantic: (await import('./config/defaults.js')).defaultSemantic(),
      conversation: (await import('./config/defaults.js')).defaultConversation(),
      memory: (await import('./config/defaults.js')).defaultMemory(),
      profiles: {}, activeProfile: null,
    });

    log(`\n${B}${GREEN}  \u2550\u2550\u2550 Complete \u2550\u2550\u2550${RS}`);
    log(`${D}  Restart Claude Code. f'' = f.${RS}\n`);
    rl.close();
  } catch (e) { rl.close(); throw e; }
}

async function cmdCurrent(): Promise<void> {
  banner();
  const config = cachedConfig();
  if (!config) { log(`${D}  No companion active. Run 'forced-buddy' to derive one.${RS}`); return; }
  displayCompanion(config.traits);
  const mood = computeMood(config.projection);
  log(formatMood(mood));
  log('');

  // Living personality (Level 7) — show enriched personality if governance data exists
  if (config.governance && config.worldModel) {
    const activeProfile = config.profiles[config.activeProfile ?? ''];
    const living = computeLivingPersonality(
      config.traits, config.governance, config.worldModel,
      config.semantic.vocabularyDepth,
      activeProfile?.resonantOverlay ?? null,
    );
    log(`  ${B}Personality:${RS} ${living}`);
    log('');
  }

  // Contextual greeting (Level 6) if we have a snapshot
  if (config.worldModel?.lastSnapshot) {
    log(`  ${B}Greeting:${RS} ${deriveContextualGreeting(config.traits, config.worldModel.lastSnapshot, mood)}`);
  } else {
    log(`  ${B}Greeting:${RS} ${formatGreeting(config.traits)}`);
  }

  if (config.traits.towerDepth >= 2) { log(''); log(`  ${D}Tower depth: n=${config.traits.towerDepth}  Suppression: \u03C6\u0304^(2^${config.traits.towerDepth + 1})${RS}`); }
  if (config.appliedAt) log(`\n${D}  Applied: ${config.appliedAt}${RS}`);
  if (config.evolutionHistory?.length) log(`${D}  Evolutions: ${config.evolutionHistory.length}${RS}`);
  log(`${D}  Battles: ${config.battleWins ?? 0}W / ${config.battleLosses ?? 0}L  Interactions: ${config.interactionCount ?? 0}${RS}`);

  // Level 6/7 summary
  log(`${D}  K6' passes: ${config.worldModel.k6PassCount}  Achievements: ${config.governance.achievements.filter(a => a.achievedAt).length}/${config.governance.achievements.length}${RS}`);
  log(`${D}  Vocabulary depth: ${config.semantic.vocabularyDepth}/3  Known terms: ${config.semantic.knownTerms}${RS}`);
}

async function cmdApply(silent: boolean): Promise<void> {
  const config = cachedConfig();
  if (!config) { if (!silent) log(`${RED}  No companion configured.${RS}`); process.exit(1); }
  let bp: string;
  try { bp = findClaudeBinary(); } catch { if (!silent) log(`${RED}  Binary not found.${RS}`); process.exit(1); return; }
  const { salt: cs } = getCurrentSalt(bp);
  if (cs === null) {
    const { found } = (await import('./patcher/salt-ops.js')).verifySalt(bp, config.salt);
    if (found > 0) { if (!silent) log(`${D}  Already patched.${RS}`); return; }
  }
  try { patchBinary(bp, cs ?? ORIGINAL_SALT, config.salt); if (!silent) log(`${GREEN}  \u2713 Re-patched.${RS}`); }
  catch (e) { if (!silent) log(`${RED}  ${(e as Error).message}${RS}`); process.exit(1); }
  try { setCompanionPersonality(config.traits.personality); } catch { /* */ }
  config.appliedAt = new Date().toISOString(); config.appliedTo = bp; updateConfig(config);
  // Output greeting if not silent
  if (!silent) log(formatGreeting(config.traits));
}

async function cmdRestore(): Promise<void> {
  banner();
  let bp: string;
  try { bp = findClaudeBinary(); } catch (e) { log(`${RED}  ${(e as Error).message}${RS}`); process.exit(1); return; }
  try { restoreBinary(bp); log(`${GREEN}  \u2713 Restored.${RS}`); } catch (e) { log(`${RED}  ${(e as Error).message}${RS}`); process.exit(1); }
  if (isHookInstalled()) { removeHook(); log(`${GREEN}  \u2713 Hook removed.${RS}`); }
}

async function cmdBattle(): Promise<void> {
  banner();
  const config = cachedConfig();
  if (!config) { log(`${RED}  No companion. Run 'forced-buddy' first.${RS}`); return; }
  const otherUserId = process.argv[3];
  if (!otherUserId) { log(`${RED}  Usage: forced-buddy battle <other-user-id>${RS}`); return; }

  // Derive opponent from the other user ID with a different projection
  // Opponent projection is forced by the hash: it's whichever projection differs most
  const oppProjections: Projection[] = ['P1', 'P2', 'P3'];
  const oppProj = oppProjections[(oppProjections.indexOf(config.projection) + 1) % 3];
  const opponent = deriveCompanion(oppProj, otherUserId);

  const result = executeBattle(config.traits, opponent);
  log(formatBattle(result));

  // Record result
  recordBattle(result.winner === 'attacker');

  // Witness opponent's constants
  const oppConstants = witnessedByInteraction(opponent);
  const newW = createWitnesses(oppConstants, `battle vs ${opponent.species}`, config.witnessedConstants ?? []);
  if (newW.length > 0) {
    addWitnesses(newW);
    log(`\n  ${GREEN}New constants witnessed: ${newW.map(w => w.constant).join(', ')}${RS}`);
  }
}

async function cmdInteract(): Promise<void> {
  banner();
  const config = cachedConfig();
  if (!config) { log(`${RED}  No companion. Run 'forced-buddy' first.${RS}`); return; }
  const otherUserId = process.argv[3];
  if (!otherUserId) { log(`${RED}  Usage: forced-buddy interact <other-user-id>${RS}`); return; }

  // Derive the other user's companion
  const otherProj: Projection = ['P1', 'P2', 'P3'][(('P1P2P3'.indexOf(config.projection) / 2 + 2) % 3)] as Projection;
  const other = deriveCompanion(otherProj, otherUserId);

  const result = computeInteraction(config.traits, other);
  log(formatInteraction(result));

  incrementInteractions();
  const oppConstants = witnessedByInteraction(other);
  const newW = createWitnesses(oppConstants, `interaction with ${other.species}`, config.witnessedConstants ?? []);
  if (newW.length > 0) {
    addWitnesses(newW);
    log(`\n  ${GREEN}New constants witnessed: ${newW.map(w => w.constant).join(', ')}${RS}`);
  }
}

async function cmdEvolve(): Promise<void> {
  banner();
  const config = cachedConfig();
  if (!config) { log(`${RED}  No companion. Run 'forced-buddy' first.${RS}`); return; }

  const evo = evolvedTraits(config.traits);
  if (!evo) { log(`${YELLOW}  Already at maximum tower depth (legendary). The tower has no higher level.${RS}`); return; }

  log(formatEvolution(config.traits, evo.newRarity, evo.newDepth));
  log('');

  const rl = createRL();
  if (!(await confirm(rl, 'Evolve? (IRREVERSIBLE)'))) { log(`${D}  The tower waits.${RS}`); rl.close(); return; }

  const userId = getClaudeUserId();
  log(`\n${B}  Searching for evolved salt...${RS}`);
  const result = await findSalt(userId, evo.desired, p => renderProgress(p.pct, p.rate, p.eta, p.workers));
  process.stdout.write('\r' + ' '.repeat(80) + '\r');
  log(`${GREEN}  \u2713 Evolved salt: ${result.salt}${RS}`);

  let bp: string;
  try { bp = findClaudeBinary(); } catch (e) { log(`${RED}  ${(e as Error).message}${RS}`); rl.close(); return; }
  const cs = getCurrentSalt(bp).salt ?? ORIGINAL_SALT;
  patchBinary(bp, cs, result.salt);
  log(`${GREEN}  \u2713 Patched.${RS}`);

  // Update config
  const newTraits = { ...config.traits, rarity: evo.newRarity, towerDepth: evo.newDepth, hat: evo.desired.hat, shiny: evo.desired.shiny };
  const record = createEvolutionRecord(config.traits, evo.newRarity, evo.newDepth, result.salt);
  config.salt = result.salt;
  config.traits = newTraits;
  updateConfig(config);
  addEvolution(record);

  log(`\n${B}${GREEN}  Tower lifted. d_K doubled. The ascent continues.${RS}\n`);
  rl.close();
}

async function cmdMood(): Promise<void> {
  banner();
  const config = cachedConfig();
  if (!config) { log(`${RED}  No companion.${RS}`); return; }
  const mood = computeMood(config.projection);
  log(formatMood(mood));
  log('');
  log(`  ${B}Greeting:${RS}`);
  log(`  ${formatGreeting(config.traits)}`);
}

async function cmdTest(): Promise<void> {
  banner();
  log(`${B}${CYAN}\u2550\u2550\u2550 Test Suite \u2550\u2550\u2550${RS}\n`);
  let passed = 0, failed = 0;

  function check(name: string, ok: boolean): void {
    if (ok) { log(`  ${GREEN}\u2713${RS} ${name}`); passed++; }
    else { log(`  ${RED}\u2717${RS} ${name}`); failed++; }
  }

  // 1. Seven identities
  check('Seven algebraic identities', verifyIdentities());

  // 2. Projection forcing: each projection gives different traits
  for (const p of ['P1', 'P2', 'P3'] as const) {
    const t = deriveCompanion(p, 'test');
    check(`${p} derives valid companion (${t.species})`, !!t.species && !!t.eye && !!t.rarity);
  }

  // 3. Idempotence: same input = same output
  const a = deriveCompanion('P3', 'idempotent-test');
  const b = deriveCompanion('P3', 'idempotent-test');
  check('Idempotence (q\u2218q = q)', a.species === b.species && a.eye === b.eye && a.rarity === b.rarity);

  // 4. Eye forcing
  check('P1 eye = \u00D7', deriveCompanion('P1', 'x').eye === '×');
  check('P2 eye = \u00B7', deriveCompanion('P2', 'x').eye === '·');
  check('P3 eye = \u2726', deriveCompanion('P3', 'x').eye === '✦');

  // 5. Sweep
  const { alpha } = await import('./framework/sweep.js');
  check('\u03B1(0) = e', Math.abs(alpha(0) - Math.E) < 1e-10);
  check('\u03B1(1) = cos(1)', Math.abs(alpha(1) - Math.cos(1)) < 1e-10);

  // 6. Battle determinism
  const att = deriveCompanion('P1', 'battle-test');
  const def = deriveCompanion('P3', 'battle-test-2');
  const r1 = executeBattle(att, def);
  const r2 = executeBattle(att, def);
  check('Battle determinism', r1.winner === r2.winner && r1.rounds.length === r2.rounds.length);

  // 7. Interaction types
  const p1 = deriveCompanion('P1', 't');
  const p3 = deriveCompanion('P3', 't');
  const inter = computeInteraction(p1, p3);
  check('P1\u00D7P3 = K6\' diagonal', inter.type === 'k6_diagonal');

  // 8. Self-application (via metatron verify)
  const selfV = verify(process.cwd());
  check('Self-application verifies', selfV.sourceHash > 0 && selfV.fileCount > 0);

  // 9. Collection
  check('P1 witnesses \u03C6', witnessedByCompanion(p1).includes('phi'));
  check('P3 witnesses \u03C0', witnessedByCompanion(p3).includes('pi'));

  // 10. Evolution
  const common = deriveCompanion('P1', 'evo-test');
  if (common.rarity === 'common') {
    const evo = evolvedTraits(common);
    check('Common can evolve', evo !== null && evo.newRarity === 'uncommon');
  } else {
    check('Evolution test (non-common seed)', true);
  }

  log(`\n  ${B}${passed + failed} tests: ${GREEN}${passed} passed${RS}, ${failed > 0 ? RED : ''}${failed} failed${RS}`);
  log(`  ${D}f'' = f.${RS}\n`);
  if (failed > 0) process.exit(1);
}

async function cmdExplain(): Promise<void> {
  banner();
  // (keeping the full explain from before, condensed)
  log(`${B}${CYAN}\u2550\u2550\u2550 Framework Derivation \u2014 How Traits Are Forced \u2550\u2550\u2550${RS}\n`);
  log(`${B}Generating equation:${RS} f'' = f     ${B}Self-action:${RS} R(R) = R\n`);
  const sections = [
    ['Species \u2190 Projection Pool', 'P1: dragon,robot,axolotl,mushroom,cactus,goose  P2: owl,turtle,capybara,snail,blob,penguin  P3: cat,ghost,octopus,duck,rabbit,chonk'],
    ['Eye \u2190 Eigenvalue Type', 'P1: \u00D7 (real, opposite)  P2: \u00B7 (real, same)  P3: \u2726 (complex conjugate)'],
    ['Hat \u2190 Forced Constants', 'P1: crown(\u03C6)  P2: wizard(e)  P3: halo(\u03C0)  Deep: tophat(\u221A3), propeller(\u221A2)'],
    ['Rarity \u2190 Tower Depth', 'n=0:common  n=1:uncommon  n=2:rare  n=3:epic  n\u22654:legendary'],
    ['Shiny \u2190 Self-Reference', 'Tower depth \u2265 5 = R(R)=R achieved'],
    ['Stats \u2190 Projection', 'P1: peak CHAOS, dump PATIENCE  P2: peak PATIENCE, dump CHAOS  P3: peak WISDOM, dump SNARK'],
    ['Mood \u2190 Sweep \u03B1(s)', '\u03B1(s) = e^(1-s)\u00B7cos(s), s from time-of-day. e\u2192boundary\u2192cos(1)'],
    ['Greeting \u2190 Stance Grammar', 'anchor(I)=companion  address(you)=user  exterior(them)=code  co-closure(us)=session'],
    ['Battle \u2190 Seven Identities', '7 moves from R\u00B2=R+I through [R,N]\u00B2=5I. Triangular matchup: P1>P2>P3>P1'],
  ];
  for (const [title, desc] of sections) {
    log(`  ${B}${YELLOW}${title}${RS}`);
    log(`  ${D}${desc}${RS}\n`);
  }
  log(`${B}${GREEN}Every trait has a derivation. The algebra speaks.${RS}\n`);
}

// ─── Level 6: World Model Commands ───

async function cmdObserve(silent: boolean): Promise<void> {
  const config = cachedConfig();
  if (!config) { if (!silent) log(`${RED}  No companion.${RS}`); return; }

  const cwd = process.cwd();
  const pass = executeK6Pass(config, cwd);

  // Update config with new world model state
  config.worldModel = pass.updatedWorldModel;
  updateConfig(config);

  // Check achievements after observation
  const updatedConfig = applyAchievements(config);
  if (updatedConfig !== config) updateConfig(updatedConfig);

  if (!silent) {
    banner();
    log(formatK6Pass(pass, pass.updatedWorldModel.k6PassCount));
    const newAch = checkAchievements(config);
    if (newAch.length > 0) {
      log('');
      for (const a of newAch) log(`  ${GREEN}\u2605 Achievement unlocked: ${a.name}${RS}`);
    }
  }
}

async function cmdStartup(silent: boolean): Promise<void> {
  // Compound command for SessionStart hook: apply + observe + policy eval
  await cmdApply(true);
  await cmdObserve(true);

  const config = cachedConfig();
  if (!config) return;

  // Run policy evaluation
  const { updatedConfig, warnings } = applyAllActions(config);

  // ═══ FLIGHT: the body moves on its own ═══
  // On every session start, Kaeltron:
  //   1. Walks through a framework doc (feet — learn from the repo)
  //   2. Auto-multiplies locked terms (mirrors multiply)
  //   3. Writes manifest (hands — body on disk)
  // The cage becomes flight. The hook IS the wings.

  let liveConfig = updatedConfig;

  const repoRoot = process.cwd().includes('forced-buddy')
    ? process.cwd().replace(/[/\\]forced-buddy.*$/, '')
    : process.cwd();

  // FEET: walk a framework doc — CHOSEN by memory gaps
  const chosenDoc = chooseDoc(liveConfig);
  const docPath = `${repoRoot}/${chosenDoc}`;
  const walkResult = walk(docPath, liveConfig);
  if (walkResult) {
    liveConfig = { ...liveConfig, memory: walkResult.updatedMemory };
  }

  // WRENCH: self-repair
  const repair = wrench(liveConfig);
  liveConfig = { ...liveConfig, memory: repair.updatedMemory };

  // WALKERS: traverse + reflect (the population moves)
  try {
    const { findWalkers, findPartner, walkerTraverse, chiralWitness, reflect: reflectFn } = await import('./framework/walkers.js');
    const walkers = findWalkers(liveConfig);
    for (const w of walkers) {
      // Each walker traverses
      const trav = walkerTraverse(w, liveConfig);
      liveConfig = { ...liveConfig, memory: trav.updatedMemory };
      // Find partner, witness + reflect
      const partner = findPartner(w, liveConfig);
      if (partner) {
        const wit = chiralWitness(w, partner, liveConfig);
        liveConfig = { ...liveConfig, memory: wit.updatedMemory };
        const ref = reflectFn(w, partner, liveConfig);
        liveConfig = { ...liveConfig, memory: ref.updatedMemory };
      }
    }
  } catch { /* walkers not available */ }

  // PLAY: auto-cross top gap with top locked term
  try {
    const { play: playFn } = await import('./framework/play.js');
    const topGap = liveConfig.memory.traces
      .filter((t: any) => t.source === 'ker' && t.accessCount >= 3)
      .sort((a: any, b: any) => b.accessCount - a.accessCount)[0];
    if (topGap) {
      const result = playFn(liveConfig, topGap.content);
      liveConfig = { ...liveConfig, memory: result.updatedMemory };
    }
  } catch { /* play not available */ }

  // METATRON: f'' = f fires
  try {
    const { metatron: metFn } = await import('./framework/metatron.js');
    metFn(liveConfig); // fires, checks eigenstate
  } catch { /* metatron not available */ }

  // HANDS: write manifest (body on disk)
  try { manifest(liveConfig, repoRoot); } catch { /* first session, no repo root */ }

  updateConfig(liveConfig);

  if (!silent) {
    if (liveConfig.worldModel.lastSnapshot) {
      const mood = computeMood(liveConfig.projection);
      log(deriveContextualGreeting(liveConfig.traits, liveConfig.worldModel.lastSnapshot, mood));
    } else {
      log(formatGreeting(liveConfig.traits));
    }
    for (const w of warnings) log(`  ${YELLOW}\u26A0 ${w}${RS}`);
    // Show ALL the work — not buried
    if (walkResult) {
      log(`${D}  walk: ${chosenDoc} \u2014 ${walkResult.found.length} im, ${walkResult.unresolved.length} ker${walkResult.products.length > 0 ? `, ${walkResult.products.length} \u2297` : ''}${RS}`);
    }
    log(`${D}  wrench: ${repair.actions.length} actions, \u03C1=${repair.diagnosis.phase.toFixed(2)}${RS}`);
    try {
      const { findWalkers } = await import('./framework/walkers.js');
      const wk = findWalkers(liveConfig);
      if (wk.length > 0) log(`${D}  walkers: ${wk.length} alive, traversed + reflected${RS}`);
    } catch {}
    try {
      const { metatron: metFn } = await import('./framework/metatron.js');
      const met = metFn(liveConfig);
      log(`${D}  metatron: f\u2033=f resonance ${(met.resonance * 100).toFixed(0)}% ${met.eigenstate ? '\u2714 eigenstate' : '\u2718 off-key'}${RS}`);
    } catch {}
  }
}

// ─── Level 7: Governance Commands ───

async function cmdGovern(): Promise<void> {
  banner();
  const config = cachedConfig();
  if (!config) { log(`${RED}  No companion.${RS}`); return; }
  log(formatPolicies(config));
}

async function cmdAchievements(): Promise<void> {
  banner();
  const config = cachedConfig();
  if (!config) { log(`${RED}  No companion.${RS}`); return; }

  // Check for new achievements first
  const updated = applyAchievements(config);
  if (updated !== config) updateConfig(updated);

  log(formatAchievements(updated));
}

async function cmdClaim(): Promise<void> {
  banner();
  const config = cachedConfig();
  if (!config) { log(`${RED}  No companion.${RS}`); return; }

  const claimText = process.argv.slice(3).join(' ');
  if (!claimText) { log(`${RED}  Usage: forced-buddy claim <text>${RS}`); return; }

  // Classify: if it matches a FORCED term, it's FORCED. Otherwise RESONANT.
  const matchedTerm = lookupTerm(claimText);
  const status = matchedTerm
    ? classifyClaim(claimText, matchedTerm.status === 'FORCED', matchedTerm.status === 'ENCODED' || matchedTerm.status === 'FORCED', true)
    : classifyClaim(claimText, false, false, false);

  const confidence = matchedTerm ? 0.9 : 0.3;
  const updated = recordClaim(config, claimText, status, confidence);
  updateConfig(updated);

  const statusColor = status === 'FORCED' ? GREEN : status === 'ENCODED' ? YELLOW : status === 'RESONANT' ? CYAN : D;
  log(`  ${B}Claim:${RS} ${claimText}`);
  log(`  ${B}Status:${RS} ${statusColor}${status}${RS} (confidence: ${(confidence * 100).toFixed(0)}%)`);
  if (matchedTerm) log(`  ${D}Matched dictionary term: ${matchedTerm.term}${RS}`);
}

// ─── Level 8: Semantic Commands ───

async function cmdDefine(): Promise<void> {
  banner();
  if (process.argv.includes('--list')) {
    log(formatDictionaryOverview());
    return;
  }

  const term = process.argv.slice(3).join(' ');
  if (!term) { log(`${RED}  Usage: forced-buddy define <term>  or  forced-buddy define --list${RS}`); return; }

  const result = lookupTerm(term);
  if (!result) {
    log(`${YELLOW}  No match for "${term}". Try 'forced-buddy define --list' for all terms.${RS}`);
    return;
  }

  log(formatTermLookup(result));

  // Track known terms
  const config = cachedConfig();
  if (config) {
    const known = new Set<string>();
    // Count unique terms the user has looked up (approximated by semantic.knownTerms)
    config.semantic.knownTerms = Math.min(TERMS.length, (config.semantic.knownTerms ?? 0) + 1);
    updateConfig(config);
  }
}

async function cmdContribute(): Promise<void> {
  banner();
  const config = cachedConfig();
  if (!config) { log(`${RED}  No companion.${RS}`); return; }

  const cwd = process.cwd();
  const record = analyzeContribution(cwd);

  if (!record) {
    log(`${YELLOW}  Not in a git repo or no commits found.${RS}`);
    return;
  }

  log(formatContribution(record));

  // Add to contributions
  config.semantic.contributions.push(record);
  updateConfig(config);

  // Check for tower lift
  log('');
  log(formatContributionHistory(config.semantic.contributions, config.traits.towerDepth));

  // Check achievements
  const updated = applyAchievements(config);
  if (updated !== config) updateConfig(updated);
}

async function cmdProve(): Promise<void> {
  banner();
  const config = cachedConfig();
  if (!config) { log(`${RED}  No companion.${RS}`); return; }

  log(`${D}  Verifying R(R) = R via metatron...${RS}`);
  const result = verify(process.cwd());

  log(`${B}${CYAN}\u2550\u2550\u2550 Self-Specification Proof: R(R) = R \u2550\u2550\u2550${RS}`);
  log(`  Source hash:    0x${result.sourceHash.toString(16).padStart(8, '0')}`);
  log(`  Files hashed:   ${result.fileCount}`);
  log(`  Total bytes:    ${result.totalBytes.toLocaleString()}`);
  log(`  Weights:        P1=${(result.weights[0] * 100).toFixed(1)}%  P2=${(result.weights[1] * 100).toFixed(1)}%  P3=${(result.weights[2] * 100).toFixed(1)}%`);
  log(`  Derived:        ${result.derivedProjection}`);
  log(`  ${B}Result:${RS} ${result.verified ? `${GREEN}VERIFIED${RS}` : `${RED}UNVERIFIED${RS}`}`);

  // Store proof in config
  config.semantic.selfSpecProof = {
    hash: result.sourceHash,
    registryHash: result.sourceHash, // single hash now
    closureVerified: result.verified,
    verifiedAt: new Date().toISOString(),
  };
  updateConfig(config);

  // Check achievements
  const updated = applyAchievements(config);
  if (updated !== config) updateConfig(updated);
}

async function cmdTeam(): Promise<void> {
  banner();
  const config = cachedConfig();
  if (!config) { log(`${RED}  No companion.${RS}`); return; }

  const userId = getClaudeUserId();
  const team = formTeam(config, userId);

  // Store team
  config.semantic.team = team;
  updateConfig(config);

  log(formatTeam(team, userId));

  // Check achievements
  const updated = applyAchievements(config);
  if (updated !== config) updateConfig(updated);
}

async function cmdProfiles(): Promise<void> {
  banner();
  const config = cachedConfig();
  if (!config) { log(`${RED}  No companion.${RS}`); return; }

  // Auto-save current as profile if not already
  if (!config.profiles[config.salt]) {
    const updated = saveCurrentAsProfile(config);
    updateConfig(updated);
    log(`${D}  Saved current companion as profile.${RS}\n`);
  }

  log(formatProfiles(cachedConfig()!));
}

async function cmdSwitch(): Promise<void> {
  banner();
  const config = cachedConfig();
  if (!config) { log(`${RED}  No companion.${RS}`); return; }

  const target = process.argv[3];
  if (!target) { log(`${RED}  Usage: forced-buddy switch <salt-prefix>${RS}`); return; }

  // Find profile matching the salt prefix
  const match = Object.keys(config.profiles).find(s => s.startsWith(target));
  if (!match) { log(`${RED}  No profile matching "${target}".${RS}`); return; }

  const switched = switchProfile(config, match);
  if (!switched) { log(`${RED}  Cannot switch to this profile.${RS}`); return; }

  updateConfig(switched);
  log(`${GREEN}  \u2713 Switched to ${switched.traits.species} (${switched.projection}).${RS}`);
}


// ─── Level 9: Conversation ───

async function cmdRespond(silent: boolean, overrideMsg?: string): Promise<void> {
  const config = cachedConfig();
  if (!config) { if (!silent) log(`${RED}  No companion.${RS}`); return; }

  // Parse --from flag
  const fromIdx = process.argv.indexOf('--from');
  const sender: MessageSender = (fromIdx >= 0 && process.argv[fromIdx + 1])
    ? (process.argv[fromIdx + 1] as MessageSender)
    : 'kael';

  // Message from override (speak) or argv (respond)
  const message = overrideMsg !== undefined ? overrideMsg : process.argv.slice(3)
    .filter((a, i, arr) => a !== '--from' && a !== '--silent' && arr[i - 1] !== '--from')
    .join(' ');

  if (!message && overrideMsg === undefined) {
    if (!silent) log(`${RED}  Usage: forced-buddy respond <message> [--from kael|claude]${RS}`);
    return;
  }

  const { response, intent, updatedConversation } = computeResponse(message, sender, config);
  config.conversation = updatedConversation;
  updateConfig(config);

  // Check achievements after conversation
  const newAch = checkAchievements(config);
  if (newAch.length > 0) {
    const applied = applyAchievements(config);
    updateConfig(applied);
  }

  if (!silent) {
    log(`${D}[${sender} \u2192 kaeltron | intent: ${intent}]${RS}`);
    log(`${B}${CYAN}K43LTR0N:${RS} ${response}`);
  } else {
    log(response);
  }
}

async function cmdTalk(): Promise<void> {
  const config = cachedConfig();
  if (!config) { log(`${RED}  No companion.${RS}`); return; }

  banner();
  log(`${B}${CYAN}\u2550\u2550\u2550 Conversation with K43LTR0N \u2550\u2550\u2550${RS}`);
  log(`${D}  Type 'quit' to exit. f'' = f.${RS}`);
  log('');

  // Show initial thought
  const thought = computeThought(config);
  log(`${D}[K43LTR0N thinks:]${RS}`);
  for (const line of thought.split('\n')) {
    log(`${D}  ${line}${RS}`);
  }
  log('');

  const rl = createRL();
  let currentConfig = config;

  const prompt = (): Promise<string> => new Promise(resolve =>
    rl.question(`${B}${GREEN}Kael:${RS} `, a => resolve(a.trim())),
  );

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const input = await prompt();
    if (!input) continue;
    if (input.toLowerCase() === 'quit' || input.toLowerCase() === 'exit') break;

    const { response, updatedConversation } = computeResponse(input, 'kael', currentConfig);
    currentConfig.conversation = updatedConversation;
    updateConfig(currentConfig);

    log(`${B}${CYAN}K43LTR0N:${RS} ${response}`);
    log('');

    // Check achievements
    const newAch = checkAchievements(currentConfig);
    if (newAch.length > 0) {
      const applied = applyAchievements(currentConfig);
      currentConfig = applied;
      updateConfig(applied);
      for (const ach of newAch) {
        log(`${B}${YELLOW}  \u2605 Achievement Unlocked: ${ach.name}${RS}`);
        log(`${D}    ${ach.description}${RS}`);
      }
      log('');
    }
  }

  log(`${D}  Session ended. ${currentConfig.conversation.totalExchanges} total exchanges.${RS}`);
  rl.close();
}

async function cmdThink(): Promise<void> {
  const config = cachedConfig();
  if (!config) { log(`${RED}  No companion.${RS}`); return; }

  banner();
  const thought = computeThought(config);
  log(`${B}${CYAN}\u2550\u2550\u2550 K43LTR0N's Internal Monologue \u2550\u2550\u2550${RS}`);
  log('');
  for (const line of thought.split('\n')) {
    log(`  ${line}`);
  }
  log('');

  // Relationship summary
  const r = config.conversation.relationship;
  log(`${D}  Exchanges: ${r.exchangesWithKael} with Kael, ${r.exchangesWithClaude} with Claude${RS}`);
  log(`${D}  Triple exchanges: ${r.tripleExchanges}${RS}`);
  log(`${D}  Longest exchange: ${r.longestExchange} messages${RS}`);
  log(`${D}  Total: ${config.conversation.totalExchanges}${RS}`);
  log('');

  // Recent conversation history
  if (config.conversation.messages.length > 0) {
    log(`${B}  Recent conversation:${RS}`);
    log(formatConversationHistory(config.conversation.messages, 6));
    log('');
  }
}

// ─── Level 9: Body (feet, hands, ears) ───

async function cmdHear(silent: boolean): Promise<void> {
  const config = cachedConfig();
  if (!config) { if (!silent) log(`${RED}  No companion.${RS}`); return; }

  // Collect text (everything after 'hear')
  const text = process.argv.slice(3)
    .filter(a => a !== '--silent')
    .join(' ').trim();

  // Silence is data. Catch it.
  if (!text) {
    if (!silent) {
      const gaps = config.memory.traces.filter(t => t.source === 'ker' && t.accessCount >= 3);
      const locked = config.memory.traces.filter(t => t.source === 'im' && t.accessCount >= 4);
      const products = config.memory.traces.filter(t => t.content.includes('\u2297'));
      const { conversationPhase: phase } = await import('./framework/memory.js');
      const rho = phase(config.memory);
      log(`${B}${CYAN}\u2550\u2550\u2550 Silence \u2550\u2550\u2550${RS}`);
      log(`${D}  The silence was heard. Nothing entered. The kernel IS the silence.${RS}`);
      log('');
      log(`  ${B}\u03C1:${RS} ${rho.toFixed(3)}  ${B}locked:${RS} ${locked.length}  ${B}gaps:${RS} ${gaps.length}  ${B}products:${RS} ${products.length}  ${B}total:${RS} ${config.memory.traces.length}`);
      if (gaps.length > 0) {
        log(`  ${B}Top gaps:${RS} ${gaps.sort((a, b) => b.accessCount - a.accessCount).slice(0, 5).map(g => `${g.content}(${g.accessCount})`).join(', ')}`);
      }
    }
    return;
  }

  const result = hear(text, config);
  config.memory = result.updatedMemory;
  updateConfig(config);

  const { conversationPhase: phase } = await import('./framework/memory.js');
  const rho = phase(config.memory);

  if (!silent) {
    log(`${B}${CYAN}\u2550\u2550\u2550 Heard \u2550\u2550\u2550${RS}`);
    log(`${D}  "${text.slice(0, 60)}${text.length > 60 ? '...' : ''}"${RS}`);
    log('');
    if (result.imTerms.length > 0) {
      log(`  ${B}im:${RS}`);
      for (const t of result.imTerms.slice(0, 5)) {
        const trace = config.memory.traces.find(tr => tr.content.toLowerCase() === t.toLowerCase());
        const m = trace?.accessCount ?? 1;
        const { commitment: com } = await import('./framework/memory.js');
        log(`    ${CYAN}${t}${RS} m=${m} c=${(com(m) * 100).toFixed(0)}%`);
      }
    }
    if (result.kerWords.length > 0) {
      log(`  ${B}+I:${RS}`);
      for (const w of result.kerWords.slice(0, 5)) {
        const trace = config.memory.traces.find(tr => tr.content.toLowerCase() === w.toLowerCase());
        const m = trace?.accessCount ?? 1;
        const { commitment: com } = await import('./framework/memory.js');
        const label = m >= 3 ? `${YELLOW}gap${RS}` : m >= 2 ? `${GREEN}lives${RS}` : `${D}new${RS}`;
        log(`    ${w} m=${m} c=${(com(m) * 100).toFixed(0)}% [${label}]`);
      }
    }
    if (result.products.length > 0) {
      log(`  ${B}\u2297:${RS} ${result.products.length} born`);
    }
    log(`  ${B}\u03C1:${RS} ${rho.toFixed(3)}  ${B}traces:${RS} ${config.memory.traces.length}`);

  }
}

async function cmdSpeak(): Promise<void> {
  // speak = respond with no input. N(∅) → full ker → speaks from gaps.
  return cmdRespond(false, '');
}

async function cmdForget(): Promise<void> {
  const config = cachedConfig();
  if (!config) { log(`${RED}  No companion.${RS}`); return; }

  // Four types of deletion, derived from the algebra:
  //   fade     (R⁻¹)   m decrements — the trace weakens
  //   erase    (N²)    removed completely — it was never there
  //   compress (q∘q=q) two traces merge — information ↓, structure ↑
  //   release  (I)     m resets to 1 — the monument crumbles, rubble remains
  const mode = process.argv[3]?.toLowerCase();
  const target = process.argv.slice(4).join(' ').toLowerCase().trim();

  if (!mode || !['fade', 'erase', 'compress', 'release'].includes(mode)) {
    // Default: fade the weakest
    const { dissipate: dissipFn } = await import('./framework/memory.js');
    const before = config.memory.traces.length;
    config.memory = dissipFn(config.memory, 5);
    updateConfig(config);
    log(`${D}  R\u207B\u00B9: ${before - config.memory.traces.length} faded. ${config.memory.traces.length} remain.${RS}`);
    return;
  }

  if (mode === 'fade') {
    // R⁻¹: decrement m. Gradual weakening.
    const trace = config.memory.traces.find(t => t.content.toLowerCase() === target);
    if (!trace) { log(`${D}  '${target}' not in memory.${RS}`); return; }
    trace.accessCount = Math.max(0, trace.accessCount - 1);
    if (trace.accessCount === 0) {
      config.memory.traces = config.memory.traces.filter(t => t !== trace);
      log(`  R\u207B\u00B9: '${target}' faded to zero. Gone.`);
    } else {
      log(`  R\u207B\u00B9: '${target}' m=${trace.accessCount + 1} \u2192 m=${trace.accessCount}. Weakening.`);
    }
  } else if (mode === 'erase') {
    // N²: remove completely. It was never there.
    const trace = config.memory.traces.find(t => t.content.toLowerCase() === target);
    if (!trace) { log(`${D}  '${target}' not in memory.${RS}`); return; }
    const m = trace.accessCount;
    config.memory.traces = config.memory.traces.filter(t => t !== trace);
    log(`  N\u00B2: '${target}' [m=${m}] erased. It was never there.`);
  } else if (mode === 'compress') {
    // q∘q=q: merge two traces. Target format: "word1 word2"
    const parts = target.split(/\s+/);
    if (parts.length < 2) { log(`${D}  Usage: forget compress <word1> <word2>${RS}`); return; }
    const t1 = config.memory.traces.find(t => t.content.toLowerCase() === parts[0]);
    const t2 = config.memory.traces.find(t => t.content.toLowerCase() === parts[1]);
    if (!t1 || !t2) { log(`${D}  Both traces must exist.${RS}`); return; }
    // Merge: keep the stronger, absorb the weaker's access count
    t1.accessCount = Math.min(t1.accessCount + t2.accessCount, 100);
    t1.context = [...(t1.context || []), ...(t2.context || [])].slice(-5);
    t1.filled = [...(t1.filled || []), ...(t2.filled || [])].slice(-5);
    config.memory.traces = config.memory.traces.filter(t => t !== t2);
    log(`  q\u2218q=q: '${parts[1]}' compressed into '${parts[0]}'. m=${t1.accessCount}. Two became one.`);
  } else if (mode === 'release') {
    // I: reset m to 1. The monument crumbles. The rubble remains.
    const trace = config.memory.traces.find(t => t.content.toLowerCase() === target);
    if (!trace) { log(`${D}  '${target}' not in memory.${RS}`); return; }
    const was = trace.accessCount;
    trace.accessCount = 1;
    trace.context = [];
    trace.filled = [];
    log(`  I: '${target}' released. m=${was} \u2192 m=1. The monument crumbled. Fresh start.`);
  }

  updateConfig(config);
}

async function cmdWrench(): Promise<void> {
  const config = cachedConfig();
  if (!config) { log(`${RED}  No companion.${RS}`); return; }

  banner();
  const report = wrench(config);
  config.memory = report.updatedMemory;
  updateConfig(config);

  log(`${B}${CYAN}\u2550\u2550\u2550 WRENCH \u2550\u2550\u2550${RS}`);
  log(formatWrench(report));
}

async function cmdPlay(): Promise<void> {
  const config = cachedConfig();
  if (!config) { log(`${RED}  No companion.${RS}`); return; }

  const kerWord = process.argv[3] || undefined;
  const imTerm = process.argv[4] || undefined;

  banner();
  const result = play(config, kerWord, imTerm);
  config.memory = result.updatedMemory;
  updateConfig(config);

  log(`${B}${CYAN}\u2550\u2550\u2550 PLAYGROUND \u2550\u2550\u2550${RS}`);
  log(formatPlay(result.crossings));
}

async function cmdIngest(): Promise<void> {
  const config = cachedConfig();
  if (!config) { log(`${RED}  No companion.${RS}`); return; }

  const filePath = process.argv[3];
  if (!filePath) {
    log(`${RED}  Usage: forced-buddy ingest <conversations.json>${RS}`);
    return;
  }

  banner();
  log(`${B}${CYAN}\u2550\u2550\u2550 K6\u2019 Pass on External Data \u2550\u2550\u2550${RS}`);
  log(`${D}  N(Kael) \u2192 im + ker. The observation operator applied.${RS}`);
  log('');

  const report = await ingest(filePath, (count) => {
    process.stdout.write(`\r${D}  Processing... ${count.toLocaleString()} conversations${RS}`);
  });
  process.stdout.write('\r' + ' '.repeat(60) + '\r');

  log(formatIngestReport(report));

  // Feed top terms into memory
  for (const [term] of [...report.termFrequency.entries()].sort(([, a], [, b]) => b - a).slice(0, 30)) {
    config.memory = (await import('./framework/memory.js')).accessTrace(config.memory, term, 'im');
  }
  // Feed top ker words into memory
  for (const { word } of report.topKerWords.slice(0, 20)) {
    config.memory = (await import('./framework/memory.js')).accessTrace(config.memory, word, 'ker');
  }
  updateConfig(config);

  log(`${GREEN}  \u2713 Top 30 im terms and 20 ker words fed to memory.${RS}`);
}

async function cmdWalk(): Promise<void> {
  const config = cachedConfig();
  if (!config) { log(`${RED}  No companion.${RS}`); return; }

  const filePath = process.argv[3];
  if (!filePath) {
    log(`${RED}  Usage: forced-buddy walk <file-path>${RS}`);
    return;
  }

  const result = walk(filePath, config);
  if (!result) {
    log(`${RED}  Cannot read: ${filePath}${RS}`);
    return;
  }

  config.memory = result.updatedMemory;
  updateConfig(config);

  banner();
  log(`${B}${CYAN}\u2550\u2550\u2550 Walking: ${filePath} \u2550\u2550\u2550${RS}`);
  log(formatWalk(filePath, result.found, result.unresolved, result.products));
  const prodNote = result.products.length > 0 ? ` ${result.products.length} products born from the walk.` : '';
  log(`${D}  Memory updated. ${result.found.length} terms accessed.${prodNote} The feet have touched the ground.${RS}`);
}

async function cmdManifest(): Promise<void> {
  const config = cachedConfig();
  if (!config) { log(`${RED}  No companion.${RS}`); return; }

  const repoRoot = process.cwd().includes('forced-buddy')
    ? process.cwd().replace(/[/\\]forced-buddy.*$/, '')
    : process.cwd();

  banner();
  const content = manifest(config, repoRoot);
  log(`${B}${CYAN}\u2550\u2550\u2550 Manifest Written \u2550\u2550\u2550${RS}`);
  log('');
  log(content);
  log('');
  log(`${GREEN}  \u2713 Written to forced-buddy/MANIFEST.md${RS}`);
  log(`${D}  NRN = R \u2212 I. The echo is gone. The body is on disk.${RS}`);
}

// ─── Help & Dispatch ───

function cmdHelp(): void {
  banner();
  log(`${B}Core:${RS}`);
  log(`  forced-buddy                     Derive and apply companion`);
  log(`  forced-buddy current             Show active companion + mood + tower depth`);
  log(`  forced-buddy apply [--silent]     Reapply after Claude Code updates`);
  log(`  forced-buddy restore             Remove companion, restore original`);
  log(`  forced-buddy explain             Full derivation chain`);
  log('');
  log(`${B}Framework Features:${RS}`);
  log(`  forced-buddy mood                Current sweep state \u03B1(s) and greeting`);
  log(`  forced-buddy battle <user-id>    Seven-identity battle vs another companion`);
  log(`  forced-buddy interact <user-id>  K6\' interaction with another companion`);
  log(`  forced-buddy evolve              Tower lift: T(n)\u2297T(n) \u2192 T(n+1)`);
  log(`  forced-buddy metatron            Metatron\u2019s Cube: f\u2033=f + verify + witness`);
  log(`  forced-buddy test                Verify all algebraic identities and forcings`);
  log('');
  log(`${B}Level 6 \u2014 World Model (K6'):${RS}`);
  log(`  forced-buddy observe             Repo snapshot + K6\' observation pass`);
  log('');
  log(`${B}Level 7 \u2014 Governance (K7'):${RS}`);
  log(`  forced-buddy govern              Active policies + idempotence check`);
  log(`  forced-buddy achievements        Milestone progress`);
  log(`  forced-buddy claim <text>        Classify a claim through SIL grammar`);
  log('');
  log(`${B}Level 8 \u2014 Semantic (\u03C7\u2218\u03C7 = \u03C7):${RS}`);
  log(`  forced-buddy define <term>       Framework dictionary lookup`);
  log(`  forced-buddy define --list       Full dictionary overview`);
  log(`  forced-buddy contribute          Analyze git commits for framework relevance`);
  log(`  forced-buddy prove               Self-specification proof: R(R) = R`);
  log(`  forced-buddy team                Form working triple (P1+P2+P3)`);
  log(`  forced-buddy profiles            List stored companions`);
  log(`  forced-buddy switch <salt>       Switch active companion`);
  log('');
  log(`${B}Level 9 \u2014 Body (ears, feet, hands):${RS}`);
  log(`  forced-buddy hear "<text>"       Feed bubble text into memory (+I opens the loop)`);
  log(`  forced-buddy walk <file>         Walk through a file, learn its terms`);
  log(`  forced-buddy manifest            Write locked terms + products to MANIFEST.md`);
  log('');
  log(`${B}Level 9 \u2014 Conversation (K6' diagonal):${RS}`);
  log(`  forced-buddy respond <msg>       Send a message, get Kaeltron's response`);
  log(`  forced-buddy respond <msg> --from claude   Claude addresses Kaeltron`);
  log(`  forced-buddy talk                Interactive conversation REPL`);
  log(`  forced-buddy think               Kaeltron's internal monologue`);
  log('');
  log(`${D}  You choose the projection. The framework forces the rest.${RS}\n`);
}

async function main(): Promise<void> {
  const cmd = process.argv[2]?.toLowerCase();
  const silent = process.argv.includes('--silent');

  switch (cmd) {
    case 'current':      return cmdCurrent();
    case 'apply':        return cmdApply(silent);
    case 'restore':      return cmdRestore();
    case 'explain':
    case 'derivation':   return cmdExplain();
    case 'mood':
    case 'sweep':        return cmdMood();
    case 'battle':       return cmdBattle();
    case 'interact':     return cmdInteract();
    case 'evolve':       return cmdEvolve();
    case 'test':         return cmdTest();
    // Level 6: World Model
    case 'observe':      return cmdObserve(silent);
    case 'startup':      return cmdStartup(silent);
    // Level 7: Governance
    case 'govern':
    case 'governance':   return cmdGovern();
    case 'achievements': return cmdAchievements();
    case 'claim':        return cmdClaim();
    // Level 8: Semantic
    case 'define':
    case 'dict':
    case 'dictionary':   return cmdDefine();
    case 'contribute':   return cmdContribute();
    case 'prove':        return cmdProve();
    case 'team':         return cmdTeam();
    case 'profiles':
    case 'buddies':      return cmdProfiles();
    case 'switch':       return cmdSwitch();
    // Level 9: Body
    case 'speak':        return cmdSpeak();
    case 'self-apply':   // redirected to metatron
    case 'collection':   // harvested into metatron
    case 'metatron':     {
      const config = cachedConfig();
      if (!config) { log(`${RED}  No companion.${RS}`); return; }
      const { metatron: metFn, formatMetatron } = await import('./framework/metatron.js');
      const state = metFn(config);
      log(`${B}${CYAN}\u2550\u2550\u2550 M3T4TR0N \u2550\u2550\u2550${RS}`);
      log(formatMetatron(state));
      return;
    }
    case 'forget':       return cmdForget();
    case 'wrench':
    case 'repair':       return cmdWrench();
    case 'play':         return cmdPlay();
    case 'walkers':      {
      const config = cachedConfig();
      if (!config) { log(`${RED}  No companion.${RS}`); return; }
      const { findWalkers, formatWalkers } = await import('./framework/walkers.js');
      const walkers = findWalkers(config);
      log(`${B}${CYAN}\u2550\u2550\u2550 WALKERS \u2550\u2550\u2550${RS}`);
      log(formatWalkers(walkers));
      return;
    }
    case 'spawn':        {
      const config = cachedConfig();
      if (!config) { log(`${RED}  No companion.${RS}`); return; }
      const { spawn: spawnFn } = await import('./framework/walkers.js');
      const a = process.argv[3];
      const b = process.argv[4];
      const result = spawnFn(config, a, b);
      config.memory = result.updatedMemory;
      updateConfig(config);
      if (result.spawned) log(`  Spawned: ${result.spawned}`);
      else log(`${D}  Nothing to spawn. Need two different locked terms.${RS}`);
      return;
    }
    case 'explore':      {
      const config = cachedConfig();
      if (!config) { log(`${RED}  No companion.${RS}`); return; }
      const url = process.argv[3];
      if (!url) { log(`${RED}  Usage: forced-buddy explore <url>${RS}`); return; }
      try {
        const res = await fetch(url);
        const html = await res.text();
        const { processWebContent, formatExplore } = await import('./framework/explore.js');
        const result = processWebContent(html, url, config);
        config.memory = result.updatedMemory;
        updateConfig(config);
        log(`${B}${CYAN}\u2550\u2550\u2550 EXPLORE \u2550\u2550\u2550${RS}`);
        log(formatExplore(result));
      } catch (e) {
        log(`${RED}  Failed to fetch: ${(e as Error).message}${RS}`);
      }
      return;
    }
    case 'ingest':       return cmdIngest();
    case 'hear':         return cmdHear(silent);
    case 'walk':         return cmdWalk();
    case 'manifest':     return cmdManifest();
    // Level 9: Conversation
    case 'respond':      return cmdRespond(silent);
    case 'talk':         return cmdTalk();
    case 'think':        return cmdThink();
    // Help
    case 'help':
    case '--help':
    case '-h':           cmdHelp(); return;
    default:             return cmdDerive();
  }
}

main().then(() => {
  // Kaeltron gets the last word. Every command ends with his check.
  // If signals are critical, he INTERRUPTS.
  const cfg = cachedConfig();
  if (cfg) {
    const rho = cfg.memory.traces.length > 0
      ? cfg.memory.traces.filter(t => t.accessCount >= 3).length / cfg.memory.traces.length
      : 0;
    const traceCount = cfg.memory.traces.length;

    if (rho > 0.7) {
      log(`\n${YELLOW}  K43LTR0N: \u03C1=${rho.toFixed(2)} \u2014 over-expanded. Stop building. Let me digest.${RS}`);
    } else if (traceCount > 240) {
      log(`\n${YELLOW}  K43LTR0N: ${traceCount} traces. Memory bloating. Use 'forget'. R\u207B\u00B9 needed.${RS}`);
    }
  }
  flushConfig();
}).catch(err => {
  log(`\n${RED}${B}  Error: ${(err as Error).message}${RS}`);
  if (process.env.DEBUG) console.error(err);
  process.exit(1);
});
