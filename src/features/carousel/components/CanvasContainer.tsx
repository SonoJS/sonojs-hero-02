import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, PresentationControls } from "@react-three/drei";
import * as THREE from "three";
import { ENVIRONMENT_MAP } from "../constants";
import Can3D from "./Can3D";

interface CanvasContainerProps {
  modelPath: string;
  rotation: [number, number, number];
  isMobile: boolean;
  isActivePosition: boolean;
  onLoaded?: () => void;
}

export default function CanvasContainer({
  modelPath,
  rotation,
  isMobile,
  isActivePosition,
  onLoaded,
}: CanvasContainerProps) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
      }}
    >
      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{
          toneMapping: THREE.ACESFilmicToneMapping,
          outputColorSpace: THREE.SRGBColorSpace,
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        camera={{
          position: [0, 0, 1],
          fov: isMobile ? 24 : 22,
          near: 0.01,
          far: 100,
        }}
        style={{ width: "100%", height: "100%" }}
      >
        <Suspense fallback={null}>
          <PresentationControls
            global={false}
            cursor={false}
            snap={true}
            speed={isMobile ? 1.5 : 1}
            zoom={1}
            rotation={[0, 0, 0.1]}
            polar={[0, Math.PI / 10]}
            azimuth={[-Math.PI, Math.PI]}
          >
            <Can3D
              modelPath={modelPath}
              rotate={rotation}
              animate={isActivePosition}
              animationSpeed={0.6}
              oscillationAmplitude={[0.05, 0.03, 0.05]}
              onLoaded={isActivePosition ? onLoaded : undefined}
              isMobile={isMobile}
            />
          </PresentationControls>
          <Environment
            files={ENVIRONMENT_MAP}
            resolution={256}
            environmentIntensity={1}
          />
          <ambientLight intensity={10} />
          <directionalLight intensity={20} position={[5, 5, 5]} />
          <directionalLight intensity={10} position={[-1, -1, -1]} />
        </Suspense>
      </Canvas>
    </div>
  );
}
