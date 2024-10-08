import React from 'react'
import MsgVirgenBody from './MsgVirgenBody'
import FilterMsgVirgen from './FilterMsgVirgen'

const MsgVirgen = ({ msgVirgen, setYear }) => {
  return (
    <div>
      <div className='px-5'>
        <p className='text1-msg-virgen mb-0'>
          Mensajes dados por La Santísima Virgen
        </p>
        <p className='text3-msg-virgen mb-0'>Salta - Argentina</p>
      </div>
      <FilterMsgVirgen setYear={setYear} />
      <div className='px-5'>
        {msgVirgen.length > 0 ? (
          msgVirgen?.map((data) => (
            <MsgVirgenBody title={data?.title} message={data?.message} />
          ))
        ) : (
          <p className='text-danger fw-bold'>No se encontraron mensajes</p>
        )}
      </div>
    </div>
  )
}

export default MsgVirgen
