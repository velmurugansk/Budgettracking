import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { useLocation, Outlet, useNavigate } from 'react-router-dom'
import apiConf from '../api/apiConf'
import { useDispatch } from 'react-redux'
import { persistor } from '../store/store'
import { setAuth, logout } from '../reducers/userVerify'
import { useEffect } from 'react'

const Layout = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoginpage = location.pathname === '/login';
  const isRegisterpage = location.pathname === '/register';

  const verifyAuth = async () => {
    try {
      const response = await apiConf.get('verify'); 
      console.log(response)     
      dispatch(setAuth(response.data.user));
    } catch (error) {      
      dispatch(logout());
      navigate('/login')
      await persistor.purge();
    }
  }

  useEffect(()=>{
    verifyAuth();      
  }, [dispatch])

  if(isLoginpage || isRegisterpage) {
    return <Outlet/>
  }

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

export default Layout