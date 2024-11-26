import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useParams, useNavigate } from 'react-router-dom'
import Layout from '../../components/Layout/Layout'
import LayoutFoot from '../../components/Layout/LayoutFoot'
import BodyNews from '../../components/News/SingleNews/BodyNews'
import HeaderNews from '../../components/News/SingleNews/HeaderNews'
import { getNews } from '../../utils/queryAPI/news'
import CardsMoreContainer from '../../components/CardsMore'
import FloatingButton from '../../components/FloatingButton/FloatingButton'
import FontSize from '../../components/SizeFont/FontSize'

const SingleNews = () => {
  const { title } = useParams()

  let navigate = useNavigate()

  const [singleNews, setSingleNews] = useState()
  const [moreNews, setMoreNews] = useState([])
  const [fontSize, setFontSize] = useState(14)
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth)

    // Agregar un listener de evento resize
    window.addEventListener('resize', handleResize)

    // Limpiar el listener al desmontar el componente
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const aumentarTexto = () => {
    setFontSize((prevSize) => prevSize + 2)
  }

  const reducirTexto = () => {
    setFontSize((prevSize) => (prevSize > 10 ? prevSize - 2 : prevSize)) // Evita que sea demasiado pequeño
  }

  useEffect(() => {
    dataNews()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const dataNews = async () => {
    const params = { limit: 4, deleted: false }
    const data = await getNews(params)
    setMoreNews(data.allNews)

    const news = data.allNews.filter(
      (d) => d.title.replace(/ /g, '-') === title
    )
    if (news.length === 0) {
      navigate('/home')
    } else {
      setSingleNews(news[0])
    }
  }
  return (
    <>
      <Layout />
      <Container fluid className='container-single-news'>
        <Row className='mx-0 pt-2 pb-5'>
          <Col xs={8} className='pt-5 single-news-col1'>
            <HeaderNews data={singleNews} />
            <FontSize
              aumentarTexto={aumentarTexto}
              reducirTexto={reducirTexto}
            />
            <BodyNews
              data={singleNews?.description}
              photos={singleNews?.photos}
              fontSize={fontSize}
            />
          </Col>
          {screenWidth > 767 && (
            <Col xs={4} className='py-5 ps-5 pe-0 container-more-news'>
              <p className='mb-0 mx-3 single-news-subtitle'>Más Noticias</p>
              <hr className='mt-1 mx-3' />
              <CardsMoreContainer moreNews={moreNews} />
            </Col>
          )}
        </Row>
        <FloatingButton />
      </Container>
      <LayoutFoot />
    </>
  )
}

export default SingleNews
