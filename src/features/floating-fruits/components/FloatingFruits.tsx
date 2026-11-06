"use client";
import { useEffect } from "react";
import { useMobile } from "@/hooks";
import type { JuiceId } from "@/types/juice";
import { fruitImageFiles, FRUIT_IMAGE_DIRECTORY } from "../constants";
import { useFruitTransition } from "../hooks";
import { getFruitConfigs } from "../utils";
import FruitLayer from "./FruitLayer";

interface FloatingFruitsProps {
  currentJuice: JuiceId;
  nextJuice: JuiceId | null;
  isTransitioning: boolean;
}

function preloadFruitImages() {
  Object.values(fruitImageFiles).forEach((file) => {
    const img = new window.Image();
    img.decoding = "async";
    img.src = `${FRUIT_IMAGE_DIRECTORY}/${file}`;
  });
}

export default function FloatingFruits({
  currentJuice,
  nextJuice,
  isTransitioning,
}: FloatingFruitsProps) {
  const isMobile = useMobile();
  const {
    ready,
    activeJuice,
    activeState,
    exitingJuice,
    showActive,
    layerKey,
  } = useFruitTransition({
    currentJuice,
    nextJuice,
    isTransitioning,
  });
  const fruitConfigs = getFruitConfigs(isMobile);

  useEffect(() => {
    preloadFruitImages();
  }, []);

  if (!ready) return null;

  return (
    <div
      className="relative w-[200px] h-[600px] pointer-events-none z-20"
      style={{
        transform: isMobile ? "scale(0.75)" : "none",
        transformOrigin: "center center",
      }}
    >
      {showActive && (
        <FruitLayer
          configs={fruitConfigs}
          juiceId={activeJuice}
          animationState={activeState}
          fromCenter={activeState === "entering"}
          isMobile={isMobile}
          layerKey={layerKey}
        />
      )}

      {exitingJuice && (
        <FruitLayer
          configs={fruitConfigs}
          juiceId={exitingJuice}
          animationState="exiting"
          fromCenter={false}
          isMobile={isMobile}
          layerKey={`exit-${exitingJuice}`}
        />
      )}
    </div>
  );
}
