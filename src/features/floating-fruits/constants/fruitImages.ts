import { assetPath } from "@/lib/assetPath";
import type { JuiceId } from "@/types/juice";

export const FRUIT_IMAGE_DIRECTORY = assetPath("/assets/images/fruit");

export const fruitImageFiles: Record<JuiceId, string> = {
  lemonGinger: "lemon.png",
  blueberryAcai: "blueberry.png",
  mangoBurst: "mango.png",
  raspberryRose: "raspberry.png",
};

export const DEFAULT_FRUIT_IMAGE = "lemon.png";
