import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectedChat } from '../../slices/chatSlice';
import { Grid, ListItem, Button } from '@mui/material';
import { useState, useEffect } from 'react';

const Sidebar = () => {
  const { users } = useSelector(state => state.root.chat);
  const dispatch = useDispatch();
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    if (selectedChat) {
      const f = () => {
        dispatch(selectedChat(selectedUser));
      };
      f();
    }
  }, [selectedUser, dispatch]);

  return (
    <Grid  style={{ width: '15vw', backgroundColor: '#e0e0e0'}} >
      {users.map((user, index) => (
        <Grid item key={index} style={{ borderRadius: '8px', backgroundColor: '#1976d2', margin: '10px' }}>
          <ListItem button onClick={() => setSelectedUser(user)}>
            <Button style={{ boxSizing: 'border-box' , borderRadius : '8px', color: 'white' }}>{user.username}</Button>
          </ListItem>
        </Grid>
      ))}
    </Grid>
  );
};

export default Sidebar;