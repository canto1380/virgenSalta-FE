import React from 'react'
import { Input, Space, Radio, Select } from 'antd'

import '../menus.css'
import { Col } from 'react-bootstrap'

const { Search } = Input

const FiltersSchedules = ({
  deleted,
  setDeleted,
  setSearch,
  newsRoute,
  data,
  setIdEventType,
  setIdImportantEventType,
  typeBand
}) => {
  const onChange = (e) => {
    setDeleted(e.target.value)
  }
  const changeIdNewsCategory = (e) => {
    if(typeBand === 'Eventos') setIdEventType(e)
    setIdImportantEventType(e)
  }
  let options = []
  data?.forEach((d) => {
    const option = {
      value: d._id,
      label: d.eventName ||d.name,
    }
    options.push(option)
  })
  options.unshift({
    value: '',
    label: 'Todas',
  })

  return (
    <div className='container fluid mb-4 filterSchedules py-3'>
      <div>
        <p className='fw-bolder'>Filtros</p>
      </div>
      <div className='row d-flex justify-content-between align-items-center'>
        {newsRoute && (
          <Col xs={12} className='mb-3'>
            <span className='me-4'>{typeBand} por tipo:</span>
            <Select
              onChange={changeIdNewsCategory}
              showSearch
              style={{
                width: '100%',
              }}
              placeholder='Busque o seleccione'
              optionFilterProp='children'
              filterOption={(input, option) =>
                (option?.label ?? '').includes(input)
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? '')
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? '').toLowerCase())
              }
              options={options}
            />
          </Col>
        )}
        <p className='mb-1 mt-4'>Filtros de {typeBand}</p>
        <Col xs={12} lg={4} className='mb-3'>
          <Space direction='vertical' style={{ width: '100%' }}>
            <Search
              style={{ width: '100%' }}
              placeholder={`Nombre`}
              enterButton='Buscar'
              size='medium'
              width={100}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Space>
        </Col>
        <Col xs={12} lg={8} className='mb-3'>
          <span className='me-4'>{typeBand}: </span>
          <Radio.Group onChange={onChange} value={deleted}>
            <Radio value={undefined}>Todos</Radio>
            <Radio value={true}>Eliminados</Radio>
            <Radio value={false}>No eliminados</Radio>
          </Radio.Group>
        </Col>
      </div>
    </div>
  )
}

export default FiltersSchedules
