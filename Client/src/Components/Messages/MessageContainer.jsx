import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Container , Grid } from '@mui/material';
import { fetchMessages } from '../../slices/chatSlice';
import { useFetchChatMessagesMutation } from '../../slices/userApiSlice';
import { toast } from 'react-toastify';
const MessageContainer = () => {
    const { userInfo } = useSelector( state => state.root.auth );
    const { chatSelected, messages } = useSelector( state=> state.root.chat );
    const dispatch = useDispatch();
    const [ fetchChatmessages ] = useFetchChatMessagesMutation();
    useEffect(()=>{
        if(chatSelected){
            const f = async () => {
            try{
                const res = await fetchChatmessages(chatSelected).unwrap();
                dispatch(fetchMessages(res));
            } catch (err) {
                toast.error(err.message);
            }
        }
        f();
        }
    },[chatSelected, dispatch, fetchChatmessages ]);
   
    
  return (
    <Container style={{ paddingTop: '25px', width: '85vw'}}>
        {
            !chatSelected ? 
            (
                <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                >
                    <Grid item > 
                        <Typography variant="h5">Welcome {userInfo.username}</Typography>
                        <Typography variant="body1">Select a chat to start messaging</Typography>
                    </Grid>

                </Grid>
            )
            : 
            (
                <div>
                    {
                        messages ? 
                        <Grid container spacing={3}
                  style={{
                    display: 'flex', 
                    flexDirection: 'column', 
                    padding : '20px', 
                    minHeight: '85vh', 
                    width : '85vw', 
                    backgroundColor: '#f5f5f5', 
                    borderRadius: '10px', 
                    boxShadow: '0 0 10px rgba(0,0,0,0.1)'
                  }}
                >
                  {Object.values(messages).map((message, index) => (
                    <Grid key={index}  >
                      <Typography variant="body2" align={message.receiverId === userInfo._id ? 'right' : 'left'}
                        style={{
                          color: message.receiverId === userInfo._id ? 'gray' : 'black',
                          fontSize: '12px',
                          borderRadius: '10px',
                          backgroundColor: message.receiverId === userInfo._id ? '#f7f7f7' : '#f5f5f5'
                        }}
                      >
                        {message.receiverId === userInfo._id ? chatSelected.username : 'You' } &nbsp;
                        
                        
                      </Typography>
                      <Typography variant="h6" align={message.receiverId === userInfo._id ? 'right' : 'left'}
                        style={{
                          color: 'black',
                          fontSize: '16px'
                        }}
                      >
                        {message.message}
                      </Typography>
                      <Typography variant="body2" align={message.receiverId === userInfo._id ? 'right' : 'left'}
                        style={{
                          color: message.receiverId === userInfo._id ? 'gray' : 'black',
                          fontSize: '10px',
                          borderRadius: '10px',
                          backgroundColor: message.receiverId === userInfo._id ? '#f7f7f7' : '#f5f5f5'
                        }}
                      >
                        { new Date(message.createdAt).toISOString()}
                        
                        
                      </Typography>
                    </Grid>
                  ))}
                </Grid>
                        : 
                        (
                            <Grid
                            container
                            justifyContent="center"
                            alignItems="center"
                            style={{ minHeight: '85vh', width : '85vw' }}
                            >
                                <Grid item > 
                                    <Typography variant="h4">Welcome {userInfo.username}</Typography>
                                    <Typography variant="h4">Start Chat with {chatSelected.username}.</Typography>
                                </Grid>
                            </Grid>
                            
                        )
                    }
                </div>
            )
        }
    </Container>
  )
}

export default MessageContainer;