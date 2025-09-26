import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Product, CartState } from '@/types';
import { calculateTotal } from '@/lib/utils';

const initialState: CartState = {
  items: [],
  total: 0,
  itemCount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{ product: Product; quantity: number }>
    ) => {
      const { product, quantity } = action.payload;
      const existingItem = state.items.find(
        (item) => item.product.id === product.id
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({
          id: product.id,
          product,
          quantity,
        });
      }

      // Recalculate totals
      state.itemCount = state.items.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
      state.total = calculateTotal(
        state.items.map((item) => ({
          price: item.product.price,
          quantity: item.quantity,
        }))
      );
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      const productId = action.payload;
      state.items = state.items.filter((item) => item.product.id !== productId);

      // Recalculate totals
      state.itemCount = state.items.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
      state.total = calculateTotal(
        state.items.map((item) => ({
          price: item.product.price,
          quantity: item.quantity,
        }))
      );
    },

    updateQuantity: (
      state,
      action: PayloadAction<{ productId: string; quantity: number }>
    ) => {
      const { productId, quantity } = action.payload;
      const item = state.items.find((item) => item.product.id === productId);

      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter(
            (item) => item.product.id !== productId
          );
        } else {
          item.quantity = quantity;
        }

        // Recalculate totals
        state.itemCount = state.items.reduce(
          (sum, item) => sum + item.quantity,
          0
        );
        state.total = calculateTotal(
          state.items.map((item) => ({
            price: item.product.price,
            quantity: item.quantity,
          }))
        );
      }
    },

    clearCart: (state) => {
      state.items = [];
      state.total = 0;
      state.itemCount = 0;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
