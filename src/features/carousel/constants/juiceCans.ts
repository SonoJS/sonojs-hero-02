import { assetPath } from "@/lib/assetPath";
import type { JuiceCan } from "../types";

export const juiceCans: JuiceCan[] = [
  { id: "lemonGinger", model: assetPath("/assets/3d/can/lemon.glb") },
  { id: "blueberryAcai", model: assetPath("/assets/3d/can/blueberry.glb") },
  { id: "mangoBurst", model: assetPath("/assets/3d/can/mango.glb") },
  { id: "raspberryRose", model: assetPath("/assets/3d/can/raspberry.glb") },
];
