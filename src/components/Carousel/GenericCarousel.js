import React, { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Navigation } from 'swiper'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import GenericCard from './GenericCard'
import { GrPrevious, GrNext } from 'react-icons/gr'

const NewCarousel = ({ data, type }) => {
  const swiperRef = useRef(null)
  const goNext = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext()
    }
  }

  const goPrev = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev()
    }
  }
  return (
    <div className='d-flex justify-content-between'>
      <div className='prev-button alignVert' onClick={goPrev}>
        <GrPrevious className='sizeIconSlider mx-3' />
      </div>
      <Swiper
        ref={swiperRef}
        freeMode={true}
        slidesPerView={1}
        grabCursor={true}
        modules={[FreeMode, Navigation]}
        // navigation={true}
        className={`mySwipper`}
        breakpoints={{
          0: {
            slidesPerView: 1,
            spaceBetween: 55,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 55,
          },
          992: {
            slidesPerView: 3,
            spaceBetween: 55,
          },
        }}
      >
        {data?.map((d, i) => (
          <SwiperSlide key={i}>
            <GenericCard
              data={d}
              photos1={d.photos ? d?.photos[0] : d?.photo}
              type={type}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className='next-button alignVert' onClick={goNext}>
        <GrNext className='sizeIconSlider mx-3' />
      </div>
    </div>
  )
}

export default NewCarousel
