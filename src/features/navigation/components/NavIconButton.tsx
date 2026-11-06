import type { ReactNode } from "react";

interface NavIconButtonProps {
  label: string;
  color: string;
  onClick: () => void;
  badgeCount?: number;
  children: ReactNode;
}

export default function NavIconButton({
  label,
  color,
  onClick,
  badgeCount = 0,
  children,
}: NavIconButtonProps) {
  return (
    <span
      role="button"
      tabIndex={0}
      aria-label={label}
      className="relative cursor-pointer hover:opacity-80 transition-opacity duration-300"
      style={{ color }}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {children}
      {badgeCount > 0 && (
        <span className="absolute -top-2 -end-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
          {badgeCount}
        </span>
      )}
    </span>
  );
}
