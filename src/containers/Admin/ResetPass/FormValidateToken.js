import { Container, Row, Col, Spinner } from 'react-bootstrap'
import { Button, Form, Input } from 'antd'
import '../index.css'
import { useEffect, useState } from 'react'
import MsgError from '../../../components/Messages/MsgError'
import { api } from '../../../utils/api'
import { useParams, useNavigate } from 'react-router-dom'
import { getUserByEmail } from '../../../utils/queryAPI/user'

const ValidateToken = () => {
  const [loading, setLoading] = useState(false)
  const [errorServer, setErrorServer] = useState(false)
  const [errorValid, setErrorValid] = useState(false)
  const [emailResetValid, setEmailResetValid] = useState(false)
  const [tokenInvalid, setTokenInvalid] = useState(false)
  const [msgEmailValid, setMsgEmailValid] = useState('')
  const [msgEmailInvalid, setMsgEmailInvalid] = useState(null)

  const { email, token } = useParams()
  let navigate = useNavigate()
  console.log(email, token)
  const handleSubmit = async (values) => {
    try {
      if (values.password === values.password1) {
        updatePass(values)
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
  const updatePass = async (values) => {
    try {
      const data = { password: values.password, token: values.tokenResetPass }
      const res = await api(
        'PATCH',
        `users/updatePassReset/${email}`,
        data,
        undefined
      )
      if (res.status === 200) {
        setLoading(true)
        setTimeout(() => {
          setLoading(false)
          setEmailResetValid(true)
          setMsgEmailValid(res?.data?.msg)
        }, 3000);
      }
      if (res?.response?.status === 400) {
        console.log(res)
        setMsgEmailInvalid(res.response?.data?.message)
        setTokenInvalid(true)
        setTimeout(() => {
          setTokenInvalid(false)
        }, 3000)
      }
      if (res?.response?.status === 500) {
        setErrorServer(true)
        setTimeout(() => {
          setErrorServer(false)
        }, 3000)
      }
    } catch (error) {}
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }
  useEffect(() => {
    tokenResetPassExist()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const tokenResetPassExist = async () => {
    const data = await getUserByEmail(email)
    if (data?.tokenResetPass === '' || data?.tokenResetPass !== token) {
      navigate('/admin/login')
    }
  }
  return (
    <div className='container-login'>
      <Container>
        <Row className='justify-content-center align-items-center'>
          <Col xs={10} sm={8} md={6} className='container-form'>
            {emailResetValid ? (
              <>
                <h2 className='text-center pb-3 title-login'>
                  Clave restaurada
                </h2>
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
                  Restablecer clave
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
                    label='Token secreto'
                    name='tokenResetPass'
                    rules={[
                      {
                        required: true,
                        message: 'Debe ingresar un token',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label='Clave'
                    name='password'
                    rules={[
                      { required: true, message: 'Debe ingresar su clave!' },
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>
                  <Form.Item
                    label='Repita la clave'
                    name='password1'
                    rules={[
                      { required: true, message: 'Ambas claves no coinciden!' },
                    ]}
                  >
                    <Input.Password />
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
                        <span className='ms-2'>Cargando</span>
                      </Button>
                    ) : (
                      <Button type='primary' htmlType='submit'>
                        Confirmar
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
              <MsgError text2='Las claves ingresadas no coinciden.' />
            )}
            {tokenInvalid && <MsgError text2={msgEmailInvalid} />}
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
export default ValidateToken
