import React from 'react'
import { Container, Paper, Typography } from '@mui/material'

const Login = () => {
    
  return (
    <div className='bg-[#d4d4d4] h-screen'>
        <Container maxWidth="sm" className="m-auto border-2 h-[400] shadow-[#b3b3b3] border-[#d4d4d4]">
            <Paper elevation={10} sx={{borderColor: "#d4d4d4"}}>                
                <Typography  varient="h4" className='font-bold text-2xl'>Login</Typography>
            </Paper>        
        </Container>
    </div>
  )
}

export default Login