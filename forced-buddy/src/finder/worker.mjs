#!/usr/bin/env node
/**
 * Salt search worker — standalone, zero dependencies.
 *
 * Brute-forces salts to find one that makes Claude Code's companion
 * system produce the framework-derived traits.
 *
 * The traits are FORCED by the algebra. This worker finds the salt
 * that makes Claude Code agree with the framework's derivation.
 *
 * Args: <userId> <species> <rarity> <eye> <hat> <shiny> <peak> <dump>
 */

const RARITIES = ['common', 'uncommon', 'rare', 'epic', 'legendary'];
const RARITY_WEIGHTS = { common: 60, uncommon: 25, rare: 10, epic: 4, legendary: 1 };
const SPECIES = [
  'duck', 'goose', 'blob', 'cat', 'dragon', 'octopus',
  'owl', 'penguin', 'turtle', 'snail', 'ghost', 'axolotl',
  'capybara', 'cactus', 'robot', 'rabbit', 'mushroom', 'chonk',
];
const EYES = ['·', '✦', '×', '◉', '@', '°'];
const HATS = ['none', 'crown', 'tophat', 'propeller', 'halo', 'wizard', 'beanie', 'tinyduck'];
const STAT_NAMES = ['DEBUGGING', 'PATIENCE', 'CHAOS', 'WISDOM', 'SNARK'];

// FNV-1a hash (same as Claude Code on Node/Windows)
function fnv1a(s) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

// Detect runtime and choose hash
function hashKey(key) {
  if (typeof globalThis.Bun !== 'undefined' && typeof Bun.hash === 'function') {
    return Number(BigInt(Bun.hash(key)) & 0xffffffffn);
  }
  return fnv1a(key);
}

// Mulberry32 PRNG
function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pick(rng, arr) {
  return arr[Math.floor(rng() * arr.length)];
}

function rollRarity(rng) {
  let roll = rng() * 100;
  for (const rarity of RARITIES) {
    roll -= RARITY_WEIGHTS[rarity];
    if (roll < 0) return rarity;
  }
  return 'common';
}

const SALT_LEN = 15;
const CHARSET = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_';
const REPORT_INTERVAL = 100_000;

function randomSalt() {
  let s = '';
  for (let i = 0; i < SALT_LEN; i++) {
    s += CHARSET[(Math.random() * CHARSET.length) | 0];
  }
  return s;
}

// Parse args
const args = process.argv.slice(2);
const [userId, wantSpecies, wantRarity, wantEye, wantHat, wantShiny, wantPeak, wantDump] = args;

if (!userId || !wantSpecies || !wantRarity || !wantEye || !wantHat) {
  process.stderr.write('Usage: worker.mjs <userId> <species> <rarity> <eye> <hat> <shiny> <peak> <dump>\n');
  process.exit(1);
}

const requireShiny = wantShiny === 'true';
const requirePeak = wantPeak && wantPeak !== 'any' ? wantPeak : null;
const requireDump = wantDump && wantDump !== 'any' ? wantDump : null;

const start = Date.now();
let attempts = 0;

for (;;) {
  attempts++;
  const salt = randomSalt();
  const key = userId + salt;
  const seed = hashKey(key);
  const rng = mulberry32(seed);

  do {
    const rarity = rollRarity(rng);
    if (rarity !== wantRarity) break;

    const species = pick(rng, SPECIES);
    if (species !== wantSpecies) break;

    const eye = pick(rng, EYES);
    if (eye !== wantEye) break;

    const hat = rarity === 'common' ? 'none' : pick(rng, HATS);
    if (hat !== wantHat) break;

    const shiny = rng() < 0.01;
    if (requireShiny && !shiny) break;

    if (requirePeak || requireDump) {
      const peak = pick(rng, STAT_NAMES);
      let dump = pick(rng, STAT_NAMES);
      while (dump === peak) dump = pick(rng, STAT_NAMES);
      if (requirePeak && peak !== requirePeak) break;
      if (requireDump && dump !== requireDump) break;
    }

    // Found it. The algebra has spoken.
    process.stdout.write(JSON.stringify({
      salt,
      attempts,
      elapsed: Date.now() - start,
    }) + '\n');
    process.exit(0);
  } while (false);

  if (attempts % REPORT_INTERVAL === 0) {
    process.stderr.write(JSON.stringify({ attempts, elapsed: Date.now() - start }) + '\n');
  }
}
