/// CLIENT ///

import io from 'socket.io-client'
import store from './store'
import {setPlayer} from './store/currentPlayer'
import {setPlayerTurn} from './store/currentPlayerTurn'
import {fetchBoard} from './store/board'
import {gotBoard} from './store/board'
import { createComponentPieces } from './gamelogic';

const socket = io(window.location.origin)

socket.on('connect', () => {
  console.log('Connected!')
  console.log(socket)
})

socket.on('player', player => {
  store.dispatch(setPlayer(player))
  store.dispatch(fetchBoard(1, player))
})

socket.on('movedPiece', (serverBoard, currentPlayerTurn) => {
  store.dispatch(setPlayerTurn(currentPlayerTurn))
  store.dispatch(gotBoard(createComponentPieces(serverBoard, currentPlayerTurn)))
})

export default socket
