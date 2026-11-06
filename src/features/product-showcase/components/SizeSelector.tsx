"use client";
import { copy } from "@/content/copy";
import { useMobile } from "@/hooks";
import { sizeKey, useSizeSelection } from "../hooks";
import type { SizeOption } from "../types";

interface SizeSelectorProps {
  sizes: SizeOption[];
  selectedColor?: string;
  unselectedColor?: string;
  textColor?: string;
  selectedTextColor?: string;
}

export default function SizeSelector({
  sizes,
  selectedColor = "white",
  unselectedColor = "#82AF38",
  textColor = "#82AF38",
  selectedTextColor = "white",
}: SizeSelectorProps) {
  const isMobile = useMobile();
  const { isSelected, select } = useSizeSelection(sizes);

  return (
    <div
      className={`absolute z-50 ${
        isMobile
          ? "left-1/2 -translate-x-1/2 top-[calc(2rem+56px)] flex flex-row gap-3"
          : "end-[clamp(2rem,4.8vw,9rem)] top-1/2 -translate-y-1/2 flex flex-col gap-3"
      }`}
    >
      {sizes.map((option) => {
        const selected = isSelected(option);
        return (
          <button
            key={sizeKey(option)}
            type="button"
            onClick={() => select(option)}
            className={`${
              isMobile ? "w-[54px] h-[54px]" : "w-[72px] h-[72px]"
            } border border-white/45 rounded-full flex items-center justify-center flex-col cursor-pointer transition-all duration-300 ${
              selected ? "scale-105" : "hover:opacity-80"
            }`}
            style={{
              backgroundColor: selected ? selectedColor : unselectedColor,
              color: selected ? textColor : selectedTextColor,
              outline: "none",
            }}
            aria-pressed={selected}
          >
            <span className={`font-bold ${isMobile ? "text-sm" : ""}`}>
              {option.value}
            </span>
            <span className={isMobile ? "text-[10px]" : "text-xs"}>
              {copy.units[option.unit as keyof typeof copy.units]}
            </span>
          </button>
        );
      })}
    </div>
  );
}
