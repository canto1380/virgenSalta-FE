import React, { useState, useEffect } from 'react'
import { Card } from 'react-bootstrap'
import ImgPrueba from '../../images/logo.jpg'

const CardGeneric = ({
  info: { nameCategory, backdrop },
  styleAdd,
  typeFlag,
}) => {
  const [titleParams, setTitleParams] = useState(nameCategory)
  useEffect(() => {
    setTitleParams(nameCategory?.replace(/ /g, '-'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div>
      {typeFlag === 'newsCategories' ? (
        <a href={`/categorias/${titleParams}`} className=''>
          <Card className={`cardG-container border border-0`}>
            <img
              src={backdrop}
              alt='imagen'
              className={`cardG-img ${styleAdd}`}
            />
            {nameCategory && (
              <p className='mb-0 cardG-title'>{nameCategory.toUpperCase()}</p>
            )}
          </Card>
        </a>
      ) : (
        <Card className={`cardG-container border border-0`}>
          <img
            src={ImgPrueba}
            alt='imagen'
            className={`cardG-img ${styleAdd}`}
          />
          {nameCategory && (
            <p className='mb-0 cardG-title'>{nameCategory.toUpperCase()}</p>
          )}
        </Card>
      )}
    </div>
  )
}

export default CardGeneric
