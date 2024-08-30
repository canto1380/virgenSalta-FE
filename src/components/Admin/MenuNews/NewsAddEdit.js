import React, { useEffect, useState } from 'react'
import { Button, Form, Input, Select, Spin, Switch } from 'antd'
import { api } from '../../../utils/api'
import { deleteFile, uploadFile } from '../../../firebase/config'
import MsgError from '../../Messages/MsgError'
import imageCompression from 'browser-image-compression'
// import App from '../../../ckeditor5/Ckeditor'
const NewsAddEdit = ({
  data,
  dataRegisterEdit,
  loading,
  setLoading,
  userToken,
}) => {
  // const [description, setDescription] = useState()
  const [imgData, setImgData] = useState([])
  const [preview, setPreview] = useState([])
  const [dataError, setDataError] = useState(false)
  const [messageError, setMessageError] = useState('')
  const [serverError, setServerError] = useState(false)
  const [switchHome, setSwitchHome] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [newImages, setNewImages] = useState([]) // Nuevas imágenes a subir

  // const estado = process.env.REACT_APP_API ? process.env.REACT_APP_API : null
  // console.log(estado)
  // const URL_FIREBASE_IMG = estado !== null ? 'img-noticias-dev' : 'img-noticias'
  const URL_FIREBASE_IMG = 'img-noticias'

  useEffect(() => {
    if (dataRegisterEdit) {
      setSwitchHome(dataRegisterEdit.home)
    }
  }, [dataRegisterEdit])

  const getPreview = (file) => {
    const fileReader = new FileReader()
    fileReader.readAsDataURL(file)
    return new Promise((res, rej) => {
      fileReader.onload = () => {
        res(fileReader.result)
      }
    })
  }

  const handleHomeVisible = (e) => {
    setSwitchHome(e)
  }

  // const handleEditorReady = (editor) => {
  //   editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
  //     return MyUploadAdapter(loader)
  //   }
  // }

  // const MyUploadAdapter = (loader) => {
  //   return {
  //     upload: () => {
  //       return new Promise((resolve, reject) => {
  //         const data = new FormData()
  //         loader.file.then((file) => {
  //           data.append('file', file)
  //           uploadFile(URL_FIREBASE_IMG, file)
  //         })
  //       })
  //     },
  //     abort: () => {
  //       // Aquí puedes manejar la cancelación de la subida si es necesario
  //     },
  //   }
  // }

  const handleImageChange = async (event) => {
    /** CONVERTIR A WEBP **/
    const files = Array.from(event.target.files)
    const compressedFiles = []

    // Opciones de compresión y conversión
    const options = {
      maxSizeMB: 0.1, // Tamaño máximo del archivo en MB
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
    /******/

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
      values.home = switchHome
      /** Carga IMG en Firebase **/
      // values.description = description
      if (!imgData) {
        // alert('Debe seleccionar una/s imagen/es para continuar')
        // return
        const res = await api('POST', 'news', values, userToken)
        if (res.status === 200) {
          setUploading(true)
          setLoading(true)
          setTimeout(() => {
            setUploading(false)
            setLoading(false)
            window.location.href = '/admin/home/noticias'
          }, 2500)
        }
        if (res?.response?.status === 400) {
          setUploading(true)
          setLoading(true)
          const arraysError = res?.response?.data?.errors
          setMessageError(arraysError)
          setDataError(true)
          setTimeout(() => {
            setUploading(false)
            setDataError(false)
            setLoading(false)
          }, 3000)
        }
      } else {
        const objects = {}
        for (let file of imgData) {
          const preview = await getPreview(file)
          objects[file.name] = { preview }
        }
        const promises = imgData.map((file) => {
          return uploadFile(URL_FIREBASE_IMG, file)
        })
        const ls = await Promise.all(promises)
        values.photos = ls
        const res = await api('POST', 'news', values, userToken)
        if (res.status === 200) {
          setUploading(true)
          setLoading(true)
          setTimeout(() => {
            setUploading(false)
            setLoading(false)
            window.location.href = '/admin/home/noticias'
          }, 2500)
        }
        if (res?.response?.status === 400) {
          setUploading(true)
          setLoading(true)
          const arraysError = res?.response?.data?.errors
          setMessageError(arraysError)
          setDataError(true)
          setTimeout(() => {
            setUploading(false)
            setDataError(false)
            setLoading(false)
          }, 3000)
        }
      }
    } catch (error) {
      setServerError(error)
    }
  }
  const handleActualizar = async (values) => {
    try {
      values.home = switchHome
      // values.description =
      //   description === undefined ? dataRegisterEdit.description : description
      /** Carga IMG en Firebase **/
      /** Si no existe imgData o no tiene nada y preview tampoco */
      if (
        (!imgData || imgData.length === 0) &&
        (!preview || Object.keys(preview).length === 0)
      ) {
        values.photos = []
        const res = await api(
          'PATCH',
          `news/${dataRegisterEdit._id}`,
          values,
          userToken
        )

        if (res.status === 200) {
          setUploading(true)
          setLoading(true)
          setTimeout(() => {
            setLoading(false)
            setUploading(false)
            window.location.href = '/admin/home/noticias'
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
      } else {
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
          `news/${dataRegisterEdit._id}`,
          values,
          userToken
        )

        if (res.status === 200) {
          setUploading(true)
          setLoading(true)
          setTimeout(() => {
            setLoading(false)
            setUploading(false)
            window.location.href = '/admin/home/noticias'
          }, 2500)
        }
        if (res?.response?.status === 400) {
          setUploading(true)
          setLoading(true)
          const arraysError = res?.response?.data?.errors
          setMessageError(arraysError)
          setDataError(true)
          setTimeout(() => {
            setUploading(false)
            setDataError(false)
            setLoading(false)
          }, 3000)
        }
      }
    } catch (error) {
      setServerError(error)
      console.log(error)
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
          title: dataRegisterEdit?.title,
          subtitle: dataRegisterEdit?.subtitle,
          description: dataRegisterEdit?.description,
          idNewsCategory: dataRegisterEdit?.idNewsCategory?._id,
          caption: dataRegisterEdit?.caption,
          home: dataRegisterEdit?.home,
        }}
      >
        <Form.Item
          label='Título Noticia'
          name='title'
          rules={[
            { required: true, message: 'Debe ingresar un nombre' },
            {
              min: 5,
              message: 'No puede tener menos de 5 caracteres',
            },
            {
              max: 150,
              message: 'No puede tener mas de 150 caracteres',
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
              min: 5,
              message: 'No puede tener menos de 5 caracteres',
            },
            {
              max: 150,
              message: 'No puede tener mas de 150 caracteres',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label='Categoría'
          name='idNewsCategory'
          rules={[
            { required: true, message: 'Debe seleccionar una categoría' },
          ]}
        >
          <Select>
            {data.map((d) => (
              <Select.Option key={d?._id} value={d?._id}>
                {d?.nameCategory}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <div>
          <p>
            <span className='text-danger fw-bolder'>*</span>Descripción
          </p>
        </div>
        {/* <CKEditor
          disabled={uploading ? true : false}
          editor={ClassicEditor}
          config={editorConfiguration}
          data={dataRegisterEdit ? dataRegisterEdit.description : ''}
          onReady={handleEditorReady}
          onChange={(event, editor) => {
            const data = editor.getData()
            setDescription(data)
          }}
        /> */}
        {/* <App
          setDescription={setDescription}
          handleEditorReady={handleEditorReady}
          data={dataRegisterEdit ? dataRegisterEdit.description : ''}
        /> */}

        <div className='mt-4'>
          <p>Imágenes</p>
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
                    className='btn-contianer-delete'
                  >
                    <p className='mb-0'>x</p>
                  </div>
                </div>
              </div>
            ))}

          <input
            className='btnUpload'
            disabled={uploading ? true : false}
            type='file'
            name=''
            id='id-btn-upload'
            multiple
            onChange={handleImageChange}
          />
          <label
            htmlFor='id-btn-upload'
            className='d-flex text-center align-items-center btnUpload'
          >
            Agregar imagen
          </label>
        </div>

        <Form.Item
          label='Pie de foto principal (Primera foto seleccionada)'
          name='caption'
          rules={[
            {
              max: 100,
              message: 'No puede tener mas de 100 caracteres',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label='Visible en inicio'
          valuePropName='checked'
          name='home'
        >
          <Switch onChange={handleHomeVisible} />
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
        {dataError
          ? messageError?.map((e, i) => <MsgError key={i} text2={e.msg} />)
          : null}
        {serverError ? <MsgError text2='Server internal Error' /> : null}
      </Form>
    </div>
  )
}

export default NewsAddEdit
