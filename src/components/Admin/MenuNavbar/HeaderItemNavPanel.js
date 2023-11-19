import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import {
  EditOutlined,
  DeleteOutlined,
  RollbackOutlined,
} from '@ant-design/icons'
import { api } from '../../../utils/api'
import '../menus.css'
import { Spin } from 'antd'
import Unauthorized from '../../Unauthorized'

const HeaderItemNavPanel = ({
  item,
  routeAPI,
  userToken,
  band,
  setBand,
  resetValuesEdit,
}) => {
  const [modalUnauthorized, setModalUnauthorized] = useState(false)
  const [loading, setLoading] = useState(false)
  const handleDelete = async (visible, id) => {
    try {
      if (visible) {
        const res = await api(
          'PATCH',
          `${routeAPI}/restore${routeAPI}/${id}`,
          null,
          userToken
        )
        if (res.status === 200) {
          setLoading(true)
          setTimeout(() => {
            setLoading(false)
            setBand(!band)
          }, 2500)
        }
        if (res.response.status === 401) {
          setModalUnauthorized(true)
        }
      } else {
        const res = await api(
          'PATCH',
          `${routeAPI}/delete${routeAPI}/${id}`,
          null,
          userToken
        )
        if (res.status === 200) {
          setLoading(true)
          setTimeout(() => {
            setLoading(false)
            setBand(!band)
          }, 2500)
        }
        if (res.response.status === 401) {
          setModalUnauthorized(true)
        }
      }
    } catch (error) {}
  }

  return (
    <div className=''>
      <Button
        variant='outline'
        title='Editar'
        key='list-loadmore-edit'
        className='btnMenuItem'
        onClick={() => resetValuesEdit(item, 'itemNavCategory')}
      >
        <EditOutlined className='styleIcons' />
      </Button>
      <Button
        variant='outline-light'
        className='btnMenuItem'
        key='list-loadmore-more'
        title={item?.visible ? 'Ocultar' : 'Mostrar'}
        onClick={() => handleDelete(item.visible, item._id)}
      >
        {item?.visible === true ? (
          <DeleteOutlined className='styleIcons c-red' />
        ) : (
          <RollbackOutlined className='styleIcons c-green' />
        )}
      </Button>

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
    </div>
  )
}

export default HeaderItemNavPanel
