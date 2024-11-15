import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Navigation } from 'swiper'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import GenericCard from './GenericCard'

const NewCarousel = ({ data, type }) => {
  return (
    <div className='d-flex justify-content-between'>
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
        {data?.map((d, i) => (
          <SwiperSlide key={i}>
            {/* <VideoCard videosBack={d} /> */}
            <GenericCard
              data={d}
              photos1={d.photos ? d?.photos[0] : d?.photo}
              type={type}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default NewCarousel
