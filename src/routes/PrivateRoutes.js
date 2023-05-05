import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../components";
import Noticias from "../containers/Noticias";
import SingleNews from "../containers/SingleNews";
import { noticias } from "../utils/seeders";
import LiveChapel from "../containers/LiveChapel";
import PrayerRequest from "../containers/PrayerRequest";
import Schedules from "../containers/Schedules";
import MenuAdmin from "../containers/Admin/MenuAdmin/index";

const PrivateRoutes = ({ token }) => {
  return (
    <Routes>
      <Route exact path="/home" element={<Home />} />
      <Route exact path="/noticias" element={<Noticias />} />
      <Route
        exact
        path="/noticias/:title"
        element={<SingleNews data={noticias} />}
      />
      <Route exact path="/horarios" element={<Schedules />} />
      <Route exact path="/pedido-oracion" element={<PrayerRequest />} />
      <Route exact path="/vivo-capilla" element={<LiveChapel />} />

      <Route exact path="/admin/home" element={<MenuAdmin />} />

      {token.length && window?.location?.pathname === "/admin/login" ? (
        <Route path="*" element={<Navigate to="/admin/home" replace />} />
      ) : null}

      <Route path="*" element={<Navigate to="/admin/login" replace />} />
    </Routes>
  );
};

export default PrivateRoutes;
