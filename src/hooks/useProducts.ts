import { useQuery } from '@tanstack/react-query';
import type { Product } from '@/types';

export interface ProductFilters {
  category?: string;
  search?: string;
  sortBy?: 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc';
  page?: number;
  limit?: number;
}

// Mock data for development
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Wireless Headphones',
    description: 'High-quality wireless headphones with noise cancellation',
    price: 199.99,
    image: '/api/placeholder/300/200',
    category: 'Electronics',
    inStock: true,
    rating: 4.5,
  },
  {
    id: '2',
    name: 'Smart Watch',
    description: 'Feature-rich smartwatch with health monitoring',
    price: 299.99,
    image: '/api/placeholder/300/200',
    category: 'Electronics',
    inStock: true,
    rating: 4.2,
  },
  {
    id: '3',
    name: 'Running Shoes',
    description: 'Comfortable running shoes for all terrains',
    price: 129.99,
    image: '/api/placeholder/300/200',
    category: 'Sports',
    inStock: true,
    rating: 4.7,
  },
  {
    id: '4',
    name: 'Coffee Maker',
    description: 'Automatic coffee maker with programmable settings',
    price: 89.99,
    image: '/api/placeholder/300/200',
    category: 'Home',
    inStock: false,
    rating: 4.1,
  },
  {
    id: '5',
    name: 'Laptop Stand',
    description: 'Adjustable laptop stand for better ergonomics',
    price: 49.99,
    image: '/api/placeholder/300/200',
    category: 'Office',
    inStock: true,
    rating: 4.3,
  },
  {
    id: '6',
    name: 'Yoga Mat',
    description: 'Non-slip yoga mat for home workouts',
    price: 39.99,
    image: '/api/placeholder/300/200',
    category: 'Sports',
    inStock: true,
    rating: 4.4,
  },
];

const fetchProducts = async (filters: ProductFilters): Promise<Product[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  let filteredProducts = [...mockProducts];

  // Filter by category
  if (filters.category && filters.category !== 'all') {
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.category.toLowerCase() === filters.category?.toLowerCase()
    );
  }

  // Filter by search
  if (filters.search) {
    const searchTerm = filters.search.toLowerCase();
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
    );
  }

  // Sort products
  if (filters.sortBy) {
    filteredProducts.sort((a, b) => {
      switch (filters.sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });
  }

  // Simulate pagination
  const page = filters.page || 1;
  const limit = filters.limit || 12;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  return filteredProducts.slice(startIndex, endIndex);
};

export const useProducts = (filters: ProductFilters = {}) => {
  return useQuery({
    queryKey: ['products', filters],
    queryFn: () => fetchProducts(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};
