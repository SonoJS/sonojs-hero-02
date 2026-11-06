import { useEffect, useState, type RefObject } from "react";
import gsap from "gsap";
import type { ElementConfig } from "../types";
import { FLOAT_START_DELAY_MS } from "../constants";

interface UseIceFloatAnimationOptions {
  leftColumnRef: RefObject<HTMLDivElement | null>;
  rightColumnRef: RefObject<HTMLDivElement | null>;
  left: ElementConfig[];
  right: ElementConfig[];
}

/** Marks the columns as mounted, then bobs every element up and down forever. */
export function useIceFloatAnimation({
  leftColumnRef,
  rightColumnRef,
  left,
  right,
}: UseIceFloatAnimationOptions) {
  const [mounted, setMounted] = useState(false);
  const ready = left.length > 0 && right.length > 0;

  useEffect(() => {
    if (!ready) {
      setMounted(false);
      return;
    }

    setMounted(true);

    let timeout: ReturnType<typeof setTimeout> | undefined;
    const ctx = gsap.context(() => {
      timeout = setTimeout(() => {
        const timeline = gsap.timeline();

        const float = (
          column: HTMLDivElement | null,
          selector: string,
          configs: ElementConfig[],
          rotation: string
        ) => {
          column?.querySelectorAll(selector).forEach((cube, index) => {
            if (index >= configs.length) return;
            timeline.to(
              cube,
              {
                y: "+=10",
                rotation,
                duration: 2 + Math.random() * 2,
                repeat: -1,
                yoyo: true,
                ease: "power1.inOut",
                delay: configs[index].animationDelay,
              },
              index * 0.05
            );
          });
        };

        float(leftColumnRef.current, ".left-cube", left, "+=5");
        float(rightColumnRef.current, ".right-cube", right, "-=5");
      }, FLOAT_START_DELAY_MS);
    });

    return () => {
      clearTimeout(timeout);
      ctx.revert();
    };
  }, [leftColumnRef, rightColumnRef, left, right, ready]);

  return mounted;
}
