/**
 * FRAMEWORK-DERIVED ASCII SPRITES — Theorem B.12
 *
 * Sprite aesthetics are determined by projection:
 *   P1 (Production): Angular, sharp glyphs — /\<>^v
 *   P2 (Mediation):  Rounded, soft glyphs — ()~oO
 *   P3 (Observation): Symmetric, rotational — |*+=#
 *
 * Each species gets a 5-line × 14-char sprite with {E} eye placeholder.
 * Hats are drawn on line[0].
 *
 * P1_PRODUCTION §2: angular forms embody the hyperbolic eigenstructure.
 * P2_MEDIATION §2: curved forms embody exponential smoothness.
 * P3_OBSERVATION §2: symmetric forms embody rotational eigenstructure.
 */

import type { Species, Eye, Hat, Projection } from '../types.js';

// ─── Hat lines (corrected: tophat brim BELOW crown) ───
// The tophat fix: \x1b[___] has the brim (wide part) at bottom, crown at top
const HAT_LINES: Record<Exclude<Hat, 'none'>, string> = {
  crown:    '    \\^^^/     ',  // φ — three peaks = three projections
  tophat:   '     ___      ',  // √3 — brim is the base, crown rises  (FIXED)
  propeller:'     -+-      ',  // √2 — spinning axis
  halo:     '    .---.     ',  // π — the circle
  wizard:   '     /\\       ',  // e — the pointed rise of exponential
  beanie:   '    /~~\\      ',  // humble bridge
  tinyduck: '    >(.)>     ',  // self-reference: a smaller species on top
};

// Second line for tophat (the crown part, drawn on line 1 if available)
const TOPHAT_CROWN = '     [_]      ';

// ─── Species sprites grouped by projection ───

// P1 (Production): Angular, sharp — /\<>^v
const P1_SPRITES: Partial<Record<Species, string[]>> = {
  dragon: [
    '              ',
    '   /\\/>{E}<   ',
    '  <_/|\\|\\>    ',
    '   / |  \\>    ',
    '  /_/    \\>   ',
  ],
  robot: [
    '              ',
    '   [={E}=]    ',
    '   |/\\/\\|     ',
    '   |<>><|     ',
    '   /|  |\\     ',
  ],
  axolotl: [
    '              ',
    '  \\\\({E}.)//  ',
    '    />--<\\    ',
    '   / /  \\ \\   ',
    '  <_/    \\_>  ',
  ],
  mushroom: [
    '              ',
    '   /\\/\\/\\     ',
    '  /\\/\\/\\/\\    ',
    '    /{E}|      ',
    '   /    \\     ',
  ],
  cactus: [
    '              ',
    '    |{E}|     ',
    '  --|--|--    ',
    '    |  |      ',
    '   /|  |\\    ',
  ],
  goose: [
    '              ',
    '   /\\ __      ',
    '  ({E}V  >\\   ',
    '   \\  _/     ',
    '    \\/\\/      ',
  ],
};

// P2 (Mediation): Rounded, soft — ()~oO
const P2_SPRITES: Partial<Record<Species, string[]>> = {
  owl: [
    '              ',
    '   ({E} {E})  ',
    '   ( oo )     ',
    '    (  )      ',
    '   ~~  ~~     ',
  ],
  turtle: [
    '              ',
    '    _~_~_     ',
    ' o({E})ooo)   ',
    '  (~~~~~~)    ',
    '   oo  oo     ',
  ],
  capybara: [
    '              ',
    '   o({E} )o   ',
    '    (  ~~ )   ',
    '   (      )   ',
    '    oo  oo    ',
  ],
  snail: [
    '              ',
    '     ___      ',
    '   ({E} @)    ',
    '  o(~~~~)     ',
    ' ~~~~~~~~~~~  ',
  ],
  blob: [
    '              ',
    '    .~~.      ',
    '   ( {E} )    ',
    '   (  ~  )    ',
    '    `~~`      ',
  ],
  penguin: [
    '              ',
    '    (oo)      ',
    '   ({E}  )    ',
    '   ( ~~ )     ',
    '    o  o      ',
  ],
};

