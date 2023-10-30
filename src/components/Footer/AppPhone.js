import React from 'react'
import AppPhoneImg from '../../images/appPhone.png'
import AppStore from '../../images/appStpre.png'
import GooglePlay from '../../images/googlePlay.png'

const AppPhone = () => {
  return (
    <div className='footer-section-phone'>
      <div xs={12} sm={4} className='container-img-foot pb-3'>
        <img src={AppPhoneImg} alt='App' className='img-foot-phone' />
      </div>
      <div className='container-app'>
        <div
          xs={12}
          sm={4}
          className='d-flex align-items-start justify-content-end  pb-3'
        >
          <a
            href='https://apps.apple.com/ve/app/obra-imcej-y-sacej/id1610015797'
            target='_blank'
            rel='noopener noreferrer'
          >
            <img src={AppStore} alt='App' className='img-foot-app' />
          </a>
        </div>
        <div
          xs={12}
          sm={4}
          className='d-flex align-items-start justify-content-end  pb-3 ps-3'
        >
          <a
            href='https://play.google.com/store/apps/details?id=com.app.vercel51s'
            target='_blank'
            rel='noopener noreferrer'
          >
            <img src={GooglePlay} alt='App' className='img-foot-app' />
          </a>
        </div>
      </div>
    </div>
  )
}

export default AppPhone
