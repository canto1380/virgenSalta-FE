import React, { useContext, useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import HeaderList from '../../HeaderList'
import ListElements from '../../ListElements'
import PaginationAdmin from '../../Pagination'
import { User } from '../../../../context/userProvider'
import { getMessageGeneral } from '../../../../utils/queryAPI/messageGeneral'
import HeaderBackdrop from '../../HeaderBackdrop'
import MsgFilters from '../MsgFilters'
import MsgVirgenAddEdit from '../MsgVirgen/MsgVirgenAddEdit'

const MenuMsgGeneral = ({ idTab }) => {
  const [formAdd, setFormAdd] = useState(false)
  const [formEdit, setFormEdit] = useState(false)
  const [dataRegisterEdit, setDataRegisterEdit] = useState(null)
  const [loading, setLoading] = useState(false)
  const [messageGeneral, setMessageGeneral] = useState([])
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
    dataMessageGeneral()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, deleted, band, pageSelected, limit, year])
  const dataMessageGeneral = async () => {
    const params = {
      deleted,
      search,
      page: pageSelected,
      limit,
      year,
    }
    const data = await getMessageGeneral(params)
    setMessageGeneral(data)
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
            <h3>Mensaje Central</h3>
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
              title='Listado de Mensajes Generales'
              formAdd={formAdd}
              setFormAdd={setFormAdd}
              formEdit={formEdit}
              setFormEdit={setFormEdit}
              resetValuesEdit={resetValuesEdit}
              btnAdd={true}
            />
            <ListElements
              data={messageGeneral?.allMessage}
              userToken={userToken}
              band={band}
              setBand={setBand}
              resetValuesEdit={resetValuesEdit}
              routeAPI='messageGeneral'
            />
            <PaginationAdmin
              data={messageGeneral}
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
              title='Nuevo Mensaje General'
              titleEdit='Editar Mensaje General'
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
              data={messageGeneral?.allHistory}
              routeAPI='messageGeneral'
              routeRedirect='mensajesCentral'
            />
          </Col>
        </Row>
      )}
    </Container>
  )
}

export default MenuMsgGeneral
