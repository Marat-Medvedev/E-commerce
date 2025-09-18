import { useQuery } from '@tanstack/react-query';

export interface Category {
  id: string;
  name: string;
  slug: string;
  productCount: number;
}

// Mock categories data
const mockCategories: Category[] = [
  { id: '1', name: 'All', slug: 'all', productCount: 6 },
  { id: '2', name: 'Electronics', slug: 'electronics', productCount: 2 },
  { id: '3', name: 'Sports', slug: 'sports', productCount: 2 },
  { id: '4', name: 'Home', slug: 'home', productCount: 1 },
  { id: '5', name: 'Office', slug: 'office', productCount: 1 },
];

const fetchCategories = async (): Promise<Category[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockCategories;
};

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
  });
};
