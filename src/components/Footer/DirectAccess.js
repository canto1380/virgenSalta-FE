import React, { useEffect, useState } from 'react'
import { getFooter } from '../../utils/queryAPI/footer'

const DirectAccess = () => {
  const [allDirectAccess, setAllDirectAccess] = useState([])

  useEffect(() => {
    dataDirectAccess()
  }, [])
  const dataDirectAccess = async () => {
    const params = { deleted: false }
    const data = await getFooter(params)
    const dataSlice = data?.allDirectAccessFooter
    setAllDirectAccess(dataSlice.slice(0, 7))
  }
  return (
    <div>
      <div className='pb-4'>
        <h4 className='title-section-footer'> ACCESO RAPIDO</h4>
      </div>
      <div className='container-section'>
        {allDirectAccess.length > 0 &&
          allDirectAccess.map((d) => (
            <a
              key={d._id}
              href={`/${d.urlRedirect}`}
              className=''
              target={`${d.newWindows === true ? '_blank' : '_self'}`}
              rel='noopener noreferrer'
            >
              <p>{d.title}</p>
            </a>
          ))}
      </div>
    </div>
  )
}

export default DirectAccess
