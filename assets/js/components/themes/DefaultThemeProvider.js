import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

const theme = createTheme({
    palette: {
        mode: 'dark', 
        primary: { main: '#8b53ff' }
    }
});

const DefaultThemeProvider = (props) => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
                {props.children}
        </ThemeProvider>
    );
}

export default DefaultThemeProvider;
