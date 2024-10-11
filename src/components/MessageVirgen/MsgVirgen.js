import React from 'react'
import MsgVirgenBody from './MsgVirgenBody'
import FilterMsgVirgen from './FilterMsgVirgen'

const MsgVirgen = ({ msg, setYear, text1, text2, filter }) => {
  return (
    <div className='pb-5'>
      <div className='px-5'>
        <p className='text1-msg-virgen mb-0'>{text1}</p>
        <p className='text3-msg-virgen mb-0'>{text2}</p>
      </div>
      {filter === true && <FilterMsgVirgen setYear={setYear} />}
      <div className='px-5'>
        {msg.length > 0 ? (
          msg?.map((data, i) => (
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
