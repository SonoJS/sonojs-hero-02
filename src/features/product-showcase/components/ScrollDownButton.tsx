"use client";
import { useState } from "react";
import { copy } from "@/content/copy";
import ContactMenu from "./ContactMenu";

interface ScrollDownButtonProps {
  size?: number;
  textColor?: string;
  themeColor?: string;
  isMobile?: boolean;
}

export default function ScrollDownButton({
  size = 100,
  textColor = "white",
  themeColor = "#82AF38",
  isMobile,
}: ScrollDownButtonProps) {
  const [open, setOpen] = useState(false);
  const buttonSize = isMobile ? 64 : size;
  const lineClass = `leading-tight ${isMobile ? "text-xs" : "text-sm"}`;

  return (
    <div
      className={`absolute ${
        isMobile
          ? "bottom-4 end-4"
          : "bottom-[clamp(2rem,1.8vw,9rem)] end-[clamp(2rem,4.5vw,9rem)]"
      } z-50`}
    >
      <div className="relative">
        {open && <ContactMenu themeColor={themeColor} isMobile={isMobile} />}
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="rounded-full border border-white/50 flex flex-col items-center justify-center transition-all duration-300 bg-white/15 hover:bg-white/30"
          style={{
            width: `${buttonSize}px`,
            height: `${buttonSize}px`,
            color: textColor,
          }}
          aria-expanded={open}
          aria-label={copy.cta.getThis}
        >
          <span className={lineClass}>{copy.cta.getThis}</span>
        </button>
      </div>
    </div>
  );
}
