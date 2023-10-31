import React, { useState, useEffect, useContext } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import FiltersAdmin from '../FiltersAdmin'
import HeaderList from '../HeaderList'
import ListElements from '../ListElements'
import { User } from '../../../context/userProvider'
import { getCarousel } from '../../../utils/queryAPI/carousel'
import PaginationAdmin from '../Pagination'
import CarouselAddEdit from './CarouselAddEdit'

const MenuCarousel = () => {
  const [search, setSearch] = useState('')
  const [deleted, setDeleted] = useState(undefined)
  const [limit, setLimit] = useState(10)
  const [carouselData, setCarouselData] = useState([])
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
    dataCarousel()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, deleted, band, pageSelected, limit])

  const dataCarousel = async () => {
    const params = { search, deleted, page: pageSelected, limit }
    const data = await getCarousel(params)
    setCarouselData(data)
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
            <h3>Carousel</h3>
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
              title='Items Carousel'
              formAdd={formAdd}
              setFormAdd={setFormAdd}
              formEdit={formEdit}
              setFormEdit={setFormEdit}
              resetValuesEdit={resetValuesEdit}
            />
            <ListElements
              data={carouselData?.allCarousel}
              userToken={userToken}
              band={band}
              setBand={setBand}
              resetValuesEdit={resetValuesEdit}
              routeAPI='newsCategory'
            />
            <PaginationAdmin
              data={carouselData}
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
              title='Nuevo slider'
              formAdd={formAdd}
              setFormAdd={setFormAdd}
              loading={loading}
              setLoading={setLoading}
              formEdit={formEdit}
              setFormEdit={setFormEdit}
              resetValuesEdit={resetValuesEdit}
            />
            <CarouselAddEdit
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

export default MenuCarousel
