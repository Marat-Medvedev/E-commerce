// Custom hook for cart functionality
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '@/store';
import type { Product } from '@/types';
import {
  addToCart as addToCartAction,
  removeFromCart as removeFromCartAction,
  updateQuantity as updateQuantityAction,
  clearCart as clearCartAction,
} from '@/store/slices/cartSlice';

export const useCart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart);

  const addToCart = (product: Product, quantity = 1) => {
    dispatch(addToCartAction({ product, quantity }));
  };

  const removeFromCart = (productId: string) => {
    dispatch(removeFromCartAction(productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    dispatch(updateQuantityAction({ productId, quantity }));
  };

  const clearCart = () => {
    dispatch(clearCartAction());
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };
};
