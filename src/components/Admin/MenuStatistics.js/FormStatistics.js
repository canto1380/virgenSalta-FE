import { Form, Input, Button, Spin } from 'antd'
import React, { useState } from 'react'
import MsgError from '../../Messages/MsgError'
import { api } from '../../../utils/api'

const FormStatistics = ({
  userToken,
  loading,
  setLoading,
  dataRegisterEdit,
  routeAPI,
}) => {
  const [dataError, setDataError] = useState(false)
  const [messageError, setMessageError] = useState('')
  const [serverError, setServerError] = useState(false)

  const handleSubmit = async (values) => {
    try {
      if (!dataRegisterEdit) {
        handleCreate(values)
      } else {
        handleUpdated(values)
      }
    } catch (error) {
      setServerError(error)
    }
  }

  const handleCreate = async (values) => {
    const res = await api('POST', routeAPI, values, userToken)
    if (res.status === 200) {
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
        window.location.href = '/admin/home/estadisticas'
      }, 2500)
    }
    if (res?.response?.status === 400) {
      const arraysError = res?.response?.data?.error
      setMessageError(arraysError)
      setDataError(true)
      setTimeout(() => {
        setDataError(false)
      }, 3000)
    }
  }
  const handleUpdated = async (values) => {
    const res = await api(
      'PATCH',
      `${routeAPI}/${dataRegisterEdit._id}`,
      values,
      userToken
    )
    if (res.status === 200) {
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
        window.location.href = '/admin/home/estadisticas'
      }, 2500)
    }
    if (res?.response?.status === 400) {
      const arraysError = res?.response?.data?.error
      setMessageError(arraysError)
      setDataError(true)
      setTimeout(() => {
        setDataError(false)
      }, 3000)
    }
  }
  const onFinishFailed = (errorInfo) => {
    console.log('Failed: ', errorInfo)
  }

  return (
    <div className='menuContainer'>
      <Form
        labelCol={{ span: 22 }}
        wrapperCol={{ span: 22 }}
        initialValues={{
          title: dataRegisterEdit?.title,
          description: dataRegisterEdit?.description,
        }}
        onFinish={handleSubmit}
        onFinishFailed={onFinishFailed}
        autoComplete='off'
        layout='vertical'
        style={{ marginLeft: '2vh' }}
      >
        <Form.Item
          label='Título'
          name='title'
          rules={[{ required: true, message: 'Debe ingresar un título' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label='Descripción'
          name='description'
          rules={[{ required: true, message: 'Debe ingresar una descripción' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className='text-end'
          labelCol={{ span: 1 }}
          wrapperCol={{ span: 22 }}
        >
          {loading ? (
            <Button disabled type='primary' htmlType='submit'>
              <Spin
                as='span'
                animation='border'
                size='sm'
                role='status'
                aria-hidden='true'
              />
              <span className='ms-2'>
                {dataRegisterEdit ? 'Actualizando' : 'Agregando'}
              </span>
            </Button>
          ) : (
            <Button type='primary' htmlType='submit'>
              {dataRegisterEdit ? 'Actualizar' : 'Agregar'}
            </Button>
          )}
        </Form.Item>
        {dataError ? <MsgError text2={messageError} /> : null}
        {serverError ? <MsgError text2='Server internal Error' /> : null}
      </Form>
    </div>
  )
}

export default FormStatistics
