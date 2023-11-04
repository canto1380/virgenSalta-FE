import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import ImageBackdrop from '../../images/logo.jpg'
import '../News/news.css'
import { getBackdrop } from '../../utils/queryAPI/backdrop'
import { quitarAcentos } from '../../helpers/helpers'
const BackdropSections = ({ title }) => {
  const [imageBackdrop, setImageBackdrop] = useState('')
  const [imageBackdropDefault, setImageBackdropDefault] = useState('')

  useEffect(() => {
    setImageBackdropDefault(ImageBackdrop)
  }, [])
  useEffect(() => {
    backdropData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title])

  const backdropData = async () => {
    const titleSinAcento = quitarAcentos(title)
    const params = { search: titleSinAcento }
    const data = await getBackdrop(params)
    setImageBackdrop(data?.allBackdrops[0]?.backdrop)
  }
  return (
    <div>
      {imageBackdrop !== '' ? (
        <Container
          fluid
          style={{
            backgroundImage: `url(${
              imageBackdrop ? imageBackdrop : imageBackdropDefault
            })`,
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
          style={{ backgroundImage: `url("images/imgDefecto.jpg")` }}
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
