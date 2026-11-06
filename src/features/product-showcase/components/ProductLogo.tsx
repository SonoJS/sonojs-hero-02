"use client";

interface ProductLogoProps {
  text: string;
  color?: string;
  fontSize?: string;
  fontFamily?: string;
  className?: string;
  isMobile?: boolean;
}

export default function ProductLogo({
  text,
  color = "white",
  fontSize = "clamp(8.2rem,8.2rem + 12.3vw,23.8rem)",
  fontFamily = "var(--font-wordmark), sans-serif",
  className = "",
  isMobile = false,
}: ProductLogoProps) {
  return (
    <div
      dir="ltr"
      className="absolute z-[-1]! left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center"
    >
      <h1
        className={`leading-none select-none ${className} `}
        style={{
          fontFamily,
          color,
          fontWeight: 400,
          fontSize: isMobile ? "clamp(4.1rem,7.4rem + 12.3vw,8.2rem)" : fontSize,
          letterSpacing: "0.01em",
          textTransform: "uppercase",
          display: "inline-block",
          // Anton draws its capitals low in the line box; this centres the ink.
          transform: "translateY(-0.1em)",
        }}
      >
        {text}
      </h1>
    </div>
  );
}
