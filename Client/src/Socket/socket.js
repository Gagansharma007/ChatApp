// socket.js

import { io } from 'socket.io-client';

const URL = 'http://localhost:5000';

// Function to retrieve userId from local storage or cookies
const getUserIdFromStorage = () => {
    // Example: Retrieve userId from local storage
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    return userInfo && userInfo._id ? userInfo._id : null;
};

// Function to initialize socket and return it
const initializeSocket = () => {
    let userId = getUserIdFromStorage();
    if( !userId ){
        userId = null;
    }
    const socket = io(URL, {
        autoConnect: false,
        withCredentials: true,
        query: {
            userId: userId,
        }
    });

    return socket;
};

// Export the initialized socket instance
export const socket = initializeSocket();
