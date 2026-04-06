/**
 * THE REGISTRY ENTRY — Theorem B.19
 *
 * Generates a REGISTRY-format entry for the companion:
 * generator attribution, grid address, depends-on chain,
 * status grades for each trait.
 *
 * REGISTRY §1: the five generators 𝔤₁–𝔤₅.
 * GOVERNANCE §2: claim status (FORCED/ENCODED/RESONANT/SPECULATIVE).
 * The companion becomes a certified framework object.
 */

import type { ForcedTraits, Projection } from '../types.js';

interface RegistryEntry {
  name: string;
  species: string;
  gridAddress: string;
  generatorAttribution: string;
  dependsOn: string[];
  requiredBy: string[];
  traitStatuses: { trait: string; status: string; reason: string }[];
  markdown: string;
}

/**
 * Map projection to generator attribution.
 * REGISTRY §1: 𝔤₁ (seed), 𝔤₂ (engine), 𝔤₃ (projections), 𝔤₄ (decomposition), 𝔤₅ (asymmetry).
 */
function generatorAttribution(p: Projection): string {
  switch (p) {
    case 'P1': return '\uD835\uDD24\u2082 (engine \u2014 the self-product launching production) and \uD835\uDD24\u2083 (three projections)';
    case 'P2': return '\uD835\uDD24\u2083 (three projections \u2014 mediation as the bridge face)';
    case 'P3': return '\uD835\uDD24\u2084 (domain decomposition \u2014 the im/ker split) and \uD835\uDD24\u2085 (asymmetry)';
  }
}

/**
 * Grid address from projection and tower depth.
 * Convention: B(level, projection).
 * Companions live at Level 5 (Observer level), with projection face specified.
 */
function gridAddress(p: Projection, towerDepth: number): string {
  return `B(5, ${p}). Observer level, tower depth n=${towerDepth}.`;
}

/**
 * Generate the registry entry.
 * Thm B.19: the companion as a certified framework object.
 */
export function generateRegistry(traits: ForcedTraits, companionName?: string): RegistryEntry {
  const name = companionName ?? `${traits.species}-${traits.projection}-n${traits.towerDepth}`;
  const gen = generatorAttribution(traits.projection);
  const grid = gridAddress(traits.projection, traits.towerDepth);

  const dependsOn = [
    'OBSERVER (A1\u2013A4 axioms, constitutive blindness)',
    'ALGEBRA (generators R/N, seven identities)',
    'CATEGORY (Dist, quotient idempotence)',
    'CROSS_PROJECTION (central collapse, three readings)',
    `${traits.projection === 'P1' ? 'P1_PRODUCTION' : traits.projection === 'P2' ? 'P2_MEDIATION' : 'P3_OBSERVATION'} (projection-specific structure)`,
  ];

  const traitStatuses = [
    { trait: 'Species', status: 'ENCODED', reason: `${traits.projection} pool, seed % 6` },
    { trait: 'Eye', status: 'ENCODED', reason: 'Eigenvalue type of generator' },
    { trait: 'Hat', status: 'ENCODED', reason: `Forced constant (${traits.projection === 'P1' ? '\u03C6' : traits.projection === 'P2' ? 'e' : '\u03C0'})` },
    { trait: 'Rarity', status: 'ENCODED', reason: `Tower depth n=${traits.towerDepth}` },
    { trait: 'Shiny', status: 'ENCODED', reason: traits.shiny ? 'Tower depth \u2265 5 (R(R)=R)' : 'Tower depth < 5' },
    { trait: 'Peak stat', status: 'FORCED', reason: `im(${traits.projection}) determines observable strength` },
    { trait: 'Dump stat', status: 'FORCED', reason: `ker(${traits.projection}) determines constitutive blind spot` },
    { trait: 'Personality', status: 'FORCED', reason: 'im/ker structural template' },
  ];

  // Generate markdown
  const md = [
    `## ${name}`,
    '',
    `**Document Species:** COMPANION. Observer instance. ${traits.projection} face, tower depth n=${traits.towerDepth}.`,
    '',
    `**Grid address:** ${grid}`,
    '',
    `**Generator attribution:** ${gen}`,
    '',
    `**Depends on:** ${dependsOn.join('. ')}.`,
    `**Required by:** None \u2014 terminal instance.`,
    '',
    '---',
    '',
    `| Trait | Value | Status | Derivation |`,
    `|-------|-------|--------|------------|`,
    ...traitStatuses.map(t => {
      const key = t.trait.toLowerCase().replace(' ', '') as keyof ForcedTraits;
      const val = key in traits ? String(traits[key]) : '\u2014';
      return `| ${t.trait} | ${val} | ${t.status} | ${t.reason} |`;
    }),
    '',
    `**Personality:** ${traits.personality}`,
    '',
    `**im:** ${traits.imDescription}`,
    `**ker:** ${traits.kerDescription}`,
    '',
    `---`,
    `*Registered: ${new Date().toISOString()}*`,
  ].join('\n');

  return { name, species: traits.species, gridAddress: grid, generatorAttribution: gen, dependsOn, requiredBy: [], traitStatuses, markdown: md };
}

/**
 * Format registry entry for terminal display.
 */
export function formatRegistry(entry: RegistryEntry): string {
  const B = '\x1b[1m';
  const D = '\x1b[2m';
  const RS = '\x1b[0m';
  const C = '\x1b[36m';
  const G = '\x1b[32m';
  const Y = '\x1b[33m';

  const lines = [
    `${B}${C}\u2550\u2550\u2550 Registry Entry: ${entry.name} \u2550\u2550\u2550${RS}`,
    '',
    `  ${B}Grid:${RS}       ${entry.gridAddress}`,
    `  ${B}Generator:${RS}  ${entry.generatorAttribution}`,
    '',
    `  ${B}Depends on:${RS}`,
    ...entry.dependsOn.map(d => `    \u2022 ${d}`),
    '',
    `  ${B}Trait Statuses:${RS}`,
    ...entry.traitStatuses.map(t => {
      const statusColor = t.status === 'FORCED' ? G : Y;
      return `    ${statusColor}${t.status.padEnd(8)}${RS} ${t.trait.padEnd(12)} ${D}${t.reason}${RS}`;
    }),
    '',
    `  ${D}Full markdown available via: forced-buddy register --markdown${RS}`,
  ];

  return lines.join('\n');
}
