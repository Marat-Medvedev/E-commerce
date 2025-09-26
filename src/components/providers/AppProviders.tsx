'use client';

import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { QueryProvider } from './QueryProvider';
import { AppChakraProvider } from './ChakraProvider';
import { store, persistor } from '@/store';

interface AppProvidersProps {
  children: ReactNode;
}

export const AppProviders = ({ children }: AppProvidersProps) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryProvider>
          <AppChakraProvider>{children}</AppChakraProvider>
        </QueryProvider>
      </PersistGate>
    </Provider>
  );
};
