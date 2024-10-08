import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import { Col, Container, Row } from 'react-bootstrap'
import ImgBackdrop from '../../components/MessageVirgen/ImgBackdrop'
import '../../components/MessageVirgen/message.css'
import MsgVirgen from '../../components/MessageVirgen/MsgVirgen'
import { getMessageVirgen } from '../../utils/queryAPI/messageVirgen'
import LayoutFoot from '../../components/Layout/LayoutFoot'

const MessageVirgen = () => {
  const [msgVirgen, setMsgVirgen] = useState([])
  const [year, setYear] = useState('Todos')

  useEffect(() => {
    getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year])
  const getData = async () => {
    const params = {
      year,
    }
    const res = await getMessageVirgen(params)
    setMsgVirgen(res?.allMessage)
  }
  return (
    <>
      <Layout />
      <Container fluid className='bg-gradient-2'>
        <ImgBackdrop type={'MensajesDeLaVirgen'} />
        <div className='container'>
          <Row className='mx-5 pt-4 pb-5'>
            <Col className='page-section-title text-light'>
              <p className='titleGen-msg-virgen'>
                Mensajes que la Inmaculada Madre del Divino Corazón Eucarístico
                de Jesús está dando en la ciudad de Salta, República Argentina,
                desde el año 1990 a la Sra. Maria Livia Galliano de Obeid.
              </p>
            </Col>
          </Row>
        </div>
        <MsgVirgen msgVirgen={msgVirgen} setYear={setYear} />
      </Container>
      <LayoutFoot />
    </>
  )
}

export default MessageVirgen
