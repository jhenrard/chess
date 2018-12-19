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

const FORWARD = 'forward'
const BACK = 'back'
const LEFT = 'left'
const RIGHT = 'right'
const FORWARDLEFT = 'forwardleft'
const FORWARDRIGHT = 'forwardright'
const DIAGONAL = 'diagonal'
const KNIGHT = 'knight'
const INVALID = 'invalid'

const evaluateMoveDirection = (from, to) => {
  const directions = [
    {
      direction: FORWARD,
      condition: () => (from.x > to.x && from.y === to.y),
    },
    {
      direction: BACK,
      condition: () => (from.x < to.x && from.y === to.y),
    },
    {
      direction: LEFT,
      condition: () => (from.x === to.x && from.y > to.y),
    },
    {
      direction: RIGHT,
      condition: () => (from.x === to.x && from.y < to.y),
    },
    {
      direction: DIAGONAL,
      condition: () => (Math.abs(from.x - to.x) === Math.abs(from.y - to.y) && from.x !== to.x),
    },
    {
      direction: KNIGHT,
      condition: () => (Math.abs(from.x - to.x) === 1 && (Math.abs(from.y - to.y) === 2) || (Math.abs(from.x - to.x) === 2) && (Math.abs(from.y - to.y === 1))),
    }
  ]

  for (let i = 0; i < directions.length; i++) {
    if (directions[i].condition(from, to)) return directions[i].direction
  }

  return INVALID
}

// do i need this?
const evaluateMoveDistance = (from, to) => {
  return Math.max(Math.abs(from.x - to.x), Math.abs(from.y - to.y))
}


const evaluateForwardPath = (from, to, board) => {
  let maxDistance = 0
  let nextSquareX = from.x - 1
  const nextSquareY = from.y
  let nextSquare = board[nextSquareX][nextSquareY]

  while (nextSquareX >= 0) {
    if (nextSquare) {
      maxDistance = maxDistance + nextSquare.props.piece.player - 1
      return maxDistance
    }
    maxDistance = maxDistance + 1
    nextSquareX = nextSquareX - 1
    nextSquare = (nextSquareX >= 0 && nextSquareX <= 7) ? board[nextSquareX][nextSquareY] : null
  }
  return maxDistance
}

const evaluateBackPath = (from, to, board) => {
  let maxDistance = 0
  let nextSquareX = from.x + 1
  const nextSquareY = from.y
  while (nextSquareX < 8 && (!board[nextSquareX][nextSquareY] || (board[nextSquareX][nextSquareY] && board[nextSquareX][nextSquareY].props.piece.player === 2))) {
    maxDistance = maxDistance + 1
    nextSquareX = nextSquareX + 1
  }
  return maxDistance
}

const evaluateLeftPath = (from, to, board) => {
  let maxDistance = 0
  let nextSquareY = from.y + 1
  const nextSquareX = from.x
  while (!board[nextSquareX][nextSquareY] || (board[nextSquareX][nextSquareY] && board[nextSquareX][nextSquareY].props.piece.player === 2)) {
    maxDistance = maxDistance + 1
    nextSquareY = nextSquareY + 1
  }
  return maxDistance
}

const evaluateRightPath = (from, to, board) => {
  let maxDistance = 0
  let nextSquareY = from.y + 1
  const nextSquareX = from.x
  while (!board[nextSquareX][nextSquareY] || (board[nextSquareX][nextSquareY] && board[nextSquareX][nextSquareY].props.piece.player === 2)) {
    maxDistance = maxDistance + 1
    nextSquareY = nextSquareY + 1
  }
  return maxDistance
}

const evaluateUpLeftPath = (from, to, board) => {
  let maxDistance = 0
  let nextSquareX = from.x + 1
  const nextSquareY = from.y
  while (!board[nextSquareX][nextSquareY] || (board[nextSquareX][nextSquareY] && board[nextSquareX][nextSquareY].props.piece.player === 2)) {
    maxDistance = maxDistance + 1
    nextSquareX = nextSquareX + 1
  }
  return maxDistance
}

// const evaluateDiagonalPath = (from, to, board) => {
  //   let maxDistance = 0
  //   let nextSquareX = from.x + 1
  //   const nextSquareY = from.y
  //   while (!board[nextSquareX][nextSquareY] || (board[nextSquareX][nextSquareY] && board[nextSquareX][nextSquareY].props.piece.player === 2)) {
    //     maxDistance = maxDistance + 1
    //     nextSquareX = nextSquareX + 1
    //   }
    //   return maxDistance
    // }

    // const evaluateDiagonalPath = (from, to, board) => {
      //   let maxDistance = 0
      //   let nextSquareX = from.x + 1
      //   const nextSquareY = from.y
      //   while (!board[nextSquareX][nextSquareY] || (board[nextSquareX][nextSquareY] && board[nextSquareX][nextSquareY].props.piece.player === 2)) {
        //     maxDistance = maxDistance + 1
        //     nextSquareX = nextSquareX + 1
        //   }
        //   return maxDistance
        // }

