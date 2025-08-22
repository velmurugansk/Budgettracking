import React, {useState, useEffect} from 'react'
import moment from 'moment'
import { Box, Typography } from '@mui/material'
import { BarChart, Bar, Rectangle, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Lastmonthexpense = ({lastmnthexpenses}) => {    
    return (
        <Box className='px-4 py-4 rounded-md' sx={{ bgcolor: 'background.paper'}}>
            <Typography variant='p' className='text-base font-bold mb-2'>Last 30 days Expenses</Typography>
            <div className="mt-1" style={{ height: '282px' }}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        width={500}
                        height={300}
                        data={lastmnthexpenses}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <XAxis dataKey="xaxis" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="amount" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </Box>
    )
}

export default Lastmonthexpense