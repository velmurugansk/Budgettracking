import React, { useState } from 'react'
import { Container, Paper, TextField, Button } from '@mui/material'
import { useDispatch } from "react-redux";
import { unwrapResult } from '@reduxjs/toolkit'
import { useNavigate, Link } from 'react-router-dom';
import { userLogin } from '../../reducers/authReducer';
import toast from 'react-hot-toast'
import {validateEmail, validatePassword} from '../../utils'

const Login = () => {
const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userdata, setUserdata] = useState({
    "email":'',
    "password":''
  });
  const [error, setError] = useState('');
  const [pwderr, setPwderr] = useState('');

  const handleChanges = (e) => {
    e.preventDefault()
    const { name, value } = e.target;    
    setUserdata({ ...userdata, 
      [name]: value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();  
    validateEmail(userdata.email) ? setError('Please enter a valid email address') : setError('');
    validatePassword(userdata.password) ? userdata.password == "" ? setPwderr('Password is required!.') : setPwderr('Password must be at least 8 characters long.') : setPwderr('');
    const isvalidmail = validateEmail(userdata.email);
    const validpassword = validatePassword(userdata.password);  
    
    if(!isvalidmail && !validpassword) {      
      const data = dispatch(userLogin(userdata));      
      data.then(unwrapResult)
      .then((response) => {               
        const result =  response?.data?.status ? response?.data?.status : response?.status;   
        const token = response?.data?.token ? response?.data?.token : '';        
        if(result) {
          toast.success(response.data.message);
          localStorage.setItem("token",token)
          navigate("/");
        } else {
          toast.error(response.message);
        }
        
      })
      .catch(() => {         
        console.log('Error:', error); // Handle errors
      });
    }
  }

  const handleKeypress = (e) => {       
    if (e.keyCode === 13) {
      handleSubmit(e);
    }
  };

  return (
    <div className='bg-[#d4d4d4] h-screen flex items-center justify-center'>
      <Container maxWidth="sm" className="border-2 h-100 shadow-[#b3b3b3] border-[#d4d4d4]">
        <Paper elevation={10} sx={{ borderColor: "#d4d4d4" }} className='p-3 px-8'>
          <p className='text-center font-bold text-2xl my-5'>Login</p>
          <TextField type='email' 
          error={!!error} 
          name="email" 
          onChange={handleChanges} 
          onKeyDown={handleKeypress}
          value={userdata.email} 
          placeholder='Enter email' 
          required 
          fullWidth 
          autoFocus 
          size="small" 
          helperText={error} 
          sx={{ my: 2}} />
          <TextField type='password' 
          error={!!pwderr} 
          name="password" 
          onChange={handleChanges} 
          onKeyDown={handleKeypress}
          value={userdata.password} 
          placeholder='Enter password' 
          required 
          fullWidth 
          autoFocus 
          sx={{ my: 2 }} 
          helperText={pwderr} 
          size="small" />
          <Button variant='contained' className='w-full bg-[#2b2b2b]' sx={{ my: 2, backgroundColor: '#2b2b2b' }} onClick={handleSubmit}>Sign in</Button>
          <p className='my-2'>Don't have a account?<Button><Link to="/signup">Signup</Link></Button></p>
        </Paper>
      </Container>
    </div>
  )
}

export default Login