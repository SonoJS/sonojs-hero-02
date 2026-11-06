import type { ElementConfig, ElementType, IceSide } from "../types";
import { getSizeRange } from "./getSizeRange";

interface CreateElementOptions {
  elementType: ElementType;
  side: IceSide;
  variant?: 1 | 2;
  offsetY?: string;
  allowBigSize?: boolean;
}

/** Builds one randomised cube or leaf for the given side. */
export function createElement({
  elementType,
  side,
  variant,
  offsetY,
  allowBigSize = false,
}: CreateElementOptions): ElementConfig {
  const [minSize, maxSize] = getSizeRange(elementType, side, allowBigSize);
  const size = Math.floor(Math.random() * (maxSize - minSize)) + minSize;

  const rotationBase = elementType === "leaf" ? 30 : 20;
  const rotationFactor = side === "left" ? -rotationBase : rotationBase;
  const rotation = `rotate(${Math.floor(Math.random() * 30) + rotationFactor}deg)`;

  const opacityBase = side === "left" ? 0.6 : 0.65;
  const delayFactor = side === "left" ? 0 : 0.5;

  return {
    size,
    rotation,
    flipX: Math.random() > 0.5 ? -1 : 1,
    flipY: Math.random() > 0.5 ? -1 : 1,
    zIndex: Math.floor(size / 10) + 5,
    opacity: Math.random() * 0.3 + opacityBase,
    elementType,
    variant,
    offsetX: Math.random() * 30,
    offsetY: offsetY || "0%",
    animationDelay: Math.random() * 2 + delayFactor,
  };
}
