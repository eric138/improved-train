import React, { useState } from 'react';

import Grid from '@mui/material/Grid';

import Header from './components/Header';

import AppContext from './Store';
import AppRoutes from './components/AppRoutes';

const App = () => {
  const [user, setUser] = useState();
  const [authenticated, setAuthenticated] = useState();
  
  const value = {
    user,
    setUser,
    authenticated,
    setAuthenticated
  };

  return(
    <AppContext.Provider value={value}>
      <Grid
        container
        alignContent={'center'}
      >
        <Grid item xs={2}></Grid>
        <Grid
          item
          xs={8}
        >
          <Header />
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
      <Grid
        container
        alignContent={'center'}
      >
        <Grid item xs={2}></Grid>
        <Grid
          item
          xs={8}
        >
          <AppRoutes />
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
    </AppContext.Provider>
  );
};

export default App;
