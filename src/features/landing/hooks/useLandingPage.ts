import { useCallback, useMemo, useState } from "react";
import {
  DEFAULT_JUICE_ID,
  juiceThemes,
} from "@/features/product-showcase";
import {
  DESKTOP_CUBE_COUNT,
  DESKTOP_LEAF_COUNT,
  MOBILE_CUBE_COUNT,
  MOBILE_LEAF_COUNT,
} from "@/features/ice-cubes";
import { useMobile } from "@/hooks";
import type { JuiceId } from "@/types/juice";
import { STAGE_CONTAINER_WIDTH } from "../constants";
import { useBodyBackground } from "./useBodyBackground";

/** State for the landing page: the active juice, its theme and the responsive props. */
export function useLandingPage() {
  const [juiceId, setJuiceId] = useState<JuiceId>(DEFAULT_JUICE_ID);
  const isMobile = useMobile();
  const theme = juiceThemes[juiceId];

  useBodyBackground(theme.mainBgColor);

  const handleCanChange = useCallback((id: JuiceId) => setJuiceId(id), []);

  const iceCubesProps = useMemo(
    () => ({
      containerWidth: STAGE_CONTAINER_WIDTH,
      cubeCount: isMobile ? MOBILE_CUBE_COUNT : DESKTOP_CUBE_COUNT,
      leafCount: isMobile ? MOBILE_LEAF_COUNT : DESKTOP_LEAF_COUNT,
    }),
    [isMobile]
  );

  return {
    juiceId,
    theme,
    isMobile,
    iceCubesProps,
    handleCanChange,
  };
}
