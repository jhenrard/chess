import axios from 'axios'

// action types

const GET_PLAYER = 'GET_PLAYER'
const SET_PLAYER = 'SET_PLAYER'

// action creators

export const getPlayer = (player) => {
  return {
    type: GET_PLAYER,
    player,
  }
}

export const setPlayer = (player) => {
  return {
    type: SET_PLAYER,
    player,
  }
}

// thunk creators

export const fetchPlayer = (id) => {
  return async (dispatch) => {
    const res = await axios.get(`/api/games/${id}`)
    const {data: game} = res
    dispatch(getPlayer(game.currentPlayer))
  }
}

// reducer

export default function (state = 1, action) {
  switch (action.type) {
    case GET_PLAYER:
      return action.player
    case SET_PLAYER:
      return action.player
   default:
      return state
  }
}
