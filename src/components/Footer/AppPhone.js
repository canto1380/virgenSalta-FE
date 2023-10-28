import React from 'react'
import AppPhoneImg from '../../images/appPhone.png'
import AppStore from '../../images/appStpre.png'
import GooglePlay from '../../images/googlePlay.png'

const AppPhone = () => {
  return (
    <div className='footer-section-phone'>
      <div
        xs={12}
        sm={4}
        className='d-flex align-items-start justify-content-end container-img-foot pb-3'
      >
        <img src={AppPhoneImg} alt='App' className='img-foot-phone' />
      </div>
      <div
        xs={12}
        sm={4}
        className='d-flex align-items-start justify-content-end container-img-foot pb-3'
      >
        <img src={AppStore} alt='App' className='img-foot-app' />
      </div>
      <div
        xs={12}
        sm={4}
        className='d-flex align-items-start justify-content-end container-img-foot pb-3'
      >
        <img src={GooglePlay} alt='App' className='img-foot-app' />
      </div>
    </div>
  )
}

export default AppPhone
