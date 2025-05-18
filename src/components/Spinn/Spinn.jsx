import React from 'react'
import { Spinner } from 'react-bootstrap'
const Spinn = ({ type }) => {
  return type === 'data' ? (
    <Spinner
      className='text-center'
      animation='border'
      role='status'
      variant='secondary'
    >
      <span className='visually-hidden text-center'>Loading...</span>
    </Spinner>
  ) : (
    <Spinner className='text-center' animation='grow' variant='success' />
  )
}

export default Spinn
