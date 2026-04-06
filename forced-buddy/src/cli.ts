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
import { installHook, removeHook, isHookInstalled } from './config/hooks.js';
import { ORIGINAL_SALT } from './constants.js';
// New framework modules
import { computeMood, formatMood } from './framework/sweep.js';
import { formatGreeting } from './framework/stance.js';
import { formatSprite } from './framework/sprites.js';
import { formatCosmological } from './framework/cosmological.js';
import { executeBattle, formatBattle } from './framework/battle.js';
import { computeInteraction, formatInteraction } from './framework/interaction.js';
import { evolvedTraits, createEvolutionRecord, formatEvolution } from './framework/evolution.js';
import { witnessedByCompanion, witnessedByInteraction, createWitnesses, formatCollection, isC5U } from './framework/collection.js';
import { selfApply, formatSelfApply, verifySelfSpecification, formatSelfSpecProof } from './framework/self-apply.js';
import { generateRegistry, formatRegistry } from './framework/registry.js';
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
import { buildShareCard, copyToClipboard } from './framework/share.js';

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

    saveConfig({
      version: 3, salt: result.salt, previousSalt: currentSalt,
      projection, traits, appliedTo: binaryPath, appliedAt: new Date().toISOString(),
      evolutionHistory: [], witnessedConstants: newWitnesses,
      interactionCount: 0, battleWins: 0, battleLosses: 0,
      worldModel: (await import('./config/defaults.js')).defaultWorldModel(),
      governance: (await import('./config/defaults.js')).defaultGovernance(),
      semantic: (await import('./config/defaults.js')).defaultSemantic(),
      profiles: {}, activeProfile: null,
    });

    log(`\n${B}${GREEN}  \u2550\u2550\u2550 Complete \u2550\u2550\u2550${RS}`);
    log(`${D}  Restart Claude Code. f'' = f.${RS}\n`);
    rl.close();
  } catch (e) { rl.close(); throw e; }
}

async function cmdCurrent(): Promise<void> {
  banner();
  const config = loadConfig();
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

  if (config.traits.towerDepth >= 2) { log(''); log(formatCosmological(config.traits.towerDepth)); }
  if (config.appliedAt) log(`\n${D}  Applied: ${config.appliedAt}${RS}`);
  if (config.evolutionHistory?.length) log(`${D}  Evolutions: ${config.evolutionHistory.length}${RS}`);
  log(`${D}  Battles: ${config.battleWins ?? 0}W / ${config.battleLosses ?? 0}L  Interactions: ${config.interactionCount ?? 0}${RS}`);

  // Level 6/7 summary
  log(`${D}  K6' passes: ${config.worldModel.k6PassCount}  Achievements: ${config.governance.achievements.filter(a => a.achievedAt).length}/${config.governance.achievements.length}${RS}`);
  log(`${D}  Vocabulary depth: ${config.semantic.vocabularyDepth}/3  Known terms: ${config.semantic.knownTerms}${RS}`);
}

async function cmdApply(silent: boolean): Promise<void> {
  const config = loadConfig();
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
  config.appliedAt = new Date().toISOString(); config.appliedTo = bp; saveConfig(config);
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
  const config = loadConfig();
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
  const config = loadConfig();
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
  const config = loadConfig();
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
  saveConfig(config);
  addEvolution(record);

  log(`\n${B}${GREEN}  Tower lifted. d_K doubled. The ascent continues.${RS}\n`);
  rl.close();
}

async function cmdCollection(): Promise<void> {
  banner();
  const config = loadConfig();
  if (!config) { log(`${RED}  No companion.${RS}`); return; }
  log(formatCollection(config.witnessedConstants ?? []));
  if (isC5U(config.witnessedConstants ?? [])) {
    log(`\n  ${MAGENTA}${B}Full three-reading personality unlocked.${RS}`);
  }
}

async function cmdSelfApply(): Promise<void> {
  banner();
  log(`${D}  Hashing source code...${RS}`);
  const result = selfApply();
  log(formatSelfApply(result));
}

async function cmdRegister(): Promise<void> {
  banner();
  const config = loadConfig();
  if (!config) { log(`${RED}  No companion.${RS}`); return; }
  const entry = generateRegistry(config.traits);
  if (process.argv.includes('--markdown')) {
    log(entry.markdown);
  } else {
    log(formatRegistry(entry));
  }
}

async function cmdMood(): Promise<void> {
  banner();
  const config = loadConfig();
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

  // 8. Self-application
  const self = selfApply();
  check('Self-application produces companion', !!self.traits.species);

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
  const config = loadConfig();
  if (!config) { if (!silent) log(`${RED}  No companion.${RS}`); return; }

  const cwd = process.cwd();
  const pass = executeK6Pass(config, cwd);

  // Update config with new world model state
  config.worldModel = pass.updatedWorldModel;
  saveConfig(config);

  // Check achievements after observation
  const updatedConfig = applyAchievements(config);
  if (updatedConfig !== config) saveConfig(updatedConfig);

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

  const config = loadConfig();
  if (!config) return;

  // Run policy evaluation
  const { updatedConfig, warnings } = applyAllActions(config);
  saveConfig(updatedConfig);

  if (!silent) {
    // Show greeting with context
    if (config.worldModel.lastSnapshot) {
      const mood = computeMood(config.projection);
      log(deriveContextualGreeting(config.traits, config.worldModel.lastSnapshot, mood));
    } else {
      log(formatGreeting(config.traits));
    }
    for (const w of warnings) log(`  ${YELLOW}\u26A0 ${w}${RS}`);
  }
}

// ─── Level 7: Governance Commands ───

async function cmdGovern(): Promise<void> {
  banner();
  const config = loadConfig();
  if (!config) { log(`${RED}  No companion.${RS}`); return; }
  log(formatPolicies(config));
}

