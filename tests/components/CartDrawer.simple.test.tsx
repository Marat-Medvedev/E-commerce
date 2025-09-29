import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { ChakraProvider, createSystem, defaultConfig } from '@chakra-ui/react';
import CartDrawer from '@/components/features/CartDrawer';
import cartReducer from '@/store/slices/cartSlice';
import type { CartItem } from '@/types';

// Mock Next.js router
const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

// Mock the toast hook
jest.mock('@chakra-ui/react', () => ({
  ...jest.requireActual('@chakra-ui/react'),
  useToast: () => jest.fn(),
}));

// Mock Chakra UI components
jest.mock('@chakra-ui/react', () => ({
  ...jest.requireActual('@chakra-ui/react'),
  Drawer: ({
    children,
    isOpen,
  }: {
    children: React.ReactNode;
    isOpen: boolean;
  }) => (isOpen ? <div data-testid="drawer">{children}</div> : null),
  DrawerBody: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="drawer-body">{children}</div>
  ),
  DrawerHeader: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="drawer-header">{children}</div>
  ),
  DrawerOverlay: () => <div data-testid="drawer-overlay" />,
  DrawerContent: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="drawer-content">{children}</div>
  ),
  DrawerCloseButton: () => <button data-testid="close-button">×</button>,
  VStack: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="vstack">{children}</div>
  ),
  HStack: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="hstack">{children}</div>
  ),
  Text: ({ children }: { children: React.ReactNode }) => (
    <span>{children}</span>
  ),
  Button: ({
    children,
    onClick,
  }: {
    children: React.ReactNode;
    onClick?: () => void;
  }) => <button onClick={onClick}>{children}</button>,
  Image: ({ src, alt }: { src: string; alt: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} />
  ),
  Box: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  IconButton: ({
    children,
    onClick,
  }: {
    children: React.ReactNode;
    onClick?: () => void;
  }) => <button onClick={onClick}>{children}</button>,
  useToast: () => jest.fn(),
  FocusLock: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  VisuallyHidden: ({ children }: { children: React.ReactNode }) => (
    <div style={{ display: 'none' }}>{children}</div>
  ),
}));

const createTestStore = (
  initialState = { cart: { items: [] as CartItem[] } }
) => {
  return configureStore({
    reducer: {
      cart: cartReducer,
    },
    preloadedState: initialState,
  });
};

const mockCartItems: CartItem[] = [
  {
    id: '1',
    title: 'Test Product 1',
    price: 29.99,
    qty: 2,
    imageUrl: 'https://example.com/image1.jpg',
  },
  {
    id: '2',
    title: 'Test Product 2',
    price: 19.99,
    qty: 1,
    imageUrl: 'https://example.com/image2.jpg',
  },
];

const system = createSystem(defaultConfig);

const renderWithProviders = (
  component: React.ReactElement,
  initialState = { cart: { items: [] as CartItem[] } }
) => {
  const store = createTestStore(initialState);

  return render(
    <ChakraProvider value={system}>
      <Provider store={store}>{component}</Provider>
    </ChakraProvider>
  );
};

describe('CartDrawer', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render empty cart message when no items', () => {
    renderWithProviders(<CartDrawer isOpen={true} onClose={mockOnClose} />);

    expect(screen.getByText('Your cart is empty')).toBeInTheDocument();
    expect(screen.getByText('Continue Shopping')).toBeInTheDocument();
  });

  it('should render cart items when items exist', () => {
    const initialState = {
      cart: { items: mockCartItems },
    };

    renderWithProviders(
      <CartDrawer isOpen={true} onClose={mockOnClose} />,
      initialState
    );

    expect(screen.getByText('Test Product 1')).toBeInTheDocument();
    expect(screen.getByText('Test Product 2')).toBeInTheDocument();
    expect(screen.getByText('Shopping Cart (3 items)')).toBeInTheDocument();
  });

  it('should display correct subtotal', () => {
    const initialState = {
      cart: { items: mockCartItems },
    };

    renderWithProviders(
      <CartDrawer isOpen={true} onClose={mockOnClose} />,
      initialState
    );

    // Product 1: 29.99 * 2 = 59.98
    // Product 2: 19.99 * 1 = 19.99
    // Total: 79.97
    expect(screen.getByText('$79.97')).toBeInTheDocument();
  });

  it('should have clear cart and checkout buttons', () => {
    const initialState = {
      cart: { items: mockCartItems },
    };

    renderWithProviders(
      <CartDrawer isOpen={true} onClose={mockOnClose} />,
      initialState
    );

    expect(screen.getByText('Clear Cart')).toBeInTheDocument();
    expect(screen.getByText('Go to Checkout')).toBeInTheDocument();
  });
});
