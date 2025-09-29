import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { AppChakraProvider } from '@/components/providers/ChakraProvider';
import { ProductDetail } from '@/components/features/ProductDetail';
import { mockProducts } from '@/hooks/useProducts';
import type { Product } from '@/types';

// Mock the useProduct hook
jest.mock('@/hooks', () => ({
  useProduct: jest.fn(),
  useProducts: jest.fn(),
}));

// Mock the useCart hook
jest.mock('@/hooks/useCart', () => ({
  useCart: jest.fn(),
}));

// Mock the toast
jest.mock('@chakra-ui/react', () => ({
  ...jest.requireActual('@chakra-ui/react'),
  useToast: () => jest.fn(),
}));

const mockProduct: Product = mockProducts[0];

const createTestStore = () => {
  return configureStore({
    reducer: {
      cart: (state = { items: [], total: 0, itemCount: 0 }) => state,
    },
  });
};

const createTestQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
};

const renderWithProviders = (component: React.ReactElement) => {
  const store = createTestStore();
  const queryClient = createTestQueryClient();

  return render(
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AppChakraProvider>{component}</AppChakraProvider>
      </QueryClientProvider>
    </Provider>
  );
};

describe('ProductDetail', () => {
  const mockAddToCart = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    // Mock useCart hook
    const { useCart } = jest.requireMock('@/hooks/useCart');
    useCart.mockReturnValue({
      addToCart: mockAddToCart,
      isInCart: jest.fn().mockReturnValue(false),
    });
  });

  it('renders product title and price with mocked data', async () => {
    // Mock useProduct hook
    const { useProduct, useProducts } = jest.requireMock('@/hooks');
    useProduct.mockReturnValue({
      data: mockProduct,
      isLoading: false,
      error: null,
    });
    useProducts.mockReturnValue({
      data: mockProducts.slice(1, 4), // Related products
    });

    renderWithProviders(<ProductDetail productId="1" />);

    await waitFor(() => {
      expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
      expect(screen.getByText('$199.99')).toBeInTheDocument();
      expect(screen.getByText(mockProduct.description)).toBeInTheDocument();
      expect(screen.getByText(mockProduct.category)).toBeInTheDocument();
    });
  });

  it('calls store action when clicking Add to Cart', async () => {
    // Mock useProduct hook
    const { useProduct, useProducts } = jest.requireMock('@/hooks');
    useProduct.mockReturnValue({
      data: mockProduct,
      isLoading: false,
      error: null,
    });
    useProducts.mockReturnValue({
      data: mockProducts.slice(1, 4), // Related products
    });

    renderWithProviders(<ProductDetail productId="1" />);

    await waitFor(() => {
      const addToCartButtons = screen.getAllByText('Add to Cart');
      expect(addToCartButtons.length).toBeGreaterThan(0);
    });

    const addToCartButtons = screen.getAllByText('Add to Cart');
    fireEvent.click(addToCartButtons[0]); // Click the first one (main product)

    expect(mockAddToCart).toHaveBeenCalledWith(mockProduct, 1);
  });

  it('shows loading skeleton when loading', () => {
    // Mock useProduct hook
    const { useProduct, useProducts } = jest.requireMock('@/hooks');
    useProduct.mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });
    useProducts.mockReturnValue({
      data: [],
    });

    renderWithProviders(<ProductDetail productId="1" />);

    // Check for skeleton elements
    expect(screen.getByTestId('skeleton-image')).toBeInTheDocument();
    expect(screen.getAllByTestId('skeleton-text')).toHaveLength(4); // SkeletonText creates 4 skeleton elements
  });

  it('shows error message when product not found', async () => {
    // Mock useProduct hook
    const { useProduct, useProducts } = jest.requireMock('@/hooks');
    useProduct.mockReturnValue({
      data: null,
      isLoading: false,
      error: new Error('Product not found'),
    });
    useProducts.mockReturnValue({
      data: [],
    });

    renderWithProviders(<ProductDetail productId="999" />);

    await waitFor(() => {
      expect(screen.getByText('Product not found')).toBeInTheDocument();
    });
  });

  it('disables Add to Cart button when product is out of stock', async () => {
    const outOfStockProduct = { ...mockProduct, inStock: false };

    // Mock useProduct hook
    const { useProduct, useProducts } = jest.requireMock('@/hooks');
    useProduct.mockReturnValue({
      data: outOfStockProduct,
      isLoading: false,
      error: null,
    });
    useProducts.mockReturnValue({
      data: [],
    });

    renderWithProviders(<ProductDetail productId="1" />);

    await waitFor(() => {
      const addToCartButton = screen.getByRole('button', {
        name: 'Out of Stock',
      });
      expect(addToCartButton).toBeDisabled();
    });
  });

  it('renders back to catalog button', async () => {
    // Mock useProduct hook
    const { useProduct, useProducts } = jest.requireMock('@/hooks');
    useProduct.mockReturnValue({
      data: mockProduct,
      isLoading: false,
      error: null,
    });
    useProducts.mockReturnValue({
      data: [],
    });

    renderWithProviders(<ProductDetail productId="1" />);

    await waitFor(() => {
      const backButton = screen.getByText('Back to Catalog');
      expect(backButton).toBeInTheDocument();
    });
  });
});
