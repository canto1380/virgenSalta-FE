import React, { useEffect } from 'react';

const BodyNews = ({data}) => {
  console.log(data)

  const as = () => {
    const ida = document.querySelector('.ida')
    ida.innerHTML += `
    ${data}
    `
  }
  useEffect(()=> {
    if(data) {
      const ida = document.querySelector('.ida')
      ida.innerHTML += `
      ${data}
      `
    }
  },[data])
  return (
    <div className='single-news-description'>
      {/* <span>{data}</span> */}
      <div className='ida'></div>

    </div>
  );
};

export default BodyNews;
