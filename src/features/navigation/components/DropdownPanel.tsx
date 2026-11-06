import type { ReactNode } from "react";

interface DropdownPanelProps {
  isDesktop: boolean;
  desktopWidthClass?: string;
  children: ReactNode;
}

/** Popover under the nav icon on desktop, full-width sheet under the bar on mobile. */
export default function DropdownPanel({
  isDesktop,
  desktopWidthClass = "w-64",
  children,
}: DropdownPanelProps) {
  const layoutClass = isDesktop
    ? `absolute end-0 mt-4 ${desktopWidthClass} origin-top-right transition-all duration-200 ease-out`
    : "fixed inset-x-0 top-[56px] mx-auto w-[95%] max-w-sm origin-top z-[600]";

  return (
    <div
      className={`bg-white rounded-2xl shadow-lg overflow-hidden transform ${layoutClass}`}
      style={{
        animation: "scaleIn 0.2s ease-out forwards",
        ...(isDesktop ? { zIndex: 600 } : {}),
      }}
    >
      {children}
    </div>
  );
}
