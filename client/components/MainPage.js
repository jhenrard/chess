import React from 'react'
import {Board, PlayerInfo} from '../components'
import Lobby from './Lobby';

const MainPage = () => {
  return (
    <div>
      <PlayerInfo />
      {/* <Lobby /> */}
      <Board />
    </div>
  )
}

export default MainPage
