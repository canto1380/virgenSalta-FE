import React from 'react'
import fotoDefault from '../../images/logo-corazon.jpg'
import { Card } from 'react-bootstrap'
const CardSpecialDay = ({ data: { title }, photos, styleAdd }) => {
  return (
    <a href={`/jornadas/${title.replace(/ /g, '-')}`} className=''>
      <Card className={`cardG-container border border-0`}>
        <img
          src={photos ? photos : fotoDefault}
          alt='imagen'
          className={`cardG-img ${styleAdd}`}
        />
        {/* {nameCategory && ( */}
        <p className='mb-0 cardG-title'>{title}</p>
        {/* )} */}
      </Card>
    </a>
  )
}

export default CardSpecialDay
