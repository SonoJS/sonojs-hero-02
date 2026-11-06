import type { ElementConfig } from "../types";

/** Invisible stand-ins rendered on the server so hydration sees the same markup. */
export function createPlaceholderElements(count: number): ElementConfig[] {
  return Array.from({ length: count }, (_, i) => ({
    size: 50,
    rotation: "none",
    flipX: 1,
    flipY: 1,
    zIndex: 10,
    opacity: 0,
    elementType: "cube" as const,
    offsetX: 0,
    offsetY: `${i * 10}%`,
    animationDelay: 0,
    blurLevel: 0,
  }));
}
