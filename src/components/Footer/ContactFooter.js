import React from 'react'
import { FiSmartphone } from 'react-icons/fi'
import { HiOutlineMail } from 'react-icons/hi'
import { ImLocation2 } from 'react-icons/im'
import Logo from '../../images/logo-corazon.jpg'
import { Col, Row } from 'react-bootstrap'
const ContactFooter = () => {
  return (
    <>
      <div className='pb-4'>
        <h4 className='title-section-footer'> CONTACTO</h4>
      </div>
      <div xs={12} sm={4} className='container-img-foot-icon pb-3'>
        <img src={Logo} alt='Virgen Maria' className='img-foot' />
      </div>

      <Row className='container-contact pb-1'>
        <Col sm={12} md={1}>
          <ImLocation2 className='icon-footer' />{' '}
        </Col>
        <Col sm={12} md={10}>
          <p className='text-contact-footer'>
            <a
              href='https://maps.app.goo.gl/NqQMrtvWN4QE7pQg7'
              className='link-location'
              rel='noreferrer'
              target='_blank'
            >
              Santuario Inmaculada Madre del Divino Corazón Eucarístico de Jesús
            </a>
          </p>
        </Col>
      </Row>

      <Row className='container-contact pb-1'>
        <Col sm={12} md={1}>
          <FiSmartphone className='icon-footer' />{' '}
        </Col>
        <Col sm={12} md={10}>
          <p className='text-contact-footer'>+5493874390030</p>
        </Col>
      </Row>

      <Row className='container-contact pb-1'>
        <Col sm={12} md={1}>
          <HiOutlineMail className='icon-footer' />{' '}
        </Col>
        <Col sm={12} md={10}>
          <p className='text-contact-footer'>
            contacto@inmaculadamadre-salta.org
          </p>
        </Col>
      </Row>
    </>
  )
}

export default ContactFooter
