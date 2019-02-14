// action types

const HIGHLIGHT_VALID_MOVES = 'HIGHLIGHT_VALID_MOVES'
const CLEAR_HIGHLIGHT = 'CLEAR_HIGHLIGHT'

// action creators

export const addSquare = (square) => {
  return {
    type: HIGHLIGHT_VALID_MOVES,
    square,
  }
}

export const removeAllSquares = () => {
  return {
    type: CLEAR_HIGHLIGHT,
  }
}

// reducer

export default function (state = [], action) {
  switch (action.type) {
    case HIGHLIGHT_VALID_MOVES:
      return action.square
    case CLEAR_HIGHLIGHT:
      return []
    default:
      return state
  }
}
