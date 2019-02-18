/// CLIENT ///

import io from 'socket.io-client'
import store from './store'
import {setPlayer} from './store/currentPlayer'
import {setPlayerTurn} from './store/currentPlayerTurn'
import {gotBoard, fetchBoard} from './store/board'
import {flipBoard} from './utils'

const socket = io(window.location.origin)

socket.on('connect', () => {
  console.log('Connected!')
})

socket.on('player', player => {
  store.dispatch(setPlayer(player))
  store.dispatch(fetchBoard(1, player))
})

socket.on('movedPiece', (board, currentPlayerTurn) => {
  store.dispatch(setPlayerTurn(currentPlayerTurn))
  store.dispatch(gotBoard(flipBoard(board)))
})

export default socket
