"use client";
import type { RefObject } from "react";
import { useMobile } from "@/hooks";
import type { ElementConfig, IceSide } from "../types";
import IceElement from "./IceElement";

interface IceColumnProps {
  side: IceSide;
  elements: ElementConfig[];
  containerWidth: number;
  mounted: boolean;
  columnRef: RefObject<HTMLDivElement | null>;
}

const SIDE_CLASSES: Record<IceSide, string> = {
  left: "left-0 -translate-x-[50%]",
  right: "right-0 translate-x-[50%]",
};

export default function IceColumn({
  side,
  elements,
  containerWidth,
  mounted,
  columnRef,
}: IceColumnProps) {
  const isMobile = useMobile();

  return (
    <div
      ref={columnRef}
      dir="ltr"
      className={`absolute ${SIDE_CLASSES[side]} top-0 h-full z-10 ${
        isMobile ? "hidden" : ""
      } ${mounted ? "opacity-100" : "opacity-0"}`}
      style={{
        width: `calc((100% - ${containerWidth}px) / 2)`,
        transition: "opacity 0.01s ease-in",
      }}
    >
      {elements.map((element, index) => (
        <IceElement
          key={`${side}-${index}`}
          element={element}
          side={side}
          mounted={mounted}
        />
      ))}
    </div>
  );
}
