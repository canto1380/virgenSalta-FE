import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import MoreNewsCard from "./MoreNewsCard";
import { Container } from "react-bootstrap";

const MoreNewsCarousel = ({ data }) => {
  return (
    <div className='px-5 pb-5'>
      <Container>
      <p className="title-recent-news pt-4 pb-2 text-light">Noticias recientes</p>
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
            <MoreNewsCard data={d} i={i} />
          </SwiperSlide>
        ))}
      </Swiper>

      </Container>
    </div>
  );
};

export default MoreNewsCarousel;
