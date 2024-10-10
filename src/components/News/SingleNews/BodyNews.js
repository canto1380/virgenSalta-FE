import React, { useEffect, useRef } from 'react'
import './singleNews.css'

const BodyNews = ({ data, photos, fontSize }) => {
  const bodyRef = useRef(null)
  useEffect(() => {
    if (data) {
      bodyText()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  useEffect(() => {
    console.log(fontSize)
    if (bodyRef.current) {
      bodyRef.current.style.fontSize = `${fontSize}px`
      const paragraphs = bodyRef.current.querySelectorAll('p')
      paragraphs.forEach((p) => {
        p.style.fontSize = `${fontSize}px`
      })
    }
  }, [fontSize])

  const bodyText = () => {
    const arr = data.split('</p>')
    const bodyTextElement = bodyRef.current // Referencia al elemento con useRef
    if (bodyTextElement) {
      bodyTextElement.innerHTML = '' // Limpiamos el contenido antes de agregar
      arr.forEach((d) => {
        bodyTextElement.innerHTML += `${d}`
      })
    }
  }

  return (
    <div className='single-news-description'>
      <div
        ref={bodyRef}
        className='ida text-body-news'
        style={{ fontSize: `${fontSize}px` }}
      ></div>
    </div>
  )
}

export default BodyNews
