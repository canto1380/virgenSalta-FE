import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card'
import './CardMore.css'
import fotoDefault from '../../images/logo-corazon.webp'

const CardMore = ({ data }) => {
  const [titleParams, setTitleParams] = useState(data.title)
  const [subtitle, setSubtitle] = useState(undefined)
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth)

    // Agregar un listener de evento resize
    window.addEventListener('resize', handleResize)

    // Limpiar el listener al desmontar el componente
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  console.log(screenWidth)

  useEffect(() => {
    setTitleParams(data?.title.replace(/ /g, '-'))
    subtituliCortado()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const subtituliCortado = () => {
    const puntos = '...'
    const subt = data?.subtitle?.substr(0, 60)
    const asdd =
      data.subtitle && data?.subtitle.length > 60
        ? subt.concat(' ', puntos)
        : data?.subtitle
    setSubtitle(asdd)
  }
  console.log(subtitle)
  return (
    <div className='mb-5 mx-3'>
      <a className='link-decoration' href={`/noticias/${titleParams}`}>
        <Card style={{}} className='container-card'>
          <Card.Img
            className='cardMoreNews-img'
            variant='top'
            src={data?.photos?.length > 0 ? data.photos[0] : fotoDefault}
          />
          <Card.Body>
            <Card.Title className='single-news-subtitle'>
              {data?.title}
            </Card.Title>
            {screenWidth > 891 && <p className='title-card mb-0'>{subtitle}</p>}
          </Card.Body>
        </Card>
      </a>
    </div>
  )
}

export default CardMore
