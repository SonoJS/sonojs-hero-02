"use client";
import { useMobile } from "@/hooks";

interface BlurredBackgroundProps {
  color?: string;
  blurAmount?: number;
  size?: number;
}

export default function BlurredBackground({
  color = "#E5F985",
  blurAmount = 610,
  size = 640,
}: BlurredBackgroundProps) {
  const isMobile = useMobile();

  const resolvedSize = isMobile ? size * 0.55 : size;
  const resolvedBlur = isMobile ? blurAmount * 0.65 : blurAmount;

  return (
    <div
      className="absolute rounded-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      style={{
        backgroundColor: color,
        filter: `blur(${resolvedBlur}px)`,
        width: `${resolvedSize}px`,
        height: `${resolvedSize}px`,
        transition: "all 1s ease-in-out",
        zIndex: 22,
        opacity: 0.85,
      }}
    />
  );
}
