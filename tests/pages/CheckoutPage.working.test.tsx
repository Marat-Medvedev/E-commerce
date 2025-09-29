import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ChakraProvider, createSystem, defaultConfig } from '@chakra-ui/react';
import CheckoutPage from '@/app/checkout/page';
import cartReducer from '@/store/slices/cartSlice';
import type { CartItem } from '@/types';

// Mock Next.js router
const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

// Mock crypto.randomUUID
Object.defineProperty(global, 'crypto', {
  value: {
    randomUUID: () => 'test-order-id-123',
  },
});

// Mock useToast hook
const mockToast = jest.fn();
jest.mock('@chakra-ui/react', () => ({
  ...jest.requireActual('@chakra-ui/react'),
  useToast: () => mockToast,
}));

// Test store setup
const createTestStore = (initialCartItems: CartItem[] = []) => {
  return configureStore({
    reducer: {
      cart: cartReducer,
    },
    preloadedState: {
      cart: {
        items: initialCartItems,
      },
    },
  });
};

// Create Chakra UI system
const system = createSystem(defaultConfig);

// Test wrapper component
const TestWrapper = ({
  children,
  store,
}: {
  children: React.ReactNode;
  store: ReturnType<typeof createTestStore>;
}) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider value={system}>{children}</ChakraProvider>
      </QueryClientProvider>
    </Provider>
  );
};

describe('CheckoutPage - Working Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows empty cart message when no items', () => {
    const store = createTestStore([]);

    render(
      <TestWrapper store={store}>
        <CheckoutPage />
      </TestWrapper>
    );

    expect(screen.getByText('Your cart is empty')).toBeInTheDocument();
    expect(screen.getByText('Continue Shopping')).toBeInTheDocument();
  });

  it('navigates to home when clicking continue shopping', async () => {
    const user = userEvent.setup();

    const store = createTestStore([]);

    render(
      <TestWrapper store={store}>
        <CheckoutPage />
      </TestWrapper>
    );

    await user.click(screen.getByText('Continue Shopping'));
    expect(mockPush).toHaveBeenCalledWith('/');
  });
});
