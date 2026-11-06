"use client";
import { copy } from "@/content/copy";
import CarouselArrowButton from "./CarouselArrowButton";

interface CarouselControlsProps {
  onPrev: () => void;
  onNext: () => void;
  isAnimating: boolean;
  isActiveModelLoaded: boolean;
  isMobile: boolean;
}

export default function CarouselControls({
  onPrev,
  onNext,
  isAnimating,
  isActiveModelLoaded,
  isMobile,
}: CarouselControlsProps) {
  const disabled = isAnimating || !isActiveModelLoaded;

  return (
    <div
      className={`absolute flex gap-8 z-50 ${
        isMobile ? "bottom-6" : "bottom-10"
      } left-1/2 -translate-x-1/2 transition-opacity ${
        isActiveModelLoaded ? "opacity-100" : "opacity-0"
      }`}
    >
      <CarouselArrowButton
        direction="prev"
        label={copy.carousel.previous}
        onClick={onPrev}
        disabled={disabled}
        isMobile={isMobile}
      />
      <CarouselArrowButton
        direction="next"
        label={copy.carousel.next}
        onClick={onNext}
        disabled={disabled}
        isMobile={isMobile}
      />
    </div>
  );
}