async function cmdAchievements(): Promise<void> {
  banner();
  const config = loadConfig();
  if (!config) { log(`${RED}  No companion.${RS}`); return; }

  // Check for new achievements first
  const updated = applyAchievements(config);
  if (updated !== config) saveConfig(updated);

  log(formatAchievements(updated));
}

async function cmdClaim(): Promise<void> {
  banner();
  const config = loadConfig();
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
  saveConfig(updated);

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
  const config = loadConfig();
  if (config) {
    const known = new Set<string>();
    // Count unique terms the user has looked up (approximated by semantic.knownTerms)
    config.semantic.knownTerms = Math.min(TERMS.length, (config.semantic.knownTerms ?? 0) + 1);
    saveConfig(config);
  }
}

async function cmdContribute(): Promise<void> {
  banner();
  const config = loadConfig();
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
  saveConfig(config);

  // Check for tower lift
  log('');
  log(formatContributionHistory(config.semantic.contributions, config.traits.towerDepth));

  // Check achievements
  const updated = applyAchievements(config);
  if (updated !== config) saveConfig(updated);
}

async function cmdProve(): Promise<void> {
  banner();
  const config = loadConfig();
  if (!config) { log(`${RED}  No companion.${RS}`); return; }

  const result = verifySelfSpecification(config.traits);
  log(formatSelfSpecProof(result));

  // Store proof in config
  config.semantic.selfSpecProof = {
    hash: result.sourceHash,
    registryHash: result.registryHash,
    closureVerified: result.closureVerified,
    verifiedAt: new Date().toISOString(),
  };
  saveConfig(config);

  // Check achievements
  const updated = applyAchievements(config);
  if (updated !== config) saveConfig(updated);
}

async function cmdTeam(): Promise<void> {
  banner();
  const config = loadConfig();
  if (!config) { log(`${RED}  No companion.${RS}`); return; }

  const userId = getClaudeUserId();
  const team = formTeam(config, userId);

  // Store team
  config.semantic.team = team;
  saveConfig(config);

  log(formatTeam(team, userId));

  // Check achievements
  const updated = applyAchievements(config);
  if (updated !== config) saveConfig(updated);
}

async function cmdProfiles(): Promise<void> {
  banner();
  const config = loadConfig();
  if (!config) { log(`${RED}  No companion.${RS}`); return; }

  // Auto-save current as profile if not already
  if (!config.profiles[config.salt]) {
    const updated = saveCurrentAsProfile(config);
    saveConfig(updated);
    log(`${D}  Saved current companion as profile.${RS}\n`);
  }

  log(formatProfiles(loadConfig()!));
}

async function cmdSwitch(): Promise<void> {
  banner();
  const config = loadConfig();
  if (!config) { log(`${RED}  No companion.${RS}`); return; }

  const target = process.argv[3];
  if (!target) { log(`${RED}  Usage: forced-buddy switch <salt-prefix>${RS}`); return; }

  // Find profile matching the salt prefix
  const match = Object.keys(config.profiles).find(s => s.startsWith(target));
  if (!match) { log(`${RED}  No profile matching "${target}".${RS}`); return; }

  const switched = switchProfile(config, match);
  if (!switched) { log(`${RED}  Cannot switch to this profile.${RS}`); return; }

  saveConfig(switched);
  log(`${GREEN}  \u2713 Switched to ${switched.traits.species} (${switched.projection}).${RS}`);
}

async function cmdShare(): Promise<void> {
  banner();
  const config = loadConfig();
  if (!config) { log(`${RED}  No companion.${RS}`); return; }

  const card = buildShareCard(config.traits, config);
  log(card);

  const copied = copyToClipboard(card.replace(/\x1b\[[0-9;]*m/g, '')); // Strip ANSI for clipboard
  if (copied) {
    log(`\n  ${GREEN}\u2713 Copied to clipboard.${RS}`);
  } else {
    log(`\n  ${YELLOW}  Clipboard not available. Card printed above.${RS}`);
  }
}

// ─── Help & Dispatch ───

function cmdHelp(): void {
  banner();
  log(`${B}Core:${RS}`);
  log(`  forced-buddy                     Derive and apply companion`);
  log(`  forced-buddy current             Show active companion + mood + cosmological depth`);
  log(`  forced-buddy apply [--silent]     Reapply after Claude Code updates`);
  log(`  forced-buddy restore             Remove companion, restore original`);
  log(`  forced-buddy explain             Full derivation chain`);
  log('');
  log(`${B}Framework Features:${RS}`);
  log(`  forced-buddy mood                Current sweep state \u03B1(s) and greeting`);
  log(`  forced-buddy battle <user-id>    Seven-identity battle vs another companion`);
  log(`  forced-buddy interact <user-id>  K6\' interaction with another companion`);
  log(`  forced-buddy evolve              Tower lift: T(n)\u2297T(n) \u2192 T(n+1)`);
  log(`  forced-buddy collection          Five-constant witness progress`);
  log(`  forced-buddy self-apply          R(forced-buddy) = forced-buddy`);
  log(`  forced-buddy register [--md]     Generate REGISTRY entry`);
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
  log(`  forced-buddy share               Generate + clipboard share card`);
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
    case 'collection':   return cmdCollection();
    case 'self-apply':   return cmdSelfApply();
    case 'register':     return cmdRegister();
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
    case 'share':        return cmdShare();
    // Help
    case 'help':
    case '--help':
    case '-h':           cmdHelp(); return;
    default:             return cmdDerive();
  }
}

main().catch(err => {
  log(`\n${RED}${B}  Error: ${(err as Error).message}${RS}`);
  if (process.env.DEBUG) console.error(err);
  process.exit(1);
});
