import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import HeaderSections from '../Title/HeaderSections'
import axios from 'axios'
import './feedInstagram.css'

const PhotosGallery = () => {
  const [dataFeedInsta, setDataFeedInsta] = useState()

  const getInstaFeed = async () => {
    const token = process.env.REACT_APP_INSTAGRAM
    const fields =
      'thumbnail_url,media_url,media_type,caption,permalink,limit=80'
    const url = `https://graph.instagram.com/me/media?access_token=${token}&fields=${fields}`

    const { data } = await axios.get(url)
    setDataFeedInsta(data.data)
  }
  useEffect(() => {
    getInstaFeed()
  }, [])

  return (
    <div>
      <HeaderSections
        title={'Instagram'}
        linkRef={'https://www.instagram.com/atapenalba/'}
        blank
        titleBtn={'Ver perfil'}
      />
      {/* <Row className="mt-3 mb-5">
        {photosBack?.map((p) => (
          <Col key={p.id} xs={12} md={4} lg={3} className="mb-4">
            <CardGeneric info={p} styleAdd={"img-radius"} typeFag="photos" />
          </Col>
        ))}
      </Row> */}
      <Row>
        {dataFeedInsta?.map((d) => (
          <Col key={d.id} xs={12} md={4} className='py-3'>
            <a
              href={`${d.permalink}`}
              target='_blank'
              rel='noreferrer'
              className='container-feed'
            >
              <div className='image'>
                {d.media_type === 'IMAGE' ? (
                  <img src={`${d.media_url}`} alt='' />
                ) : (
                  <video controls>
                    <source src={d.media_url} />
                  </video>
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
