import { useEffect, useRef, type RefObject } from "react";
import { useFrame } from "@react-three/fiber";
import type * as THREE from "three";
import { smoothOscillation } from "../utils";

interface UseCanOscillationOptions {
  modelRef: RefObject<THREE.Group | null>;
  rotate: [number, number, number];
  animate: boolean;
  animationSpeed: number;
  oscillationAmplitude: [number, number, number];
  isMobile: boolean;
}

/** Sways the can around its base rotation on every frame. */
export function useCanOscillation({
  modelRef,
  rotate,
  animate,
  animationSpeed,
  oscillationAmplitude,
  isMobile,
}: UseCanOscillationOptions) {
  const timeRef = useRef(0);
  const prevMobileRef = useRef(isMobile);

  useEffect(() => {
    if (prevMobileRef.current === isMobile) return;

    timeRef.current = 0;
    prevMobileRef.current = isMobile;

    if (modelRef.current) {
      modelRef.current.rotation.set(rotate[0], rotate[1], rotate[2]);
    }
  }, [isMobile, rotate, modelRef]);

  useFrame((_state, delta) => {
    const model = modelRef.current;
    if (!model || !animate) return;

    timeRef.current += delta * animationSpeed;
    const time = timeRef.current;
    const damping = isMobile ? 0.3 : 1;

    const xOffset =
      (smoothOscillation(time, 0.3) * 2 - 1) * oscillationAmplitude[0] * damping;
    const yOffset =
      (smoothOscillation(time, 0.2) * 2 - 1) * oscillationAmplitude[1] * damping;
    const zOffset =
      (smoothOscillation(time, 0.25) * 2 - 1) * oscillationAmplitude[2] * damping;

    model.rotation.x = rotate[0] + xOffset;
    model.rotation.y = rotate[1] + yOffset;
    model.rotation.z = rotate[2] + zOffset;
  });
}
