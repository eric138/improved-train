import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';

import SignIn from '../views/SignIn';
import SignOut from '../views/SignOut';
import Dashboard from '../views/Dashboard';
import Home from '../views/Home';
import Register from '../views/Register';

import AppContext from '../Store';

const AppRoutes = () => {
  const { authenticated } = useContext(AppContext);

  return(
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/sign-in' element={<SignIn />} />
      <Route path='/sign-out' element={<SignOut />} />
      <Route path='/register' element={<Register />} />
      <Route path='/dashboard' element={authenticated ? <Dashboard /> : <SignIn />} />
    </Routes>
  )
};

export default AppRoutes;
