import React from 'react'
import {Piece} from './components'
import {connect} from 'react-redux'

export function createComponentPieces (serverBoard) {
  const componentBoard = serverBoard.map( (row, rowIdx) => {
    return row.map( (serverPiece, col) => {
      const player = Number(serverPiece[1])
      const piece = serverPiece.slice(3)
      if (piece.length) {
        return <Piece piece={{player, x: rowIdx, y: col, piece}} />
      } else {
        return ''
      }
    })
  })
  return componentBoard
}

export function createServerPieces (componentBoard) {
  const serverBoard = componentBoard.map( (row, rowIdx) => {
    return row.map( (componentPiece, col) => {
      if(componentPiece) {
        const piece = componentPiece.props.piece
        return `P${piece.player}_${piece.piece}`
      } else {
        return ''
      }
    })
  })
  return serverBoard
}

export const isPawnMoveValid = (from, to, board) => {
  const fromX = from.x, fromY = from.y, toX = to.x, toY = to.y
  const forward = (toX - fromX === -1) && (toY === fromY)
  const diagonal = (toX - fromX === -1) && (Math.abs(toY - fromY) === 1)
  const opponentPieceToTake = board[toX][toY] && board[toX][toY].props.piece.player === 2 // REMEMBER TO REFACTOR FOR PLAYER 2 VIEW
  return ((forward && !opponentPieceToTake) || (diagonal && opponentPieceToTake))
}

function dropPiece (newComponent, piece, from, to, board) {
  const newBoard = [...board]

  if (piece.piece === 'Pawn' && isPawnMoveValid(from, to, board)) {
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

export default dropPiece