// const evaluateDiagonalPath = (from, to, board) => {
  //   let maxDistance = 0
  //   let nextSquareX = from.x + 1
  //   const nextSquareY = from.y
  //   while (!board[nextSquareX][nextSquareY] || (board[nextSquareX][nextSquareY] && board[nextSquareX][nextSquareY].props.piece.player === 2)) {
    //     maxDistance = maxDistance + 1
    //     nextSquareX = nextSquareX + 1
    //   }
    //   return maxDistance
    // }

// maps all individal maxdistance checks into one
const evaluateMaxMoveDistance = (direction, from, to, board) => {
  const directions = {
    [FORWARD]: evaluateForwardPath,
    [BACK]: evaluateBackPath,
  }
// if statement for testing
 console.log('maxmovedistance direction arg', direction)
  if(directions[direction]) {
    return directions[direction](from, to, board)
  }
  return 3
}
//////////////////////////////////
/////   PAWN MOVE CHECKING   /////
//////////////////////////////////

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

// ASK GABE ABOUT THIS - LINTER DID NOT LIKE COMPLEXITY AND EVENTUALLY BROKE CLICK HANDLER UNTIL MOVE SOME OF IF THEN INTO PAWN MOVE FUNCTION. WAS IN FACT PERFORMING UNNECESSARY CHECKS BUT STILL A LOT NOW
const isPawnMoveValid = (from, to, board) => {
  const moveType = pawnMove(from, to)
  const ownPieceInWay = board[to.x][to.y] && board[to.x][to.y].props.piece.player === 1
  const opponentPieceToTake = board[to.x][to.y] && board[to.x][to.y].props.piece.player === 2
  const valid = ((moveType === 'diagonal' && !opponentPieceToTake) || (moveType === 'forward' && opponentPieceToTake)) ? 'invalid' : moveType
  return (valid !== 'invalid' && !ownPieceInWay)
}


///////////////////////////////////
/////   QUEEN MOVE CHECKING   /////
///////////////////////////////////

const isQueenMoveValid = (from, to, board) => {
  const validDirections = [FORWARD, BACK, LEFT, RIGHT, DIAGONAL]
  const currentMoveDirection = evaluateMoveDirection(from, to)

  const currentMoveDirectionMaxLength = evaluateMaxMoveDistance(currentMoveDirection, from, to, board) // get max length for particular move being evaluted

  // const maxForwardDistance = evaluateForwardPath(from, to, board)
  // console.log('valid? ', (validDirections.includes(currentMoveDirection) && (evaluateMoveDistance(from, to) <= maxForwardDistance)))
  // return (validDirections.includes(currentMoveDirection) && (evaluateMoveDistance(from, to) <= maxForwardDistance))
  return (validDirections.includes(currentMoveDirection) && (evaluateMoveDistance(from, to) <= currentMoveDirectionMaxLength))

}

/////////////////////////////////////////////////////////////////
///  PIECE ALREADY HAS FROM INCLUDED, DO NOT NEED EXTRA PARAM ///
/////////////////////////////////////////////////////////////////

export function dropPiece (newComponent, piece, from, to, board) {
  const newBoard = [...board]

  if (piece.piece === 'Pawn' && isPawnMoveValid(from, to, board)) {
    newBoard[from.x][from.y] = ''
    newBoard[to.x][to.y] = newComponent
  } else if (piece.piece === 'Queen' && isQueenMoveValid(from, to, board)) {
    newBoard[from.x][from.y] = ''
    newBoard[to.x][to.y] = newComponent
  }
  return newBoard
}

// THIS IS USED BY SQUARE.JS DROP TARGET TO CHECK IF EACH SQUARE IS VALID MOVE FOR HIGHLIGHTING
export function checkSquare(piece, from, to, board) {
  if (piece.piece === 'Pawn') {
    return isPawnMoveValid(from, to, board)
  } else if (piece.piece === 'Queen') {
    return isQueenMoveValid(from, to, board)
  }
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
  if (piece === 'Queen') {
    for (let i = 0; i < 64; i++) {
      const row = Math.floor(i / 8)
      const col = i % 8
      if (isQueenMoveValid(from, {x: row, y: col}, board)) {
        validDestinations.push(i)
      }
    }
  }
  return validDestinations
}
