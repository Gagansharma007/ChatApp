import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const navigate = useNavigate();
  const userInfo = useSelector(state=>state.root.auth.userInfo);
  useEffect(()=>{
    if( !userInfo ){
      navigate('/login');
    }
  },[navigate, userInfo ]);

  return (
    <div>
      Homepage
      </div>
  )
}

export default Homepage