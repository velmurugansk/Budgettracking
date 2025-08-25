import React from 'react'
import { Pie, PieChart, ResponsiveContainer, Cell, Legend } from 'recharts';
import { Box, Typography } from '@mui/material'
import Piechart from '../../common/Piechart';

const Finanicaloverview = ({ income, remaining, expense }) => {
    const data01 = [
        { name: 'Income', value: income },
        { name: 'Balance', value: remaining },
        { name: 'Expense', value: expense },
    ];

    return (
        <Box className='px-4 py-4 rounded-md' sx={{ bgcolor: 'background.paper', marginTop: '10px' }}>
            <Typography variant='p' className='text-base font-bold mb-2'>Financial Overview</Typography>
            <div style={{ height: '288px' }}>
                <Piechart chartdata={data01} />
            </div>
        </Box>
    )
}

export default Finanicaloverview