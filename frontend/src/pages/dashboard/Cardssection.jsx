import React from 'react'
import {Box, Grid} from '@mui/material'

const Cardssection = ({income, remaining, expense}) => {
    return (
        <Box>
            <Grid container spacing={2}>
                <Grid size={4}>
                    <div className='flex p-2'>
                        <div></div>
                        <div><p>Total Balance</p>
                        <p>{remaining}</p></div>
                    </div>
                </Grid>
                <Grid size={4}>
                    <div className='flex p-2'>
                        <div></div>
                        <div><p>Total Income</p>
                        <p>{income}</p></div>
                    </div>
                </Grid>
                <Grid size={4}>
                    <div className='flex p-2'>
                        <div></div>
                        <div><p>Total Expense</p>
                        <p>{expense}</p></div>
                    </div>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Cardssection