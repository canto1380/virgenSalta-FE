import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Sidebar from '../../../components/Admin/Sidebar'
import Unauthorized from '../../../components/Unauthorized'
import { getDataToken, getToken } from '../../../helpers/helpers'
import { getUserById } from '../../../utils/queryAPI/user'
import { getNews } from '../../../utils/queryAPI/news'
import ListStaticNews from '../../../components/Admin/MenuNews/ListStaticNews'

const OrderNewsContainer = () => {
  const [inactivo, setInactivo] = useState(false)
  const [tokenAuth, setTokenAuth] = useState([])
  const [dataAuth, setDataAuth] = useState([])
  const [modalUnauthorized, setModalUnauthorized] = useState(false)
  const [newsData, setNewsData] = useState([])
  const [band, setBand] = useState(false)

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
    dataNews()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const dataNews = async () => {
    const params = { home: true }
    const data = await getNews(params)
    setNewsData(data)
  }
  // console.log(newsData)
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
                <h3>Orden noticias visibles</h3>
              </div>
            </Col>
          </Row>
          <ListStaticNews
            data={newsData?.allNews}
            userToken={tokenAuth}
            routeAPI='news'
            band={band}
            setBand={setBand}
          />
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

export default OrderNewsContainer
