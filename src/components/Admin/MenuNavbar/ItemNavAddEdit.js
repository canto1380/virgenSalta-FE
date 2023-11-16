import { Form, Input, Switch, Button, Spin, Select } from 'antd'
import React, { useState } from 'react'
import MsgError from '../../Messages/MsgError'
import { api } from '../../../utils/api'

const ItemNavAddEdit = ({
  dataRegisterItemEdit,
  routeAPI,
  userToken,
  bandItem,
  setBandItem,
  data,
}) => {
  const [loading, setLoading] = useState(false)
  const [dataError, setDataError] = useState(false)
  const [messageError, setMessageError] = useState('')
  const [serverError, setServerError] = useState(false)
  const [switchWindow, setSwitchWindow] = useState(undefined)
  const [switchDeleted, setSwitchDeleted] = useState(undefined)

  const handleSwitchWindow = (e) => {
    setSwitchWindow(e)
  }
  const handleSwitchDeleted = (e) => {
    setSwitchDeleted(e)
  }

  const handleSubmit = async (values) => {
    try {
      values.deleted = !switchDeleted
      values.openWindows = !switchWindow
      if (!dataRegisterItemEdit) {
        handleCreate(values)
      } else {
        handleUpdated(values)
      }
    } catch (error) {
      setServerError(error)
    }
  }
  const handleCreate = async (values) => {
    console.log(values)
    // const res = await api('POST', routeAPI, values, userToken)
    // if (res.status === 200) {
    //   setLoading(true)
    //   setTimeout(() => {
    //     setLoading(false)
    //     setBandItem(!bandItem)
    //     window.location.href = '/admin/home/menu-principal'
    //   }, 2500)
    // }
    // if (res?.response?.status === 400) {
    //   const arraysError = res?.response?.data?.errors
    //   setMessageError(arraysError)
    //   setDataError(true)
    //   setTimeout(() => {
    //     setDataError(false)
    //   }, 3000)
    // }
  }

  const handleUpdated = async (values) => {
    console.log(values)
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
          itemNavCategory: dataRegisterItemEdit?.itemNavCategory,
          deleted: !dataRegisterItemEdit?.deleted,
        }}
      >
        <Form.Item
          label='Nombre Sección'
          name='title'
          rules={[{ required: true, message: 'Debe ingresar un nombre' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label='Redirección'
          name='url'
          rules={[{ required: true, message: 'Debe ingresar un nombre' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label='Categoría'
          name='idNewsCategory'
          rules={[
            { required: true, message: 'Debe seleccionar una categoría' },
          ]}
        >
          <Select>
            {data.map((d) => (
              <Select.Option key={d?._id} value={d?._id}>
                {d?.itemNavCategory}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label='Abrir en una ventana nueva'
          valuePropName='checked'
          name='openWindows'
        >
          <Switch onChange={handleSwitchWindow} />
        </Form.Item>
        <Form.Item label='Visible' valuePropName='checked' name='deleted'>
          <Switch onChange={handleSwitchDeleted} />
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
                {dataRegisterItemEdit ? 'Actualizando' : 'Agregando'}
              </span>
            </Button>
          ) : (
            <Button type='primary' htmlType='submit'>
              {dataRegisterItemEdit ? 'Actualizar' : 'Agregar'}
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

export default ItemNavAddEdit
