import React, { useState } from 'react'
import { Button, Form, Input, Select, Spin } from 'antd'
import { api } from '../../../../utils/api'
import MsgError from '../../../Messages/MsgError'
import App from '../../../../ckeditor5/Ckeditor'

const MsgVirgenAddEdit = ({
  dataRegisterEdit,
  loading,
  setLoading,
  userToken,
}) => {
  const [message, setMessage] = useState()

  const [dataError, setDataError] = useState(false)
  const [messageError, setMessageError] = useState('')
  const [serverError, setServerError] = useState(false)

  const data = [
    {
      value: 1,
      label: 1990,
    },
    {
      value: 2,
      label: 1991,
    },
    {
      value: 3,
      label: 1992,
    },
    {
      value: 4,
      label: 1993,
    },
    {
      value: 5,
      label: 1994,
    },
    {
      value: 6,
      label: 1995,
    },
    {
      value: 7,
      label: 1996,
    },
    {
      value: 8,
      label: 1997,
    },
    {
      value: 9,
      label: 1998,
    },
    {
      value: 10,
      label: 1999,
    },
    {
      value: 11,
      label: 2000,
    },
    {
      value: 12,
      label: 2001,
    },
    {
      value: 13,
      label: 2002,
    },
    {
      value: 14,
      label: 2003,
    },
    {
      value: 15,
      label: 2004,
    },
    {
      value: 16,
      label: 2005,
    },
    {
      value: 17,
      label: 2006,
    },
    {
      value: 18,
      label: 2007,
    },
    {
      value: 19,
      label: 2008,
    },
    {
      value: 20,
      label: 2009,
    },
    {
      value: 21,
      label: 2010,
    },
    {
      value: 22,
      label: 2011,
    },
    {
      value: 23,
      label: 2012,
    },
    {
      value: 24,
      label: 2013,
    },
    {
      value: 25,
      label: 2014,
    },
    {
      value: 26,
      label: 2015,
    },
    {
      value: 27,
      label: 2016,
    },
    {
      value: 28,
      label: 2017,
    },
    {
      value: 29,
      label: 2018,
    },
    {
      value: 30,
      label: 2019,
    },
    {
      value: 31,
      label: 2020,
    },
    {
      value: 32,
      label: 2021,
    },
    {
      value: 33,
      label: 2022,
    },
    {
      value: 34,
      label: 2023,
    },
    {
      value: 35,
      label: 2024,
    },
  ]

  const handleSubmit = async (values) => {
    if (!dataRegisterEdit) {
      handleCrear(values)
    } else {
      handleEditar(values)
    }
  }

  const handleCrear = async (values) => {
    try {
      values.message = message
      console.log(values)
      const res = await api('POST', 'messageVirgen', values, userToken)
      if (res.status === 200) {
        setLoading(true)
        setTimeout(() => {
          setLoading(false)
          window.location.href = '/admin/home/mensajesDeLaVirgen'
        }, 2500)
      }
      if (res?.response?.status === 400) {
        setLoading(true)
        const arraysError = res?.response?.data?.errors
        setMessageError(arraysError)
        setDataError(true)
        setTimeout(() => {
          setDataError(false)
          setLoading(false)
        }, 3000)
      }
    } catch (error) {
      setServerError(error)
      setTimeout(() => {
        setServerError(undefined)
      }, 3000)
    }
  }
  const handleEditar = async (values) => {
    try {
      values.message =
        message === undefined ? dataRegisterEdit?.message : message
      const res = await api(
        'PATCH',
        `messageVirgen/${dataRegisterEdit._id}`,
        values,
        userToken
      )

      if (res.status === 200) {
        setLoading(true)
        setTimeout(() => {
          setLoading(false)
          window.location.href = '/admin/home/mensajesDeLaVirgen'
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
    } catch (error) {
      setServerError(error)
      setTimeout(() => {
        setServerError(undefined)
      }, 3000)
    }
  }
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <div className='menuContainer'>
      <Form
        labelCol={{
          span: 22,
        }}
        wrapperCol={{
          span: 22,
        }}
        layout='vertical'
        style={{
          marginLeft: '2vh',
        }}
        onFinish={handleSubmit}
        onFinishFailed={onFinishFailed}
        initialValues={{
          year: dataRegisterEdit?.year,
          title: dataRegisterEdit?.title,
          message: dataRegisterEdit?.message,
        }}
      >
        <Form.Item
          label='Año'
          name='year'
          rules={[{ required: true, message: 'Debe seleccionar un año' }]}
        >
          <Select>
            {data.map((d) => (
              <Select.Option key={d?.value} value={d?.value}>
                {d?.label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label='Título'
          name='title'
          rules={[{ required: true, message: 'Debe ingresar un título' }]}
        >
          <Input />
        </Form.Item>

        <div>
          <p>
            <span className='text-danger fw-bolder'>*</span>Mensaje
          </p>
        </div>

        <App
          setDescription={setMessage}
          data={dataRegisterEdit ? dataRegisterEdit.message : ''}
        />

        <Form.Item
          className='text-end mt-4'
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
        {dataError
          ? messageError.map((e, i) => <MsgError key={i} text2={e.msg} />)
          : null}
        {serverError ? <MsgError text2='Server internal Error' /> : null}
      </Form>
    </div>
  )
}

export default MsgVirgenAddEdit
