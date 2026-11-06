"use client";
import dynamic from "next/dynamic";
import type { ReactNode } from "react";
import {
  WATER_WAVE_DESKTOP,
  WATER_WAVE_IMAGE,
  WATER_WAVE_MOBILE,
} from "../constants";

const WaterWave = dynamic(() => import("react-water-wave"), {
  ssr: false,
  loading: () => <div className="h-[100dvh] overflow-hidden relative" />,
});

interface WaterWaveStageProps {
  isMobile: boolean;
  children: ReactNode;
}

/** Water ripple stage for both mobile and desktop. */
export default function WaterWaveStage({
  isMobile,
  children,
}: WaterWaveStageProps) {
  const waveProps = isMobile ? WATER_WAVE_MOBILE : WATER_WAVE_DESKTOP;

  return (
    <WaterWave imageUrl={WATER_WAVE_IMAGE} {...waveProps}>
      {() => (
        <div className="h-[100dvh] overflow-hidden w-full relative">
          {children}
        </div>
      )}
    </WaterWave>
  );
}
