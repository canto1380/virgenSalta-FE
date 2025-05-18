import React, { useState, useEffect } from 'react'
import './title.css'
import { getConfigurations } from '../../utils/queryAPI/configurations'

const Title = () => {
  const [allConfigurations, setAllConfigurations] = useState(undefined)
  const [title, setTitle] = useState(undefined)
  const [slogan, setSlogan] = useState(undefined)
  const [isFontLoaded, setIsFontLoaded] = useState(false)

  useEffect(() => {
    dataConfig()
    loadFont()
  }, [])

  const dataConfig = async () => {
    const params = { deleted: false }
    const data = await getConfigurations(params)
    setAllConfigurations(data.allConfigurations)
  }
  const loadFont = () => {
    const font = new FontFace(
      'NovaQuinta',
      'url(/fonts/NOVAQUINTA_PERSONAL_USE_ONLY.OTF)'
    )
    font.load().then(() => {
      document.fonts.add(font)
      setIsFontLoaded(true)
    })
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
          {isFontLoaded && (
            <p className='px-2 phrase'>{slogan && slogan.mixedField}</p>
          )}
        </div>
      )}
    </>
  )
}

export default Title
