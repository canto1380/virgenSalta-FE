import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import PrivateRoutes from './PrivateRoutes';
import PublicRoutes from './PublicRoutes';

const AppRouter = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/*' element={<PublicRoutes/>} />
        </Routes>
      </Router>
    </div>
  );
};

export default AppRouter;
