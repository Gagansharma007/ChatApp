import React , { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import MessageContainer from '../Components/Messages/MessageContainer';
import Sidebar from '../Components/SidebarComponents/Sidebar';
import { useFetchAllUsersMutation } from '../slices/userApiSlice';
import { fetchUsers } from '../slices/chatSlice';
import InputMessage from '../Components/Messages/InputMessage';

const Chat = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { userInfo } = useSelector( state => state.root.auth );
    const [ fetchAllUsers ] = useFetchAllUsersMutation();
    useEffect(()=>{
        if( !userInfo ){
            navigate('/login');
            return;
        }
        const fetchUsersData = async () => {
            try {
                const users = await fetchAllUsers().unwrap();
                dispatch(fetchUsers(users));
            } catch (error) {
                console.error('Failed to fetch users:', error);
            }
        };
        fetchUsersData();
    },[navigate , userInfo , dispatch, fetchAllUsers ]);
  return (
    <div>
    {
        userInfo && 
        <div style={{ display : 'flex', flexDirection: 'row'}}>
            <Sidebar />
            <div>
                <MessageContainer/>
                <InputMessage/>
            </div>
        </div>   
    }
    </div>
  )
}

export default Chat;