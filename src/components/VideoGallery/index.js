import React from 'react'
import { Row } from 'react-bootstrap'
import HeaderSections from '../Title/HeaderSections'
import VideosCarousel from '../Carousel/VideosCarousel'

const VideoGallery = ({videosBack}) => {
  return (
    <div>
      <HeaderSections title={'Videos'} blank titleBtn={'Ver Canal'} linkRef={'https://www.youtube.com/@ObraInmaculadaMadreIMCEJySACEJ'}/>
      <Row className='mt-3 mb-5'>
        <VideosCarousel videosBack={videosBack}/>
      </Row>
    </div>
  )
}

export default VideoGallery
