import EmojiPicker from 'emoji-picker-react';
import { useState } from 'react';
import { LuImage, LuX } from 'react-icons/lu';

const Emojipickermodal = ({ icon, onselect }) => {
    const [isopen, setIsopen] = useState(false);

    const handleImageselect = (emoji) => {
        onselect(emoji?.imageUrl || '');
        setIsopen(false);
    }

    return <div className='flex items-center '>
        <div className='flex items-center gap-4 cursor-pointer' onClick={() => setIsopen(true)}>
            <div className='w-12 h-12 flex items-center justify-center text-2xl'>
                {icon ? (<img src={icon} alt="icon" className='w-12 h-12' />) : <LuImage />}
            </div>
            <p className=''>{icon ? "Change Icon" : "Pick Icon"}</p>
        </div>
        {isopen && (<div className='relative'>
            <button className='w-7 h-7 flex items-center justify-center' onClick={() => setIsopen(false)}><LuX /></button>
            <div className='absolute z-3'>
                <EmojiPicker
                    open={isopen}
                    onEmojiClick={handleImageselect} />
            </div>
        </div>)}
    </div>
}

export default Emojipickermodal