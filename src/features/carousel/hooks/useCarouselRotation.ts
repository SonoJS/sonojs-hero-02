import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import type { JuiceId } from "@/types/juice";
import { juiceCans, WHEEL_TURN_DURATION } from "../constants";

interface UseCarouselRotationOptions {
  isReady: boolean;
  onCanChange?: (juiceId: JuiceId) => void;
}

/** Owns the wheel element, the active can and the quarter-turn animation. */
export function useCarouselRotation({
  isReady,
  onCanChange,
}: UseCarouselRotationOptions) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentJuiceId, setCurrentJuiceId] = useState<JuiceId>(
    juiceCans[0].id
  );
  const [nextJuiceId, setNextJuiceId] = useState<JuiceId | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const wheelRef = useRef<HTMLDivElement>(null);
  const onCanChangeRef = useRef(onCanChange);
  const activeIndexRef = useRef(0);
  const isAnimatingRef = useRef(false);

  useEffect(() => {
    onCanChangeRef.current = onCanChange;
  });

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    isAnimatingRef.current = isAnimating;
  }, [isAnimating]);

  useEffect(() => {
    gsap.set(wheelRef.current, { rotation: 0 });
    onCanChangeRef.current?.(juiceCans[0].id);
  }, []);

  const turn = useCallback(
    (step: 1 | -1) => {
      if (isAnimatingRef.current || !isReady) return;
      setIsAnimating(true);
      isAnimatingRef.current = true;

      const nextIndex =
        (activeIndexRef.current + step + juiceCans.length) % juiceCans.length;
      const nextId = juiceCans[nextIndex].id;

      setNextJuiceId(nextId);
      setIsTransitioning(true);
      onCanChangeRef.current?.(nextId);

      gsap.to(wheelRef.current, {
        rotation: step === -1 ? "+=90" : "-=90",
        duration: WHEEL_TURN_DURATION,
        ease: "power2.inOut",
        onComplete: () => {
          setActiveIndex(nextIndex);
          activeIndexRef.current = nextIndex;
          setCurrentJuiceId(nextId);
          setNextJuiceId(null);
          setIsAnimating(false);
          isAnimatingRef.current = false;
          // Let fruit enter/exit finish before settling the settled layer.
          window.setTimeout(() => setIsTransitioning(false), 900);
        },
      });
    },
    [isReady]
  );

  const handleNext = useCallback(() => turn(-1), [turn]);
  const handlePrev = useCallback(() => turn(1), [turn]);
  const markTransitioning = useCallback(() => setIsTransitioning(true), []);

  return {
    wheelRef,
    activeIndex,
    isAnimating,
    currentJuiceId,
    nextJuiceId,
    isTransitioning,
    markTransitioning,
    handleNext,
    handlePrev,
  };
}
