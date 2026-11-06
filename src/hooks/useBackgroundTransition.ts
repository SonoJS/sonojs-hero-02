"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * Cross-fades the stage colour: the first colour is applied directly, every
 * later one grows out of the centre as a circle over the current background.
 */
export function useBackgroundTransition(backgroundColor: string) {
  const currentBgRef = useRef<HTMLDivElement>(null);
  const nextBgRef = useRef<HTMLDivElement>(null);
  const currentColorRef = useRef<string | null>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const currentBg = currentBgRef.current;
    const nextBg = nextBgRef.current;
    if (!currentBg || !nextBg) return;

    if (currentColorRef.current === null) {
      currentBg.style.backgroundColor = backgroundColor;
      currentColorRef.current = backgroundColor;
      return;
    }

    if (backgroundColor === currentColorRef.current) return;

    const frame = requestAnimationFrame(() => {
      timelineRef.current?.kill();

      nextBg.style.backgroundColor = "";
      nextBg.style.background = `radial-gradient(circle, ${backgroundColor} 90%, ${backgroundColor}00 100%)`;
      nextBg.style.boxShadow = `0 0 70px 20px ${backgroundColor}`;
      nextBg.style.display = "block";

      gsap.set(nextBg, {
        clipPath: "circle(0% at center)",
        scale: 0.1,
        opacity: 1,
        zIndex: 5,
        force3D: true,
        willChange: "transform",
      });

      const timeline = gsap.timeline({
        onComplete: () => {
          currentColorRef.current = backgroundColor;
          currentBg.style.backgroundColor = backgroundColor;
          nextBg.style.display = "none";
        },
      });

      timeline.to(nextBg, {
        clipPath: "circle(150% at center)",
        scale: 10,
        duration: 2,
        ease: "power3.out",
        immediateRender: true,
      });

      timelineRef.current = timeline;
    });

    return () => cancelAnimationFrame(frame);
  }, [backgroundColor]);

  useEffect(() => () => {
    timelineRef.current?.kill();
  }, []);

  return { currentBgRef, nextBgRef };
}
