import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../components";
import Noticias from "../containers/Noticias";
import SingleNews from "../containers/SingleNews";
import { noticias } from "../utils/seeders";
import LiveChapel from "../containers/LiveChapel";
import PrayerRequest from "../containers/PrayerRequest";
import Schedules from "../containers/Schedules";

const PublicRoutes = () => {
  return (
    <Routes>
      <Route exact path="/home" element={<Home />} />
      <Route exact path="/noticias" element={<Noticias />} />
      <Route exact path="/noticias/:title" element={<SingleNews data={noticias}/>} />
      <Route exact path="/horarios" element={<Schedules />} />
      <Route exact path="/pedido-oracion" element={<PrayerRequest />} />
      <Route exact path="/vivo-capilla" element={<LiveChapel />} />
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
};

export default PublicRoutes;
