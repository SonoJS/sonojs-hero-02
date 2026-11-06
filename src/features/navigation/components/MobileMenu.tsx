"use client";
import { FaUser } from "react-icons/fa";
import { GiShoppingBag } from "react-icons/gi";
import { copy } from "@/content/copy";
import type { NavDropdown, NavItem } from "../types";

interface MobileMenuProps {
  navItems: NavItem[];
  cartItemCount: number;
  activeDropdown: NavDropdown | null;
  textColor: string;
  toggleDropdown: (dropdown: NavDropdown) => void;
}

const BAR_CLASS =
  "block w-5 h-0.5 transition-transform duration-300 ease-in-out";

export default function MobileMenu({
  navItems,
  cartItemCount,
  textColor,
  activeDropdown,
  toggleDropdown,
}: MobileMenuProps) {
  const isOpen = activeDropdown === "menu";

  return (
    <div className="relative md:hidden">
      <button
        type="button"
        className="relative z-10 flex flex-col justify-center items-center w-8 h-8 p-1"
        onClick={() => toggleDropdown("menu")}
        aria-label={copy.nav.menu}
        aria-expanded={isOpen}
      >
        <span
          className={`${BAR_CLASS} ${isOpen ? "rotate-45 translate-y-1" : ""}`}
          style={{ backgroundColor: textColor }}
        />
        <span
          className={`block w-5 h-0.5 my-1 transition-opacity duration-300 ease-in-out ${
            isOpen ? "opacity-0" : ""
          }`}
          style={{ backgroundColor: textColor }}
        />
        <span
          className={`${BAR_CLASS} ${isOpen ? "-rotate-45 -translate-y-1" : ""}`}
          style={{ backgroundColor: textColor }}
        />
      </button>

      {isOpen && (
        <div
          className="fixed inset-x-0 top-[56px] mx-auto w-full max-w-[95%] bg-white rounded-2xl shadow-lg overflow-hidden z-[500]"
          style={{ animation: "scaleIn 0.2s ease-out forwards" }}
        >
          <div className="py-3 space-y-1">
            {navItems.map((item) => (
              <a
                key={item.id}
                href="#"
                className="block px-4 py-2.5 text-gray-800 hover:bg-gray-50 text-center text-lg font-medium transition-colors"
                onClick={(event) => {
                  event.preventDefault();
                  toggleDropdown("menu");
                }}
              >
                {copy.nav.items[item.id as keyof typeof copy.nav.items]}
              </a>
            ))}
            <div className="pt-2 mt-2 border-t border-gray-100" />
            <div className="flex justify-center gap-6 py-2">
              <button
                type="button"
                className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleDropdown("account");
                }}
                data-dropdown="account"
                aria-label={copy.nav.account}
              >
                <FaUser size={18} color="#555" />
              </button>
              <button
                type="button"
                className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors relative"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleDropdown("cart");
                }}
                data-dropdown="cart"
                aria-label={copy.nav.cart}
              >
                <GiShoppingBag size={18} color="#555" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -end-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
