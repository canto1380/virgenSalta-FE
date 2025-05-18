import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import '../index.css'
import '../../../components/Admin/sidebar.css'
import Sidebar from '../../../components/Admin/Sidebar'
import { getDataToken, getToken } from '../../../helpers/helpers'
import { getUserById } from '../../../utils/queryAPI/user'
import Unauthorized from '../../../components/Unauthorized'
import { useParams } from 'react-router-dom'
import MenuBackdrop from '../../../components/Admin/MenuBackdrop'
import HeaderBackdrop from '../../../components/Admin/HeaderBackdrop'

const BackdropSection = () => {
  const [inactivo, setInactivo] = useState(false)
  const [tokenAuth, setTokenAuth] = useState([])
  const [dataAuth, setDataAuth] = useState([])
  const [modalUnauthorized, setModalUnauthorized] = useState(false)
  const [title, setTitle] = useState(undefined)

  const { idTab } = useParams()
  useEffect(() => {
    const tokenData = getToken()
    setTokenAuth(tokenData)
    setDataAuth(getDataToken)
  }, [])
  useEffect(() => {
    dataUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokenAuth])
  const dataUser = async () => {
    const data = await getUserById(dataAuth?._id, tokenAuth)
    if (data === false) {
      setModalUnauthorized(true)
    }
  }

  useEffect(() => {
    idTab === 'mensajesDeLaVirgen'
      ? setTitle('Mensajes De La Santísima Virgen María')
      : setTitle(idTab[0].toUpperCase() + idTab.slice(1))
  }, [idTab])
  return (
    <Container
      fluid
      className='container-admin p-0 d-flex justify-content-start'
    >
      <Sidebar
        // setTab={setTab}
        inactivo={inactivo}
        setInactivo={setInactivo}
        tokenAuth={tokenAuth}
        dataAuth={dataAuth}
      />
      <Container fluid className='container-admin-data'>
        <div className={`${inactivo ? `parte2Inactivo` : `parte2`}`}>
          <Row>
            <Col className='mt-3'>
              <div className={`pt-4 pb-1 px-4`}>
                <h3>{title}</h3>
              </div>
            </Col>
          </Row>
          <HeaderBackdrop
            title={'Foto Portada'}
            idTab={idTab}
            bandSelect={false}
          />
          <MenuBackdrop idTab={idTab} />
        </div>

        {modalUnauthorized && (
          <div className=''>
            <Unauthorized />
          </div>
        )}
      </Container>
    </Container>
  )
}

export default BackdropSection
