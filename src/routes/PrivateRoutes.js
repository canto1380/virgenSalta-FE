import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from '../components'
import Noticias from '../containers/Noticias'
import SingleNews from '../containers/SingleNews'
import LiveChapel from '../containers/LiveChapel'
import PrayerRequest from '../containers/PrayerRequest'
import Schedules from '../containers/Schedules'
import MenuAdmin from '../containers/Admin/MenuAdmin/index'
import Categories from '../containers/Categories'
import SingleNewsCategory from '../containers/SingleNewsCategory'
import SpecialDaysPage from '../containers/SpecialDays'
import SingleSpecialDays from '../containers/SingleSpecialDays'
import BackdropSection from '../containers/Admin/BackropSection.js'
import SingleHistory from '../containers/SingleHistories/index.js'

const PrivateRoutes = ({ token }) => {
  return (
    <Routes>
      <Route exact path='/home' element={<Home />} />
      <Route exact path='/noticias' element={<Noticias />} />
      <Route exact path='/noticias/:title' element={<SingleNews />} />
      <Route exact path='/categorias' element={<Categories />} />
      <Route
        exact
        path='/categorias/:nameCategory'
        element={<SingleNewsCategory />}
      />
      <Route exact path='/horarios' element={<Schedules />} />
      <Route exact path='/pedido-oracion' element={<PrayerRequest />} />
      <Route exact path='/vivo-capilla' element={<LiveChapel />} />
      <Route exact path='/jornadas' element={<SpecialDaysPage />} />
      <Route exact path='/jornadas/:title' element={<SingleSpecialDays />} />
      <Route exact path='/historias/:title' element={<SingleHistory/>} />

      <Route exact path='/admin/home/:idTab' element={<MenuAdmin />} />
      <Route exact path='/admin/home/:idTab/backdrop' element={<BackdropSection />} />

      {token.length && window?.location?.pathname === '/admin/login' ? (
        <Route
          path='*'
          element={<Navigate to='/admin/home/noticias' replace />}
        />
      ) : null}

      <Route path='*' element={<Navigate to='/admin/login' replace />} />
    </Routes>
  )
}

export default PrivateRoutes
