import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface CarouselArrowButtonProps {
  direction: "prev" | "next";
  label: string;
  onClick: () => void;
  disabled: boolean;
  isMobile: boolean;
}

export default function CarouselArrowButton({
  direction,
  label,
  onClick,
  disabled,
  isMobile,
}: CarouselArrowButtonProps) {
  const Icon = direction === "prev" ? FaChevronLeft : FaChevronRight;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${
        isMobile ? "w-10 h-10" : "w-12 h-12"
      } rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center border border-white/50 text-white transition-all disabled:opacity-40`}
      aria-label={label}
      disabled={disabled}
    >
      <Icon size={isMobile ? 16 : 20} />
    </button>
  );
}
