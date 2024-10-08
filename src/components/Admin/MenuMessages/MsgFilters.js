import React from 'react'
import '../menus.css'
import { Col } from 'react-bootstrap'
import { Radio, Select, Space } from 'antd'
import Search from 'antd/es/input/Search'

const MsgFilters = ({
  setSearch,
  deleted,
  setDeleted,
  setPageSelected,
  setYear,
}) => {
  const options = [
    { value: 'Todos', label: 'Todos' },
    {
      value: 1,
      label: 1990,
    },
    {
      value: 2,
      label: 1991,
    },
    {
      value: 3,
      label: 1992,
    },
    {
      value: 4,
      label: 1993,
    },
    {
      value: 5,
      label: 1994,
    },
    {
      value: 6,
      label: 1995,
    },
    {
      value: 7,
      label: 1996,
    },
    {
      value: 8,
      label: 1997,
    },
    {
      value: 9,
      label: 1998,
    },
    {
      value: 10,
      label: 1999,
    },
    {
      value: 11,
      label: 2000,
    },
    {
      value: 12,
      label: 2001,
    },
    {
      value: 13,
      label: 2002,
    },
    {
      value: 14,
      label: 2003,
    },
    {
      value: 15,
      label: 2004,
    },
    {
      value: 16,
      label: 2005,
    },
    {
      value: 17,
      label: 2006,
    },
    {
      value: 18,
      label: 2007,
    },
    {
      value: 19,
      label: 2008,
    },
    {
      value: 20,
      label: 2009,
    },
    {
      value: 21,
      label: 2010,
    },
    {
      value: 22,
      label: 2011,
    },
    {
      value: 23,
      label: 2012,
    },
    {
      value: 24,
      label: 2013,
    },
    {
      value: 25,
      label: 2014,
    },
    {
      value: 26,
      label: 2015,
    },
    {
      value: 27,
      label: 2016,
    },
    {
      value: 28,
      label: 2017,
    },
    {
      value: 29,
      label: 2018,
    },
    {
      value: 30,
      label: 2019,
    },
    {
      value: 31,
      label: 2020,
    },
    {
      value: 32,
      label: 2021,
    },
    {
      value: 33,
      label: 2022,
    },
    {
      value: 34,
      label: 2023,
    },
    {
      value: 35,
      label: 2024,
    },
  ]
  const handleChange = (e) => {
    setSearch(e.target.value)
    setPageSelected(1)
  }
  const changeAnioMensaje = (e) => {
    setYear(e)
  }
  const onChange = (e) => {
    setDeleted(e.target.value)
  }
  return (
    <div className='menuContainer'>
      <div>
        <p className='fw-bolder'>Filtros</p>
      </div>
      <div className='row d-flex justify-content-start align-items-center'>
        <Col xs={12} lg={4} className='mb-3'>
          <span className='me-4'>Título:</span>
          <Space direction='vertical' style={{ width: '100%' }}>
            <Search
              style={{ width: '100%' }}
              placeholder={`Título del mensaje`}
              enterButton='Buscar'
              size='medium'
              width={100}
              onChange={(e) => handleChange(e)}
            />
          </Space>
        </Col>

        <Col xs={12} lg={4} className='mb-3'>
          <span className='me-4'>Año:</span>
          <Select
            onChange={changeAnioMensaje}
            showSearch
            style={{
              width: '100%',
            }}
            placeholder='Busque o seleccione'
            optionFilterProp='children'
            filterOption={(input, option) =>
              (option?.label ?? '').includes(input)
            }
            filterSort={(optionA, optionB) => optionA?.label ?? ''}
            options={options}
          />
        </Col>
        <Col xs={12} lg={8} className='mb-3'>
          <span className='me-4'>Filtrar por: </span>
          <Radio.Group onChange={onChange} value={deleted}>
            <Radio value={undefined}>Todas</Radio>
            <Radio value={true}>Eliminadas</Radio>
            <Radio value={false}>No eliminadas</Radio>
          </Radio.Group>
        </Col>
      </div>
    </div>
  )
}

export default MsgFilters
