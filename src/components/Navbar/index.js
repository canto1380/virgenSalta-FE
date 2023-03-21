import React from "react";
import { Nav, Navbar, Container, NavDropdown, Button } from "react-bootstrap";
import './navbar.css'

const NavbarPrimary = () => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
      <Container>
        <Navbar.Brand href="#home">
          {/* <Image
            fluid
            src={ImageVirgen}
            className='img-logo'
            alt="Imagen de la Virgen"
          /> */}
          Imagen
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#features">Menu 1</Nav.Link>
            <Nav.Link href="#pricing">Menu 2</Nav.Link>
            <NavDropdown title="Menu Desplegable" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav className='nav-section2'>
            {/* <Nav.Link href="#deets">More deets</Nav.Link>
            <Nav.Link eventKey={2} href="#memes">
              Dank memes
            </Nav.Link> */}
            <Button variant='outline-light' className='btn-language px-2'>es</Button>
            <Button variant='outline-light' className='btn-language px-2'>en</Button>
            <Button variant='outline-light' className='btn-language px-2'>fr</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarPrimary;
