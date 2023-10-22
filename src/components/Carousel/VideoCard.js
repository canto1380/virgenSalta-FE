import React, { useEffect } from 'react'
import { Card } from 'react-bootstrap'
import '../News/news.css'
import '../VideoGallery/videoGallery.css'
import axios from 'axios'

const VideoCard = ({ data, i }) => {
  useEffect(() => {
    getVideoYoutube()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const api_key = 'AIzaSyC530nKCd3axC0fxS2yaYAIwaPnC24guZ4'
  const url = `https://www.googleapis.com/youtube/v3/videos?key=${api_key}&id=${'YjBSl8v1u8w'}&part=snippet`
  const getVideoYoutube = async () => {
    console.log(url)
    const res = await axios(url)
    console.log(res)
  }
  return (
    <div className=''>
      <Card className='cardvideo-container border border-0'>
        {/* <iframe
          width='100%'
          height='200'
          // src="https://www.youtube.com/embed/YjBSl8v1u8w?origin=https://virgendesalta.netlify.app"
          src={`https://www.googleapis.com/youtube/v3/videos?key=${api_key}&id=${'YjBSl8v1u8w'}&part=snippet`}
          title='Video de la Virgen de Salta'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
          allowFullScreen
        ></iframe> */}

        <iframe
          width='100%'
          height='200'
          src='https://www.youtube.com/embed/YjBSl8v1u8w'
          title='La Virgen del Cerro en Salta'
          // frameBorder='0'
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
