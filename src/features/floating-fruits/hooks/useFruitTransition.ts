import { useEffect, useState } from "react";
import type { JuiceId } from "@/types/juice";
import { ENTER_DELAY_MS } from "../constants";

interface UseFruitTransitionOptions {
  currentJuice: JuiceId;
  nextJuice: JuiceId | null;
  isTransitioning: boolean;
}

export function useFruitTransition({
  currentJuice,
  nextJuice,
  isTransitioning,
}: UseFruitTransitionOptions) {
  const [ready, setReady] = useState(false);
  const [activeJuice, setActiveJuice] = useState<JuiceId>(currentJuice);
  const [activeState, setActiveState] = useState<"visible" | "entering">(
    "visible"
  );
  const [exitingJuice, setExitingJuice] = useState<JuiceId | null>(null);
  const [showActive, setShowActive] = useState(true);

  useEffect(() => {
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;

    if (nextJuice && isTransitioning && nextJuice !== activeJuice) {
      // Old fruits exit; hide active until the new set is ready to enter.
      setExitingJuice(activeJuice);
      setShowActive(false);

      const timer = setTimeout(() => {
        setActiveJuice(nextJuice);
        setActiveState("entering");
        setShowActive(true);
      }, ENTER_DELAY_MS);

      return () => clearTimeout(timer);
    }

    if (!nextJuice) {
      setExitingJuice(null);
      // Same DOM nodes — only mark settled; animation hook ignores this swap.
      setActiveState("visible");
      setShowActive(true);
    }
  }, [nextJuice, isTransitioning, ready, activeJuice]);

  return {
    ready,
    activeJuice,
    activeState,
    exitingJuice,
    showActive,
    layerKey: `active-${activeJuice}`,
  };
}
