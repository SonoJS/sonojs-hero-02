import type { FruitPosition } from "./FruitPosition";

export type FruitConfig = {
  position: FruitPosition;
  size: number;
  flipX: number;
  zIndex: number;
  offsetX: string;
  offsetY: string;
  blurAmount: number;
  rotation: string;
};
