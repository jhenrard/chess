import React from 'react'
import {DropTarget} from 'react-dnd'
import {connect as connectRedux} from 'react-redux'
import {compose} from 'redux'
import Square from './Square'
import {checkSquare} from '../gamelogic'
import {flipBoard} from '../utils'
import {gotPlayerTurn} from '../store/currentPlayerTurn'
import {updateBoard} from '../store/board'
import {setWinner} from '../store/winner';

const squareTarget = {
  drop(props, monitor) {
    const piece = monitor.getItem()

    if (piece.player === props.currentPlayerTurn) {
      let newBoard = JSON.parse(JSON.stringify(props.board))
      newBoard[piece.x][piece.y] = {}
      if (props.board[props.x][props.y].piece && props.board[props.x][props.y].piece === 'King') {
        props.winner(props.gameId, props.currentPlayer)
      }
      newBoard[props.x][props.y] = {...piece}
      if (piece.player === 2) {
        newBoard = flipBoard(newBoard)
      }

      const nextPlayer = (piece.player === 1) ? 2 : 1
      props.togglecurrentPlayerTurn(nextPlayer)

      props.updateBoard(newBoard, nextPlayer, props.currentPlayer, props.gameId)
    }
  },
  canDrop(props, monitor) {
    const piece = monitor.getItem()
    const validMove = checkSquare(piece, {x: piece.x, y: piece.y}, {x: props.x, y: props.y}, props.board, props.currentPlayer)
    return validMove
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
    gameId: state.game,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    togglecurrentPlayerTurn: (player) => dispatch(gotPlayerTurn(player)),
    updateBoard: (newBoard, currentPlayerTurn, currentPlayer, gameId) => dispatch(updateBoard(gameId, newBoard, currentPlayerTurn, currentPlayer)),
    winner: (gameId, player) => dispatch(setWinner(gameId, player)),
  }
}

export default compose(connectRedux(mapStateToProps, mapDispatchToProps), DropTarget('Piece', squareTarget, collect))(SquareContainer)
