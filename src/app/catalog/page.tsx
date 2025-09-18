'use client';

import { useState, useCallback } from 'react';
import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Select,
  Input,
  HStack,
  VStack,
  Text,
  Button,
  useToast,
  useColorModeValue,
  Spinner,
  Center,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { useProducts, useCategories, type ProductFilters } from '@/hooks';
import { ProductCard } from '@/components/ui/ProductCard';
import { ProductCardSkeleton } from '@/components/ui/ProductCardSkeleton';
import { debounce } from '@/lib/utils';

export default function CatalogPage() {
  const [filters, setFilters] = useState<ProductFilters>({
    category: 'all',
    search: '',
    sortBy: 'name-asc',
  });

  const toast = useToast();
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const textColor = useColorModeValue('gray.600', 'gray.300');

  // Debounced search to avoid too many API calls
  const debouncedSearch = useCallback(
    debounce((searchTerm: string) => {
      setFilters(prev => ({ ...prev, search: searchTerm }));
    }, 500),
    []
  );

  const { data: products, isLoading, error } = useProducts(filters);
  const { data: categories, isLoading: categoriesLoading } = useCategories();

  const handleCategoryChange = (category: string) => {
    setFilters(prev => ({ ...prev, category }));
  };

  const handleSortChange = (sortBy: string) => {
    setFilters(prev => ({ ...prev, sortBy: sortBy as ProductFilters['sortBy'] }));
  };

  const handleSearchChange = (searchTerm: string) => {
    debouncedSearch(searchTerm);
  };

  const handleProductView = (product: any) => {
    // TODO: Navigate to product detail page
    console.log('View product:', product);
  };

  // Error handling
  if (error) {
    toast({
      title: 'Error loading products',
      description: 'Failed to load products. Please try again.',
      status: 'error',
      duration: 5000,
      isClosable: true,
    });
  }

  return (
    <Box bg={bgColor} minHeight="100vh" py={8}>
      <Container maxW="container.xl">
        <VStack spacing={8} align="stretch">
          <Heading as="h1" size="xl" textAlign="center">
            Product Catalog
          </Heading>

          {/* Filters and Search */}
          <Box
            bg={useColorModeValue('white', 'gray.800')}
            p={6}
            borderRadius="lg"
            shadow="sm"
          >
            <HStack spacing={4} wrap="wrap">
              {/* Category Filter */}
              <Box minW="200px">
                <Text fontSize="sm" fontWeight="medium" mb={2}>
                  Category
                </Text>
                <Select
                  value={filters.category}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  isDisabled={categoriesLoading}
                >
                  {categories?.map((category) => (
                    <option key={category.id} value={category.slug}>
                      {category.name} ({category.productCount})
                    </option>
                  ))}
                </Select>
              </Box>

              {/* Sort Filter */}
              <Box minW="200px">
                <Text fontSize="sm" fontWeight="medium" mb={2}>
                  Sort By
                </Text>
                <Select
                  value={filters.sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                >
                  <option value="name-asc">Name A-Z</option>
                  <option value="name-desc">Name Z-A</option>
                  <option value="price-asc">Price Low to High</option>
                  <option value="price-desc">Price High to Low</option>
                </Select>
              </Box>

              {/* Search Input */}
              <Box flex="1" minW="300px">
                <Text fontSize="sm" fontWeight="medium" mb={2}>
                  Search Products
                </Text>
                <HStack>
                  <Input
                    placeholder="Search products..."
                    value={filters.search}
                    onChange={(e) => handleSearchChange(e.target.value)}
                  />
                  <SearchIcon color="gray.400" />
                </HStack>
              </Box>
            </HStack>
          </Box>

          {/* Products Grid */}
          {isLoading ? (
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 4 }} spacing={6}>
              {Array.from({ length: 8 }).map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))}
            </SimpleGrid>
          ) : error ? (
            <Center py={20}>
              <VStack spacing={4}>
                <Text fontSize="lg" color="red.500">
                  Failed to load products
                </Text>
                <Button
                  colorScheme="blue"
                  onClick={() => window.location.reload()}
                >
                  Try Again
                </Button>
              </VStack>
            </Center>
          ) : !products || products.length === 0 ? (
            <Center py={20}>
              <VStack spacing={4}>
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
                    setFilters({ category: 'all', search: '', sortBy: 'name-asc' });
                  }}
                >
                  Clear Filters
                </Button>
              </VStack>
            </Center>
          ) : (
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 4 }} spacing={6}>
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onView={handleProductView}
                />
              ))}
            </SimpleGrid>
          )}

          {/* Results Count */}
          {products && products.length > 0 && (
            <Text fontSize="sm" color={textColor} textAlign="center">
              Showing {products.length} product{products.length !== 1 ? 's' : ''}
            </Text>
          )}
        </VStack>
      </Container>
    </Box>
  );
}
