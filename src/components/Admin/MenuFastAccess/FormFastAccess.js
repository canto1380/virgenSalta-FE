import { Form, Select, Input, Button, Spin } from 'antd'
import React, { useState } from 'react'
import MsgError from '../../Messages/MsgError'
import { api } from '../../../utils/api'

const FormFastAccess = ({
  userToken,
  loading,
  setLoading,
  dataCategories,
  dataSpecialDay,
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
    const replaceTitle = values.pathUrl.replace(/ /g, '-')
    values.url = replaceTitle
    const res = await api('POST', routeAPI, values, userToken)
    if (res.status === 200) {
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
        window.location.href = '/admin/home/acceso-rápido'
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
    const replaceTitle = values.pathUrl.replace(/ /g, '-')
    values.url = replaceTitle
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
        window.location.href = '/admin/home/acceso-rápido'
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

  let options = []
  dataCategories?.forEach((d) => {
    const replaceTitle = d.nameCategory.replace(/ /g, '-')
    const option = {
      value: `categorias/${d.nameCategory}`,
      label: d.nameCategory,
      // pathUrl: `categorias/${replaceTitle}`,
    }
    options.push(option)
  })
  dataSpecialDay?.forEach((d) => {
    const replaceTitle = d.title.replace(/ /g, '-')
    const option = {
      value: `jornadas/${d.title}`,
      label: d.title,
      pathUrl: `jornadas/${replaceTitle}`,
    }
    options.push(option)
  })

  return (
    <div className='menuContainer'>
      <Form
        labelCol={{ span: 22 }}
        wrapperCol={{ span: 22 }}
        initialValues={{
          title: dataRegisterEdit?.title,
          pathUrl: dataRegisterEdit?.pathUrl,
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
          label='Elija una categoriía a la cual redirigir'
          name='pathUrl'
          rules={[
            {
              required: true,
              message: 'Debe seleccionar una categoráa a la cual redireccionar',
            },
          ]}
        >
          <Select
            showSearch
            style={{
              width: '100%',
            }}
            placeholder='Busque o seleccione'
            optionFilterProp='children'
            filterOption={(input, option) =>
              (option?.label ?? '').includes(input)
            }
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? '')
                .toLowerCase()
                .localeCompare((optionB?.label ?? '').toLowerCase())
            }
            options={options}
          />
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

export default FormFastAccess
