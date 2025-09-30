'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import {
  VStack,
  HStack,
  Text,
  Button,
  Image,
  Box,
  IconButton,
  CloseButton,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import {
  remove,
  setQty,
  clear,
  selectSubtotal,
  selectTotalQty,
} from '@/store/slices/cartSlice';
import { formatPrice } from '@/lib/utils';
import { useTheme } from 'next-themes';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const items = useSelector((state: RootState) => state.cart.items);
  const subtotal = useSelector(selectSubtotal);
  const totalQty = useSelector(selectTotalQty);

  const handleQuantityChange = (id: string, newQty: number) => {
    if (newQty < 1) {
      dispatch(remove(id));
    } else {
      dispatch(setQty({ id, qty: newQty }));
    }
  };

  const handleRemoveItem = (id: string) => {
    dispatch(remove(id));
  };

  const handleClearCart = () => {
    dispatch(clear());
  };

  const handleCheckout = () => {
    onClose();
    router.push('/checkout');
  };

  if (!isOpen) return null;

  return (
    <Box
      position="fixed"
      top="0"
      right="0"
      height="100vh"
      width="400px"
      bg={theme === 'dark' ? 'gray.800' : 'white'}
      boxShadow="lg"
      zIndex={1000}
      borderLeft="1px solid"
      borderColor={theme === 'dark' ? 'gray.700' : 'gray.200'}
    >
      <Box
        p={4}
        borderBottom="1px solid"
        borderColor={theme === 'dark' ? 'gray.700' : 'gray.200'}
      >
        <HStack justify="space-between" align="center">
          <Text
            fontSize="xl"
            fontWeight="bold"
            color={theme === 'dark' ? 'white' : 'gray.800'}
          >
            Shopping Cart ({totalQty} {totalQty === 1 ? 'item' : 'items'})
          </Text>
          <CloseButton onClick={onClose} />
        </HStack>
      </Box>

      <Box p={4} height="calc(100vh - 80px)" overflowY="auto">
        {items.length === 0 ? (
          <VStack gap={4} py={8}>
            <Text
              fontSize="lg"
              color={theme === 'dark' ? 'gray.400' : 'gray.500'}
            >
              Your cart is empty
            </Text>
            <Button colorScheme="blue" onClick={onClose}>
              Continue Shopping
            </Button>
          </VStack>
        ) : (
          <VStack gap={4} align="stretch">
            {/* Cart Items */}
            <VStack gap={3} align="stretch">
              {items.map((item) => (
                <Box
                  key={item.id}
                  p={3}
                  border="1px solid"
                  borderColor={theme === 'dark' ? 'gray.700' : 'gray.200'}
                  borderRadius="md"
                  bg={theme === 'dark' ? 'gray.700' : 'white'}
                >
                  <HStack gap={3} align="start">
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      boxSize="60px"
                      objectFit="cover"
                      borderRadius="md"
                      onError={(e) => {
                        e.currentTarget.src =
                          'https://via.placeholder.com/60x60?text=No+Image';
                      }}
                    />

                    <VStack align="start" gap={1} flex={1}>
                      <Text
                        fontSize="sm"
                        fontWeight="medium"
                        color={theme === 'dark' ? 'white' : 'gray.800'}
                        style={{
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}
                      >
                        {item.title}
                      </Text>
                      <Text
                        fontSize="sm"
                        color={theme === 'dark' ? 'blue.300' : 'blue.600'}
                        fontWeight="bold"
                      >
                        {formatPrice(item.price)}
                      </Text>

                      {/* Quantity Controls */}
                      <HStack gap={2}>
                        <Button
                          size="xs"
                          variant="outline"
                          onClick={() =>
                            handleQuantityChange(item.id, item.qty - 1)
                          }
                          aria-label={`Decrease quantity of ${item.title}`}
                        >
                          -
                        </Button>
                        <Text
                          fontSize="sm"
                          minW="20px"
                          textAlign="center"
                          color={theme === 'dark' ? 'white' : 'gray.800'}
                        >
                          {item.qty}
                        </Text>
                        <Button
                          size="xs"
                          variant="outline"
                          onClick={() =>
                            handleQuantityChange(item.id, item.qty + 1)
                          }
                          aria-label={`Increase quantity of ${item.title}`}
                        >
                          +
                        </Button>
                      </HStack>
                    </VStack>

                    <VStack align="end" gap={1}>
                      <Text
                        fontSize="sm"
                        fontWeight="bold"
                        color={theme === 'dark' ? 'white' : 'gray.800'}
                      >
                        {formatPrice(item.price * item.qty)}
                      </Text>
                      <IconButton
                        size="xs"
                        variant="ghost"
                        colorScheme="red"
                        onClick={() => handleRemoveItem(item.id)}
                        aria-label={`Remove ${item.title} from cart`}
                      >
                        ×
                      </IconButton>
                    </VStack>
                  </HStack>
                </Box>
              ))}
            </VStack>

            {/* Cart Summary */}
            <Box
              p={4}
              bg={theme === 'dark' ? 'gray.700' : 'gray.50'}
              borderRadius="md"
              border="1px solid"
              borderColor={theme === 'dark' ? 'gray.600' : 'gray.200'}
            >
              <VStack gap={3} align="stretch">
                <HStack justify="space-between">
                  <Text
                    fontSize="lg"
                    fontWeight="bold"
                    color={theme === 'dark' ? 'white' : 'gray.800'}
                  >
                    Subtotal:
                  </Text>
                  <Text
                    fontSize="lg"
                    fontWeight="bold"
                    color={theme === 'dark' ? 'blue.300' : 'blue.600'}
                  >
                    {formatPrice(subtotal)}
                  </Text>
                </HStack>

                <HStack gap={2}>
                  <Button
                    variant="outline"
                    onClick={handleClearCart}
                    size="sm"
                    colorScheme="red"
                    flex={1}
                  >
                    Clear Cart
                  </Button>
                  <Button
                    colorScheme="blue"
                    onClick={handleCheckout}
                    size="sm"
                    flex={1}
                  >
                    Go to Checkout
                  </Button>
                </HStack>
              </VStack>
            </Box>
          </VStack>
        )}
      </Box>
    </Box>
  );
};

export default CartDrawer;
