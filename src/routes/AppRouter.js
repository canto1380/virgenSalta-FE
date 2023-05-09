import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";
import PublicRoutes from "./PublicRoutes";

import { User } from "../context/userProvider";

const AppRouter = ({ bandera, setBandera }) => {
  const { state } = useContext(User);

  return (
    <div>
      <Router>
        <Routes>
          {window?.location?.pathname === "/" && (
            <Route path="*" element={<Navigate to="/home" replace />} />
          )}

          {!state.userToken || state.userToken.length === 0 ? (
            <Route
              path="/*"
              element={
                <PublicRoutes
                  bandera={bandera}
                  token={state.userToken}
                  setBandera={setBandera}
                />
              }
            />
          ) : (
            <Route
              path="/*"
              element={<PrivateRoutes token={state.userToken} />}
            />
          )}
        </Routes>
      </Router>
    </div>
  );
};

export default AppRouter;
