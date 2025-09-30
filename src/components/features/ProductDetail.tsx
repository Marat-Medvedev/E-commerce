'use client';

import {
  Box,
  Heading,
  Text,
  Button,
  Badge,
  HStack,
  VStack,
  RatingGroup,
  Container,
  Grid,
  GridItem,
  Skeleton,
  SkeletonText,
} from '@chakra-ui/react';
import Image from 'next/image';
import { useProduct, useProducts } from '@/hooks';
import { useCart } from '@/hooks/useCart';
import { formatPrice } from '@/lib/utils';
import { ProductCard } from '@/components/ui/ProductCard';
import { useMemo } from 'react';
import { useTheme } from 'next-themes';

interface ProductDetailProps {
  productId: string;
}

export const ProductDetail = ({ productId }: ProductDetailProps) => {
  const { data: product, isLoading, error } = useProduct(productId);
  const { addToCart } = useCart();
  const { theme } = useTheme();

  // Fetch related products (same category, limit 6)
  const { data: relatedProducts = [] } = useProducts({
    category: product?.category,
    limit: 6,
  });

  // Filter out the current product from related products
  const filteredRelatedProducts = useMemo(() => {
    return relatedProducts.filter((p) => p.id !== productId);
  }, [relatedProducts, productId]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, 1);
      // Simple success feedback - in a real app, you might use a toast library
      alert(`${product.name} has been added to your cart`);
    }
  };

  if (isLoading) {
    return (
      <Container maxW="container.xl" py={8}>
        <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }} gap={8}>
          <GridItem>
            <Skeleton
              height="400px"
              borderRadius="lg"
              data-testid="skeleton-image"
            />
          </GridItem>
          <GridItem>
            <VStack align="stretch" gap={4}>
              <Skeleton height="32px" />
              <Skeleton height="24px" width="120px" />
              <SkeletonText noOfLines={4} data-testid="skeleton-text" />
              <Skeleton height="40px" width="200px" />
            </VStack>
          </GridItem>
        </Grid>
      </Container>
    );
  }

  if (error || !product) {
    return (
      <Container maxW="container.xl" py={8}>
        <VStack align="center" gap={4}>
          <Text fontSize="lg" color={theme === 'dark' ? 'red.300' : 'red.500'}>
            Product not found
          </Text>
          <Button onClick={() => window.history.back()}>Go Back</Button>
        </VStack>
      </Container>
    );
  }

  return (
    <Box bg={theme === 'dark' ? 'gray.900' : 'white'} minH="100vh">
      <Container maxW="container.xl" py={8}>
        {/* Back to Catalog Button */}
        <Box mb={6}>
          <Button
            variant="outline"
            size="sm"
            onClick={() => (window.location.href = '/catalog')}
            bg={theme === 'dark' ? 'gray.800' : 'white'}
            color={theme === 'dark' ? 'white' : 'gray.800'}
            borderColor={theme === 'dark' ? 'gray.600' : 'gray.300'}
            _hover={{
              bg: theme === 'dark' ? 'gray.700' : 'gray.50',
              borderColor: theme === 'dark' ? 'gray.500' : 'gray.400',
            }}
            _focus={{
              boxShadow: '0 0 0 3px rgba(66, 153, 225, 0.5)',
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
            Back to Catalog
          </Button>
        </Box>

        <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }} gap={8}>
          {/* Product Image */}
          <GridItem>
            <Box
              position="relative"
              height="400px"
              borderRadius="lg"
              overflow="hidden"
            >
              <Image
                src={product.image}
                alt={product.name}
                fill
                style={{
                  objectFit: 'cover',
                }}
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
                onError={(e) => {
                  e.currentTarget.src =
                    'https://via.placeholder.com/600x400?text=No+Image';
                }}
              />
              {!product.inStock && (
                <Badge
                  position="absolute"
                  top="4"
                  right="4"
                  colorScheme="red"
                  variant="solid"
                  fontSize="sm"
                  px={3}
                  py={1}
                  bg={theme === 'dark' ? 'red.700' : 'red.500'}
                  color="white"
                >
                  Out of Stock
                </Badge>
              )}
            </Box>
          </GridItem>

          {/* Product Info */}
          <GridItem>
            <VStack align="stretch" gap={6}>
              <VStack align="stretch" gap={3}>
                <Heading
                  size="xl"
                  color={theme === 'dark' ? 'white' : 'gray.800'}
                >
                  {product.name}
                </Heading>

                <HStack gap={4} align="center">
                  <Text
                    fontSize="2xl"
                    fontWeight="bold"
                    color={theme === 'dark' ? 'blue.300' : 'blue.600'}
                  >
                    {formatPrice(product.price)}
                  </Text>
                  {product.rating && (
                    <HStack gap={2} align="center">
                      <RatingGroup.Root
                        colorPalette="orange"
                        readOnly
                        count={5}
                        value={product.rating}
                        size="sm"
                      >
                        <RatingGroup.HiddenInput />
                        <RatingGroup.Control />
                      </RatingGroup.Root>
                      <Text
                        fontSize="sm"
                        color={theme === 'dark' ? 'gray.300' : 'gray.600'}
                        fontWeight="medium"
                      >
                        {product.rating}
                      </Text>
                    </HStack>
                  )}
                </HStack>

                <Text
                  fontSize="lg"
                  color={theme === 'dark' ? 'gray.300' : 'gray.600'}
                >
                  {product.description}
                </Text>

                <HStack gap={2}>
                  <Text
                    fontWeight="medium"
                    color={theme === 'dark' ? 'white' : 'gray.800'}
                  >
                    Category:
                  </Text>
                  <Badge
                    colorScheme="blue"
                    variant="subtle"
                    bg={theme === 'dark' ? 'blue.800' : 'blue.100'}
                    color={theme === 'dark' ? 'blue.200' : 'blue.700'}
                  >
                    {product.category}
                  </Badge>
                </HStack>
              </VStack>

              <Button
                colorScheme="blue"
                size="lg"
                onClick={handleAddToCart}
                disabled={!product.inStock}
                width="100%"
                _focus={{
                  boxShadow: '0 0 0 3px rgba(66, 153, 225, 0.5)',
                }}
                aria-label={
                  product.inStock
                    ? `Add ${product.name} to cart`
                    : `${product.name} is out of stock`
                }
              >
                {product.inStock ? 'Add to Cart' : 'Out of Stock'}
              </Button>
            </VStack>
          </GridItem>
        </Grid>

        {/* Related Products */}
        {filteredRelatedProducts.length > 0 && (
          <Box mt={16}>
            <Heading
              size="lg"
              mb={6}
              color={theme === 'dark' ? 'white' : 'gray.800'}
            >
              Related Products
            </Heading>
            <Grid
              templateColumns={{
                base: '1fr',
                md: 'repeat(2, 1fr)',
                lg: 'repeat(3, 1fr)',
                xl: 'repeat(6, 1fr)',
              }}
              gap={4}
            >
              {filteredRelatedProducts.map((relatedProduct) => (
                <GridItem key={relatedProduct.id}>
                  <ProductCard
                    product={relatedProduct}
                    onView={(product) => {
                      window.location.href = `/product/${product.id}`;
                    }}
                  />
                </GridItem>
              ))}
            </Grid>
          </Box>
        )}
      </Container>
    </Box>
  );
};
