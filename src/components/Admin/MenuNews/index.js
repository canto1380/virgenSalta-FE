import React, { useState, useEffect, useContext } from 'react'
import './menuNews.css'
import { Container, Row, Col } from 'react-bootstrap'
import { getNews } from '../../../utils/queryAPI/news'
import FiltersAdmin from '../FiltersAdmin'
import HeaderList from '../HeaderList'
import ListElements from '../ListElements'
import PaginationAdmin from '../Pagination'
import { User } from '../../../context/userProvider'
import { getNewsCategory } from '../../../utils/queryAPI/newsCategory'
import NewsAddEdit from './NewsAddEdit'
import HeaderBackdrop from '../HeaderBackdrop'

const MenuNews = ({ idTab }) => {
  const [search, setSearch] = useState('')
  const [deleted, setDeleted] = useState(undefined)
  const [idNewsCategory, setIdNewsCategory] = useState(undefined)
  const [limit, setLimit] = useState(10)
  const [newsData, setNewsData] = useState([])
  const [newsCategoryData, setNewsCategoryData] = useState([])
  const [band, setBand] = useState(false)
  const [loading, setLoading] = useState(false)
  const [pageSelected, setPageSelected] = useState(1)
  const [formAdd, setFormAdd] = useState(false)
  const [formEdit, setFormEdit] = useState(false)
  const [dataRegisterEdit, setDataRegisterEdit] = useState(null)

  const {
    state: { userToken },
  } = useContext(User)

  useEffect(() => {
    dataNews()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, deleted, band, pageSelected, idNewsCategory, limit])
  const dataNews = async () => {
    const params = {
      search,
      deleted,
      page: pageSelected,
      idNewsCategory,
      limit,
    }
    const data = await getNews(params)
    setNewsData(data)
  }

  useEffect(() => {
    dataNewsCategory()
  }, [])
  const dataNewsCategory = async () => {
    const params = { limit: 1000 }
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
            <h3>Noticias</h3>
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
              setIdNewsCategory={setIdNewsCategory}
              newsRoute='news'
              data={newsCategoryData?.allNewsCategory}
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
              title='Listado de Noticias'
              formAdd={formAdd}
              setFormAdd={setFormAdd}
              formEdit={formEdit}
              setFormEdit={setFormEdit}
              resetValuesEdit={resetValuesEdit}
              btnAdd={true}
            />
            <p className='px-5 text-important mb-0'>
              <span className='text-danger fw-bolder'>*</span>El botón de
              visible permite mostrar/ocultar las noticias en la página
              principal
            </p>
            <ListElements
              data={newsData?.allNews}
              userToken={userToken}
              band={band}
              setBand={setBand}
              resetValuesEdit={resetValuesEdit}
              routeAPI='news'
              btnVisible={false}
            />
            <PaginationAdmin
              data={newsData}
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
              title='Nueva noticia'
              titleEdit='Editar noticia'
              formAdd={formAdd}
              setFormAdd={setFormAdd}
              loading={loading}
              setLoading={setLoading}
              formEdit={formEdit}
              setFormEdit={setFormEdit}
              resetValuesEdit={resetValuesEdit}
            />
            {/* <p className='px-5 text-important mb-0'>
              <span className='text-danger fw-bolder'>*</span>Formato fotos: Cuadrada
              1:1
            </p> */}
            <p className='px-5 text-important mb-0'>
              <span className='text-danger fw-bolder'>*</span>Formato fotos:
              Horizontal 410x250
            </p>
            <p className='px-5 text-important mb-0'>
              <span className='text-danger fw-bolder'>*</span>La primera foto
              seleccionada es la foto principal
            </p>
            <NewsAddEdit
              userToken={userToken}
              loading={loading}
              setLoading={setLoading}
              dataRegisterEdit={dataRegisterEdit}
              data={newsCategoryData?.allNewsCategory}
            />
          </Col>
        </Row>
      )}
    </Container>
  )
}

export default MenuNews
