import type { RefObject } from "react";
import { juiceCans, positionConfigs } from "../constants";
import CanvasContainer from "./CanvasContainer";

interface CarouselWheelProps {
  activeIndex: number;
  isMobile: boolean;
  onActiveModelLoaded: () => void;
  wheelRef: RefObject<HTMLDivElement | null>;
}

export default function CarouselWheel({
  activeIndex,
  isMobile,
  onActiveModelLoaded,
  wheelRef,
}: CarouselWheelProps) {
  return (
    <div
      ref={wheelRef}
      dir="ltr"
      className="relative w-full h-full flex items-center justify-center"
      style={{ transformOrigin: "center center" }}
    >
      {juiceCans.map((can, index) => {
        const active = index === activeIndex;

        return (
          <div
            key={can.id}
            className={`${positionConfigs[index].className} ${
              isMobile ? "w-[45%] h-[45%] mx-auto" : "w-1/2 h-1/2"
            } transform-gpu`}
            style={{
              transformOrigin: positionConfigs[index].transformOrigin,
            }}
          >
            <CanvasContainer
              modelPath={can.model}
              rotation={positionConfigs[index].rotation}
              isMobile={isMobile}
              isActivePosition={active}
              onLoaded={onActiveModelLoaded}
            />
          </div>
        );
      })}
    </div>
  );
}
