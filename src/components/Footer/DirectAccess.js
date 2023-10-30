import React from 'react'

const DirectAccess = () => {
  return (
    <div>
      <div className='pb-4'>
        <h4 className='title-section-footer'> ACCESO RAPIDO</h4>
      </div>
      <div className='container-section'>
        <a href={'/pedido-oracion'} className=''>
          <p>Pedidos de oración</p>
        </a>
        <a href={'/horarios'} className=''>
          <p>Horarios</p>
        </a>
        <a href={'/'} className=''>
          <p>Capilla en vivo</p>
        </a>
        <a
          href={'https://www.instagram.com/obra.imcej.sacej/'}
          target='_blank'
          rel='noopener noreferrer'
          className=''
        >
          <p>Instagram</p>
        </a>
        <a
          href={'https://www.youtube.com/@ObraInmaculadaMadreIMCEJySACEJ'}
          target='_blank'
          rel='noopener noreferrer'
          className=''
        >
          <p>Youtube</p>
        </a>
      </div>
    </div>
  )
}

export default DirectAccess
