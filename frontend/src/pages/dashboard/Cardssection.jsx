import React from 'react'
import { Box, Grid, Avatar } from '@mui/material'
import { LiaRupeeSignSolid } from "react-icons/lia";
import { FiCreditCard } from "react-icons/fi";
import { BiSolidCoinStack } from "react-icons/bi";
import { BiWallet } from "react-icons/bi";

const cards = [{
    title: 'Total Balance',
    icon: <FiCreditCard className='text-xl text-white' />,
    avathorcolor: '#7b3fc0',
    key : 'remaining'
}, {
    title: 'Total Income',
    icon: <BiWallet className='text-xl text-white' />,
    avathorcolor: '#38c767',
    key : 'income'
}, {
    title: 'Total Expense',
    icon: <BiSolidCoinStack className='text-xl text-white' />,
    avathorcolor: '#f1390e',
    key : 'expense'
}]


const Cardssection = ({ income, remaining, expense }) => {
    return (
        <Box>
            <Grid container spacing={2}>
                {cards.map(item => {
                    return <Grid size={4} key={item.key}>
                        <Box className='flex p-3 rounded-md items-center' sx={{ bgcolor: 'background.paper' }}>
                            <div className='px-2'><Avatar sx={{ bgcolor: item.avathorcolor, height: '45px', width: '45px' }}>{item.icon}</Avatar></div>
                            <div><p className='text-xs'>{item.title }</p>
                                <div className="flex items-center text-xl font-semibold">
                                    <LiaRupeeSignSolid /><p>{item.key == 'expense' ? expense :item.key == 'income' ? income : remaining}</p>
                                </div>
                            </div>
                        </Box>
                    </Grid>
                })}                
            </Grid>
        </Box>
    )
}

export default Cardssection