import axios from 'axios'
import {createComponentPieces} from '../util'

// action types

const GOT_BOARD = 'GOT_BOARD'
const SET_BOARD = 'SET_BOARD'

// action creators

const gotBoard = (board) => {
  return {
    type: GOT_BOARD,
    board,
  }
}

// thunk creators

export const fetchBoard = (id) => {
  return async (dispatch) => {
    const res = await axios.get(`/api/games/${id}`)
    const {data: game} = res
    const componentBoard = createComponentPieces(game.board)
    dispatch(gotBoard(componentBoard))
  }
}

export const updateBoard = (id, updatedServerBoard) => {
  return async (dispatch) => {
    console.log('serverBoard passed to thunk', updatedServerBoard)
    const res = await axios.put(`/api/games/${id}`, updatedServerBoard)
    const game = res.data[1][0]
    console.log(game)
    const componentBoard = createComponentPieces(game.board)
    dispatch(gotBoard(componentBoard))
  }
}

// chess board reducer

export default function (state = [], action) {
  switch (action.type) {
    case GOT_BOARD:
      return action.board
    default:
      return state
  }
}

