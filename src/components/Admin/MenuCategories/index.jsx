import React, { useState, useEffect, useContext } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import FiltersAdmin from '../FiltersAdmin'
import HeaderList from '../HeaderList'
import { getNewsCategory } from '../../../utils/queryAPI/newsCategory'
import { User } from '../../../context/userProvider'
import FormAddEdit from './FormAddEdit'
import PaginationAdmin from '../Pagination'
import HeaderBackdrop from '../HeaderBackdrop'
import ListStatistics from '../MenuStatistics.js/ListStatistics'

const MenuCategories = ({ idTab }) => {
  const [search, setSearch] = useState('')
  const [deleted, setDeleted] = useState(undefined)
  const [limit, setLimit] = useState(10)
  const [newsCategoryData, setNewsCategoryData] = useState([])
  const [band, setBand] = useState(false)
  const [formAdd, setFormAdd] = useState(false)
  const [loading, setLoading] = useState(false)
  const [pageSelected, setPageSelected] = useState(1)
  const [formEdit, setFormEdit] = useState(false)
  const [dataRegisterEdit, setDataRegisterEdit] = useState(null)

  const {
    state: { userToken },
  } = useContext(User)

  useEffect(() => {
    dataNewsCategory()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, deleted, band, pageSelected, limit])

  const dataNewsCategory = async () => {
    const params = { search, deleted, page: pageSelected, limit }
    const data = await getNewsCategory(params)
    setNewsCategoryData(data)
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
            <h3>Categorías</h3>
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
              setPageSelected={setPageSelected}
            />
            <HeaderBackdrop
              title={'Foto Portada'}
              idTab={idTab}
              bandSelect={true}
            />
            <p className='px-5 text-important mb-0'>
              <span className='text-danger fw-bolder'>*</span>Formato fotos:
              Horizontal 1250x390
            </p>
            <HeaderList
              title='Listado de Categorías'
              formAdd={formAdd}
              setFormAdd={setFormAdd}
              formEdit={formEdit}
              setFormEdit={setFormEdit}
              resetValuesEdit={resetValuesEdit}
              btnAdd={true}
            />
            <ListStatistics
              data={newsCategoryData?.allNewsCategory}
              userToken={userToken}
              band={band}
              setBand={setBand}
              resetValuesEdit={resetValuesEdit}
              routeAPI='newsCategory'
            />
            <PaginationAdmin
              data={newsCategoryData}
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
              title='Nueva categoría'
              titleEdit='Editar categoría'
              formAdd={formAdd}
              setFormAdd={setFormAdd}
              loading={loading}
              setLoading={setLoading}
              formEdit={formEdit}
              setFormEdit={setFormEdit}
              resetValuesEdit={resetValuesEdit}
            />
            <p className='px-5 text-important mb-0'>
              <span className='text-danger fw-bolder'>*</span>Formato fotos:
              Horizontal 410x250
            </p>
            <FormAddEdit
              userToken={userToken}
              loading={loading}
              setLoading={setLoading}
              dataRegisterEdit={dataRegisterEdit}
            />
          </Col>
        </Row>
      )}
    </Container>
  )
}

export default MenuCategories
