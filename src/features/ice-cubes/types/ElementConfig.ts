export type ElementType = "cube" | "leaf";

export type ElementConfig = {
  size: number;
  rotation: string;
  flipX: number;
  flipY: number;
  zIndex: number;
  opacity: number;
  elementType: ElementType;
  /** Leaf artwork variant. */
  variant?: 1 | 2;
  offsetX: number;
  offsetY: string;
  animationDelay: number;
  blurLevel?: number;
};
