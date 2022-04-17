import React, { useContext } from 'react';
import { useCookies } from 'react-cookie';

import AppContext from '../Store';

const Dashboard = () => {
  const { user } = useContext(AppContext);
  const [cookies] = useCookies(['username', 'token'])

  return(
    <>
      <div>{`${user.name}'s Dashboard`}</div>
      <div>{`ID: ${user.id}`}</div>
      <div>{`USERNAME: ${user.username}`}</div>
      <div>{`TOKEN: ${user.token}`}</div>
      <div>{`Cookie Username: ${cookies.username}`}</div>
      <div>{`Cookie Token: ${cookies.token}`}</div>
    </>
  );
};

export default Dashboard;
