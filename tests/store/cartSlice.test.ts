import { configureStore } from '@reduxjs/toolkit';
import cartReducer, {
  add,
  remove,
  setQty,
  clear,
  selectSubtotal,
  selectTotalQty,
} from '@/store/slices/cartSlice';
import type { CartItem } from '@/types';

// Create a test store
const createTestStore = () => {
  return configureStore({
    reducer: {
      cart: cartReducer,
    },
  });
};

describe('cartSlice', () => {
  const mockCartItem: CartItem = {
    id: '1',
    title: 'Test Product',
    price: 29.99,
    qty: 1,
    imageUrl: 'https://example.com/image.jpg',
  };

  const mockCartItem2: CartItem = {
    id: '2',
    title: 'Test Product 2',
    price: 19.99,
    qty: 2,
    imageUrl: 'https://example.com/image2.jpg',
  };

  describe('add action', () => {
    it('should add a new item to the cart', () => {
      const store = createTestStore();
      store.dispatch(add(mockCartItem));

      const state = store.getState();
      expect(state.cart.items).toHaveLength(1);
      expect(state.cart.items[0]).toEqual(mockCartItem);
    });

    it('should increase quantity when adding existing item', () => {
      const store = createTestStore();
      store.dispatch(add(mockCartItem));
      store.dispatch(add(mockCartItem));

      const state = store.getState();
      expect(state.cart.items).toHaveLength(1);
      expect(state.cart.items[0].qty).toBe(2);
    });

    it('should add multiple different items', () => {
      const store = createTestStore();
      store.dispatch(add(mockCartItem));
      store.dispatch(add(mockCartItem2));

      const state = store.getState();
      expect(state.cart.items).toHaveLength(2);
    });
  });

  describe('remove action', () => {
    it('should remove an item from the cart', () => {
      const store = createTestStore();
      store.dispatch(add(mockCartItem));
      store.dispatch(add(mockCartItem2));

      store.dispatch(remove('1'));

      const state = store.getState();
      expect(state.cart.items).toHaveLength(1);
      expect(state.cart.items[0].id).toBe('2');
    });

    it('should not affect cart when removing non-existent item', () => {
      const store = createTestStore();
      store.dispatch(add(mockCartItem));

      store.dispatch(remove('999'));

      const state = store.getState();
      expect(state.cart.items).toHaveLength(1);
    });
  });

  describe('setQty action', () => {
    it('should update quantity of existing item', () => {
      const store = createTestStore();
      store.dispatch(add(mockCartItem));

      store.dispatch(setQty({ id: '1', qty: 5 }));

      const state = store.getState();
      expect(state.cart.items[0].qty).toBe(5);
    });

    it('should remove item when setting quantity to 0', () => {
      const store = createTestStore();
      store.dispatch(add(mockCartItem));

      store.dispatch(setQty({ id: '1', qty: 0 }));

      const state = store.getState();
      expect(state.cart.items).toHaveLength(0);
    });

    it('should remove item when setting quantity to negative', () => {
      const store = createTestStore();
      store.dispatch(add(mockCartItem));

      store.dispatch(setQty({ id: '1', qty: -1 }));

      const state = store.getState();
      expect(state.cart.items).toHaveLength(0);
    });

    it('should not affect cart when updating non-existent item', () => {
      const store = createTestStore();
      store.dispatch(add(mockCartItem));

      store.dispatch(setQty({ id: '999', qty: 5 }));

      const state = store.getState();
      expect(state.cart.items).toHaveLength(1);
      expect(state.cart.items[0].qty).toBe(1);
    });
  });

  describe('clear action', () => {
    it('should clear all items from cart', () => {
      const store = createTestStore();
      store.dispatch(add(mockCartItem));
      store.dispatch(add(mockCartItem2));

      store.dispatch(clear());

      const state = store.getState();
      expect(state.cart.items).toHaveLength(0);
    });
  });

  describe('selectors', () => {
    it('should calculate subtotal correctly', () => {
      const store = createTestStore();
      store.dispatch(add(mockCartItem));
      store.dispatch(add(mockCartItem2));

      const state = store.getState();
      const subtotal = selectSubtotal(state);

      // mockCartItem: 29.99 * 1 = 29.99
      // mockCartItem2: 19.99 * 2 = 39.98
      // Total: 69.97
      expect(subtotal).toBeCloseTo(69.97, 2);
    });

    it('should calculate total quantity correctly', () => {
      const store = createTestStore();
      store.dispatch(add(mockCartItem));
      store.dispatch(add(mockCartItem2));

      const state = store.getState();
      const totalQty = selectTotalQty(state);

      // mockCartItem: 1 qty
      // mockCartItem2: 2 qty
      // Total: 3
      expect(totalQty).toBe(3);
    });

    it('should return 0 for empty cart', () => {
      const store = createTestStore();
      const state = store.getState();

      expect(selectSubtotal(state)).toBe(0);
      expect(selectTotalQty(state)).toBe(0);
    });
  });
});
