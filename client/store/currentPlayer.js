///////////////////////////////////////////////////
///    NOT BEING USED YET BUT WILL BE NEEDED    ///
///////////////////////////////////////////////////


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



// reducer

export default function (state = 0, action) {
  switch (action.type) {
    case GET_PLAYER:
      return action.player
    case SET_PLAYER:
      return action.player
   default:
      return state
  }
}
