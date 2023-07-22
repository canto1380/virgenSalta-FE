import React, { useState, useEffect } from 'react'
import { Col, Container, Row, Spinner } from 'react-bootstrap'
import BackdropSections from '../../components/Backdrops/BackdropSections'
import CardNewsPage from '../../components/News/NewsPage/CardNewsPage'
import Layout from '../../components/Layout/Layout'
import LayoutFoot from '../../components/Layout/LayoutFoot'
import { getNews } from '../../utils/queryAPI/news'
import PaginationAdmin from '../../components/Admin/Pagination'
import NewsFilter from './NewsFilter'
import { getNewsCategory } from '../../utils/queryAPI/newsCategory'

const Noticias = () => {
  const [search, setSearch] = useState('')
  const [idNewsCategory, setIdNewsCategory] = useState(undefined)
  const [pageSelected, setPageSelected] = useState(1)
  const [limit, setLimit] = useState(10)
  const [newsData, setNewsData] = useState([])
  const [newsInf, setNewsInf] = useState([])
  const [newsCategoryData, setNewsCategoryData] = useState([])
  let deleted = false
  useEffect(() => {
    dataNews()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, deleted, pageSelected, idNewsCategory, limit])

  const dataNews = async () => {
    const params = {
      search,
      deleted: false,
      page: pageSelected,
      idNewsCategory,
      limit,
    }
    const data = await getNews(params)
    setNewsData(data.allNews)
    setNewsInf(data)
  }

  useEffect(() => {
    dataNewsCategory()
  }, [])
  const dataNewsCategory = async () => {
    const params = { limit: 1000 }
    const data = await getNewsCategory(params)
    setNewsCategoryData(data)
  }
  
  return (
    <div className='bg-gradient-1'>
      <Layout />
      <BackdropSections title='Noticias' />
      <Container className='mt-3 pt-5'>
        <NewsFilter
          typeFlag='news'
          setSearch={setSearch}
          setIdNewsCategory={setIdNewsCategory}
          setPageSelected={setPageSelected}
          data={newsCategoryData?.allNewsCategory}
        />
        {/* <Search  onChange={(e) => setSearch(e.target.value)}/> */}
        {newsData ? (
          <Row className='mt-3 pb-5'>
            <div>
              <h5 className='text- pb-2'>Lista de Noticias</h5>
            </div>
            {newsData?.map((noti, i) => (
              <Col key={i} xs={12} md={6} lg={4} className='mb-4'>
                <CardNewsPage data={noti} />
              </Col>
            ))}
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
          <Spinner animation='grow' variant='info' />
        )}
      </Container>
      <LayoutFoot />
    </div>
  )
}

export default Noticias
