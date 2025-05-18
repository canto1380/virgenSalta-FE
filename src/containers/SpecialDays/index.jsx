import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import { Col, Container, Row, Spinner } from 'react-bootstrap'
import LayoutFoot from '../../components/Layout/LayoutFoot'
import BackdropSections from '../../components/Backdrops/BackdropSections'
import NewsFilter from '../Noticias/NewsFilter'
import { getSpecialDays } from '../../utils/queryAPI/specialDays'
import PaginationAdmin from '../../components/Admin/Pagination'
import CardNewsPage from '../../components/News/NewsPage/CardNewsPage'
import FloatingButton from '../../components/FloatingButton/FloatingButton'

const SpecialDaysPage = () => {
  const [search, setSearch] = useState('')
  const [pageSelected, setPageSelected] = useState(1)
  const [limit, setLimit] = useState(12)
  const [specialDaysData, setSpecialDaysData] = useState(undefined)
  const [specialDaysInf, setSpecialDaysInf] = useState()
  const deleted = false

  useEffect(() => {
    dataSpecialDays()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, pageSelected, limit])
  const dataSpecialDays = async () => {
    const params = { search, deleted, page: pageSelected, limit }
    const data = await getSpecialDays(params)
    setSpecialDaysData(data.allSpecialDays)
    setSpecialDaysInf(data)
  }

  return (
    <>
      <div className='bg-gradient-4'>
        <Layout />
        <BackdropSections title='Jornadas' img={'Jornadas'} />
        <Container className='mt-3 pt-5'>
          <NewsFilter
            typeFlag='jornadas'
            setSearch={setSearch}
            setPageSelected={setPageSelected}
          />
          {specialDaysData ? (
            <Row className='mt-3 pb-5'>
              <div>
                <h5 className='pb-2'>Lista de Jornadas</h5>
              </div>
              {specialDaysData.length > 0 ? (
                specialDaysData?.map((data) => (
                  <Col key={data._id} xs={12} md={6} lg={4} className='mb-4'>
                    <CardNewsPage data={data} pathUrl='jornadas' />
                  </Col>
                ))
              ) : (
                <p className='text-danger fw-bold'>
                  No se encontraron jornadas
                </p>
              )}
              <Row>
                <Col>
                  <PaginationAdmin
                    data={specialDaysInf}
                    pageSelected={pageSelected}
                    setPageSelected={setPageSelected}
                    setLimit={setLimit}
                  />
                </Col>
              </Row>
            </Row>
          ) : (
            <div className='text-center'>
              <Spinner animation='grow' variant='info' />
            </div>
          )}
          <FloatingButton />
        </Container>
        <LayoutFoot />
      </div>
    </>
  )
}

export default SpecialDaysPage
