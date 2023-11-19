import React, { useEffect, useState } from 'react'
import ReactPlayer from 'react-player'
import Carousel from 'react-bootstrap/Carousel'
import { getCarousel } from '../../utils/queryAPI/carousel'
import Spinn from '../Spinn/Spinn'

const Cover = () => {
  const [carousel, setCarousel] = useState('')
  const [index, setIndex] = useState(0)

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex)
  }

  useEffect(() => {
    getData()
  }, [])
  const getData = async () => {
    const params = { deleted: false, limit: 6 }
    const data = await getCarousel(params)
    setCarousel(data)
  }

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      {carousel ? (
        carousel.allCarousel.map((d, i) => (
          <Carousel.Item interval={10000} pause='hover' key={i}>
            <ReactPlayer
              muted
              playing={true}
              url={d.file}
              width='100%'
              height='100%'
              pip={true}
              controls={true}
              progressInterval={1000}
              config={{
                file: {
                  attributes: {
                    controlsList: 'nodownload', // Desactiva la opción de descarga nativa del navegador
                  },
                },
              }}
            />
          </Carousel.Item>
        ))
      ) : (
        <div style={{ width: '100%', height: '500px' }}>
          <Spinn type='data' />
        </div>
      )}
    </Carousel>
  )
}

export default Cover
