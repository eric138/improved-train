import React from 'react';
import { useCookies } from 'react-cookie';
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const id = useSelector((state) => state.user.id);
  const name = useSelector((state) => state.user.name);
  const username = useSelector((state) => state.user.username);
  const token = useSelector((state) => state.user.token)
  const [cookies] = useCookies(['username', 'token'])

  return(
    <>
      <div>{`${name}'s Dashboard`}</div>
      <div>{`ID: ${id}`}</div>
      <div>{`USERNAME: ${username}`}</div>
      <div>{`TOKEN: ${token}`}</div>
      <div>{`Cookie Username: ${cookies.username}`}</div>
      <div>{`Cookie Token: ${cookies.token}`}</div>
    </>
  );
};

export default Dashboard;
