import React, { useState, useEffect } from 'react'
import { List, Skeleton, Spin } from 'antd'
import {
  EditOutlined,
  DeleteOutlined,
  RollbackOutlined,
} from '@ant-design/icons'
import { Button } from 'react-bootstrap'
import { api } from '../../../utils/api'
import '../menus.css'
import Unauthorized from '../../Unauthorized'

const ListItemNavbar = ({
  nameClass,
  data,
  userToken,
  routeAPI,
  band,
  setBand,
  resetValuesEdit
}) => {
  const [initLoading, setInitLoading] = useState(true)
  const [loading, setLoading] = useState(false)
  const [modalUnauthorized, setModalUnauthorized] = useState(false)

  const convertRoute = routeAPI[0].toUpperCase() + routeAPI.slice(1)
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
    } catch (error) {}
  }
  useEffect(() => {
    setInitLoading(false)
  }, [])

  return (
    <div className={`menuSchedules py-0 my-0 ${nameClass}`}>
      <List
        className='demo-loadmore-list'
        loading={initLoading}
        itemLayout='horizontal'
        dataSource={data}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button
                variant='outline'
                title='Editar'
                key='list-loadmore-edit'
                onClick={() => resetValuesEdit(item, 'itemNav')}
              >
                <EditOutlined className='styleIcons' />
              </Button>,
              <Button
                variant='outline-light'
                key='list-loadmore-more'
                title={item?.visible ? 'Ocultar' : 'Mostrar'}
                onClick={() => handleDelete(item.visible, item._id)}
              >
                {item?.visible === true ? (
                  <DeleteOutlined className='styleIcons c-red' />
                ) : (
                  <RollbackOutlined className='styleIcons c-green' />
                )}
              </Button>,
            ]}
          >
            <Skeleton avatar title={false} loading={item.loading} active>
              <List.Item.Meta
                title={
                  <div>
                    <p className='mb-0'>{item?.title}</p>
                  </div>
                }
              />
            </Skeleton>
          </List.Item>
        )}
      />

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

export default ListItemNavbar
