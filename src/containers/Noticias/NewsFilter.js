import React from 'react'
import { Col } from 'react-bootstrap'
import { Select, Input, Form } from 'antd'

const { Search } = Input

const NewsFilter = ({
  setSearch,
  setIdNewsCategory,
  data,
  typeFlag,
  setPageSelected,
}) => {
  const changeIdNewsCategory = (e) => {
    setIdNewsCategory(e)
    setPageSelected(1)
  }

  let options = []
  data?.forEach((d) => {
    const option = {
      value: d._id,
      label: d.nameCategory,
    }
    options.push(option)
  })
  options.unshift({
    value: '',
    label: 'Todas',
  })
  const handleSearchInput = (e) => {
    setSearch(e.target.value)
    setPageSelected(1)
  }

  return (
    <div className=''>
      <div>
        <p className='fw-bolder mb-0'>Filtros</p>
      </div>
      <div className='row d-flex justify-content-start align-items-top'>
        {typeFlag === 'news' && (
          <Col xs={12} md={4} className='my-3'>
            <Form
              labelCol={{ span: 7 }}
              wrapperCol={{ span: 20 }}
              layout='horizontal'
            >
              <Form.Item name='gender' label='Categoría'>
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
              </Form.Item>
            </Form>
          </Col>
        )}
        <Col xs={12} md={4} className='my-3'>
          <Form labelCol={{ span: 7 }} wrapperCol={{ span: 20 }}>
            <Form.Item name='gender' label='Buscar'>
              <Search onChange={(e) => handleSearchInput(e)} />
            </Form.Item>
          </Form>
        </Col>
        <hr />
      </div>
    </div>
  )
}

export default NewsFilter
