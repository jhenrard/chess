import React from 'react'
import {DropTarget} from 'react-dnd'
import {connect as connectRedux} from 'react-redux'
import Square from './Square'
import Piece from './Piece'
import {createServerPieces, dropPiece, checkSquare} from '../gamelogic'

const squareTarget = {
  drop(props, monitor) {
    // props.removeAllSquares()
    const piece = monitor.getItem()
    const fromX = (props.currentPlayer === 2) ? 7 - piece.x : piece.x
    const fromY = (props.currentPlayer === 2) ? 7 - piece.y : piece.y

    if (piece.player === props.currentPlayerTurn) {
      const newComponent = <Piece piece={{piece: piece.piece, x: props.x, y: props.y, player: piece.player}} />
      const newBoard = dropPiece(newComponent, piece, {x: fromX, y: fromY}, {x: props.x, y: props.y}, props.board)
      const nextPlayer = (piece.player === 1) ? 2 : 1

      props.togglecurrentPlayerTurn(nextPlayer)
      // props.setPlayer(nextPlayer)
      props.updateBoard(createServerPieces(newBoard, props.currentPlayer), nextPlayer, props.currentPlayer) // refactor to import store and use dispatch
    }
  },
  canDrop(props, monitor) {
    const piece = monitor.getItem()
    const fromX = (props.currentPlayer === 2) ? 7 - piece.x : piece.x
    const fromY = (props.currentPlayer === 2) ? 7 - piece.y : piece.y

    const answer = checkSquare(piece, {x: fromX, y: fromY}, {x: props.x, y: props.y}, props.board, props.currentPlayer) // refactor to get board and currentPlayer from store
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

class SquareContainer extends React.Component {
  render () {
    console.log('square container rendered')
    const {x, y, canDrop, validSquares, connectDropTarget} = this.props
    // const squareNum = (x * 8 + y)
    // const validMove = validSquares.includes(x * 8 + y)
    const colorClass = ((x + y) % 2) === 0 ? 'white-square' : 'brown-square'

    return connectDropTarget(
      <div className="square-container">
        <div className={colorClass}>
          <Square x={x} y={y} />
        </div>
        {
          (canDrop || validSquares.includes(x * 8 + y)) &&
          <div className="square-highlight" />
        }
      </div>
      )
  }
}

const mapStateToProps = state => {
  return {
    validSquares: state.validSquares,
    currentPlayerTurn: state.currentPlayerTurn
  }
}

const connectedSquare = connectRedux(mapStateToProps)(SquareContainer)
export default DropTarget('Piece', squareTarget, collect)(connectedSquare)
