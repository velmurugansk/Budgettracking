import React from 'react'
import Header from './Header'
import Footer from './Footer'
import {useLocation, Outlet} from 'react-router-dom'

const Layout = () => {
    const location =useLocation();
  return (
    <>
    <Header />
    <Outlet />
    <Footer/>
    </>    
  )
}

export default Layout