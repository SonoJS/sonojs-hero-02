"use client";
import Image from "next/image";
import { copy } from "@/content/copy";
import type { FruitAnimationState, FruitConfig } from "../types";
import { useFruitAnimation } from "../hooks";
import { calculateAdjustedPosition } from "../utils";

interface FruitElementProps {
  fruitConfig: FruitConfig;
  imagePath: string;
  animationState: FruitAnimationState;
  fromCenter?: boolean;
  isMobile?: boolean;
}

export default function FruitElement({
  fruitConfig,
  imagePath,
  animationState,
  fromCenter,
  isMobile,
}: FruitElementProps) {
  const adjustedLeft = calculateAdjustedPosition(fruitConfig.offsetX, isMobile);
  const fruitRef = useFruitAnimation({
    fruitConfig,
    adjustedLeft,
    animationState,
    fromCenter,
    isMobile,
  });
  const size = Math.round(fruitConfig.size);

  return (
    <div
      ref={fruitRef}
      className="absolute pointer-events-none select-none"
      style={{
        zIndex: fruitConfig.zIndex,
        width: size,
        height: size,
        left: adjustedLeft,
        top: fruitConfig.offsetY,
        // GSAP adds x/y/xPercent/yPercent/scale/rotation on top of this.
      }}
    >
      <Image
        src={imagePath}
        alt={copy.decor.fruit}
        width={size}
        height={size}
        sizes={`${size}px`}
        className="object-contain w-full h-full pointer-events-none"
        draggable={false}
        priority
      />
    </div>
  );
}
