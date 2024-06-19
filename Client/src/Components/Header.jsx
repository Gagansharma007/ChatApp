import { Typography, AppBar, Toolbar, IconButton, Button, Badge } from "@mui/material"
import { useNavigate , Link } from "react-router-dom";
// import HomeIcon from '@mui/icons-material/Home';
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../slices/userApiSlice";
import ChatIcon from '@mui/icons-material/Chat';
import { logout } from "../slices/authSlice";
const Header = () => {
    const userInfo  = useSelector(state=>state.root.auth.userInfo);
    const { unreadMessages } = useSelector( state=>state.root.chat);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [ logoutapicall ] = useLogoutMutation();
    const logoutHandler = async ()=>{
        try{
            await logoutapicall().unwrap();
            dispatch(logout());
            navigate('/login');
        } catch(err){
            console.log(err);
        }
    }
    const handleHomeClick = ()=>{
        navigate('/');
    }
    const getTotalUnreadMessages = () => {
        return Object.values(unreadMessages).reduce((total,count)=>total+count,0);
    }
  return (
    <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1, cursor: 'pointer' }} onClick={handleHomeClick}>
                    Chat App
                </Typography>
                <IconButton color="inherit" sx={{ marginRight : '20px' }} onClick={handleHomeClick}>
                    <Badge badgeContent={getTotalUnreadMessages()} color="error">
                        <ChatIcon />
                    </Badge>
                </IconButton>
                {userInfo ? 
                <>
                {/* <IconButton color="inherit" onClick={()=> navigate('/chat')} sx={{  marginRight: '20px' }}>
                   < ChatIcon />
                </IconButton> */}
                <IconButton color="inherit" >
                    <Typography variant="body1" sx={{ marginRight : '20px' }}>{userInfo.username}</Typography>
                </IconButton>
                <Button color="inherit" onClick={logoutHandler}>
                    Logout
                </Button> </>
                : 
                <>
                 <Button component={Link} to="/login" color="inherit" sx={{ mr: 1 }}>
                 Login
                 </Button>
                 <Button component={Link} to="/register" color="inherit">
                 Register
                 </Button>
                </> 
                }
            </Toolbar>
        </AppBar>
  )
}

export default Header