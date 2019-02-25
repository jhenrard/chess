/// CLIENT ///

import io from 'socket.io-client'
import store from './store'
import {setPlayerNum} from './store/currentPlayer'
import {setPlayerTurn} from './store/currentPlayerTurn'
import {gotBoard, fetchBoard} from './store/board'
import {flipBoard} from './utils'

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
  // store.dispatch(fetchBoard(gameId, player))
})

socket.on('movedPiece', (board, currentPlayerTurn) => {
  const currentPlayer = store.getState().currentPlayer
  store.dispatch(setPlayerTurn(currentPlayerTurn))
  if (currentPlayer !== 0 || currentPlayerTurn === 1) {
    store.dispatch(gotBoard(flipBoard(board)))
  } else {
    store.dispatch(gotBoard(board))
  }
})

export default socket
