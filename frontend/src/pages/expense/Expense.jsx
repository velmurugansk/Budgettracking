import React, { useState, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import moment from 'moment';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
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
  const [catgoryerr, setcategoryError] = useState('');
  const [amounterr, setamountError] = useState('');
  const [dateerr, setdateError] = useState('');
  const [open, setOpen] = useState(false);
  const [expenselists, setExpenselists] = useState([]);
  const uid = useSelector((state) => state?.cookie?.user?.id ? state?.cookie?.user?.id : state?.cookie?.auth?.userdata?.id)

  const handleOpen = () => {
    setExpensedata({
      category: '',
      amount: '',
      date: '',
      icon: ''
    })
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [chartData, setChartdata] = useState([]);
  const [expensedata, setExpensedata] = useState({
    category: '',
    amount: '',
    date: '',
    icon: ''
  })

  const handleChange = (key, value) => {
    setExpensedata({ ...expensedata, [key]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    let amount, category, date = '';
    amount = expensedata.amount;
    category = expensedata.category;
    date = expensedata.date;

    !category ? setcategoryError("Please enter category value!") : setcategoryError('');
    !amount ? setamountError("Please enter amount value!") : setamountError('');
    !date ? setdateError("Please enter date value!") : setdateError('');

    if (amount && category && date) {
      const responsedata = await apiConf.post('/expense/add', expensedata);
      if (responsedata?.data?.status) {
        toast.success(responsedata.data.message);
        handleClose();
        getExpenselists();
      } else {
        toast.error(responsedata.data.message);
      }
    }
  }

  const getExpenselists = async () => {
    let obj = {
      id: uid,
      startDate: new Date(moment().startOf('month')),
      endDate: new Date(moment().endOf('month'))
    }

    if (uid) {
      const responsedata = await apiConf.get('/expense/list', { params: obj });
      let resultData = responsedata?.data?.status ? responsedata?.data?.data : [];
      const dataWithIds = resultData.map((row, index) => ({
        id: row._id || index, // Use _id if available, otherwise use index as fallback
        ...row,
      }));

      resultData && resultData.length > 0 ? setExpenselists(dataWithIds) : '';
      if (resultData && resultData.length > 0) {
        setChartdata([]);
        dataWithIds.sort((a, b) => new Date(a.date) - new Date(b.date));
        dataWithIds.map(item => {
          setChartdata(prevData => [...prevData, {
            name: item.category,
            xaxis: moment.utc(item.date).local().format('DD-MM-YYYY'),
            amount: item.amount
          }])
        })
      }

    }
  }

  const columns = [{ field: 'category', headerName: 'Category', flex: 1, minWidth: 140 },
  { field: 'amount', headerName: 'Amount', flex: 0.5, minWidth: 120 },
  {
    field: 'date', headerName: 'Date', flex: 0.7, minWidth: 140, valueFormatter: (params) => {
      if (!params) return '';
      return moment.utc(params).local().format('DD-MM-YYYY h:mm a');
    },
  }];
  const paginationModel = { page: 0, pageSize: 5 };


  useEffect(() => {
    getExpenselists();
  }, [uid])

  return (
    <Box className='px-4 py-4 rounded-md' sx={{ bgcolor: 'background.paper' }}>
      <div className='flex items-center justify-between'>
        <div>
          <h5 className='text-xl'>Expense Overview</h5>
          <p className='font-light text-xs'>Track your spending trends over time and gain insights into  where your money goes</p>
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
                error={!!catgoryerr}
                name="category"
                onChange={({ target }) => handleChange("category", target.value)}
                value={expensedata.category}
                placeholder='Rent, Food, etc..'
                required
                fullWidth
                autoFocus
                size="small"
                helperText={catgoryerr}
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

              <Button variant='contained' className='w-full bg-[#2b2b2b]' sx={{ my: 2, backgroundColor: '#2b2b2b' }} onClick={handleSubmit}>Add Expense</Button>
            </Box>
          </Box>
        </Modal>
      </div>
      <div className="mt-3" style={{ height: '300px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            width={500}
            height={400}
            data={chartData}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <XAxis dataKey="xaxis" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="amount" stroke="#8884d8" fill="#8884d8" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className='mt-3'>
        <DataGrid
          rows={expenselists}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          sx={{ border: 0 }}
        />
      </div>
    </Box>
  )
}

export default Expense