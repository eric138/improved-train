import React, { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';

import Grid from '@mui/material/Grid';

import Header from './components/Header';
import AppRoutes from './components/AppRoutes';
import { API_URL } from './utils/constants';
import { setUser, setAuthenticated } from './store/userSlice';

const App = () => {
  const dispatch = useDispatch();
  const authenticated = useSelector((state) => state.user.authenticated);
  // eslint-disable-next-line
  const [cookies, setCookie, removeCookie] = useCookies(['username', 'token']);

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
          <Grid item sx={{ marginTop: 12 }}>
            <AppRoutes />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default App;
