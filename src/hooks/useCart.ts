import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import {
  add,
  remove,
  setQty,
  clear,
  selectSubtotal,
  selectTotalQty,
} from '@/store/slices/cartSlice';
import type { CartItem, Product } from '@/types';

export const useCart = () => {
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.cart.items);
  const subtotal = useSelector(selectSubtotal);
  const totalQty = useSelector(selectTotalQty);

  const addToCart = (product: Product, quantity: number = 1) => {
    const cartItem: CartItem = {
      id: product.id,
      title: product.name,
      price: product.price,
      qty: quantity,
      imageUrl: product.image,
    };
    dispatch(add(cartItem));
  };

  const removeFromCart = (id: string) => {
    dispatch(remove(id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    dispatch(setQty({ id, qty: quantity }));
  };

  const clearCart = () => {
    dispatch(clear());
  };

  const getItemQuantity = (id: string) => {
    const item = items.find((item) => item.id === id);
    return item ? item.qty : 0;
  };

  const isInCart = (id: string) => {
    return items.some((item) => item.id === id);
  };

  return {
    items,
    subtotal,
    totalQty,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getItemQuantity,
    isInCart,
  };
};
