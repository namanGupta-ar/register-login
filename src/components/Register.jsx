import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { userRegister } from '../store/auth/authActions';
import { useEffect } from 'react';
import { Button, Stack, TextField, Typography } from '@mui/material';
import CustomContainer from './common/CustomContainer';
import validation from '../utils/validation';
import { toast } from 'react-toastify';

const Register = () => {
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
    console.log('register data', data);
    data.email = data.email.toLowerCase();

    dispatch(userRegister(data)).then((action) => {
      console.log('action', action);
      const {error, payload} = action;
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
              Create An Account
            </Typography>
            <Typography fontSize="12px">
              Create an account to know more about me
            </Typography>
          </Stack>
          <TextField
            autoComplete="username"
            name="username"
            variant="outlined"
            fullWidth
            id="username"
            label="UserName"
            autoFocus
            {...register('username', { required })}
            error={!!errors.username}
            helperText={errors.username?.message('username')}
          />
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
            Sign Up
          </Button>
          <Typography>
            Already Have An Account? <Link to="/login">Login</Link>
          </Typography>
        </Stack>
      </form>
    </CustomContainer>
  );
};

export default Register;
