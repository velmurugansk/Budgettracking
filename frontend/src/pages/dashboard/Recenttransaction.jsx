import React from 'react'
import { Box, Typography } from '@mui/material'
import moment from 'moment'
import { LiaRupeeSignSolid } from "react-icons/lia";
import { IoMdTrendingDown, IoMdTrendingUp } from "react-icons/io";
import money from "../../assets/money.png"

const Recenttransaction = ({recenttransaction}) => {  
  return (
    <Box className='px-4 py-4 rounded-md' sx={{ bgcolor: 'background.paper', marginTop: '10px' }}>
      <Typography variant='p' className='text-base font-bold mb-2'>Recent Transaction</Typography>
      {recenttransaction && recenttransaction.length > 0 ? recenttransaction.map((item, indx) => {
          return (<div className='flex items-center justify-between py-1' key={indx+"recent"}>
            <div className='flex items-center'><img src={item?.icon || money} className='h-[2rem] w-[2rem] px-1' />
            <div className='text-[0.688rem]'>{item?.category ? item?.category : item?.source}
            <p className='text-[0.688rem]'>{item?.date ? moment(item?.date).format("DD-MM-YYYY") : ''}</p></div></div>
            <div>{item?.type === 'expense' ? <div className='bg-red-200 px-2 py-1 rounded-md'><p className='text-red-500 flex items-center font-bold text-[0.688rem]'>- <LiaRupeeSignSolid />{item?.amount} <IoMdTrendingDown /></p></div> : 
            <div className='bg-green-200 px-2 py-1 rounded-md'><p className='text-green-600 flex items-center font-bold text-[0.688rem]'>+<LiaRupeeSignSolid />{item?.amount} <IoMdTrendingUp /></p></div> }</div>
          </div>)
      }) : <div className='flex items-center'><p>No recent transactions!</p></div>}
      
    </Box>
  )
}

export default Recenttransaction