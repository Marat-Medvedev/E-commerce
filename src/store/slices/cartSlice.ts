import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import type { CartState, CartItem } from '@/types';

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<CartItem>) => {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      if (existingItem) {
        existingItem.qty += newItem.qty;
      } else {
        state.items.push(newItem);
      }
    },

    remove: (state, action: PayloadAction<string>) => {
      const itemId = action.payload;
      state.items = state.items.filter((item) => item.id !== itemId);
    },

    setQty: (state, action: PayloadAction<{ id: string; qty: number }>) => {
      const { id, qty } = action.payload;
      const item = state.items.find((item) => item.id === id);

      if (item) {
        if (qty <= 0) {
          state.items = state.items.filter((item) => item.id !== id);
        } else {
          item.qty = qty;
        }
      }
    },

    clear: (state) => {
      state.items = [];
    },
  },
});

// Selectors
export const selectSubtotal = createSelector(
  [(state: { cart: CartState }) => state.cart.items],
  (items) => items.reduce((total, item) => total + item.price * item.qty, 0)
);

export const selectTotalQty = createSelector(
  [(state: { cart: CartState }) => state.cart.items],
  (items) => items.reduce((total, item) => total + item.qty, 0)
);

export const { add, remove, setQty, clear } = cartSlice.actions;
export default cartSlice.reducer;
