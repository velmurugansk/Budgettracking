import React, { useState } from 'react'
import {
  AppBar, Stack, Toolbar, IconButton, Typography, Menu, MenuItem, Button, Tooltip, Avatar, Drawer, Divider, List,
  ListItemButton, ListItemText, ListItem, CssBaseline
} from '@mui/material'
import { FcMoneyTransfer } from "react-icons/fc";
import { RxHamburgerMenu } from "react-icons/rx";
import { LuCircleUser } from "react-icons/lu";
import { useSelector } from "react-redux"
import {userDetails} from "../utils"

const pages = ['Dashboard', 'Income', 'Expense'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const Header = () => {
  const drawerWidth = 240;
  const profileurl = '';
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const uid = useSelector((state) => state.cookie.user.id)
  const username = useSelector((state) => state.cookie.user.name)
  const res = userDetails({id:uid});
  console.log(res)
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <div onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Budget Tracker
      </Typography>
      <Divider />
      <List>
        {pages.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <>
      <CssBaseline />
      <AppBar position="static" className='py-3 px-5'>
        <Stack direction="row" className='items-center justify-between'>
          <div className='flex items-center'>
            <RxHamburgerMenu className='mr-2 cursor-pointer' sx={{ display: { xs: 'flex', md: 'none' } }} onClick={handleDrawerToggle} />
            <h5>Budget Tracker</h5>
          </div>
          <div className='flex items-center'>
            <div className='flex items-center mr-3'>
              {pages.map((page) => (
                <Button
                  key={page}
                  sx={{ color: 'white', display: 'block' }}
                >
                  {page}
                </Button>
              ))}
            </div>
            {username ? <Typography className='capitalize'>{username}</Typography> : ''}
            <Avatar alt="profile pic" className='ml-1' src={profileurl ? profileurl : <LuCircleUser />} />
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