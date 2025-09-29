import {
  Box,
  Image,
  Heading,
  Text,
  Button,
  Badge,
  HStack,
  VStack,
  RatingGroup,
} from '@chakra-ui/react';
import type { Product } from '@/types';
import { formatPrice } from '@/lib/utils';
import { useCart } from '@/hooks/useCart';

interface ProductCardProps {
  product: Product;
  onView?: (product: Product) => void;
}

export const ProductCard = ({ product, onView }: ProductCardProps) => {
  const bgColor = 'white';
  const borderColor = 'gray.200';
  const textColor = 'gray.600';
  const { addToCart, isInCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <Box
      bg={bgColor}
      borderColor={borderColor}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      transition="all 0.2s"
      _hover={{
        transform: 'translateY(-2px)',
        shadow: 'lg',
      }}
      height="100%"
      display="flex"
      flexDirection="column"
    >
      <Box position="relative">
        <Image
          src={product.image}
          alt={product.name}
          width="100%"
          height="200px"
          objectFit="cover"
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
              color={textColor}
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
                <Text fontSize="sm" color={textColor} fontWeight="medium">
                  {product.rating}
                </Text>
              </HStack>
            )}

            <Text fontSize="lg" fontWeight="bold" color="blue.500">
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
            >
              View Details
            </Button>
            <Button
              colorScheme="blue"
              size="sm"
              onClick={handleAddToCart}
              disabled={!product.inStock || isInCart(product.id)}
              flex={1}
            >
              {isInCart(product.id) ? 'In Cart' : 'Add to Cart'}
            </Button>
          </HStack>
        </VStack>
      </Box>
    </Box>
  );
};
