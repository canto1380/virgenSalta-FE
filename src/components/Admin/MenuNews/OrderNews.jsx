import React from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineOrderedList } from 'react-icons/ai'

const OrderNews = ({ title }) => {
  return (
    <div className='menuContainer mb-0 d-flex justify-content-between align-items-center'>
      <div>
        <p className='fw-bolder mb-0'>{title}</p>
      </div>
      <div>
        <Link
          to={`/admin/home/orden-noticias`}
          className='btn section-btn d-flex align-items-center'
        >
          <AiOutlineOrderedList
            style={{
              fontSize: 20,
              marginRight: 5,
            }}
          />
          Orden
        </Link>
      </div>
    </div>
  )
}

export default OrderNews
