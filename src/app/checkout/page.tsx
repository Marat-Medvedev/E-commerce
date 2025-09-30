'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  Input,
  Heading,
  Container,
} from '@chakra-ui/react';
import Image from 'next/image';
import { useCart } from '@/hooks/useCart';
import { formatPrice } from '@/lib/utils';
import { useTheme } from 'next-themes';

// Zod validation schema
const checkoutSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  zipCode: z.string().min(1, 'Postal code is required'),
  country: z.string().min(1, 'Country is required'),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

// Success screen component
const OrderSuccess = ({
  orderId,
  onBackToHome,
}: {
  orderId: string;
  onBackToHome: () => void;
}) => {
  const { theme } = useTheme();
  return (
    <VStack gap={6} align="center" py={{ base: 8, md: 12 }} px={4}>
      <Box
        bg={theme === 'dark' ? 'green.800' : 'green.100'}
        borderRadius="full"
        p={{ base: 4, md: 6 }}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Text
          fontSize={{ base: '3xl', md: '4xl' }}
          color={theme === 'dark' ? 'green.300' : 'green.600'}
        >
          ✓
        </Text>
      </Box>
      <VStack gap={2} textAlign="center">
        <Heading
          size={{ base: 'md', md: 'lg' }}
          color={theme === 'dark' ? 'green.300' : 'green.600'}
        >
          Order Confirmed!
        </Heading>
        <Text
          color={theme === 'dark' ? 'gray.300' : 'gray.600'}
          fontSize={{ base: 'sm', md: 'md' }}
        >
          Your order has been successfully placed.
        </Text>
        <Text fontSize="sm" color={theme === 'dark' ? 'gray.400' : 'gray.500'}>
          Order ID: {orderId}
        </Text>
      </VStack>
      <Button
        colorScheme="green"
        onClick={onBackToHome}
        size={{ base: 'md', md: 'lg' }}
        width={{ base: 'full', sm: 'auto' }}
      >
        Back to Home
      </Button>
    </VStack>
  );
};

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCart();
  const { theme } = useTheme();
  const [orderId, setOrderId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    mode: 'onChange',
  });

  // Redirect if cart is empty
  if (items.length === 0 && !orderId) {
    return (
      <Box bg={theme === 'dark' ? 'gray.900' : 'white'} minH="100vh">
        <Container maxW="container.xl" py={8}>
          <VStack gap={6} align="center" py={{ base: 8, md: 12 }}>
            <Text
              fontSize={{ base: 'md', md: 'lg' }}
              color={theme === 'dark' ? 'gray.300' : 'gray.600'}
            >
              Your cart is empty
            </Text>
            <Button
              onClick={() => router.push('/')}
              size={{ base: 'md', md: 'lg' }}
              width={{ base: 'full', sm: 'auto' }}
            >
              Continue Shopping
            </Button>
          </VStack>
        </Container>
      </Box>
    );
  }

  // Show success screen after order placement
  if (orderId) {
    return (
      <Box bg={theme === 'dark' ? 'gray.900' : 'white'} minH="100vh">
        <Container maxW="container.xl" py={8}>
          <OrderSuccess
            orderId={orderId}
            onBackToHome={() => {
              router.push('/');
            }}
          />
        </Container>
      </Box>
    );
  }

  const onSubmit = async () => {
    setIsSubmitting(true);

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Generate order ID
      const newOrderId = crypto.randomUUID();

      // Clear cart
      clearCart();

      // Show success
      setOrderId(newOrderId);

      alert('Order placed successfully!');
    } catch {
      alert('Error placing order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box bg={theme === 'dark' ? 'gray.900' : 'white'} minH="100vh">
      <Container maxW="container.xl" py={8}>
        <Heading
          size="lg"
          mb={{ base: 6, md: 8 }}
          color={theme === 'dark' ? 'white' : 'gray.800'}
        >
          Checkout
        </Heading>

        <VStack
          gap={8}
          align="stretch"
          display={{ base: 'flex', lg: 'grid' }}
          gridTemplateColumns={{ lg: '1fr 1fr' }}
        >
          {/* Order Summary */}
          <Box
            flex="1"
            bg={theme === 'dark' ? 'gray.800' : 'gray.50'}
            p={{ base: 4, md: 6 }}
            borderRadius="lg"
            border="1px solid"
            borderColor={theme === 'dark' ? 'gray.700' : 'gray.200'}
          >
            <Heading
              size="md"
              mb={4}
              color={theme === 'dark' ? 'white' : 'gray.800'}
            >
              Order Summary
            </Heading>

            <VStack gap={4} align="stretch">
              {items.map((item) => (
                <HStack key={item.id} gap={{ base: 3, md: 4 }} align="start">
                  <Box
                    position="relative"
                    width={{ base: '50px', md: '60px' }}
                    height={{ base: '50px', md: '60px' }}
                    borderRadius="md"
                    overflow="hidden"
                    flexShrink={0}
                  >
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      style={{
                        objectFit: 'cover',
                      }}
                      sizes="60px"
                    />
                  </Box>
                  <VStack align="start" flex="1" gap={1} minW={0}>
                    <Text
                      fontWeight="medium"
                      fontSize={{ base: 'sm', md: 'md' }}
                      color={theme === 'dark' ? 'white' : 'gray.800'}
                    >
                      {item.title}
                    </Text>
                    <Text
                      fontSize="sm"
                      color={theme === 'dark' ? 'gray.300' : 'gray.600'}
                    >
                      Qty: {item.qty}
                    </Text>
                  </VStack>
                  <Text
                    fontWeight="medium"
                    fontSize={{ base: 'sm', md: 'md' }}
                    flexShrink={0}
                  >
                    {formatPrice(item.price * item.qty)}
                  </Text>
                </HStack>
              ))}

              <Box
                height="1px"
                bg={theme === 'dark' ? 'gray.700' : 'gray.200'}
              />

              <HStack justify="space-between" fontWeight="bold" fontSize="lg">
                <Text color={theme === 'dark' ? 'white' : 'gray.800'}>
                  Subtotal:
                </Text>
                <Text color={theme === 'dark' ? 'white' : 'gray.800'}>
                  {formatPrice(subtotal)}
                </Text>
              </HStack>
            </VStack>
          </Box>

          {/* Checkout Form */}
          <Box flex="1">
            <form onSubmit={handleSubmit(onSubmit)}>
              <VStack gap={4} align="stretch">
                <Heading
                  size="md"
                  mb={4}
                  color={theme === 'dark' ? 'white' : 'gray.800'}
                >
                  Shipping Information
                </Heading>

                <VStack
                  gap={4}
                  align="stretch"
                  display={{ base: 'flex', sm: 'grid' }}
                  gridTemplateColumns={{ sm: '1fr 1fr' }}
                >
                  <Box flex="1">
                    <Text
                      as="label"
                      display="block"
                      mb={2}
                      fontWeight="medium"
                      color={theme === 'dark' ? 'white' : 'gray.800'}
                    >
                      First Name
                    </Text>
                    <Input
                      {...register('firstName')}
                      placeholder="John"
                      aria-label="First name"
                      bg={theme === 'dark' ? 'gray.700' : 'white'}
                      color={theme === 'dark' ? 'white' : 'gray.800'}
                      borderColor={theme === 'dark' ? 'gray.600' : 'gray.300'}
                      _hover={{
                        borderColor: theme === 'dark' ? 'gray.500' : 'gray.400',
                      }}
                      _focus={{
                        boxShadow: '0 0 0 3px rgba(66, 153, 225, 0.5)',
                      }}
                    />
                    {errors.firstName && (
                      <Text
                        color={theme === 'dark' ? 'red.300' : 'red.500'}
                        fontSize="sm"
                        mt={1}
                      >
                        {errors.firstName.message}
                      </Text>
                    )}
                  </Box>

                  <Box flex="1">
                    <Text
                      as="label"
                      display="block"
                      mb={2}
                      fontWeight="medium"
                      color={theme === 'dark' ? 'white' : 'gray.800'}
                    >
                      Last Name
                    </Text>
                    <Input
                      {...register('lastName')}
                      placeholder="Doe"
                      aria-label="Last name"
                      bg={theme === 'dark' ? 'gray.700' : 'white'}
                      color={theme === 'dark' ? 'white' : 'gray.800'}
                      borderColor={theme === 'dark' ? 'gray.600' : 'gray.300'}
                      _hover={{
                        borderColor: theme === 'dark' ? 'gray.500' : 'gray.400',
                      }}
                      _focus={{
                        boxShadow: '0 0 0 3px rgba(66, 153, 225, 0.5)',
                      }}
                    />
                    {errors.lastName && (
                      <Text
                        color={theme === 'dark' ? 'red.300' : 'red.500'}
                        fontSize="sm"
                        mt={1}
                      >
                        {errors.lastName.message}
                      </Text>
                    )}
                  </Box>
                </VStack>

                <Box>
                  <Text
                    as="label"
                    display="block"
                    mb={2}
                    fontWeight="medium"
                    color={theme === 'dark' ? 'white' : 'gray.800'}
                  >
                    Email
                  </Text>
                  <Input
                    {...register('email')}
                    type="email"
                    placeholder="john@example.com"
                    aria-label="Email address"
                    bg={theme === 'dark' ? 'gray.700' : 'white'}
                    color={theme === 'dark' ? 'white' : 'gray.800'}
                    borderColor={theme === 'dark' ? 'gray.600' : 'gray.300'}
                    _hover={{
                      borderColor: theme === 'dark' ? 'gray.500' : 'gray.400',
                    }}
                    _focus={{
                      boxShadow: '0 0 0 3px rgba(66, 153, 225, 0.5)',
                    }}
                  />
                  {errors.email && (
                    <Text
                      color={theme === 'dark' ? 'red.300' : 'red.500'}
                      fontSize="sm"
                      mt={1}
                    >
                      {errors.email.message}
                    </Text>
                  )}
                </Box>

                <Box>
                  <Text
                    as="label"
                    display="block"
                    mb={2}
                    fontWeight="medium"
                    color={theme === 'dark' ? 'white' : 'gray.800'}
                  >
                    Address
                  </Text>
                  <Input
                    {...register('address')}
                    placeholder="123 Main St"
                    aria-label="Street address"
                    bg={theme === 'dark' ? 'gray.700' : 'white'}
                    color={theme === 'dark' ? 'white' : 'gray.800'}
                    borderColor={theme === 'dark' ? 'gray.600' : 'gray.300'}
                    _hover={{
                      borderColor: theme === 'dark' ? 'gray.500' : 'gray.400',
                    }}
                    _focus={{
                      boxShadow: '0 0 0 3px rgba(66, 153, 225, 0.5)',
                    }}
                  />
                  {errors.address && (
                    <Text
                      color={theme === 'dark' ? 'red.300' : 'red.500'}
                      fontSize="sm"
                      mt={1}
                    >
                      {errors.address.message}
                    </Text>
                  )}
                </Box>

                <VStack
                  gap={4}
                  align="stretch"
                  display={{ base: 'flex', sm: 'grid' }}
                  gridTemplateColumns={{ sm: '1fr 1fr' }}
                >
                  <Box flex="1">
                    <Text
                      as="label"
                      display="block"
                      mb={2}
                      fontWeight="medium"
                      color={theme === 'dark' ? 'white' : 'gray.800'}
                    >
                      City
                    </Text>
                    <Input
                      {...register('city')}
                      placeholder="New York"
                      aria-label="City"
                      bg={theme === 'dark' ? 'gray.700' : 'white'}
                      color={theme === 'dark' ? 'white' : 'gray.800'}
                      borderColor={theme === 'dark' ? 'gray.600' : 'gray.300'}
                      _hover={{
                        borderColor: theme === 'dark' ? 'gray.500' : 'gray.400',
                      }}
                      _focus={{
                        boxShadow: '0 0 0 3px rgba(66, 153, 225, 0.5)',
                      }}
                    />
                    {errors.city && (
                      <Text
                        color={theme === 'dark' ? 'red.300' : 'red.500'}
                        fontSize="sm"
                        mt={1}
                      >
                        {errors.city.message}
                      </Text>
                    )}
                  </Box>

                  <Box flex="1">
                    <Text
                      as="label"
                      display="block"
                      mb={2}
                      fontWeight="medium"
                      color={theme === 'dark' ? 'white' : 'gray.800'}
                    >
                      Postal Code
                    </Text>
                    <Input
                      {...register('zipCode')}
                      placeholder="10001"
                      aria-label="Postal code"
                      bg={theme === 'dark' ? 'gray.700' : 'white'}
                      color={theme === 'dark' ? 'white' : 'gray.800'}
                      borderColor={theme === 'dark' ? 'gray.600' : 'gray.300'}
                      _hover={{
                        borderColor: theme === 'dark' ? 'gray.500' : 'gray.400',
                      }}
                      _focus={{
                        boxShadow: '0 0 0 3px rgba(66, 153, 225, 0.5)',
                      }}
                    />
                    {errors.zipCode && (
                      <Text
                        color={theme === 'dark' ? 'red.300' : 'red.500'}
                        fontSize="sm"
                        mt={1}
                      >
                        {errors.zipCode.message}
                      </Text>
                    )}
                  </Box>
                </VStack>

                <Box>
                  <Text
                    as="label"
                    display="block"
                    mb={2}
                    fontWeight="medium"
                    color={theme === 'dark' ? 'white' : 'gray.800'}
                  >
                    Country
                  </Text>
                  <Input
                    {...register('country')}
                    placeholder="United States"
                    aria-label="Country"
                    bg={theme === 'dark' ? 'gray.700' : 'white'}
                    color={theme === 'dark' ? 'white' : 'gray.800'}
                    borderColor={theme === 'dark' ? 'gray.600' : 'gray.300'}
                    _hover={{
                      borderColor: theme === 'dark' ? 'gray.500' : 'gray.400',
                    }}
                    _focus={{
                      boxShadow: '0 0 0 3px rgba(66, 153, 225, 0.5)',
                    }}
                  />
                  {errors.country && (
                    <Text
                      color={theme === 'dark' ? 'red.300' : 'red.500'}
                      fontSize="sm"
                      mt={1}
                    >
                      {errors.country.message}
                    </Text>
                  )}
                </Box>

                <Button
                  type="submit"
                  colorScheme="blue"
                  size={{ base: 'md', md: 'lg' }}
                  loading={isSubmitting}
                  disabled={!isValid}
                  mt={6}
                  width={{ base: 'full', sm: 'auto' }}
                >
                  {isSubmitting ? 'Placing Order...' : 'Place Order'}
                </Button>
              </VStack>
            </form>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
}
