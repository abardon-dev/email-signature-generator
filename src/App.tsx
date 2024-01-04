import { ThemeProvider } from '@emotion/react';
import { router } from '@routes/Router';
import { theme } from '@styles/theme';
import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router()} />
      <Toaster />
    </ThemeProvider>
  );
};
