import { Form, Input, Button, Spin } from 'antd'
import React, { useState, useEffect } from 'react'
import MsgError from '../../Messages/MsgError'
import { uploadFile, uploadFileVideo } from '../../../firebase/config'
import { api } from '../../../utils/api'

const CarouselAddEdit = ({
  userToken,
  loading,
  setLoading,
  dataRegisterEdit,
}) => {
  const [imgData, setImgData] = useState()
  const [preview, setPreview] = useState()
  const [dataError, setDataError] = useState(false)
  const [messageError, setMessageError] = useState('')
  const [serverError, setServerError] = useState(false)

  // const estado = process.env.REACT_APP_API ? process.env.REACT_APP_API : null
  // const URL_FIREBASE_IMG = estado !== null ? 'videos-carousel-dev' : 'videos-carousel'
  const URL_FIREBASE_IMG = 'videos-carousel'

  const handleSubmit = async (values) => {
    try {
      if (!dataRegisterEdit) {
        if (!imgData) {
          alert('Debe seleccionar un archivo para continuar')
          return
        }
        const url = await uploadFileVideo(URL_FIREBASE_IMG, imgData)
        values.file = url
        const res = await api('POST', 'carousel', values, userToken)
        if (res.status === 200) {
          setLoading(true)
          setTimeout(() => {
            setLoading(false)
            window.location.href = '/admin/home/carousel'
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
        if (!imgData && !preview) {
          alert('Debe seleccionar un archivo para continuar')
          return
        }
        let url
        if (imgData) {
          url = await uploadFile(URL_FIREBASE_IMG, imgData)
        } else {
          url = preview
        }
        if (dataRegisterEdit.backdrop !== url) {
          deleteFile(dataRegisterEdit.backdrop)
        }
        values.file = url

        const res = await api(
          'PATCH',
          `carousel/${dataRegisterEdit._id}`,
          values,
          userToken
        )

        if (res.status === 200) {
          setLoading(true)
          setTimeout(() => {
            setLoading(false)
            window.location.href = '/admin/home/jornadas/carousel'
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
      setServerError(true)
      setTimeout(() => {
        setServerError(false)
      }, 3000)
    }
  }

  const deleteFile = (e) => {
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
    setPreview(dataRegisterEdit.file)
  }, [dataRegisterEdit])

  return (
    <div className='menuContainer'>
      <Form
        labelCol={{ span: 22 }}
        wrapperCol={{ span: 22 }}
        initialValues={{
          nameItem: dataRegisterEdit?.nameItem,
          file: dataRegisterEdit?.file,
        }}
        onFinish={handleSubmit}
        onFinishFailed={onFinishFailed}
        autoComplete='off'
        layout='vertical'
        style={{ marginLeft: '2vh' }}
      >
        <Form.Item
          label='Nombre item'
          name='nameItem'
          rules={[{ required: true, message: 'Debe ingresar un nombre' }]}
        >
          <Input />
        </Form.Item>
        <div>
          <p>
            <span className='text-danger fw-bolder me-1'>*</span>Video
          </p>
        </div>
        <div className='d-flex'>
          {preview && (
            <div className='container-preview'>
              <video
                src={preview}
                id='img-preview-news'
                className='preview-upload-video me-4  border border-3'
                alt='preview'
                controls
              />
              <div className='btn btn-delete-img'>
                <div
                  onClick={() => deleteFile(preview)}
                  className='btn-contianer-delete d-flex justify-content-center align-items-center'
                >
                  <p className='pb-2 mb-2'>x</p>
                </div>
              </div>
            </div>
            // <img src={preview} className="preview-upload me-4" alt="preview" />
          )}

          <input
            className='btnUploadVideo'
            type='file'
            accept='video/*'
            name=''
            id='id-btn-upload'
            onChange={(e) => setImgData(e.target.files[0])}
          />
          <label
            htmlFor='id-btn-upload'
            className='d-flex justify-content-center align-items-center btnUploadVideo'
          >
            Agregar archivo
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
          ? messageError.map((e, i) => <MsgError key={i} text2={e.msg} />)
          : null}
        {serverError ? <MsgError text2='Server internal Error' /> : null}
      </Form>
    </div>
  )
}

export default CarouselAddEdit
