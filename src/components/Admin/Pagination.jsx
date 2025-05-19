import React from 'react'
import { Pagination } from 'antd'

const PaginationAdmin = ({ data, pageSelected, setPageSelected, setLimit }) => {
  const onShowSizeChange = (page, pageSize) => {
    setLimit(pageSize)
  }
  return (
    <div className='menuContainer text-end'>
      <Pagination
        defaultCurrent={pageSelected}
        current={pageSelected}
        showSizeChange
        onShowSizeChange={onShowSizeChange}
        defaultPageSize={data?.foundRegisters}
        total={data?.totalRegister}
        onChange={(page, pageSize) => setPageSelected(page, pageSize)}
      />
      <br />
    </div>
  )
}
export default PaginationAdmin
