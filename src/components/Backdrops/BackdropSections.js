import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import '../News/news.css'
import { getBackdrop } from '../../utils/queryAPI/backdrop'

const BackdropSections = ({ title, img }) => {
  const [imageBackdropDefault, setImageBackdropDefault] = useState('')
  const [isFontLoaded, setIsFontLoaded] = useState(false)

  useEffect(() => {
    // setImageBackdropDefault(ImageBackdrop)
    getDataImg()
    loadFont()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getDataImg = async () => {
    const params = {
      search: img
        // .toLowerCase()
        .normalize('NFD') // Descompone los caracteres con acento
        .replace(/[\u0300-\u036f]/g, ''),
    }
    const res = await getBackdrop(params)
    const data = res?.allBackdrops[0]?.backdrop
    setImageBackdropDefault(data)
  }

  const loadFont = () => {
    const font = new FontFace('Classica', 'url(/fonts/CLASSICA-BOLD.TTF)')
    font.load().then(() => {
      document.fonts.add(font)
      setIsFontLoaded(true)
    })
  }
  return (
    <div>
      {imageBackdropDefault !== '' ? (
        isFontLoaded && (
          <Container
            fluid
            style={{
              backgroundImage: `url(${
                imageBackdropDefault
                  ? imageBackdropDefault
                  : 'images/imgDefecto.webp'
              })`,
            }}
            className='imgFondo'
          >
            <Row className='backdropNew'>
              <Col>
                <p className='title m-0 text-center'>{title.toUpperCase()}</p>
              </Col>
            </Row>
          </Container>
        )
      ) : (
        <Container
          fluid
          style={{ backgroundImage: `url("images/imgDefecto.webp")` }}
          className='imgFondo'
        >
          <Row className='backdropNew'>
            <Col>
              {isFontLoaded && <p className='title m-0 text-center'>{title}</p>}
            </Col>
          </Row>
        </Container>
      )}
    </div>
  )
}

export default BackdropSections
