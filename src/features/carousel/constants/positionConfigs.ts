import type { PositionConfig } from "../types";

/** One entry per can, placed at 12, 3, 6 and 9 o'clock on the wheel. */
export const positionConfigs: PositionConfig[] = [
  {
    className: "absolute top-0 left-1/2 -translate-x-1/2",
    transformOrigin: "center center",
    rotation: [0, Math.PI / 3, 0],
  },
  {
    className: "absolute top-1/2 right-0  -translate-y-1/2 rotate-90",
    transformOrigin: "center center",
    rotation: [0, Math.PI / 3, 0],
  },
  {
    className: "absolute bottom-0 left-1/2 -translate-x-1/2 rotate-180",
    transformOrigin: "center center",
    rotation: [0, Math.PI / 3, 0],
  },
  {
    className: "absolute top-1/2 left-0 -translate-y-1/2  rotate-270",
    transformOrigin: "center center",
    rotation: [0, Math.PI / 3, 0],
  },
];
