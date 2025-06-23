import apiConf from "./api/apiConf";

export const validateEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(email)) {
        return true;
    } else {
        return false;
    }
};

export const validatePassword = (pwd) => {
    if (pwd.length < 6) {
        return true;
    } else {
        return false;
    }
}


export const imageUpload = async (file) => {
    if(file) {
        const formData = new FormData();
        formData.append('image', file)
        const response = await apiConf.post('/upload/image',formData);        
        return response?.data?.imageurl ? response?.data?.imageurl : '';
    }    
}


