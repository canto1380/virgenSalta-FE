import React, { useEffect, useState } from 'react'
import { Card, Button } from 'react-bootstrap'
import { MdDateRange, MdAccessTime } from 'react-icons/md'
import '../news.css'
const CardNewsPage = ({ data: { img, title, _id }, data, pathUrl }) => {
  const [titleParams, setTitleParams] = useState(title)
  const [dateRegister, setDateRegister] = useState(undefined)

  useEffect(() => {
    setTitleParams(title.replace(/ /g, '-'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])
  useEffect(() => {
    const dateConvert = new Date(data.createdAt)
    setDateRegister(dateConvert)
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
          <div className='d-flex justify-content-between cardNewsPage-subtitle'>
            <div className='cardNewsPage-subtitle1'>
              <MdDateRange className='cardNewsPage-icon me-2' />
              {`${dateRegister?.getDate()}/${dateRegister?.getMonth()}/${dateRegister?.getFullYear()}`}{' '}
            </div>
            <div className='cardNewsPage-subtitle1'>
              <MdAccessTime className='cardNewsPage-icon me-2' />
              {`${dateRegister?.getHours()}:${dateRegister?.getMinutes()}hs`}
            </div>
          </div>
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
