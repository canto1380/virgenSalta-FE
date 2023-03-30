import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../components";

const PublicRoutes = () => {
  return (
    <Routes>
      <Route exact path="/home" element={<Home />} />
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
};

export default PublicRoutes;
