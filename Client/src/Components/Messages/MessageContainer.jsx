import React, { useEffect , useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Container, Box } from '@mui/material';
import { fetchMessages, receiveMessage  } from '../../slices/chatSlice';
import { useFetchChatMessagesMutation } from '../../slices/userApiSlice';
import { toast } from 'react-toastify';
import { socket } from '../../Socket/socket';

const MessageContainer = () => {
    const { userInfo } = useSelector(state => state.root.auth);
    const { chatSelected, messages } = useSelector(state => state.root.chat);
    const dispatch = useDispatch();
    const [fetchChatMessages] = useFetchChatMessagesMutation();
    useEffect(() => {
        if (chatSelected) {
            const fetchMessagesAsync = async () => {
                try {
                    const res = await fetchChatMessages(chatSelected).unwrap();
                    dispatch(fetchMessages(res));
                } catch (err) {
                    toast.error(err.message);
                }
            };
            fetchMessagesAsync();
        }
    }, [chatSelected, dispatch, fetchChatMessages]);

    useEffect(() => {
        socket.on('newMessage', (message) => {
            if (message.receiverId === userInfo._id || message.senderId === userInfo._id) {
                dispatch(receiveMessage(message));
            }
        });

        return () => {
            socket.off('newMessage');
        };
    }, [dispatch, userInfo]);
    const messageContainerRef = useRef(null);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);
    const scrollToBottom = () => {
        if (messageContainerRef.current) {
            messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
        }
    };

    return (
        <Container style={{ paddingTop: '25px', paddingBottom: '100px', width: '85vw', overflowY: 'auto', maxHeight: '90vh' }} ref={messageContainerRef} >
            {!chatSelected ? (
                <Box style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    
                        <Typography variant="h5">Welcome {userInfo.username}</Typography>
                        <Typography variant="body1" style={{ textAlign: 'center' }}>Select a chat to start messaging</Typography>
                    
                </Box>
            ) : (
                <Box
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        padding: '20px',
                        backgroundColor: '#f5f5f5',
                        borderRadius: '10px',
                        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
                    }}
                >
                    {messages.map((message, index) => (
                        <Box
                            key={index}
                            style={{
                                alignSelf: message.senderId === userInfo._id ? 'flex-end' : 'flex-start',
                                maxWidth: '70%',
                                padding: '10px',
                                borderRadius: '10px',
                                backgroundColor: message.senderId === userInfo._id ? '#1976d2' : '#c0c0c0',
                                color: message.senderId === userInfo._id ? 'white' : 'black',
                                marginBottom: '10px',
                                wordWrap: 'break-word'
                            }}
                        >
                            <Typography variant="body2" style={{ fontSize: '12px', color: 'gray' }}>
                                {message.senderId === userInfo._id ? 'You' : message.senderName}
                            </Typography>
                            <Typography variant="body1" style={{ fontSize: '16px' }}>
                                {message.message}
                            </Typography>
                            <Typography variant="caption" style={{ fontSize: '10px', color: 'gray' }}>
                                {new Date(message.createdAt).toLocaleString()}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            )}
        </Container>
    );
};

export default MessageContainer;