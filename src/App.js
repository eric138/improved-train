import React from 'react';

import Grid from '@mui/material/Grid';

import Header from './components/Header';

import AppRoutes from './components/AppRoutes';

const App = () => {

  return(
    <Grid
      container
      direction='row'
      alignItems='center'
      justifyContent='center'
      spacing={2}
    >
      <Grid item xs={8}>
        <Grid
          container
          direction='column'
          alignItems='center'
          justifyContent='center'
          spacing={2}
        >
          <Grid item>
            <Header />
          </Grid>
          <Grid item>
            <AppRoutes />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default App;
