import React, { useState, useContext, useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { User } from '../../../context/userProvider'
import HeaderList from '../HeaderList'
import { getFooter } from '../../../utils/queryAPI/footer.js'
import ListStatistics from '../MenuStatistics.js/ListStatistics.js'
import FormFooter from './FormFooter.js'
import { getNewsCategory } from '../../../utils/queryAPI/newsCategory.js'
import { getSpecialDays } from '../../../utils/queryAPI/specialDays.js'
import { getNews } from '../../../utils/queryAPI/news.js'

const MenuFooter = () => {
  const [formAdd, setFormAdd] = useState(false)
  const [formEdit, setFormEdit] = useState(false)
  const [footerData, setFooterData] = useState([])
  const [band, setBand] = useState(false)
  const [loading, setLoading] = useState(false)
  const [dataRegisterEdit, setDataRegisterEdit] = useState(null)
  const [allCategories, setAllCategories] = useState([])
  const [allSpecialDays, setAllSpecialDays] = useState([])
  const [allNews, setAllNews] = useState([])

  const {
    state: { userToken },
  } = useContext(User)

  useEffect(() => {
    dataFooter()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [band])
  const dataFooter = async () => {
    const data = await getFooter()
    setFooterData(data)
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
    const dataNews = await getNews(params)
    setAllNews(dataNews.allNews)
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
            <h3>Footer</h3>
          </div>
        </Col>
      </Row>
      {!formAdd && !formEdit ? (
        <Row>
          <Col>
            <HeaderList
              title='Footer'
              formAdd={formAdd}
              setFormAdd={setFormAdd}
              formEdit={formEdit}
              setFormEdit={setFormEdit}
              resetValuesEdit={resetValuesEdit}
              btnAdd={true}
            />
            <p className='px-5 text-important mb-1'>
              <span className='text-danger fw-bolder'>*</span>Se muestran 7
              accesos rápido en el footer. Puede ordenarlas desplazando una
              arriba de otra.
            </p>
            <p className='px-5 text-important mb-1'>
              <span className='text-danger fw-bolder'>*</span>Un acceso rápido
              eliminado no va a ser visible.
            </p>
            <p className='px-5 text-important'>
              <span className='text-danger fw-bolder'>*</span>Arrastre las filas
              para ordenarlas.
            </p>
            <ListStatistics
              data={footerData?.allDirectAccessFooter}
              userToken={userToken}
              band={band}
              setBand={setBand}
              resetValuesEdit={resetValuesEdit}
              routeAPI='footer'
            />
          </Col>
        </Row>
      ) : (
        <Row>
          <Col>
            <HeaderList
              title='Nuevo acceso rápido'
              titleEdit='Editar accesso rápido'
              formAdd={formAdd}
              setFormAdd={setFormAdd}
              loading={loading}
              setLoading={setLoading}
              formEdit={formEdit}
              setFormEdit={setFormEdit}
              resetValuesEdit={resetValuesEdit}
            />
            <FormFooter
              userToken={userToken}
              loading={loading}
              setLoading={setLoading}
              dataCategories={allCategories}
              dataSpecialDay={allSpecialDays}
              dataNews={allNews}
              dataRegisterEdit={dataRegisterEdit}
              routeAPI='footer'
            />
          </Col>
        </Row>
      )}
    </Container>
  )
}

export default MenuFooter
