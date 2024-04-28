import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { userLogin } from '../store/auth/authActions';
import { useEffect } from 'react';
import CustomContainer from './common/CustomContainer';
import { Button, Stack, TextField, Typography } from '@mui/material';
import validation from '../utils/validation';
import { toast } from 'react-toastify';

const Login = () => {
  const { isLoading, currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { required, minLength, emailPattern, passwordPattern } = validation;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();


  useEffect(() => {
    if (currentUser) navigate('/');
  }, [currentUser, navigate]);


  const submitForm = (data) => {
    console.log('Login data', data);
    data.email = data.email.toLowerCase();

    dispatch(userLogin(data)).then((action) => {
      console.log('action', action);
      const { error, payload } = action;
      if (error?.message === 'Rejected') {
        const key = Object.keys(payload)[0];
        toast.error(`${key} ${payload[key][0]}`);
      } else {
        localStorage.setItem('accessToken', payload.token);
        navigate('/');
      }
    });
  };

  return (
    <CustomContainer>
      <form onSubmit={handleSubmit(submitForm)}>
        <Stack
          sx={{
            gap: '30px',
            border: '1px solid #84C7AE',
            padding: '40px 30px',
            width: '300px',
            borderRadius: '20px',
          }}
        >
          <Stack alignItems="center" justifyContent="center">
            <Typography fontWeight={700} fontSize="28px">
              Login
            </Typography>
            <Typography fontSize="12px">Login to your account</Typography>
          </Stack>
          <TextField
            variant="outlined"
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            {...register('email', {
              required,
              pattern: { ...emailPattern },
            })}
            error={!!errors.email}
            helperText={errors.email?.message('email')}
          />
          <TextField
            variant="outlined"
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            {...register('password', {
              required,
              minLength,
              pattern: { ...passwordPattern },
            })}
            error={!!errors.password}
            helperText={errors.password?.message('password', 8)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={isLoading}
            style={{
              backgroundColor: '#84C7AE',
              color: '#fff',
              height: '45px',
            }}
          >
            Login
          </Button>
          <Typography>
            Don&#39;t Have An Account? <Link to="/register">Register</Link>
          </Typography>
        </Stack>
      </form>
    </CustomContainer>
  );
};

export default Login;
