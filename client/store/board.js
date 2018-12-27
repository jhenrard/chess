import axios from 'axios'
import {createComponentPieces} from '../gamelogic'

// action types

const GOT_BOARD = 'GOT_BOARD'

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

export const updateBoard = (id, updatedServerBoard, currentPlayerTurn) => {
  return async (dispatch) => {
    const res = await axios.put(`/api/games/${id}`, {board: updatedServerBoard, currentPlayerTurn})
    const game = res.data[1][0]
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

