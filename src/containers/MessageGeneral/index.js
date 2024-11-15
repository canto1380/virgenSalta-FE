import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import { Container } from 'react-bootstrap'
import ImgBackdrop from '../../components/MessageVirgen/ImgBackdrop'
import '../../components/MessageVirgen/message.css'
import MsgVirgen from '../../components/MessageVirgen/MsgVirgen'
import { getMessageGeneral } from '../../utils/queryAPI/messageGeneral'
import LayoutFoot from '../../components/Layout/LayoutFoot'
import FloatingButton from '../../components/FloatingButton/FloatingButton'

const MessageGeneral = () => {
  const [msgGeneral, setMsgGeneral] = useState(undefined)
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
    const res = await getMessageGeneral(params)
    setMsgGeneral(res?.allMessage)
  }
  console.log(msgGeneral)
  return (
    <>
      <Layout />
      <Container fluid className='bg-gradient-0'>
        <ImgBackdrop type={'MensajesCentral'} />

        <MsgVirgen
          msg={msgGeneral}
          setYear={setYear}
          text1='Mensaje Central'
          text2='Salta - Argentina'
          filter={false}
        />
        <FloatingButton />
      </Container>
      <LayoutFoot />
    </>
  )
}

export default MessageGeneral
