// action types

const GOT_SINGLE_GAME = 'GOT_GAME'

// action creators

export const gotGame = gameId => {
  return {
    type: GOT_SINGLE_GAME,
    gameId,
  }
}

// reducer

export default function (state = 0, action) {
  switch (action.type) {
    case GOT_SINGLE_GAME:
      return action.gameId
    default:
      return state
  }
}
