import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../store/auth/authActions';
import {
  AppBar,
  Box,
  Button,
  Toolbar,
  Typography,
} from '@mui/material';

const Home = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const navItems = [
    {
      name: 'Login',
      link: '/login',
    },
    {
      name: 'Register',
      link: '/register',
    },
  ];
  return (
    <div>
      <AppBar component="nav" sx={{ backgroundColor: '#84C7AE' }}>
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Logo
          </Typography>
          {auth.currentUser ? (
            <Button
              onClick={() => dispatch(logout())}
              sx={{ color: '#fff', backgroundColor: '#05800066' }}
            >
              Logout
            </Button>
          ) : (
            <Box display="flex" gap="20px">
              {navItems.map((item) => (
                <Button
                  key={item}
                  sx={{ color: '#fff', backgroundColor: '#05800066' }}
                >
                  <Link
                    to={item.link}
                    textDecoration="none"
                    style={{ color: '#fff', textDecoration: 'none' }}
                  >
                    {item.name}
                  </Link>
                </Button>
              ))}
            </Box>
          )}
        </Toolbar>
      </AppBar>
      {auth.currentUser && (
        <Typography marginTop='100px'>Hello {auth.currentUser.username}</Typography>
      )}
    </div>
  );
};

export default Home;
