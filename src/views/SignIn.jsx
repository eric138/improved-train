import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';

import {
  Button,
  Grid,
  Paper,
  TextField,
  Typography
} from '@mui/material';

import { API_URL } from '../utils/constants';
import { setUser, setAuthenticated } from '../store/userSlice';

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // eslint-disable-next-line
  const [cookies, setCookie] = useCookies(['token', 'username']);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = () => {
    try {
      fetch(`${API_URL}login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.REACT_APP_KEY
        },
        body: JSON.stringify({
          'username': username,
          'password': password
        })
      })
        .then(response => response.json())
        .then(response => {
          dispatch(setUser({
            id: response.userId,
            name: response.user.name,
            username: response.user.username,
            email: response.user.email,
            token: response.token
          }));
          setCookie('username', response.user.username, { path: '/' });
          setCookie('token', response.token, { path: '/' });
          dispatch(setAuthenticated(true));
          navigate('/dashboard');
        })
        .catch(error => {
          console.error(error);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const handleRegister = () => {
    navigate('/register')
  };

  return(
    <Paper elevation={3}>
      <Grid
        container
        alignContent={'center'}
      >
        <Grid item xs={2}></Grid>
        <Grid
          item
          xs={8}
        >
          <Grid container alignContent={'center'} alignItems={'center'} spacing={2} sx={{ textAlign: 'center', marginTop: '12px', marginBottom: '12px' }}>
            <Grid item xs={12}>
              <Typography variant='h6'>Please Sign In</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField id='username' label='Username' variant='filled' onChange={handleUsernameChange} value={username} autoFocus />
            </Grid>
            <Grid item xs={12}>
              <TextField id='password' label='Password' variant='filled' onChange={handlePasswordChange} value={password} type='password'/>
            </Grid>
            <Grid item xs={12}>
              <Button size='large' onClick={handleLogin} variant='contained'>Log In</Button>
            </Grid>
            <Grid item xs={12}>
              <Typography variant='subtitle1'>Don't have an account?</Typography>
            </Grid>
            <Grid item xs={12}>
              <Button size='small' onClick={handleRegister} variant='contained'>Register Now</Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
    </Paper>
  );
};

export default SignIn;
