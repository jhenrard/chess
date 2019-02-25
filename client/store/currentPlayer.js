import axios from 'axios'
import { fetchBoard } from './board';

// action types

const GOT_PLAYER = 'GOT_PLAYER'
// const SET_PLAYER = 'SET_PLAYER'

// action creators

export const gotPlayer = (player) => {
  return {
    type: GOT_PLAYER,
    player,
  }
}

// export const setPlayer = (player) => {
//   return {
//     type: SET_PLAYER,
//     player,
//   }
// }

// thunk creators

export const setPlayerNum = (gameId, user) => {
  return async dispatch => {
    const res = await axios.get(`/api/games/${gameId}`)
    const {data: game} = res
    console.log('game in thunk: ', game)
    if (!game.player1Id || game.player1Id === user.id) {
      await axios.put(`/api/games/${gameId}`, {player1Id: user.id})
      dispatch(gotPlayer(1))
      dispatch(fetchBoard(gameId, 1))
    } else if (!game.player2Id || game.player2Id === user.id) {
      await axios.put(`/api/games/${gameId}`, {player2Id: user.id})
      dispatch(gotPlayer(2))
      dispatch(fetchBoard(gameId, 2))
    } else {
      dispatch(gotPlayer(3))
      dispatch(fetchBoard(gameId, 3))
    }

    // add name - prompt in lobby and otherwise in game - store in DB - for remembering seats
    // add auth, associate users to games
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
