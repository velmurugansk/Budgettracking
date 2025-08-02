import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { lightTheme, darkTheme } from './theme'; // Import your themes

const ThemeContext = createContext();

export const useThemeMode = () => useContext(ThemeContext);

export function ThemeContextProvider({ children }) {
  // Get preferred theme from system or local storage
  const preferredMode = typeof window !== 'undefined' && window.matchMedia ?
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light') :
    'light'; // Default to light if no preference

  const [mode, setMode] = useState(
    localStorage.getItem('themeMode') || preferredMode
  );

  // Function to toggle theme mode
  const toggleColorMode = () => {
    setMode((prevMode) => {
      const newMode = prevMode === 'light' ? 'dark' : 'light';
      localStorage.setItem('themeMode', newMode); // Persist user choice
      return newMode;
    });
  };

  // Memoize the theme object to prevent unnecessary re-renders
  const theme = useMemo(
    () => (mode === 'light' ? lightTheme : darkTheme),
    [mode]
  );

  // Optional: Listen to system theme changes (if user hasn't explicitly set a preference)
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (event) => {
      // Only update if no explicit user preference is stored
      if (!localStorage.getItem('themeMode')) {
        setMode(event.matches ? 'dark' : 'light');
      }
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);


  const contextValue = useMemo(
    () => ({
      mode,
      toggleColorMode,
    }),
    [mode, toggleColorMode]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline /> {/* CssBaseline for consistent styling */}
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}