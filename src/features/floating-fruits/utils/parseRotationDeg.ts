/** Reads degrees from values like `rotate(150deg)` or `rotate(-30deg)`. */
export function parseRotationDeg(rotation: string | undefined): number {
  if (!rotation) return 0;
  const match = rotation.match(/-?\d+(\.\d+)?/);
  return match ? Number(match[0]) : 0;
}
