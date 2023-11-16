import React from 'react'
import { Input, Space, Radio, Select } from 'antd'
import '../menus.css'
import { Col } from 'react-bootstrap'

const { Search } = Input

const FiltersNavbar = ({
  visible,
  setVisible,
  setSearch,
  newsRoute,
  data,
  setIdItemNavCategory,
}) => {
  const onChange = (e) => {
    setVisible(e.target.value)
  }
  const changeIdItemNavbarCategory = (e) => {
    setIdItemNavCategory(e)
  }

  let options = []
  data?.forEach((d) => {
    const option = {
      value: d._id,
      label: d.itemNavCategory,
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
            <span className='me-4'>Elegir Sección:</span>
            <Select
              onChange={changeIdItemNavbarCategory}
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
        <p className='mb-1 mt-4'>Buscar por item</p>
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
          <span className='me-4'>Items: </span>
          <Radio.Group onChange={onChange} value={visible}>
            <Radio value={undefined}>Todos</Radio>
            <Radio value={true}>Visibles</Radio>
            <Radio value={false}>No visibles</Radio>
          </Radio.Group>
        </Col>
      </div>
    </div>
  )
}

export default FiltersNavbar
