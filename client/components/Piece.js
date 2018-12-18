import React from 'react'
import { DragSource } from 'react-dnd'

const pieceSource = {
  beginDrag(props) {
    return {
      x: props.piece.x,
      y: props.piece.y,
      player: props.piece.player,
      piece: props.piece.piece,
    }
  }
}

const collect = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
  }
}

const Piece = (props) => {
  const img = new Image()
  img.src = `/P${props.piece.player}_${props.piece.piece}.png`
  props.connectDragPreview(img)

  return props.connectDragSource(
      <img src={`/P${props.piece.player}_${props.piece.piece}.png`} />
    )
}

export default DragSource('Piece', pieceSource, collect)(Piece)
