import React , { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import MessageContainer from '../Components/Messages/MessageContainer';
import Sidebar from '../Components/SidebarComponents/Sidebar';
import { useFetchAllUsersMutation } from '../slices/userApiSlice';
import { fetchUsers } from '../slices/chatSlice';
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
        const f = async () =>{
            const res = await fetchAllUsers().unwrap();
            dispatch( fetchUsers(res) );
        }
        f();
    },[navigate , userInfo , dispatch, fetchAllUsers ]);
  return (
    <div>
    {
        userInfo && 
        <div style={{ display : 'flex', flexDirection: 'row'}}>
            <Sidebar />
            <MessageContainer/>
        </div>   
    }
    </div>
  )
}

export default Chat;