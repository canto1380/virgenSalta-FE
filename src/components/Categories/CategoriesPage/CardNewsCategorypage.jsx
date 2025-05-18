import React, { useState, useEffect } from 'react'
import { Card } from 'react-bootstrap'

const CardNewsCategorypage = ({ data: { nameCategory, backdrop } }) => {
  const [titleParams, setTitleParams] = useState(nameCategory)
  useEffect(() => {
    setTitleParams(nameCategory.replace(/ /g, '-'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div>
      <a href={`/categorias/${titleParams}`}>
        <Card className='cardG-container border border-0'>
          <Card.Img variant='top' src={backdrop} className='cardG-img' />
          <p className='mb-0 cardG-title'>{nameCategory.toUpperCase()}</p>
        </Card>
      </a>
    </div>
  )
}

export default CardNewsCategorypage
