import React, { useState, useEffect } from 'react'
import { List, Skeleton, Spin } from 'antd'
import {
  EditOutlined,
  DeleteOutlined,
  RollbackOutlined,
} from '@ant-design/icons'
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5'
import { Button } from 'react-bootstrap'
import { api } from '../../utils/api'
import './menus.css'
import Unauthorized from '../Unauthorized'
import Spinn from '../Spinn/Spinn'

const ListElements = ({
  data,
  userToken,
  band,
  setBand,
  resetValuesEdit,
  routeAPI,
  btnVisible,
}) => {
  const [initLoading, setInitLoading] = useState(true)
  const [loading, setLoading] = useState(false)
  const [modalUnauthorized, setModalUnauthorized] = useState(false)

  const convertRoute = routeAPI[0].toUpperCase() + routeAPI.slice(1)

  const handleVisibility = async (id, visibleData) => {
    try {
      const visible = { visible: !visibleData }
      const res = await api(
        'PATCH',
        `${routeAPI}/updateVisibility/${id}`,
        visible,
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
    } catch (error) {}
  }
  const handleDelete = async (deleted, id) => {
    try {
      if (deleted) {
        const res = await api(
          'PATCH',
          `${routeAPI}/restore${convertRoute}/${id}`,
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
          `${routeAPI}/delete${convertRoute}/${id}`,
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
    } catch (error) {
      
    }
  }

  useEffect(() => {
    setInitLoading(false)
  }, [])
  return (
    <div className='menuContainer mt-0'>
      {!data || data === null ? (
        <div className='d-flex justify-content-center'>
          <Spinn type='data' />
        </div>
      ) : (
        <List
          className='demo-loadmore-list'
          loading={initLoading}
          itemLayout='horizontal'
          dataSource={data}
          renderItem={(item) => (
            <List.Item
              actions={[
                btnVisible && (
                  <Button
                    variant='outline'
                    title={item?.visible ? 'Ocultar' : 'Mostrar'}
                    key='list-loadmore-edit'
                    onClick={() => handleVisibility(item._id, item.visible)}
                  >
                    {item?.visible === true ? (
                      <IoEyeOutline className='styleIcons c-red' />
                    ) : (
                      <IoEyeOffOutline className='styleIcons c-green' />
                    )}
                  </Button>
                ),

                <Button
                  variant='outline'
                  title='Editar'
                  key='list-loadmore-edit'
                  onClick={() => resetValuesEdit(item)}
                >
                  <EditOutlined className='styleIcons' />
                </Button>,
                <Button
                  variant='outline-light'
                  key='list-loadmore-more'
                  title={item?.deleted ? 'Restaurar' : 'Eliminar'}
                  onClick={() => handleDelete(item.deleted, item._id)}
                >
                  {item?.deleted === true ? (
                    <RollbackOutlined className='styleIcons c-green' />
                  ) : (
                    <DeleteOutlined className='styleIcons c-red' />
                  )}
                </Button>,
              ]}
            >
              <Skeleton avatar title={false} loading={item.loading} active>
                <List.Item.Meta
                  title={
                    <p className='mb-0'>
                      {item?.nameCategory} {item?.title} {item?.eventName}{' '}
                      {item?.nameItem}
                    </p>
                  }
                />
              </Skeleton>
            </List.Item>
          )}
        />
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
    </div>
  )
}

export default ListElements
