import { Button, Form, Input } from 'antd'
import React, { useState } from 'react'
import { Col, Spinner } from 'react-bootstrap'
import MsgError from '../Messages/MsgError'
import { validaEmail } from '../../utils/validations/validation'
import { api } from '../../utils/api'

const { TextArea } = Input

const FormPrayerRequest = () => {
  const [loading, setLoading] = useState(false)
  const [errorServer, setErrorServer] = useState(false)
  const [errorValid, setErrorValid] = useState(false)
  const [msgEmailInvalid, setMsgEmailInvalid] = useState(null)

  const handleSubmit = async (values) => {
    try {
      if (validaEmail(values.email)) {
        sendRequest(values)
      } else {
        setErrorValid(true)
        setTimeout(() => {
          setErrorValid(false)
        }, 3000)
      }
    } catch (error) {
      setErrorServer(true)
      setTimeout(() => {
        setErrorServer(false)
      }, 3000)
    }
  }
  const sendRequest = async (values) => {
    const res = await api('POST', 'requestPrayer/sendRequest', values)
    console.log(res)
    if (res.status === 200) {
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
        window.location.href = '/pedido-oracion'
      }, 3000)
    }
    if (res?.response?.status === 400) {
      setMsgEmailInvalid(res.response?.data?.msg)
      setErrorValid(true)
      setTimeout(() => {
        setErrorValid(false)
      }, 3000)
    }
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }
  return (
    <>
      <Form
        onFinish={handleSubmit}
        onFinishFailed={onFinishFailed}
        autoComplete='off'
        layout='vertical'
      >
        <Col xs={12}>
          <Form.Item
            label='Nombre y Apellido'
            name='name'
            rules={[{ required: true, message: 'Debe ingresar un nombre' }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Form.Item
          label='Email'
          name='email'
          rules={[{ required: true, message: 'Debe ingresar un email' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label='Pedido'
          name='requestPrayer'
          rules={[
            { required: true, message: 'Debe ingresar un pedido de oración' },
          ]}
        >
          <TextArea rows={6} />
        </Form.Item>
        <Col xs={12} className='text-center'>
          <Form.Item className='pt-4'>
            {loading ? (
              <Button disabled type='primary' htmlType='submit'>
                <Spinner
                  as='span'
                  animation='border'
                  size='sm'
                  role='status'
                  aria-hidden='true'
                />
                <span className='ms-2'>Enviando</span>
              </Button>
            ) : (
              <Button type='primary' htmlType='submit'>
                Enviar pedido
              </Button>
            )}
          </Form.Item>
        </Col>
      </Form>
      <Col xs={10} sm={8} md={6} className=''>
        {errorValid && (
          <MsgError text1='Datos incorrectos.' text2={msgEmailInvalid} />
        )}
        {errorServer && (
          <MsgError
            text1='Hubo un problema en el servidor.'
            text2='Intente mas tarde'
          />
        )}
      </Col>
    </>
  )
}

export default FormPrayerRequest
