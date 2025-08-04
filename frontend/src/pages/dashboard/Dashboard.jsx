import React, { useState, useEffect } from 'react'
import { Box } from '@mui/material'
import moment from 'moment';
import apiConf from '../../api/apiConf';
import { useSelector } from "react-redux"
import Recenttransaction from './Recenttransaction'
import Cardssection from './Cardssection'

const Dashboard = () => {
  const uid = useSelector((state) => state?.cookie?.user?.id ? state?.cookie?.user?.id : state?.cookie?.auth?.userdata?.id)
  const [currentIncome, setCurrentincome] = useState(0);
  const [currentExpense, setCurrentexpense] = useState(0);
  const [currentRemaining, setCurrentremaining] = useState(0);
  const getDashboarddata = async () => {
    let obj = {
      id: uid,      
    }

    // startDate: new Date(moment().startOf('month')),
    //   endDate: new Date(moment().endOf('month'))

    if(uid) {
      const responsedata = await apiConf.post('/incomexpense/status', obj);
      let resultData = responsedata?.data?.status ? responsedata?.data?.data : [];
      
      setCurrentincome(resultData?.currentmonthdata?.income ? resultData?.currentmonthdata?.income : 0);
      setCurrentexpense(resultData?.currentmonthdata?.expense ? resultData?.currentmonthdata?.expense : 0);
      setCurrentremaining(resultData?.currentmonthdata?.remaining ? resultData?.currentmonthdata?.remaining : 0);
    }
    
  }

  useEffect(() => {
    getDashboarddata();
  }, [uid])

  return (
    <Box className='px-4 py-4 rounded-md' sx={{ bgcolor: 'background.paper' }}>
      <Cardssection income={currentIncome} expense={currentExpense} remaining={currentRemaining} />
      <Recenttransaction />
    </Box>
  )
}

export default Dashboard