import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Sequences the reveal after the active can has loaded: hide the loader,
 * enable the controls, then bring in the fruits and the carousel itself.
 */
export function useCarouselLoading() {
  const [isLoading, setIsLoading] = useState(true);
  const [isActiveModelLoaded, setIsActiveModelLoaded] = useState(false);
  const [showFruits, setShowFruits] = useState(false);
  const [renderDelayComplete, setRenderDelayComplete] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const handleActiveModelLoaded = useCallback(() => {
    timers.current.push(
      setTimeout(() => {
        setIsLoading(false);
        setIsActiveModelLoaded(true);
        timers.current.push(setTimeout(() => setShowFruits(true), 100));
        timers.current.push(
          setTimeout(() => setRenderDelayComplete(true), 300)
        );
      }, 100)
    );
  }, []);

  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach(clearTimeout);
  }, []);

  return {
    isLoading,
    isActiveModelLoaded,
    showFruits,
    renderDelayComplete,
    handleActiveModelLoaded,
  };
}
