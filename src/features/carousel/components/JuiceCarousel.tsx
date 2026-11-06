"use client";
import { useRef } from "react";
import { useInView, useMobile } from "@/hooks";
import type { JuiceId } from "@/types/juice";
import { useJuiceCarousel } from "../hooks";
import CarouselControls from "./CarouselControls";
import CarouselWheel from "./CarouselWheel";
import FruitsContainer from "./FruitsContainer";
import LoadingIndicator from "./LoadingIndicator";

interface JuiceCarouselProps {
  onCanChange?: (juiceId: JuiceId) => void;
  enableScrollNavigation?: boolean;
}

export default function JuiceCarousel({
  onCanChange,
  enableScrollNavigation = true,
}: JuiceCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useMobile();
  const isInView = useInView(containerRef);
  const carousel = useJuiceCarousel({
    onCanChange,
    enableScrollNavigation,
    isInView,
  });

  return (
    <div ref={containerRef} className="relative w-full h-full z-50">
      <LoadingIndicator isLoading={carousel.isLoading} />

      <div
        className="relative w-full h-full"
        style={{
          opacity: carousel.renderDelayComplete ? 1 : 0,
          transition: "opacity 0.3s ease",
          visibility: carousel.renderDelayComplete ? "visible" : "hidden",
        }}
      >
        <FruitsContainer
          isVisible={carousel.isActiveModelLoaded && carousel.showFruits}
          currentJuiceId={carousel.currentJuiceId}
          nextJuiceId={carousel.nextJuiceId}
          isTransitioning={carousel.isTransitioning}
        />

        <div
          className={`absolute top-0 left-1/2 -translate-x-1/2
          ${isMobile ? "translate-y-[1%]" : "translate-y-[3%]"}
          w-[300vh] h-[300vh] flex items-center justify-center
          `}
          style={{ willChange: "transform" }}
        >
          <CarouselWheel
            activeIndex={carousel.activeIndex}
            isMobile={isMobile}
            onActiveModelLoaded={carousel.handleActiveModelLoaded}
            wheelRef={carousel.wheelRef}
          />
        </div>

        <CarouselControls
          onPrev={carousel.handlePrev}
          onNext={carousel.handleNext}
          isAnimating={carousel.isAnimating}
          isActiveModelLoaded={carousel.isActiveModelLoaded}
          isMobile={isMobile}
        />
      </div>
    </div>
  );
}
