import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';

import {
  Button,
  Grid,
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
  const [error, setError] = useState(false);
  const authenticated = useSelector((state) => state.user.authenticated);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
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
          setError(false);
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
          setError(true);
          console.error(error);
        });
    } catch (error) {
      setError(true);
      console.error(error);
    }
  };

  const handleRegister = () => {
    navigate('/register')
  };

  useEffect(() => {
    if (authenticated) {
      navigate('/dashboard');
    }
  }, [navigate, authenticated]);

  return(
      <Grid
        container
        justifyContent='center'
        alignItems='center'
        spacing={2}
        direction='row'
      >
        <Grid item xs={8}>
          <Grid
            container
            justifyContent='center'
            alignItems='center'
            spacing={2}
            direction='column'
          >
            <Grid item>
              <form onSubmit={handleLogin}>
                <Grid
                  container
                  justifyContent='center'
                  alignItems='center'
                  spacing={2}
                  direction='column'
                >
                  <Grid item>
                    <TextField
                      id='username'
                      label='Username'
                      variant='filled'
                      error={error}
                      onChange={handleUsernameChange}
                      value={username}
                      autoFocus
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      id='password'
                      label='Password'
                      variant='filled'
                      error={error}
                      onChange={handlePasswordChange}
                      value={password}
                      type='password'
                    />
                  </Grid>
                  <Grid item>
                    <Button size='large' type='submit' variant='contained'>Log In</Button>
                  </Grid>
                </Grid>
              </form>
            </Grid>
            <Grid item>
              <Typography variant='subtitle1' sx={{ textAlign: 'center' }}>Need an account?</Typography>
            </Grid>
            <Grid item>
              <Button size='small' onClick={handleRegister} variant='contained'>Register</Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
  );
};

export default SignIn;
