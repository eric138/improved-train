import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';

import { MenuRounded } from '@mui/icons-material';
import {
  Button,
  Drawer,
  Grid,
  Typography
} from '@mui/material';

import { setUser, setAuthenticated } from '../store/userSlice';

const Header = () => {
  const [open, setOpen] = useState(false);
  const authenticated = useSelector((state) => state.user.authenticated);
  const dispatch = useDispatch();
  // eslint-disable-next-line
  const [cookies, setCookie, removeCookie] = useCookies(['token', 'username']);

  const handleMenuClick = () => {
    setOpen(true);
  };

  const handleOnClose = () => {
    setOpen(false);
  };

  const handleSignOutOnClose = () => {
    removeCookie('token', { path: '/' });
    removeCookie('username', { path: '/' });
    dispatch(setUser({
      id: null,
      name: null,
      username: null,
      token: null,
      email: null
    }));
    dispatch(setAuthenticated(false));
    setOpen(false);
  };

  return (
    <Grid
      container
      direction='row'
      alignItems='center'
      justifyContent='start'
      spacing={2}
      sx={{ margin: .5 }}
    >
      <Grid item>
        <Button size='small' onClick={handleMenuClick} variant='contained'>
          <MenuRounded />
        </Button>
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
                    <Link to='/sign-out' onClick={handleSignOutOnClose}>
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
        <Typography variant='h5' align='center'>Good Beans ☕</Typography>
      </Grid>
    </Grid>
  )
};

export default Header;
