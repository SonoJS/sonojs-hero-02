import { useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { juiceCans } from "../constants";

/** Starts fetching every can model so turning the wheel never waits. */
export function usePreloadJuiceModels() {
  useEffect(() => {
    juiceCans.forEach((can) => useGLTF.preload(can.model));
  }, []);
}
