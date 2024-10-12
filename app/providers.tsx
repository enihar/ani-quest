'use client';

import { ChakraProvider } from '@chakra-ui/react';
import { UserProvider } from '@/context/UserContext';
import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    customAmber: {
      400: '#FFB74D',
    },
    burntOrange: {
      500: '#F57C00',
      600: '#EF6C00',
    },
    lightGray: {
      400: '#d1d5db',
    },
    goldenYellow: {
      500: '#FFD54F',
    },
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <UserProvider>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </UserProvider>
  );
}
