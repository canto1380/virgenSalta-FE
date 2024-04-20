import React, { useEffect, useState } from 'react'
import { Button, Form, Input, Select, Spin, Switch } from 'antd'
import { api } from '../../../utils/api'
import { deleteFile, uploadFile } from '../../../firebase/config'
import MsgError from '../../Messages/MsgError'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { CKEditor } from '@ckeditor/ckeditor5-react'
// import { SimpleUploadAdapter } from '@ckeditor/ckeditor5-upload';

const NewsAddEdit = ({
  data,
  dataRegisterEdit,
  loading,
  setLoading,
  userToken,
}) => {
  const [description, setDescription] = useState()
  const [imgData, setImgData] = useState()
  const [preview, setPreview] = useState({
    preview: '',
    progress: 0,
  })
  const [dataError, setDataError] = useState(false)
  const [messageError, setMessageError] = useState('')
  const [serverError, setServerError] = useState(false)
  const [switchHome, setSwitchHome] = useState(false)

  const URL_FIREBASE_IMG = 'img-noticias'

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

  const handleMultiple = async (e) => {
    if (!e.target.files || !e.target.files.length) return
    const files = Array.from(e.target.files)
    setImgData(files)
  }
  const handleSubmit = async (values) => {
    values.home = switchHome
    try {
      if (!dataRegisterEdit) {
        /** Carga IMG en Firebase **/
        values.description = description
        if (!imgData) {
          // alert('Debe seleccionar una/s imagen/es para continuar')
          // return

          const res = await api('POST', 'news', values, userToken)
          if (res.status === 200) {
            setLoading(true)
            setTimeout(() => {
              setLoading(false)
              window.location.href = '/admin/home/noticias'
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
          const objects = {}
          for (let file of imgData) {
            const preview = await getPreview(file)
            objects[file.name] = { preview }
          }
          const promises = imgData.map((file) => {
            return uploadFile(URL_FIREBASE_IMG, file)
          })
          const ls = await Promise.all(promises)
          /** Carga IMG en Firebase **/
          values.photos = ls
          const res = await api('POST', 'news', values, userToken)
          if (res.status === 200) {
            setLoading(true)
            setTimeout(() => {
              setLoading(false)
              window.location.href = '/admin/home/noticias'
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
      } else {
        values.description =
          description === undefined ? dataRegisterEdit.description : description
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
            setLoading(true)
            setTimeout(() => {
              setLoading(false)
              window.location.href = '/admin/home/noticias'
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
          let ls, dataImgUpdate
          let arr = []
          /** Si existe una nueva img seleccionada, se obtiene la url y se la agrega al arr ls que guardamos en la DB */
          if (imgData) {
            const objects = {}
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
          /** Carga IMG en Firebase **/
          values.photos = dataImgUpdate
          const res = await api(
            'PATCH',
            `news/${dataRegisterEdit._id}`,
            values,
            userToken
          )

          if (res.status === 200) {
            setLoading(true)
            setTimeout(() => {
              setLoading(false)
              window.location.href = '/admin/home/noticias'
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
        [file.name]: objectUrl,
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
        <CKEditor
          editor={ClassicEditor}
          data={dataRegisterEdit ? dataRegisterEdit.description : ''}
          onReady={(editor) => {}}
          onChange={(event, editor) => {
            const data = editor.getData()
            setDescription(data)
          }}
        />
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
            multiple
            onChange={handleMultiple}
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
          ? messageError.map((e, i) => <MsgError key={i} text2={e.msg} />)
          : null}
        {serverError ? <MsgError text2='Server internal Error' /> : null}
      </Form>
    </div>
  )
}

export default NewsAddEdit
