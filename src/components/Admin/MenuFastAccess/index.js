import React, { useContext, useEffect, useState } from 'react'
import { Container, Col, Row } from 'react-bootstrap'
import HeaderList from '../HeaderList'
import ListElements from '../ListElements'
import { User } from '../../../context/userProvider'
import { getFastAccess } from '../../../utils/queryAPI/fastAccess'
import FormFastAccess from './FormFastAccess'
import { getNewsCategory } from '../../../utils/queryAPI/newsCategory'
import { getSpecialDays } from '../../../utils/queryAPI/specialDays'
import FiltersAdmin from '../FiltersAdmin'

const MenuFastAccess = ({ idTab }) => {
  const [search, setSearch] = useState('')
  const [deleted, setDeleted] = useState(undefined)
  const [formAdd, setFormAdd] = useState(false)
  const [formEdit, setFormEdit] = useState(false)
  const [fastAccessData, setFastAccessData] = useState([])
  const [band, setBand] = useState(false)
  const [loading, setLoading] = useState(false)
  const [dataRegisterEdit, setDataRegisterEdit] = useState(null)
  const [allCategories, setAllCategories] = useState([])
  const [allSpecialDays, setAllSpecialDays] = useState([])
  const [pageSelected, setPageSelected] = useState(1)

  const {
    state: { userToken },
  } = useContext(User)

  useEffect(() => {
    dataFastAccess()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, deleted, band, pageSelected])
  const dataFastAccess = async () => {
    const params = { deleted, search }
    const data = await getFastAccess(params)
    setFastAccessData(data)
  }

  useEffect(() => {
    dataRedirection()
  }, [])

  const dataRedirection = async () => {
    const params = { limit: 10000, deleted: false }
    const dataCategories = await getNewsCategory(params)
    setAllCategories(dataCategories.allNewsCategory)
    const dataSpecialDay = await getSpecialDays(params)
    setAllSpecialDays(dataSpecialDay.allSpecialDays)
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
            <h3>Accesos Rápidos</h3>
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
              title='Botones de acceso rápido'
              formAdd={formAdd}
              setFormAdd={setFormAdd}
              formEdit={formEdit}
              setFormEdit={setFormEdit}
              resetValuesEdit={resetValuesEdit}
            />
            <p className='px-5 text-important mb-'>
              En tamaño PC, se alinean 4 botones por fila. En dispositivo
              celular, un botón por fila
            </p>
            <ListElements
              data={fastAccessData?.allFastAccess}
              userToken={userToken}
              band={band}
              setBand={setBand}
              resetValuesEdit={resetValuesEdit}
              routeAPI='fastAccess'
            />
          </Col>
        </Row>
      ) : (
        <Row>
          <Col>
            <HeaderList
              title='Nuevo acceso rápido'
              titleEdit='Editar acceso rápido'
              formAdd={formAdd}
              setFormAdd={setFormAdd}
              loading={loading}
              setLoading={setLoading}
              formEdit={formEdit}
              setFormEdit={setFormEdit}
              resetValuesEdit={resetValuesEdit}
            />
            <FormFastAccess
              userToken={userToken}
              loading={loading}
              setLoading={setLoading}
              dataCategories={allCategories}
              dataSpecialDay={allSpecialDays}
              dataRegisterEdit={dataRegisterEdit}
              routeAPI='fastAccess'
            />
          </Col>
        </Row>
      )}
    </Container>
  )
}

export default MenuFastAccess
