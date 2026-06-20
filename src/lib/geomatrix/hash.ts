/**
 * Deterministic hashing for the Scaled-Uniqueness Engine.
 *
 * The matrix must render identically across builds — no Math.random, no
 * Date-based drift — or the index churns. Every per-page variation is keyed
 * by a stable FNV-1a hash of (serviceSlug + communitySlug + salt).
 */

/** FNV-1a 32-bit hash → unsigned int. Stable, fast, dependency-free. */
export function fnv1a(str: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

/** Deterministic seed for a matrix cell, optionally salted per-field. */
export function seed(serviceSlug: string, communitySlug: string, salt = ""): number {
  return fnv1a(`${serviceSlug}::${communitySlug}::${salt}`);
}

/** Stable index into an array of `length` for a given seed. */
export function seededIndex(s: number, length: number): number {
  return length > 0 ? s % length : 0;
}

/** Stable element pick from a non-empty array. Returns undefined for []. */
export function pick<T>(arr: readonly T[], s: number): T | undefined {
  if (!arr || arr.length === 0) return undefined;
  return arr[s % arr.length];
}
