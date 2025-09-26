import { useQuery } from '@tanstack/react-query';
import type { Product } from '@/types';
import type { ProductFilters } from './useProducts';

// Mock data for testing
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Test Product 1',
    description: 'Test product for state testing',
    price: 99.99,
    image:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=200&fit=crop',
    category: 'Electronics',
    inStock: true,
    rating: 4.5,
  },
  {
    id: '2',
    name: 'Test Product 2',
    description: 'Another test product',
    price: 149.99,
    image:
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=200&fit=crop',
    category: 'Electronics',
    inStock: true,
    rating: 3.8,
  },
];

// Simulate different API responses based on test state
const simulateApiCall = async (
  filters: ProductFilters,
  testState: string
): Promise<Product[]> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  switch (testState) {
    case 'loading':
      // Keep loading indefinitely for testing
      return new Promise(() => {});

    case 'error':
      throw new Error('Failed to load products');

    case 'network-error':
      throw new Error('Network request failed');

    case 'timeout':
      throw new Error('Request timeout');

    case 'server-error':
      throw new Error('Internal server error (500)');

    case 'not-found':
      throw new Error('Products not found (404)');

    case 'empty':
      return [];

    case 'normal':
    default:
      return mockProducts;
  }
};

export function useProductsTest(
  filters: ProductFilters,
  testState: string = 'normal'
) {
  return useQuery({
    queryKey: ['products-test', filters, testState],
    queryFn: () => simulateApiCall(filters, testState),
    retry: false, // Don't retry for testing
    staleTime: 0, // Always fresh for testing
  });
}
