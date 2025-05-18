import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from '../components/index.jsx'
import Noticias from '../containers/Noticias'
import SingleNews from '../containers/SingleNews'
import LiveChapel from '../containers/LiveChapel'
import PrayerRequest from '../containers/PrayerRequest'
import Schedules from '../containers/Schedules'
import MenuAdmin from '../containers/Admin/MenuAdmin/index'
import Categories from '../containers/Categories/index.jsx'
import SingleNewsCategory from '../containers/SingleNewsCategory'
import SpecialDaysPage from '../containers/SpecialDays/index.jsx'
import SingleSpecialDays from '../containers/SingleSpecialDays/index.jsx'
import BackdropSection from '../containers/Admin/BackropSection.js/index.jsx'
import MessageVirgen from '../containers/MessageVirgen/index.jsx'
import MessageJesus from '../containers/MessageJesus/index.jsx'
import MessageGeneral from '../containers/MessageGeneral/index.jsx'
import OrderNewsContainer from '../containers/Admin/OrderNews/index.jsx'

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
      <Route exact path='/mensajes-de-la-virgen' element={<MessageVirgen />} />
      <Route
        exact
        path='/mensajes-de-nuestro-señor-jesucristo'
        element={<MessageJesus />}
      />
      <Route exact path='/mensaje-central' element={<MessageGeneral />} />

      <Route exact path='/admin/home/:idTab' element={<MenuAdmin />} />
      <Route
        exact
        path='/admin/home/:idTab/backdrop'
        element={<BackdropSection />}
      />
      <Route
        exact
        path='/admin/home/orden-noticias'
        element={<OrderNewsContainer />}
      />

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
