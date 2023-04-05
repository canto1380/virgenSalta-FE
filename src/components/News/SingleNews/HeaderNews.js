import React from 'react';
import { Image } from 'react-bootstrap';
import './singleNews.css'

const HeaderNews = ({data}) => {
  return (
    <div>
      <h1 className='single-news-title'>{data?.titulo}</h1>
      <p className='single-news-subtitle'>{data?.subtitulo}</p>
      <div className='text-secondary'>
        <span>16/06/2023 |</span>
        <span> 16:45hs</span>
      </div>
      <div className='pt-3 pb-4'>
        <Image src={data?.img} className='w-100 image-news'/>
        <p className='text-secondary lead ps-2 mb-0'>{data?.pieDeFoto}</p>
      </div>
    </div>
  );
};

export default HeaderNews;
