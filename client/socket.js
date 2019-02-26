/// CLIENT ///

import io from 'socket.io-client'
import store from './store'
import {setPlayerNum} from './store/currentPlayer'
import {gotPlayerTurn} from './store/currentPlayerTurn'
import {gotBoard} from './store/board'
import {flipBoard} from './utils'
import {gotWinner} from './store/winner';

const socket = io(window.location.origin)

socket.on('connect', () => {
  console.log('Connected!')
})

socket.on('joinGame', function(gameId) {
  console.log('joining game #', gameId)
  socket.emit('joinPlayer', gameId)
})

socket.on('player', (gameId) => {
  store.dispatch(setPlayerNum(gameId, store.getState().user))
})

socket.on('movedPiece', (board, currentPlayerTurn) => {
  const currentPlayer = store.getState().currentPlayer
  store.dispatch(gotPlayerTurn(currentPlayerTurn))
  if (currentPlayer !== 0 || currentPlayerTurn === 1) {
    store.dispatch(gotBoard(flipBoard(board)))
  } else {
    store.dispatch(gotBoard(board))
  }
})

socket.on('winner', (winner) => {
  store.dispatch(gotWinner(winner))
})

export default socket
