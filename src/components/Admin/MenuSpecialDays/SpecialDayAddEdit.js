import { Form, Input, Button, Spin } from 'antd'
import React, { useState, useEffect } from 'react'
import MsgError from '../../Messages/MsgError'
import { uploadFile, deleteFile } from '../../../firebase/config'
import { api } from '../../../utils/api'
import App from '../../../ckeditor5/Ckeditor'
import imageCompression from 'browser-image-compression'

const SpecialDaysAddEdit = ({
  userToken,
  loading,
  setLoading,
  dataRegisterEdit,
}) => {
  const [imgData, setImgData] = useState([])
  const [preview, setPreview] = useState([])
  const [description, setDescription] = useState()
  const [dataError, setDataError] = useState(false)
  const [messageError, setMessageError] = useState('')
  const [serverError, setServerError] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [newImages, setNewImages] = useState([])

  const estado = process.env.REACT_APP_API ? process.env.REACT_APP_API : null
  const URL_FIREBASE_IMG = estado !== null ? 'img-jornadas-dev' : 'img-jornadas'

  const getPreview = (file) => {
    const fileReader = new FileReader()
    fileReader.readAsDataURL(file)
    return new Promise((res, rej) => {
      fileReader.onloadend = () => res(fileReader.result)
    })
  }

  const handleImageChange = async (event) => {
    const files = Array.from(event.target.files)
    const compressedFiles = []

    const options = {
      maxSizeMB: 1.0, // Tamaño máximo del archivo en MB
      maxWidthOrHeight: 1080, // Dimensiones máximas
      useWebWorker: true, // Usar Web Workers para mejorar la performance
      fileType: 'image/webp', // Convertir a formato webp
    }

    for (let file of files) {
      try {
        const compressedFile = await imageCompression(file, options)
        compressedFiles.push(compressedFile)
      } catch (error) {
        console.error('Error al comprimir la imagen:', error)
      }
    }

    /*** SI ES UNA NOTICIA NUEVA ***/
    if (!dataRegisterEdit || dataRegisterEdit.photos.length === 0) {
      // const files = Array.from(event.target.files)

      setImgData((prevImages) => [...prevImages, ...compressedFiles])

      const newPreviews = compressedFiles.map((file) =>
        URL.createObjectURL(file)
      )
      setPreview((prevPreviews) => [...prevPreviews, ...newPreviews])
    } else {
      /*** SI ES UNA NOTICIA A EDITAR ***/
      // const files = Array.from(event.target.files)

      setNewImages((prevImages) => [...prevImages, ...compressedFiles])

      const newPreviews = compressedFiles.map((file) =>
        URL.createObjectURL(file)
      )
      setPreview((prevPreviews) => [...prevPreviews, ...newPreviews])
    }
  }

  const handleSubmit = async (values) => {
    if (!dataRegisterEdit) {
      handleCrear(values)
    } else {
      handleActualizar(values)
    }
  }
  const handleCrear = async (values) => {
    try {
      if (!imgData) {
        alert('Debe seleccionar una/s imagen/es para continuar')
        return
      }

      const objects = {}
      for (let file of imgData) {
        const preview = await getPreview(file)
        objects[file.name] = { preview }
      }
      const promises = imgData.map((file) => {
        return uploadFile(URL_FIREBASE_IMG, file)
      })
      const ls = await Promise.all(promises)

      values.description = description
      values.photos = ls
      const res = await api('POST', 'specialDays', values, userToken)
      if (res.status === 200) {
        setUploading(true)
        setLoading(true)
        setTimeout(() => {
          setLoading(false)
          setUploading(false)
          window.location.href = '/admin/home/jornadas'
        }, 2500)
      }
      if (res?.response?.status === 400) {
        setUploading(true)
        setLoading(true)
        const arraysError = res?.response?.data?.errors
        setMessageError(arraysError)
        setDataError(true)
        setTimeout(() => {
          setDataError(false)
          setUploading(false)
          setLoading(false)
        }, 3000)
      }
    } catch (error) {
      setServerError(error)
    }
  }
  const handleActualizar = async (values) => {
    try {
      values.description =
        description === undefined ? dataRegisterEdit.description : description
      if (
        (!imgData || imgData.length === 0) &&
        Object.keys(preview).length === 0
      ) {
        alert('Debe seleccionar una/s imagen/es para continuar')
        return
      }

      let ls = [],
        ls1 = []

      if (newImages.length === 0) {
        /** NO SE DEBE CARGAR NINGUNA IMAGEN **/
        ls = imgData
      } else {
        const uploadNewImages = newImages.map((file) => {
          return uploadFile(URL_FIREBASE_IMG, file)
        })
        ls = imgData
        ls1 = await Promise.all(uploadNewImages)
      }
      if (dataRegisterEdit.photos.length === 0) {
        const uploadImages = imgData.map((file) => {
          return uploadFile(URL_FIREBASE_IMG, file)
        })
        ls = await Promise.all(uploadImages)
      }
      /** Carga IMG en Firebase **/
      const updatedImages = [...ls, ...ls1]
      values.photos = updatedImages
      const res = await api(
        'PATCH',
        `specialDays/${dataRegisterEdit._id}`,
        values,
        userToken
      )

      if (res.status === 200) {
        setUploading(true)
        setLoading(true)
        setTimeout(() => {
          setLoading(false)
          setUploading(false)
          window.location.href = '/admin/home/jornadas'
        }, 2500)
      }
      if (res?.response?.status === 400) {
        setUploading(true)
        setLoading(true)
        const arraysError = res?.response?.data?.errors
        setMessageError(arraysError)
        setDataError(true)
        setTimeout(() => {
          setDataError(false)
          setLoading(false)
          setUploading(false)
        }, 3000)
      }
    } catch (error) {
      setServerError(error)
    }
  }
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  const deleteImg = (index) => {
    if (dataRegisterEdit && dataRegisterEdit.photos.length > 0) {
      deleteFile(imgData[index])
    }
    const newImages = [...imgData]
    const newPreviews = [...preview]

    newImages.splice(index, 1)
    newPreviews.splice(index, 1)

    setImgData(newImages)
    setPreview(newPreviews)
  }

  // useEffect(() => {
  //   if (!imgData) {
  //     setPreview(undefined)
  //     return
  //   }
  //   for (let file of imgData) {
  //     const objectUrl = URL.createObjectURL(file)
  //     setPreview((url) => ({
  //       ...url,
  //       [file.size]: objectUrl,
  //     }))
  //   }
  // }, [imgData])

  useEffect(() => {
    if (!dataRegisterEdit) {
      return
    }
    setImgData(() => [...dataRegisterEdit.photos])
    setPreview((prevPreview) => [...dataRegisterEdit.photos])
  }, [dataRegisterEdit])

  return (
    <div className='menuContainer'>
      <Form
        disabled={uploading ? true : false}
        labelCol={{ span: 22 }}
        wrapperCol={{ span: 22 }}
        initialValues={{
          title: dataRegisterEdit?.title,
          subtitle: dataRegisterEdit?.subtitle,
          description: dataRegisterEdit?.description,
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
          rules={[
            {
              required: true,
              message: 'Debe ingresar un titulo entre 5 y 60 caracteres',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label='Subtítulo'
          name='subtitle'
          rules={[
            {
              required: true,
              message: 'Debe ingresar un texto entre 5 y 150 caracteres',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <div>
          <p>
            <span className='text-danger fw-bolder'>*</span>Descripción
          </p>
        </div>
        {/* <CKEditor
          disabled={uploading ? true : false}
          editor={ClassicEditor}
          data={dataRegisterEdit ? dataRegisterEdit.description : ''}
          onReady={(editor) => {}}
          onChange={(event, editor) => {
            const data = editor.getData()
            setDescription(data)
          }}
        /> */}
        <App
          setDescription={setDescription}
          data={dataRegisterEdit ? dataRegisterEdit.description : ''}
        />

        <div className='mt-4'>
          <p>
            <span className='text-danger fw-bolder me-1'>*</span>Imágenes
          </p>
        </div>
        <div className='d-flex mb-3'>
          {preview &&
            Object.values(preview).map((ob, i) => (
              <div className='container-preview' key={i}>
                <img
                  src={ob}
                  id='img-preview-news'
                  className='preview-upload me-4'
                  alt='preview'
                />
                <div className='btn btn-delete-img'>
                  <div
                    onClick={() => deleteImg(i)}
                    className='btn-contianer-delete d-flex justify-content-center align-items-center'
                  >
                    <p className='pb-2 mb-2'>x</p>
                  </div>
                </div>
              </div>
            ))}

          <input
            className='btnUpload'
            type='file'
            name=''
            id='id-btn-upload'
            disabled={uploading ? true : false}
            multiple
            onChange={handleImageChange}
          />
          <label
            htmlFor='id-btn-upload'
            className='d-flex text-center align-items-center btnUpload disabled'
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
          ? messageError.map((e, i) => <MsgError key={i} text2={e.msg} />)
          : null}
        {serverError ? <MsgError text2='Server internal Error' /> : null}
      </Form>
    </div>
  )
}

export default SpecialDaysAddEdit
