"use client";
import { useEffect, useRef } from "react";
import { assetPath } from "@/lib/assetPath";
import { useIceElements, useIceFloatAnimation } from "../hooks";
import { DEFAULT_CONTAINER_WIDTH } from "../constants";
import IceColumn from "./IceColumn";

const DECOR_PRELOAD = [
  assetPath("/assets/images/ice/cube.webp"),
  assetPath("/assets/images/leaf/1.webp"),
  assetPath("/assets/images/leaf/2.webp"),
];

interface IceCubesProps {
  containerWidth?: number;
  cubeCount?: number;
  leafCount?: number;
}

export default function IceCubes({
  containerWidth = DEFAULT_CONTAINER_WIDTH,
  cubeCount = 6,
  leafCount = 4,
}: IceCubesProps) {
  const leftColumnRef = useRef<HTMLDivElement>(null);
  const rightColumnRef = useRef<HTMLDivElement>(null);
  const generated = useIceElements(cubeCount, leafCount);
  const left = generated?.left ?? [];
  const right = generated?.right ?? [];
  const mounted = useIceFloatAnimation({
    leftColumnRef,
    rightColumnRef,
    left,
    right,
  });

  useEffect(() => {
    DECOR_PRELOAD.forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });
  }, []);

  if (!generated) {
    return null;
  }

  return (
    <>
      <IceColumn
        side="left"
        elements={generated.left}
        containerWidth={containerWidth}
        mounted={mounted}
        columnRef={leftColumnRef}
      />
      <IceColumn
        side="right"
        elements={generated.right}
        containerWidth={containerWidth}
        mounted={mounted}
        columnRef={rightColumnRef}
      />
    </>
  );
}
