import axios from 'axios'
import {convertToJSON, convertFromJSON, flipBoard} from '../utils'
import socket from '../socket';

// action types

const GOT_BOARD = 'GOT_BOARD'

// action creators

export const gotBoard = (board) => {
  return {
    type: GOT_BOARD,
    board,
  }
}

// thunk creators

export const fetchBoard = (gameId, player) => {
  return async (dispatch) => {
    const res = await axios.get(`/api/games/${gameId}`)
    const {data: game} = res
    let board = convertFromJSON(game.board)
    if (player === 2) {
      board = flipBoard(board)
    }
    dispatch(gotBoard(board))
  }
}

export const updateBoard = (id, updatedBoard, currentPlayerTurn, player) => {
  return async (dispatch) => {
    const res = await axios.put(`/api/games/${id}`, {board: convertToJSON(updatedBoard), currentPlayerTurn})
    const game = res.data[1][0]
    let board = convertFromJSON(game.board)
    if (player === 2) {
      board = flipBoard(board)
    }
    dispatch(gotBoard(board))
    socket.emit('drop', board, currentPlayerTurn, id)
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

