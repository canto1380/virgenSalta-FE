import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import { Container, Row, Col } from 'react-bootstrap'
import HeaderNews from '../../components/News/SingleNews/HeaderNews'
import BodyNews from '../../components/News/SingleNews/BodyNews'
import MoreNewsCarousel from '../../components/Carousel/MoreNewsCarousel'
import { useNavigate, useParams } from 'react-router-dom'
import { getSpecialDays } from '../../utils/queryAPI/specialDays'
import LayoutFoot from '../../components/Layout/LayoutFoot'
import FloatingButton from '../../components/FloatingButton/FloatingButton'
import FontSize from '../../components/SizeFont/FontSize'
import '../../components/SpecialDays/specialDays.css'

const SingleSpecialDays = () => {
  const { title } = useParams()
  let navigate = useNavigate()

  const [singleSpecialDays, setSingleSpecialDays] = useState()
  const [moreSpecialDays, setMoreSpecialDays] = useState([])
  const [fontSize, setFontSize] = useState(14)

  const aumentarTexto = () => {
    setFontSize((prevSize) => prevSize + 2)
  }

  const reducirTexto = () => {
    setFontSize((prevSize) => (prevSize > 10 ? prevSize - 2 : prevSize)) // Evita que sea demasiado pequeño
  }

  useEffect(() => {
    dataSpecialDays()
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <Container fluid className='container-single-specialDays'>
        <Row className='mx-0 pt-2 pb-5'>
          <Col xs={8} className='pt-5 single-specialDays-col1'>
            <HeaderNews data={singleSpecialDays} sectionType='specialDays' />
            <FontSize
              aumentarTexto={aumentarTexto}
              reducirTexto={reducirTexto}
            />
            <BodyNews
              data={singleSpecialDays?.description}
              photos={singleSpecialDays?.photos}
              fontSize={fontSize}
            />
          </Col>
          <Col xs={4} className='py-5 ps-5 pe-0 container-more-specialDays'>
            <p className='mb-0 mx-3 single-news-subtitle'>Más Jornadas</p>
            <hr className='mt-1 mx-3' />
            <MoreNewsCarousel data={moreSpecialDays} />
          </Col>
          <hr />
        </Row>
        <FloatingButton />
      </Container>
      {/* <Container fluid className=''>
        <Row className='bg-gradient-1 px-3 pt-4 pb-5'>
          <MoreNewsCarousel
            data={moreSpecialDays}
            typeFlag='news'
            title='Noticias recientes'
          />
        </Row>
      </Container> */}
      <LayoutFoot />
    </>
  )
}

export default SingleSpecialDays
