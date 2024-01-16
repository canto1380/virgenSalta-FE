import React, { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { getToken, getDataToken } from '../../../helpers/helpers'
import Sidebar from '../../../components/Admin/Sidebar'
import '../index.css'
import '../../../components/Admin/sidebar.css'
import MenuNews from '../../../components/Admin/MenuNews'
import MenuCategories from '../../../components/Admin/MenuCategories'
import MenuAccount from '../../../components/Admin/MenuAccount'
import { getUserById } from '../../../utils/queryAPI/user'
import Unauthorized from '../../../components/Unauthorized'
import { useParams } from 'react-router-dom'
import MenuSchedules from '../../../components/Admin/MenuSchedules'
import MenuCarousel from '../../../components/Admin/MenuCarousel'
import MenuSpecialDays from '../../../components/Admin/MenuSpecialDays'
// import MenuHistory from '../../../components/Admin/MenuHistory'
import MenuNavbar from '../../../components/Admin/MenuNavbar'
import MenuFastAccess from '../../../components/Admin/MenuFastAccess'
import MenuStatistics from '../../../components/Admin/MenuStatistics.js'

const MenuAdmin = ({ userInfo }) => {
  const [inactivo, setInactivo] = useState(false)
  const [tokenAuth, setTokenAuth] = useState([])
  const [dataAuth, setDataAuth] = useState([])
  const [modalUnauthorized, setModalUnauthorized] = useState(false)
  const [dataUser, setDataUser] = useState([])

  const { idTab } = useParams()

  useEffect(() => {
    const tokenData = getToken()
    setTokenAuth(tokenData)
    setDataAuth(getDataToken)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    getDataUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokenAuth])
  const getDataUser = async () => {
    const data = await getUserById(dataAuth?._id, tokenAuth)
    if (data === false) {
      setModalUnauthorized(true)
    } else {
      setDataUser(data)
    }
  }

  let html
  switch (idTab) {
    case 'menu-principal':
      html = (
        <div className={`${inactivo ? `parte2Inactivo` : `parte2`}`}>
          <MenuNavbar idTab={idTab} />
        </div>
      )
      break
    case 'carousel':
      html = (
        <div className={`${inactivo ? `parte2Inactivo` : `parte2`}`}>
          <MenuCarousel idTab={idTab} />
        </div>
      )
      break

    // case 'historia':
    //   html = (
    //     <div className={`${inactivo ? `parte2Inactivo` : `parte2`}`}>
    //       <MenuHistory idTab={idTab} />
    //     </div>
    //   )
    //   break

    case 'noticias':
      html = (
        <div className={`${inactivo ? `parte2Inactivo` : `parte2`}`}>
          <MenuNews idTab={idTab} />
        </div>
      )
      break

    case 'categorias':
      html = (
        <div className={`${inactivo ? `parte2Inactivo` : `parte2`} `}>
          <MenuCategories idTab={idTab} />
        </div>
      )
      break
    case 'cuenta':
      html = (
        <div className={`${inactivo ? `parte2Inactivo` : `parte2`} `}>
          <MenuAccount idTab={idTab} dataUser={dataUser} />
        </div>
      )
      break

    case 'horarios':
      html = (
        <div className={`${inactivo ? `parte2Inactivo` : `parte2`} `}>
          <MenuSchedules idTab={idTab} />
        </div>
      )
      break

    case 'jornadas':
      html = (
        <div className={`${inactivo ? `parte2Inactivo` : `parte2`} `}>
          <MenuSpecialDays idTab={idTab} />
        </div>
      )
      break

    case 'acceso-rápido':
      html = (
        <div className={`${inactivo ? `parte2Inactivo` : `parte2`} `}>
          <MenuFastAccess idTab={idTab} />
        </div>
      )
      break

    case 'estadisticas':
      html = (
        <div className={`${inactivo ? `parte2Inactivo` : `parte2`} `}>
          <MenuStatistics idTab={idTab} />
        </div>
      )
      break

    default:
      window.location.href = '/admin/home/noticias'
  }

  return (
    <Container
      fluid
      className='container-admin p-0 d-flex justify-content-start'
    >
      <Sidebar
        inactivo={inactivo}
        setInactivo={setInactivo}
        tokenAuth={tokenAuth}
        dataAuth={dataAuth}
      />
      <Container fluid className='container-admin-data'>
        {html}
        {modalUnauthorized && (
          <div className=''>
            <Unauthorized />
          </div>
        )}
      </Container>
    </Container>
  )
}

export default MenuAdmin
