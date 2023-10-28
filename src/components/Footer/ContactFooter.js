import React from 'react'
import { FiSmartphone } from 'react-icons/fi'
import { HiOutlineMail } from 'react-icons/hi'
import { ImLocation2 } from 'react-icons/im'
import Logo from '../../images/logo-corazon.jpg'
const ContactFooter = () => {
  return (
    <div>
      <div className='pb-4'>
        <h4 className='title-section-footer'> CONTACTO</h4>
      </div>
      <div>
        <div
          xs={12}
          sm={4}
          className='d-flex align-items-start justify-content-start container-img-foot-phone pb-3'
        >
          <img src={Logo} alt='Virgen Maria' className='img-foot' />
        </div>
        <div className='d-flex justify-content-start'>
          <ImLocation2 className='icon-footer1 me-2' />{' '}
          <p className='text-contact-footer'>
            <a
              href='https://maps.app.goo.gl/NqQMrtvWN4QE7pQg7'
              className='link-location'
            >
              Santuario Inmaculada Madre del Divino Corazón Eucarístico de Jesús
            </a>
          </p>
        </div>
        <div className='d-flex justify-content-start'>
          <FiSmartphone className='icon-footer me-2' />{' '}
          <p className='text-contact-footer'>+5493874390030</p>
        </div>
        <div className='d-flex justify-content-start'>
          <HiOutlineMail className='icon-footer me-2' />{' '}
          <p className='text-contact-footer'>
            contacto@inmaculadamadre-salta.org
          </p>
        </div>
      </div>
    </div>
  )
}

export default ContactFooter
