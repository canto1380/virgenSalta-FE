import React, { useState, useEffect, useContext } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { User } from '../../../context/userProvider'
import { getItemNav } from '../../../utils/queryAPI/navbar'
import {
  getItemNavCategory,
  getItemNavCategoryById,
} from '../../../utils/queryAPI/navbarCategory'
import HeaderList from '../HeaderList'
import NavbarAddEdit from './NavbarAddEdit'
import FiltersNavbar from './FiltersNavbar'
import ItemsNavbarCollapse from './ItemNavbarCollapse'
import HeaderNavbar from './HeaderNavbar'
import { getNews } from '../../../utils/queryAPI/news'
import { getSpecialDays } from '../../../utils/queryAPI/specialDays'

const MenuNavbar = () => {
  const [search, setSearch] = useState('')
  const [visible, setVisible] = useState(undefined)
  const [idItemNavCategory, setIdItemNavCategory] = useState('')
  const [itemNavData, setItemNavData] = useState([])
  const [itemNavCategoryData, setItemNavCategoryData] = useState([])
  const [itemNavCategoryDataCollapse, setItemNavCategoryDataCollapse] =
    useState([])
  const [band, setBand] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formAdd, setFormAdd] = useState(false)
  const [formEdit, setFormEdit] = useState(false)
  const [dataRegisterEdit, setDataRegisterEdit] = useState(null)
  const [routeAPI, setRouteAPI] = useState('')
  const [allNews, setAllNews] = useState([])
  const [allSpecialDays, setAllSpecialDays] = useState([])

  const {
    state: { userToken },
  } = useContext(User)

  useEffect(() => {
    dataNavbarItem()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, visible, band])
  const dataNavbarItem = async () => {
    const params = {
      search,
      visible,
      limit: 10000000,
    }
    const data = await getItemNav(params)
    setItemNavData(data)
  }

  useEffect(() => {
    dataItemNavCategory()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idItemNavCategory, band])
  const dataItemNavCategory = async () => {
    const params = { limit: 1000 }
    const data = await getItemNavCategory(params)
    setItemNavCategoryData(data)

    const data1 = await getItemNavCategoryById(idItemNavCategory)
    setItemNavCategoryDataCollapse(data1)
  }
  useEffect(() => {
    dataRedirection()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const dataRedirection = async () => {
    const params = { limit: 99999999 }
    const data = await getNews(params)
    setAllNews(data.allNews)
    const dataSpecialDay = await getSpecialDays(params)
    setAllSpecialDays(dataSpecialDay.allSpecialDays)
  }
  const resetValuesEdit = (valueEdit, routeApi) => {
    setDataRegisterEdit(valueEdit)
    setFormEdit(!formEdit)
    setRouteAPI(routeApi)
  }

  return (
    <Container fluid>
      <Row>
        <Col className='mt-3'>
          <div className={`pt-4 pb-1 px-4`}>
            <h3>Menú Principal</h3>
          </div>
        </Col>
      </Row>
      {!formAdd && !formEdit ? (
        <Row>
          <Col>
            <div className='pt-3 container-event menuContainer'>
              <FiltersNavbar
                setSearch={setSearch}
                visible={visible}
                setVisible={setVisible}
                newsRoute='itemNavCategory'
                data={itemNavCategoryData.allItemNavCategory}
                setIdItemNavCategory={setIdItemNavCategory}
              />
              <HeaderNavbar
                title='Secciones Menú Principal'
                formAdd={formAdd}
                setFormAdd={setFormAdd}
                formEdit={formEdit}
                setFormEdit={setFormEdit}
                resetValuesEdit={resetValuesEdit}
                bandType='itemNavbar'
                setRouteAPI={setRouteAPI}
              />
              <p className='text-important'>
                <span className='text-danger fw-bolder'>*</span>Para cambiar el
                orden de las secciones, arrastre al lugar deseado
              </p>
              <ItemsNavbarCollapse
                data1={itemNavData?.allItemNav}
                data2={
                  itemNavCategoryDataCollapse.allItemNavCategory ||
                  itemNavCategoryDataCollapse
                }
                userToken={userToken}
                band={band}
                setBand={setBand}
                resetValuesEdit={resetValuesEdit}
                formEdit={formEdit}
                setFormEdit={setFormEdit}
                setRouteAPI={setRouteAPI}
              />
            </div>
          </Col>
        </Row>
      ) : (
        <Row>
          <Col>
            <HeaderList
              title='Nueva Sección'
              titleEdit='Editar Sección'
              formAdd={formAdd}
              setFormAdd={setFormAdd}
              loading={loading}
              setLoading={setLoading}
              formEdit={formEdit}
              setFormEdit={setFormEdit}
              resetValuesEdit={resetValuesEdit}
            />
            <NavbarAddEdit
              userToken={userToken}
              dataRegisterEdit={dataRegisterEdit}
              band={band}
              setBand={setBand}
              routeAPI={routeAPI}
              data={itemNavCategoryData.allItemNavCategory}
              dataNews={allNews}
              dataSpecialDay={allSpecialDays}
            />
          </Col>
        </Row>
      )}
    </Container>
  )
}

export default MenuNavbar
