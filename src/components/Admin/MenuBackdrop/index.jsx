import React, { useContext, useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { User } from '../../../context/userProvider'
import { getBackdrop } from '../../../utils/queryAPI/backdrop'
import BackdropAddEdit from './BackdropAddEdit'

const MenuBackdrop = ({ idTab }) => {
  const [title, setTitle] = useState(undefined)
  const [backdropData, setBackdropData] = useState([])

  const {
    state: { userToken },
  } = useContext(User)

  useEffect(() => {
    dataBackdrop()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idTab])

  const dataBackdrop = async () => {
    const params = { search: idTab }
    const data = await getBackdrop(params)
    setBackdropData(data)
  }
  useEffect(() => {
    setTitle(idTab[0].toUpperCase() + idTab.slice(1))
  }, [idTab])
  return (
    <Container fluid>
      <Row>
        <Col>
          <BackdropAddEdit
            title={title}
            data={backdropData}
            userToken={userToken}
            routeAPI={'backdrop'}
            idTab={idTab}
          />
        </Col>
      </Row>
    </Container>
  )
}

export default MenuBackdrop
