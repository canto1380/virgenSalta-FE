import React from 'react'
import './singleNews.css'
import CarouselSingleNews from './CarouselSingleNews'

const HeaderNews = ({ data }) => {
  return (
    <div>
      <h1 className='single-news-title mb-2'>{data?.title}</h1>
      <p className='single-news-subtitle mt-3'>{data?.subtitle}</p>

      {data && data.photos.length > 0 ? (
        <>
          <div className='pt-1 pb-3 containerImg'>
            {<CarouselSingleNews photos={data?.photos}/>}
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
