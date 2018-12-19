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

//////////////////////////////////////
/////   UTILITIES FOR CHECKING   /////
//////////////////////////////////////

const moveDirection = (from, to) => {

}

//////////////////////////////////
/////   PAWN MOVE CHECKING   /////
//////////////////////////////////


// ASK GABE ABOUT THIS - LINTER DID NOT LIKE COMPLEXITY AND EVENTUALLY BROKE CLICK HANDLER UNTIL MOVE SOME OF IF THEN INTO PAWN MOVE FUNCTION. WAS IN FACT PERFORMING UNNECESSARY CHECKS BUT STILL A LOT NOW
const isPawnMoveValid = (from, to, board) => {
  const moveType = pawnMove(from, to)
  const ownPieceInWay = board[to.x][to.y] && board[to.x][to.y].props.piece.player === 1
  const opponentPieceToTake = board[to.x][to.y] && board[to.x][to.y].props.piece.player === 2
  const valid = ((moveType === 'diagonal' && !opponentPieceToTake) || (moveType === 'forward' && opponentPieceToTake)) ? 'invalid' : moveType
  return (valid !== 'invalid' && !ownPieceInWay)
}

const pawnMove = (from, to) => {
  const fromX = from.x, fromY = from.y, toX = to.x, toY = to.y
  if (fromY === toY && toX - fromX === -1) {
    return 'forward'
  } else if ((toX - fromX === -1) && (Math.abs(toY - fromY) === 1)) {
    return 'diagonal'
  } else if ((fromY === toY) && (toX - fromX === -2) && fromX === 6) {
    return 'doubleForward'
  } else {
    return 'invalid'
  }
}

//////////////////////////////////
/////   QUEEN MOVE CHECKING   /////
//////////////////////////////////

const isQueenMoveValid = (from, to, board) => {
  const moveType = queenMove(from, to)
}

const queenMove = (from, to) => {

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

// THIS IS USED BY SQUARE.JS DROP TARGET TO CHECK IF EACH SQUARE IS VALID MOVE FOR HIGHLIGHTING
export function checkSquare(piece, from, to, board) {
  return (piece.piece === 'Pawn' && isPawnMoveValid(from, to, board))
}

// USED BY CLICK HANDLER FOR HIGHLIGHTING. NEED TO REFACTOR TO ONLY EVALUATE POSSIBLE ROUTES. CHECKING WHOLE BOARD UNTIL IT WORKS
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
