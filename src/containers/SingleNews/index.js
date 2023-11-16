import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useParams, useNavigate } from 'react-router-dom'
import MoreNewsCarousel from '../../components/Carousel/MoreNewsCarousel'
import Layout from '../../components/Layout/Layout'
import LayoutFoot from '../../components/Layout/LayoutFoot'
import BodyNews from '../../components/News/SingleNews/BodyNews'
import HeaderNews from '../../components/News/SingleNews/HeaderNews'
import { getNews } from '../../utils/queryAPI/news'
import { convertirAPrimitiva } from '../../helpers/helpers'

const SingleNews = () => {
  const { title } = useParams()

  let navigate = useNavigate()

  const [singleNews, setSingleNews] = useState()
  const [moreNews, setMoreNews] = useState([])
  const [nameCategory, setNameCategory] = useState('')

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
      setNameCategory(convertirAPrimitiva(news[0].idNewsCategory?.nameCategory))
    }
  }

  return (
    <>
      <Layout />
      <Container>
        <Row className='mx-3 pt-2 pb-5'>
          <Col xs={12} className='pt-5'>
            <HeaderNews data={singleNews} />
          </Col>
          <hr className='pb-3' />
          <Col xs={12} className='pb-5'>
            <BodyNews
              data={singleNews?.description}
              photos={singleNews?.photos}
            />
          </Col>
          <hr />
        </Row>
      </Container>
      {nameCategory.includes('historia') ? null : (
        <Container fluid className=''>
          <Row className='bg-gradient-1 px-3 pt-4 pb-5'>
            <MoreNewsCarousel
              data={moreNews}
              typeFlag='news'
              title='Noticias recientes'
            />
          </Row>
        </Container>
      )}
      <LayoutFoot />
    </>
  )
}

export default SingleNews
