import { assetPath } from "@/lib/assetPath";
import type { ElementType } from "../types";

export function getImagePath(elementType: ElementType, variant?: 1 | 2): string {
  if (elementType === "leaf" && variant) {
    return assetPath(`/assets/images/leaf/${variant}.webp`);
  }
  return assetPath("/assets/images/ice/cube.webp");
}
