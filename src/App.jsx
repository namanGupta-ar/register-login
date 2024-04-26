import { useDispatch, useSelector } from 'react-redux';
import './App.css'
import { Fragment, useEffect } from 'react';
import { getCurrentUser, logout } from './store/auth/authActions';
import { Link, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';

function App() {

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getCurrentUser());
  },[dispatch])

  return (
    <>
      <Link to="/" >Home</Link>
      {auth.currentUser ? (<p onClick={() => dispatch(logout())}>Logout</p>) : (
        <Fragment>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </Fragment>
      )}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </>
  );
}

export default App
