import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';

import { Grid, TextField, Button } from '@mui/material';

import { API_URL } from '../utils/constants';
import { setUser, setAuthenticated } from '../store/userSlice';

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [matchError, setMatchError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [submitDisable, setSubmitDisable] = useState(true);
  const [usernameError, setUsernameError] = useState(false);
  const [usernameErrorMessage, setUsernameErrorMessage] = useState('');
  // eslint-disable-next-line
  const [cookies, setCookie] = useCookies(['token', 'username']);

  useEffect(() => {
    if (confirmPassword === password) {
      setMatchError(false);
      setErrorMessage(null);
    } else {
      setMatchError(true);
      setErrorMessage('Passwords do not match.')
    }

    //Check if everything is ready for submit then enable button
    if (!matchError && username && password && confirmPassword && email && name) {
      setSubmitDisable(false);
    } else {
      setSubmitDisable(true);
    }
  }, [password, confirmPassword, email, matchError, name, username]);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleRegister = (event) => {
    event.preventDefault();
    //Create user and return new id
    try {
      fetch(`${API_URL}register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.REACT_APP_KEY
        },
        body: JSON.stringify({
          'name': name,
          'email': email,
          'username': username,
          'password': password
        })
      })
        .then(response => response.json())
        .then(response => {
          if (response.message) {
            setUsernameError(true);
            setUsernameErrorMessage('Username taken.');
            console.error(response.message);
            return;
          } else {
            //Call login api with id
            setUsernameError(false);
            setUsernameErrorMessage('');
            try {
              fetch(`${API_URL}login`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'x-api-key': process.env.REACT_APP_KEY
                },
                body: JSON.stringify({
                  'username': response.username,
                  'password': password
                })
              })
                .then(response => response.json())
                .then(response => {
                  if (response.message) {
                    console.error(response.message);
                    navigate('/sign-in');
                  }
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
              console.error(error)
            }
          }
        })
        .catch(error => {
          console.error(error);
        });
    } catch (error) {
      console.error(error);
    }
  };

  return(
    <Grid
      container
      justifyContent='center'
      alignItems='center'
      spacing={2}
      direction='column'
    >
      <Grid item>
        <form onSubmit={handleRegister}>
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
                error={usernameError}
                helperText={usernameErrorMessage}
                onChange={handleUsernameChange}
                value={username}
                autoFocus
              />
            </Grid>
            <Grid item>
              <TextField id='email' label='Email' variant='filled' onChange={handleEmailChange} value={email} />
            </Grid>
            <Grid item>
              <TextField id='name' label='Name' variant='filled' onChange={handleNameChange} value={name} />
            </Grid>
            <Grid item>
              <TextField
                id='password'
                label='Password'
                variant='filled'
                onChange={handlePasswordChange}
                value={password}
                type='password'
              />
            </Grid>
            <Grid item>
              <TextField
                id='confirmPassword'
                label='Confirm Password'
                variant='filled'
                error={matchError}
                onChange={handleConfirmPasswordChange}
                value={confirmPassword}
                type='password'
                helperText={errorMessage}
              />
            </Grid>
            <Grid item>
              <Button
                size='large'
                type='submit'
                variant='contained'
                disabled={submitDisable}
              >
                Register
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  )
};

export default Register;
