import React, { useState } from 'react'
import { Button, Modal, Box, Typography} from "@mui/material"
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
    <Box className='px-4 py-4 rounded-md' sx={{ bgcolor: 'background.paper' }}>
      <div className='flex items-center justify-between'>
        <div>
          <h5 className='text-xl'>Income Overview</h5>
          <p className='font-light text-xs'>Track your earnings over time and analyze your income trends</p>
        </div>
        <Button variant='outlined' onClick={handleOpen}>Add Income</Button>
        <Modal
          open={open}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
          onBackdropClick={null} // Disables close on backdrop click
          disableEscapeKeyDown={true} // Disables close on Escape key press
        >
          <Box sx={{ ...style }}>
            <Typography id="modal-title" variant="h6" component="h2">
              This Modal Should Not Close!
            </Typography>
            <Typography id="modal-description" sx={{ mt: 2 }}>
              Click outside or press Escape. It should stay open.
            </Typography>
            <Button onClick={handleClose}>Close Me</Button>
          </Box>
        </Modal>
      </div>
    </Box>
  )
}

export default Income