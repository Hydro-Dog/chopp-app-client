import { Product } from "./product";

export type ShoppingCart = {
  items: ShoppingCartItem[];
  quantity: number;
  totalPrice: number;
};

export type ShoppingCartItem = {
  product: Product;
  quantity: number;
  totalPrice: number;
};
