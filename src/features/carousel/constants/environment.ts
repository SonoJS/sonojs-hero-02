import { assetPath } from "@/lib/assetPath";

/**
 * The image-based lighting on the cans: Poly Haven's "Forest Slope" HDRI at
 * 1k (CC0), the file drei's `preset="forest"` would fetch from a third-party
 * host at runtime. Served from public/ so the page needs no outside request.
 */
export const ENVIRONMENT_MAP = assetPath("/assets/hdri/forest_slope_1k.hdr");
