import React, { useState } from 'react';
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
  // eslint-disable-next-line
  const [cookies, setCookie] = useCookies(['token', 'username']);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    //Add error handling here
    setConfirmPassword(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleRegister = () => {
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
          //Call login api with id
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
            console.error(error)
          }
        })
        .catch(error => {
          console.error(error);
        });
    } catch (error) {
      console.error(error);
    }
    //Change to sign in
    navigate('/sign-in')
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
        <TextField id='username' label='Username' variant='filled' onChange={handleUsernameChange} value={username} autoFocus />
      </Grid>
      <Grid item>
        <TextField id='email' label='Email' variant='filled' onChange={handleEmailChange} value={email} />
      </Grid>
      <Grid item>
        <TextField id='name' label='Name' variant='filled' onChange={handleNameChange} value={name} />
      </Grid>
      <Grid item>
        <TextField id='password' label='Password' variant='filled' onChange={handlePasswordChange} value={password} type='password'/>
      </Grid>
      <Grid item>
        <TextField id='confirmPassword' label='Confirm Password' variant='filled' onChange={handleConfirmPasswordChange} value={confirmPassword} type='password'/>
      </Grid>
      <Grid item>
        <Button size='large' onClick={handleRegister} variant='contained'>Register</Button>
      </Grid>
    </Grid>
  )
};

export default Register;
