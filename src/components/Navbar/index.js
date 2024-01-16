import React, { useEffect, useState } from 'react'
import {
  Nav,
  Navbar,
  Container,
  NavDropdown,
  Button,
  Image,
} from 'react-bootstrap'
import './navbar.css'
import ImageLogo from '../../images/logo-corazon.jpg'
import { getItemNav } from '../../utils/queryAPI/navbar'
import { getItemNavCategory } from '../../utils/queryAPI/navbarCategory'
const NavbarPrimary = ({ home }) => {
  const [itemNavCategory, setItemNavCategory] = useState(undefined)
  const [itemNav, setItemNav] = useState(undefined)

  useEffect(() => {
    getDataNavbar()
  }, [])

  const getDataNavbar = async () => {
    const params = { visible: true, limit: 100000000 }
    const dataItemNav = await getItemNav(params)
    setItemNav(dataItemNav.allItemNav)

    const params1 = { visible: true, limit: 5 }
    const dataItemNavCategory = await getItemNavCategory(params1)
    setItemNavCategory(dataItemNavCategory.allItemNavCategory)
  }
  return (
    <Navbar collapseOnSelect expand='lg' bg='light' variant='light'>
      <Container fluid>
        <Navbar.Brand href='/home'>
          <Image
            fluid
            src={ImageLogo}
            className='img-logo'
            alt='Imagen de la Virgen'
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='me-auto' key='1'>
            {itemNavCategory &&
              itemNavCategory?.map((d) =>
                d.urlRedirect === '' ? (
                  <NavDropdown
                    title={d.itemNavCategory.toUpperCase()}
                    id={d._id}
                    key={d._id}
                    className='container-dd'
                  >
                    {itemNav?.map((d1) => {
                      if (d1?.idItemNavCategory?._id === d._id) {
                        return (
                          <NavDropdown.Item
                            key={d1._id}
                            href={`/${d1.pathUrl}/${d1.url}`}
                            target={`${d1.openWindows === true ? '_blank' : '_self'}`}
                          >
                            {d1.title}
                          </NavDropdown.Item>
                        )
                      } else {
                        return null
                      }
                    })}
                  </NavDropdown>
                ) : (
                  <Nav.Link
                    key={d._id}
                    href={`/${d.urlRedirect}`}
                    className='title-text'
                  >
                    {d.itemNavCategory.toUpperCase()}{' '}
                  </Nav.Link>
                )
              )}
          </Nav>
          <Nav className='nav-section2' key='2'>
            <Button variant='outline-light' className='btn-language px-2'>
              es
            </Button>
            <Button variant='outline-light' className='btn-language px-2'>
              en
            </Button>
            <Button variant='outline-light' className='btn-language px-2'>
              fr
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavbarPrimary
