import React, { useState, useEffect } from 'react'
import {
  AppBar, Stack, Toolbar, IconButton, Typography, Menu, MenuItem, Button, Tooltip, Avatar, Drawer, Divider, List,
  ListItemButton, ListItemText, ListItem, CssBaseline
} from '@mui/material'
import { FcMoneyTransfer } from "react-icons/fc";
import { RxHamburgerMenu } from "react-icons/rx";
import { LuCircleUser } from "react-icons/lu";
import { useSelector } from "react-redux"
import apiConf from '../api/apiConf'
import { Link as RouterLink } from 'react-router-dom';


const pages = [{ key: 'Dashboard', path: "/" }, { key: 'Income', path: "/income" }, { key: 'Expense', path: "/expense" }];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const Header = () => {
  const drawerWidth = 240;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const uid = useSelector((state) => state?.cookie?.user?.id ? state?.cookie?.user?.id : state?.cookie?.auth?.userdata?.id)  
  const username = useSelector((state) => state?.cookie?.user?.name ? state?.cookie?.user?.name : state?.cookie?.auth?.userdata?.name)
  // const res = uid ? userDetails({ id: uid }) : '';
  const [profileUrl, setProfileurl] = useState('');
  const userDetails = async (id) => {
    try {
      if (id) {
        const response = await apiConf.get('/user/list', { params: { id: id } });
        const data = response?.data?.data;
        setProfileurl(data ? data?.image : '')
      }
    } catch (error) {
      console.log(error)
    }
  }
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <div onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Budget Tracker
      </Typography>
      <Divider />
      <List sx={{ listStyle: 'none', padding: 0}}>
        {pages.map((item) => (
          <ListItem key={item.key} disablePadding>
            <ListItemButton component={RouterLink} sx={{ textAlign: 'center' }} to={item.path}>
              <ListItemText primary={item.key} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  useEffect(() => {
    userDetails(uid);
  }, [uid])

  return (
    <>
      <CssBaseline />
      <AppBar position="static" className='py-3 px-5 w-full'>
        <Stack direction="row" className='items-center justify-between'>
          <div className='flex items-center'>
            <RxHamburgerMenu className='mr-2 cursor-pointer md:hidden lg:hidden xs:hidden' sx={{ display: { xs: 'flex', md: 'none' } }} onClick={handleDrawerToggle} />
            <h5>Budget Tracker</h5>
          </div>
          <div className='flex items-center'>
            <div className='flex items-center mr-3 hidden md:block lg:block xs:block'>
              <List className='flex items-center' sx={{ listStyle: 'none', padding: 0, }}>
                {pages.map((item) => (
                  <ListItem key={item.key} disablePadding>
                    <ListItemButton component={RouterLink} sx={{ textAlign: 'center' }} to={item.path}>
                      <ListItemText primary={item.key} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </div>
            {username ? <Typography className='capitalize'>{username}</Typography> : ''}
            <Avatar alt="profile pic" className='ml-1' src={profileUrl ? profileUrl : <LuCircleUser />} />
          </div>
        </Stack>
      </AppBar>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>
    </>
  )
}

export default Header