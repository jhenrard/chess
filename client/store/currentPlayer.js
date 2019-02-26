import axios from 'axios'
import { fetchBoard } from './board';

// action types

const GOT_PLAYER = 'GOT_PLAYER'

// action creators

export const gotPlayer = (player) => {
  return {
    type: GOT_PLAYER,
    player,
  }
}

// thunk creators

export const setPlayerNum = (gameId, user) => {
  return async dispatch => {
    const res = await axios.get(`/api/games/${gameId}`)
    const {data: game} = res
    if (!game.player1Id || game.player1Id === user.id) {
      await axios.put(`/api/games/${gameId}/player1Id`, {player1Id: user.id})
      dispatch(gotPlayer(1))
      dispatch(fetchBoard(gameId, 1))
    } else if (!game.player2Id || game.player2Id === user.id) {
      await axios.put(`/api/games/${gameId}/player2Id`, {player2Id: user.id})
      dispatch(gotPlayer(2))
      dispatch(fetchBoard(gameId, 2))
    } else {
      dispatch(gotPlayer(3))
      dispatch(fetchBoard(gameId, 3))
    }
  }
}

// reducer

export default function (state = 0, action) {
  switch (action.type) {
    case GOT_PLAYER:
      return action.player
    default:
      return state
  }
}
