import { useQuery } from '@tanstack/react-query';
import { mockProducts } from './useProducts';

export interface Category {
  id: string;
  name: string;
  slug: string;
  productCount: number;
}

// Base categories without counts
const baseCategories: Omit<Category, 'productCount'>[] = [
  { id: '1', name: 'All', slug: 'all' },
  { id: '2', name: 'Electronics', slug: 'electronics' },
  { id: '3', name: 'Sports', slug: 'sports' },
  { id: '4', name: 'Home', slug: 'home' },
  { id: '5', name: 'Office', slug: 'office' },
];

const calculateProductCounts = (): Category[] => {
  // Count products by category
  const categoryCounts = mockProducts.reduce(
    (acc, product) => {
      const category = product.category.toLowerCase();
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  // Add total count
  const totalCount = mockProducts.length;

  return baseCategories.map((category) => ({
    ...category,
    productCount:
      category.slug === 'all' ? totalCount : categoryCounts[category.slug] || 0,
  }));
};

const fetchCategories = async (): Promise<Category[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));
  return calculateProductCounts();
};

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
  });
};
