import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authReducer";
import userVerify from "./userVerify";

const rootReducer = combineReducers({
    "auth":authReducer,    
    "cookie": userVerify    
});

export default rootReducer;