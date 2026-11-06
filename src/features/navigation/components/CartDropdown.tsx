"use client";
import { copy } from "@/content/copy";
import type { CartItem } from "../types";
import { getTotalPrice } from "../utils";
import CartItemRow from "./CartItemRow";
import CartSummary from "./CartSummary";
import DropdownPanel from "./DropdownPanel";

interface CartDropdownProps {
  cartItems: CartItem[];
  themeColor: string;
  isDesktop?: boolean;
  onClose?: () => void;
}

export default function CartDropdown({
  cartItems,
  themeColor,
  isDesktop = true,
  onClose,
}: CartDropdownProps) {
  return (
    <DropdownPanel isDesktop={isDesktop} desktopWidthClass="w-80">
      <div className="p-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold text-gray-800">{copy.cart.title}</h3>
          {!isDesktop && (
            <button
              type="button"
              className="text-gray-400 hover:text-gray-600 p-1"
              onClick={onClose}
              aria-label={copy.cart.close}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        <div
          className={`space-y-3 ${
            isDesktop ? "max-h-60" : "max-h-[40vh]"
          } overflow-y-auto styled-scrollbar`}
        >
          {cartItems.map((item) => (
            <CartItemRow key={item.id} item={item} isDesktop={isDesktop} />
          ))}
        </div>

        <CartSummary
          totalPrice={getTotalPrice(cartItems)}
          themeColor={themeColor}
          isDesktop={isDesktop}
        />
      </div>
    </DropdownPanel>
  );
}
