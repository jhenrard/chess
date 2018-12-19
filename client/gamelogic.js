import React from 'react'
import {Piece} from './components'

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
  const serverBoard = componentBoard.map( (row) => {
    return row.map( (componentPiece) => {
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

const isPawnMoveValid = (from, to, board) => {
  const fromX = from.x, fromY = from.y, toX = to.x, toY = to.y
  const forward = (toX - fromX === -1) && (toY === fromY)
  const diagonal = (toX - fromX === -1) && (Math.abs(toY - fromY) === 1)
  const opponentPieceToTake = board[toX][toY] && board[toX][toY].props.piece.player === 2 // REMEMBER TO REFACTOR FOR PLAYER 2 VIEW
  return ((forward && !opponentPieceToTake) || (diagonal && opponentPieceToTake))
}

/////////////////////////////////////////////////////////////////

///  PIECE ALREADY HAS FROM INCLUDED, DO NOT NEED EXTRA PARAM ///

/////////////////////////////////////////////////////////////////

export function dropPiece (newComponent, piece, from, to, board) {
  const newBoard = [...board]

  if (piece.piece === 'Pawn' && isPawnMoveValid(from, to, board)) {
      newBoard[from.x][from.y] = ''
      newBoard[to.x][to.y] = newComponent
    }
  return newBoard
}

export function checkSquare(piece, from, to, board) {
  return (piece.piece === 'Pawn' && isPawnMoveValid(from, to, board))
}

// NEED TO REFACTOR TO ONLY EVALUATE POSSIBLE ROUTES. CHECKING WHOLE BOARD UNTIL IT WORKS
export function findDestinationsForPiece(piece, from, board) {
  const validDestinations = []
  if (piece === 'Pawn') {
    for (let i = 0; i < 64; i++) {
      const row = Math.floor(i / 8)
      const col = i % 8
      if (isPawnMoveValid(from, {x: row, y: col}, board)) {
        validDestinations.push(i)
      }
    }
  }
  return validDestinations
}
