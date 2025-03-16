export type PostShoppingCartItemDTO = {
  productId: number;
  quantity: number;
};

export type PostShoppingCartDTO = {
  items: PostShoppingCartItemDTO[];
};
