"use client";
import { ThemedButton } from "@/components/ui";
import { copy } from "@/content/copy";
import { formatCurrency } from "@/lib/format";
import { CART_CURRENCY } from "../constants";

interface CartSummaryProps {
  totalPrice: number;
  themeColor: string;
  isDesktop: boolean;
}

export default function CartSummary({
  totalPrice,
  themeColor,
  isDesktop,
}: CartSummaryProps) {
  const buttonClass = `w-full ${
    isDesktop ? "py-2 px-4 rounded-xl text-sm" : "py-3 px-4 rounded-xl text-base"
  }`;

  return (
    <div className="border-t border-gray-100 mt-3 pt-3">
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm text-gray-500">{copy.cart.subtotal}</span>
        <span className="text-sm font-semibold text-gray-800">
          {formatCurrency(totalPrice, CART_CURRENCY)}
        </span>
      </div>
      <div className="space-y-2">
        <ThemedButton themeColor={themeColor} className={buttonClass}>
          {copy.cart.checkout}
        </ThemedButton>
        <ThemedButton
          themeColor={themeColor}
          variant="outline"
          className={buttonClass}
        >
          {copy.cart.viewCart}
        </ThemedButton>
      </div>
    </div>
  );
}
