'use client';

import { ChakraProvider } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { system } from '@/lib/theme';
import { ColorModeProvider } from '@/components/ui/color-mode';

interface ChakraProviderProps {
  children: ReactNode;
}

export function AppChakraProvider({ children }: ChakraProviderProps) {
  return (
    <ChakraProvider value={system}>
      <ColorModeProvider>{children}</ColorModeProvider>
    </ChakraProvider>
  );
}
