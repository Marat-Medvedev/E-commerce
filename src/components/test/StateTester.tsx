'use client';

import { useState } from 'react';
import { Box, Button, VStack, Text, Heading, Badge } from '@chakra-ui/react';

interface StateTesterProps {
  onStateChange: (state: string) => void;
}

export function StateTester({ onStateChange }: StateTesterProps) {
  const [currentState, setCurrentState] = useState('normal');

  const states = [
    { id: 'normal', label: 'Normal State', color: 'green' },
    { id: 'loading', label: 'Loading State', color: 'blue' },
    { id: 'error', label: 'Error State', color: 'red' },
    { id: 'empty', label: 'Empty State', color: 'orange' },
    { id: 'network-error', label: 'Network Error', color: 'red' },
    { id: 'timeout', label: 'Timeout Error', color: 'red' },
    { id: 'server-error', label: 'Server Error (500)', color: 'red' },
    { id: 'not-found', label: 'Not Found (404)', color: 'orange' },
  ];

  const handleStateChange = (state: string) => {
    setCurrentState(state);
    onStateChange(state);
  };

  return (
    <Box
      position="fixed"
      top={4}
      right={4}
      bg="white"
      p={4}
      borderRadius="lg"
      shadow="lg"
      zIndex={1000}
      border="1px solid"
      borderColor="gray.200"
      maxW="300px"
    >
      <VStack align="stretch" gap={3}>
        <Heading size="sm">Test States</Heading>
        <Text fontSize="sm" color="gray.600">
          Current:{' '}
          <Badge colorScheme={states.find((s) => s.id === currentState)?.color}>
            {states.find((s) => s.id === currentState)?.label}
          </Badge>
        </Text>
        <VStack gap={2} align="stretch">
          {states.map((state) => (
            <Button
              key={state.id}
              size="sm"
              variant={currentState === state.id ? 'solid' : 'outline'}
              colorScheme={state.color}
              onClick={() => handleStateChange(state.id)}
            >
              {state.label}
            </Button>
          ))}
        </VStack>
      </VStack>
    </Box>
  );
}
