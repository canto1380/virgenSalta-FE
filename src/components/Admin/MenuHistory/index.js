import React, { useContext, useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import HeaderList from '../HeaderList'
import ListElements from '../ListElements'
import PaginationAdmin from '../Pagination'
import { User } from '../../../context/userProvider'
import { getHistory } from '../../../utils/queryAPI/history'
import HistoryAddEdit from './historyAddEdit'
import FiltersAdmin from '../FiltersAdmin'

const MenuHistory = () => {
  const [formAdd, setFormAdd] = useState(false)
  const [formEdit, setFormEdit] = useState(false)
  const [dataRegisterEdit, setDataRegisterEdit] = useState(null)
  const [loading, setLoading] = useState(false)
  const [historyData, setHistoryData] = useState([])
  const [limit, setLimit] = useState(10)
  const [deleted, setDeleted] = useState(undefined)
  const [band, setBand] = useState(false)
  const [pageSelected, setPageSelected] = useState(1)
  const [search, setSearch] = useState('')

  const {
    state: { userToken },
  } = useContext(User)

  useEffect(() => {
    dataNews()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, deleted, band, pageSelected, limit])
  const dataNews = async () => {
    const params = {
      deleted,
      page: 1,
      limit,
    }
    const data = await getHistory(params)
    setHistoryData(data)
  }

  const resetValuesEdit = (valueEdit) => {
    setDataRegisterEdit(valueEdit)
    setFormEdit(!formEdit)
  }
  return (
    <Container fluid>
      <Row>
        <Col className='mt-3'>
          <div className={`pt-4 pb-1 px-4`}>
            <h3>sHistoria</h3>
          </div>
        </Col>
      </Row>
      {!formAdd && !formEdit ? (
        <Row>
          <Col>
            <FiltersAdmin
              setSearch={setSearch}
              deleted={deleted}
              setDeleted={setDeleted}
              newsRoute='news'
              setPageSelected={setPageSelected}
            />
            <HeaderList
              title='Listado de Historias'
              formAdd={formAdd}
              setFormAdd={setFormAdd}
              formEdit={formEdit}
              setFormEdit={setFormEdit}
              resetValuesEdit={resetValuesEdit}
              btnAdd={true}
            />
            <ListElements
              data={historyData?.allHistory}
              userToken={userToken}
              band={band}
              setBand={setBand}
              resetValuesEdit={resetValuesEdit}
              routeAPI='history'
            />
            <PaginationAdmin
              data={historyData}
              pageSelected={pageSelected}
              setPageSelected={setPageSelected}
              setLimit={setLimit}
            />
          </Col>
        </Row>
      ) : (
        <Row>
          <Col>
            <HeaderList
              title='Nueva historia'
              titleEdit='Editar historia'
              formAdd={formAdd}
              setFormAdd={setFormAdd}
              loading={loading}
              setLoading={setLoading}
              formEdit={formEdit}
              setFormEdit={setFormEdit}
              resetValuesEdit={resetValuesEdit}
            />
            <HistoryAddEdit
              userToken={userToken}
              loading={loading}
              setLoading={setLoading}
              dataRegisterEdit={dataRegisterEdit}
              data={historyData?.allHistory}
            />
          </Col>
        </Row>
      )}
    </Container>
  )
}

export default MenuHistory
