import React, { useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import CardGeneric from '../Cards/CardGeneric'
import HeaderSections from '../Title/HeaderSections'
import { getNewsCategory } from '../../utils/queryAPI/newsCategory'

const Sections = () => {
  const [category, setCategory] = useState()

  useEffect(() => {
    dataNewsCategory()
  }, [])

  const dataNewsCategory = async () => {
    const params = { limit: 6, deleted: false }
    const data = await getNewsCategory(params)
    setCategory(data?.allNewsCategory)
  }

  return (
    <>
      <HeaderSections title={'Categorias'} linkRef={'/categorias'} />
      <Row className='mt-3 mb-5 cont-row-categ'>
        {category?.map((secc, i) => (
          <Col key={i} xs={12} md={6} lg={4} className='mb-4'>
            <CardGeneric info={secc} typeFlag='newsCategories' />
          </Col>
        ))}
      </Row>
    </>
  )
}

export default Sections
