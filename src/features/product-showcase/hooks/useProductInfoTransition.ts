import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import type { JuiceId } from "@/types/juice";

/**
 * Swaps the displayed juice and fades the text block in whenever `juiceId`
 * changes. Changes before `enabled` are applied as soon as it becomes true.
 */
export function useProductInfoTransition(juiceId: JuiceId, enabled: boolean) {
  const [displayedId, setDisplayedId] = useState(juiceId);
  const contentRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const previousId = useRef(juiceId);

  useEffect(() => {
    if (!enabled || previousId.current === juiceId || !contentRef.current) {
      return;
    }

    tweenRef.current?.kill();
    setDisplayedId(juiceId);

    tweenRef.current = gsap.fromTo(
      contentRef.current,
      { opacity: 0, y: 20, force3D: true },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power2.out",
        delay: 0.1,
        overwrite: true,
        clearProps: "transform",
      }
    );

    previousId.current = juiceId;
  }, [juiceId, enabled]);

  useEffect(() => () => {
    tweenRef.current?.kill();
  }, []);

  return { displayedId, contentRef };
}
