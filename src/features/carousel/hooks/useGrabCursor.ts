import { useEffect } from "react";

/** Shows a grab cursor on the page body while `hovered` is true. */
export function useGrabCursor(hovered: boolean) {
  useEffect(() => {
    document.body.style.cursor = hovered ? "grab" : "auto";
    return () => {
      document.body.style.cursor = "auto";
    };
  }, [hovered]);
}
