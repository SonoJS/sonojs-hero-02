"use client";
import { useEffect, useState, type RefObject } from "react";

/** Tracks whether `ref` is at least `threshold` visible in the viewport. */
export function useInView(
  ref: RefObject<HTMLElement | null>,
  threshold: number = 0.4
): boolean {
  const [isInView, setIsInView] = useState(true);

  useEffect(() => {
    const element = ref.current;
    if (!element || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold }
    );
    observer.observe(element);

    return () => observer.disconnect();
  }, [ref, threshold]);

  return isInView;
}
