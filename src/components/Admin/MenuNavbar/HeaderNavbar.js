import React from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { BiArrowBack } from 'react-icons/bi'
import { Button } from 'antd'

const HeaderNavbar = ({
  title,
  titleEdit,
  formAdd,
  setFormAdd,
  loading,
  formEdit,
  setFormEdit,
  resetValuesEdit,
  bandType,
  setRouteAPI,
}) => {
  const changeBand = () => {
    setRouteAPI('itemNavCategory')
    setFormAdd(!formAdd)
  }
  const changeBandItem = () => {
    setRouteAPI('itemNav')
    setFormAdd(!formAdd)
  }
  const changeBandRetur = () => {
    setRouteAPI('')
    resetValuesEdit(null, '')
    setFormAdd(false)
    setFormEdit(false)
  }
  return (
    <div
      className={`${
        !bandType ? 'menuContainer' : 'mb-4'
      } mb-0 d-flex justify-content-between align-items-center`}
    >
      <div>
        <p className='fw-bolder mb-0'>{formEdit ? titleEdit : title}</p>
      </div>
      <div>
        {!formAdd && !formEdit ? (
          <div className='d-flex'>
            <Button
              onClick={changeBand}
              className='btn section-btn d-flex align-items-center me-3'
            >
              <AiOutlinePlus
                style={{
                  fontSize: 20,
                  marginRight: 5,
                }}
              />
              Sección
            </Button>
            <Button
              onClick={changeBandItem}
              className='btn section-btn d-flex align-items-center'
            >
              <AiOutlinePlus
                style={{
                  fontSize: 20,
                  marginRight: 5,
                }}
              />
              Item
            </Button>
          </div>
        ) : (
          <Button
            onClick={changeBandRetur}
            variant='outline'
            to={'/'}
            className={`btn section-btn d-flex align-items-center ${
              loading && `enabledField`
            }`}
          >
            <BiArrowBack
              style={{
                fontSize: 20,
                marginRight: 5,
              }}
            />
            Volver
          </Button>
        )}
      </div>
    </div>
  )
}

export default HeaderNavbar
