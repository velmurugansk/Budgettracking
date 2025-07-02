import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiConf from '../api/apiConf'

export const userLogin = createAsyncThunk('auth/login', async (info) => {
    try {
        const response = await apiConf.post('/auth/login', info, { withCredentials: true });        
        return response;
    } catch (error) {        
        return error.response.data;
    }
})

export const userRegister = createAsyncThunk('auth/register', async(info) => {
    try {
        const response = await apiConf.post('/auth/register', info, { withCredentials: true });        
        return response;
    } catch (error) {
        return error.response.data;
    }
})

const initialState = {
    errorMessage:'',
    loading: '',
    userdata: '',    
    successMessage: '',
    isAuthenticate: false,
    isRegistered: false
}

const authSlice = new createSlice({
    name : "auth",
    initialState,
    reducers:{
        clearErrorMessage: (state) => {
            state.errorMessage = '';
        },
        clearSuccessMessage: (state) => {
            state.successMessage = '';
        },
        logoutState: (state) => {
            state.errorMessage = '';
            state.loading = '';            
            state.successMessage = '';
            state.userdata = '';
            state.isAuthenticate = false;
        }
    },
    extraReducers:(builder) => {
        builder.addCase(userLogin.pending, (state) => {
            state.loading = true;
        }).addCase(userLogin.rejected, (state, { payload }) => {
            state.loading = '';
            state.errorMessage = payload.error;
            state.isAuthenticate = false;                        
        }).addCase(userLogin.fulfilled, (state, {payload}) => {
            state.loading = '';
            state.successMessage = payload.data.message;
            state.userdata = payload.data.data;
            state.isAuthenticate = true;            
        }).addCase(userRegister.pending, (state) => {
            state.isRegistered = false;
        }).addCase(userRegister.rejected, (state, { payload }) => {
            state.isRegistered = false;
            state.errorMessage = payload.error;
        }).addCase(userRegister.fulfilled, (state, { payload }) => {
            state.isRegistered = true;
            state.userdata = payload.data.data;
        })
    }
})

export const { clearErrorMessage, clearSuccessMessage, logoutState } = authSlice.actions;
export default authSlice.reducer