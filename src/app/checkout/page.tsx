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
  Image,
  Heading,
} from '@chakra-ui/react';
import { useCart } from '@/hooks/useCart';
import { formatPrice } from '@/lib/utils';

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
}) => (
  <VStack gap={6} align="center" py={{ base: 8, md: 12 }} px={4}>
    <Box
      bg="green.100"
      borderRadius="full"
      p={{ base: 4, md: 6 }}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Text fontSize={{ base: '3xl', md: '4xl' }} color="green.600">
        ✓
      </Text>
    </Box>
    <VStack gap={2} textAlign="center">
      <Heading size={{ base: 'md', md: 'lg' }} color="green.600">
        Order Confirmed!
      </Heading>
      <Text color="gray.600" fontSize={{ base: 'sm', md: 'md' }}>
        Your order has been successfully placed.
      </Text>
      <Text fontSize="sm" color="gray.500">
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

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCart();
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
      <Box maxW="4xl" mx="auto" p={{ base: 4, md: 6 }}>
        <VStack gap={6} align="center" py={{ base: 8, md: 12 }}>
          <Text fontSize={{ base: 'md', md: 'lg' }} color="gray.600">
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
      </Box>
    );
  }

  // Show success screen after order placement
  if (orderId) {
    return (
      <Box maxW="4xl" mx="auto" p={6}>
        <OrderSuccess
          orderId={orderId}
          onBackToHome={() => {
            router.push('/');
          }}
        />
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
    <Box maxW="6xl" mx="auto" p={{ base: 4, md: 6 }}>
      <Heading size="lg" mb={{ base: 6, md: 8 }}>
        Checkout
      </Heading>

      <VStack
        gap={8}
        align="stretch"
        display={{ base: 'flex', lg: 'grid' }}
        gridTemplateColumns={{ lg: '1fr 1fr' }}
      >
        {/* Order Summary */}
        <Box flex="1" bg="gray.50" p={{ base: 4, md: 6 }} borderRadius="lg">
          <Heading size="md" mb={4}>
            Order Summary
          </Heading>

          <VStack gap={4} align="stretch">
            {items.map((item) => (
              <HStack key={item.id} gap={{ base: 3, md: 4 }} align="start">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  boxSize={{ base: '50px', md: '60px' }}
                  objectFit="cover"
                  borderRadius="md"
                  flexShrink={0}
                />
                <VStack align="start" flex="1" gap={1} minW={0}>
                  <Text fontWeight="medium" fontSize={{ base: 'sm', md: 'md' }}>
                    {item.title}
                  </Text>
                  <Text fontSize="sm" color="gray.600">
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

            <Box height="1px" bg="gray.200" />

            <HStack justify="space-between" fontWeight="bold" fontSize="lg">
              <Text>Subtotal:</Text>
              <Text>{formatPrice(subtotal)}</Text>
            </HStack>
          </VStack>
        </Box>

        {/* Checkout Form */}
        <Box flex="1">
          <form onSubmit={handleSubmit(onSubmit)}>
            <VStack gap={4} align="stretch">
              <Heading size="md" mb={4}>
                Shipping Information
              </Heading>

              <VStack
                gap={4}
                align="stretch"
                display={{ base: 'flex', sm: 'grid' }}
                gridTemplateColumns={{ sm: '1fr 1fr' }}
              >
                <Box flex="1">
                  <Text as="label" display="block" mb={2} fontWeight="medium">
                    First Name
                  </Text>
                  <Input {...register('firstName')} placeholder="John" />
                  {errors.firstName && (
                    <Text color="red.500" fontSize="sm" mt={1}>
                      {errors.firstName.message}
                    </Text>
                  )}
                </Box>

                <Box flex="1">
                  <Text as="label" display="block" mb={2} fontWeight="medium">
                    Last Name
                  </Text>
                  <Input {...register('lastName')} placeholder="Doe" />
                  {errors.lastName && (
                    <Text color="red.500" fontSize="sm" mt={1}>
                      {errors.lastName.message}
                    </Text>
                  )}
                </Box>
              </VStack>

              <Box>
                <Text as="label" display="block" mb={2} fontWeight="medium">
                  Email
                </Text>
                <Input
                  {...register('email')}
                  type="email"
                  placeholder="john@example.com"
                />
                {errors.email && (
                  <Text color="red.500" fontSize="sm" mt={1}>
                    {errors.email.message}
                  </Text>
                )}
              </Box>

              <Box>
                <Text as="label" display="block" mb={2} fontWeight="medium">
                  Address
                </Text>
                <Input {...register('address')} placeholder="123 Main St" />
                {errors.address && (
                  <Text color="red.500" fontSize="sm" mt={1}>
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
                  <Text as="label" display="block" mb={2} fontWeight="medium">
                    City
                  </Text>
                  <Input {...register('city')} placeholder="New York" />
                  {errors.city && (
                    <Text color="red.500" fontSize="sm" mt={1}>
                      {errors.city.message}
                    </Text>
                  )}
                </Box>

                <Box flex="1">
                  <Text as="label" display="block" mb={2} fontWeight="medium">
                    Postal Code
                  </Text>
                  <Input {...register('zipCode')} placeholder="10001" />
                  {errors.zipCode && (
                    <Text color="red.500" fontSize="sm" mt={1}>
                      {errors.zipCode.message}
                    </Text>
                  )}
                </Box>
              </VStack>

              <Box>
                <Text as="label" display="block" mb={2} fontWeight="medium">
                  Country
                </Text>
                <Input {...register('country')} placeholder="United States" />
                {errors.country && (
                  <Text color="red.500" fontSize="sm" mt={1}>
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
    </Box>
  );
}
