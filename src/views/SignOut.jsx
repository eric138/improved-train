import React from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Button,
  Grid,
  Typography
} from '@mui/material';

const SignOut = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
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
        <Typography variant='h6'>You've been signed out.</Typography>
      </Grid>
      <Grid item>
        <Button variant='contained' size='large' onClick={handleClick}>Return Home</Button>
      </Grid>
    </Grid>
  );
};

export default SignOut;
