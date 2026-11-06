import type { ElementConfig } from "../types";

/** Tags the smallest elements with a blur level: 2 for the last 20%, 1 for the 20% before. */
export function processElementsForBlur(
  elements: ElementConfig[]
): ElementConfig[] {
  const sortedBySize = [...elements].sort((a, b) => b.size - a.size);
  const totalCount = elements.length;
  const noBlurThreshold = sortedBySize[Math.floor(totalCount * 0.6)]?.size || 0;
  const lightBlurThreshold =
    sortedBySize[Math.floor(totalCount * 0.8)]?.size || 0;

  return elements.map((element) => {
    let blurLevel = 0;

    if (element.size < lightBlurThreshold) {
      blurLevel = 2;
    } else if (element.size < noBlurThreshold) {
      blurLevel = 1;
    }

    return { ...element, blurLevel };
  });
}
