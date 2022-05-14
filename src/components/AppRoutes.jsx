import React from 'react';
import { Routes, Route } from 'react-router-dom';

import SignIn from '../views/SignIn';
import SignOut from '../views/SignOut';
import Dashboard from '../views/Dashboard';
import Home from '../views/Home';
import Register from '../views/Register';

const AppRoutes = () => {
  return(
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/sign-in' element={<SignIn />} />
      <Route path='/sign-out' element={<SignOut />} />
      <Route path='/register' element={<Register />} />
      <Route path='/dashboard' element={<Dashboard />} />
    </Routes>
  )
};

export default AppRoutes;
