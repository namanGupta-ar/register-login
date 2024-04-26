import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userRegister } from '../store/auth/authActions';
import { useEffect } from 'react';

const Register = () => {
  const { isLoading, currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) navigate('/home');
  }, [currentUser, navigate]);

  const submitForm = (data) => {
    console.log('register data', data);
    data.email = data.email.toLowerCase();

    dispatch(userRegister(data)).then((action) => {
      console.log('action', action);
      localStorage.setItem('accessToken', action.payload.token);
      navigate('/');
    });
  };

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <div className="form-group">
        <label htmlFor="userName">UserName</label>
        <input
          type="text"
          className="form-input"
          {...register('username')}
          required
        />
      </div>
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
        register
      </button>
    </form>
  );
};

export default Register;
