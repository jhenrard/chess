import React from 'react'
import {DropTarget} from 'react-dnd'
import Piece from './Piece'
import {connect as connectRedux} from 'react-redux'
// import dropPiece from '../util'
import {isPawnMoveValid, createServerPieces} from '../util'

const squareTarget = {
  drop(props, monitor) {
    const piece = monitor.getItem()
    const fromX = piece.x
    const fromY = piece.y
    piece.x = props.x
    piece.y = props.y

    const newComponent = <Piece piece={{piece: piece.piece, x: piece.x, y: piece.y, player: piece.player}} />
    // console.log(props)
    const newBoard = dropPiece(newComponent, piece, {x: fromX, y: fromY}, {x: piece.x, y: piece.y}, props.board)
    console.log('server pieces passed to updateBoard thunk', createServerPieces(newBoard))
    props.updateBoard(createServerPieces(newBoard))
  }
}

function dropPiece (newComponent, piece, from, to, board) {
  const newBoard = [...board]

  if (piece.piece === 'Pawn' && isPawnMoveValid(from, to, newBoard)) {
    // const canPawnMove = isPawnMoveValid(from, to)
    // const fromX = from.x, fromY = from.y, toX = to.x, toY = to.y
    // const forward = (toX - fromX === -1) && (toY === fromY)
    // const diagonal = (toX - fromX === -1) && (Math.abs(toY - fromY) === 1)
    // const opponentPieceToTake = this.state.board[toX][toY] && this.state.board[toX][toY].props.piece.player === 2 // REMEMBER TO REFACTOR FOR PLAYER 2 VIEW
    // if ((forward && !opponentPieceToTake) || (diagonal && opponentPieceToTake)) {
    // if (canPawnMove)
      newBoard[from.x][from.y] = ''
      newBoard[to.x][to.y] = newComponent
    }
  // }
  return newBoard
  // this.setState({board: newBoard})
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

const mapStateToProps = (state) => {
  return {
    board: state,
  }
}

// const mapDispatchToProps = (dispatch) => {
//   return {

//   }
// }

const connectedSquare = connectRedux(mapStateToProps)(Square)
export default DropTarget('Piece', squareTarget, collect)(connectedSquare)
