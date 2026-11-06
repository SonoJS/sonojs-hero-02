import { useEffect } from "react";

/** Keeps the page body background in sync with the active juice colour. */
export function useBodyBackground(color: string) {
  useEffect(() => {
    document.body.style.transition = "background-color 0.6s ease-in-out 0.3s";
    document.body.style.backgroundColor = color;
  }, [color]);
}
