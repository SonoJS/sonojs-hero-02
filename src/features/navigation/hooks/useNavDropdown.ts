import { useCallback, useEffect, useRef, useState } from "react";
import type { NavDropdown } from "../types";

/** Tracks which dropdown is open and closes it on an outside press. */
export function useNavDropdown() {
  const [activeDropdown, setActiveDropdown] = useState<NavDropdown | null>(null);
  const cartRef = useRef<HTMLDivElement>(null);
  const accountRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = useCallback((dropdown: NavDropdown) => {
    setActiveDropdown((prev) => (prev === dropdown ? null : dropdown));
  }, []);

  const closeDropdown = useCallback(() => setActiveDropdown(null), []);

  useEffect(() => {
    if (!activeDropdown) return;

    const refs = { cart: cartRef, account: accountRef, menu: menuRef };

    function handleMouseDown(event: MouseEvent) {
      const target = event.target as Element;

      const trigger = target.closest("[data-dropdown]")?.getAttribute("data-dropdown");
      if (
        activeDropdown === "menu" &&
        (trigger === "cart" || trigger === "account")
      ) {
        return;
      }

      const container = refs[activeDropdown as NavDropdown].current;
      if (container && !container.contains(target)) {
        setActiveDropdown(null);
      }
    }

    document.addEventListener("mousedown", handleMouseDown);
    return () => document.removeEventListener("mousedown", handleMouseDown);
  }, [activeDropdown]);

  return {
    activeDropdown,
    toggleDropdown,
    closeDropdown,
    cartRef,
    accountRef,
    menuRef,
  };
}
