import React from 'react';
import {FiSmartphone} from 'react-icons/fi'
import {HiOutlineMail} from 'react-icons/hi'
const ContactFooter = () => {
  return (
    <div>
      <div className='pb-4'>
      <h4 className='title-section-footer'> CONTACTO</h4>
      </div>
      <div>
        <p><FiSmartphone className='icon-footer me-2' /> <span className='text-contact-footer'>+549 0381 155001122</span></p>
        <p><HiOutlineMail className='icon-footer me-2' /> <span className='text-contact-footer'>nombre@dominio.com</span></p>
      </div>

    </div>
  );
};

export default ContactFooter;
