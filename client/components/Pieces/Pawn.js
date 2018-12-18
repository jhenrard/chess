import React from 'react'
import { DragSource } from 'react-dnd'

const pawnSourceContract = {
  beginDrag(props) {
    return {
      x: props.piece.x,
      y: props.piece.y,
      player: props.piece.player,
      piece: 'Pawn',
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

const Pawn = (props) => {
  const img = new Image()
  img.src = `/P${props.piece.player}_Pawn.png`
  props.connectDragPreview(img)

  return props.connectDragSource(
      <img className="test" src={`/P${props.piece.player}_Pawn.png`} />
    )
}

export default DragSource('Pawn', pawnSourceContract, collect)(Pawn)
