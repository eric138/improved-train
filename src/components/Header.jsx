import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { MenuRounded } from '@mui/icons-material';
import {
  Drawer,
  Grid,
  Typography
} from '@mui/material';

const Header = () => {
  const [open, setOpen] = useState(false);
  const authenticated = useSelector((state) => state.user.authenticated);

  const handleMenuClick = () => {
    setOpen(true);
  };

  const handleOnClose = () => {
    setOpen(false);
  };

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
