import React from 'react'
import Layout from '../../components/Layout/Layout'
import LayoutFoot from '../../components/Layout/LayoutFoot'
import { Container, Row } from 'react-bootstrap'
import FormPrayerRequest from '../../components/PrayerRequest/FormPrayerRequest'
import HeaderPrayerRequest from '../../components/PrayerRequest/HeaderPrayerRequest'

const PrayerRequest = () => {
  return (
    <div className='bg-gradient-3'>
      <Layout />
      <Container className='mt-3 pt-5'>
        <Row className='pb-4'>
          <HeaderPrayerRequest />
        </Row>
        <Row>
          <FormPrayerRequest />
        </Row>
      </Container>
      <LayoutFoot />
    </div>
  )
}

export default PrayerRequest
