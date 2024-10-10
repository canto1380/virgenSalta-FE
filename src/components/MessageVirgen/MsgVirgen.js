import React from 'react'
import MsgVirgenBody from './MsgVirgenBody'
import FilterMsgVirgen from './FilterMsgVirgen'

const MsgVirgen = ({ msgVirgen, setYear }) => {
  return (
    <div className='pb-5'>
      <div className='px-5'>
        <p className='text1-msg-virgen mb-0'>
          Mensajes dados por La Santísima Virgen
        </p>
        <p className='text3-msg-virgen mb-0'>Salta - Argentina</p>
      </div>
      <FilterMsgVirgen setYear={setYear} />
      <div className='px-5'>
        {msgVirgen.length > 0 ? (
          msgVirgen?.map((data, i) => (
            <MsgVirgenBody
              title={data?.title}
              message={data?.message}
              key={i}
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
