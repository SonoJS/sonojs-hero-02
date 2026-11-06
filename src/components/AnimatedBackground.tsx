"use client";
import { useBackgroundTransition } from "@/hooks/useBackgroundTransition";

interface AnimatedBackgroundProps {
  backgroundColor: string;
}

export default function AnimatedBackground({
  backgroundColor,
}: AnimatedBackgroundProps) {
  const { currentBgRef, nextBgRef } = useBackgroundTransition(backgroundColor);

  return (
    <>
      <div ref={currentBgRef} className="absolute inset-0 z-[-2]" />

      <div
        ref={nextBgRef}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[-1]! w-[200px] h-[200px] rounded-full"
        style={{
          display: "none",
          transformOrigin: "center center",
          willChange: "transform, opacity",
        }}
      />
    </>
  );
}
