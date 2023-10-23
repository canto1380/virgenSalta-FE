import React from 'react'
import '../News/news.css'

const CardModel = ({ data: { photos, img, title, _id }, photos1, type }) => {
  return (
    <div className='card-container'>
      {/* <Card className="card-container"> */}
      <a
        href={`/${type === 'news' ? 'noticias' : 'jornadas'}/${title.replace(
          / /g,
          '-'
        )}`}
        className='aa'
      >
        <img src={photos1} alt='imagen' className='card-img' />
        <p className='mb-0 card-title1'>{title}</p>
      </a>
    </div>
  )
}

export default CardModel
