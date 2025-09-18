import { Card, CardBody, Skeleton, VStack, HStack } from '@chakra-ui/react';

export const ProductCardSkeleton = () => {
  return (
    <Card borderRadius="lg" overflow="hidden" height="100%">
      <Skeleton height="200px" />
      <CardBody>
        <VStack align="stretch" spacing={3} height="100%">
          <VStack align="stretch" spacing={2} flex="1">
            <Skeleton height="20px" />
            <Skeleton height="16px" width="80%" />
            <Skeleton height="16px" width="60%" />
            <HStack spacing={1}>
              <Skeleton height="16px" width="16px" />
              <Skeleton height="16px" width="40px" />
            </HStack>
            <Skeleton height="24px" width="100px" />
          </VStack>
          <Skeleton height="32px" />
        </VStack>
      </CardBody>
    </Card>
  );
};
