import React, { useEffect, useState } from 'react'
import { Card, Button } from 'react-bootstrap'
import '../news.css'
const CardNewsPage = ({ data: { img, title, _id }, data, pathUrl }) => {
  const [titleParams, setTitleParams] = useState(title)

  useEffect(() => {
    setTitleParams(title.replace(/ /g, '-'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  return (
    <>
      <Card className='cardNewsPage'>
        <Card.Img
          variant='top'
          src={data?.photos[0]}
          className='cardNewsPage-img'
        />
        <Card.Body className='cardNewPage-body'>
          <Card.Title className='cardNewsPage-title'>{title}</Card.Title>

          <Card.Text>{data?.subtitle}</Card.Text>
          <a href={`/${pathUrl}/${titleParams}`}>
            <Button variant='primary' className='section-btn'>
              Leer Más
            </Button>
          </a>
        </Card.Body>
      </Card>
    </>
  )
}

export default CardNewsPage
