import React, { useState, useEffect } from 'react'
import { Box, Grid } from '@mui/material'
import moment from 'moment';
import apiConf from '../../api/apiConf';
import { useSelector } from "react-redux"
import Recenttransaction from './Recenttransaction'
import Cardssection from './Cardssection'
import Finanicaloverview from './Finanicaloverview'
import Recentexpense from './Recentexpense';
import Lastmonthexpense from './Lastmonthexpense';

const Dashboard = () => {
  const uid = useSelector((state) => state?.cookie?.user?.id ? state?.cookie?.user?.id : state?.cookie?.auth?.userdata?.id)
  const [currentIncome, setCurrentincome] = useState(0);
  const [currentExpense, setCurrentexpense] = useState(0);
  const [currentRemaining, setCurrentremaining] = useState(0);
  const [recentTransaction, setRecenttransaction] = useState([]);
  const [recentExpenses, setRecentexpenses] = useState([]);
  const [chartData, setChartdata] = useState([]);
  const getDashboarddata = async () => {
    let obj = {
      id: uid,
    }

    // startDate: new Date(moment().startOf('month')),
    //   endDate: new Date(moment().endOf('month'))

    if (uid) {
      const responsedata = await apiConf.post('/incomexpense/status', obj);
      let resultData = responsedata?.data?.status ? responsedata?.data?.data : [];

      setCurrentincome(resultData?.currentmonthdata?.income ? resultData?.currentmonthdata?.income : 0);
      setCurrentexpense(resultData?.currentmonthdata?.expense ? resultData?.currentmonthdata?.expense : 0);
      setCurrentremaining(resultData?.currentmonthdata?.remaining ? resultData?.currentmonthdata?.remaining : 0);

      setRecenttransaction(resultData?.combinedtransaction ? resultData?.combinedtransaction : []);
      setRecentexpenses(resultData?.currentmonthexpense ? resultData?.currentmonthexpense : []);
      let monthlastexpense = resultData?.currentmonthexpense ? resultData?.currentmonthexpense : [];
      setRecentexpenses([]);
      monthlastexpense.map((item, indx) => {
        if(indx <= 6) {
          setRecentexpenses(recentExpenses => [...recentExpenses, item])
        }
      })

      monthlastexpense.map(item => {
        setChartdata(prevData => [...prevData, {
          name: item?.category,
          xaxis: moment.utc(item.date).local().format('DD MMM'),
          amount: item.amount
        }])
      })
    }

  }

  useEffect(() => {
    getDashboarddata();
  }, [uid])

  return (
    <Box className='px-4 py-4 rounded-md'>
      <Cardssection income={currentIncome} expense={currentExpense} remaining={currentRemaining} />
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Recenttransaction recenttransaction={recentTransaction} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Finanicaloverview income={currentIncome} expense={currentExpense} remaining={currentRemaining} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Recentexpense recentexpenses={recentExpenses} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Lastmonthexpense lastmnthexpenses={chartData} />
        </Grid>
      </Grid>
    </Box>
  )
}

export default Dashboard