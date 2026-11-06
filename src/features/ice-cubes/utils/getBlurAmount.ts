/** Blur radius in px for a blur level: 0 none, 1 light, 2 heavy. */
export function getBlurAmount(blurLevel?: number): number {
  if (blurLevel === 1) return 1.5;
  if (blurLevel === 2) return 3;
  return 0;
}
