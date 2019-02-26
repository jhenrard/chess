import axios from 'axios'

// action types

const GOT_PLAYER_TURN = 'GOT_PLAYER_TURN'

// action creators

export const gotPlayerTurn = (player) => {
  return {
    type: GOT_PLAYER_TURN,
    player,
  }
}

// thunk creators

export const fetchPlayerTurn = (id) => {
  return async (dispatch) => {
    const res = await axios.get(`/api/games/${id}`)
    const {data: game} = res
    dispatch(gotPlayerTurn(game.currentPlayerTurn))
  }
}

// reducer

export default function (state = 0, action) {
  switch (action.type) {
    case GOT_PLAYER_TURN:
      return action.player
   default:
      return state
  }
}
