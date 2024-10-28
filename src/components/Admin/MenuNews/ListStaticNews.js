import React, { useState, useEffect } from 'react'
import { api } from '../../../utils/api'
import Spinn from '../../Spinn/Spinn'
import MsgError from '../../Messages/MsgError'
import Unauthorized from '../../Unauthorized'
import { Spin } from 'antd'

const ListStaticNews = ({ data, userToken, routeAPI, band, setBand }) => {
  const [loading, setLoading] = useState(false)
  const [modalUnauthorized, setModalUnauthorized] = useState(false)
  const [dataItems, setDataItems] = useState(data)
  const [dataError, setDataError] = useState(false)
  const [messageError, setMessageError] = useState('')
  const [serverError, setServerError] = useState(false)

  const handleDragStart = (event, index) => {
    event.dataTransfer.setData('text/plain', index)
  }
  const handleDragOver = (event) => {
    event.preventDefault()
  }
  useEffect(() => {
    setDataItems(data)
  }, [data])

  const handleDrop = (event, index) => {
    const draggedIndex = event.dataTransfer.getData('text/plain')
    const draggedElement = data[draggedIndex]

    const newList = data.filter((_, i) => i !== parseInt(draggedIndex))
    newList.splice(index, 0, draggedElement)
    setDataItems(newList)
    updateOrderNumber(newList)
  }

  const updateOrderNumber = async (data) => {
    try {
      data.forEach(async (d, i) => {
        const values = { id: d._id, order: i + 1 }
        const res = await api(
          'PATCH',
          `${routeAPI}/updateOrderNumber`,
          values,
          userToken
        )
        console.log(res)
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
    <div className='menuContainer mt-0'>
      {!data || data === null ? (
        <div className='d-flex justify-content-center'>
          <Spinn type='data' />
        </div>
      ) : (
        <div>
          {dataItems !== undefined ? (
            <ul className='ps-0'>
              {dataItems.map((d, i) => (
                <li
                  className='list-item d-flex justify-content-between'
                  draggable
                  onDragStart={(event) => handleDragStart(event, i)}
                  onDragOver={handleDragOver}
                  onDrop={(event) => handleDrop(event, i)}
                  key={d._id}
                >
                  <div className='d-flex align-items-center'>
                    <span>
                      <strong>
                        {d.title} {d?.nameCategory}
                      </strong>
                    </span>
                    <span> &nbsp;</span>
                    <span>{d.subtitle}</span>
                  </div>
                  {/* <div>
                    <Button
                      variant='outline'
                      title='Editar'
                      key='list-loadmore-edit'
                      onClick={() => resetValuesEdit(d)}
                    >
                      <EditOutlined className='styleIcons' />
                    </Button>
                    <Button
                      variant='outline-light'
                      key='list-loadmore-more'
                      title={d?.deleted ? 'Restaurar' : 'Eliminar'}
                      onClick={() => handleDelete(d.deleted, d._id)}
                    >
                      {d?.deleted === true ? (
                        <RollbackOutlined className='styleIcons c-green' />
                      ) : (
                        <DeleteOutlined className='styleIcons c-red' />
                      )}
                    </Button>
                  </div> */}
                </li>
              ))}
            </ul>
          ) : (
            <p>vacio</p>
          )}
        </div>
      )}
      {loading && (
        <div className='loadingSpin'>
          <Spin />
        </div>
      )}
      {modalUnauthorized && (
        <div className=''>
          <Unauthorized />
        </div>
      )}
      {dataError
        ? messageError.map((e, i) => <MsgError key={i} text2={e.msg} />)
        : null}
      {serverError ? <MsgError text2='Server internal Error' /> : null}
    </div>
  )
}

export default ListStaticNews
