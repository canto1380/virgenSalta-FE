import React, { useEffect, useRef } from 'react'

const MsgVirgenBody = ({ title, message, fontSize, typeMessage }) => {
  const messageRef = useRef(null) // Referencia para el contenedor de cada mensaje

  useEffect(() => {
    if (message && messageRef.current) {
      bodyText()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message])

  const bodyText = () => {
    const arr = message.split('</p>')
    messageRef.current.innerHTML = ''
    arr.forEach((d) => {
      messageRef.current.innerHTML += `${d}`
    })
  }
  console.log(typeMessage)
  return (
    <div className='px-5 py-3'>
      <div>
        {typeMessage !== 'Mensaje Central' && (
          <p
            className='title-msg-virgen mb-0'
            style={{ fontSize: `${fontSize}px` }}
          >
            {title}
          </p>
        )}
        <hr className='hor-line' />
      </div>
      <div
        className='text-msg'
        style={{ fontSize: `${fontSize}px` }}
        ref={messageRef}
      ></div>
    </div>
  )
}

export default MsgVirgenBody
