/**
 * FNV-1a hash — the same hash function Claude Code uses on Windows (Node runtime).
 * For Bun-compiled binaries (Linux/macOS), wyhash is used instead.
 */
export function fnv1a(s: string): number {
  let h = 2166136261; // FNV offset basis
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619); // FNV prime
  }
  return h >>> 0;
}

/**
 * Hash a string. Uses FNV-1a for Node, Bun.hash for Bun.
 * The framework doesn't care which hash — the algebra operates on the output.
 */
export function hashString(s: string): number {
  // Detect Bun runtime
  if (typeof globalThis !== 'undefined' && 'Bun' in globalThis) {
    try {
      // @ts-expect-error Bun global
      return Number(BigInt(Bun.hash(s)) & 0xffffffffn);
    } catch {
      // fall through to FNV-1a
    }
  }
  return fnv1a(s);
}
