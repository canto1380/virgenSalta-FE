import React from 'react'
import { Card } from 'react-bootstrap'
import '../News/news.css'
import '../VideoGallery/videoGallery.css'

const VideoCard = ({ videosBack }) => {
  return (
    <div className=''>
      <Card className='cardvideo-container border border-0'>
        <iframe
          width='100%'
          height='200'
          src={`https://www.youtube.com/embed/${videosBack?.id?.videoId}`}
          // src={`https://www.youtube.com/embed/${video}?origin=https://virgendesalta.netlify.app`}
          title='Video de la Virgen de Salta'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
          allowFullScreen
        ></iframe>

        <p className='mb-0 cardvideo-title'>{videosBack?.snippet?.title}</p>
      </Card>
    </div>
  )
}

export default VideoCard
