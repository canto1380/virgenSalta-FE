import React, { useState, useEffect, useContext } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import FiltersAdmin from '../FiltersAdmin'
import HeaderList from '../HeaderList'
import { User } from '../../../context/userProvider'
import { getConfigurations } from '../../../utils/queryAPI/configurations.js'
import ListElements from '../ListElements.js'
import FormConfigurations from './FormConfigurations.js'

const MenuConfigurations = () => {
  const [search, setSearch] = useState('')
  const [deleted, setDeleted] = useState(undefined)
  const [formAdd, setFormAdd] = useState(false)
  const [formEdit, setFormEdit] = useState(false)
  const [configurationsData, setConfigurationsData] = useState([])
  const [band, setBand] = useState(false)
  const [loading, setLoading] = useState(false)
  const [dataRegisterEdit, setDataRegisterEdit] = useState(null)
  const [pageSelected, setPageSelected] = useState(1)

  const {
    state: { userToken },
  } = useContext(User)

  useEffect(() => {
    dataConfigurations()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [band, deleted, band, setPageSelected, search])
  const dataConfigurations = async () => {
    const params = { deleted, search }
    const data = await getConfigurations(params)
    setConfigurationsData(data)
  }

  const resetValuesEdit = (valuesEdit) => {
    setDataRegisterEdit(valuesEdit)
    setFormEdit(!formEdit)
  }

  return (
    <Container fluid>
      <Row>
        <Col className='mt-3'>
          <div className='pt-4 pb-1 px-4'>
            <h3>Configuraciones</h3>
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
              pageSelected={pageSelected}
            />
            <HeaderList
              title='Configuraciones'
              formAdd={formAdd}
              setFormAdd={setFormAdd}
              formEdit={formEdit}
              setFormEdit={setFormEdit}
              resetValuesEdit={resetValuesEdit}
              btnAdd={true}
            />
            <p className='px-5 text-important mb-1'>
              <span className='text-danger fw-bolder'>*</span>Configuraciones
              globales de la página
            </p>
            <ListElements
              data={configurationsData?.allConfigurations}
              userToken={userToken}
              band={band}
              setBand={setBand}
              resetValuesEdit={resetValuesEdit}
              routeAPI='configuration'
            />
          </Col>
        </Row>
      ) : (
        <Row>
          <Col>
            <HeaderList
              title='Nueva configuración'
              titleEdit='Editar configuración'
              formAdd={formAdd}
              setFormAdd={setFormAdd}
              loading={loading}
              setLoading={setLoading}
              formEdit={formEdit}
              setFormEdit={setFormEdit}
              resetValuesEdit={resetValuesEdit}
            />
            <FormConfigurations
              userToken={userToken}
              loading={loading}
              setLoading={setLoading}
              dataRegisterEdit={dataRegisterEdit}
              routeAPI='configuration'
            />
          </Col>
        </Row>
      )}
    </Container>
  )
}

export default MenuConfigurations
