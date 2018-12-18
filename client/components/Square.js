import React from 'react'
import {DropTarget} from 'react-dnd'
import Piece from './Piece'

const squareTarget = {
  drop(props, monitor) {
    const piece = monitor.getItem()
    const fromX = piece.x
    const fromY = piece.y
    piece.x = props.x
    piece.y = props.y

    const newComponent = <Piece piece={{piece: piece.piece, x: piece.x, y: piece.y, player: piece.player}} />
    props.dropPiece(newComponent, piece, {x: fromX, y: fromY}, {x: piece.x, y: piece.y})
  }
}

function collect (connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  }
}

const Square = (props) => {

  return props.connectDropTarget(
    <div className={(!props.isOver) ? props.colorClass : "highlight"}>{props.children}</div>
  )
}

export default DropTarget('Piece', squareTarget, collect)(Square)
