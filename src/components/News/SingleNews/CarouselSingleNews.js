import React from 'react'
import Carousel from 'react-bootstrap/Carousel'
import { Image } from 'react-bootstrap'

const CarouselSingleNews = ({ photos }) => {
  return (
    <Carousel fade indicators={false} interval={3000}>
      {photos.map((d, i) => (
        <Carousel.Item key={i}>
          <Image src={d} className='image-news' />
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

export default CarouselSingleNews
