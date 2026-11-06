import type { ElementConfig, IceSide } from "../types";
import { createElement } from "./createElement";
import { getEvenPositions } from "./getEvenPositions";

/** Cubes (largest first, two of them big) followed by alternating leaf variants. */
export function generateColumnElements(
  side: IceSide,
  cubeCount: number,
  leafCount: number
): ElementConfig[] {
  const cubePositions = getEvenPositions(cubeCount);
  const leafPositions = getEvenPositions(leafCount);

  const firstBigCubeIndex = Math.floor(cubeCount * 0.2);
  const secondBigCubeIndex = Math.floor(cubeCount * 0.8);

  const cubes = cubePositions
    .map((offsetY, i) =>
      createElement({
        elementType: "cube",
        side,
        offsetY,
        allowBigSize:
          (i === firstBigCubeIndex || i === secondBigCubeIndex) &&
          cubeCount >= 4,
      })
    )
    .sort((a, b) => b.size - a.size);

  const leaves = leafPositions.map((offsetY, i) =>
    createElement({
      elementType: "leaf",
      side,
      variant: ((i % 2) + 1) as 1 | 2,
      offsetY,
    })
  );

  return [...cubes, ...leaves];
}
