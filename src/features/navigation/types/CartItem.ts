import type { JuiceId } from "@/types/juice";

export interface CartItem {
  id: number;
  juiceId: JuiceId;
  price: number;
  quantity: number;
  image: string;
}
