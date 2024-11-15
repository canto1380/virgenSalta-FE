import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import { Container } from 'react-bootstrap'
import ImgBackdrop from '../../components/MessageVirgen/ImgBackdrop'
import '../../components/MessageVirgen/message.css'
import MsgVirgen from '../../components/MessageVirgen/MsgVirgen'
import { getMessageJesus } from '../../utils/queryAPI/messageJesus'
import LayoutFoot from '../../components/Layout/LayoutFoot'
import FloatingButton from '../../components/FloatingButton/FloatingButton'

const MessageJesus = () => {
  const [msgJesus, setMsgJesus] = useState(undefined)
  const [year, setYear] = useState('Todos')

  useEffect(() => {
    getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year])
  const getData = async () => {
    const params = {
      year,
      limit: 100000,
      deleted: false,
    }
    const res = await getMessageJesus(params)
    setMsgJesus(res?.allMessage)
  }
  return (
    <>
      <Layout />
      <Container fluid className='bg-gradient-0'>
        <ImgBackdrop type={'MensajesDeJesucristo'} />
        <MsgVirgen
          msg={msgJesus}
          setYear={setYear}
          text1='Mensaje de Nuestro Señor Jesucristo'
          text2='Salta - Argentina'
          filter={true}
        />
        <FloatingButton />
      </Container>
      <LayoutFoot />
    </>
  )
}

export default MessageJesus
