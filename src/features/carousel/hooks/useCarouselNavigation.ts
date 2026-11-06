import { useEffect, useRef } from "react";
import { NAVIGATION_THROTTLE_MS } from "../constants";

type NavigationCallback = () => void;

/** Turns wheel scrolling and arrow keys into next and previous calls. */
export function useCarouselNavigation(
  onNext: NavigationCallback,
  onPrev: NavigationCallback,
  isAnimating: boolean,
  isActive: boolean,
  enabled: boolean = true
) {
  const lastNavigationTime = useRef<number>(0);

  useEffect(() => {
    if (!enabled) return;

    const handleWheel = (e: WheelEvent) => {
      if (isAnimating || !isActive) return;

      const now = Date.now();
      if (now - lastNavigationTime.current < NAVIGATION_THROTTLE_MS) return;

      const delta =
        Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      if (delta > 0) {
        onPrev();
      } else {
        onNext();
      }

      lastNavigationTime.current = now;
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [onNext, onPrev, isAnimating, isActive, enabled]);

  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isAnimating || !isActive) return;

      const activeElement = document.activeElement;
      if (
        activeElement?.tagName === "INPUT" ||
        activeElement?.tagName === "TEXTAREA" ||
        activeElement?.hasAttribute("contenteditable")
      ) {
        return;
      }

      const now = Date.now();
      if (now - lastNavigationTime.current < NAVIGATION_THROTTLE_MS) return;

      switch (e.key) {
        case "ArrowRight":
        case "ArrowUp":
          onNext();
          break;
        case "ArrowLeft":
        case "ArrowDown":
          onPrev();
          break;
        default:
          return;
      }

      lastNavigationTime.current = now;
      e.preventDefault();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onNext, onPrev, isAnimating, isActive, enabled]);
}
