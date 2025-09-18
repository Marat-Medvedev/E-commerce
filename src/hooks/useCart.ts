// Custom hook for cart functionality
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';
import type { Product } from '@/types';

interface CartState {
  items: Array<{ product: Product; quantity: number }>;
  total: number;
  itemCount: number;
}

export const useCart = () => {
  const cart = useSelector(
    (state: RootState) =>
      (state as unknown as { cart: CartState }).cart || {
        items: [],
        total: 0,
        itemCount: 0,
      }
  );

  // Cart actions will be implemented when cart slice is created
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const addToCart = (_product: Product, _quantity = 1) => {
    // Implementation will be added later
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const removeFromCart = (_productId: string) => {
    // Implementation will be added later
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const updateQuantity = (_productId: string, _quantity: number) => {
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
