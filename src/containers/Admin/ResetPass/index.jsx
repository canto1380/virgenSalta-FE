import { Container, Row, Col, Spinner } from 'react-bootstrap'
import { Button, Form, Input } from 'antd'
import '../index.css'
import { useState } from 'react'
import MsgError from '../../../components/Messages/MsgError'
import { validaEmail } from '../../../utils/validations/validation'
import { apiParams } from '../../../utils/api'

const ResetPass = () => {
  const [loading, setLoading] = useState(false)
  const [errorServer, setErrorServer] = useState(false)
  const [errorValid, setErrorValid] = useState(false)
  const [emailResetValid, setEmailResetValid] = useState(false)
  const [msgEmailValid, setMsgEmailValid] = useState('')
  const [msgEmailInvalid, setMsgEmailInvalid] = useState(null)

  const handleSubmit = async (values) => {
    try {
      if (validaEmail(values.email)) {
        resetPass(values)
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
  const resetPass = async (values) => {
    try {
      const res = await apiParams('GET', values, 'users/resetPass')
      if (res.status === 200) {
        setLoading(true)
        setTimeout(() => {
          setEmailResetValid(true)
          setMsgEmailValid(res?.data?.msg)
        }, 3000)
      }
      if (res?.response?.status === 400) {
        setMsgEmailInvalid(res.response?.data?.msg)
        setErrorValid(true)
        setTimeout(() => {
          setErrorValid(false)
        }, 3000)
      }
    } catch (error) {}
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }
  return (
    <div className='container-login'>
      <Container>
        <Row className='justify-content-center align-items-center'>
          <Col xs={10} sm={8} md={6} className='container-form'>
            {emailResetValid ? (
              <>
                <h2 className='text-center pb-3 title-login'>Email enviado</h2>
                <div className='d-flex justify-content-center pb-3'>
                  <p className='text-center'>{msgEmailValid}</p>
                </div>
                <div className='d-flex justify-content-center'>
                  <Button type='primary' href='/admin/login'>
                    Ir al inicio
                  </Button>
                </div>
              </>
            ) : (
              <>
                <h2 className='text-center pb-5 title-login'>
                  Recuperar clave
                </h2>
                <Form
                  name='basic'
                  labelCol={{ span: 7 }}
                  wrapperCol={{ span: 16 }}
                  initialValues={{ remember: true }}
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

                  <Form.Item
                    wrapperCol={{ offset: 10, span: 16 }}
                    className='pt-4'
                  >
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
              </>
            )}
          </Col>
        </Row>
        <Row className='justify-content-center align-items-center'>
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
        </Row>
      </Container>
    </div>
  )
}
export default ResetPass
