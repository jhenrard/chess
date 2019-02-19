import axios from 'axios'
// import socket from '../socket';

// action types

const GOT_SINGLE_GAME = 'CREATE_SINGLE_GAME'
// const GOT_ALL_GAMES = 'GOT_ALL_GAMES'

// action creators

const gotGame = gameId => {
  return {
    type: GOT_SINGLE_GAME,
    gameId,
  }
}

// const gotAllGames = games => {
//   return {
//     type: GOT_ALL_GAMES,
//     games
//   }
// }

// thunk creators

export const createGame = () => {
  return async dispatch => {
    const res = await axios.post('/api/games')
    const {data: game} = res
    dispatch(gotGame(game.id))
  }
}

// export const fetchGames = () => {
//   return async dispatch => {
//     const res = await axios.get('/api/games')
//     const {data: games} = res
//     dispatch(gotAllGames(games))
//   }
// }

// reducer

export default function (state = 0, action) {
  switch (action.type) {
    case GOT_SINGLE_GAME:
      return action.gameId
    // case GOT_ALL_GAMES:
    //   return act
    default:
      return state
  }
}
