import React from "react";
import { Nav, Navbar, Container, NavDropdown, Button, Image } from "react-bootstrap";
import "./navbar.css";
import ImageLogo from '../../images/logo-corazon.jpg'
const NavbarPrimary = ({home}) => {
  return (
    
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
      <Container fluid>
        <Navbar.Brand href="/home">
          <Image
            fluid
            src={ImageLogo}
            className='img-logo'
            alt="Imagen de la Virgen"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {/* <Nav.Link href="#features">Menu 1</Nav.Link> */}

            <NavDropdown title="HISTORIA" id="db-historia" className="container-dd">
              <NavDropdown.Item href="#action/3.1">
                Historia de las Apariciones
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Historia del Santuario
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">
                La Oración de Intercesión
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.4">
                Fundación IMCEJ y SACEJ
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.5">
                Centro de Difusión Confio en tu Corazón
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.6">
                Padre René Laurentin
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.7">
                Libros y Publicaciones
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="SANTUARIO" id="dd-santuario" className="container-dd">
              <NavDropdown.Item href="#action/3.1">
                Servicios
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Mapa del Santuario
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">
                Horarios
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.4">
                Acreditación Sacerdotal
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.5">
                Celebración Anual de la Fiesta de la Ssma Virgen
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.6">
                Encuentro Mundial de Jóvenes
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.7">
                Fiesta del Señor y Virgen del Milagro
              </NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="PEREGRINAR" id="dd-peregrinar" className="container-dd">
              <NavDropdown.Item href="#action/3.1">
                Cómo llegar al Santuario
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Coordinadores y Misioneros
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">
                Calendario
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.4">
                Receso
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.5">
                Conferencias
              </NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="MENSAJES" id="dd-mensajes" className="container-dd">
              <NavDropdown.Item href="#action/3.1">
                Mensajes de la Santísima Virgen
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Mensajes de Nuestro Señor Jesucristo
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">
                Mensaje Central
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.4">
                Consagraciones
              </NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="NOVEDADES" id="dd-novedades" className="container-dd">
              <NavDropdown.Item href="#action/3.1">
                Actualidad
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Avisos IMPORTANTES
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">
                Protocolos COVID-19
              </NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="SERVIDORES" id="dd-servidores" className="container-dd">
              <NavDropdown.Item href="#action/3.1">
                Servidores de la Inmaculada Madre
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Colaborar en el Santuario
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav className="nav-section2">
            {/* <Nav.Link href="#deets">More deets</Nav.Link>
            <Nav.Link eventKey={2} href="#memes">
              Dank memes
            </Nav.Link> */}
            <Button variant="outline-light" className="btn-language px-2">
              es
            </Button>
            <Button variant="outline-light" className="btn-language px-2">
              en
            </Button>
            <Button variant="outline-light" className="btn-language px-2">
              fr
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarPrimary;
