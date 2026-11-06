"use client";
import { useState, useEffect } from "react";

/** True while the viewport is at most `breakpoint` pixels wide. */
export function useMobile(breakpoint: number = 600): boolean {
  // Always start false so server HTML matches the first client render.
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= breakpoint);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [breakpoint]);

  return isMobile;
}
