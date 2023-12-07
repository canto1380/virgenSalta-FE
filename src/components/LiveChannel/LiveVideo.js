import React, { useEffect, useState } from 'react'
import './liveVideo.css'

const LiveVideo = ({ videoLive }) => {
  const [idVideoLive, setIdVideoLive] = useState(undefined)
  useEffect(() => {
    if (videoLive.length > 0) {
      setIdVideoLive(videoLive[0].id.videoId)
    }
  }, [videoLive])
  return (
    <div className='videoLive-container'>
      {idVideoLive && (
        <a
          href={`https://www.youtube.com/watch?v=${idVideoLive}`}
          target='_blank'
          rel='noreferrer'
          className='btn-live'
        >
          <div className='d-flex justify-content-between align-items-center px-5 text-light py-2 bg-dark'>
            <div>
              <p className='text-title mb-0'>{videoLive[0]?.snippet?.title}</p>
            </div>
            <div className='live-indicator-container'>
              <div className='live-dot'></div>
              <span>En Vivo</span>
            </div>
          </div>
        </a>
      )}
    </div>
  )
}

export default LiveVideo
