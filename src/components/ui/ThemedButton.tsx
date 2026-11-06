import type { ButtonHTMLAttributes } from "react";

interface ThemedButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  themeColor: string;
  variant?: "solid" | "outline" | "text";
}

/** A button coloured from the active juice theme; dims on hover. */
export default function ThemedButton({
  themeColor,
  variant = "solid",
  className = "",
  style,
  type = "button",
  ...rest
}: ThemedButtonProps) {
  const variantStyle =
    variant === "solid"
      ? { backgroundColor: themeColor }
      : variant === "outline"
      ? { color: themeColor, borderColor: `${themeColor}40` }
      : { color: themeColor };

  const variantClass =
    variant === "solid" ? "text-white" : variant === "outline" ? "border" : "";

  return (
    <button
      type={type}
      className={`font-medium transition-all duration-300 hover:opacity-80 ${variantClass} ${className}`}
      style={{ ...variantStyle, ...style }}
      {...rest}
    />
  );
}
