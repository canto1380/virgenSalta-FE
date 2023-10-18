import React, { useContext, useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Tabs } from 'antd'
import '../menus.css'
import { User } from '../../../context/userProvider'
import { getEventType } from '../../../utils/queryAPI/eventType'
import ItemsCollapse from './ItemsCollapse'
import { getDailyEvent } from '../../../utils/queryAPI/dailyEvent'
import FiltersSchedules from './FiltersSchedules'
import { getImportantEventType } from '../../../utils/queryAPI/importantEventType'
import {getImportantEvent} from '../../../utils/queryAPI/importantEvent'

const MenuSchedules = () => {
  const [keyBtn, setKeyBtn] = useState(1)
  const [search, setSearch] = useState('')
  const [deleted, setDeleted] = useState(undefined)
  const [limit, setLimit] = useState(10)
  const [eventType, setEventType] = useState([])
  const [dailyEvent, setdailyEvent] = useState([])
  const [pageSelected, setPageSelected] = useState(1)
  const [band, setBand] = useState(false)
  const [importantEventType, setImportantEventType] = useState([])
  const [importantEvent, setImportantEvent] = useState([])
  const [idEventType, setIdEventType] = useState(undefined)
  const [idImportantEventType, setIdImportantEventType] = useState(undefined)

  const {
    state: { userToken },
  } = useContext(User)

  useEffect(() => {
    dataEventType()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageSelected, limit, band, idEventType])
  const dataEventType = async () => {
    const params = { page: pageSelected, limit: 1500 }
    const data = await getEventType(params)
    setEventType(data)
  }
  useEffect(() => {
    dataDailyEvent()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, deleted, pageSelected, limit, band, idEventType])
  const dataDailyEvent = async () => {
    const params = {
      search,
      deleted,
      page: pageSelected,
      limit: 1500,
      idEventType,
    }
    const data = await getDailyEvent(params)
    setdailyEvent(data)
  }

  useEffect(() => {
    dataImportantEventType()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [band, idImportantEventType])
  const dataImportantEventType = async () => {
    const params = { search, limit: 1500 }
    const data = await getImportantEventType(params)
    setImportantEventType(data)
  }

  useEffect(() => {
    dataImportantEvent()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, deleted, idImportantEventType, band])
  const dataImportantEvent = async () => {
    const params = { search, deleted, idImportantEventType }
    const data = await getImportantEvent(params)
    setImportantEvent(data)
  }

  const tabSelect = () => {
    let title1, title2
    let data1 = [],
      data2 = []
    switch (parseInt(keyBtn)) {
      case 1: {
        title1 = 'Tipos de eventos'
        title2 = 'Eventos'
        data1 = eventType
        data2 = dailyEvent
        break
      }
      case 2: {
        title1 = 'Tipos de celebraciones'
        title2 = 'Celebraciones'
        data1 = importantEventType
        data2 = importantEvent
        break
      }
      default: {
        break
      }
    }

    return (
      <div>
        <FiltersSchedules
          setSearch={setSearch}
          deleted={deleted}
          setDeleted={setDeleted}
          newsRoute='news'
          data={title2 === 'Eventos' ? eventType.allEvent : importantEventType.allEventType}
          setIdEventType={setIdEventType}
          setIdImportantEventType={setIdImportantEventType}
          setLimit={setLimit}
          typeBand={title2}
        />
        <ItemsCollapse
          title1={title1}
          title2={title2}
          data1={data1}
          data2={data2}
          userToken={userToken}
          band={band}
          setBand={setBand}
          pageSelected={pageSelected}
          setPageSelected={setPageSelected}
        />
      </div>
    )
  }
  const items = [
    {
      key: '1',
      label: `Eventos diarios`,
      children: tabSelect(),
    },
    {
      key: '2',
      label: `Eventos importantes`,
      children: tabSelect(),
    },
  ]
  const onChange = (key) => {
    setKeyBtn(key)
  }

  return (
    <Container fluid>
      <Row>
        <Col className='mt-3'>
          <div className='pt-4 pb-1 px-4'>
            <h3>Horarios</h3>
          </div>
        </Col>
      </Row>
      <Row className=''>
        <Col>
          <div className='pt-3 container-event menuContainer'>
            <div>
              <Tabs defaultActiveKey='1' items={items} onChange={onChange}/>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default MenuSchedules
