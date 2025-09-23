import { useQuery } from '@tanstack/react-query';
import type { Product } from '@/types';

export interface ProductFilters {
  category?: string;
  search?: string;
  sortBy?:
    | 'price-asc'
    | 'price-desc'
    | 'name-asc'
    | 'name-desc'
    | 'rating-asc'
    | 'rating-desc';
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
    image:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=200&fit=crop',
    category: 'Electronics',
    inStock: true,
    rating: 4.8,
  },
  {
    id: '2',
    name: 'Smart Watch',
    description: 'Feature-rich smartwatch with health monitoring',
    price: 299.99,
    image:
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=200&fit=crop',
    category: 'Electronics',
    inStock: true,
    rating: 3.2,
  },
  {
    id: '3',
    name: 'Running Shoes',
    description: 'Comfortable running shoes for all terrains',
    price: 129.99,
    image:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=200&fit=crop',
    category: 'Sports',
    inStock: true,
    rating: 4.9,
  },
  {
    id: '4',
    name: 'Coffee Maker',
    description: 'Automatic coffee maker with programmable settings',
    price: 89.99,
    image:
      'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=300&h=200&fit=crop',
    category: 'Home',
    inStock: false,
    rating: 2.8,
  },
  {
    id: '5',
    name: 'Laptop Stand',
    description: 'Adjustable laptop stand for better ergonomics',
    price: 49.99,
    image:
      'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=200&fit=crop',
    category: 'Office',
    inStock: true,
    rating: 4.6,
  },
  {
    id: '6',
    name: 'Yoga Mat',
    description: 'Non-slip yoga mat for home workouts',
    price: 39.99,
    image:
      'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=200&fit=crop',
    category: 'Sports',
    inStock: true,
    rating: 3.7,
  },
  {
    id: '7',
    name: 'Bluetooth Speaker',
    description: 'Portable wireless speaker with deep bass',
    price: 79.99,
    image:
      'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&h=200&fit=crop',
    category: 'Electronics',
    inStock: true,
    rating: 4.1,
  },
  {
    id: '8',
    name: 'Gaming Mouse',
    description: 'High-precision gaming mouse with RGB lighting',
    price: 59.99,
    image:
      'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=200&fit=crop',
    category: 'Electronics',
    inStock: true,
    rating: 2.3,
  },
  {
    id: '9',
    name: 'Desk Lamp',
    description: 'LED desk lamp with adjustable brightness',
    price: 34.99,
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop',
    category: 'Office',
    inStock: true,
    rating: 4.4,
  },
  {
    id: '10',
    name: 'Water Bottle',
    description: 'Insulated stainless steel water bottle',
    price: 24.99,
    image:
      'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=300&h=200&fit=crop',
    category: 'Sports',
    inStock: false,
    rating: 1.9,
  },
  {
    id: '11',
    name: 'Mechanical Keyboard',
    description: 'RGB mechanical keyboard with tactile switches',
    price: 149.99,
    image:
      'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=300&h=200&fit=crop',
    category: 'Electronics',
    inStock: true,
    rating: 4.7,
  },
  {
    id: '12',
    name: 'Throw Pillow',
    description: 'Decorative throw pillow for home decor',
    price: 19.99,
    image:
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop',
    category: 'Home',
    inStock: true,
    rating: 3.1,
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
        case 'rating-asc':
          return (a.rating || 0) - (b.rating || 0);
        case 'rating-desc':
          return (b.rating || 0) - (a.rating || 0);
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
