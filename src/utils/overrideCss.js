import {  createTheme } from  '@mui/material';

const theme = createTheme({    
    components: {
        MuiAppBar: {
            styleOverrides: {
                colorPrimary: {
                    backgroundColor: 'white',
                    boxShadow: 'none',
                }
            }
        },
    },
    palette: {
        secondary: {
            main: '#000',
        },
    },
    typography: {
        fontFamily: [
            'sans-serif',
        ].join(','),
      },
});

export default theme;