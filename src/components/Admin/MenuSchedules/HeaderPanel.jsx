import React from 'react'
import { Button } from 'react-bootstrap'

const HeaderPanel = ({ visible, setVisible, setScheduleType, title }) => {
  const handleClick = () => {
    setVisible(!visible)
    setScheduleType(title)
  }
  return (
    <div>
      <Button
        // onClick={() => setVisible(!visible)}
        onClick={() =>handleClick()}
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
