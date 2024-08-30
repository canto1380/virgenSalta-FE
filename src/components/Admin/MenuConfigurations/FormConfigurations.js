import { Form, Input, Button, Spin, Select } from 'antd'
import React, { useState, useEffect } from 'react'
import MsgError from '../../Messages/MsgError'
import { api } from '../../../utils/api'
import { deleteFile, uploadFile } from '../../../firebase/config'
import Resizer from 'react-image-file-resizer'

const FormConfigurations = ({
  userToken,
  loading,
  setLoading,
  dataRegisterEdit,
  routeAPI,
}) => {
  const [dataError, setDataError] = useState(false)
  const [messageError, setMessageError] = useState('')
  const [serverError, setServerError] = useState(false)
  const [preview, setPreview] = useState()
  const [selectType, setSelectType] = useState(undefined)
  const [imgData, setImgData] = useState()
  const [uploading, setUploading] = useState(false)

  const estado = process.env.REACT_APP_API
  const URL_FIREBASE_IMG =
    estado === 'http://localhost:4001' ? 'img-configuraciones-dev' : 'img-configuraciones'

  useEffect(() => {
    setSelectType(dataRegisterEdit?.typeField || undefined)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const options = [
    {
      value: 'imagen',
      label: 'imagen',
    },
    {
      value: 'video',
      label: 'video',
    },
    {
      value: 'url',
      label: 'url',
    },
    {
      value: 'texto',
      label: 'texto',
    },
  ]
  const handleImageChange = (e) => {
    const file = e.target.files[0]
    // Redimensionar y convertir a WebP
    Resizer.imageFileResizer(
      file,
      500,
      500,
      'WEBP',
      400,
      0,
      (resizedImage) => {
        setImgData(resizedImage)
      },
      'blob'
    )
  }

  const handleSubmit = async (values) => {
    try {
      if (!dataRegisterEdit) {
        handleCreate(values)
      } else {
        handleUpdated(values)
      }
    } catch (error) {
      setServerError(true)
      setTimeout(() => {
        setServerError(false)
      }, 3000)
    }
  }

  const handleCreate = async (values) => {
    if (selectType === 'imagen') {
      if (!imgData) {
        alert('Debe seleccionar una imagen para continuar')
        return
      }
      setUploading(true)
      setLoading(true)
      const url = await uploadFile(URL_FIREBASE_IMG, imgData)
      values.mixedField = url
      const res = await api('POST', routeAPI, values, userToken)
      if (res.status === 200) {
        setTimeout(() => {
          setLoading(false)
          setUploading(false)
          window.location.href = '/admin/home/configuracion'
        }, 2500)
      }
      if (res?.response?.status === 400) {
        const arraysError = res?.response?.data?.errors
        setMessageError(arraysError)
        setDataError(true)
        setTimeout(() => {
          setDataError(false)
          setUploading(false)
        }, 3000)
      }
    } else {
      const res = await api('POST', routeAPI, values, userToken)
      setLoading(true)
      setUploading(true)
      if (res.status === 200) {
        setTimeout(() => {
          setLoading(false)
          setUploading(false)
          window.location.href = '/admin/home/configuracion'
        }, 2500)
      }
      if (res?.response?.status === 400) {
        const arraysError = res?.response?.data?.errors
        setMessageError(arraysError)
        setDataError(true)
        setTimeout(() => {
          setDataError(false)
          setUploading(false)
        }, 3000)
      }
    }
  }
  const handleUpdated = async (values) => {
    setUploading(true)
    setLoading(true)
    if (selectType === 'imagen') {
      if (!imgData) {
        alert('Debe seleccionar una imagen para continuar')
        return
      }
      let url
      if (imgData) {
        url = await uploadFile(URL_FIREBASE_IMG, imgData)
      } else {
        url = preview
      }
      if (dataRegisterEdit.mixedField !== url) {
        deleteFile(dataRegisterEdit.mixedField)
      }
      values.mixedField = url
      const res = await api(
        'PATCH',
        `configuration/${dataRegisterEdit._id}`,
        values,
        userToken
      )
      if (res.status === 200) {
        setTimeout(() => {
          setLoading(false)
          setUploading(false)
          window.location.href = '/admin/home/configuracion'
        }, 2500)
      }
      if (res?.response?.status === 400) {
        const arraysError = res?.response?.data?.errors
        setMessageError(arraysError)
        setDataError(true)
        setTimeout(() => {
          setDataError(false)
          setUploading(false)
        }, 3000)
      }
    } else {
      const res = await api(
        'PATCH',
        `configuration/${dataRegisterEdit._id}`,
        values,
        userToken
      )
      if (res.status === 200) {
        setTimeout(() => {
          setLoading(false)
          setUploading(false)
          window.location.href = '/admin/home/configuracion'
        }, 2500)
      }
      if (res?.response?.status === 400) {
        const arraysError = res?.response?.data?.errors
        setMessageError(arraysError)
        setDataError(true)
        setTimeout(() => {
          setDataError(false)
          setUploading(false)
        }, 3000)
      }
    }
  }

  const deleteImg = (e) => {
    setPreview(undefined)
    setImgData(undefined)
  }
  const changeSelect = (e) => {
    setSelectType(e)
  }
  const onFinishFailed = (errorInfo) => {
    console.log('Failed: ', errorInfo)
  }

  useEffect(() => {
    if (!imgData) {
      setPreview(undefined)
      return
    }
    const objectUrl = URL.createObjectURL(imgData)
    setPreview(objectUrl)

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl)
  }, [imgData])
  useEffect(() => {
    if (!dataRegisterEdit) return
    setPreview(dataRegisterEdit.mixedField)
  }, [dataRegisterEdit])
  return (
    <div className='menuContainer'>
      <Form
        disabled={uploading ? true : false}
        labelCol={{ span: 22 }}
        wrapperCol={{ span: 22 }}
        initialValues={{
          title: dataRegisterEdit?.title,
          typeField: dataRegisterEdit?.typeField,
          mixedField: dataRegisterEdit?.mixedField,
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
          <Input disabled={dataRegisterEdit === null ? false : true} />
        </Form.Item>
        <Form.Item
          label='Elija el tipo de datos a almacenar'
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
            options={options}
          />
        </Form.Item>

        {selectType !== 'imagen' ? (
          <Form.Item
            label='Contenido'
            name='mixedField'
            rules={[{ required: true, message: 'Debe ingresar un título' }]}
          >
            <Input />
          </Form.Item>
        ) : (
          <>
            <div>
              <p>
                <span className='text-danger fw-bolder me-1'>*</span>Contenido
              </p>
            </div>
            <div className='d-flex'>
              {preview && (
                <div className='container-preview'>
                  <img
                    src={preview}
                    id='img-preview-news'
                    className='preview-upload me-4'
                    alt='preview'
                  />
                  <div className='btn btn-delete-img'>
                    <div
                      onClick={() => deleteImg(preview)}
                      className='btn-contianer-delete d-flex justify-content-center align-items-center'
                    >
                      <p className='pb-2 mb-2'>x</p>
                    </div>
                  </div>
                </div>
              )}

              <input
                className='btnUpload'
                type='file'
                name=''
                id='id-btn-upload'
                onChange={handleImageChange}
                disabled={uploading ? true : false}
              />
              <label
                htmlFor='id-btn-upload'
                className='d-flex text-center align-items-center btnUpload'
                disabled={uploading ? true : false}
              >
                Agregar imagen
              </label>
            </div>
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
        {dataError ? <MsgError text2={messageError} /> : null}
        {serverError ? <MsgError text2='Server internal Error' /> : null}
      </Form>
    </div>
  )
}

export default FormConfigurations
