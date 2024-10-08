import React, { useEffect } from 'react'
import './singleNews.css'

const BodyNews = ({ data, photos, fontSize }) => {
  useEffect(() => {
    if (data) {
      bodyText()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  const bodyText = () => {
    const arr = data.split('</p>')
    const bodyText = document.querySelector('.ida')
    arr.forEach((d, i) => {
      bodyText.innerHTML += `${d}`
    })
  }

  return (
    <div className='single-news-description'>
      <div
        className='ida text-body-news'
        style={{ fontSize: `${fontSize}px` }}
      ></div>
    </div>
  )
}

export default BodyNews
