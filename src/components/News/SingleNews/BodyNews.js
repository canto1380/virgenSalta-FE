import React, { useEffect } from 'react'
import './singleNews.css'

const BodyNews = ({ data, photos }) => {
  useEffect(() => {
    if (data) {
      bodyText()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  const bodyText = () => {
    const arr = data.split('</p>')
    const lengthArr = arr.length
    const lengthPhotos = photos.length
    const numberInsertText = Math.floor(lengthArr / lengthPhotos)
    const bodyText = document.querySelector('.ida')
    let numberInsertImg = 0
    arr.forEach((d, i) => {
      bodyText.innerHTML += `${d}`
      if (
        i !== 0 &&
        i % numberInsertText === 0 &&
        photos[numberInsertImg + 1]
      ) {
        numberInsertImg += 1
        bodyText.innerHTML += `<figure class='figure-body-news'><img class='img-body-news my-3' src=${photos[numberInsertImg]}/></figure>`
      }
    })
    if (numberInsertImg === 0) {
      photos.shift()
      photos.forEach((p, i) => {
        bodyText.innerHTML += `<figure class='figure-body-news'><img class='img-body-news my-3' src=${p}/></figure>`
      })
    }
  }

  return (
    <div className='single-news-description'>
      <div className='ida'></div>
    </div>
  )
}

export default BodyNews
