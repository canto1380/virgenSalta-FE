import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import ImageBackdrop from '../../images/logo.webp'
import '../News/news.css'

const BackdropSections = ({ title, img }) => {
  const [imageBackdropDefault, setImageBackdropDefault] = useState('')

  useEffect(() => {
    setImageBackdropDefault(ImageBackdrop)
  }, [])
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
