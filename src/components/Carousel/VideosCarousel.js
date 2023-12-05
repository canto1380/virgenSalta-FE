import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Navigation } from 'swiper'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import VideoCard from './VideoCard'
import axios from 'axios'
import Spinn from '../Spinn/Spinn'

const VideosCarousel = () => {
  const [videosBack, setVideosBack] = useState()
  const { REACT_APP_CHANNEL_ID_YOUTUBE, REACT_APP_API_KEY_YOUTUBE } =
    process.env
  useEffect(() => {
    fetchVideos()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const fetchVideos = async () => {
    try {
      const response = await axios.get(
        'https://www.googleapis.com/youtube/v3/search',
        {
          params: {
            key: REACT_APP_API_KEY_YOUTUBE,
            channelId: REACT_APP_CHANNEL_ID_YOUTUBE,
            part: 'snippet',
            type: 'video',
            maxResults: 8,
          },
        }
      )
      setVideosBack(response.data.items)
    } catch (error) {
      console.error(error)
    }
  }
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
