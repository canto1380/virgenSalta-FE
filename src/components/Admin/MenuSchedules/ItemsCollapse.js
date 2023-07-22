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
          extra={<HeaderPanel visible={visible} setVisible={setVisible} />}
        >
          <ListSchedules
            data={data1.allEvent}
            userToken={userToken}
            routeAPI='eventType'
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
          />

        </Panel>
        <Panel
          header={title2}
          className='subTab'
          key='2'
          extra={<HeaderPanel visible={visible} setVisible={setVisible} />}
        >
          <ListSchedules
            nameClass={'aa'}
            data={data2.allDailyEvent}
            userToken={userToken}
            routeAPI='dailyEvent'
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
          />
        </Panel>
      </Collapse>
    </div>
  )
}

export default ItemsCollapse
