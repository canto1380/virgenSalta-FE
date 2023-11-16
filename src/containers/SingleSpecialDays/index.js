import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import { Container, Row, Col } from 'react-bootstrap'
import HeaderNews from '../../components/News/SingleNews/HeaderNews'
import BodyNews from '../../components/News/SingleNews/BodyNews'
import MoreNewsCarousel from '../../components/Carousel/MoreNewsCarousel'
import { useNavigate, useParams } from 'react-router-dom'
import { getSpecialDays } from '../../utils/queryAPI/specialDays'
import LayoutFoot from '../../components/Layout/LayoutFoot'

const SingleSpecialDays = () => {
  const { title } = useParams()
  let navigate = useNavigate()

  const [singleSpecialDays, setSingleSpecialDays] = useState()
  const [moreSpecialDays, setMoreSpecialDays] = useState([])

  useEffect(() => {
    dataSpecialDays()
  }, [])

  const dataSpecialDays = async () => {
    const params = { limit: 10000, deleted: false }
    const data = await getSpecialDays(params)
    setMoreSpecialDays(data.allSpecialDays)

    const specialDays = data.allSpecialDays.filter(
      (d) => d.title.replace(/ /g, '-') === title
    )
    if (specialDays.length === 0) {
      navigate('/home')
    } else {
      setSingleSpecialDays(specialDays[0])
    }
  }

  return (
    <>
      <Layout />
      <Container>
        <Row className='mx-3 pt-2 pb-5'>
          <Col xs={12} className='pt-5'>
            <HeaderNews data={singleSpecialDays} sectionType='specialDays' />
          </Col>
          <hr className='pb-3' />
          <Col xs={12} className='pb-5'>
            <BodyNews
              data={singleSpecialDays?.description}
              photos={singleSpecialDays?.photos}
            />
          </Col>
          <hr />
        </Row>
      </Container>
      <Container fluid className=''>
        <Row className='bg-gradient-1 px-3 pt-4 pb-5'>
          <MoreNewsCarousel
            data={moreSpecialDays}
            typeFlag='news'
            title='Noticias recientes'
          />
        </Row>
      </Container>
      <LayoutFoot />
    </>
  )
}

export default SingleSpecialDays
