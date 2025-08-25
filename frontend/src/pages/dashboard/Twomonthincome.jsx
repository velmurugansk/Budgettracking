import React, {useState} from 'react'
import { Box, Typography } from '@mui/material'
import Piechart from '../../common/Piechart';

const Twomonthincome = ({lastmonthincomes}) => {
    
    return (
        <Box className='px-4 py-4 rounded-md' sx={{ bgcolor: 'background.paper'}}>
            <Typography variant='p' className='text-base font-bold mb-2'>Last 60 Days Income</Typography>
            <div style={{ height: '288px' }}>
                <Piechart chartdata={lastmonthincomes} />
            </div>
        </Box>
    )
}

export default Twomonthincome