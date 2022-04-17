import React, { useState } from 'react';

import { Paper, Grid, Typography, TextField, Button } from '@mui/material';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

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

  const handleRegister = () => {
    console.log('click');
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
              <Typography variant='h6'>Register An Account</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField id='username' label='Username' variant='filled' onChange={handleUsernameChange} value={username} autoFocus />
            </Grid>
            <Grid item xs={12}>
              <TextField id='email' label='Email' variant='filled' onChange={handleEmailChange} value={email} />
            </Grid>
            <Grid item xs={12}>
              <TextField id='name' label='Name' variant='filled' onChange={handleNameChange} value={name} />
            </Grid>
            <Grid item xs={12}>
              <TextField id='password' label='Password' variant='filled' onChange={handlePasswordChange} value={password} type='password'/>
            </Grid>
            <Grid item xs={12}>
              <TextField id='confirmPassword' label='Confirm Password' variant='filled' onChange={handleConfirmPasswordChange} value={confirmPassword} type='password'/>
            </Grid>
            <Grid item xs={12}>
              <Button size='large' onClick={handleRegister} variant='contained'>Log In</Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
    </Paper>
  )
};

export default Register;
