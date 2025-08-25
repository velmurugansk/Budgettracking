import React from 'react'
import { Pie, PieChart, ResponsiveContainer, Cell, Legend } from 'recharts';
const COLORS = ['#7b3fc0', '#38c767', '#f1390e', '#468A9A'];

const Piechart = ({chartdata}) => {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <PieChart width={100} height={300}>
                <Pie data={chartdata} dataKey="value" cx="50%" cy="50%" innerRadius={70} outerRadius={90} label >
                    {chartdata.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Legend wrapperStyle={{
                    fontSize: '12px',
                }} />
            </PieChart>
        </ResponsiveContainer>
    )
}

export default Piechart