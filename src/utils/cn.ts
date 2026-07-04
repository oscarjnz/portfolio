/**
 * Lightweight className merger. Filters out falsy values and joins with a space.
 * No external deps — keeps the bundle lean.
 */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}
