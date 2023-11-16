import { Form, Input, Switch, Button, Spin, Select } from 'antd'
import React, { useState } from 'react'
import MsgError from '../../Messages/MsgError'
import { api } from '../../../utils/api'

const NavbarAddEdit = ({
  dataRegisterEdit,
  routeAPI,
  userToken,
  band,
  setBand,
  data,
  dataNews,
  dataSpecialDay,
}) => {
  const [loading, setLoading] = useState(false)
  const [dataError, setDataError] = useState(false)
  const [messageError, setMessageError] = useState('')
  const [serverError, setServerError] = useState(false)
  const [switchDeleted, setSwitchDeleted] = useState(true)
  const [switchWindow, setSwitchWindow] = useState(true)

  const handleSwitchWindow = (e) => {
    setSwitchWindow(e)
  }
  const handleSwitchDeleted = (e) => {
    setSwitchDeleted(e)
  }
  const handleSwitch = (e) => {
    setSwitchDeleted(e)
  }
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
    const replaceURL = values?.url
    values.url = replaceURL && replaceURL.replace(/ /g, '-')

    values.visible = switchDeleted

    values.openWindows = switchWindow
    const optionsSelected = options.filter(
      (d) => values.url === d.value.replace(/ /g, '-')
    )
    values.pathUrl = optionsSelected.length > 0 && optionsSelected[0].pathUrl

    const res = await api('POST', routeAPI, values, userToken)
    if (res.status === 200) {
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
        setBand(!band)
        window.location.href = '/admin/home/menu-principal'
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

  const handleUpdated = async (values) => {
    const replaceURL = values.url
    values.url = replaceURL && replaceURL.replace(/ /g, '-')
    values.visible = switchDeleted
    values.openWindows = switchWindow

    values.openWindows = switchWindow
    const optionsSelected = options.filter(
      (d) => values.url === d.value.replace(/ /g, '-')
    )
    values.pathUrl = optionsSelected.length > 0 && optionsSelected[0].pathUrl
    
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
        window.location.href = '/admin/home/menu-principal'
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

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }
  let options = []
  dataNews?.forEach((d) => {
    const option = {
      value: d.title,
      label: d.title,
      pathUrl: 'noticias',
    }
    options.push(option)
  })
  dataSpecialDay?.forEach((d) => {
    const option = {
      value: d.title,
      label: d.title,
      pathUrl: 'jornadas',
    }
    options.push(option)
  })
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
          itemNavCategory: dataRegisterEdit?.itemNavCategory,
          visible: dataRegisterEdit?.visible,
          title: dataRegisterEdit?.title,
          url: dataRegisterEdit?.url,
          idItemNavCategory: dataRegisterEdit?.idItemNavCategory?._id,
          openWindows: dataRegisterEdit?.openWindows,
        }}
      >
        {routeAPI === 'itemNavCategory' && (
          <>
            <Form.Item
              label='Nombre Sección'
              name='itemNavCategory'
              rules={[{ required: true, message: 'Debe ingresar un nombre' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item label='Visible' valuePropName='checked' name='visible'>
              <Switch onChange={handleSwitch} defaultChecked />
            </Form.Item>
          </>
        )}
        {routeAPI === 'itemNav' && (
          <>
            <Form.Item
              label='Nombre Sección'
              name='title'
              rules={[{ required: true, message: 'Debe ingresar un nombre' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label='Elija una nota a la cual redirigir'
              name='url'
              rules={[
                {
                  required: true,
                  message:
                    'Debe seleccionar una noticia a la cual redireccionar',
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
              label='Categoría'
              name='idItemNavCategory'
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
            <Form.Item label='Visible' valuePropName='checked' name='visible'>
              <Switch onChange={handleSwitchDeleted} defaultChecked />
            </Form.Item>
          </>
        )}

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
        {dataError
          ? messageError.map((e, i) => <MsgError key={i} text2={e.msg} />)
          : null}
        {serverError ? <MsgError text2='Server internal Error' /> : null}
      </Form>
    </div>
  )
}

export default NavbarAddEdit
