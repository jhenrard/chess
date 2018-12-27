import axios from 'axios'

// action types

const GET_PLAYER_TURN = 'GET_PLAYER_TURN'
const SET_PLAYER_TURN = 'SET_PLAYER_TURN'

// action creators

export const getPlayerTurn = (player) => {
  return {
    type: GET_PLAYER_TURN,
    player,
  }
}

export const setPlayerTurn = (player) => {
  return {
    type: SET_PLAYER_TURN,
    player,
  }
}

// thunk creators

export const fetchPlayerTurn = (id) => {
  return async (dispatch) => {
    const res = await axios.get(`/api/games/${id}`)
    const {data: game} = res
    dispatch(getPlayerTurn(game.currentPlayerTurn))
  }
}

// reducer

export default function (state = 1, action) {
  switch (action.type) {
    case GET_PLAYER_TURN:
      return action.player
    case SET_PLAYER_TURN:
      return action.player
   default:
      return state
  }
}
