import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../components";
import Noticias from "../containers/Noticias";
import SingleNews from "../containers/SingleNews";
import LiveChapel from "../containers/LiveChapel";
import PrayerRequest from "../containers/PrayerRequest";
import Schedules from "../containers/Schedules";
import Login from "../containers/Admin/login";
import Categories from "../containers/Categories";
import SingleNewsCategory from "../containers/SingleNewsCategory";

const PublicRoutes = ({bandera, setBandera, token}) => {
  return (
    <Routes>
      <Route exact path="/home" element={<Home/>} />
      <Route exact path="/noticias" element={<Noticias />} />
      <Route
        exact
        path="/noticias/:title"
        element={<SingleNews />}
      />
      <Route exact path='/categorias' element={<Categories/>} />
      <Route
        exact
        path="/categorias/:nameCategory"
        element={<SingleNewsCategory />}
      />
      <Route exact path="/horarios" element={<Schedules />} />
      <Route exact path="/pedido-oracion" element={<PrayerRequest />} />
      <Route exact path="/vivo-capilla" element={<LiveChapel />} />

      <Route exact path="/admin/login" element={<Login bandera={bandera} setBandera={setBandera}/>} token={token}/>

      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
};

export default PublicRoutes;
