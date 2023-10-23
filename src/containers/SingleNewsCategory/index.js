import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getNewsCategory } from '../../utils/queryAPI/newsCategory'
import Layout from '../../components/Layout/Layout'
import { Container, Row, Col, Spinner } from 'react-bootstrap'
import LayoutFoot from '../../components/Layout/LayoutFoot'
import MoreNewsCarousel from '../../components/Carousel/MoreNewsCarousel'
import { getNews } from '../../utils/queryAPI/news'
import CardNewsPage from '../../components/News/NewsPage/CardNewsPage'
import PaginationAdmin from '../../components/Admin/Pagination'
import BackdropSections from '../../components/Backdrops/BackdropSections'
import NewsFilter from '../Noticias/NewsFilter'

const SingleNewsCategory = () => {
  const { nameCategory } = useParams()

  const [allNewsCategory, setAllNewsCategory] = useState([])
  const [search, setSearch] = useState('')
  const [pageSelected, setPageSelected] = useState(1)
  const [news, setNews] = useState(null)
  const [limit, setLimit] = useState(12)
  const [newsInf, setNewsInf] = useState([])

  let deleted = false
  const BORRAR_AL_DESARROLLAR = nameCategory.replace(/-/g, ' ')
  useEffect(() => {
    dataNewsCategory()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const dataNewsCategory = async () => {
    const params = { limit: 1000, deleted: false }
    const data = await getNewsCategory(params)
    setAllNewsCategory(data.allNewsCategory)
   
  }
  useEffect(() => {
    dataNews()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, deleted, pageSelected, limit])
  const dataCategoryActual = async () => {
    const paramsCategory = {
      limit,
      deleted: false,
    }
    const dataCategory = await getNewsCategory(paramsCategory)
    const newsCategory = dataCategory.allNewsCategory.filter(
      (d) => d.nameCategory.replace(/ /g, '-') === nameCategory
    )
    return newsCategory
  }
  const dataNews = async () => {
    const categoryFilter = await dataCategoryActual()
    const params = {
      limit,
      search: search,
      idNewsCategory: categoryFilter[0]?._id,
      page: pageSelected,
    }
    const data = await getNews(params)
    setNewsInf(data)
    setNews(data.allNews)
  }

  return (
    <div className='bg-gradient-1'>
      <Layout />
      <BackdropSections title={BORRAR_AL_DESARROLLAR} />
      <Container className='mt-3 pt-5'>
        <NewsFilter
          typeFlag='newsCategory'
          setSearch={setSearch}
          setPageSelected={setPageSelected}
        />
        {news ? (
          <Row className='mt-3 pb-5'>
            <div>
              <h5 className='pb-2'>
                Noticias de la categoría {BORRAR_AL_DESARROLLAR}
              </h5>
            </div>
            {news.length > 0 ? (
              news?.map((not, i) => (
                <Col key={i} xs={12} md={6} lg={4} className='mb-4'>
                  <CardNewsPage data={not} />
                </Col>
              ))
            ) : (
              <p className='text-danger fw-bold'>
                No hay noticias con los parametros buscados
              </p>
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
        <hr />
      </Container>
      <Container fluid>
        <Row className='bg-gradient-1 px-3 pt-4 pb-5'>
          <MoreNewsCarousel
            data={allNewsCategory}
            typeFlag='newsCategory'
            title='Secciones recientes'
          />
        </Row>
      </Container>
      <LayoutFoot />
    </div>
  )
}

export default SingleNewsCategory
