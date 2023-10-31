import React, { useEffect, useState } from 'react'
import Carousel from 'react-bootstrap/Carousel'
import ReactPlayer from 'react-player'
import { getCarousel } from '../../utils/queryAPI/carousel'

const Cover = () => {
  const [carousel, setCarousel] = useState('')
  const [index, setIndex] = useState(0)

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex)
  }
  console.log(index)

  useEffect(() => {
    getData()
  }, [])
  const getData = async () => {
    const params = { deleted: false, limit: 6 }
    const data = await getCarousel(params)
    setCarousel(data)
  }
  return (
    <Carousel activeIndex={index} onSelect={handleSelect} controls={false}>
      {carousel ? (
        carousel.allCarousel.map((d) => (
          <Carousel.Item interval={4000} pause='hover'>
            <ReactPlayer
              url={d.file}
              width='100%'
              height='100%'
              pip={true}
              controls={true}
              playing={true}
              progressInterval={1000}
              config={{
                file: {
                  attributes: {
                    controlsList: 'nodownload', // Desactiva la opción de descarga nativa del navegador
                  },
                },
              }}
            />
            )
          </Carousel.Item>
        ))
      ) : (
        <>Cargando</>
      )}
    </Carousel>
  )
}

export default Cover
