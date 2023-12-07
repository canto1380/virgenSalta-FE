import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Navigation } from 'swiper'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import VideoCard from './VideoCard'
import Spinn from '../Spinn/Spinn'

const VideosCarousel = ({videosBack}) => {

  return (
    <div>
      {!videosBack ? (
        <div className='d-flex justify-content-center'>
          <Spinn />
        </div>
      ) : (
        <Swiper
          freeMode={true}
          grabCursor={true}
          modules={[FreeMode, Navigation]}
          navigation={true}
          className={`mySwipper`}
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 40,
            },
            576: {
              slidesPerView: 2,
              spaceBetween: 40,
            },
            992: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
          }}
        >
          {videosBack?.map((d, i) => (
            <SwiperSlide key={i}>
              <VideoCard videosBack={d} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  )
}

export default VideosCarousel
