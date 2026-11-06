import { FloatingFruits } from "@/features/floating-fruits";
import type { JuiceId } from "@/types/juice";

interface FruitsContainerProps {
  isVisible: boolean;
  currentJuiceId: JuiceId;
  nextJuiceId: JuiceId | null;
  isTransitioning: boolean;
}

export default function FruitsContainer({
  isVisible,
  currentJuiceId,
  nextJuiceId,
  isTransitioning,
}: FruitsContainerProps) {
  if (!isVisible) return null;

  return (
    <div
      dir="ltr"
      className="absolute w-full h-full inset-0 flex items-center justify-center z-0 pointer-events-none"
    >
      <FloatingFruits
        currentJuice={currentJuiceId}
        nextJuice={nextJuiceId}
        isTransitioning={isTransitioning}
      />
    </div>
  );
}
