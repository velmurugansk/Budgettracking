import React, { useState } from 'react'
import { Container, Paper, TextField, Button } from '@mui/material'
import { useDispatch } from "react-redux";
import { unwrapResult } from '@reduxjs/toolkit'
import { useNavigate } from 'react-router-dom';
import { userLogin } from '../../reducers/authReducer';
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'

const Login = () => {
const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userdata, setUserdata] = useState({});
  const [error, setError] = useState('');
  const [pwderr, setPwderr] = useState('');

  const handleChanges = (e) => {
    e.preventDefault()
    const { name, value } = e.target;
    setUserdata({ ...userdata, [name]: value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();    
    const isvalidmail = validateEmail(userdata.email);
    const validpassword = validatePassword(userdata.password);    
    if(!isvalidmail && !validpassword) {      
      const data = dispatch(userLogin(userdata));      
      data.then(unwrapResult)
      .then((response) => {        
        const result =  response.data.status;   
        const token = response.data.token;
        if(result) {
          toast.success(response.data.message);
          localStorage.setItem("token",token)
          navigate("/");
        } else {
          toast.error(response.data.message);
        }
        
      })
      .catch((error) => {
        console.error('Error:', error); // Handle errors
      });
    }
  }

  const validateEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;    
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return true;
    } else {
      setError('');
      return false;
    }
  };

  const validatePassword = (pwd) => {
    if(pwd.length < 6) {
      setPwderr('Password must be at least 8 characters long.');
      return true;
    } else {
      setPwderr('');
      return false;
    }
  }

  return (
    <div className='bg-[#d4d4d4] h-screen flex items-center justify-center'>
      <Container maxWidth="sm" className="border-2 h-100 shadow-[#b3b3b3] border-[#d4d4d4]">
        <Paper elevation={10} sx={{ borderColor: "#d4d4d4" }} className='p-3 px-8'>
          <p className='text-center font-bold text-2xl my-5'>Login</p>
          <TextField type='email' 
          error={!!error} 
          name="email" 
          onChange={handleChanges} 
          value={userdata.name} 
          placeholder='Enter email' 
          required 
          fullWidth 
          autoFocus 
          size="small" 
          helperText={error} 
          sx={{ my: 2}}/>
          <TextField type='password' 
          error={!!pwderr} 
          name="password" 
          onChange={handleChanges} 
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