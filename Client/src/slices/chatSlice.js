import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    userInfo : localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null,
    users: [],
    messages: [],
    unreadMessages : {},
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
            state.messages.push(action.payload)
        },
        receiveMessage : ( state, action ) => {
            state.messages.push( action.payload );
            const { senderId , receiverId } = action.payload;
            if( state.chatSelected ){
                if( senderId !== state.chatSelected._id && receiverId === state.userInfo._id ){
                    if(!state.unreadMessages[senderId] ) {
                        state.unreadMessages[senderId] = 1;
                    } else {
                        state.unreadMessages[senderId]++;
                    }
                }
            } else {
                if( receiverId === state.userInfo._id ){
                    if(!state.unreadMessages[senderId] ) {
                        state.unreadMessages[senderId] = 1;
                    } else {
                        state.unreadMessages[senderId]++;
                    }
                }
            }
        },
        selectedChat : (state , action ) => {
            state.chatSelected = action.payload;
            delete state.unreadMessages[state.chatSelected._id]
        }
    },
});

export const { fetchUsers , fetchMessages , sendMessage , receiveMessage, selectedChat } = chatSlice.actions ;

export const chatSliceReducer =  chatSlice.reducer ;    