// ASK GABE ABOUT COMPLEXITY - LINTER DID NOT LIKE COMPLEXITY AND EVENTUALLY BROKE CLICK HANDLER UNTIL MOVE SOME OF IF THEN INTO PAWN MOVE FUNCTION. WAS IN FACT PERFORMING UNNECESSARY CHECKS BUT STILL A LOT NOW

import React from 'react'
import {Piece} from './components'

///////////// MOVE TO UTILS FILE /////////////
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

///////////// MOVE TO UTILS FILE /////////////
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

////////////////////////////////////////////
/////   UTILITIES FOR CHECKING MOVES   /////
////////////////////////////////////////////

const FORWARD = 'forward'
const BACK = 'back'
const LEFT = 'left'
const RIGHT = 'right'
const FORWARDLEFT = 'forwardleft'
const FORWARDRIGHT = 'forwardright'
const BACKLEFT = 'backleft'
const BACKRIGHT = 'backright'
const KNIGHTMOVE = 'knight'
const INVALID = 'invalid'
const LOWER_BOUND = 0
const UPPER_BOUND = 7
const PAWN = 'Pawn'
const QUEEN = 'Queen'
const KING = 'King'
const ROOK = 'Rook'
const KNIGHT = 'Knight'
const BISHOP = 'Bishop'

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
      direction: FORWARDLEFT,
      condition: () => (from.x - to.x === from.y - to.y && to.x < from.x),
    },
    {
      direction: FORWARDRIGHT,
      condition: () => (from.x - to.x === -(from.y - to.y) && to.y > from.y),
    },
    {
      direction: BACKLEFT,
      condition: () => (from.x - to.x === -(from.y - to.y) && to.x > from.x),
    },
    {
      direction: BACKRIGHT,
      condition: () => (from.x - to.x === (from.y - to.y) && to.y > from.y),
    },
    {
      direction: KNIGHTMOVE,
      condition: () => (Math.abs(from.x - to.x) === 1 && (Math.abs(from.y - to.y) === 2) || ((Math.abs(from.x - to.x) === 2) && (Math.abs(from.y - to.y) === 1))),
    }
  ]

  for (let i = 0; i < directions.length; i++) {
    if (directions[i].condition(from, to)) return directions[i].direction
  }

  return INVALID
}

const evaluateMoveDistance = (from, to) => {
  return Math.max(Math.abs(from.x - to.x), Math.abs(from.y - to.y))
}


const pathMaxDistanceFunctionCreator = (path) => {
  const pathUtils = {
    [FORWARD]: {
      nextPieceOnPathExists: (nextX) => (nextX >= LOWER_BOUND),
      nextX: x => x - 1,
      nextY: y => y,
    },
    [BACK]: {
      nextPieceOnPathExists: (nextX) => (nextX <= UPPER_BOUND),
      nextX: x => x + 1,
      nextY: y => y,
    },
    [LEFT]: {
      nextPieceOnPathExists: (nextX, nextY) => (nextY >= LOWER_BOUND),
      nextX: x => x,
      nextY: y => (y - 1),
    },
    [RIGHT]: {
      nextPieceOnPathExists: (nextX, nextY) => (nextY <= UPPER_BOUND),
      nextX: x => x,
      nextY: y => y + 1,
    },
    [FORWARDLEFT]: {
      nextPieceOnPathExists: (nextX, nextY) => (nextX >= LOWER_BOUND && nextY >= LOWER_BOUND),
      nextX: x => x - 1,
      nextY: y => y - 1,
    },
    [FORWARDRIGHT]: {
      nextPieceOnPathExists: (nextX, nextY) => (nextX >= LOWER_BOUND && nextY <= UPPER_BOUND),
      nextX: x => x - 1,
      nextY: y => y + 1,
    },
    [BACKLEFT]: {
      nextPieceOnPathExists: (nextX, nextY) => (nextX <= UPPER_BOUND && nextY >= LOWER_BOUND),
      nextX: x => x + 1,
      nextY: y => y - 1,
    },
    [BACKRIGHT]: {
      nextPieceOnPathExists: (nextX, nextY) => (nextX <= UPPER_BOUND && nextY <= UPPER_BOUND),
      nextX: x => x + 1,
      nextY: y => y + 1,
    },
  }

  return function (from, board) {
    let maxDistance = 0
    let nextX = pathUtils[path].nextX(from.x)
    let nextY = pathUtils[path].nextY(from.y)
    let nextSquare = pathUtils[path].nextPieceOnPathExists(nextX, nextY) && board[nextX][nextY]

    while (pathUtils[path].nextPieceOnPathExists(nextX, nextY)) {
      if (nextSquare) {
        maxDistance = maxDistance + nextSquare.props.piece.player - 1
        return maxDistance
      }
      maxDistance = maxDistance + 1
      nextX = pathUtils[path].nextX(nextX)
      nextY = pathUtils[path].nextY(nextY)
      nextSquare = pathUtils[path].nextPieceOnPathExists(nextX, nextY) && board[nextX][nextY]
    }
    return maxDistance
  }
}

