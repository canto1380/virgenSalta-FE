import React, { useState, useEffect } from 'react'
import { Col, Container, Row, Spinner } from 'react-bootstrap'
import BackdropSections from '../../components/Backdrops/BackdropSections'
import CardNewsPage from '../../components/News/NewsPage/CardNewsPage'
import Layout from '../../components/Layout/Layout'
import LayoutFoot from '../../components/Layout/LayoutFoot'
import { getNews } from '../../utils/queryAPI/news'
import PaginationAdmin from '../../components/Admin/Pagination'

const Noticias = () => {
  const [pageSelected, setPageSelected] = useState(1)
  const [limit, setLimit] = useState(12)
  const [newsData, setNewsData] = useState([])
  const [newsInf, setNewsInf] = useState([])
  let deleted = false
  useEffect(() => {
    dataNews()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleted, pageSelected, limit])

  const dataNews = async () => {
    const params = {
      deleted: false,
      page: pageSelected,
      limit,
    }
    const data = await getNews(params)
    setNewsData(data.allNews)
    setNewsInf(data)
  }

  return (
    <div className='bg-gradient-1'>
      <Layout />
      <BackdropSections title='Noticias' />
      <Container className='mt-3 pt-3'>
        {newsData ? (
          <Row className='mt-3 pb-5'>
            <div className='mb-4'>
              <h5 className='text- pb-2'>Lista de Noticias</h5>
            </div>
            {newsData.length > 0 ? (
              newsData?.map((noti, i) => (
                <Col key={i} xs={12} md={6} lg={4} className='mb-4'>
                  <CardNewsPage data={noti} pathUrl='noticias' />
                </Col>
              ))
            ) : (
              <p className='text-danger fw-bold'>No se encontraron noticias</p>
            )}
            <Row>
              <Col>
                <PaginationAdmin
                  data={newsInf}
                  pageSelected={pageSelected}
                  setPageSelected={setPageSelected}
                  setLimit={setLimit}
                />
              </Col>
            </Row>
          </Row>
        ) : (
          <div className='text-center'>
            <Spinner animation='grow' variant='info' />
          </div>
        )}
      </Container>
      <LayoutFoot />
    </div>
  )
}

export default Noticias
