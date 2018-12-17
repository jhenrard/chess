import React from 'react'

const Square = (props) => {
  const { piece, image, player, row, col} = props.chessman

  return (
    <div className={props.colorClass}><img src={image} /></div>
  )
}

export default Square
