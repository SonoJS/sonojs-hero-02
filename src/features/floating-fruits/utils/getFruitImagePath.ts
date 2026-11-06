import {
  DEFAULT_FRUIT_IMAGE,
  FRUIT_IMAGE_DIRECTORY,
  fruitImageFiles,
} from "../constants";
import type { JuiceId } from "@/types/juice";

export function getFruitImagePath(juiceId: JuiceId): string {
  const filename = fruitImageFiles[juiceId] ?? DEFAULT_FRUIT_IMAGE;
  return `${FRUIT_IMAGE_DIRECTORY}/${filename}`;
}
