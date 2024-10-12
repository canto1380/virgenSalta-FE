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
        <GrPrevious className='sizeIconSlider me-3' />
      </div>
      <Swiper
        ref={swiperRef}
        freeMode={true}
        slidesPerView={Math.min(data?.length, 3)}
        grabCursor={true}
        modules={[FreeMode, Navigation]}
        centeredSlides={data?.length < 3 ? true : false}
        // navigation={true}
        className={`mySwipper`}
        breakpoints={{
          0: {
            slidesPerView: 1,
            spaceBetween: 40,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          992: {
            slidesPerView: Math.min(data?.length, 3),
            spaceBetween: 40,
          },
        }}
      >
        {data?.map((d, i) => (
          <SwiperSlide key={i} style={{ maxWidth: '33.33%' }}>
            <GenericCard
              data={d}
              photos1={d.photos ? d?.photos[0] : d?.photo}
              type={type}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className='next-button alignVert' onClick={goNext}>
        <GrNext className='sizeIconSlider ms-3' />
      </div>
    </div>
  )
}

export default NewCarousel
