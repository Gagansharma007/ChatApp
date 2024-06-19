import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './Pages/Register';
// import Homepage from './Pages/Homepage';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Login from './Pages/Login';
import Header from './Components/Header';
import { useEffect } from 'react';
import { socket } from './Socket/socket';
import Chat from './Pages/Chat';

function App() {
  useEffect(() => {
    socket.connect();

    socket.on('connect', () => {
      console.log('Connected to socket server');
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from socket server');
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <ToastContainer />
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Chat />} />
          {/* <Route path='/chat' element={<Chat />} /> */}
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
