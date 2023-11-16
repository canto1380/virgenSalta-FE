import React, { useState } from 'react'
import { Modal, Button, Form, Input, Select } from 'antd'
import { api } from '../../utils/api'
import MsgError from '../Messages/MsgError'

const ModalGeneric = ({
  setVisible,
  visible,
  dataRegisterEdit,
  resetDataEdit,
  userToken,
  band,
  setBand,
  scheduleType,
  data1,
}) => {
  const [loading, setLoading] = useState(false)
  const [dataError, setDataError] = useState(false)
  const [messageError, setMessageError] = useState('')
  const [serverError, setServerError] = useState(false)
  let routeAPI = ''
  const days = [
    'Domingo',
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
  ]
  const handleOk = async (values) => {
    try {
      if (!dataRegisterEdit) {
        const res = await api('POST', routeAPI, values, userToken)
        if (res.status === 200) {
          setLoading(true)
          setTimeout(() => {
            setLoading(false)
            setBand(!band)
            setVisible(false)
            
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
      } else {
        const res = await api(
          'PATCH',
          `eventType/${dataRegisterEdit._id}`,
          values,
          userToken
        )
        if (res.status === 200) {
          setLoading(true)
          setTimeout(() => {
            setLoading(false)
            setVisible(false)
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
      }
    } catch (error) {
      setServerError(error)
    }
  }
  const handleCancel = () => {
    resetDataEdit(null)
  }
  // console.log(dataRegisterEdit)
  const dataForm = () => {
    let text = ''
    switch (scheduleType) {
      case 'Tipos de eventos': {
        routeAPI = 'eventType'
        return (
          <Form
            labelCol={{ span: 22 }}
            wrapperCol={{ span: 22 }}
            initialValues={{ eventName: dataRegisterEdit?.eventName }}
            onFinish={handleOk}
            // onFinishFailed={onFinishFailed}
            autoComplete='off'
            layout='vertical'
          >
            <Form.Item
              label='Nombre del tipo de evento'
              name='eventName'
              style={{
                marginTop: '30px',
              }}
              rules={[{ required: true, message: 'Debe ingresar un nombre' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              labelCol={{ span: 1 }}
              wrapperCol={{ span: 22 }}
              className='text-end'
            >
              <Button type='primary' className='me-2' onClick={handleCancel}>
                Volver
              </Button>
              <Button htmlType='submit' type='primary' loading={loading}>
                {loading
                  ? dataRegisterEdit
                    ? 'Actualizando'
                    : 'Agregando'
                  : dataRegisterEdit
                  ? 'Actualizar'
                  : 'Agregar'}
              </Button>
            </Form.Item>
            {dataError
              ? messageError.map((e, i) => <MsgError key={i} text2={e.msg} />)
              : null}
            {serverError ? <MsgError text2='Server internal Error' /> : null}
          </Form>
        )
      }
      case 'Eventos': {
        routeAPI = 'dailyEvent'
        return (
          <Form
            labelCol={{ span: 22 }}
            wrapperCol={{ span: 22 }}
            initialValues={{ eventName: dataRegisterEdit?.eventName }}
            onFinish={handleOk}
            // onFinishFailed={onFinishFailed}
            autoComplete='off'
            layout='vertical'
          >
            <Form.Item
              label='Dia'
              name='day'
              style={{
                marginTop: '30px',
                marginBottom: '10px',
              }}
              rules={[{ required: true, message: 'Debe ingresar un dia' }]}
            >
              <Select>
                {days.map((d, i) => (
                  <Select.Option key={i} value={d}>
                    {d}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label='Hora'
              name='time'
              style={{
                marginBottom: '10px',
              }}
              rules={[{ required: true, message: 'Debe ingresar una hora' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label='Descripción'
              name='text'
              style={{
                marginBottom: '10px',
              }}
              rules={[
                { required: true, message: 'Debe ingresar una descripción' },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label='Texto adicional'
              name='additionalText'
              style={{
                marginBottom: '10px',
              }}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label='Tipo de Evento'
              name='idEventType'
              style={{}}
              rules={[
                { required: true, message: 'Debe ingresar un tipo de evento' },
              ]}
            >
              <Select>
                {data1 !== undefined &&
                  data1?.map((d) => (
                    <Select.Option key={d?._id} value={d?._id}>
                      {d.eventName}a
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>
            <Form.Item
              labelCol={{ span: 1 }}
              wrapperCol={{ span: 22 }}
              className='text-end'
            >
              <Button type='primary' className='me-2' onClick={handleCancel}>
                Volver
              </Button>
              <Button htmlType='submit' type='primary' loading={loading}>
                {loading
                  ? dataRegisterEdit
                    ? 'Actualizando'
                    : 'Agregando'
                  : dataRegisterEdit
                  ? 'Actualizar'
                  : 'Agregar'}
              </Button>
            </Form.Item>
            {dataError
              ? messageError.map((e, i) => <MsgError key={i} text2={e.msg} />)
              : null}
            {serverError ? <MsgError text2='Server internal Error' /> : null}
          </Form>
        )
      }
      default: {
        text = 'nada'
        break
      }
    }
    return <p>{text}</p>
  }

  return (
    <div>
      <Modal
        maskClosable={false}
        open={visible}
        title={
          dataRegisterEdit
            ? `Actualizar ${scheduleType}`
            : `Nueva/o ${scheduleType}`
        }
        onOk={handleOk}
        onCancel={handleCancel}
        destroyOnClose
        footer={[null, null]}
      >
        {dataForm()}
        {/* <Form
          labelCol={{ span: 22 }}
          wrapperCol={{ span: 22 }}
          initialValues={{ eventName: dataRegisterEdit?.eventName }}
          onFinish={handleOk}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            label="Nombre de evento"
            name="eventName"
            style={{
              marginTop: '30px',
            }}
            rules={[{ required: true, message: "Debe ingresar un nombre" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            labelCol={{ span: 1 }}
            wrapperCol={{ span: 22 }}
            className="text-end"
          >
            <Button type="primary" className="me-2" onClick={handleCancel}>
              Volver
            </Button>
            <Button htmlType="submit" type="primary" loading={loading}>
              {loading
                ? dataRegisterEdit
                  ? "Actualizando"
                  : "Agregando"
                : dataRegisterEdit
                ? "Actualizar"
                : "Agregar"}
            </Button>
          </Form.Item>
          {dataError
            ? messageError.map((e, i) => <MsgError key={i} text2={e.msg} />)
            : null}
          {serverError ? <MsgError text2="Server internal Error" /> : null}
        </Form> */}
      </Modal>
    </div>
  )
}

export default ModalGeneric
