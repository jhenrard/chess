// action types

const ADD_SQUARE = 'ADD_SQUARE'
const REMOVE_ALL_SQUARES = 'REMOVE_ALL_SQUARES'

// action creators

export const addSquare = (square) => {
  return {
    type: ADD_SQUARE,
    square,
  }
}

export const removeAllSquares = () => {
  return {
    type: REMOVE_ALL_SQUARES,
  }
}

// reducer

export default function (state = [], action) {
  switch (action.type) {
    case ADD_SQUARE:
    return action.square
  case REMOVE_ALL_SQUARES:
    return []
  default:
    return state
  }
}
