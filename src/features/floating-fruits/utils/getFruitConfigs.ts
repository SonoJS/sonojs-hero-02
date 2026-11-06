import type { FruitConfig } from "../types";

const COMMON_Z_INDEX = 20;

/** The four fruit slots around the can, scaled down on mobile. */
export function getFruitConfigs(isMobile?: boolean): FruitConfig[] {
  const sizeMultiplier = isMobile ? 0.6 : 1;
  const smallSize = 50 * 3 * 0.8 * sizeMultiplier;
  const largeSize = 90 * 3 * 0.8 * sizeMultiplier;

  return [
    {
      position: "topLeft",
      size: smallSize,
      flipX: 1,
      zIndex: COMMON_Z_INDEX,
      offsetX: isMobile ? "-20%" : "-65%",
      offsetY: isMobile ? "35%" : "30%",
      blurAmount: isMobile ? 1.5 : 2,
      rotation: "rotate(150deg)",
    },
    {
      position: "bottomLeft",
      size: largeSize,
      flipX: 1,
      zIndex: COMMON_Z_INDEX,
      offsetX: isMobile ? "-20%" : "-55%",
      offsetY: isMobile ? "65%" : "70%",
      blurAmount: isMobile ? 0.5 : 0.7,
      rotation: "rotate(165deg)",
    },
    {
      position: "topRight",
      size: largeSize,
      flipX: 1,
      zIndex: COMMON_Z_INDEX,
      offsetX: isMobile ? "90%" : "120%",
      offsetY: "30%",
      blurAmount: isMobile ? 0.7 : 1,
      rotation: "rotate(-30deg)",
    },
    {
      position: "bottomRight",
      size: smallSize,
      flipX: 1,
      zIndex: COMMON_Z_INDEX,
      offsetX: isMobile ? "100%" : "120%",
      offsetY: isMobile ? "60%" : "70%",
      blurAmount: isMobile ? 1 : 1.5,
      rotation: "rotate(-15deg)",
    },
  ];
}
