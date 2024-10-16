import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import '../News/news.css'
import { getBackdrop } from '../../utils/queryAPI/backdrop'

const BackdropSections = ({ title, img }) => {
  console.log(title)
  const [imageBackdropDefault, setImageBackdropDefault] = useState('')

  useEffect(() => {
    // setImageBackdropDefault(ImageBackdrop)
    getDataImg()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getDataImg = async () => {
    const params = {
      search: title
        .toLowerCase()
        .normalize('NFD') // Descompone los caracteres con acento
        .replace(/[\u0300-\u036f]/g, ''),
    }
    const res = await getBackdrop(params)
    const data = res?.allBackdrops[0]?.backdrop
    setImageBackdropDefault(data)
  }

  return (
    <div>
      {img !== '' ? (
        <Container
          fluid
          style={{
            backgroundImage: `url(${img ? img : imageBackdropDefault})`,
          }}
          className='imgFondo'
        >
          <Row className='backdropNew'>
            <Col>
              <p className='title m-0 text-center'>{title}</p>
            </Col>
          </Row>
        </Container>
      ) : (
        <Container
          fluid
          style={{ backgroundImage: `url("images/imgDefecto.webp")` }}
          className='imgFondo'
        >
          <Row className='backdropNew'>
            <Col>
              <p className='title m-0 text-center'>{title}</p>
            </Col>
          </Row>
        </Container>
      )}
    </div>
  )
}

export default BackdropSections
