import { useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import type * as THREE from "three";
import { useCanModel, useCanOscillation, useGrabCursor } from "../hooks";

interface Can3DProps {
  modelPath: string;
  rotate?: [number, number, number];
  animate?: boolean;
  animationSpeed?: number;
  oscillationAmplitude?: [number, number, number];
  onLoaded?: () => void;
  isMobile?: boolean;
}

const CAN_POSITION: [number, number, number] = [0.005, 0.045, 0];

export default function Can3D({
  modelPath,
  rotate = [0, 0, 0],
  animate = true,
  animationSpeed = 0.5,
  oscillationAmplitude = [0.05, 0.03, 0.05],
  onLoaded,
  isMobile = false,
}: Can3DProps) {
  const { scene } = useGLTF(modelPath);
  const modelRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useGrabCursor(hovered);
  useCanOscillation({
    modelRef,
    rotate,
    animate,
    animationSpeed,
    oscillationAmplitude,
    isMobile,
  });
  useCanModel(scene, modelRef, onLoaded);

  return (
    <group
      ref={modelRef}
      rotation={rotate}
      scale={isMobile ? 0.75 : 1}
      position={CAN_POSITION}
      castShadow
      receiveShadow
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onPointerDown={() => {
        document.body.style.cursor = "grabbing";
      }}
      onPointerUp={() => {
        document.body.style.cursor = hovered ? "grab" : "auto";
      }}
    />
  );
}
