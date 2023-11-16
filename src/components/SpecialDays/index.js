import React, { useEffect, useState } from 'react'
import { Row } from 'react-bootstrap'
import HeaderSections from '../Title/HeaderSections'
import GenericCarousel from '../Carousel/GenericCarousel'
import { getSpecialDays } from '../../utils/queryAPI/specialDays'

const SpecialDays = () => {
  const [specialDay, setSpecialDay] = useState()

  useEffect(() => {
    dataSpecialDays()
  }, [])

  const dataSpecialDays = async () => {
    const params = { limit: 6, deleted: false }
    const data = await getSpecialDays(params)
    setSpecialDay(data)
  }
  return (
    <div>
      <Row className='ps-4'>
        <HeaderSections
          title={'Jornadas'}
          linkRef={'/jornadas'}
          styleAdd={'text-white'}
        />
      </Row>
      <Row className='mt-3 mb-5 ps-4 pe-4'>
        <GenericCarousel data={specialDay?.allSpecialDays} type='specialDay' />
      </Row>
    </div>
  )
}

export default SpecialDays
