import React, { useState } from 'react'
import { Collapse } from 'antd'
import './menuSchedules.css'
import ListSchedules from './ListSchedules'
import HeaderPanel from './HeaderPanel'

const { Panel } = Collapse

const ItemsCollapse = ({
  title1,
  title2,
  data1,
  data2,
  userToken,
  band,
  setBand,
  pageSelected,
  setPageSelected
}) => {
  const [visible, setVisible] = useState(false)
  const [dataRegisterEdit, setDataRegisterEdit] = useState(null)
  const [scheduleType, setScheduleType] = useState('Tipos de eventos')
  const resetDataEdit = (item) => {
    setVisible(!visible)
    setDataRegisterEdit(item)
  }
  return (
    <div>
      <Collapse defaultActiveKey={['1']}>
        <Panel
          header={title1}
          className='subTab'
          key='1'
          extra={<HeaderPanel visible={visible} setVisible={setVisible} setScheduleType={setScheduleType} title={title1}/>}
        >
          <ListSchedules
            nameClass={'menuSchedules2'}
            data={data1.allEvent || data1.allEventType}
            userToken={userToken}
            routeAPI={title1 === 'Tipos de eventos' ? 'eventType' : 'importantEventType' }
            keyType={true}
            band={band}
            setBand={setBand}
            visible={visible}
            setVisible={setVisible}
            dataRegisterEdit={dataRegisterEdit}
            setDataRegisterEdit={setDataRegisterEdit}
            resetDataEdit={resetDataEdit}
            pageSelected={pageSelected}
            setPageSelected={setPageSelected}
            title={title1}
            scheduleType={scheduleType}
          />

        </Panel>
        <Panel
          header={title2}
          className='subTab'
          key='2'
          extra={<HeaderPanel visible={visible} setVisible={setVisible} setScheduleType={setScheduleType} title={title2}/>}
        >
          <ListSchedules
            nameClass={'menuSchedules2'}
            data1={data1.allEvent || data1.allEventType}
            data={data2.allDailyEvent || data2.allEvent}
            userToken={userToken}
            routeAPI={title2 === 'Eventos' ? 'dailyEvent' : 'importantEvent' }
            keyType={false}
            band={band}
            setBand={setBand}
            visible={visible}
            setVisible={setVisible}
            dataRegisterEdit={dataRegisterEdit}
            setDataRegisterEdit={setDataRegisterEdit}
            resetDataEdit={resetDataEdit}
            dataPag={data2}
            pageSelected={pageSelected}
            setPageSelected={setPageSelected}
            title={title2}
            scheduleType={scheduleType}
          />
        </Panel>
      </Collapse>
    </div>
  )
}

export default ItemsCollapse
