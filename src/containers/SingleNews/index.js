import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useParams, useNavigate } from 'react-router-dom'
import Layout from '../../components/Layout/Layout'
import LayoutFoot from '../../components/Layout/LayoutFoot'
import BodyNews from '../../components/News/SingleNews/BodyNews'
import HeaderNews from '../../components/News/SingleNews/HeaderNews'
import { getNews } from '../../utils/queryAPI/news'
import CardsMoreContainer from '../../components/CardsMore'

const SingleNews = () => {
  const { title } = useParams()

  let navigate = useNavigate()

  const [singleNews, setSingleNews] = useState()
  const [moreNews, setMoreNews] = useState([])
  const [fontSize, setFontSize] = useState(14)

  const aumentarTexto = () => {
    console.log(fontSize)
    setFontSize((prevSize) => prevSize + 2)
    console.log(fontSize)
    // console.log(`aumenta a ${fontSize}`)
  }

  const reducirTexto = () => {
    console.log(fontSize)
    setFontSize((prevSize) => (prevSize > 10 ? prevSize - 2 : prevSize)) // Evita que sea demasiado pequeño
    console.log(fontSize)
    // console.log(`disminuye a ${fontSize}`)
  }

  useEffect(() => {
    dataNews()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const dataNews = async () => {
    const params = { limit: 1000, deleted: false }
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
      <Container>
        <Row className='mx-0 pt-2 pb-5'>
          <Col xs={8} className='pt-5'>
            <div>
              <button onClick={aumentarTexto}>Aumentar</button>
              <button onClick={reducirTexto}>Reducir</button>
            </div>
            <HeaderNews data={singleNews} />
            <BodyNews
              data={singleNews?.description}
              photos={singleNews?.photos}
              fontSize={fontSize}
            />
          </Col>

          <Col xs={4} className='py-5 px-5'>
            <p className='mb-0 mx-3 single-news-subtitle'>Más Noticias</p>
            <hr className='mt-1 mx-3' />
            <CardsMoreContainer moreNews={moreNews} />
          </Col>
          <hr />
        </Row>
      </Container>
      {/* {nameCategory.includes('historia') ? (
        !null
      ) : (
        <Container fluid className=''>
          <Row className='bg-gradient-1 px-3 pt-4 pb-5'>
            <MoreNewsCarousel
              data={moreNews}
              typeFlag='news'
              title='Noticias recientes'
            />
          </Row>
        </Container>
      )} */}
      <LayoutFoot />
    </>
  )
}

export default SingleNews
