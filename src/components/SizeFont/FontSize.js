import React from 'react'
import { FaFont } from 'react-icons/fa'
import './fontSize.css'

const FontSize = ({ aumentarTexto, reducirTexto }) => {
  return (
    <div className='d-flex'>
      <button className='btn-size-letter me-2 btn-up-letter' onClick={aumentarTexto}>
        <FaFont
          title='Aumentar tamaño fuente'
          className={`sizeIcon1 cursorPointer`}
        />
      </button>

      <button className='btn-size-letter btn-down-letter' onClick={reducirTexto}>
        <FaFont
          title='Reducir tamaño fuente'
          className={`sizeIcon2 cursorPointer`}
        />
      </button>
    </div>
  )
}

export default FontSize
