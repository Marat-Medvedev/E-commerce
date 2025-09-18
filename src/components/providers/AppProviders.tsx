'use client';

import { ReactNode } from 'react';
import { QueryProvider } from './QueryProvider';
import { AppChakraProvider } from './ChakraProvider';

interface AppProvidersProps {
  children: ReactNode;
}

export const AppProviders = ({ children }: AppProvidersProps) => {
  return (
    <QueryProvider>
      <AppChakraProvider>{children}</AppChakraProvider>
    </QueryProvider>
  );
};
