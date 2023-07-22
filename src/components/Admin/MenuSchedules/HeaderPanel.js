import React from 'react'
import { Button } from 'react-bootstrap'

const HeaderPanel = ({ visible, setVisible }) => {
  return (
    <div>
      <Button
        onClick={() => setVisible(!visible)}
        className='fw-bold subTab-btn'
        size='sm'
        variant='outline-dark'
      >
        Agregar
      </Button>
    </div>
  )
}

export default HeaderPanel
