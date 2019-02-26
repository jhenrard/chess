// action types

const GOT_STATUS = 'GOT_STATUS'

// action creators

const gotStatus = status => {
  return {
    type: GOT_STATUS,
    status,
  }
}

// thunk creators

export const checkmate = () => {
  return async dispatch => {
    dispatch(gotStatus('game_over'))
  }
}

// reducer

export default function (state = '', action) {
  switch (action.type) {
    case GOT_STATUS:
      return action.status
    default:
      return state
  }
}
