import React from 'react'
import {DropTarget} from 'react-dnd'
import {connect as connectRedux} from 'react-redux'
import {compose} from 'redux'
import Square from './Square'
import {dropPiece, checkSquare} from '../gamelogic'
import {flipBoard} from '../utils'
import {setPlayerTurn} from '../store/currentPlayerTurn'
import {updateBoard} from '../store/board'

const squareTarget = {
  drop(props, monitor) {
    const piece = monitor.getItem()

    if (piece.player === props.currentPlayerTurn) {
      let newBoard = dropPiece(piece, {x: piece.x, y: piece.y}, {x: props.x, y: props.y}, props.board)
      if (piece.player === 2) {
        newBoard = flipBoard(newBoard)
      }

      const nextPlayer = (piece.player === 1) ? 2 : 1
      props.togglecurrentPlayerTurn(nextPlayer)

      props.updateBoard(newBoard, nextPlayer, props.currentPlayer)
    }
  },
  canDrop(props, monitor) {
    const piece = monitor.getItem()
    return checkSquare(piece, {x: piece.x, y: piece.y}, {x: props.x, y: props.y}, props.board, props.currentPlayer)
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
    const {x, y, canDrop, validSquares, connectDropTarget} = this.props

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
    board: state.board,
    validSquares: state.validSquares,
    currentPlayerTurn: state.currentPlayerTurn,
    currentPlayer: state.currentPlayer,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    togglecurrentPlayerTurn: (player) => dispatch(setPlayerTurn(player)),
    updateBoard: (newBoard, currentPlayerTurn, currentPlayer) => dispatch(updateBoard(1, newBoard, currentPlayerTurn, currentPlayer)),
  }
}

export default compose(connectRedux(mapStateToProps, mapDispatchToProps), DropTarget('Piece', squareTarget, collect))(SquareContainer)
