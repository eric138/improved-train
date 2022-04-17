import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';

import { MenuRounded } from '@mui/icons-material';
import {
  Drawer,
  Grid,
  Paper,
  Typography
} from '@mui/material';

import { API_URL } from '../utils/constants';
import { setUser, setAuthenticated } from '../store/userSlice';

import './Style.css';

const Header = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const authenticated = useSelector((state) => state.user.authenticated)
  const [cookies] = useCookies(['username', 'token']);

  const handleMenuClick = () => {
    setOpen(true);
  };

  const handleOnClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (!authenticated && cookies.username && cookies.token) {
      fetch(`${API_URL}verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.REACT_APP_KEY
        },
        body: JSON.stringify({
          'username': cookies.username,
          'token': cookies.token
        })
      })
        .then(response => response.json())
        .then(response => {
          dispatch(setAuthenticated(true));
          dispatch(setUser({
            id: response.user.id,
            name: response.user.name,
            username: response.user.username,
            token: response.user.token,
            email: response.user.email
          }));
        })
        .catch(error => console.error(error));
    }
  }, [dispatch, cookies, authenticated]);

  return(
    <Paper elevation={3} sx={{ mb: '24px' }}>
      <Grid
        container
        alignContent={'center'}
      >
        <Grid item xs={2}>
          <MenuRounded
            onClick={() => handleMenuClick()}
            sx={{ margin: '12px' }}
          />
          <Drawer
            anchor='left'
            open={open}
            onClose={handleOnClose}
          >
            <div className='menu-bg'>
              <Grid
                container
                alignContent={'center'}
              >
                <Grid item xs={1}></Grid>
                  <Grid item xs={10}>
                    <Paper elevation={3} sx={{ mb: '12px' }}>
                      <Link to='/' onClick={handleOnClose}>
                        <Typography variant='h6' align='center'>Home</Typography>
                      </Link>
                    </Paper>
                    <Paper elevation={3} sx={{ mb: '12px' }}>
                      {authenticated ? 
                        <Link to='/sign-out' onClick={handleOnClose}>
                          <Typography variant='h6' align='center'>Sign Out</Typography>
                        </Link> :
                        <Link to='/sign-in' onClick={handleOnClose}>
                          <Typography variant='h6' align='center'>Sign In</Typography>
                        </Link>
                      }
                    </Paper>
                    {authenticated && <Paper elevation={3} sx={{ mb: '12px' }}>
                      <Link to='/dashboard' onClick={handleOnClose}>
                        <Typography variant='h6' align='center'>Dashboard</Typography>
                      </Link>
                    </Paper>}
                  </Grid>
                <Grid item xs={1}></Grid>
              </Grid>
            </div>
          </Drawer>
        </Grid>
        <Grid
          item
          xs={8}
        >
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
    </Paper>
  );
};

export default Header;