// P3 (Observation): Symmetric, rotational — |*+=#
const P3_SPRITES: Partial<Record<Species, string[]>> = {
  cat: [
    '              ',
    '   /|  |\\     ',
    '  ( {E}w{E} ) ',
    '   |=  =|     ',
    '    |  |      ',
  ],
  ghost: [
    '              ',
    '   .===.      ',
    '  | {E}{E} |  ',
    '  |  ==  |    ',
    '  *+*+*+*     ',
  ],
  octopus: [
    '              ',
    '   .===.      ',
    '  ({E}  {E})  ',
    '  *|*||*|*    ',
    ' *| *||* |*   ',
  ],
  duck: [
    '              ',
    '     ##       ',
    '  =({E} )=#   ',
    '   (  .=>     ',
    '    #--#      ',
  ],
  rabbit: [
    '              ',
    '   ||  ||     ',
    '  ({E}  {E})  ',
    '   | == |     ',
    '    |  |      ',
  ],
  chonk: [
    '              ',
    '   .====.     ',
    '  |{E}=={E}|  ',
    '  |======|    ',
    '  *======*    ',
  ],
};

const ALL_SPRITES: Partial<Record<Species, string[]>> = {
  ...P1_SPRITES, ...P2_SPRITES, ...P3_SPRITES,
};

/**
 * Get the projection for a species.
 */
const SPECIES_PROJECTION: Record<Species, Projection> = {
  dragon: 'P1', robot: 'P1', axolotl: 'P1', mushroom: 'P1', cactus: 'P1', goose: 'P1',
  owl: 'P2', turtle: 'P2', capybara: 'P2', snail: 'P2', blob: 'P2', penguin: 'P2',
  cat: 'P3', ghost: 'P3', octopus: 'P3', duck: 'P3', rabbit: 'P3', chonk: 'P3',
};

/**
 * Render a companion sprite.
 * Thm B.12: sprite aesthetics forced by projection.
 */
export function renderSprite(species: Species, eye: Eye, hat: Hat, shiny: boolean = false): string[] {
  const template = ALL_SPRITES[species];
  if (!template) {
    // Fallback: generic projection-based sprite
    const proj = SPECIES_PROJECTION[species] ?? 'P2';
    return renderGenericSprite(proj, eye, hat, shiny);
  }

  const lines = template.map(line => line.replace(/\{E\}/g, eye));

  // Apply hat to line[0] if hat !== 'none' and line[0] is blank-ish
  if (hat !== 'none' && lines[0].trim() === '') {
    lines[0] = HAT_LINES[hat];
    // Tophat special: also modify line[1] if it's blank
    if (hat === 'tophat' && lines[1].trim() === '') {
      lines[1] = TOPHAT_CROWN;
    }
  }

  // Shiny: add sparkle markers
  if (shiny) {
    lines[0] = lines[0].replace(/^ /, '*').replace(/ $/, '*');
    lines[4] = lines[4].replace(/^ /, '*').replace(/ $/, '*');
  }

  return lines;
}

function renderGenericSprite(proj: Projection, eye: Eye, hat: Hat, shiny: boolean): string[] {
  const e = eye;
  let lines: string[];
  switch (proj) {
    case 'P1': // Angular
      lines = ['              ', `   /\\${e}/\\      `, '  < ---- >    ', '   \\    /     ', '    \\/\\/       '];
      break;
    case 'P2': // Rounded
      lines = ['              ', `   (${e}  ${e})    `, '   (  ~~  )   ', '    (    )    ', '     ~~       '];
      break;
    case 'P3': // Symmetric
      lines = ['              ', `   |${e}==${e}|    `, '   |    |     ', '   |====|     ', '   *----*     '];
      break;
  }
  if (hat !== 'none') lines[0] = HAT_LINES[hat];
  if (shiny) {
    lines[0] = lines[0].replace(/^ /, '*');
    lines[4] = lines[4].replace(/ $/, '*');
  }
  return lines;
}

/**
 * Format sprite with ANSI colors based on projection.
 * P1 = yellow (golden ratio), P2 = blue (bridge), P3 = magenta (rotation)
 */
export function formatSprite(species: Species, eye: Eye, hat: Hat, shiny: boolean = false): string {
  const proj = SPECIES_PROJECTION[species] ?? 'P2';
  const color = proj === 'P1' ? '\x1b[33m' : proj === 'P2' ? '\x1b[34m' : '\x1b[35m';
  const lines = renderSprite(species, eye, hat, shiny);
  return lines.map(l => `${color}${l}\x1b[0m`).join('\n');
}
