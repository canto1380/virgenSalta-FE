import React, { useState, useEffect } from 'react'
import { Row } from 'react-bootstrap'
import HeaderSections from '../Title/HeaderSections'
import VideosCarousel from '../Carousel/VideosCarousel'
import { getConfigurations } from '../../utils/queryAPI/configurations'

const VideoGallery = ({ videosBack }) => {
  const [urlYoutube, setUrlYoutube] = useState(undefined)
  useEffect(() => {
    dataInstagram()
  }, [])
  const dataInstagram = async () => {
    const params = { deleted: false, search: 'Youtube' }
    const urlYoutube = await getConfigurations(params)
    if (urlYoutube.allConfigurations.length !== 0) {
      setUrlYoutube(urlYoutube.allConfigurations[0].mixedField)
    }
  }
  return (
    <div>
      <HeaderSections
        title={'Videos'}
        blank
        titleBtn={'Ver Canal'}
        linkRef={urlYoutube}
      />
      <Row className='mt-3 mb-5'>
        <VideosCarousel videosBack={videosBack} />
      </Row>
    </div>
  )
}

export default VideoGallery
