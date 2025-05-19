import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Navigation } from 'swiper'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import GenericCard from './GenericCard.jsx'

const NewCarousel = ({ data, type }) => {
  return (
    <div className='d-flex justify-content-start'>
      {data?.length < 3 ? (
        data?.map((item, i) => (
          <div key={i} className='card-container'>
            <GenericCard
              data={data}
              photos1={data.photos ? data?.photos[0] : data?.photo}
              type={type}
            />
          </div>
        ))
      ) : (
        <Swiper
          freeMode={true}
          grabCursor={true}
          navigation={true}
          modules={[FreeMode, Navigation]}
          spaceBetween={40}
          className='mySwipper'
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            576: {
              slidesPerView: 2,
            },
            992: {
              slidesPerView: 3,
            },
          }}
        >
          {data?.map((item, i) => (
            <SwiperSlide key={i}>
              <div className='card-container'>
                <GenericCard
                  data={item}
                  photos1={item.photos ? item?.photos[0] : item?.photo}
                  type={type}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  )
}

export default NewCarousel
