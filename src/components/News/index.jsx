import React, { useState, useEffect } from 'react'
import { Row } from 'react-bootstrap'
import HeaderSections from '../Title/HeaderSections.jsx'
import GenericCarousel from '../Carousel/GenericCarousel.jsx'
import { getNews } from '../../utils/queryAPI/news.jsx'

const News = () => {
  const [news, setNews] = useState()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    dataNews()
  }, [])
  const dataNews = async () => {
    try {
      setLoading(true)
      const params = { deleted: false, visible: true, home: true }
      const data = await getNews(params)
      setNews(data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }
  return (
    <>
      {loading === true ? (
        <p>Caragando</p>
      ) : (
        <>
          <HeaderSections title={'Noticias'} linkRef={'/noticias'} />
          <Row className='my-5'>
            <GenericCarousel data={news?.allNews} type='news' />
          </Row>
        </>
      )}
    </>
  )
}

export default News
