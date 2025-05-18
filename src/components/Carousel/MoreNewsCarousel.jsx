import React from 'react'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import CardMore from '../CardsMore/CardMore'

const MoreNewsCarousel = ({ data }) => {
  return (
    <div>
      {data?.map((d, i) => (
        <CardMore data={d} key={i} />
      ))}
    </div>
  )
}

export default MoreNewsCarousel
