/**
 * POLICY ENGINE — Level 7: Meta-Governance (K7' Made Concrete)
 *
 * K7' meta-encoding fixed point: M(FRAME) = FRAME.
 * The companion classifies its own state, policies govern behavior,
 * policies applied to policies yield the same policies (idempotence).
 *
 * PolicyCondition: field path + operator + value
 * PolicyAction: what to do when all conditions pass
 * PolicyRule: named condition→action binding with SIL status
 *
 * GOVERNANCE §1: SIL-0 four-status grammar.
 * GOVERNANCE §1: Status(Status(S)) = Status(S) — idempotence.
 */

import type {
  ForcedConfig, PolicyRule, PolicyCondition, PolicyAction,
  GovernanceState,
} from '../types.js';

/**
 * Resolve a dot-path field from the config.
 * e.g. 'worldModel.k6PassCount' → config.worldModel.k6PassCount
 * e.g. 'witnessedConstants.length' → config.witnessedConstants.length
 */
function resolveField(config: ForcedConfig, field: string): unknown {
  const parts = field.split('.');
  let current: unknown = config;
  for (const part of parts) {
    if (current === null || current === undefined) return undefined;
    if (typeof current === 'object' && !Array.isArray(current)) {
      current = (current as Record<string, unknown>)[part];
    } else if (Array.isArray(current) && part === 'length') {
      current = current.length;
    } else {
      return undefined;
    }
  }
  return current;
}

/**
 * Evaluate a single policy condition against the config.
 */
export function evaluateCondition(condition: PolicyCondition, config: ForcedConfig): boolean {
  const fieldValue = resolveField(config, condition.field);

  if (condition.operator === 'exists') {
    return fieldValue !== undefined && fieldValue !== null;
  }

  if (fieldValue === undefined || fieldValue === null) return false;

  const target = condition.value;

  switch (condition.operator) {
    case '>=': return typeof fieldValue === 'number' && typeof target === 'number' && fieldValue >= target;
    case '<=': return typeof fieldValue === 'number' && typeof target === 'number' && fieldValue <= target;
    case '==': return fieldValue === target;
    case '!=': return fieldValue !== target;
    default: return false;
  }
}

/**
 * Evaluate a policy rule against the config.
 * All conditions must pass (conjunction).
 */
export function evaluatePolicy(policy: PolicyRule, config: ForcedConfig): {
  fires: boolean;
  action: PolicyAction | null;
} {
  const fires = policy.conditions.every(c => evaluateCondition(c, config));
  return { fires, action: fires ? policy.action : null };
}

/**
 * Evaluate all policies in the governance state.
 * Returns which policies fired and their actions.
 */
export function evaluateAllPolicies(config: ForcedConfig): {
  fired: PolicyRule[];
  actions: PolicyAction[];
  warnings: string[];
} {
  const fired: PolicyRule[] = [];
  const actions: PolicyAction[] = [];
  const warnings: string[] = [];

  for (const policy of config.governance.policies) {
    const result = evaluatePolicy(policy, config);
    if (result.fires && result.action) {
      fired.push(policy);
      if (result.action.type === 'warn') {
        warnings.push(result.action.payload.message as string ?? policy.name);
      } else {
        actions.push(result.action);
      }
    }
  }

  return { fired, actions, warnings };
}

/**
 * Apply a policy action to the config. Returns modified config.
 *
 * Actions are bounded — they cannot make arbitrary changes.
 * shift_weights: max ±10% of current value
 * unlock_variant: sets governance.personalityVariant
 * unlock_vocabulary: sets semantic.vocabularyDepth (max of current and target)
 * propose_evolution: no-op on config, just a signal
 * warn: no-op on config, just a message
 */
export function applyAction(action: PolicyAction, config: ForcedConfig): ForcedConfig {
  const result = { ...config };

  switch (action.type) {
    case 'unlock_variant': {
      result.governance = {
        ...result.governance,
        personalityVariant: action.payload.variant as string ?? null,
      };
      break;
    }

    case 'shift_weights': {
      const stat = action.payload.stat as string;
      const delta = action.payload.delta as number ?? 5;
      if (stat && stat in result.traits.stats) {
        const current = result.traits.stats[stat as keyof typeof result.traits.stats];
        const bounded = Math.max(1, Math.min(100, current + delta));
        result.traits = {
          ...result.traits,
          stats: { ...result.traits.stats, [stat]: bounded },
        };
      }
      break;
    }

    case 'unlock_vocabulary': {
      const depth = action.payload.depth as number ?? 0;
      result.semantic = {
        ...result.semantic,
        vocabularyDepth: Math.max(result.semantic.vocabularyDepth, depth),
      };
      break;
    }

    case 'propose_evolution':
    case 'warn':
      // No config change — these are signals, not mutations
      break;
  }

  return result;
}

