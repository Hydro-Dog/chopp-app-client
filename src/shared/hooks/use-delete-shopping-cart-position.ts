import { useDispatch, useSelector } from 'react-redux';
import { PostShoppingCartDTO, postShoppingCart } from '@store/slices/shopping-cart-slice';
import { RootState, AppDispatch } from '@store/store';

export const useDeleteShoppingCartPosition = () => {
  const { shoppingCart } = useSelector((state: RootState) => state.shoppingCart);
  const dispatch = useDispatch<AppDispatch>();

  return ({ itemId }: { itemId: number }) => {
    // Фильтруем все записи, удаляя itemId из корзины
    const newShoppingCartDTO: PostShoppingCartDTO = {
      items: shoppingCart.items
        .filter((item) => item.product.id !== itemId)
        .map((item) => ({
          productId: item.product.id,
          quantity: item.quantity,
        })),
    };

    console.log('newShoppingCartDTO; ', newShoppingCartDTO)

    dispatch(postShoppingCart({ newShoppingCart: newShoppingCartDTO }));
  };
};
