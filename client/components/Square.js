import React from 'react'
import {DropTarget} from 'react-dnd'
import {connect as connectRedux} from 'react-redux'
import Piece from './Piece'
import {createServerPieces, dropPiece, checkSquare} from '../gamelogic'

const squareTarget = {
  drop(props, monitor) {
    const piece = monitor.getItem()
    const fromX = piece.x, fromY = piece.y

    const newComponent = <Piece piece={{piece: piece.piece, x: props.x, y: props.y, player: piece.player}} />
    const newBoard = dropPiece(newComponent, piece, {x: fromX, y: fromY}, {x: props.x, y: props.y}, props.board)
    props.updateBoard(createServerPieces(newBoard)) // refactor to import store and use dispatch
  },
  canDrop(props, monitor) {
    const piece = monitor.getItem()
    const answer = checkSquare(piece, {x: piece.x, y: piece.y}, {x: props.x, y: props.y}, props.board) // refactor to get board from store
    return answer
  }
}

function collect (connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
  }
}

class Square extends React.Component {

  render () {
    const props = this.props
    const squareNum = (props.x * 8 + props.y)
    const validMove = props.validSquares.includes(squareNum)

    return props.connectDropTarget(
      <div className={(!props.canDrop && !validMove ) ? props.colorClass : "highlight"}>{props.children}</div>
      )
  }
}

  // hover higlight !props.isOver &&

const mapStateToProps = state => {
  return {
    validSquares: state.validSquares,
  }
}

const connectedSquare = connectRedux(mapStateToProps)(Square)
export default DropTarget('Piece', squareTarget, collect)(connectedSquare)
