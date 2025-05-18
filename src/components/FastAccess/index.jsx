import React, { useEffect, useState } from 'react'
import { getFastAccess } from '../../utils/queryAPI/fastAccess'

const FastAccess = () => {
  const [allFastAccess, setAllFastAccess] = useState([])

  useEffect(() => {
    dataFastAccess()
  }, [])
  const dataFastAccess = async () => {
    const params = { deleted: false }
    const data = await getFastAccess(params)
    setAllFastAccess(data?.allFastAccess)
  }
  return (
    <div className='row justify-content-center text-center'>
      {allFastAccess.length < 1
        ? null
        : allFastAccess.map((d) => (
            <div key={d._id} className='col-xs-12 col-sm-4 col-lg-3 mb-3'>
              <a href={`/${d.url}`} className='btn section-btn w-100'>
                {d.title}
              </a>
            </div>
          ))}
    </div>
  )
}

export default FastAccess
