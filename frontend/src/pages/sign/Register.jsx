import React, { useState } from 'react'
import {Container, Paper, TextField, Button} from '@mui/material'
import { Link } from 'react-router-dom'
import {validateEmail, validatePassword} from '../../utils'

const Register = () => {

  const [registerdata, setRegisterData] = useState({
    email: '',
    password:'',
    name:'',
    image:''
  })

  const [nameErr, setNameerr] = useState('');
  const [emailErr, setEmailerr] = useState('');
  const [passwordErr, setPassworderr] = useState('');

  const handleChanges = (e) => {
    e.preventDefault();
    const {name, value} = e.target;
    setRegisterData({...registerdata, [name]:value});
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    validateEmail(registerdata.email) ? setEmailerr('Please enter a valid email address') : setEmailerr('');
    const isemailvalid = validateEmail(registerdata.email) ? true : false;
    !registerdata.name ? setNameerr('Please enter a username') : setNameerr('');
    const isname =  !registerdata.name ? true : false;
    validatePassword(registerdata.password) ? setPassworderr('Please enter a password') : setPassworderr('');
    const isvalidPass =  validatePassword(registerdata.password) ? true : false;
    if(!isemailvalid && !isname && !isvalidPass) {
      console.log('hai', registerdata)
      // api call is pending from frontend to add register
    }
  }

  return (
    <div className='bg-[#d4d4d4] h-screen flex items-center justify-center'>
      <Container maxWidth="sm" className="border-2 h-100 shadow-[#b3b3b3] border-[#d4d4d4]">
        <Paper elevation={10} sx={{ borderColor: "#d4d4d4" }} className='p-3 px-8'>
          <p className='text-center font-bold text-2xl my-5'>Signup</p>
          <TextField type='text' 
          error={!!nameErr} 
          name="name" 
          onChange={handleChanges} 
          value={registerdata.name} 
          placeholder='Enter name' 
          required 
          fullWidth 
          autoFocus 
          size="small" 
          helperText={nameErr} 
          sx={{ my: 2}}/>
          <TextField type='email' 
          error={!!emailErr} 
          name="email" 
          onChange={handleChanges} 
          value={registerdata.email} 
          placeholder='Enter email' 
          required 
          fullWidth 
          autoFocus 
          size="small" 
          helperText={emailErr} 
          sx={{ my: 2}}/>
          <TextField type='password' 
          error={!!passwordErr} 
          name="password" 
          onChange={handleChanges} 
          value={registerdata.password} 
          placeholder='Enter password' 
          required 
          fullWidth 
          autoFocus 
          sx={{ my: 2 }} 
          helperText={passwordErr} 
          size="small" />
          <Button variant='contained' className='w-full bg-[#2b2b2b]' sx={{ my: 2, backgroundColor: '#2b2b2b' }} onClick={handleSubmit}>Sign in</Button>
          <p className='my-2'>Already have an account?<Button><Link to="/login">Login</Link></Button></p>
        </Paper>
      </Container>
    </div>
  )
}

export default Register