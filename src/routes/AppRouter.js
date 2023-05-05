import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";
import PublicRoutes from "./PublicRoutes";

const AppRouter = ({ bandera, setBandera, token }) => {
  return (
    <div>
      <Router>
        <Routes>
          {token && token !== null ? (
            <Route path="/*" element={<PrivateRoutes token={token} />} />
          ) : (
            <Route
              path="/*"
              element={
                <PublicRoutes
                  bandera={bandera}
                  token={token}
                  setBandera={setBandera}
                />
              }
            />
          )}
        </Routes>
      </Router>
    </div>
  );
};

export default AppRouter;
