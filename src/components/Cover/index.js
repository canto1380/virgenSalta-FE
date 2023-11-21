import React, { useEffect, useState } from 'react'
import { getCarousel } from '../../utils/queryAPI/carousel'
import Spinn from '../Spinn/Spinn'
import './cover.css'

const Cover = () => {
  const [carousel, setCarousel] = useState('')

  useEffect(() => {
    getData()
  }, [])
  const getData = async () => {
    const params = { deleted: false, limit: 6 }
    const data = await getCarousel(params)
    setCarousel(data.allCarousel[0])
  }
  return (
    <>
      {carousel ? (
        <>
          <video width='100%' height='100%' autoPlay muted>
            <source src={carousel.file} type='video/mp4' />
          </video>
          <p className='mb-0 phrase cover-title'>
            "Yo Soy La Inmaculada Madre Del Divino <br/>
            Corazón Eucarístico de Jesús"
          </p>
        </>
      ) : (
        <div style={{ width: '100%', height: '500px' }}>
          <Spinn type='data' />
        </div>
      )}
    </>
    // </Carousel>
  )
}

export default Cover
