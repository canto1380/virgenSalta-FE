import React, { useState, useEffect } from 'react'
import MsgVirgenBody from './MsgVirgenBody'
import FilterMsgVirgen from './FilterMsgVirgen'
import FontSize from '../SizeFont/FontSize'

const MsgVirgen = ({ msg, setYear, text1, text2, filter }) => {
  const [fontSize, setFontSize] = useState(14)
  const [isVisible, setIsVisible] = useState(false)

  const aumentarTexto = () => {
    setFontSize((prevSize) => prevSize + 2)
  }
  const reducirTexto = () => {
    setFontSize((prevSize) => (prevSize > 10 ? prevSize - 2 : prevSize)) // Evita que sea demasiado pequeño
  }

  // Función para detectar la posición del scroll
  const handleScroll = () => {
    const scrollPosition = window.scrollY
    console.log(scrollPosition, isVisible)
    // Ajusta el valor '200' según cuándo quieras que aparezca el botón
    if (scrollPosition > 200) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }

  useEffect(() => {
    // Agregar evento de scroll
    window.addEventListener('scroll', handleScroll)

    // Limpiar el evento de scroll al desmontar el componente
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  console.log(isVisible)
  return (
    <div className='pb-5'>
      <div className='px-5'>
        <p className='text1-msg-virgen mb-0'>{text1}</p>
        <p className='text3-msg-virgen mb-0'>{text2}</p>
      </div>
      {filter === true && <FilterMsgVirgen setYear={setYear} />}
      <div className='px-5'>
        {isVisible && (
          <FontSize aumentarTexto={aumentarTexto} reducirTexto={reducirTexto} />
        )}
        {msg.length > 0 ? (
          msg?.map((data, i) => (
            <MsgVirgenBody
              title={data?.title}
              message={data?.message}
              key={i}
              fontSize={fontSize}
            />
          ))
        ) : (
          <p className='text-danger fw-bold px-5'>No se encontraron mensajes</p>
        )}
      </div>
    </div>
  )
}

export default MsgVirgen
