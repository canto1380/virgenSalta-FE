import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import { Container } from 'react-bootstrap'
import ImgBackdrop from '../../components/MessageVirgen/ImgBackdrop'
import '../../components/MessageVirgen/message.css'
import MsgVirgen from '../../components/MessageVirgen/MsgVirgen'
import { getMessageJesus } from '../../utils/queryAPI/messageJesus'
import LayoutFoot from '../../components/Layout/LayoutFoot'

const MessageJesus = () => {
  const [msgJesus, setMsgJesus] = useState([])
  const [year, setYear] = useState('Todos')

  useEffect(() => {
    getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year])
  const getData = async () => {
    const params = {
      year,
    }
    const res = await getMessageJesus(params)
    setMsgJesus(res?.allMessage)
  }
  return (
    <>
      <Layout />
      <Container fluid className='bg-gradient-4'>
        <ImgBackdrop type={'MensajesDeJesucristo'} />
        <MsgVirgen
          msg={msgJesus}
          setYear={setYear}
          text1='Mensaje Central'
          text2='Salta - Argentina'
          filter={true}
        />
      </Container>
      <LayoutFoot />
    </>
  )
}

export default MessageJesus
