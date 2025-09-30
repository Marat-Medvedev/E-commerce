'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { ThemeProvider as NextThemesProvider, useTheme } from 'next-themes';
import { IconButton } from '@chakra-ui/react';
import { FaSun, FaMoon } from 'react-icons/fa';

// Color mode context for additional functionality if needed
const ColorModeContext = createContext<{
  colorMode: string;
  toggleColorMode: () => void;
}>({
  colorMode: 'light',
  toggleColorMode: () => {},
});

export const useColorModeContext = () => useContext(ColorModeContext);

// Color mode provider that wraps next-themes
export function ColorModeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange={false}
    >
      <ColorModeContextProvider>{children}</ColorModeContextProvider>
    </NextThemesProvider>
  );
}

function ColorModeContextProvider({ children }: { children: React.ReactNode }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const colorMode = theme === 'dark' ? 'dark' : 'light';
  const toggleColorMode = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ColorModeContext.Provider value={{ colorMode, toggleColorMode }}>
      {children}
    </ColorModeContext.Provider>
  );
}

// Color mode toggle button component
export function ColorModeButton() {
  const { colorMode, toggleColorMode } = useColorModeContext();

  return (
    <IconButton
      aria-label={`Switch to ${colorMode === 'light' ? 'dark' : 'light'} mode`}
      onClick={toggleColorMode}
      variant="ghost"
      size="md"
      _hover={{
        bg: 'gray.100',
        _dark: { bg: 'gray.700' },
        transform: 'scale(1.05)',
      }}
      _active={{
        transform: 'scale(0.95)',
      }}
      transition="all 0.2s"
    >
      {colorMode === 'light' ? <FaMoon /> : <FaSun />}
    </IconButton>
  );
}

// Hook for color mode values (replacement for useColorModeValue)
export function useColorModeValue<T>(lightValue: T, darkValue: T): T {
  const { colorMode } = useColorModeContext();
  return colorMode === 'light' ? lightValue : darkValue;
}
