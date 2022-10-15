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
});

export default theme;