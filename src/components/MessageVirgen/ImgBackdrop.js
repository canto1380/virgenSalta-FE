import React, { useEffect, useState } from 'react'
import { getBackdrop } from '../../utils/queryAPI/backdrop'
import './message.css'

const ImgBackdrop = ({ type }) => {
  const [imgBackdropMsg, setimgBackdropMsg] = useState('')

  useEffect(() => {
    getDataImg()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imgBackdropMsg])
  const getDataImg = async () => {
    const params = { search: type }
    const res = await getBackdrop(params)
    const data = res?.allBackdrops[0]?.backdrop
    setimgBackdropMsg(data)
  }
  console.log(imgBackdropMsg)

  return (
    <div className='pt-5 d-flex justify-content-center'>
      {imgBackdropMsg && imgBackdropMsg !== '' && (
        <div className='text-center container-backdrop-msg'>
          <img
            src={imgBackdropMsg}
            alt='Mensajes de la Virgen'
            className='img-backdrop-msg'
          />
        </div>
      )}
    </div>
  )
}
export default ImgBackdrop
