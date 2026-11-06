"use client";
import Image from "next/image";
import { copy } from "@/content/copy";
import type { ElementConfig, IceSide } from "../types";
import { getBlurAmount, getImagePath } from "../utils";

interface IceElementProps {
  element: ElementConfig;
  side: IceSide;
  mounted: boolean;
}

export default function IceElement({ element, side, mounted }: IceElementProps) {
  const blurAmount = getBlurAmount(element.blurLevel);
  const size = Math.round(element.size);

  return (
    <div
      className={`absolute ${side}-cube`}
      style={{
        [side]: `${element.offsetX}%`,
        top: element.offsetY,
        transform: `${element.rotation} scaleX(${element.flipX || 1}) scaleY(${
          element.flipY || 1
        })`,
        zIndex: element.zIndex,
        opacity: mounted ? element.opacity : 0,
        width: size,
        height: size,
        filter: blurAmount > 0 ? `blur(${blurAmount}px)` : "none",
        transition: "opacity 0.45s ease",
      }}
    >
      <Image
        src={getImagePath(element.elementType, element.variant)}
        alt={
          element.elementType === "cube" ? copy.decor.iceCube : copy.decor.leaf
        }
        width={size}
        height={size}
        sizes={`${size}px`}
        className="object-contain w-full h-full"
        draggable={false}
      />
    </div>
  );
}
