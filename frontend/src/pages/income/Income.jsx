import React, { useState } from 'react'
import { Button, Modal, Box } from "@mui/material"
import { useThemeMode } from './../../Themecontext'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid #ccc',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const Income = () => {

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const { mode } = useThemeMode();
  
  return (
    <Box className='px-4 py-4 rounded-md' sx={{bgcolor: 'background.paper'}}>
      <div className='flex items-center justify-between'>
        <div>
          <h5 className='text-xl'>Income Overview</h5>
          <p className='font-light text-xs'>Track your earnings over time and analyze your income trends</p>
        </div>
        <Button variant='outlined' onClick={handleOpen}>Add Income</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
        >
          <Box sx={{ ...style}}>
            <h2 id="child-modal-title">Text in a child modal</h2>
            <p id="child-modal-description">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            </p>
            <Button onClick={handleClose}>Close Child Modal</Button>
          </Box>
        </Modal>
      </div>
    </Box>
  )
}

export default Income