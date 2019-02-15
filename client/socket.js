/// CLIENT ///

import io from 'socket.io-client'
import store from './store'
import {setPlayer} from './store/currentPlayer'
import {setPlayerTurn} from './store/currentPlayerTurn'
import {fetchBoard, gotBoard} from './store/board'
import { createComponentPieces } from './gamelogic';

const socket = io(window.location.origin)

socket.on('connect', () => {
  console.log('Connected!')
})

socket.on('player', player => {
  store.dispatch(setPlayer(player))
  // store.dispatch(fetchBoard(1, player))
})

socket.on('movedPiece', (serverBoard, currentPlayerTurn) => {
  const currentPlayer = store.getState().currentPlayer
  store.dispatch(setPlayerTurn(currentPlayerTurn))
  store.dispatch(gotBoard(createComponentPieces(serverBoard, currentPlayer)))
})

export default socket