const evaluateMaxMoveDistance = (direction, from, to, board) => {

  const maxDistanceCalculator = pathMaxDistanceFunctionCreator(direction)

  if (direction !== INVALID) {
    return maxDistanceCalculator(from, board)
  }

  return 0
}

///////////////////////////////////////////////////////////////////////////////////
/////                  QUEEN, KING, BISHOP, ROOK MOVE CHECKING                /////
///////////////////////////////////////////////////////////////////////////////////

const isQueenKingBishopRookMoveValid = (piece) => {
  const validMoveUtils = {
    [QUEEN]: {
      validDirections: [FORWARD, BACK, LEFT, RIGHT, FORWARDLEFT, FORWARDRIGHT, BACKLEFT, BACKRIGHT],
      maxDistanceCondition: directionMaxLength => directionMaxLength,
    },
    [KING]: {
      validDirections: [FORWARD, BACK, LEFT, RIGHT, FORWARDLEFT, FORWARDRIGHT, BACKLEFT, BACKRIGHT],
      maxDistanceCondition: directionMaxLength => Math.min(directionMaxLength, 1),
    },
    [BISHOP]: {
      validDirections: [FORWARDLEFT, FORWARDRIGHT, BACKLEFT, BACKRIGHT],
      maxDistanceCondition: directionMaxLength => directionMaxLength,
    },
    [ROOK]: {
      validDirections: [FORWARD, BACK, LEFT, RIGHT],
      maxDistanceCondition: directionMaxLength => directionMaxLength,
    },
  }

  return function(from, to, board) {
    const currentMoveDirection = evaluateMoveDirection(from, to)
    const currentMoveDirectionMaxLength = (validMoveUtils[piece].validDirections.includes(currentMoveDirection)) ? evaluateMaxMoveDistance(currentMoveDirection, from, to, board) : INVALID
    return (evaluateMoveDistance(from, to) <= validMoveUtils[piece].maxDistanceCondition(currentMoveDirectionMaxLength))
  }
}

///////////////////////////////////////////////////////////////////////////////////
/////                            KNIGHT MOVE CHECKING                         /////
///////////////////////////////////////////////////////////////////////////////////

const validKnightDestinationCoords = (to) => {
  return to.x <= UPPER_BOUND && to.y <= UPPER_BOUND && to.x >= LOWER_BOUND && to.y >= LOWER_BOUND
}

const isKnightMoveValid = (from, to, board) => {
  const validDestinationCoords = validKnightDestinationCoords(to)
  const validMovement = evaluateMoveDirection(from, to) === KNIGHTMOVE
  const validDestinationPiece = (board[to.x][to.y] && board[to.x][to.y].props.piece.player !== 1) || (validDestinationCoords && !board[to.x][to.y])
  return (validMovement && validDestinationPiece)
}

///////////////////////////////////////////////////////////////////////////////////
/////     PAWN MOVE CHECKING - NEED TO REFACTOR AND ADD EN PASSANT MOVE       /////
///////////////////////////////////////////////////////////////////////////////////




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

const isPawnMoveValid = (from, to, board) => {
  const moveType = pawnMove(from, to)
  const ownPieceInWay = board[to.x][to.y] && board[to.x][to.y].props.piece.player === 1
  const opponentPieceToTake = board[to.x][to.y] && board[to.x][to.y].props.piece.player === 2
  const valid = ((moveType === 'diagonal' && !opponentPieceToTake) || (moveType === 'forward' && opponentPieceToTake)) ? 'invalid' : moveType
  return (valid !== 'invalid' && !ownPieceInWay)
}


// THIS IS USED BY THE DROPPIECE, CHECKSQUARE, AND FINDDESTINATIONSFORPIECES FUNCTIONS BELOW
const pieceMoveCheckFunctions = {
  [PAWN]: isPawnMoveValid,
  [QUEEN]: isQueenKingBishopRookMoveValid(QUEEN),
  [KING]:  isQueenKingBishopRookMoveValid(KING),
  [KNIGHT]: isKnightMoveValid,
  [BISHOP]:  isQueenKingBishopRookMoveValid(BISHOP),
  [ROOK]:  isQueenKingBishopRookMoveValid(ROOK),
}

