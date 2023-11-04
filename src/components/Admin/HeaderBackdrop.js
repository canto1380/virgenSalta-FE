import React from 'react'
import { AiOutlineSelect } from 'react-icons/ai'
import { BsArrowReturnLeft } from 'react-icons/bs'
import { Link } from 'react-router-dom'

const HeaderBackdrop = ({ title, idTab, bandSelect }) => {
  return (
    <div className='menuContainer mb-0 d-flex justify-content-between align-items-center'>
      <div>
        <p className='fw-bolder mb-0'>{title}</p>
      </div>
      <div>
        {bandSelect ? (
          <Link
            to={`/admin/home/${idTab}/backdrop`}
            className='btn section-btn d-flex align-items-center'
          >
            <AiOutlineSelect
              style={{
                fontSize: 20,
                marginRight: 5,
              }}
            />
            Selccionar
          </Link>
        ) : (
          <Link
            to={`/admin/home/${idTab}`}
            className='btn section-btn d-flex align-items-center'
          >
            <BsArrowReturnLeft
              style={{
                fontSize: 20,
                marginRight: 5,
              }}
            />
            Volver
          </Link>
        )}
      </div>
    </div>
  )
}

export default HeaderBackdrop
