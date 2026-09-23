/**
 * AGF — Shared Utility Functions
 */

/**
 * Joins class names, filtering out falsy values.
 * Lightweight cx() without a dependency.
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Returns the path to an equipment image.
 * Falls back to the placeholder image if the view doesn't exist.
 */
export function equipmentImagePath(slug: string, view: string): string {
  return `/images/equipment/${slug}/${view}.webp`;
}

/**
 * Converts a slug to a display-friendly title.
 * e.g. "chest-press" → "Chest Press"
 */
export function slugToTitle(slug: string): string {
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Returns a clamped percentage value for hotspot positioning.
 * Ensures hotspot stays within rendered image bounds.
 */
export function clampPercent(value: number): number {
  return Math.max(0, Math.min(100, value));
}

/**
 * Formats a number with a + suffix for display (e.g. 50 → "50+").
 * Not currently used in the prototype (no numerical stats),
 * but available for the post-client-approval content pass.
 */
export function formatStatNumber(n: number): string {
  return `${n}+`;
}

/**
 * Returns the index of the previous item in a circular array.
 */
export function prevIndex(current: number, length: number): number {
  return (current - 1 + length) % length;
}

/**
 * Returns the index of the next item in a circular array.
 */
export function nextIndex(current: number, length: number): number {
  return (current + 1) % length;
}
