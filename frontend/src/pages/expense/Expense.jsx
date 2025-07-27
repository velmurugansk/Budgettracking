import React, {useState} from 'react'
import { DataGrid } from '@mui/x-data-grid';
import moment from 'moment';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Button, Modal, Box, Typography, TextField, Divider } from "@mui/material"
import { useThemeMode } from './../../Themecontext'
import { IoCloseCircleOutline } from "react-icons/io5";
import Emojipickermodal from "../../common/Emojipickermodal"
import apiConf from '../../api/apiConf';
import toast from 'react-hot-toast'
import { useSelector } from "react-redux"

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 20,
};

const Expense = () => {
  const [sourceerr, setsourceError] = useState('');
  const [amounterr, setamountError] = useState('');
  const [dateerr, setdateError] = useState('');
  const [open, setOpen] = useState(false);
  const [incomelists, setIncomelists] = useState([]);
  const uid = useSelector((state) => state?.cookie?.user?.id ? state?.cookie?.user?.id : state?.cookie?.auth?.userdata?.id)

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [expensedata, setExpensedata] = useState({
    source: '',
    amount: '',
    date: '',
    icon: ''
  })

  const handleChange = (key, value) => {
    setExpensedata({ ...expensedata, [key]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    let amount, source, date = '';
    amount = expensedata.amount;
    source = expensedata.source;
    date = expensedata.date;

    !source ? setsourceError("Please enter source value!") : setsourceError('');
    !amount ? setamountError("Please enter amount value!") : setamountError('');
    !date ? setdateError("Please enter date value!") : setdateError('');

    if (amount && source && date) {
      const responsedata = await apiConf.post('/expense/add', expensedata);
      if (responsedata?.data?.status) {
        toast.success(responsedata.data.message);
        handleClose();
      } else {
        toast.error(responsedata.data.message);
      }
    }

  }

  return (
    <Box className='px-4 py-4 rounded-md' sx={{ bgcolor: 'background.paper' }}>
      <div className='flex items-center justify-between'>
        <div>
          <h5 className='text-xl'>Expense Overview</h5>
          <p className='font-light text-xs'>Track your earnings over time and analyze your income trends</p>
        </div>
        <Button variant='outlined' onClick={handleOpen}>Add Expense</Button>
        <Modal
          open={open}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
          onBackdropClick={null} // Disables close on backdrop click
          disableEscapeKeyDown={true} // Disables close on Escape key press          
        >
          <Box sx={{ ...style }}>
            <Typography id="modal-title" variant="h6" component="h2" className='p-2 flex items-center justify-between'>
              Add Expense <IoCloseCircleOutline className='cursor-pointer' onClick={handleClose} />
            </Typography>
            <Divider />
            <Box id="modal-description" className="py-2 px-3">
              <Emojipickermodal icon={expensedata.icon} onselect={(selectedicon) => handleChange("icon", selectedicon)} />
              <TextField type='text'
                error={!!sourceerr}
                name="source"
                onChange={({ target }) => handleChange("source", target.value)}
                value={expensedata.source}
                placeholder='Freelace, Salary, etc..'
                required
                fullWidth
                autoFocus
                size="small"
                helperText={sourceerr}
                sx={{ my: 2 }} />
              <TextField type='text'
                error={!!amounterr}
                name="amount"
                onChange={({ target }) => handleChange("amount", target.value)}
                value={expensedata.amount}
                placeholder='Enter Amount'
                required
                fullWidth
                autoFocus
                size="small"
                helperText={amounterr}
                sx={{ my: 2 }} />
              <TextField type='date'
                error={!!dateerr}
                name="date"
                onChange={({ target }) => handleChange("date", target.value)}
                value={expensedata.date}
                placeholder='Select Date'
                required
                fullWidth
                autoFocus
                size="small"
                helperText={dateerr}
                sx={{ my: 2 }} />

              <Button variant='contained' className='w-full bg-[#2b2b2b]' sx={{ my: 2, backgroundColor: '#2b2b2b' }} onClick={handleSubmit}>Add Income</Button>
            </Box>
          </Box>
        </Modal>
      </div>
    </Box>
  )
}

export default Expense