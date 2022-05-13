import React from 'react';
import { useSelector } from 'react-redux';

import {
  Grid
} from '@mui/material';

const Dashboard = () => {
  const id = useSelector((state) => state.user.id);
  const name = useSelector((state) => state.user.name);
  const username = useSelector((state) => state.user.username);

  return(
    <Grid
      container
      justifyContent='center'
      alignItems='center'
      spacing={2}
      direction='column'
    >
      <Grid item xs={8}>{`${name}'s Dashboard`}</Grid>
      <Grid item xs={8}>{`ID: ${id}`}</Grid>
      <Grid item xs={8}>{`USERNAME: ${username}`}</Grid>
    </Grid>
  );
};

export default Dashboard;
