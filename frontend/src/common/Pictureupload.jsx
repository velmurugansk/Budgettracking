import React, { useState } from 'react'
import { Button, Avatar } from '@mui/material';
import { styled } from '@mui/material/styles'
import { LuUpload } from "react-icons/lu";

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const Pictureupload = ({ image, setImage }) => {
    const [profileurl, setProfileurl] = useState('');

    const handleChange = (e) => {
        e.preventDefault();
        const file = e.target.files[0];   
        if(file) {
            setImage(file)
            const preview = URL.createObjectURL(file);
            setProfileurl(preview);            
        }
    }

    return (
        <div className='flex'>            
            <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<LuUpload />}
            >
                Upload files
                <VisuallyHiddenInput
                    type="file"
                    onChange={(event) => handleChange(event)}
                    multiple
                    accept='image/png, image/jpeg'
                />
            </Button>
            <div className='ml-2'>                
                <Avatar alt="profile pic" src={profileurl} />
            </div>
        </div>
    )
}

export default Pictureupload    