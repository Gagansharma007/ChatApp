import React, { useState } from 'react';
import { Grid, TextField, Button, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useSendChatMessageMutation } from '../../slices/userApiSlice';
import { sendMessage } from '../../slices/chatSlice';
import { socket } from '../../Socket/socket';
import { toast } from 'react-toastify';

const InputMessage = () => {
    const [message, setMessage] = useState('');
    const dispatch = useDispatch();
    const { userInfo } = useSelector(state => state.root.auth);
    const { chatSelected } = useSelector(state => state.root.chat);
    const [sendChatMessage] = useSendChatMessageMutation();

    const handleMessageSend = async () => {
        if (message.trim() === '') {
            toast.error('Message cannot be empty');
            return;
        }
        const messageData = {
            senderId: userInfo._id,
            senderName: userInfo.username,
            receiverId: chatSelected._id,
            message,
            createdAt: Date.now(),
        };
        try {
            const response = await sendChatMessage({ add: chatSelected._id, message: { message } }).unwrap();
            dispatch(sendMessage(response));
            socket.emit('sendMessage', messageData);
        } catch (err) {
            toast.error(err.message);
        }
        setMessage('');
    };

    const handleKeyDown = (e) => {
      if( e.key === 'Enter' && !e.shiftKey ){
        e.preventDefault();
        handleMessageSend();
      } 
    }
    return (
      <Box mt={2} p={2} bgcolor="#f0f0f0" position="fixed" bottom={0} width="100%">
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={9}> 
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Type your message..."
              multiline
              value={message}
              onKeyDown = {handleKeyDown}
              onChange={(e) => setMessage(e.target.value)}
              
            />
          </Grid>
          <Grid item xs={3}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleMessageSend}
            >
              Send
            </Button>
          </Grid>
        </Grid>
      </Box>
    );
};

export default InputMessage;
