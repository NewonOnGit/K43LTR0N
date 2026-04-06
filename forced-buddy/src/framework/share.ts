/**
 * SHARE CARDS — Level 8: Social
 *
 * Generate ASCII cards for sharing. The framework version includes
 * grid address, projection, tower depth, im/ker structure.
 *
 * Cross-platform clipboard: pbcopy (macOS), clip (Windows), xclip (Linux).
 */

import { execSync } from 'child_process';
import { platform } from 'os';
import type { ForcedConfig, ForcedTraits } from '../types.js';
import { renderSprite } from './sprites.js';

/**
 * Build an ASCII share card for the companion.
 */
export function buildShareCard(traits: ForcedTraits, config: ForcedConfig): string {
  const species = traits.species.charAt(0).toUpperCase() + traits.species.slice(1);
  const stars = '\u2605'.repeat(
    traits.rarity === 'common' ? 1
    : traits.rarity === 'uncommon' ? 2
    : traits.rarity === 'rare' ? 3
    : traits.rarity === 'epic' ? 4
    : 5
  );

  // Sprite lines
  const spriteLines = renderSprite(traits.species, traits.eye, traits.hat, traits.shiny);

  // Stat bars
  const statBars: string[] = [];
  for (const [name, value] of Object.entries(traits.stats)) {
    const filled = Math.round((value as number) / 10);
    const bar = '\u2588'.repeat(filled) + '\u2591'.repeat(10 - filled);
    statBars.push(`  ${name.padEnd(10)} ${bar} ${value}`);
  }

  // Achievements count
  const achieved = config.governance.achievements.filter(a => a.achievedAt).length;
  const total = config.governance.achievements.length;

  const width = 40;
  const hr = '\u2500'.repeat(width);
  const top = '\u256D' + '\u2500'.repeat(width) + '\u256E';
  const bot = '\u2570' + '\u2500'.repeat(width) + '\u256F';

  function pad(line: string, w: number): string {
    // Strip ANSI for length calculation
    const clean = line.replace(/\x1b\[[0-9;]*m/g, '');
    const padding = Math.max(0, w - clean.length);
    return line + ' '.repeat(padding);
  }

  const lines = [
    top,
    `\u2502 ${pad(`${species}  ${stars}  ${traits.projection}`, width - 1)}\u2502`,
    `\u2502 ${pad(`${traits.rarity} | n=${traits.towerDepth} | ${traits.eye} ${traits.hat !== 'none' ? traits.hat : ''}${traits.shiny ? ' \u2728' : ''}`, width - 1)}\u2502`,
    `\u2502${' '.repeat(width)}\u2502`,
  ];

  // Sprite
  for (const sl of spriteLines) {
    lines.push(`\u2502 ${pad(sl, width - 1)}\u2502`);
  }

  lines.push(`\u2502${' '.repeat(width)}\u2502`);

  // Stats
  for (const sb of statBars) {
    lines.push(`\u2502${pad(sb, width)}\u2502`);
  }

  lines.push(`\u2502${' '.repeat(width)}\u2502`);

  // im/ker
  lines.push(`\u2502 ${pad(`im: ${traits.imDescription.substring(0, width - 6)}`, width - 1)}\u2502`);
  lines.push(`\u2502 ${pad(`ker: ${traits.kerDescription.substring(0, width - 7)}`, width - 1)}\u2502`);

  lines.push(`\u2502${' '.repeat(width)}\u2502`);
  lines.push(`\u2502 ${pad(`Achievements: ${achieved}/${total} | K6': ${config.worldModel.k6PassCount}`, width - 1)}\u2502`);
  lines.push(`\u2502 ${pad(`made with forced-buddy \u2014 f'' = f`, width - 1)}\u2502`);
  lines.push(bot);

  return lines.join('\n');
}

/**
 * Copy text to clipboard (cross-platform).
 */
export function copyToClipboard(text: string): boolean {
  try {
    const os = platform();
    if (os === 'darwin') {
      execSync('pbcopy', { input: text, timeout: 3000 });
    } else if (os === 'win32') {
      execSync('clip', { input: text, timeout: 3000 });
    } else {
      // Try xclip, then xsel
      try {
        execSync('xclip -selection clipboard', { input: text, timeout: 3000 });
      } catch {
        execSync('xsel --clipboard --input', { input: text, timeout: 3000 });
      }
    }
    return true;
  } catch {
    return false;
  }
}
