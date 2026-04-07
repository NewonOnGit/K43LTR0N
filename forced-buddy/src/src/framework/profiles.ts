/**
 * MULTI-PROFILE MANAGEMENT — Level 8: Social
 *
 * Store multiple companions (one per projection face) and switch between them.
 * Adopted from any-buddy's profile system, transformed through the framework:
 * profiles are keyed by salt, each carries full ForcedTraits + optional
 * resonant overlay (user-provided personality addition).
 *
 * Cannot delete active profile (prevents bricking companion).
 * Auto-snapshots personality on switch.
 */

import type { ForcedConfig, CompanionProfile, Projection } from '../types.js';

/**
 * Create a profile from the current active companion.
 */
export function createProfile(config: ForcedConfig, name?: string): CompanionProfile {
  return {
    projection: config.projection,
    salt: config.salt,
    traits: { ...config.traits },
    name: name ?? null,
    resonantOverlay: null,
    createdAt: new Date().toISOString(),
  };
}

/**
 * Save the current companion as a profile entry.
 */
export function saveCurrentAsProfile(config: ForcedConfig, name?: string): ForcedConfig {
  const profile = createProfile(config, name);
  return {
    ...config,
    profiles: { ...config.profiles, [config.salt]: profile },
    activeProfile: config.salt,
  };
}

/**
 * Switch to a different profile by salt.
 */
export function switchProfile(config: ForcedConfig, salt: string): ForcedConfig | null {
  const profile = config.profiles[salt];
  if (!profile) return null;

  // Auto-snapshot current companion before switching
  const updated = saveCurrentAsProfile(config);

  return {
    ...updated,
    salt: profile.salt,
    projection: profile.projection,
    traits: { ...profile.traits },
    activeProfile: salt,
  };
}

/**
 * List all stored profiles.
 */
export function listProfiles(config: ForcedConfig): CompanionProfile[] {
  return Object.values(config.profiles);
}

/**
 * Delete a profile by salt. Cannot delete active profile.
 */
export function deleteProfile(config: ForcedConfig, salt: string): ForcedConfig | null {
  if (salt === config.salt || salt === config.activeProfile) return null;
  if (!config.profiles[salt]) return null;

  const { [salt]: _, ...remaining } = config.profiles;
  return { ...config, profiles: remaining };
}

/**
 * Set resonant overlay for a profile.
 */
export function setResonantOverlay(config: ForcedConfig, salt: string, overlay: string): ForcedConfig | null {
  const profile = config.profiles[salt];
  if (!profile) return null;

  return {
    ...config,
    profiles: {
      ...config.profiles,
      [salt]: { ...profile, resonantOverlay: overlay },
    },
  };
}

/**
 * Get profiles grouped by projection.
 */
export function profilesByProjection(config: ForcedConfig): Record<Projection, CompanionProfile[]> {
  const result: Record<Projection, CompanionProfile[]> = { P1: [], P2: [], P3: [] };
  for (const profile of Object.values(config.profiles)) {
    result[profile.projection].push(profile);
  }
  return result;
}

/**
 * Format profile list for display.
 */
export function formatProfiles(config: ForcedConfig): string {
  const B = '\x1b[1m';
  const D = '\x1b[2m';
  const RS = '\x1b[0m';
  const G = '\x1b[32m';
  const Y = '\x1b[33m';
  const C = '\x1b[36m';
  const M = '\x1b[35m';

  const profiles = listProfiles(config);

  if (profiles.length === 0) {
    return `${D}No profiles saved yet. Run 'forced-buddy' to create your first companion.${RS}`;
  }

  const lines = [
    `${B}${C}\u2550\u2550\u2550 Companion Profiles (${profiles.length}) \u2550\u2550\u2550${RS}`,
    '',
  ];

  for (const p of profiles) {
    const isActive = p.salt === config.activeProfile;
    const marker = isActive ? `${G}\u25CF active${RS}` : '';
    const projColor = p.projection === 'P1' ? Y : p.projection === 'P2' ? C : M;

    lines.push(`  ${projColor}${p.projection}${RS} ${B}${p.traits.species}${RS} ${D}(${p.traits.rarity}, n=${p.traits.towerDepth})${RS} ${marker}`);
    if (p.name) lines.push(`    ${D}Name: ${p.name}${RS}`);
    lines.push(`    ${D}Salt: ${p.salt.substring(0, 8)}... Created: ${p.createdAt.substring(0, 10)}${RS}`);
  }

  return lines.join('\n');
}
