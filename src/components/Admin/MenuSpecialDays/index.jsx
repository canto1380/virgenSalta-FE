import React, { useContext, useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import FiltersAdmin from '../FiltersAdmin'
import HeaderList from '../HeaderList'
import ListElements from '../ListElements'
import PaginationAdmin from '../Pagination'
import { User } from '../../../context/userProvider'
import { getSpecialDays } from '../../../utils/queryAPI/specialDays'
import SpecialDaysAddEdit from './SpecialDayAddEdit'
import HeaderBackdrop from '../HeaderBackdrop'

const MenuSpecialDays = ({ idTab }) => {
  const [search, setSearch] = useState('')
  const [deleted, setDeleted] = useState(undefined)
  const [limit, setLimit] = useState(10)
  const [specialDaysData, setSpecialDaysData] = useState([])
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
    dataSpecialDays()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, deleted, pageSelected, band, limit])

  const dataSpecialDays = async () => {
    const params = { search, deleted, page: pageSelected, limit }
    const data = await getSpecialDays(params)
    setSpecialDaysData(data)
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
            <h3>Jornadas Especiales</h3>
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
              title='Listado de jornadas'
              formAdd={formAdd}
              setFormAdd={setFormAdd}
              formEdit={formEdit}
              setFormEdit={setFormEdit}
              resetValuesEdit={resetValuesEdit}
              btnAdd={true}
            />
            <ListElements
              data={specialDaysData?.allSpecialDays}
              userToken={userToken}
              band={band}
              setBand={setBand}
              resetValuesEdit={resetValuesEdit}
              routeAPI='specialDays'
            />
            <PaginationAdmin
              data={specialDaysData}
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
              title='Nueva jornada'
              titleEdit='Editar jornada'
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
            <SpecialDaysAddEdit
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

export default MenuSpecialDays
