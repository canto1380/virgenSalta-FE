import React, { useContext, useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import HeaderList from '../../HeaderList.jsx'
import ListElements from '../../ListElements'
import PaginationAdmin from '../../Pagination.jsx'
import { User } from '../../../../context/userProvider'
import { getMessageVirgen } from '../../../../utils/queryAPI/messageVirgen.jsx'
import MsgVirgenAddEdit from './MsgVirgenAddEdit.jsx'
import MsgFilters from '../MsgFilters.jsx'
import HeaderBackdrop from '../../HeaderBackdrop.jsx'

const MenuMsgVirgen = ({ idTab }) => {
  const [formAdd, setFormAdd] = useState(false)
  const [formEdit, setFormEdit] = useState(false)
  const [dataRegisterEdit, setDataRegisterEdit] = useState(null)
  const [loading, setLoading] = useState(false)
  const [messageVirgen, setMessageVirgen] = useState([])
  const [limit, setLimit] = useState(12)
  const [deleted, setDeleted] = useState(undefined)
  const [band, setBand] = useState(false)
  const [pageSelected, setPageSelected] = useState(1)
  const [search, setSearch] = useState('')
  const [year, setYear] = useState('Todos')

  const {
    state: { userToken },
  } = useContext(User)

  useEffect(() => {
    dataMessageVirgen()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, deleted, band, pageSelected, limit, year])
  const dataMessageVirgen = async () => {
    const params = {
      deleted,
      search,
      page: pageSelected,
      limit,
      year,
    }
    const data = await getMessageVirgen(params)
    setMessageVirgen(data)
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
            <h3>Mensajes De La Santísima Virgen María</h3>
          </div>
        </Col>
      </Row>
      {!formAdd && !formEdit ? (
        <Row>
          <Col>
            <MsgFilters
              setSearch={setSearch}
              deleted={deleted}
              setDeleted={setDeleted}
              setPageSelected={setPageSelected}
              setYear={setYear}
            />
            <HeaderBackdrop
              title={'Foto Portada'}
              idTab={idTab}
              bandSelect={true}
            />
            <p className='px-5 text-important mb-0'>
              <span className='text-danger fw-bolder'>*</span>Formato fotos:
              Vertical 500x450
            </p>
            <HeaderList
              title='Listado de Mensajes de la Virgen'
              formAdd={formAdd}
              setFormAdd={setFormAdd}
              formEdit={formEdit}
              setFormEdit={setFormEdit}
              resetValuesEdit={resetValuesEdit}
              btnAdd={true}
            />
            <ListElements
              data={messageVirgen?.allMessage}
              userToken={userToken}
              band={band}
              setBand={setBand}
              resetValuesEdit={resetValuesEdit}
              routeAPI='messageVirgen'
            />
            <PaginationAdmin
              data={messageVirgen}
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
              title='Nuevo Mensaje de la Virgen'
              titleEdit='Editar Mensaje de la Virgen'
              formAdd={formAdd}
              setFormAdd={setFormAdd}
              loading={loading}
              setLoading={setLoading}
              formEdit={formEdit}
              setFormEdit={setFormEdit}
              resetValuesEdit={resetValuesEdit}
            />
            <MsgVirgenAddEdit
              userToken={userToken}
              loading={loading}
              setLoading={setLoading}
              dataRegisterEdit={dataRegisterEdit}
              data={messageVirgen?.allHistory}
              routeAPI='messageVirgen'
              routeRedirect='mensajesDeLaVirgen'
            />
          </Col>
        </Row>
      )}
    </Container>
  )
}

export default MenuMsgVirgen
