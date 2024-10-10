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
import { getConfigurations } from '../utils/queryAPI/configurations'
const Home = () => {
  const [videosBack, setVideosBack] = useState()
  const [videoLive, setVideoLive] = useState()
  const [allConfigurations, setAllConfigurations] = useState(undefined)
  const [frase1, setFrase1] = useState(undefined)
  const [frase2, setFrase2] = useState(undefined)
  const [sitioOficial, setSitioOficial] = useState(undefined)

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
            maxResults: 10,
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

  useEffect(() => {
    dataConfig()
  }, [])
  const dataConfig = async () => {
    const params = { deleted: false }
    const data = await getConfigurations(params)
    setAllConfigurations(data.allConfigurations)
  }

  useEffect(() => {
    dataAppStore()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allConfigurations])

  const dataAppStore = async () => {
    const dataFrase1 = allConfigurations?.find((d) => d.title === 'Frase 1')
    const dataFrase2 = allConfigurations?.find((d) => d.title === 'Frase 2')
    const dataSitioOficial = allConfigurations?.find(
      (d) => d.title === 'Sitio oficial'
    )

    setFrase1(dataFrase1)
    setFrase2(dataFrase2)
    setSitioOficial(dataSitioOficial)
  }

  return (
    <div>
      <Layout />
      {videoLive && videoLive.length > 0 && <LiveVideo videoLive={videoLive} />}
      <Title />
      <Container fluid className='px-0 container-cover'>
        <Cover />
      </Container>
      <Container className='pb-5'>
        <News />
        {!allConfigurations ? (
          <div className='my-5 py-4'></div>
        ) : (
          <>
            <div className='text-center pt-4'>
              <p className='phrase1 mb-0'>{frase1 && frase1.mixedField}</p>
              <p className='phrase1 mb-4'>{frase2 && frase2.mixedField}</p>
            </div>
            <div className='text-center pb-3'>
              <p className='section-title'>
                {sitioOficial && sitioOficial.mixedField}
              </p>
              <p className='section-title'>SALTA - ARGENTINA</p>
            </div>
          </>
        )}
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
