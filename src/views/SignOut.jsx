import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import { Button, Grid, Paper, Typography } from '@mui/material';

import AppContext from '../Store';

import './Style.css';

const SignOut = () => {
  const navigate = useNavigate();
  const { setUser, setAuthenticated } = useContext(AppContext);
  // eslint-disable-next-line
  const [cookies, setCookie, removeCookie] = useCookies(['token', 'username']);

  const handleClick = () => {
    navigate('/');
  };

  useEffect(() => {
    removeCookie('token', { path: '/' });
    removeCookie('username', { path: '/' });
    setUser(null);
    setAuthenticated(false);
  }, [setUser, setAuthenticated, removeCookie]);

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
              <Typography variant='h6'>You've been signed out.</Typography>
            </Grid>
            <Grid item xs={12}>
              <Button variant='contained' size='large' onClick={handleClick}>Return Home</Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
    </Paper>
  );
};

export default SignOut;
