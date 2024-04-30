import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import HeaderSections from '../Title/HeaderSections'
import { getSpecialDays } from '../../utils/queryAPI/specialDays'
import CardSpecialDay from './CardSpecialDays'

const SpecialDays = () => {
  const [specialDay, setSpecialDay] = useState()

  useEffect(() => {
    dataSpecialDays()
  }, [])

  const dataSpecialDays = async () => {
    const params = { limit: 6, deleted: false }
    const data = await getSpecialDays(params)
    setSpecialDay(data?.allSpecialDays)
  }
  return (
    <>
      <div>
        <Row className='ps-4'>
          <HeaderSections
            title={'Jornadas'}
            linkRef={'/jornadas'}
            styleAdd={'text-white'}
          />
        </Row>
        <Row className='mt-5 mb-3 px-5'>
          {specialDay?.map((d, i) => (
            <Col
              key={i}
              xs={12}
              sm={6}
              md={6}
              lg={4}
              className='mb-4'
            >
              <CardSpecialDay data={d} photos={d?.photos[0]} />
            </Col>
          ))}
        </Row>
      </div>
    </>
  )
}

export default SpecialDays
