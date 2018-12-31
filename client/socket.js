/// CLIENT ///

import io from 'socket.io-client'
import store from './store'
import {setPlayer} from './store/currentPlayer'
import {setPlayerTurn} from './store/currentPlayerTurn'
import {gotBoard} from './store/board'
import { createComponentPieces } from './gamelogic';

const socket = io(window.location.origin)

socket.on('connect', () => {
  console.log('Connected!')
  console.log(socket)
})

socket.on('player', player => {
  store.dispatch(setPlayer(player))
})

socket.on('movedPiece', (serverBoard, currentPlayerTurn) => {
  store.dispatch(gotBoard(createComponentPieces(serverBoard)))
  store.dispatch(setPlayerTurn(currentPlayerTurn))
})

export default socket
