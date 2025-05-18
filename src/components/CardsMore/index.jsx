import React from 'react'
import CardMore from './CardMore'

const CardsMoreContainer = ({ moreNews }) => {
  return (
    <div>
      {moreNews?.map((d, i) => (
        <CardMore data={d} key={i} />
      ))}
    </div>
  )
}

export default CardsMoreContainer
