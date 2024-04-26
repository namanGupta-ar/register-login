import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userLogin } from '../store/auth/authActions';
import { useEffect } from 'react';

const Login = () => {
  const { isLoading, currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) navigate('/home');
  }, [currentUser, navigate]);

  const submitForm = (data) => {
    console.log('Login data', data);
    data.email = data.email.toLowerCase();

    dispatch(userLogin(data)).then((action) => {
      console.log('action', action);
      localStorage.setItem('accessToken', action.payload.token);
      navigate('/');
    });
  };

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          className="form-input"
          {...register('email')}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          className="form-input"
          {...register('password')}
          required
        />
      </div>
      <button type="submit" className="button" disabled={isLoading}>
        {/* {loading ? <Spinner /> : 'Register'} */}
        Login
      </button>
    </form>
  );
};

export default Login;
