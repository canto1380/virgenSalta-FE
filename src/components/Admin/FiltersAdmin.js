import React from 'react'
import { Input, Space, Radio, Select } from 'antd'

import './menus.css'
import { Col } from 'react-bootstrap'

const { Search } = Input

const FiltersAdmin = ({
  deleted,
  setDeleted,
  setSearch,
  newsRoute,
  data,
  setIdNewsCategory,
  setPageSelected
}) => {
  const onChange = (e) => {
    setDeleted(e.target.value)
  }
  const changeIdNewsCategory = (e) => {
    setIdNewsCategory(e)
  }

  let options = []
  data?.forEach((d) => {
    const option = {
      value: d._id,
      label: d.nameCategory ? d.nameCategory : d.eventName,
    }
    options.push(option)
  })
  options.unshift({
    value: null,
    label: 'Todas',
  })

  const handleChange = (e) => {
    setSearch(e.target.value)
    setPageSelected(1)
  }
  return (
    <div className='menuContainer'>
      <div>
        <p className='fw-bolder'>Filtros</p>
      </div>
      <div className='row d-flex justify-content-between align-items-center'>
        <Col xs={12} lg={4} className='mb-3'>
          <Space direction='vertical' style={{ width: '100%' }}>
            <Search
              style={{ width: '100%' }}
              placeholder={`Nombre de ${newsRoute ? 'noticia' : 'categoría'}`}
              enterButton='Buscar'
              size='medium'
              width={100}
              onChange={(e) => handleChange(e)}
              // onChange={(e) => setSearch(e.target.value)}
            />
          </Space>
        </Col>
        <Col xs={12} lg={8} className='mb-3'>
          <span className='me-4'>Filtrar por: </span>
          <Radio.Group onChange={onChange} value={deleted}>
            <Radio value={undefined}>Todas</Radio>
            <Radio value={true}>Eliminadas</Radio>
            <Radio value={false}>No eliminadas</Radio>
          </Radio.Group>
        </Col>
        {newsRoute && (
          <Col xs={12} lg={4} className='my-3'>
            <span className='me-4'>Categoría:</span>
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
      </div>
    </div>
  )
}

export default FiltersAdmin
