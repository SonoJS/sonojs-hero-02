import type { JuiceId } from "@/types/juice";
import type { FruitAnimationState, FruitConfig } from "../types";
import { getFruitImagePath } from "../utils";
import FruitElement from "./FruitElement";

interface FruitLayerProps {
  configs: FruitConfig[];
  juiceId: JuiceId;
  animationState: FruitAnimationState;
  fromCenter: boolean;
  isMobile: boolean;
  /** Stable layer id so entering→visible does not remount DOM. */
  layerKey: string;
}

/** One full set of fruits for a juice, all in the same animation state. */
export default function FruitLayer({
  configs,
  juiceId,
  animationState,
  fromCenter,
  isMobile,
  layerKey,
}: FruitLayerProps) {
  return (
    <div className="absolute inset-0">
      {configs.map((config) => (
        <FruitElement
          key={`${layerKey}-${config.position}`}
          fruitConfig={config}
          imagePath={getFruitImagePath(juiceId)}
          animationState={animationState}
          fromCenter={fromCenter}
          isMobile={isMobile}
        />
      ))}
    </div>
  );
}
