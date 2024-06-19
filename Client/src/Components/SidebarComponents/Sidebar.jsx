import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectedChat } from '../../slices/chatSlice';
import { ListItem, Box, Typography, List, ListItemText } from '@mui/material';
import { useState, useEffect } from 'react';

const Sidebar = () => {
  const { users, unreadMessages } = useSelector(state => state.root.chat);
  const dispatch = useDispatch();
  const [selectedUser, setSelectedUser] = useState(null);
  const [newMessage, setNewMessage] = useState(false);

  useEffect(() => {
      if (selectedUser) {
        dispatch(selectedChat(selectedUser));
      }
  }, [selectedUser, dispatch]);
  useEffect(() => {
    if (Object.keys(unreadMessages).length > 0 && !selectedUser) {
      setNewMessage(true);
    } else {
      setNewMessage(false);
    }
  }, [unreadMessages , selectedUser ]);
  return (
    <Box
      style={{
        width: '15vw',
        height: '86vh', 
        backgroundColor: '#e0e0e0',
        padding: '10px',
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        overflowY: 'auto', 
      }}
    >
      <Typography variant="h6" style={{ marginBottom: '10px' }}>Users</Typography>
      <List>
        {users.map((user) => (
          <ListItem
            key={user._id}
            
            onClick={() => setSelectedUser(user)}
            style={{
              borderRadius: '8px',
              backgroundColor: selectedUser && selectedUser._id === user._id ? '#1976d2' : newMessage && user._id in unreadMessages ? '#9969b4' : '#c0c0c0',
              marginBottom: '10px',
              padding: '10px',
              color: 'white',
            }}
          >
            <ListItemText primary={user.username} />
            {user._id in unreadMessages && (
                <Typography variant="body2" style={{ fontSize: '12px', color: 'white' }}>
                  {unreadMessages[user._id]}
                </Typography>
              )}
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;