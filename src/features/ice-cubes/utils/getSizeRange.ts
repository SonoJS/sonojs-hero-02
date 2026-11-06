import type { ElementType, IceSide } from "../types";

/** Pixel size range for an element; only a few cubes may be big. */
export function getSizeRange(
  elementType: ElementType,
  side: IceSide,
  allowBigSize: boolean
): [min: number, max: number] {
  const isLeft = side === "left";

  if (elementType === "cube") {
    return allowBigSize
      ? [isLeft ? 80 : 90, isLeft ? 100 : 110]
      : [isLeft ? 40 : 50, isLeft ? 70 : 80];
  }

  return [isLeft ? 45 : 50, isLeft ? 90 : 100];
}
