import axios from "axios"

// action types

const GOT_WINNER = 'GOT_WINNER'

// action creators

export const gotWinner = winner => {
  return {
    type: GOT_WINNER,
    winner,
  }
}

// thunk creators

export const fetchWinner = (gameId) => {
  return async dispatch => {
    const res = await axios.get(`/api/games/${gameId}/winner`)
    const {data: winner} = res
    dispatch(gotWinner(winner))
  }
}

export const setWinner = (gameId, player) => {
  return async dispatch => {
    await axios.put(`/api/games/${gameId}/winner`, {winner: player})
    dispatch(gotWinner(player))
  }
}

// reducer

export default function (state = 0, action) {
  switch (action.type) {
    case GOT_WINNER:
      return action.winner
    default:
      return state
  }
}
