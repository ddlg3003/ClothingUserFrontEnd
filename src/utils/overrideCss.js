import { createTheme } from '@mui/material';

const theme = createTheme({
  components: {
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: 'white',
          // boxShadow: '1px',
        },
      },
    },
  },
  palette: {
    black: {
      main: '#000',
    },
    white: {
      main: '#fff',
    },
    blue: {
      main: '#2596be',
    },
  },
  typography: {
    allVariants: {
      fontFamily: '"Poppins", sans-serif',
      // fontWeight: '100',
    },
  },
});

export default theme;
