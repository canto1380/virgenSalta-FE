import React, { useEffect, useState } from 'react'
import { Form, Input, Button, Spin } from 'antd'
import { api } from '../../../utils/api'
import { uploadFile, deleteFile } from '../../../firebase/config'
import MsgError from '../../Messages/MsgError'
import Resizer from 'react-image-file-resizer'

const FormAddEdit = ({ userToken, loading, setLoading, dataRegisterEdit }) => {
  const [imgData, setImgData] = useState()
  const [preview, setPreview] = useState()
  const [dataError, setDataError] = useState(false)
  const [messageError, setMessageError] = useState('')
  const [serverError, setServerError] = useState(false)
  const [uploading, setUploading] = useState(false)

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    console.log(file)
    // Redimensionar y convertir a WebP
    Resizer.imageFileResizer(
      file,
      500,
      500,
      'WEBP',
      100,
      0,
      (resizedImage) => {
        setImgData(resizedImage)
      },
      'blob'
    )
  }
  const URL_FIREBASE_IMG = 'img-categorias'
  const handleSubmit = async (values) => {
    try {
      if (!dataRegisterEdit) {
        if (!imgData) {
          alert('Debe seleccionar una imagen para continuar')
          return
        }
        setUploading(true)
        setLoading(true)
        console.log(imgData)
        const url = await uploadFile(URL_FIREBASE_IMG, imgData)
        values.backdrop = url

        // const res = await api('POST', 'newsCategory', values, userToken)

        // if (res.status === 200) {
        //   setTimeout(() => {
        //     setLoading(false)
        //     setUploading(false)
        //     window.location.href = '/admin/home/categorias'
        //   }, 2500)
        // }
        // if (res?.response?.status === 400) {
        //   const arraysError = res?.response?.data?.errors
        //   setMessageError(arraysError)
        //   setDataError(true)
        //   setTimeout(() => {
        //     setDataError(false)
        //     setUploading(false)
        //   }, 3000)
        // }
      } else {
        if (!imgData && !preview) {
          alert('Debe seleccionar una imagen para continuar')
          return
        }
        setUploading(true)
        setLoading(true)
        let url
        if (imgData) {
          url = await uploadFile(URL_FIREBASE_IMG, imgData)
        } else {
          url = preview
        }
        if (dataRegisterEdit.backdrop !== url) {
          deleteFile(dataRegisterEdit.backdrop)
        }
        values.backdrop = url

        const res = await api(
          'PATCH',
          `newsCategory/${dataRegisterEdit._id}`,
          values,
          userToken
        )

        if (res.status === 200) {
          setTimeout(() => {
            setLoading(false)
            setUploading(false)
            window.location.href = '/admin/home/categorias'
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
    } catch (error) {
      setServerError(true)
      setTimeout(() => {
        setServerError(false)
      }, 3000)
    }
  }

  const deleteImg = (e) => {
    setPreview(undefined)
    setImgData(undefined)
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
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
    setPreview(dataRegisterEdit.backdrop)
  }, [dataRegisterEdit])

  return (
    <div className='menuContainer'>
      <Form
        disabled={uploading ? true : false}
        labelCol={{ span: 22 }}
        wrapperCol={{ span: 22 }}
        initialValues={{
          nameCategory: dataRegisterEdit?.nameCategory,
          backdrop: dataRegisterEdit?.backdrop,
        }}
        onFinish={handleSubmit}
        onFinishFailed={onFinishFailed}
        autoComplete='off'
        layout='vertical'
        style={{ marginLeft: '2vh' }}
      >
        <Form.Item
          label='Nombre Categoría'
          name='nameCategory'
          rules={[{ required: true, message: 'Debe ingresar un nombre' }]}
        >
          <Input />
        </Form.Item>
        <div>
          <p>
            <span className='text-danger fw-bolder me-1'>*</span>Backdrop
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
            // <img src={preview} className="preview-upload me-4" alt="preview" />
          )}

          <input
            className='btnUpload'
            type='file'
            name=''
            id='id-btn-upload'
            disabled={uploading ? true : false}
            onChange={handleImageChange}
          />
          <label
            htmlFor='id-btn-upload'
            className='d-flex text-center align-items-center btnUpload'
            disabled={uploading ? true : false}
          >
            Agregar imagen
          </label>
        </div>
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
          ? messageError?.map((e, i) => <MsgError key={i} text2={e.msg} />)
          : null}
        {serverError ? <MsgError text2='Server internal Error' /> : null}
      </Form>
    </div>
  )
}

export default FormAddEdit
