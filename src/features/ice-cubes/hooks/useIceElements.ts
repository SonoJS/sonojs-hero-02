import { useEffect, useState } from "react";
import type { ElementConfig } from "../types";
import {
  generateColumnElements,
  processElementsForBlur,
} from "../utils";

type IceColumns = {
  left: ElementConfig[];
  right: ElementConfig[];
};

/**
 * Builds ice/leaf layouts only on the client after mount.
 * Random sizes/positions must not run during SSR or hydration mismatches.
 */
export function useIceElements(cubeCount: number, leafCount: number) {
  const [elements, setElements] = useState<IceColumns | null>(null);

  useEffect(() => {
    setElements({
      left: processElementsForBlur(
        generateColumnElements("left", cubeCount, leafCount)
      ),
      right: processElementsForBlur(
        generateColumnElements("right", cubeCount, leafCount)
      ),
    });
  }, [cubeCount, leafCount]);

  return elements;
}
