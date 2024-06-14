import { combineReducers, } from "@reduxjs/toolkit";

import { authSliceReducer } from "./authSlice";
import { chatSliceReducer } from './chatSlice';

const rootReducer = combineReducers( {
    chat: chatSliceReducer,
    auth: authSliceReducer,
})

export default rootReducer;