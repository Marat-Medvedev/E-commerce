'use client';

import { useState, useCallback, useRef, useMemo, useEffect } from 'react';
import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Input,
  InputGroup,
  HStack,
  VStack,
  Text,
  Button,
  Center,
  CloseButton,
} from '@chakra-ui/react';
import { useProducts, useCategories, type ProductFilters } from '@/hooks';
import type { Product } from '@/types';
import { ProductCard } from '@/components/ui/ProductCard';
import { ProductCardSkeleton } from '@/components/ui/ProductCardSkeleton';
import { LuSearch } from 'react-icons/lu';

export default function CatalogPage() {
  const [filters, setFilters] = useState<ProductFilters>({
    category: 'all',
    search: '',
    sortBy: 'name-asc',
  });

  // Separate state for immediate input display
  const [searchInput, setSearchInput] = useState('');

  const bgColor = 'gray.50';
  const textColor = 'gray.600';
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Optimized debounced search with immediate input feedback
  const debouncedSearch = useCallback((searchTerm: string) => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    searchTimeoutRef.current = setTimeout(() => {
      setFilters((prev) => ({ ...prev, search: searchTerm }));
    }, 300); // Reduced from 500ms to 300ms for better responsiveness
  }, []);

  const { data: products, isLoading, error } = useProducts(filters);
  const { data: categories, isLoading: categoriesLoading } = useCategories();

  // Memoized handlers to prevent unnecessary re-renders
  const handleCategoryChange = useCallback((category: string) => {
    setFilters((prev) => ({ ...prev, category }));
  }, []);

  const handleSortChange = useCallback((sortBy: string) => {
    setFilters((prev) => ({
      ...prev,
      sortBy: sortBy as ProductFilters['sortBy'],
    }));
  }, []);

  const handleSearchChange = useCallback(
    (searchTerm: string) => {
      setSearchInput(searchTerm); // Immediate UI update
      debouncedSearch(searchTerm); // Debounced API call
    },
    [debouncedSearch]
  );

  const handleClearSearch = useCallback(() => {
    setSearchInput(''); // Clear input immediately
    setFilters((prev) => ({ ...prev, search: '' })); // Clear search filter
    inputRef.current?.focus(); // Focus the input after clearing
  }, []);

  const handleProductView = useCallback((product: Product) => {
    // TODO: Navigate to product detail page
    console.log('View product:', product);
  }, []);

  // Memoized products grid to prevent unnecessary re-renders
  const productsGrid = useMemo(() => {
    if (isLoading) {
      return (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 4 }} gap={6}>
          {Array.from({ length: 8 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </SimpleGrid>
      );
    }

    if (error) {
      return (
        <Center py={20}>
          <VStack gap={4}>
            <Text fontSize="lg" color="red.500">
              Failed to load products
            </Text>
            <Button colorScheme="blue" onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </VStack>
        </Center>
      );
    }

    if (!products || products.length === 0) {
      return (
        <Center py={20}>
          <VStack gap={4}>
            <Text fontSize="lg" color={textColor}>
              No products found
            </Text>
            <Text fontSize="sm" color={textColor} textAlign="center">
              Try adjusting your filters or search terms
            </Text>
            <Button
              colorScheme="blue"
              variant="outline"
              onClick={() => {
                setFilters({
                  category: 'all',
                  search: '',
                  sortBy: 'name-asc',
                });
                setSearchInput('');
              }}
            >
              Clear Filters
            </Button>
          </VStack>
        </Center>
      );
    }

    return (
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 4 }} gap={6}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onView={handleProductView}
          />
        ))}
      </SimpleGrid>
    );
  }, [isLoading, error, products, textColor, handleProductView]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  // Error handling
  if (error) {
    console.error('Error loading products:', error);
  }

  return (
    <Box bg={bgColor} minHeight="100vh" py={8}>
      <Container maxW="container.xl">
        <VStack gap={8} align="stretch">
          <Heading as="h1" size="xl" textAlign="center">
            Product Catalog
          </Heading>

          {/* Filters and Search */}
          <Box bg="white" p={6} borderRadius="lg" shadow="sm">
            <HStack gap={4} wrap="wrap">
              {/* Category Filter */}
              <Box minW="200px">
                <Text fontSize="sm" fontWeight="medium" mb={2}>
                  Category
                </Text>
                <select
                  value={filters.category}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  disabled={categoriesLoading}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '6px',
                    fontSize: '14px',
                    backgroundColor: 'white',
                  }}
                >
                  {categories?.map((category) => (
                    <option key={category.id} value={category.slug}>
                      {category.name} ({category.productCount})
                    </option>
                  ))}
                </select>
              </Box>

              {/* Sort Filter */}
              <Box minW="200px">
                <Text fontSize="sm" fontWeight="medium" mb={2}>
                  Sort By
                </Text>
                <select
                  value={filters.sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '6px',
                    fontSize: '14px',
                    backgroundColor: 'white',
                  }}
                >
                  <option value="name-asc">Name A-Z</option>
                  <option value="name-desc">Name Z-A</option>
                  <option value="price-asc">Price Low to High</option>
                  <option value="price-desc">Price High to Low</option>
                  <option value="rating-asc">Rating Low to High</option>
                  <option value="rating-desc">Rating High to Low</option>
                </select>
              </Box>

              {/* Search Input */}
              <Box flex="1" minW="300px">
                <Text fontSize="sm" fontWeight="medium" mb={2}>
                  Search Products
                </Text>
                <InputGroup
                  startElement={<LuSearch />}
                  endElement={
                    searchInput ? (
                      <CloseButton
                        size="xs"
                        onClick={handleClearSearch}
                        me="-2"
                      />
                    ) : undefined
                  }
                >
                  <Input
                    ref={inputRef}
                    placeholder="Search products..."
                    value={searchInput}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    // Performance optimizations
                    autoComplete="off"
                    spellCheck={false}
                    // Prevent unnecessary re-renders
                    style={{
                      willChange: 'auto',
                      transform: 'translateZ(0)', // Force hardware acceleration
                    }}
                  />
                </InputGroup>
              </Box>
            </HStack>
          </Box>

          {/* Products Grid */}
          {productsGrid}

          {/* Results Count */}
          {products && products.length > 0 && (
            <Text fontSize="sm" color={textColor} textAlign="center">
              Showing {products.length} product
              {products.length !== 1 ? 's' : ''}
            </Text>
          )}
        </VStack>
      </Container>
    </Box>
  );
}
