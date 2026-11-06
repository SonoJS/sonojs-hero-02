import Image from "next/image";
import { copy } from "@/content/copy";
import { formatCurrency } from "@/lib/format";
import { CART_CURRENCY } from "../constants";
import type { CartItem } from "../types";

interface CartItemRowProps {
  item: CartItem;
  isDesktop: boolean;
}

export default function CartItemRow({ item, isDesktop }: CartItemRowProps) {
  const name = copy.cart.items[item.juiceId];

  return (
    <div className="flex items-center gap-3 bg-gray-50 p-2 rounded-xl">
      <div
        className={`${
          isDesktop ? "w-12 h-12" : "w-14 h-14"
        } bg-gray-100 rounded-lg overflow-hidden flex-shrink-0`}
      >
        <div className="w-full h-full flex items-center justify-center">
          <Image
            src={item.image}
            alt={name}
            className="object-contain w-full h-[80%]"
            width={isDesktop ? 48 : 56}
            height={isDesktop ? 48 : 56}
          />
        </div>
      </div>
      <div className="flex-1">
        <h4 className="text-sm font-medium text-gray-800">{name}</h4>
        <div className="flex justify-between items-center mt-1">
          <p className="text-xs text-gray-500">
            {copy.cart.quantity(item.quantity)}
          </p>
          <p className="text-sm font-medium text-gray-800">
            {formatCurrency(item.price, CART_CURRENCY)}
          </p>
        </div>
      </div>
      <button
        type="button"
        aria-label={copy.cart.remove}
        className={`text-gray-400 hover:text-gray-600 ${!isDesktop && "p-2"}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          viewBox="0 0 16 16"
          aria-hidden="true"
        >
          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
          <path
            fillRule="evenodd"
            d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
          />
        </svg>
      </button>
    </div>
  );
}
