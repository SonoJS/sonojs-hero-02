import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import type { FruitAnimationState, FruitConfig } from "../types";
import { getFruitBlur, parseRotationDeg } from "../utils";

interface UseFruitAnimationOptions {
  fruitConfig: FruitConfig;
  adjustedLeft: string;
  animationState: FruitAnimationState;
  fromCenter?: boolean;
  isMobile?: boolean;
}

function percentToPx(value: string, axisSize: number): number {
  if (value.endsWith("%")) {
    return (parseFloat(value) / 100) * axisSize;
  }
  return parseFloat(value) || 0;
}

/**
 * left/top stay fixed in CSS. GSAP only moves x/y/scale/opacity.
 * Never re-assigns percentage left/top after a tween (that caused the snap).
 */
export function useFruitAnimation({
  fruitConfig,
  adjustedLeft,
  animationState,
  fromCenter,
  isMobile,
}: UseFruitAnimationOptions) {
  const fruitRef = useRef<HTMLDivElement>(null);
  const lastStateRef = useRef<FruitAnimationState | null>(null);
  const { offsetY, rotation, blurAmount, size } = fruitConfig;
  const rotationDeg = parseRotationDeg(rotation);
  const restBlur = getFruitBlur({
    baseBlur: blurAmount || 0,
    size,
    state: "visible",
    isMoving: false,
    isMobile,
  });

  useLayoutEffect(() => {
    const el = fruitRef.current;
    const parent = el?.offsetParent as HTMLElement | null;
    if (!el || !parent) return;

    // entering → visible on the same node: leave the finished tween alone.
    if (
      lastStateRef.current === "entering" &&
      animationState === "visible"
    ) {
      lastStateRef.current = "visible";
      return;
    }

    if (lastStateRef.current === animationState) return;

    const duration = isMobile ? 0.8 : 1;
    const parentW = parent.clientWidth;
    const parentH = parent.clientHeight;
    const restX = percentToPx(adjustedLeft, parentW);
    const restY = percentToPx(offsetY, parentH);
    const dx = parentW / 2 - restX;
    const dy = parentH / 2 - restY;

    gsap.killTweensOf(el);

    // Clear any previous GSAP x/y; slot comes from React style left/top.
    gsap.set(el, {
      x: 0,
      y: 0,
      xPercent: -50,
      yPercent: -50,
      rotation: rotationDeg,
      filter: restBlur,
      scale: 1,
      opacity: 1,
      // Do NOT touch left/top — React owns those.
    });

    if (animationState === "visible") {
      lastStateRef.current = "visible";
      return;
    }

    if (animationState === "entering" && fromCenter) {
      gsap.fromTo(
        el,
        { x: dx, y: dy, scale: 0.2, opacity: 1 },
        {
          x: 0,
          y: 0,
          scale: 1,
          duration,
          ease: "power2.out",
          overwrite: true,
        }
      );
      lastStateRef.current = "entering";
      return () => {
        gsap.killTweensOf(el);
      };
    }

    if (animationState === "exiting" && !fromCenter) {
      gsap.fromTo(
        el,
        { x: 0, y: 0, scale: 1, opacity: 1 },
        {
          x: dx,
          y: dy,
          scale: 0.2,
          opacity: 0,
          duration,
          ease: "power2.in",
          overwrite: true,
        }
      );
      lastStateRef.current = "exiting";
      return () => {
        gsap.killTweensOf(el);
      };
    }
  }, [
    animationState,
    fromCenter,
    adjustedLeft,
    offsetY,
    rotationDeg,
    restBlur,
    isMobile,
  ]);

  return fruitRef;
}
