'use client';

import React from 'react';
import {
  Box,
  HStack,
  Button,
  Text,
  useDisclosure,
  Badge,
  Link,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { selectTotalQty } from '@/store/slices/cartSlice';
import CartDrawer from '@/components/features/CartDrawer';
import { ColorModeButton } from '@/components/ui/color-mode';
import { FaShoppingCart } from 'react-icons/fa';
import { useTheme } from 'next-themes';

const Header: React.FC = () => {
  const { open, onOpen, onClose } = useDisclosure();
  const totalQty = useSelector(selectTotalQty);
  const { theme } = useTheme();

  return (
    <>
      <Box
        as="header"
        bg={theme === 'dark' ? 'gray.800' : 'white'}
        shadow="sm"
        borderBottom="1px solid"
        borderColor={theme === 'dark' ? 'gray.700' : 'gray.200'}
        px={4}
        py={3}
        position="sticky"
        top={0}
        zIndex={10}
        backdropFilter="blur(8px)"
      >
        <HStack justify="space-between" align="center" maxW="1200px" mx="auto">
          <Link href="/" _hover={{ textDecoration: 'none' }}>
            <Text
              fontSize="xl"
              fontWeight="bold"
              color={theme === 'dark' ? 'white' : 'gray.800'}
              _hover={{ color: theme === 'dark' ? 'gray.300' : 'gray.600' }}
              transition="color 0.2s"
            >
              E-Commerce Store
            </Text>
          </Link>

          <HStack gap={3}>
            <ColorModeButton />

            <Button
              onClick={onOpen}
              colorScheme="blue"
              variant="outline"
              position="relative"
              size="md"
              minW="auto"
              px={3}
              py={2}
              aria-label={`Shopping cart${totalQty > 0 ? ` with ${totalQty} item${totalQty === 1 ? '' : 's'}` : ' (empty)'}`}
              aria-describedby={totalQty > 0 ? 'cart-count' : undefined}
              _hover={{
                transform: 'translateY(-1px)',
                boxShadow: 'md',
              }}
              _active={{
                transform: 'translateY(0)',
              }}
              _focus={{
                boxShadow: '0 0 0 3px rgba(66, 153, 225, 0.5)',
              }}
              transition="all 0.2s"
            >
              <FaShoppingCart size="18" />
              <Text
                ml={2}
                fontSize="sm"
                fontWeight="medium"
                display={{ base: 'none', sm: 'inline' }}
              >
                Cart
              </Text>
              {totalQty > 0 && (
                <Badge
                  id="cart-count"
                  colorScheme="red"
                  variant="solid"
                  position="absolute"
                  top="-6px"
                  right="-6px"
                  borderRadius="full"
                  minW="18px"
                  h="18px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  fontSize="xs"
                  fontWeight="bold"
                  aria-label={`${totalQty} items in cart`}
                >
                  {totalQty > 99 ? '99+' : totalQty}
                </Badge>
              )}
            </Button>
          </HStack>
        </HStack>
      </Box>

      <CartDrawer isOpen={open} onClose={onClose} />
    </>
  );
};

export default Header;
