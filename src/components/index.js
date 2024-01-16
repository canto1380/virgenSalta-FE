import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import Cover from './Cover'
import News from './News'
import Categories from './Categories'
import Title from './Title'
import SpecialDays from './SpecialDays'
import Statics from './Statics'
import PhotosGallery from './PhotosGallery'
import VideoGallery from './VideoGallery'
import FastAccess from './FastAccess'
import Layout from './Layout/Layout'
import LayoutFoot from './Layout/LayoutFoot'
import axios from 'axios'
import LiveVideo from './LiveChannel/LiveVideo'
const Home = () => {
  const [videosBack, setVideosBack] = useState()
  const [videoLive, setVideoLive] = useState()
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
            maxResults: 1000,
          },
        }
      )
      const data = response.data.items
      const videosNoLive = data.filter(
        (d) => d.snippet.liveBroadcastContent === 'none'
      )

      const videosLive = data.filter(
        (d) => d.snippet.liveBroadcastContent === 'live'
      )

      setVideosBack(videosNoLive.slice(0, 8))
      setVideoLive(videosLive)
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <div>
      <Layout />
      {videoLive && videoLive.length > 0 && <LiveVideo videoLive={videoLive} />}
      <Title />
      <Container fluid className='px-0 container-cover'>
        <Cover />
      </Container>
      <Container className='py-5'>
        <News />
        <div className='text-center'>
          <p className='phrase1 mb-0'>
            "Hay que juntar el rebaño antes que oscurezca"
          </p>
          <p className='phrase1 mb-4'>
            "No he venido a criticar ni a destruir, sino a Construir"
          </p>
        </div>
        <div className='text-center'>
          <p className='section-title'>
            Sitio Oficial del Santuario de las Apariciones de la Santísima
            Virgen María y de Nuestro Señor Jesucristo
          </p>
          <p className='section-title'>SALTA - ARGENTINA</p>
        </div>
        <hr className='my-5' />
        <Categories />
        <FastAccess />
      </Container>
      <Container fluid className='container-special-day py-5'>
        <SpecialDays className='px-0' />
      </Container>
      <Container className='py-5'>
        <Statics />
        <hr className='my-5' />
        <PhotosGallery />
        <hr className='my-5' />
        <VideoGallery videosBack={videosBack} />
      </Container>
      <LayoutFoot />
    </div>
  )
}

export default Home
