import React, { useEffect, useState } from 'react'
import './footer.css'
import { Col, Row } from 'react-bootstrap'
import { getConfigurations } from '../../utils/queryAPI/configurations'

const AppPhone = () => {
  const [allConfigurations, setAllConfigurations] = useState(undefined)
  const [imgAppStore, setImgAppStore] = useState(undefined)
  const [urlAppStore, setUrlAppStore] = useState(undefined)
  const [imgGooglePlay, setImgGooglePlay] = useState(undefined)
  const [urlGooglePlay, setUrlGooglePlay] = useState(undefined)

  useEffect(() => {
    dataConfig()
  }, [])
  const dataConfig = async () => {
    const params = { deleted: false }
    const data = await getConfigurations(params)
    setAllConfigurations(data.allConfigurations)
  }

  useEffect(() => {
    dataAppStore()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allConfigurations])

  const dataAppStore = async () => {
    const img = allConfigurations?.find((d) => d.title === 'Imágen AppStore')
    const url = allConfigurations?.find((d) => d.title === 'AppStore')
    const img1 = allConfigurations?.find(
      (d) => d.title === 'Imágen Google Play'
    )
    const url1 = allConfigurations?.find((d) => d.title === 'Google Play')

    setImgAppStore(img)
    setUrlAppStore(url)
    setImgGooglePlay(img1)
    setUrlGooglePlay(url1)
  }

  return (
    <>
      {!allConfigurations ? null : (
        <div className='footer-section-phone'>
          {allConfigurations.map((d) => {
            let data
            if (d.title === 'Imágen celular pie de página') {
              return (
                <Row key={d._id}>
                  <Col>
                    <div className='container-img-foot'>
                      <img
                        src={d.mixedField}
                        alt='App'
                        className='img-foot-phone'
                      />
                    </div>
                  </Col>
                </Row>
              )
            }
            return data
          })}
          <Row className='container-app '>
            {imgAppStore && urlAppStore && (
              <Col xs={12} className='pb-2 pe-0 col-img-app'>
                <a
                  href={urlAppStore.mixedField}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <img
                    src={imgAppStore.mixedField}
                    alt='App'
                    className='img-foot-app'
                  />
                </a>
              </Col>
            )}
            {imgGooglePlay && urlGooglePlay && (
              <Col xs={12} className='pb-2 pe-0 col-img-app'>
                <a
                  href={urlGooglePlay.mixedField}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <img
                    src={imgGooglePlay.mixedField}
                    alt='App'
                    className='img-foot-app'
                  />
                </a>
              </Col>
            )}
          </Row>
        </div>
      )}
    </>
  )
}

export default AppPhone
