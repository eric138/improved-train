import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Dashboard from './views/Dashboard';
import Error from './views/Error';

const App = () => {
  return(
    <>
      <Routes>
        <Route exact path='/' element={<Dashboard />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </>
  )
};

export default App;
