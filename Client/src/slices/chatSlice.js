import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users: [],
    messages: [],
    newMessage: null,
    chatSelected: null,
}
const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        fetchUsers : (state, action) => {
            state.users = action.payload;
        },
        fetchMessages: ( state, action ) =>{
            state.messages = action.payload;
        },
        sendMessage : ( state, action ) => {
            state.newMessage = action.payload;
        },
        receiveMessage : ( state, action ) => {
            state.messages.push( action.payload );
        },
        selectedChat : (state , action ) => {
            state.chatSelected = action.payload;
        }
    },
});

export const { fetchUsers , fetchMessages , sendMessage , receiveMessage, selectedChat } = chatSlice.actions ;

export const chatSliceReducer =  chatSlice.reducer ;