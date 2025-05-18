import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import HeaderSections from '../Title/HeaderSections'
import axios from 'axios'
import './feedInstagram.css'
import { getConfigurations } from '../../utils/queryAPI/configurations'

const PhotosGallery = () => {
  const [dataFeedInsta, setDataFeedInsta] = useState()
  const [tokenRefresh, setTokenRefresh] = useState(undefined)
  const [urlInsta, setUrlInsta] = useState(undefined)

  useEffect(() => {
    getTokenRefresh()
  }, [])
  const getTokenRefresh = async () => {
    const token = process.env.REACT_APP_INSTAGRAM

    const dataToken = await axios.get(
      `https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${token}`
    )
    setTokenRefresh(dataToken?.data?.access_token)
  }

  const getInstaFeed = async () => {
    const fields =
      'thumbnail_url,media_url,media_type,caption,permalink,limit=6'
    const url = `https://graph.instagram.com/me/media?access_token=${tokenRefresh}&fields=${fields}&limit=6`

    if (tokenRefresh !== undefined) {
      const { data } = await axios.get(url)
      setDataFeedInsta(data.data)
    }
  }
  useEffect(() => {
    getInstaFeed()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokenRefresh])

  useEffect(() => {
    dataInstagram()
  }, [])
  const dataInstagram = async () => {
    const params = { deleted: false, search: 'Instagram' }
    const urlInstagram = await getConfigurations(params)
    if (urlInstagram.allConfigurations.length !== 0) {
      setUrlInsta(urlInstagram.allConfigurations[0].mixedField)
    }
  }

  return (
    <div>
      <HeaderSections
        title={'Instagram'}
        linkRef={urlInsta && urlInsta}
        blank
        titleBtn={'Ver Instagram'}
      />

      <Row>
        {dataFeedInsta?.map((d) => (
          <Col key={d.id} xs={12} md={4} className='py-3 aas'>
            <a
              href={`${d.permalink}`}
              target='_blank'
              rel='noreferrer'
              className='container-feed'
            >
              <div className='image'>
                {d.media_type === 'VIDEO' ? (
                  <video controls>
                    <source src={d.media_url} />
                  </video>
                ) : (
                  <img src={`${d.media_url}`} alt='' />
                )}
              </div>
              <div className='opacity-hover'>
                <div className='caption'>
                  <p>{d.caption.slice(0, 100)}</p>
                </div>
              </div>
            </a>
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default PhotosGallery
