////////////////////////////////////////////
////////       MOVE CHECKING        ////////
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

  return function (from, board, currentPlayer) {
    let maxDistance = 0
    let nextX = pathUtils[path].nextX(from.x)
    let nextY = pathUtils[path].nextY(from.y)
    let nextSquare = pathUtils[path].nextPieceOnPathExists(nextX, nextY) && board[nextX][nextY]

    while (pathUtils[path].nextPieceOnPathExists(nextX, nextY)) {
      if (nextSquare.player) {
        const isItMine = (nextSquare.player && nextSquare.player === currentPlayer) ? 0 : 1
        maxDistance = maxDistance + isItMine
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

const evaluateMaxMoveDistance = (direction, from, to, board, currentPlayer) => {

  const maxDistanceCalculator = pathMaxDistanceFunctionCreator(direction)

  if (direction !== INVALID) {
    return maxDistanceCalculator(from, board, currentPlayer)
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


  return function(from, to, board, currentPlayer) {
    const currentMoveDirection = evaluateMoveDirection(from, to)
    const currentMoveDirectionMaxLength = (validMoveUtils[piece].validDirections.includes(currentMoveDirection)) ? evaluateMaxMoveDistance(currentMoveDirection, from, to, board, currentPlayer) : INVALID
    return (evaluateMoveDistance(from, to) <= validMoveUtils[piece].maxDistanceCondition(currentMoveDirectionMaxLength))
  }
}

///////////////////////////////////////////////////////////////////////////////////
/////                            KNIGHT MOVE CHECKING                         /////
///////////////////////////////////////////////////////////////////////////////////

const validKnightDestinationCoords = (to) => {
  return to.x <= UPPER_BOUND && to.y <= UPPER_BOUND && to.x >= LOWER_BOUND && to.y >= LOWER_BOUND
}

const isKnightMoveValid = (from, to, board, currentPlayer) => {
  const validDestinationCoords = validKnightDestinationCoords(to)
  const validMovement = evaluateMoveDirection(from, to) === KNIGHTMOVE
  const validDestinationPiece = (board[to.x][to.y].player && board[to.x][to.y].player !== currentPlayer) || (validDestinationCoords && !board[to.x][to.y].player)
  return (validMovement && validDestinationPiece)
}

///////////////////////////////////////////////////////////////////////////////////
/////     PAWN MOVE CHECKING - NEED TO REFACTOR AND ADD EN PASSANT MOVE       /////
///////////////////////////////////////////////////////////////////////////////////

const pawnMoveDirection = (from, to) => {
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

const evaluatePawnMove = (type, board, from, to, currentPlayer) => {
  const pawnMoveConditions = {
    forward: () => {
      return !board[to.x][to.y].player
    },
    diagonal: () => {
      return board[to.x][to.y].player && board[to.x][to.y].player !== currentPlayer
    },
    doubleForward: () => {
      return !board[to.x + 1][to.y].player && !board[to.x][to.y].player
    },
    'invalid': () => false,
  }
  return pawnMoveConditions[type](board, from, to, currentPlayer)
}

const isPawnMoveValid = (from, to, board, currentPlayer) => {
  const moveType = pawnMoveDirection(from, to)
  return evaluatePawnMove(moveType, board, from, to, currentPlayer)
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
// export function dropPiece (piece, from, to, board) { //  PIECE ALREADY HAS FROM INCLUDED, DO NOT NEED EXTRA PARAM
//   let newBoard = JSON.parse(JSON.stringify(board))
//   newBoard[from.x][from.y] = {}
//   if (newBoard[to.x][to.y].piece && newBoard[to.x][to.y].piece === 'King') {

//   }
//   newBoard[to.x][to.y] = {...piece, x: to.x, y: to.y}
//   return newBoard
// }

// THIS IS USED BY SQUARE.JS DROP TARGET TO CHECK IF EACH SQUARE IS VALID MOVE FOR HIGHLIGHTING
export function checkSquare(piece, from, to, board, currentPlayer) {
  if (piece.player === currentPlayer) {
    return pieceMoveCheckFunctions[piece.piece](from, to, board, currentPlayer)
  }
  return false
}

// USED BY CLICK HANDLER IN PIECE.JS FOR HIGHLIGHTING. NEED TO REFACTOR TO ONLY EVALUATE POSSIBLE ROUTES. CHECKING WHOLE BOARD UNTIL EVERYTHING WORKS
export function findDestinationsForPiece(piece, from, board, currentPlayer) {
  const validDestinations = []

  for (let i = 0; i < 64; i++) {
    const row = Math.floor(i / 8)
    const col = i % 8
    pieceMoveCheckFunctions[piece](from, {x: row, y: col}, board, currentPlayer) && validDestinations.push(i)
  }
  return validDestinations
}
