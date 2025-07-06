import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    background: {
      default: '#d4d4d4',
      paper: '#fff',
    },
    text:{
      primary: '#2b2b2b'
    }
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    background: {
      default: '#2b2b2b',
      paper: '#2b2b2b',
    },
    text:{
      primary :'#fff'
    }
  },
});
