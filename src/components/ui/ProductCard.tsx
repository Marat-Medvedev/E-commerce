import {
  Box,
  Heading,
  Text,
  Button,
  Badge,
  HStack,
  VStack,
  RatingGroup,
} from '@chakra-ui/react';
import Image from 'next/image';
import { memo } from 'react';
import type { Product } from '@/types';
import { formatPrice } from '@/lib/utils';
import { useCart } from '@/hooks/useCart';
import { useTheme } from 'next-themes';

interface ProductCardProps {
  product: Product;
  onView?: (product: Product) => void;
}

export const ProductCard = memo(({ product, onView }: ProductCardProps) => {
  const { theme } = useTheme();
  const { addToCart, isInCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <Box
      bg={theme === 'dark' ? 'gray.800' : 'white'}
      borderColor={theme === 'dark' ? 'gray.700' : 'gray.200'}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      transition="all 0.2s"
      _hover={{
        transform: 'translateY(-2px)',
        shadow: 'lg',
        borderColor: theme === 'dark' ? 'blue.400' : 'blue.300',
      }}
      _focusWithin={{
        shadow: 'lg',
        borderColor: theme === 'dark' ? 'blue.500' : 'blue.400',
      }}
      height="100%"
      display="flex"
      flexDirection="column"
      role="article"
      aria-label={`Product: ${product.name}`}
    >
      <Box
        position="relative"
        height="0"
        paddingBottom="75%"
        overflow="hidden"
        width="100%"
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          style={{
            objectFit: 'cover',
          }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src =
              'https://via.placeholder.com/300x200?text=No+Image';
          }}
        />
        {!product.inStock && (
          <Badge
            position="absolute"
            top="2"
            right="2"
            colorScheme="red"
            variant="solid"
          >
            Out of Stock
          </Badge>
        )}
      </Box>

      <Box p={4} height="inherit">
        <VStack align="stretch" gap={3} height="100%">
          <VStack align="stretch" gap={2} flex="1">
            <Heading
              size="md"
              color={theme === 'dark' ? 'white' : 'gray.800'}
              style={{
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {product.name}
            </Heading>

            <Text
              color={theme === 'dark' ? 'gray.300' : 'gray.600'}
              fontSize="sm"
              style={{
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {product.description}
            </Text>

            {product.rating && (
              <HStack gap={2} align="center">
                <RatingGroup.Root
                  colorPalette="orange"
                  readOnly
                  count={5}
                  value={product.rating}
                  size="xs"
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

            <Text
              fontSize="lg"
              fontWeight="bold"
              color={theme === 'dark' ? 'blue.300' : 'blue.600'}
            >
              {formatPrice(product.price)}
            </Text>
          </VStack>

          <HStack gap={2}>
            <Button
              colorScheme="blue"
              variant="outline"
              size="sm"
              onClick={() => onView?.(product)}
              disabled={!product.inStock}
              flex={1}
              _focus={{
                boxShadow: '0 0 0 3px rgba(66, 153, 225, 0.5)',
              }}
              aria-label={`View details for ${product.name}`}
            >
              View Details
            </Button>
            <Button
              colorScheme="blue"
              size="sm"
              onClick={handleAddToCart}
              disabled={!product.inStock || isInCart(product.id)}
              flex={1}
              _focus={{
                boxShadow: '0 0 0 3px rgba(66, 153, 225, 0.5)',
              }}
              aria-label={
                isInCart(product.id)
                  ? `${product.name} is already in cart`
                  : `Add ${product.name} to cart`
              }
            >
              {isInCart(product.id) ? 'In Cart' : 'Add to Cart'}
            </Button>
          </HStack>
        </VStack>
      </Box>
    </Box>
  );
});

ProductCard.displayName = 'ProductCard';
