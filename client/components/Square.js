import React from 'react'
import {DropTarget} from 'react-dnd'
import Piece from './Piece'
import {createServerPieces, dropPiece} from '../gamelogic'

const squareTarget = {
  drop(props, monitor) {
    const piece = monitor.getItem()
    const fromX = piece.x, fromY = piece.y

    const newComponent = <Piece piece={{piece: piece.piece, x: props.x, y: props.y, player: piece.player}} />
    const newBoard = dropPiece(newComponent, piece, {x: fromX, y: fromY}, {x: props.x, y: props.y}, props.board)
    props.updateBoard(createServerPieces(newBoard))
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
