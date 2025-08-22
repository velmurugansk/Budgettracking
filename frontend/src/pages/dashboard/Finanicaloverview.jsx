import React from 'react'
import { Pie, PieChart, ResponsiveContainer, Cell, Legend } from 'recharts';
import { Box, Typography } from '@mui/material'

const Finanicaloverview = ({ income, remaining, expense }) => {
    const data01 = [
        { name: 'Income', value: income },
        { name: 'Balance', value: remaining },
        { name: 'Expense', value: expense },
    ];

    const COLORS = ['#7b3fc0', '#38c767', '#f1390e', '#468A9A']

    return (
        <Box className='px-4 py-4 rounded-md' sx={{ bgcolor: 'background.paper', marginTop: '10px' }}>
            <Typography variant='p' className='text-base font-bold mb-2'>Financial Overview</Typography>
            <div style={{ height: '288px' }}><ResponsiveContainer width="100%" height="100%">
                <PieChart width={100} height={300}>
                    <Pie data={data01} dataKey="value" cx="50%" cy="50%" innerRadius={70} outerRadius={90} label >
                        {data01.map((entry, index) => (
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

export default Finanicaloverview