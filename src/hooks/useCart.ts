// Custom hook for cart functionality
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '@/store';

export const useCart = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cart = useSelector((state: RootState) => state.cart);

  // Cart actions will be implemented when cart slice is created
  const addToCart = (product: any, quantity: number = 1) => {
    // Implementation will be added later
  };

  const removeFromCart = (productId: string) => {
    // Implementation will be added later
  };

  const updateQuantity = (productId: string, quantity: number) => {
    // Implementation will be added later
  };

  const clearCart = () => {
    // Implementation will be added later
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };
};