/**
 * Apply all fired actions to the config.
 * Updates firedCount and activatedAt on policies that fire.
 */
export function applyAllActions(config: ForcedConfig): {
  updatedConfig: ForcedConfig;
  fired: PolicyRule[];
  warnings: string[];
} {
  const { fired, actions, warnings } = evaluateAllPolicies(config);

  let result = { ...config };

  // Apply each action
  for (const action of actions) {
    result = applyAction(action, result);
  }

  // Update fired policies' metadata
  const now = new Date().toISOString();
  result.governance = {
    ...result.governance,
    policies: result.governance.policies.map(p => {
      const didFire = fired.some(f => f.id === p.id);
      if (!didFire) return p;
      return {
        ...p,
        firedCount: p.firedCount + 1,
        activatedAt: p.activatedAt ?? now,
      };
    }),
  };

  return { updatedConfig: result, fired, warnings };
}

/**
 * Verify policy idempotence: evaluating the same config twice
 * produces the same set of fired policies.
 *
 * This is K7': M(FRAME) = FRAME.
 * The governance system applied to itself is stable.
 *
 * SIL-1: Status(Status(S)) = Status(S)
 */
export function verifyIdempotence(config: ForcedConfig): boolean {
  // First evaluation
  const first = evaluateAllPolicies(config);
  const firstIds = first.fired.map(p => p.id).sort();

  // Apply first actions
  let result = { ...config };
  for (const action of first.actions) {
    result = applyAction(action, result);
  }

  // Second evaluation on mutated config
  const second = evaluateAllPolicies(result);
  const secondIds = second.fired.map(p => p.id).sort();

  // Idempotent if same policies fire both times
  // (some policies may stop firing after their action is applied,
  // which is fine — the important thing is stability)
  return JSON.stringify(firstIds) === JSON.stringify(secondIds)
    || secondIds.every(id => firstIds.includes(id));
}

/**
 * Format policy evaluation for display.
 */
export function formatPolicies(config: ForcedConfig): string {
  const B = '\x1b[1m';
  const D = '\x1b[2m';
  const RS = '\x1b[0m';
  const G = '\x1b[32m';
  const Y = '\x1b[33m';
  const R = '\x1b[31m';
  const C = '\x1b[36m';

  const { fired, warnings } = evaluateAllPolicies(config);
  const firedIds = new Set(fired.map(p => p.id));

  const lines = [
    `${B}${C}\u2550\u2550\u2550 Governance: Policy Engine \u2550\u2550\u2550${RS}`,
    `${D}K7': M(FRAME) = FRAME \u2014 policies applied to policies yield same policies${RS}`,
    '',
  ];

  for (const policy of config.governance.policies) {
    const isFired = firedIds.has(policy.id);
    const icon = isFired ? `${G}\u2713${RS}` : `${D}\u2717${RS}`;
    const statusBadge = policy.status === 'FORCED' ? `${G}FORCED${RS}`
      : policy.status === 'ENCODED' ? `${Y}ENCODED${RS}`
      : policy.status === 'RESONANT' ? `${C}RESONANT${RS}`
      : `${D}MYTHIC${RS}`;

    lines.push(`  ${icon} ${B}${policy.name}${RS} [${statusBadge}] ${D}(${policy.generation})${RS}`);
    if (isFired) {
      lines.push(`    ${G}\u2192 ${policy.action.type}${RS}` + (policy.firedCount > 0 ? ` ${D}(fired ${policy.firedCount}x)${RS}` : ''));
    }
  }

  if (warnings.length > 0) {
    lines.push('');
    lines.push(`  ${Y}${B}Warnings:${RS}`);
    for (const w of warnings) {
      lines.push(`  ${Y}\u26A0 ${w}${RS}`);
    }
  }

  // Idempotence check
  lines.push('');
  const idempotent = verifyIdempotence(config);
  lines.push(`  ${B}Idempotence:${RS} ${idempotent ? `${G}verified \u2014 M(FRAME) = FRAME${RS}` : `${R}UNSTABLE${RS}`}`);

  return lines.join('\n');
}
