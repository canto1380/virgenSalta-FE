import React, {  useState } from 'react'
import { Tabs } from 'antd'
import './Schedules.css'

const ImportantDates = ({
  importantEvent,
  importantEventType,
  idImportantEventTypeDefault,
}) => {
  const [keyBtn, setKeyBtn] = useState(idImportantEventTypeDefault)

  const tabSelect = () => {
    return (
      <div>
        {importantEvent.map((data) => (
          <div key={data._id}>
            {data?.idImportantEventType._id === keyBtn && (
              <div className='pb-3'>
                <h5 className='title-event-type'>{data.eventName}</h5>
                <div>
                  <span>
                    {data?.time} - {data?.description}
                  </span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    )
  }
  const items = []
  importantEventType &&
    importantEventType.forEach((data, i) => {
      const obj = {
        key: data._id,
        label: data.name,
        children: tabSelect(),
      }
      items.push(obj)
    })

  const onChange = (key) => {
    setKeyBtn(key)
  }

  return (
    <>
      {importantEventType.length !== 0 && (
        <div className='container-event'>
          <h4 className='title-events'>Fechas Importantes</h4>
          <hr />
          <div>
            <Tabs
              defaultActiveKey={idImportantEventTypeDefault}
              items={items}
              onChange={onChange}
            />
          </div>
        </div>
      )}
    </>
  )
}

export default ImportantDates
