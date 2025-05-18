import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import './footer.css'
import DirectAccess from './DirectAccess'
import ContactFooter from './ContactFooter'
import AppPhone from './AppPhone'
const Footer = () => {
  return (
    <Container fluid className='container-footer'>
      <Row className='asd'>
        <Col xs={12} md={4} className='py-5 '>
          <ContactFooter />
        </Col>
        <Col
          xs={12}
          md={4}
          className='py-5 ps-footer-section '
        >
          <DirectAccess />
        </Col>
        <Col xs={12} md={4} className='py-5 '>
          <AppPhone />
        </Col>
      </Row>
    </Container>
  )
}

export default Footer
