"use client";
import { copy } from "@/content/copy";
import { useDelayedReveal, useMobile } from "@/hooks";
import type { JuiceId } from "@/types/juice";
import { useProductInfoTransition } from "../hooks";

interface ProductInfoProps {
  juiceId: JuiceId;
  buttonBgColor?: string;
  buttonTextColor?: string;
}

const REVEAL_DELAY_MS = 300;

export default function ProductInfo({
  juiceId,
  buttonBgColor = "white",
  buttonTextColor = "#82AF38",
}: ProductInfoProps) {
  const isMobile = useMobile();
  const revealed = useDelayedReveal(REVEAL_DELAY_MS);
  const { displayedId, contentRef } = useProductInfoTransition(
    juiceId,
    revealed
  );
  const juice = copy.juices[displayedId];

  return (
    <div
      className={
        isMobile
          ? "absolute bottom-14 start-4 end-4 max-w-full min-w-0"
          : "absolute bottom-2 start-20 max-w-[560px] min-w-[400px]"
      }
      style={{
        opacity: revealed ? 1 : 0,
        transition: "opacity 0.3s ease",
        visibility: revealed ? "visible" : "hidden",
      }}
    >
      <div className="mb-4 min-w-full">
        <div
          className={`relative w-full mb-[6px] p-3 ${
            isMobile ? "px-4" : "px-6"
          } overflow-hidden`}
        >
          <div
            ref={contentRef}
            className="relative"
            style={{ willChange: "transform, opacity" }}
          >
            <h1
              className={`${
                isMobile ? "text-4xl mb-2" : "text-5xl mb-4"
              } font-light text-white`}
            >
              {juice.name}
            </h1>
            <p
              className={`${
                isMobile ? "text-base line-clamp-3" : "text-xl"
              } text-white/90`}
            >
              {juice.description}
            </p>
          </div>
          <button
            type="button"
            className={`inline-flex items-center px-6 py-2.5 rounded-full font-medium transition-all duration-300 hover:opacity-85 mt-5 ${
              isMobile ? "text-sm" : "text-base"
            }`}
            style={{ backgroundColor: buttonBgColor, color: buttonTextColor }}
          >
            {copy.product.seeMore}
          </button>
        </div>
      </div>
    </div>
  );
}
