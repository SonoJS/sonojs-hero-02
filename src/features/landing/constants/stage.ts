import { assetPath } from "@/lib/assetPath";

export const STAGE_CONTAINER_WIDTH = 1220;
export const WATER_WAVE_IMAGE = assetPath("/assets/images/drop.png");

export const WATER_WAVE_DESKTOP = {
  dropRadius: 20,
  perturbance: 0.03,
  resolution: 1900,
} as const;

export const WATER_WAVE_MOBILE = {
  dropRadius: 12,
  perturbance: 0.02,
  resolution: 800,
} as const;
