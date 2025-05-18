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
import ModalGeneric from '../../Modal'
import moment from 'moment/moment'

const ListSchedules = ({
  data,
  userToken,
  band,
  setBand,
  routeAPI,
  keyType,
  visible,
  setVisible,
  dataRegisterEdit,
  setDataRegisterEdit,
  resetDataEdit,
  nameClass,
  title,
  scheduleType,
  data1,
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
                onClick={() =>
                  resetDataEdit(
                    item,
                    item.idEventType
                      ? 'Eventos'
                      : item.idImportantEventType
                      ? 'Celebraciones'
                      : item.eventName
                      ? 'Tipos de eventos'
                      : 'Tipos de celebraciones'
                  )
                }
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
                  <div>
                    {keyType ? (
                      <p className='mb-0'>
                        {item?.eventName} {item?.name}
                      </p>
                    ) : (
                      <p className='mb-0'>
                        {title === 'Eventos' ? (
                          <span>
                            {item?.eventName} {item?.text} | {item?.day} -{' '}
                            {item?.time}hs | {item?.idEventType?.eventName}{' '}
                          </span>
                        ) : (
                          <span>
                            {item?.eventName} - {item?.description} |{' '}
                            {item?.time}hs -{' '}
                            {moment(item?.date).format('DD/MM/YYYY')}
                          </span>
                        )}
                      </p>
                    )}
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
      <ModalGeneric
        visible={visible}
        setVisible={setVisible}
        dataRegisterEdit={dataRegisterEdit}
        setDataRegisterEdit={setDataRegisterEdit}
        resetDataEdit={resetDataEdit}
        userToken={userToken}
        band={band}
        setBand={setBand}
        scheduleType={scheduleType}
        data1={data1}
      />
    </div>
  )
}

export default ListSchedules
