import { assetPath } from "@/lib/assetPath";
import type { CartItem } from "../types";

export const CART_CURRENCY = "USD";

export const sampleCartItems: CartItem[] = [
  {
    id: 1,
    juiceId: "lemonGinger",
    price: 4.99,
    quantity: 1,
    image: assetPath("/assets/images/can/lemon.webp"),
  },
  {
    id: 2,
    juiceId: "blueberryAcai",
    price: 5.49,
    quantity: 1,
    image: assetPath("/assets/images/can/blueberry.webp"),
  },
];
