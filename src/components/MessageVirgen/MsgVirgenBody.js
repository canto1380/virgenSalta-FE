import React, { useEffect } from 'react'

const MsgVirgenBody = ({ title, message }) => {
  useEffect(() => {
    if (message) {
      bodyText()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const bodyText = () => {
    const arr = message.split('</p>')
    const bodyText = document.querySelector('.text-msg')
    arr.forEach((d, i) => {
      bodyText.innerHTML += `${d}`
    })
  }
  return (
    <div className='px-5 py-3'>
      <div>
        <p className='title-msg-virgen mb-0'>{title}</p>
        <hr className='hor-line' />
      </div>
      <div className='text-msg'></div>
    </div>
  )
}

export default MsgVirgenBody
