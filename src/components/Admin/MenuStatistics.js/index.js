import React, { useState, useEffect, useContext } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import FiltersAdmin from '../FiltersAdmin'
import HeaderList from '../HeaderList'
import { User } from '../../../context/userProvider'
import { getStatistics } from '../../../utils/queryAPI/statistics.js'
import ListStatistics from './ListStatistics.js'
import FormStatistics from './FormStatistics.js'

const MenuStatistics = () => {
  const [search, setSearch] = useState('')
  const [deleted, setDeleted] = useState(undefined)
  const [formAdd, setFormAdd] = useState(false)
  const [formEdit, setFormEdit] = useState(false)
  const [statisticsData, setStatisticsData] = useState([])
  const [band, setBand] = useState(false)
  const [loading, setLoading] = useState(false)
  const [dataRegisterEdit, setDataRegisterEdit] = useState(null)
  const [pageSelected, setPageSelected] = useState(1)

  const {
    state: { userToken },
  } = useContext(User)

  useEffect(() => {
    dataStatistics()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [band, deleted, search])

  const dataStatistics = async () => {
    const params = { deleted, search }
    const data = await getStatistics(params)
    setStatisticsData(data)
  }
  const resetValuesEdit = (valuesEdit) => {
    setDataRegisterEdit(valuesEdit)
    setFormEdit(!formEdit)
    console.log(pageSelected)
  }

  return (
    <Container fluid>
      <Row>
        <Col className='mt-3'>
          <div className='pt-4 pb-1 px-4'>
            <h3>Estadísticas</h3>
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
            <HeaderList
              title='Estadísticas'
              formAdd={formAdd}
              setFormAdd={setFormAdd}
              formEdit={formEdit}
              setFormEdit={setFormEdit}
              resetValuesEdit={resetValuesEdit}
              btnAdd={true}
            />
            <p className='px-5 text-important mb-1'>
              <span className='text-danger fw-bolder'>*</span>Se muestran 5
              estadísticas en la pantalla. Puede ordenarlas desplazando una
              arriba de otra.
            </p>
            <p className='px-5 text-important mb-1'>
              <span className='text-danger fw-bolder'>*</span>Una estadistica
              eliminada no va a ser visible.
            </p>
            <p className='px-5 text-important'>
              <span className='text-danger fw-bolder'>*</span>Arrastre las filas
              para ordenarlas.
            </p>

            <ListStatistics
              data={statisticsData?.allStatistics}
              userToken={userToken}
              band={band}
              setBand={setBand}
              resetValuesEdit={resetValuesEdit}
              routeAPI='statistics'
            />
          </Col>
        </Row>
      ) : (
        <Row>
          <Col>
            <HeaderList
              title='Nueva estadística'
              titleEdit='Editar estadística'
              formAdd={formAdd}
              setFormAdd={setFormAdd}
              loading={loading}
              setLoading={setLoading}
              formEdit={formEdit}
              setFormEdit={setFormEdit}
              resetValuesEdit={resetValuesEdit}
            />
            <FormStatistics
              userToken={userToken}
              loading={loading}
              setLoading={setLoading}
              dataRegisterEdit={dataRegisterEdit}
              routeAPI='statistics'
            />
          </Col>
        </Row>
      )}
    </Container>
  )
}

export default MenuStatistics
