import React, { useState, useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import {
  BsFillCaretRightFill,
  BsFillCaretLeftFill,
  BsNewspaper,
  BsCalendarDate,
  BsBodyText,
  BsMenuButtonWideFill,
} from 'react-icons/bs'
import {
  BiCategoryAlt,
  BiUserCircle,
  BiLogOut,
  BiCarousel,
} from 'react-icons/bi'
import { FaCalendarAlt } from "react-icons/fa";
import '../sidebar.css'
import { deleteCookies, deleteToken } from '../../../helpers/helpers'
import { Link } from 'react-router-dom'

const Sidebar = ({ inactivo, setInactivo, dataAuth }) => {
  const [initial, setInitial] = useState('')
  const [initialSurname, setInitialSurname] = useState('')

  const cerrarSesion = async (e) => {
    deleteToken()
    deleteCookies()
    window.location.href = '/admin/login'
  }

  const itemsSideBar = [
    {
      title: 'menu-principal',
      iconName: <BsMenuButtonWideFill className='sizeIcon' />,
      name: 'Menú',
    },
    {
      title: 'video',
      iconName: <BiCarousel className='sizeIcon' />,
      name: 'Video portada',
    },
    {
      title: 'historia',
      iconName: <BsBodyText className='sizeIcon' />,
      name: 'Historia',
    },
    {
      title: 'noticias',
      iconName: <BsNewspaper className='sizeIcon' />,
      name: 'Noticias y contenido',
    },
    {
      title: 'categorias',
      iconName: <BiCategoryAlt className='sizeIcon' />,
      name: 'Categorias',
    },
    {
      title: 'horarios',
      iconName: <FaCalendarAlt className='sizeIcon' />,
      name: 'Calendario',
    },
    {
      title: 'jornadas',
      iconName: <BsCalendarDate className='sizeIcon' />,
      name: 'Jornadas',
    },
    {
      title: 'cuenta',
      iconName: <BiUserCircle className='sizeIcon' />,
      name: 'Cuenta',
    },
  ]
  useEffect(() => {
    const a = dataAuth?.name?.toUpperCase()
    const b = dataAuth?.surname?.toUpperCase()
    setInitial(a?.substr(0, 1))
    setInitialSurname(b?.substr(0, 1))
  }, [dataAuth])

  return (
    <div
      className={`${
        inactivo
          ? `sidebarInactivo text-light bg-dark h-100`
          : `sidebar text-light bg-dark h-100`
      }`}
    >
      <Row
        className={`${
          inactivo
            ? 'pt-4 pb-2 d-flex justify-content-center align-items-center m-0'
            : 'pt-4 pb-2 d-flex justify-content-center align-items-center m-0'
        }`}
      >
        <Col
          xs={3}
          className={` ${
            inactivo
              ? `justify-content-center px-0 imgContainer`
              : `text-center px-0`
          }`}
        >
          <div className={`imgProfile text-center`}>
            {initial}
            {initialSurname}
          </div>
        </Col>
        <Col xs={6} className='px-1'>
          <p className={`${inactivo ? `inactivo` : 'mb-0'}`}>
            {dataAuth?.nickname}
          </p>
        </Col>

        {inactivo ? (
          <Col
            xs={12}
            className={`text-light mt-3 btn-menu text-center px-0`}
            onClick={() => setInactivo(!inactivo)}
          >
            {
              <BsFillCaretRightFill
                title='Desplegar'
                className={`sizeIcon cursorPointer`}
              />
            }
          </Col>
        ) : (
          <Col
            xs={2}
            className={`p-0 text-light btn-menu`}
            onClick={() => setInactivo(!inactivo)}
          >
            {
              <BsFillCaretLeftFill
                title='Minimizar'
                className='sizeIcon cursorPointer'
              />
            }
          </Col>
        )}
      </Row>
      <hr />
      <ul className='text-decoration-none list-unstyled sidebarList'>
        {itemsSideBar.map((items, i) => (
          <Link
            key={i}
            className='text-white text-decoration-none'
            to={`/admin/home/${items.title}`}
          >
            <li
              // onClick={() => changeTab(items.title)}
              title={items.title}
              className={`${
                inactivo
                  ? `sidebarListRow d-flex justify-content-center align-items-center`
                  : `sidebarListRow d-flex justify-content-start px-3 align-items-center`
              }`}
            >
              <div className=''>{items.iconName}</div>
              <div className={` ${inactivo ? `inactivo` : 'ms-3'}`}>
                {items.name}
              </div>
            </li>
          </Link>
        ))}

        <li
          onClick={() => cerrarSesion()}
          title='Salir'
          className={`${
            inactivo
              ? `sidebarListRow d-flex justify-content-center align-items-center`
              : `sidebarListRow d-flex justify-content-start px-3 align-items-center`
          }`}
        >
          <div className=''>
            <BiLogOut className='sizeIcon' />
          </div>
          <div className={` ${inactivo ? `inactivo` : 'ms-3'}`}>Salir</div>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar
