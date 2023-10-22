import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
import '../News/news.css'
import '../VideoGallery/videoGallery.css'
import axios from 'axios'

const VideoCard = ({ data, i }) => {
  const [video, setVideo] = useState('')
  useEffect(() => {
    getVideoYoutube()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const api_key = 'AIzaSyC530nKCd3axC0fxS2yaYAIwaPnC24guZ4'
  const url = `https://www.googleapis.com/youtube/v3/videos?key=${api_key}&id=${'YjBSl8v1u8w'}&part=snippet`
  const getVideoYoutube = async () => {
    console.log(url)
    const res = await axios(url)
    setVideo(res?.data?.items[0]?.id)
  }
  return (
    <div className=''>
      <Card className='cardvideo-container border border-0'>
        <iframe
          width='100%'
          height='200'
          // src="https://www.youtube.com/embed/YjBSl8v1u8w?origin=https://virgendesalta.netlify.app"
          src={`https://www.youtube.com/embed/${video}?origin=https://virgendesalta.netlify.app`}
          title='Video de la Virgen de Salta'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
          allowFullScreen
        ></iframe>

        <p className='mb-0 cardvideo-title'>
          {data?.titulo} {i + 1}
        </p>
      </Card>
    </div>
  )
}

export default VideoCard
