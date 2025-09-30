'use client';

import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  SimpleGrid,
} from '@chakra-ui/react';
import { useProducts } from '@/hooks';
import { ProductCard } from '@/components/ui/ProductCard';
import { ProductCardSkeleton } from '@/components/ui/ProductCardSkeleton';
import { useTheme } from 'next-themes';
import {
  FaArrowRight,
  FaStar,
  FaTruck,
  FaShieldAlt,
  FaHeadset,
} from 'react-icons/fa';

export default function Home() {
  // Get featured products (first 6 products)
  const { data: featuredProducts, isLoading } = useProducts({ limit: 6 });
  const { theme } = useTheme();

  return (
    <Box minHeight="100vh" bg="gray.50" _dark={{ bg: 'gray.900' }}>
      {/* Hero Section */}
      <Box
        bg="linear-gradient(135deg, brand.50 0%, brand.100 100%)"
        _dark={{ bg: 'linear-gradient(135deg, gray.900 0%, gray.800 100%)' }}
        py={{ base: 12, md: 20 }}
        position="relative"
        overflow="hidden"
      >
        <Container maxW="container.xl">
          <VStack gap={8} align="center" textAlign="center">
            <VStack gap={4} maxW="800px">
              <Heading
                as="h1"
                size={{ base: '2xl', md: '4xl' }}
                color="gray.900"
                _dark={{ color: 'white' }}
                fontWeight="bold"
                lineHeight="shorter"
              >
                Welcome to Our{' '}
                <Text
                  as="span"
                  color={theme === 'dark' ? 'blue.300' : 'blue.600'}
                >
                  E-Commerce Store
                </Text>
              </Heading>

              <Text
                fontSize={{ base: 'lg', md: 'xl' }}
                color="gray.600"
                _dark={{ color: 'gray.300' }}
                maxW="600px"
                lineHeight="relaxed"
              >
                Discover amazing products with unbeatable prices. Shop with
                confidence and enjoy fast, secure checkout.
              </Text>

              <HStack gap={4} wrap="wrap" justify="center">
                <Button
                  onClick={() => {
                    window.location.href = '/catalog';
                  }}
                  colorScheme="blue"
                  size={{ base: 'md', md: 'lg' }}
                  _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }}
                  transition="all 0.2s"
                >
                  Shop Now
                  <FaArrowRight style={{ marginLeft: '8px' }} />
                </Button>

                <Button
                  onClick={() => {
                    window.location.href = '/catalog';
                  }}
                  variant="outline"
                  size={{ base: 'md', md: 'lg' }}
                  _hover={{
                    bg: 'gray.100',
                    _dark: { bg: 'gray.700' },
                    transform: 'translateY(-2px)',
                  }}
                  transition="all 0.2s"
                >
                  Browse Products
                </Button>
              </HStack>
            </VStack>
          </VStack>
        </Container>
      </Box>

      {/* Features Section */}
      <Box py={{ base: 12, md: 16 }} bg="white" _dark={{ bg: 'gray.800' }}>
        <Container maxW="container.xl">
          <VStack gap={12}>
            <VStack gap={4} textAlign="center">
              <Heading size="xl" color="gray.900" _dark={{ color: 'white' }}>
                Why Choose Us?
              </Heading>
              <Text
                fontSize="lg"
                color="gray.600"
                _dark={{ color: 'gray.300' }}
                maxW="600px"
              >
                We provide the best shopping experience with quality products
                and excellent service.
              </Text>
            </VStack>

            <SimpleGrid columns={{ base: 1, md: 3 }} gap={8} w="100%">
              <VStack
                gap={4}
                textAlign="center"
                p={6}
                bg="gray.50"
                _dark={{ bg: 'gray.700' }}
                borderRadius="lg"
                shadow="sm"
              >
                <Box
                  color={theme === 'dark' ? 'blue.300' : 'blue.500'}
                  fontSize="3xl"
                >
                  <FaTruck />
                </Box>
                <Heading size="md" color="gray.900" _dark={{ color: 'white' }}>
                  Fast Shipping
                </Heading>
                <Text color="gray.600" _dark={{ color: 'gray.300' }}>
                  Free shipping on orders over $50. Get your products delivered
                  quickly and safely.
                </Text>
              </VStack>

              <VStack
                gap={4}
                textAlign="center"
                p={6}
                bg="gray.50"
                _dark={{ bg: 'gray.700' }}
                borderRadius="lg"
                shadow="sm"
              >
                <Box
                  color={theme === 'dark' ? 'blue.300' : 'blue.500'}
                  fontSize="3xl"
                >
                  <FaShieldAlt />
                </Box>
                <Heading size="md" color="gray.900" _dark={{ color: 'white' }}>
                  Secure Payment
                </Heading>
                <Text color="gray.600" _dark={{ color: 'gray.300' }}>
                  Your payment information is encrypted and secure. Shop with
                  confidence.
                </Text>
              </VStack>

              <VStack
                gap={4}
                textAlign="center"
                p={6}
                bg="gray.50"
                _dark={{ bg: 'gray.700' }}
                borderRadius="lg"
                shadow="sm"
              >
                <Box
                  color={theme === 'dark' ? 'blue.300' : 'blue.500'}
                  fontSize="3xl"
                >
                  <FaHeadset />
                </Box>
                <Heading size="md" color="gray.900" _dark={{ color: 'white' }}>
                  24/7 Support
                </Heading>
                <Text color="gray.600" _dark={{ color: 'gray.300' }}>
                  Our customer support team is here to help you with any
                  questions or concerns.
                </Text>
              </VStack>
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* Featured Products Section */}
      <Box py={{ base: 12, md: 16 }} bg="gray.50" _dark={{ bg: 'gray.900' }}>
        <Container maxW="container.xl">
          <VStack gap={8}>
            <VStack gap={4} textAlign="center">
              <Heading size="xl" color="gray.900" _dark={{ color: 'white' }}>
                Featured Products
              </Heading>
              <Text
                fontSize="lg"
                color="gray.600"
                _dark={{ color: 'gray.300' }}
                maxW="600px"
              >
                Discover our most popular and highly-rated products.
              </Text>
            </VStack>

            {isLoading ? (
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6} w="100%">
                {Array.from({ length: 6 }).map((_, index) => (
                  <ProductCardSkeleton key={index} />
                ))}
              </SimpleGrid>
            ) : (
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6} w="100%">
                {featuredProducts?.slice(0, 6).map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onView={(product) => {
                      window.location.href = `/product/${product.id}`;
                    }}
                  />
                ))}
              </SimpleGrid>
            )}

            <Button
              onClick={() => {
                window.location.href = '/catalog';
              }}
              colorScheme="blue"
              size="lg"
              _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }}
              transition="all 0.2s"
            >
              View All Products
              <FaArrowRight style={{ marginLeft: '8px' }} />
            </Button>
          </VStack>
        </Container>
      </Box>

      {/* Stats Section */}
      <Box
        py={{ base: 12, md: 16 }}
        bg="gray.100"
        color="gray.800"
        _dark={{ bg: 'gray.800', color: 'white' }}
      >
        <Container maxW="container.xl">
          <SimpleGrid columns={{ base: 2, md: 4 }} gap={8} textAlign="center">
            <VStack gap={2}>
              <Text fontSize="3xl" fontWeight="bold">
                10K+
              </Text>
              <Text fontSize="sm" opacity={0.9}>
                Happy Customers
              </Text>
            </VStack>

            <VStack gap={2}>
              <Text fontSize="3xl" fontWeight="bold">
                500+
              </Text>
              <Text fontSize="sm" opacity={0.9}>
                Products
              </Text>
            </VStack>

            <VStack gap={2}>
              <Text fontSize="3xl" fontWeight="bold">
                4.9
              </Text>
              <HStack gap={1}>
                <FaStar />
                <Text fontSize="sm" opacity={0.9}>
                  Average Rating
                </Text>
              </HStack>
            </VStack>

            <VStack gap={2}>
              <Text fontSize="3xl" fontWeight="bold">
                24/7
              </Text>
              <Text fontSize="sm" opacity={0.9}>
                Customer Support
              </Text>
            </VStack>
          </SimpleGrid>
        </Container>
      </Box>
    </Box>
  );
}
