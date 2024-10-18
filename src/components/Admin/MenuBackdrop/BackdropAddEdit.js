import React, { useState, useEffect } from 'react'
import { deleteFile, uploadFile } from '../../../firebase/config'
import { api } from '../../../utils/api'
import { Form, Button, Spin } from 'antd'
import MsgError from '../../Messages/MsgError'
import Resizer from 'react-image-file-resizer'

const BackdropAddEdit = ({ title, data, userToken, routeAPI, idTab }) => {
  const [imgData, setImgData] = useState()
  const [preview, setPreview] = useState()
  const [dataError, setDataError] = useState(false)
  const [messageError, setMessageError] = useState('')
  const [serverError, setServerError] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    // Redimensionar y convertir a WebP
    Resizer.imageFileResizer(
      file,
      title === 'Noticias' || title === 'Categorias' || title === 'Jornadas'
        ? 2500
        : 500,
      title === 'Noticias' || title === 'Categorias' || title === 'Jornadas'
        ? 780
        : 450,
      'WEBP',
      80,
      0,
      (resizedImage) => {
        setImgData(resizedImage)
      },
      'blob'
    )
  }

  const estado = process.env.REACT_APP_API ? process.env.REACT_APP_API : null
  const URL_FIREBASE_IMG =
    estado !== null ? 'img-backdrops-dev' : 'img-backdrops'

  const handleSubmit = async (values) => {
    try {
      if (data?.allBackdrops.length === 0) {
        if (!imgData) {
          alert('Debe seleccionar una imagen para continuar')
          return
        }
        const url = await uploadFile(URL_FIREBASE_IMG, imgData)
        values.nameBackdrop = title
        values.backdrop = url
        const res = await api('POST', routeAPI, values, userToken)
        if (res.status === 200) {
          setLoading(true)
          setTimeout(() => {
            setLoading(false)
            window.location.href = `/admin/home/${idTab}`
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
          alert('Debe seleccionar una imagen para continuar')
          return
        }
        let url
        if (imgData) {
          url = await uploadFile(URL_FIREBASE_IMG, imgData)
        } else {
          url = preview
        }
        if (data?.allBackdrops[0].backdrop !== url) {
          deleteFile(data?.allBackdrops[0].backdrop)
        }
        values.backdrop = url
        const res = await api(
          'PATCH',
          `${routeAPI}/${data.allBackdrops[0]._id}`,
          values,
          userToken
        )

        if (res.status === 200) {
          setLoading(true)
          setTimeout(() => {
            setLoading(false)
            window.location.href = `/admin/home/${idTab}`
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
    return () => URL.revokeObjectURL(objectUrl)
  }, [imgData])

  useEffect(() => {
    if (!data || data?.length === 0 || data?.allBackdrops?.length === 0) {
      return
    } else {
      setPreview(data?.allBackdrops[0]?.backdrop)
    }
  }, [data])
  console.log(title)
  return (
    <>
      <Form
        labelCol={{ span: 22 }}
        wrapperCol={{ span: 22 }}
        initialValues={{
          backdrop: data?.backdrop,
        }}
        onFinish={handleSubmit}
        onFinishFailed={onFinishFailed}
        autoComplete='off'
        layout='vertical'
        style={{ marginLeft: '2vh' }}
      >
        <div className='menuContainer d-flex mb-0'>
          <div className=''>
            <p className='fw-bolder'>Seleccionar foto</p>
            <p className='text-important'>
              <span className='fw-bold text-danger '>*</span>Solo se puede
              seleccionar una foto
            </p>
          </div>
        </div>
        <div className='menuContainer mt-0'>
          <div>
            {preview && (
              <div
                className={
                  title === 'Noticias' ||
                  title === 'Categorias' ||
                  title === 'Jornadas'
                    ? 'container-preview'
                    : 'container-preview-msg'
                }
              >
                <img
                  src={preview}
                  id='img-preview-news'
                  className={
                    title === 'Noticias' ||
                    title === 'Categorias' ||
                    title === 'Jornadas'
                      ? 'preview-upload-backdrop'
                      : 'preview-upload-backdrop-msg'
                  }
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
            {!preview && (
              <>
                <input
                  className='btnUpload'
                  type='file'
                  name=''
                  id='id-btn-upload'
                  // onChange={(e) => setImgData(e.target.files[0])}
                  onChange={handleImageChange}
                />
                <label
                  htmlFor='id-btn-upload'
                  className='d-flex text-center align-items-center btnUpload'
                >
                  Agregar imagen
                </label>
              </>
            )}
          </div>
        </div>

        <div className='text-end me-4'>
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
                {data?.length !== 0 || data?.allBackdrops.length !== 0
                  ? 'Actualizando'
                  : 'Agregando'}
              </span>
            </Button>
          ) : (
            <Button type='primary' htmlType='submit'>
              {data?.length !== 0 && data?.allBackdrops.length !== 0
                ? 'Actualizar'
                : 'Agregar'}
            </Button>
          )}
        </div>
        {/* </div> */}
        {dataError
          ? messageError.map((e, i) => <MsgError key={i} text2={e.msg} />)
          : null}
        {serverError ? <MsgError text2='Server internal Error' /> : null}
      </Form>
    </>
  )
}

export default BackdropAddEdit
