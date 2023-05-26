import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import GenericCard from "./GenericCard";
const NewCarousel = ({ data }) => {
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
          },
        }}
      >
        {data?.map((d, i) => (
          <SwiperSlide key={i}>
            {/* <GenericCard data={d} photos1={d?.photos[0]} /> */}
            <GenericCard data={d} photos1={d.photos ? d?.photos[0] : d?.photo} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default NewCarousel;
