import React, { useEffect, useState } from 'react'
import { getCarousel } from '../../utils/queryAPI/carousel'
import Spinn from '../Spinn/Spinn'
import './cover.css'
import FondoGris from '../../images/fondoGris.jpg'

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
          <video width='100%' autoPlay muted poster={FondoGris} loop>
            <source src={carousel.file} type='video/mp4' />
          </video>
        </>
      ) : (
        <div className='d-flex justify-content-center'>
          <Spinn type='data' />
        </div>
        // <>
        //   <video width='100%' autoPlay muted poster={FondoGris} loop>
        //     <source src={carousel?.file} type='video/mp4' />
        //   </video>
        // </>
      )}
    </>
  )
}

export default Cover
