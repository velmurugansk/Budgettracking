import React, { useState } from 'react'
import {Container, Paper, TextField, Button} from '@mui/material'
import { Link } from 'react-router-dom'

const Register = () => {

  const [registerdata, setRegisterData] = useState({
    email: '',
    password:'',
    name:'',
    image:''
  })

  const handleChanges = (e) => {
    e.preventDefault();
    const {name, value} = e.target;
    setRegisterData({...registerdata, [name]:value});
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(registerdata)
  }

  return (
    <div className='bg-[#d4d4d4] h-screen flex items-center justify-center'>
      <Container maxWidth="sm" className="border-2 h-100 shadow-[#b3b3b3] border-[#d4d4d4]">
        <Paper elevation={10} sx={{ borderColor: "#d4d4d4" }} className='p-3 px-8'>
          <p className='text-center font-bold text-2xl my-5'>Signup</p>
          <TextField type='text' 
          // error={!!error} 
          name="name" 
          onChange={handleChanges} 
          value={registerdata.email} 
          placeholder='Enter name' 
          required 
          fullWidth 
          autoFocus 
          size="small" 
          // helperText={error} 
          sx={{ my: 2}}/>
          <TextField type='email' 
          // error={!!error} 
          name="email" 
          onChange={handleChanges} 
          value={registerdata.email} 
          placeholder='Enter email' 
          required 
          fullWidth 
          autoFocus 
          size="small" 
          // helperText={error} 
          sx={{ my: 2}}/>
          <TextField type='password' 
          // error={!!pwderr} 
          name="password" 
          onChange={handleChanges} 
          value={registerdata.password} 
          placeholder='Enter password' 
          required 
          fullWidth 
          autoFocus 
          sx={{ my: 2 }} 
          // helperText={pwderr} 
          size="small" />
          <Button variant='contained' className='w-full bg-[#2b2b2b]' sx={{ my: 2, backgroundColor: '#2b2b2b' }} onClick={handleSubmit}>Sign in</Button>
          <p className='my-2'>Already have an account?<Button><Link to="/login">Login</Link></Button></p>
        </Paper>
      </Container>
    </div>
  )
}

export default Register