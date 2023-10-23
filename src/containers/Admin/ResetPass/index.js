// import { Link } from 'react-router-dom'
import { Container, Row, Col, Spinner } from 'react-bootstrap'
import { Button, Form, Input } from 'antd'
import '../index.css'
import { useState } from 'react'
import MsgError from '../../../components/Messages/MsgError'

const ResetPass = () => {
  const [loading, setLoading] = useState(false)
  const [errorServer, setErrorServer] = useState(false)
  const [errorValid, setErrorValid] = useState(false)

  const handleSubmit = async () => {
    setLoading(true)
    setErrorServer(true)
    setErrorValid(true)
  }
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }
  return (
    <div className='container-login'>
      <Container>
        <Row className='justify-content-center align-items-center'>
          <Col xs={10} sm={8} md={6} className='container-form'>
            <h2 className='text-center pb-5 title-login'>Recuperar clave</h2>
            <Form
              name='basic'
              labelCol={{ span: 7 }}
              wrapperCol={{ span: 16 }}
              initialValues={{ remember: true }}
              // onSubmit={handleSubmit}
              onFinish={handleSubmit}
              onFinishFailed={onFinishFailed}
              autoComplete='off'
            >
              <Form.Item
                label='Cuenta de correo'
                name='email'
                rules={[
                  {
                    required: true,
                    message: 'Debe ingresar un email!',
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 10, span: 16 }} className='pt-4'>
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
                    Enviar email
                  </Button>
                )}
              </Form.Item>
            </Form>
          </Col>
        </Row>
        <Row className='justify-content-center align-items-center'>
          <Col xs={10} sm={8} md={6} className=''>
            {errorValid && (
              <MsgError
                text1='Datos incorrectos.'
                text2='Ingrese un mail y clave valida.'
              />
            )}
            {errorServer && (
              <MsgError
                text1='Hubo un problema en el servidor.'
                text2='Intente mas tarde'
              />
            )}
          </Col>
        </Row>
      </Container>
    </div>
  )
}
export default ResetPass
