import React from 'react';
import { useThemeMode } from '../Themecontext';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import { CiBrightnessUp, CiDark } from "react-icons/ci";

function Themebutton() {
  const { mode, toggleColorMode } = useThemeMode();

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'text.primary', // Adjust color based on theme
        borderRadius: 1,
        p: 1,
      }}
    >
      <IconButton sx={{ ml: 1 }} onClick={toggleColorMode} color="inherit">
        {mode === 'dark' ? <CiDark /> : <CiBrightnessUp  className='text-white'/>}
      </IconButton>
    </Box>
  );
}

export default Themebutton;