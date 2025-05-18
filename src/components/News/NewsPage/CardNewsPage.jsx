import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
import '../news.css'
import fotoDefault from '../../../images/logo-corazon.webp'

const CardNewsPage = ({ data: { img, title, _id }, data, pathUrl, type }) => {
  const [titleParams, setTitleParams] = useState(title)

  useEffect(() => {
    setTitleParams(title.replace(/ /g, '-'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])
  return (
    <>
      {type === 'Mensajes' ? (
        <Card className='cardNewsPage'>
          <a
            href={`/${
              data.preload === true ? data.route : `${pathUrl}/${titleParams}`
            }`}
            className='decoration-link'
          >
            <Card.Img
              variant='top'
              src={data?.photos ? data.photos : fotoDefault}
              className='cardNewsPage-img'
            />
            <Card.Body className='cardNewPage-body'>
              <Card.Title className='cardNewsPage-title'>{title}</Card.Title>
            </Card.Body>
          </a>
        </Card>
      ) : (
        <Card className='cardNewsPage'>
          <a href={`/${pathUrl}/${titleParams}`} className='decoration-link'>
            <Card.Img
              variant='top'
              src={data?.photos?.length > 0 ? data.photos[0] : fotoDefault}
              className='cardNewsPage-img'
            />
            <Card.Body className='cardNewPage-body'>
              <Card.Title className='cardNewsPage-title'>{title}</Card.Title>

              <Card.Text>{data?.subtitle}</Card.Text>
            </Card.Body>
          </a>
        </Card>
      )}
    </>
  )
}

export default CardNewsPage
