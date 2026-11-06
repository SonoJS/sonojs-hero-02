/**
 * Prefixes public asset URLs with the GitHub Pages base path when set.
 * Example: `/assets/x.png` → `/juicy/assets/x.png`
 */
export function assetPath(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (!base) return normalized;
  return `${base.replace(/\/$/, "")}${normalized}`;
}
