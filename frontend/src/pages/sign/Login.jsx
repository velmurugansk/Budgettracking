import React from 'react'
import { Container, Paper, TextField, Button } from '@mui/material'

const Login = () => {
    
  return (
    <div className='bg-[#d4d4d4] h-screen flex items-center justify-center'>
        <Container maxWidth="sm" className="border-2 h-100 shadow-[#b3b3b3] border-[#d4d4d4]">
            <Paper elevation={10} sx={{borderColor: "#d4d4d4"}} className='p-3 px-8'>                
                <p className='text-center font-bold text-2xl my-5'>Login</p>
                <TextField type='email' placeholder='Enter email' required fullWidth autoFocus sx={{ my: 2 }} size="small" />
                <TextField type='password' placeholder='Enter password' required fullWidth autoFocus sx={{ my: 2 }} size="small" />
                <Button variant='contained' className='w-full bg-[#2b2b2b]' sx={{my:2, backgroundColor:'#2b2b2b'}}>Sign in</Button>
                <p className='my-2'>Don't have a account?<Button>Signup</Button></p>
            </Paper>        
        </Container>
    </div>
  )
}

export default Login