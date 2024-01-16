import React, { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import './statics.css'
import { getStatistics } from '../../utils/queryAPI/statistics'

const Statics = () => {
  const [allStatistics, setAllStatistics] = useState([])

  useEffect(() => {
    dataStatistics()
  }, [])

  const dataStatistics = async () => {
    const params = { deleted: false }
    const data = await getStatistics(params)
    setAllStatistics(data?.allStatistics)
  }

  return (
    <Row className='d-flex justify-content-around text-center'>
      {allStatistics.length > 0 &&
        allStatistics.map((d) => (
          <Col key={d._id} className='card-effect' xs={12} sm={6} md={4} lg={2}>
            <p className='static-number my-1'>{d.title}</p>
            <p className='static-data'>{d.description}</p>
          </Col>
        ))}
    </Row>
  )
}

export default Statics
