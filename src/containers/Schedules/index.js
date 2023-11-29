import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Layout from '../../components/Layout/Layout'
import LayoutFoot from '../../components/Layout/LayoutFoot'
import DailyEvents from '../../components/Schedules/DailyEvents'
import ImportantDates from '../../components/Schedules/ImportantDates'
import { getEventType } from '../../utils/queryAPI/eventType'
import { getDailyEvent } from '../../utils/queryAPI/dailyEvent'
import { getImportantEventType } from '../../utils/queryAPI/importantEventType'
import { getImportantEvent } from '../../utils/queryAPI/importantEvent'

const Schedules = () => {
  const [eventType, setEventType] = useState([])
  const [dailyEvent, setDailyEvent] = useState([])
  const [importantEventType, setImportantEventType] = useState([])
  const [importantEvent, setImportantEvent] = useState([])
  const [idImportantEventTypeDefault, setIdImportantEventTypeDefault] =
    useState(null)

  useEffect(() => {
    dataEventType()
  }, [])

  const dataEventType = async () => {
    const params = { deleted: false }
    const data = await getEventType(params)
    setEventType(data.allEvent)
  }

  useEffect(() => {
    dataDailyEvent()
  }, [])

  const dataDailyEvent = async () => {
    const params = { deleted: false, limit: 5000 }
    const data = await getDailyEvent(params)
    setDailyEvent(data.allDailyEvent)
  }

  useEffect(() => {
    dataImportantEventType()
  }, [])
  const dataImportantEventType = async () => {
    const params = { deleted: false, limit: 500000 }
    const data = await getImportantEventType(params)
    setImportantEventType(data.allEventType)
  }

  useEffect(() => {
    dataImportantEvent()
  }, [])
  const dataImportantEvent = async () => {
    const params = { deleted: false, limit: 500000 }
    const data = await getImportantEvent(params)
    setImportantEvent(data.allEvent)
  }

  useEffect(() => {
    const id = importantEventType.find((d) => d.deleted === false)
    setIdImportantEventTypeDefault(id?._id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [importantEventType])

  return (
    <>
      <Layout />
      <Container fluid className='bg-gradient-2'>
        <div className='container'>
          <Row className='mx-3 pt-2 pb-5'>
            <Col xs={12} className='pt-5 pb-3'>
              <p className='page-section-title text-light'>
                Horarios de Celebraciones
              </p>
              <hr />
            </Col>
            <Col xs={12} className='bg-light px-0'>
              <ImportantDates
                importantEventType={importantEventType}
                importantEvent={importantEvent}
                idImportantEventTypeDefault={idImportantEventTypeDefault}
              />
            </Col>
            <Col xs={12} className='my-5 bg-light px-0'>
              <DailyEvents eventType={eventType} dailyEvent={dailyEvent} />
            </Col>
          </Row>
        </div>
      </Container>
      <LayoutFoot />
    </>
  )
}

export default Schedules
