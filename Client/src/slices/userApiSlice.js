import { apiSlice } from "./apiSlice";
const USERS_URL = '/api';

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/users/auth`,
                method: 'POST',
                body: data,
                credentials: 'include',
            }),
        }),
        logout: builder.mutation ({
            query: ()=>({
                url: `${USERS_URL}/users/logout`,
                method: 'POST',
                credentials: 'include',
            }),
        }),
        register: builder.mutation({
            query: (data)=>({
                url: `${USERS_URL}/users/register`,
                method: 'POST',
                body: data,
                credentials: 'include',
            }),
        }),
        updateUser: builder.mutation({
            query: (data)=>({
                url: `${USERS_URL}/users/profile`,
                method: 'PUT',
                body: data,
                credentials: 'include',
            }),
        }),
        fetchAllUsers : builder.mutation({ 
            query: () => ({
                url : `${USERS_URL}/allusers`,
                method: 'GET',
                credentials: 'include',
            }),
        }),
        fetchChatMessages: builder.mutation({
            
            query: (chatSelected) => ({
                url: `${USERS_URL}/messages/${chatSelected._id}`,
                method: 'GET',
                credentials: 'include'
            }),
        }),
    }),
});

export const {  
    useLoginMutation, 
    useLogoutMutation,
    useRegisterMutation,
    useUpdateUserMutation,
    useFetchAllUsersMutation,
    useFetchChatMessagesMutation,
} = userApiSlice ;