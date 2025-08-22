import React, {useState} from 'react'
import { Pie, PieChart, ResponsiveContainer, Cell, Legend } from 'recharts';
import { Box, Typography } from '@mui/material'

const Twomonthincome = ({lastmonthincomes}) => {
    const COLORS = ['#7b3fc0', '#38c767', '#f1390e', '#468A9A'];

    return (
        <Box className='px-4 py-4 rounded-md' sx={{ bgcolor: 'background.paper'}}>
            <Typography variant='p' className='text-base font-bold mb-2'>Last 60 Days Income</Typography>
            <div style={{ height: '288px' }}><ResponsiveContainer width="100%" height="100%">
                <PieChart width={100} height={300}>
                    <Pie data={lastmonthincomes} dataKey="value" cx="50%" cy="50%" innerRadius={70} outerRadius={90} label >
                        {lastmonthincomes.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Legend wrapperStyle={{
                        fontSize: '12px',
                    }} />
                </PieChart>
            </ResponsiveContainer></div>
        </Box>
    )
}

export default Twomonthincome