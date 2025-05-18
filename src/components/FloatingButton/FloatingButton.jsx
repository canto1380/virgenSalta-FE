import React, { useState, useEffect } from 'react'
import './floatingButton.css'
import { FaLongArrowAltUp } from 'react-icons/fa'

const FloatingButton = () => {
  const [isVisible, setIsVisible] = useState(false)

  // Función para detectar la posición del scroll
  const handleScroll = () => {
    const scrollPosition = window.scrollY
    // Ajusta el valor '200' según cuándo quieras que aparezca el botón
    if (scrollPosition > 200) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }

  // Función para desplazarse al inicio de la página
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    // Agregar evento de scroll
    window.addEventListener('scroll', handleScroll)

    // Limpiar el evento de scroll al desmontar el componente
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  return (
    <>
      {isVisible && (
        <div className='floating-button'>
          <div className='blinking-dot'></div>
          <button onClick={scrollToTop} className='btn-floating'>
            <FaLongArrowAltUp className='icon-btn-floating' />
          </button>
        </div>
      )}
    </>
  )
}

export default FloatingButton
