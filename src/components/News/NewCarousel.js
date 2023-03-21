import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import CardModel from "../Cards/CardModel";
import { noticias } from "../../utils/seeders";
const NewCarousel = () => {
  return (
    <div>
      <Swiper
        freeMode={true}
        grabCursor={true}
        modules={[FreeMode, Navigation]}
        navigation={true}
        className={`mySwipper`}
        breakpoints={{
          0: {
            slidesPerView: 1,
            spaceBetween: 30,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          992: {
            slidesPerView: 3,
            spaceBetween: 30,
          }
        }}
      >
        {noticias?.map((news, i) => (
          <SwiperSlide key={i}>
            <CardModel news={news} i={i}/>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default NewCarousel;
