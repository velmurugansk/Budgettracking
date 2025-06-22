import { createSlice } from "@reduxjs/toolkit";

const cookieAuth = new createSlice({
    name: "cookieAuth",
    initialState: {
        user: {id:''},
        isAuthenticated: false,
    },
    reducers: {
        setAuth: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
        },
        logout: (state) => {        
            state.user = null;
            state.isAuthenticated = false;
        },
    }
})

export const { setAuth, logout } = cookieAuth.actions;
export default cookieAuth.reducer;