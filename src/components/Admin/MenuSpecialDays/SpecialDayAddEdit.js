import { Form, Input, Button, Spin } from 'antd'
import React, { useState, useEffect } from 'react'
import MsgError from '../../Messages/MsgError'
import { uploadFile, deleteFile } from '../../../firebase/config'
import { api } from '../../../utils/api'
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
// import { CKEditor } from '@ckeditor/ckeditor5-react'
import Resizer from 'react-image-file-resizer'

const SpecialDaysAddEdit = ({
  userToken,
  loading,
  setLoading,
  dataRegisterEdit,
}) => {
  const [imgData, setImgData] = useState()
  const [preview, setPreview] = useState({
    preview: '',
    progress: 0,
  })
  const [description, setDescription] = useState()
  const [dataError, setDataError] = useState(false)
  const [messageError, setMessageError] = useState('')
  const [serverError, setServerError] = useState(false)
  const [uploading, setUploading] = useState(false)

  const estado = process.env.REACT_APP_API ? process.env.REACT_APP_API : null
  const URL_FIREBASE_IMG = estado !== null ? 'img-jornadas-dev' : 'img-jornadas'

  const getPreview = (file) => {
    const fileReader = new FileReader()
    fileReader.readAsDataURL(file)
    return new Promise((res, rej) => {
      fileReader.onloadend = () => res(fileReader.result)
    })
  }

  // const handleMultiple = async (e) => {
  //   if (!e.target.files || !e.target.files.length) return
  //   const files = Array.from(e.target.files)
  //   if (!imgData) {
  //     setImgData(files)
  //   } else {
  //     setImgData(imgData.concat(files))
  //   }
  // }

  const handleImageChange = (event) => {
    const files = event.target.files
    let arr = []
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      Resizer.imageFileResizer(
        file,
        500,
        500,
        'WEBP',
        400,
        0,
        (resizedImage) => {
          arr.push(resizedImage)
          if (arr.length === files.length) {
            if (!imgData) {
              setImgData(arr)
            } else {
              setImgData(imgData.concat(arr))
            }
          }
        },
        'blob'
      )
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
      setUploading(true)
      setLoading(true)
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
        setTimeout(() => {
          setLoading(false)
          setUploading(false)
          window.location.href = '/admin/home/jornadas'
        }, 2500)
      }
      if (res?.response?.status === 400) {
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
      if (
        (!imgData || imgData.length === 0) &&
        Object.keys(preview).length === 0
      ) {
        alert('Debe seleccionar una/s imagen/es para continuar')
        return
      }
      setUploading(true)
      setLoading(true)
      let ls, dataImgUpdate
      let arr = []
      if (imgData) {
        const objects = {}
        // const imgDataSinRepetir = eliminarImgRepetidas(imgData)
        for (let file of imgData) {
          const preview = await getPreview(file)
          objects[file.name] = { preview }
        }
        const promises = imgData.map((file) => {
          return uploadFile(URL_FIREBASE_IMG, file)
        })
        ls = await Promise.all(promises)
        for (const url in preview) {
          if (!preview[url].includes('blob')) {
            arr.push(preview[url])
          }
        }
        dataImgUpdate = arr.concat(ls)
      } else {
        for (const url in preview) {
          if (!preview[url].includes('blob')) {
            arr.push(preview[url])
          }
        }
        dataImgUpdate = arr
      }
      dataRegisterEdit.photos.forEach((d2) => {
        if (!dataImgUpdate.includes(d2)) {
          deleteFile(d2)
        }
      })
      values.photos = dataImgUpdate
      values.description =
        description === undefined ? dataRegisterEdit.description : description
      const res = await api(
        'PATCH',
        `specialDays/${dataRegisterEdit._id}`,
        values,
        userToken
      )

      if (res.status === 200) {
        setTimeout(() => {
          setLoading(false)
          setUploading(false)
          window.location.href = '/admin/home/jornadas'
        }, 2500)
      }
      if (res?.response?.status === 400) {
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

  const deleteImg = (e) => {
    const resultado = {}
    let resultado1 = {}
    let resultado2 = {}
    if (!imgData) {
      for (const [chave, valor] of Object.entries(preview)) {
        if (!valor.includes(e)) {
          resultado2[chave] = valor
        }
      }
      setPreview(resultado2)
    } else {
      for (const [chave, valor] of Object.entries(preview)) {
        resultado1 = imgData.filter((d) => d.name !== chave)
        if (valor.includes(e)) {
        } else {
          resultado[chave] = valor
        }
      }
      setPreview(resultado)
      setImgData(resultado1)
    }
  }

  useEffect(() => {
    if (!imgData) {
      setPreview(undefined)
      return
    }
    for (let file of imgData) {
      const objectUrl = URL.createObjectURL(file)
      setPreview((url) => ({
        ...url,
        [file.size]: objectUrl,
      }))
    }
  }, [imgData])

  useEffect(() => {
    if (!dataRegisterEdit) {
      return
    }
    let arr = []
    for (let file of dataRegisterEdit.photos) {
      arr.push(file)
      setPreview((url) => ({
        ...url,
        [file]: file,
      }))
    }
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
                    onClick={() => deleteImg(ob)}
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
