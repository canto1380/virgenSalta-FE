import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getNewsCategory } from '../../utils/queryAPI/newsCategory'
import Layout from '../../components/Layout/Layout'
import { Container, Row, Col, Spinner } from 'react-bootstrap'
import LayoutFoot from '../../components/Layout/LayoutFoot'
// import MoreNewsCarousel from '../../components/Carousel/MoreNewsCarousel'
import { getNews } from '../../utils/queryAPI/news'
import CardNewsPage from '../../components/News/NewsPage/CardNewsPage'
import PaginationAdmin from '../../components/Admin/Pagination'
import BackdropSections from '../../components/Backdrops/BackdropSections'
import FloatingButton from '../../components/FloatingButton/FloatingButton'
import { getBackdrop } from '../../utils/queryAPI/backdrop'

const SingleNewsCategory = () => {
  const { nameCategory } = useParams()
  // const navigate = useNavigate()

  // const [allNewsCategory, setAllNewsCategory] = useState([])
  // const [singleNewsCategory, setSingleNewsCategory] = useState()
  const [pageSelected, setPageSelected] = useState(1)
  const [news, setNews] = useState(null)
  const [limit, setLimit] = useState(12)
  const [newsInf, setNewsInf] = useState([])

  let deleted = false
  const TITLE_CATEGORY = nameCategory.replace(/-/g, ' ')

  /** MODULO QUE BUSCA Y TRAE LA IMAGEN DE LA CATEGORIA QUE ESTAMOS DESDE EL CLIENTE **/
  // useEffect(() => {
  //   dataNewsCategory()
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

  // const dataNewsCategory = async () => {
  //   const params = { limit: 1000, deleted: false }
  //   const data = await getNewsCategory(params)
  //   setAllNewsCategory(data.allNewsCategory)
  //   const newsCategory = data.allNewsCategory.filter(
  //     (d) => d.nameCategory.replace(/ /g, '-') === nameCategory
  //   )
  //   if (newsCategory.length === 0) {
  //     navigate('/home')
  //   } else {
  //     setSingleNewsCategory(newsCategory[0]?.backdrop)
  //   }
  // }
  /************************************************************************************/

  useEffect(() => {
    dataNews()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleted, pageSelected, limit])

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
      idNewsCategory: categoryFilter[0]?._id,
      page: pageSelected,
    }
    const data = await getNews(params)
    setNewsInf(data)
    setNews(data.allNews)
    if (nameCategory === 'Mensajes') {
      const msjVirgen = await getBackdrop({ search: 'MensajesDeLaVirgen' })
      const msjJesus = await getBackdrop({ search: '"MensajesDeJesucristo"' })
      const msjCentral = await getBackdrop({ search: 'MensajesCentral' })

      const arrMensajes = [
        {
          id: 1,
          title: 'Mensajes de la Ssma. Virgen',
          route: 'mensajes-de-la-virgen',
          photos: msjVirgen?.allBackdrops[0]?.backdrop,
          preload: true,
        },
        {
          id: 2,
          title: 'Mensajes de Nuestro Señor Jesucristo',
          photos: msjJesus?.allBackdrops[0]?.backdrop,
          route: 'mensajes-de-nuestro-señor-jesucristo',
          preload: true,
        },
        {
          id: 3,
          title: 'Mensaje Central',
          photos: msjCentral?.allBackdrops[0]?.backdrop,
          route: 'mensaje-central',
          preload: true,
        },
      ]
      setNews((prevNews) => {
        const newUniqueItems = arrMensajes.filter(
          (newItem) => !prevNews.some((item) => item.id === newItem.id)
        )
        return [...prevNews, ...newUniqueItems]
      })
    }
  }

  return (
    <div className='bg-gradient-4'>
      <Layout />
      <BackdropSections title={TITLE_CATEGORY} img={'Categorias'} />
      <Container className='mt-3 pt-5'>
        {news ? (
          <Row className='mt-3 pb-5'>
            <div>
              <h5 className='pb-2'>{TITLE_CATEGORY}</h5>
            </div>
            {news.length > 0 ? (
              news?.map((not, i) => (
                <Col
                  key={i}
                  xs={12}
                  md={6}
                  lg={4}
                  className='mb-4 cont-row-categ'
                >
                  <CardNewsPage
                    data={not}
                    pathUrl='noticias'
                    type={
                      nameCategory === 'Mensajes' ? 'Mensajes' : 'categorias'
                    }
                  />
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
        {/* <Row className='bg-gradient-1 px-3 pt-4 pb-5'>
          <MoreNewsCarousel
            data={allNewsCategory}
            typeFlag='newsCategory'
            title='Secciones recientes'
          />
        </Row> */}
        <FloatingButton />
      </Container>
      <LayoutFoot />
    </div>
  )
}

export default SingleNewsCategory
