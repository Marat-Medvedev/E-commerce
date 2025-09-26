import { useQuery } from '@tanstack/react-query';
import type { Product } from '@/types';
import { mockProducts } from './useProducts';

const fetchProduct = async (id: string): Promise<Product> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  const product = mockProducts.find((p) => p.id === id);

  if (!product) {
    throw new Error(`Product with id ${id} not found`);
  }

  return product;
};

export const useProduct = (id: string) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProduct(id),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    enabled: !!id, // Only run query if id is provided
  });
};
