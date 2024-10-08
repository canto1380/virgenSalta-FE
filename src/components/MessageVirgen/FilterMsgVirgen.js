import { Select } from 'antd'
import React from 'react'
import { Col } from 'react-bootstrap'

const FilterMsgVirgen = ({ setYear }) => {
  const onChangeYear = (e) => {
    setYear(e)
  }
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
  return (
    <div className='menuContainer px-5 py-0'>
      <div className='row d-flex justify-content-between align-items-center'>
        <Col xs={12} className='my-3'>
          <Select
            onChange={onChangeYear}
            showSearch
            style={{
              width: '100%',
            }}
            placeholder='Seleccione año'
            optionFilterProp='children'
            filterOption={(input, option) =>
              (option?.label ?? '').includes(input)
            }
            // filterSort={(optionA, optionB) =>
            //   (optionA?.label ?? '')
            //     .toLowerCase()
            //     .localeCompare((optionB?.label ?? '').toLowerCase())
            // }
            options={options}
          />
        </Col>
      </div>
    </div>
  )
}

export default FilterMsgVirgen
