import React from 'react'
import { Image } from 'react-bootstrap'
import './singleNews.css'

const HeaderNews = ({ data }) => {
  return (
    <div>
      <h1 className='single-news-title'>{data?.title}</h1>
      <p className='single-news-subtitle'>{data?.subtitle}</p>

      {data && data.photos.length > 0 ? (
        <>
          <div className='pt-3 pb-3'>
            <Image src={data?.photos[0]} className='w-100 image-news' />
            <p className='text-secondary lead ps-2 mb-0'>{data?.caption}</p>
          </div>
          <hr className='pb-3' />
        </>
      ) : (
        <div className='pb-5'></div>
      )}
    </div>
  )
}

export default HeaderNews
