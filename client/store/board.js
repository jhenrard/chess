import axios from 'axios'
import {createComponentPieces} from '../gamelogic'
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

export const fetchBoard = (gameId) => {
  return async (dispatch) => {
    const res = await axios.get(`/api/games/${gameId}`)
    const {data: game} = res
    const board = game.board.map(row => {
      return row.map(piece => {return JSON.parse(piece)})
    }) // REFACTOR THIS TO UTILITY FUNCTION
    // const componentBoard = createComponentPieces(game.board, currentPlayer)

    dispatch(gotBoard(board))
  }
}

export const updateBoard = (id, updatedBoard, currentPlayerTurn, currentPlayer) => {
  return async (dispatch) => {
    const res = await axios.put(`/api/games/${id}`, {board: updatedBoard, currentPlayerTurn})
    const game = res.data[1][0]
    // const componentBoard = createComponentPieces(game.board, currentPlayer)
    const board = game.board.map(row => {
      return row.map(piece => {return JSON.parse(piece)})
    }) // REFACTOR THIS TO UTILITY FUNCTION
    dispatch(gotBoard(board))
    socket.emit('drop', game.board, currentPlayerTurn)
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