// THIS IS USED BY SQUARE.JS DROP TARGET TO COMPLETE THE DROP
export function dropPiece (newComponent, piece, from, to, board) { //  PIECE ALREADY HAS FROM INCLUDED, DO NOT NEED EXTRA PARAM
  const newBoard = [...board]

  if (pieceMoveCheckFunctions[piece.piece](from, to, board)) {
    newBoard[from.x][from.y] = ''
    newBoard[to.x][to.y] = newComponent
  }

  return newBoard
}

// THIS IS USED BY SQUARE.JS DROP TARGET TO CHECK IF EACH SQUARE IS VALID MOVE FOR HIGHLIGHTING
export function checkSquare(piece, from, to, board, currentPlayer) {
  // if (piece.player === currentPlayer) { return pieceMoveCheckFunctions[piece.piece](from, to, board) }
  // return false

  return pieceMoveCheckFunctions[piece.piece](from, to, board)
}

// USED BY CLICK HANDLER IN PIECE.JS FOR HIGHLIGHTING. NEED TO REFACTOR TO ONLY EVALUATE POSSIBLE ROUTES. CHECKING WHOLE BOARD UNTIL EVERYTHING WORKS
export function findDestinationsForPiece(piece, from, board) {
  const validDestinations = []

  for (let i = 0; i < 64; i++) {
    const row = Math.floor(i / 8)
    const col = i % 8
    pieceMoveCheckFunctions[piece](from, {x: row, y: col}, board) && validDestinations.push(i)
  }
  return validDestinations
}




// ///////////////////////////////////////////////////////////////////////////////////
// /////                           QUEEN MOVE CHECKING                           /////
// ///////////////////////////////////////////////////////////////////////////////////

// const isQueenMoveValid = (from, to, board) => {
//   const validDirections = [FORWARD, BACK, LEFT, RIGHT, FORWARDLEFT, FORWARDRIGHT, BACKLEFT, BACKRIGHT]
//   const currentMoveDirection = evaluateMoveDirection(from, to)
//   const currentMoveDirectionMaxLength = (validDirections.includes(currentMoveDirection)) ? evaluateMaxMoveDistance(currentMoveDirection, from, to, board) : INVALID
//   return (evaluateMoveDistance(from, to) <= currentMoveDirectionMaxLength)
// }

// ///////////////////////////////////////////////////////////////////////////////////
// /////                           KING MOVE CHECKING                            /////
// ///////////////////////////////////////////////////////////////////////////////////

// const isKingMoveValid = (from, to, board) => {
//   const validDirections = [FORWARD, BACK, LEFT, RIGHT, FORWARDLEFT, FORWARDRIGHT, BACKLEFT, BACKRIGHT]
//   const currentMoveDirection = evaluateMoveDirection(from, to)
//   const currentMoveDirectionMaxLength = (validDirections.includes(currentMoveDirection)) ? evaluateMaxMoveDistance(currentMoveDirection, from, to, board) : INVALID
//   return evaluateMoveDistance(from, to) <= Math.min(currentMoveDirectionMaxLength, 1)
// }

// ///////////////////////////////////////////////////////////////////////////////////
// /////                           BISHOP MOVE CHECKING                          /////
// ///////////////////////////////////////////////////////////////////////////////////

// const isBishopMoveValid = (from, to, board) => {
//   const validDirections = [FORWARDLEFT, FORWARDRIGHT, BACKLEFT, BACKRIGHT]
//   const currentMoveDirection = evaluateMoveDirection(from, to)
//   const currentMoveDirectionMaxLength = (validDirections.includes(currentMoveDirection)) ? evaluateMaxMoveDistance(currentMoveDirection, from, to, board) : INVALID
//   return (evaluateMoveDistance(from, to) <= currentMoveDirectionMaxLength)
// }

// ///////////////////////////////////////////////////////////////////////////////////
// /////                           ROOK MOVE CHECKING                          /////
// ///////////////////////////////////////////////////////////////////////////////////

// const isRookMoveValid = (from, to, board) => {
//   const validDirections = [FORWARD, BACK, LEFT, RIGHT]
//   const currentMoveDirection = evaluateMoveDirection(from, to)
//   const currentMoveDirectionMaxLength = (validDirections.includes(currentMoveDirection)) ? evaluateMaxMoveDistance(currentMoveDirection, from, to, board) : INVALID
//   return (evaluateMoveDistance(from, to) <= currentMoveDirectionMaxLength)
// }
