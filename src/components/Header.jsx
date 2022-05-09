import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';

import { MenuRounded } from '@mui/icons-material';
import {
  Drawer,
  Grid,
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

  return (
    <Grid
      container
      direction='row'
      alignItems='center'
      justifyContent='start'
      spacing={2}
    >
      <Grid item>
        <MenuRounded
          onClick={() => handleMenuClick()}
        />
        <Drawer
          anchor='left'
          open={open}
          onClose={handleOnClose}
        >
          <Grid
            container
            direction='row'
            alignItems='center'
            justifyContent='center'
            spacing={2}
          >
            <Grid item sx={{ marginLeft: 8, marginRight: 8, marginTop: 2 }}>
              <Grid
                container
                direction='column'
                alignItems='center'
                justifyContent='center'
                spacing={2}
              >
                <Grid item>
                  <Link to='/' onClick={handleOnClose}>
                    <Typography variant='h6' align='center'>Home</Typography>
                  </Link>
                </Grid>
                <Grid item>
                  {authenticated ? 
                    <Link to='/sign-out' onClick={handleOnClose}>
                      <Typography variant='h6' align='center'>Sign Out</Typography>
                    </Link> :
                    <Link to='/sign-in' onClick={handleOnClose}>
                      <Typography variant='h6' align='center'>Sign In</Typography>
                    </Link>
                  }
                </Grid>
                {authenticated ?
                  null :
                  <Grid item>
                    <Link to='/register' onClick={handleOnClose}>
                      <Typography variant='h6' align='center'>Register</Typography>
                    </Link>
                  </Grid>
                }
                {authenticated ?
                  <Grid item>
                    <Link to='/dashboard' onClick={handleOnClose}>
                       <Typography variant='h6' align='center'>Dashboard</Typography>
                     </Link>
                  </Grid> :
                   null
                }
              </Grid>
            </Grid>
          </Grid>
        </Drawer>
      </Grid>
      <Grid item>
        <div>Search Bar</div>
      </Grid>
    </Grid>
  )
};

export default Header;
