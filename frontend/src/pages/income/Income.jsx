import React, { useState } from 'react'
import { Button, Modal, Box, Typography, TextField, Divider} from "@mui/material"
import { useThemeMode } from './../../Themecontext'
import { IoCloseCircleOutline } from "react-icons/io5";
import Emojipickermodal from "../../common/Emojipickermodal"

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',  
  boxShadow: 20,  
};

const Income = () => {

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [incomedata,setIncomedata] = useState({
    source:'',
    amount:'',
    date:'',
    icon:''
  })

  const handleChange = (key, value) => {
    setIncomedata({...incomedata, [key] : value})
  }

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
            <Typography id="modal-title" variant="h6" component="h2" className='p-2 flex items-center justify-between'>
              Add Income <IoCloseCircleOutline className='cursor-pointer' onClick={handleClose} />
            </Typography>
            <Divider />
            <Box id="modal-description" className="py-2 px-3">
              <Emojipickermodal icon={incomedata.icon} onselect={(selectedicon) => handleChange("icon", selectedicon)} />
              <TextField type='text' 
                        // error={!!error} 
                        name="source" 
                        onChange={({target}) => handleChange("source", target.value)} 
                        value={incomedata.source} 
                        placeholder='Freelace, Salary, etc..' 
                        required 
                        fullWidth 
                        autoFocus 
                        size="small" 
                        // helperText={error} 
                        sx={{ my: 2}}/>
              <TextField type='text' 
                        // error={!!error} 
                        name="amount" 
                        // onChange={handleChanges} 
                        value={incomedata.amount} 
                        placeholder='Enter Amount' 
                        required 
                        fullWidth 
                        autoFocus 
                        size="small" 
                        // helperText={error} 
                        sx={{ my: 2}}/>
              <TextField type='date' 
                        // error={!!error} 
                        name="source" 
                        // onChange={handleChanges} 
                        value={incomedata.source} 
                        placeholder='Enter Source' 
                        required 
                        fullWidth 
                        autoFocus 
                        size="small" 
                        // helperText={error} 
                        sx={{ my: 2}}/>
            </Box>            
          </Box>
        </Modal>
      </div>
    </Box>
  )
}

export default Income