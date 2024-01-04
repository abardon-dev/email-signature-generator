import { createTheme } from '@mui/material';

export const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '2.5rem',
          padding: '0.5rem 1rem'
        }
      }
    }
  }
});
