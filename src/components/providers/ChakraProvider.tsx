'use client';

import { ChakraProvider, createSystem, defaultConfig } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface ChakraProviderProps {
  children: ReactNode;
}

export function AppChakraProvider({ children }: ChakraProviderProps) {
  const system = createSystem(defaultConfig);

  return <ChakraProvider value={system}>{children}</ChakraProvider>;
}
