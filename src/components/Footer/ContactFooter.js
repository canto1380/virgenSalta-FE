import React, { useState } from 'react'
import { FiSmartphone } from 'react-icons/fi'
import { HiOutlineMail } from 'react-icons/hi'
import { ImLocation2 } from 'react-icons/im'
import { Col, Row } from 'react-bootstrap'
import { getConfigurations } from '../../utils/queryAPI/configurations'
import { useEffect } from 'react'
const ContactFooter = () => {
  const [allContactData, setAllContactData] = useState(undefined)

  useEffect(() => {
    dataContact()
  }, [])
  const dataContact = async () => {
    const params = { deleted: false }
    const data = await getConfigurations(params)
    setAllContactData(data.allConfigurations)
  }


  return (
    <>
      <div className='pb-4'>
        <h4 className='title-section-footer'> CONTACTO</h4>
      </div>
      <div xs={12} sm={4} className='container-img-foot-icon pb-3'>

        {!allContactData
          ? null
          : allContactData.map((d, i) => {
              if (d.title === 'Logo pie de página' && d.mixedField !== '') {
                return (
                  <div key={i}>
                    <img
                      // key={d._id}
                      src={d.mixedField}
                      alt='Virgen Maria'
                      className='img-foot'
                    />
                  </div>
                )
              }
              return null
            })}
      </div>
      {!allContactData
        ? null
        : allContactData.map((d) => {
            if (d.title === 'Ubicación' && d.mixedField !== '') {
              return (
                <Row key={d._id} className='container-contact pb-1'>
                  <Col sm={12} md={1}>
                    <ImLocation2 className='icon-footer' />{' '}
                  </Col>
                  <Col sm={12} md={10}>
                    <p className='text-contact-footer'>
                      <a
                        href={d.mixedField}
                        className='link-location'
                        rel='noreferrer'
                        target='_blank'
                      >
                        Santuario Inmaculada Madre del Divino Corazón
                        Eucarístico de Jesús
                      </a>
                    </p>
                  </Col>
                </Row>
              )
            }
            return null
          })}

      {!allContactData
        ? null
        : allContactData.map((d) => {
            if (d.title === 'Teléfono') {
              return (
                <Row key={d._id} className='container-contact pb-1'>
                  <Col sm={12} md={1}>
                    <FiSmartphone className='icon-footer' />{' '}
                  </Col>
                  <Col sm={12} md={10}>
                    <p className='text-contact-footer'>{d.mixedField}</p>
                  </Col>
                </Row>
              )
            }
            return null
          })}

      {!allContactData
        ? null
        : allContactData.map((d) => {
            if (d.title === 'Email') {
              return (
                <Row key={d._id} className='container-contact pb-1'>
                  <Col sm={12} md={1}>
                    <HiOutlineMail className='icon-footer' />{' '}
                  </Col>
                  <Col sm={12} md={10}>
                    <p className='text-contact-footer'>{d.mixedField}</p>
                  </Col>
                </Row>
              )
            }
            return null
          })}
    </>
  )
}

export default ContactFooter
