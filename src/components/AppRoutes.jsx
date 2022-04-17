import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import SignIn from '../views/SignIn';
import SignOut from '../views/SignOut';
import Dashboard from '../views/Dashboard';
import Home from '../views/Home';
import Register from '../views/Register';

const AppRoutes = () => {
  const authenticated = useSelector((state) => state.user.authenticated);

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
