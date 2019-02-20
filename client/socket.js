/// CLIENT ///

import io from 'socket.io-client'
import axios from 'axios'
import store from './store'
import {setPlayer} from './store/currentPlayer'
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

socket.on('player', (player, gameId) => {
  // store.getState().
  store.dispatch(setPlayer(player))
  store.dispatch(fetchBoard(1, player))
  // if (player === 2) {
  //   await axios.put(`/api/games/${gameId}`, {started: true})
  // }
})

socket.on('movedPiece', (board, currentPlayerTurn) => {
  store.dispatch(setPlayerTurn(currentPlayerTurn))
  store.dispatch(gotBoard(flipBoard(board)))
})

export default socket
