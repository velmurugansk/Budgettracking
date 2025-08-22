import React from 'react'
import { Box, Typography } from '@mui/material'
import moment from 'moment'
import { LiaRupeeSignSolid } from "react-icons/lia";
import money from "../../assets/money.png"
import { IoMdTrendingUp } from "react-icons/io";

const Recentincomes = ({recentincomes}) => {
    return (
        <Box className='px-4 py-4 rounded-md' sx={{ bgcolor: 'background.paper' }}>
            <Typography variant='p' className='text-base font-bold mb-2'>Incomes</Typography>
            {recentincomes && recentincomes.length > 0 ? recentincomes.map((item, index) => {
                return (<div className='flex items-center justify-between py-1' key={index + "expense"}>
                    <div className='flex items-center'><img src={item?.icon || money} className='h-[2rem] w-[2rem] px-1' />
                        <div className='text-[0.688rem]'>{item?.source}
                            <p className='text-[0.688rem]'>{item?.date ? moment(item?.date).format("DD-MM-YYYY") : ''}</p></div></div>
                    <div><div className='bg-green-200 px-2 py-1 rounded-md'><p className='text-green-600 flex items-center font-bold text-[0.688rem]'>+ <LiaRupeeSignSolid />{item?.amount} <IoMdTrendingUp /></p></div></div>
                </div>)
            }) : <div className='flex items-center'><p>No incomes found!</p></div>}
        </Box>
    )
}

export default Recentincomes