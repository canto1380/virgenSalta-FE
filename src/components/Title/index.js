import React, { useState, useEffect } from 'react'
import './title.css'
import { getConfigurations } from '../../utils/queryAPI/configurations'

const Title = () => {
  const [allConfigurations, setAllConfigurations] = useState(undefined)
  const [title, setTitle] = useState(undefined)
  const [slogan, setSlogan] = useState(undefined)

  useEffect(() => {
    dataConfig()
  }, [])

  const dataConfig = async () => {
    const params = { deleted: false }
    const data = await getConfigurations(params)
    setAllConfigurations(data.allConfigurations)
  }

  useEffect(() => {
    dataTitles()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allConfigurations])

  const dataTitles = async () => {
    const titulo = allConfigurations?.find((d) => d.title === 'Título')
    const lema = allConfigurations?.find((d) => d.title === 'Título lema')

    setTitle(titulo)
    setSlogan(lema)
  }
  return (
    <>
      {!allConfigurations ? null : (
        <div className='text-center pt-5 pb-3 container-title'>
          <p className='title1'>{title && title.mixedField}</p>
          <p className='phrase'>{slogan && slogan.mixedField}</p>
        </div>
      )}
    </>
  )
}

export default Title
