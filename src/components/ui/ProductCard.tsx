import {
  Box,
  Card,
  CardBody,
  Image,
  Heading,
  Text,
  Button,
  Badge,
  HStack,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import type { Product } from '@/types';
import { formatPrice } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  onView?: (product: Product) => void;
}

export const ProductCard = ({ product, onView }: ProductCardProps) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const textColor = useColorModeValue('gray.600', 'gray.300');

  return (
    <Card
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
    >
      <Box position="relative">
        <Image
          src={product.image}
          alt={product.name}
          width="100%"
          height="200px"
          objectFit="cover"
          fallbackSrc="https://via.placeholder.com/300x200?text=No+Image"
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

      <CardBody>
        <VStack align="stretch" spacing={3} height="100%">
          <VStack align="stretch" spacing={2} flex="1">
            <Heading size="md" noOfLines={2}>
              {product.name}
            </Heading>
            
            <Text color={textColor} fontSize="sm" noOfLines={2}>
              {product.description}
            </Text>

            {product.rating && (
              <HStack spacing={1}>
                <StarIcon color="yellow.400" />
                <Text fontSize="sm" color={textColor}>
                  {product.rating}
                </Text>
              </HStack>
            )}

            <Text fontSize="lg" fontWeight="bold" color="blue.500">
              {formatPrice(product.price)}
            </Text>
          </VStack>

          <Button
            colorScheme="blue"
            variant="outline"
            size="sm"
            onClick={() => onView?.(product)}
            isDisabled={!product.inStock}
            width="100%"
          >
            View Details
          </Button>
        </VStack>
      </CardBody>
    </Card>
  );
};
