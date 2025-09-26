import { Box, Skeleton, VStack, HStack } from '@chakra-ui/react';

export const ProductCardSkeleton = () => {
  return (
    <Box
      borderRadius="lg"
      overflow="hidden"
      height="100%"
      border="1px solid"
      borderColor="gray.200"
      bg="white"
    >
      <Skeleton height="200px" />
      <Box p={4}>
        <VStack align="stretch" gap={3} height="100%">
          <VStack align="stretch" gap={2} flex="1">
            <Skeleton height="20px" />
            <Skeleton height="16px" width="80%" />
            <Skeleton height="16px" width="60%" />
            <HStack gap={1}>
              <Skeleton height="16px" width="16px" />
              <Skeleton height="16px" width="40px" />
            </HStack>
            <Skeleton height="24px" width="100px" />
          </VStack>
          <Skeleton height="32px" />
        </VStack>
      </Box>
    </Box>
  );
};
