import { useEffect } from "react";
import type { JuiceId } from "@/types/juice";
import { useCarouselLoading } from "./useCarouselLoading";
import { useCarouselNavigation } from "./useCarouselNavigation";
import { useCarouselRotation } from "./useCarouselRotation";
import { usePreloadJuiceModels } from "./usePreloadJuiceModels";

interface UseJuiceCarouselOptions {
  onCanChange?: (juiceId: JuiceId) => void;
  enableScrollNavigation: boolean;
  isInView: boolean;
}

/** Composes loading, rotation and input handling for the juice carousel. */
export function useJuiceCarousel({
  onCanChange,
  enableScrollNavigation,
  isInView,
}: UseJuiceCarouselOptions) {
  usePreloadJuiceModels();

  const loading = useCarouselLoading();
  const rotation = useCarouselRotation({
    isReady: loading.isActiveModelLoaded,
    onCanChange,
  });

  const { isActiveModelLoaded } = loading;
  const { markTransitioning } = rotation;
  useEffect(() => {
    if (isActiveModelLoaded) markTransitioning();
  }, [isActiveModelLoaded, markTransitioning]);

  useCarouselNavigation(
    rotation.handleNext,
    rotation.handlePrev,
    rotation.isAnimating,
    isInView && isActiveModelLoaded,
    enableScrollNavigation
  );

  return { ...loading, ...rotation };
}
