import { useDispatch } from 'react-redux';
import './App.css'
import { useEffect } from 'react';
import { getCurrentUser } from './store/auth/authActions';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer} from 'react-toastify';
 import 'react-toastify/dist/ReactToastify.css';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser());
  },[dispatch])

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App
