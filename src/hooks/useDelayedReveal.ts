"use client";
import { useEffect, useState } from "react";

/** Becomes true once, `delayMs` after mount. */
export function useDelayedReveal(delayMs: number): boolean {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setRevealed(true), delayMs);
    return () => clearTimeout(timer);
  }, [delayMs]);

  return revealed;
}
