import { Form, Input, Button, Spin, Select, Switch } from 'antd'
import React, { useState, useEffect } from 'react'
import MsgError from '../../Messages/MsgError'
import { api } from '../../../utils/api'

const FormFooter = ({
  userToken,
  loading,
  setLoading,
  dataCategories,
  dataSpecialDay,
  dataNews,
  dataRegisterEdit,
  routeAPI,
}) => {
  const [dataError, setDataError] = useState(false)
  const [messageError, setMessageError] = useState('')
  const [serverError, setServerError] = useState(false)
  const [switchWindow, setSwitchWindow] = useState(false)
  const [selectType, setSelectType] = useState(undefined)

  useEffect(() => {
    setSelectType(dataRegisterEdit?.typeField || undefined)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSwitchWindow = (e) => {
    setSwitchWindow(e)
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
    values.newWindows = switchWindow
    const res = await api('post', routeAPI, values, userToken)
    if (res.status === 200) {
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
        window.location.href = '/admin/home/footer'
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
    values.newWindows = switchWindow
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
        window.location.href = '/admin/home/footer'
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
  const optionsRedirect = [
    {
      value: 'SecciónInterna',
      label: 'Sección interna',
    },
    {
      value: 'urlExterno',
      label: 'url externo',
    },
  ]
  const changeSelect = (e) => {
    setSelectType(e)
  }

  let options = []
  dataCategories?.forEach((d) => {
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
  dataNews?.forEach((d) => {
    const replaceTitle = d.title.replace(/ /g, '-')
    const option = {
      value: `noticias/${d.title}`,
      label: d.title,
      pathUrl: `noticias/${replaceTitle}`,
    }
    options.push(option)
  })

  options.unshift({
    value: 'pedido-oracion',
    label: 'Pedidos de Oración',
    pathUrl: 'pedido-oracion',
  })
  options.unshift({
    value: 'vivo-capilla',
    label: 'Capilla en Vivo',
    pathUrl: 'vivo-capilla',
  })
  options.unshift({
    value: 'https://www.instagram.com/obra.imcej.sacej/',
    label: 'Instagram',
    pathUrl: 'https://www.instagram.com/obra.imcej.sacej/',
  })
  options.unshift({
    value: 'https://www.youtube.com/@ObraInmaculadaMadreIMCEJySACEJ',
    label: 'Youtube',
    pathUrl: 'https://www.youtube.com/@ObraInmaculadaMadreIMCEJySACEJ',
  })
  options.unshift({
    value: 'horarios',
    label: 'Horarios',
    pathUrl: 'vivo-capilla',
  })

  return (
    <div className='menuContainer'>
      <Form
        labelCol={{ span: 22 }}
        wrapperCol={{ span: 22 }}
        initialValues={{
          title: dataRegisterEdit?.title,
          urlRedirect: dataRegisterEdit?.urlRedirect,
          newWindows: dataRegisterEdit?.newWindows,
          typeField: dataRegisterEdit?.typeField,
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
          label='Elija el tipo de redirección'
          name='typeField'
          rules={[
            {
              required: true,
              message: 'Debe seleccionar un tipo',
            },
          ]}
        >
          <Select
            showSearch
            onChange={changeSelect}
            disabled={dataRegisterEdit === null ? false : true}
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
            options={optionsRedirect}
          />
        </Form.Item>
        {selectType === 'SecciónInterna' ? (
          <Form.Item
            label='Elija una sección a la cual redirigir'
            name='urlRedirect'
            rules={[
              {
                required: true,
                message: 'Debe seleccionar una sección a la cual redireccionar',
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
        ) : (
          <Form.Item
            label='Url externa'
            name='urlRedirect'
            rules={[{ required: true, message: 'Debe ingresar una url' }]}
          >
            <Input />
          </Form.Item>
        )}

        <Form.Item
          label='Abrir en una ventana nueva'
          valuePropName='checked'
          name='newWindows'
        >
          <Switch onChange={handleSwitchWindow} />
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

export default FormFooter
