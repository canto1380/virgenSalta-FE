import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const HeaderSections = ({ title, linkRef, styleAdd, titleBtn, blank }) => {
  return (
    <Row className=''>
      <Col xs={7} className='text-start d-flex align-items-center'>
        <h4 className={`section-title mb-0 ${styleAdd}`}>{title}</h4>
      </Col>
      <Col xs={5} className='text-end'>
        <Link
          to={linkRef}
          target={blank && '_blank'}
          className='btn section-btn'
        >
          {titleBtn ? titleBtn : 'Ver todo'}
        </Link>
      </Col>
    </Row>
  )
}

export default HeaderSections
