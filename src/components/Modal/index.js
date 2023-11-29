import React, { useState } from 'react'
import { Modal, Button, Form, Input, Select, DatePicker } from 'antd'
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

  const [dataEnd, setDataEnd] = useState(null)

  let routeAPI = ''

  const changeData = (e) => {
    if (e !== null) {
      setDataEnd(e.$d)
    } else {
      setDataEnd(null)
    }
  }

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
    values.date = dataEnd
    try {
      if (!dataRegisterEdit) {
        const res = await api('POST', routeAPI, values, userToken)
        if (res.status === 200) {
          setLoading(true)
          setTimeout(() => {
            setLoading(false)
            setBand(!band)
            setVisible(false)
            window.location.href = '/admin/home/horarios'
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
          `${routeAPI}/${dataRegisterEdit._id}`,
          values,
          userToken
        )
        if (res.status === 200) {
          setLoading(true)
          setTimeout(() => {
            setLoading(false)
            setVisible(false)
            setBand(!band)
            window.location.href = '/admin/home/horarios'
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
            initialValues={{
              day: dataRegisterEdit?.day,
              time: dataRegisterEdit?.time,
              text: dataRegisterEdit?.text,
              additionalText: dataRegisterEdit?.additionalText,
              idEventType: dataRegisterEdit?.idEventType?._id,
            }}
            onFinish={handleOk}
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
              rules={[
                { required: true, message: 'Debe ingresar una hora' },
                {
                  pattern: /(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/,
                  message: 'Ingrese una hora válida',
                },
              ]}
            >
              <Input placeholder='00:00' />
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
                      {d.eventName}
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
      case 'Tipos de celebraciones': {
        routeAPI = 'importantEventType'
        return (
          <Form
            labelCol={{ span: 22 }}
            wrapperCol={{ span: 22 }}
            initialValues={{
              name: dataRegisterEdit?.name,
            }}
            onFinish={handleOk}
            autoComplete='off'
            layout='vertical'
          >
            <Form.Item
              label='Nombre'
              name='name'
              style={{
                marginBottom: '10px',
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
      case 'Celebraciones': {
        routeAPI = 'importantEvent'
        return (
          <Form
            labelCol={{ span: 22 }}
            wrapperCol={{ span: 22 }}
            initialValues={{
              eventName: dataRegisterEdit?.eventName,
              time: dataRegisterEdit?.time,
              // date: dataRegisterEdit?.date,
              description: dataRegisterEdit?.description,
              idImportantEventType: dataRegisterEdit?.idImportantEventType?._id,
            }}
            onFinish={handleOk}
            autoComplete='off'
            layout='vertical'
          >
            <Form.Item
              label='Nombre'
              name='eventName'
              style={{
                marginBottom: '10px',
              }}
              rules={[{ required: true, message: 'Debe ingresar una hora' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label='Tipo de Celebración'
              name='idImportantEventType'
              style={{}}
              rules={[
                {
                  required: true,
                  message: 'Debe ingresar un tipo de celebración',
                },
              ]}
            >
              <Select>
                {data1 !== undefined &&
                  data1?.map((d) => (
                    <Select.Option key={d?._id} value={d?._id}>
                      {d.name}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>
            <Form.Item
              label='Fecha'
              name='date'
              style={{
                marginBottom: '10px',
              }}
              rules={[{ required: true, message: 'Debe ingresar una hora' }]}
            >
              <DatePicker
                // defaultValue={'05/05/2023'}
                placeholder='Selecciones una fecha'
                format={'DD/MM/YYYY'}
                onChange={changeData}
                style={{
                  width: '100%',
                }}
              />
              {/* <input
                onChange={changeData}
                type='date'
                id='start'
                name='date'
                value={fechaActuala}
              /> */}
            </Form.Item>
            <Form.Item
              label='Descripción'
              name='description'
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
              label='Hora'
              name='time'
              style={{
                marginBottom: '10px',
              }}
              rules={[
                {
                  required: true,
                  message: 'Debe ingresar una hora',
                },
                {
                  pattern: /(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/,
                  message: 'Ingrese una hora válida',
                },
              ]}
            >
              <Input placeholder='00:00' />
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
      {data1 && (
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
        </Modal>
      )}
    </div>
  )
}

export default ModalGeneric
