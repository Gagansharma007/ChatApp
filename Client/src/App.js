import { BrowserRouter , Routes , Route } from 'react-router-dom';
import Register from './Pages/Register';
import Homepage from './Pages/Homepage';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Login from './Pages/Login';
import Header from './Components/Header';
import Chat from './Pages/Chat';
function App() {
  return (
    <div>
       <ToastContainer/>
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/chat' element={<Chat/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
