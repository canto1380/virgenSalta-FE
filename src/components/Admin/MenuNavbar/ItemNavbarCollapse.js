import React, { useEffect, useState } from 'react'
import { Collapse, Spin } from 'antd'
import './menuNavbar.css'
import ListItemNavbar from './ListItemNavbar.js'
import Spinn from '../../Spinn/Spinn.js'
import HeaderItemNavPanel from './HeaderItemNavPanel.js'
import { api } from '../../../utils/api.js'
import MsgError from '../../Messages/MsgError.js'

const { Panel } = Collapse

const ItemsNavbarCollapse = ({
  data1,
  data2,
  userToken,
  band,
  setBand,
  resetValuesEdit,
  formEdit,
  setFormEdit,
  setRouteAPI,
}) => {
  const [visible, setVisible] = useState(false)
  const [dataRegisterEdit, setDataRegisterEdit] = useState(null)
  const [dataItems, setDataItems] = useState(data2)
  const [loading, setLoading] = useState(false)
  const [dataError, setDataError] = useState(false)
  const [messageError, setMessageError] = useState('')
  const [serverError, setServerError] = useState(false)

  const resetDataEdit = (item, routeApi) => {
    setFormEdit(!formEdit)
    setDataRegisterEdit(item)
    setRouteAPI(routeApi)
  }

  useEffect(() => {
    setDataItems(data2)
  }, [data2])

  const handleDragStart = (event, index) => {
    event.dataTransfer.setData('text/plain', index)
  }
  const handleDragOver = (event) => {
    event.preventDefault()
  }

  const handleDrop = (event, index) => {
    const draggedIndex = event.dataTransfer.getData('text/plain')
    const draggedElement = data2[draggedIndex]

    const newList = data2.filter((_, i) => i !== parseInt(draggedIndex))
    newList.splice(index, 0, draggedElement)
    setDataItems(newList)
    updateOrderNumber(newList)
  }
  const updateOrderNumber = async (data) => {
    try {
      data.forEach(async (d, i) => {
        const values = { id: d._id, orderNumber: i + 1 }
        const res = await api(
          'PATCH',
          `itemNavCategory/updateOrderNumber`,
          values,
          userToken
        )
        if (res.status === 200) {
          setLoading(true)
          setTimeout(() => {
            setLoading(false)
            setBand(!band)
          }, 2500)
        }
        if (res?.response?.status === 400) {
          const arraysError = res?.response?.data?.errors
          setMessageError(arraysError)
          setDataError(true)
          setTimeout(() => {
            setDataError(false)
          }, 3000)
        }
      })
    } catch (error) {
      setServerError(true)
      setTimeout(() => {
        setServerError(false)
      }, 3000)
    }
  }
  return (
    <div>
      {!data1 || !data2 ? (
        <div className='d-flex justify-content-center'>
          <Spinn type='data' />
        </div>
      ) : (
        <Collapse defaultActiveKey={['0']}>
          {dataItems.length > 0 ? (
            dataItems.map((d, i) => (
              <Panel
                header={d.itemNavCategory}
                className='subTab'
                key={d._id}
                onDragStart={(event) => handleDragStart(event, i)}
                onDragOver={handleDragOver}
                onDrop={(event) => handleDrop(event, i)}
                extra={
                  <HeaderItemNavPanel
                    visible={visible}
                    setVisible={setVisible}
                    item={d}
                    routeAPI={'itemNavCategory'}
                    userToken={userToken}
                    band={band}
                    setBand={setBand}
                    resetValuesEdit={resetValuesEdit}
                  />
                }
              >
                <ListItemNavbar
                  nameClass={'menuNavItem'}
                  data={data1.filter(
                    (d1) =>
                      d1?.idItemNavCategory?.itemNavCategory ===
                      d?.itemNavCategory
                  )}
                  userToken={userToken}
                  routeAPI={'itemNav'}
                  band={band}
                  setBand={setBand}
                  visible={visible}
                  setVisible={setVisible}
                  dataRegisterEdit={dataRegisterEdit}
                  setDataRegisterEdit={setDataRegisterEdit}
                  resetValuesEdit={resetValuesEdit}
                />
              </Panel>
            ))
          ) : (
            <Panel
              header={data2.itemNavCategory}
              className='subTab'
              key={data2._id}
              extra={
                <HeaderItemNavPanel visible={visible} setVisible={setVisible} />
              }
            >
              <ListItemNavbar
                nameClass={'menuNavItem'}
                data={data1.filter(
                  (d1) =>
                    d1?.idItemNavCategory?.itemNavCategory ===
                    data2?.itemNavCategory
                )}
                userToken={userToken}
                routeAPI={'itemNav'}
                band={band}
                setBand={setBand}
                visible={visible}
                setVisible={setVisible}
                dataRegisterEdit={dataRegisterEdit}
                setDataRegisterEdit={setDataRegisterEdit}
                resetDataEdit={resetDataEdit}
                resetValuesEdit={resetValuesEdit}
              />
            </Panel>
          )}
        </Collapse>
      )}
      {loading && (
        <div className='loadingSpin'>
          <Spin />
        </div>
      )}
      {dataError
        ? messageError.map((e, i) => <MsgError key={i} text2={e.msg} />)
        : null}
      {serverError ? <MsgError text2='Server internal Error' /> : null}
    </div>
  )
}

export default ItemsNavbarCollapse
