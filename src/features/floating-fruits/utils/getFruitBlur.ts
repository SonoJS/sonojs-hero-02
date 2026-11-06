import type { FruitAnimationState } from "../types";

interface FruitBlurOptions {
  baseBlur: number;
  size: number;
  state: FruitAnimationState;
  isMoving: boolean;
  isMobile?: boolean;
}

/** CSS blur filter for a fruit: heavier while it travels, and on large fruits at rest. */
export function getFruitBlur({
  baseBlur,
  size,
  state,
  isMoving,
  isMobile,
}: FruitBlurOptions): string {
  const mobileMultiplier = isMobile ? 0.7 : 1;

  if (state === "entering" || state === "exiting") {
    return isMoving
      ? `blur(${baseBlur * 3 * mobileMultiplier}px)`
      : `blur(${baseBlur * mobileMultiplier}px)`;
  }

  const sizeMultiplier = size > 100 ? 1.5 : 1;
  return `blur(${baseBlur * sizeMultiplier * mobileMultiplier}px)`;
}
