import { useState } from "react";
import type { SizeOption } from "../types";

/** Stable key of a size option, unique within one list. */
export const sizeKey = (option: SizeOption) => `${option.value}-${option.unit}`;

/**
 * Tracks the selected size. Starts on the option marked `selected` (or the
 * first one) and moves to whichever option is pressed.
 */
export function useSizeSelection(sizes: SizeOption[]) {
  const [selectedKey, setSelectedKey] = useState(() => {
    const initial = sizes.find((option) => option.selected) ?? sizes[0];
    return initial ? sizeKey(initial) : "";
  });

  const isSelected = (option: SizeOption) => sizeKey(option) === selectedKey;
  const select = (option: SizeOption) => setSelectedKey(sizeKey(option));

  return { isSelected, select };
}
